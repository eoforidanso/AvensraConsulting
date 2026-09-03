/**
 * Shared plumbing for the three public forms: validate, rate-limit, store,
 * notify. Submissions are recorded so Avensra can export them, and emailed
 * so nothing depends on someone remembering to check the admin screen.
 */
import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { append, type Collection } from "@/lib/store";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { sendMail, emailShell, p, small } from "@/lib/mail";
import { esc } from "@/lib/escape";
import { env } from "@/lib/env";

export type FormConfig<T> = {
  collection: Collection;
  schema: ZodType<T>;
  subject: (data: T) => string;
  /** Field/value pairs shown in the notification email. */
  summary: (data: T) => [string, string][];
  /** Optional auto-reply sent to the submitter. */
  autoReply?: (data: T) => { to: string; subject: string; html: string } | null;
  limit?: number;
};

export async function handleForm<T extends { honeypot?: string }>(
  request: Request,
  config: FormConfig<T>,
) {
  const gate = rateLimit(clientKey(request, config.collection), config.limit ?? 5);
  if (!gate.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(gate.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const parsed = config.schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Please check the form and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot: a hidden field only a bot fills in. Accept and discard, so the
  // bot is not told what happened.
  if (data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const record = await append(config.collection, {
    ...(data as Record<string, unknown>),
    honeypot: undefined,
  });

  const rows = config
    .summary(data)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 16px 8px 0;font-size:13px;color:#5b616b;vertical-align:top;white-space:nowrap;">${esc(
          label,
        )}</td><td style="padding:8px 0;font-size:14px;color:#1a1c1f;">${esc(
          value,
        ).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  const maybeEmail = (data as unknown as { email?: unknown }).email;
  const submitterEmail = typeof maybeEmail === "string" ? maybeEmail : undefined;

  await sendMail({
    to: env.mailTo,
    subject: config.subject(data),
    replyTo: submitterEmail,
    html: emailShell(
      config.subject(data),
      `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">${rows}</table>` +
        small(`Reference: ${esc(record.id)} &middot; Received ${esc(record.createdAt)}`),
    ),
  });

  const auto = config.autoReply?.(data);
  if (auto) {
    await sendMail({ to: auto.to, subject: auto.subject, html: auto.html });
  }

  return NextResponse.json({ ok: true, reference: record.id });
}

export const emailField = { message: "Please enter a valid email address." };
