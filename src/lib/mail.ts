/**
 * Transactional email via Resend's HTTP API.
 *
 * Called over fetch rather than through an SDK to keep the dependency
 * surface small. If RESEND_API_KEY is absent the message is logged instead
 * of sent, so local and pre-launch testing never silently fails.
 */
import { env } from "./env";
import { site } from "./site";

type SendInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendMail({ to, subject, html, replyTo }: SendInput) {
  if (!env.resendApiKey) {
    console.info(`[mail:not-sent] to=${to} subject=${subject}`);
    return { sent: false as const, reason: "RESEND_API_KEY not set" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.mailFrom,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[mail:failed] ${res.status} ${detail.slice(0, 300)}`);
    return { sent: false as const, reason: `Resend ${res.status}` };
  }
  return { sent: true as const };
}

const NAVY = "#091320";
const GOLD = "#c1874c";
const IVORY = "#f7f4ee";

/** Branded wrapper shared by every outbound message. */
export function emailShell(headline: string, bodyHtml: string): string {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${IVORY};font-family:Helvetica,Arial,sans-serif;color:#1a1c1f;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${IVORY};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #ece5d9;">
        <tr><td style="background:${NAVY};padding:28px 32px;">
          <div style="font-size:22px;letter-spacing:0.22em;color:#ffffff;font-weight:600;">EMMANUS PLUS</div>
          <div style="font-size:10px;letter-spacing:0.28em;color:${GOLD};margin-top:6px;">STRATEGY. PEOPLE. PERFORMANCE.</div>
        </td></tr>
        <tr><td style="padding:36px 32px 8px;">
          <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:26px;line-height:1.25;color:${NAVY};font-weight:500;">${headline}</h1>
          ${bodyHtml}
        </td></tr>
        <tr><td style="padding:24px 32px 32px;border-top:1px solid #ece5d9;color:#5b616b;font-size:12px;line-height:1.6;">
          <p style="margin:0 0 6px;">${site.legalName} &middot; ${site.email}</p>
          <p style="margin:0;"><a href="${site.url}" style="color:${GOLD};text-decoration:none;">${site.url.replace(/^https?:\/\//, "")}</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr>
    <td style="background:${GOLD};">
      <a href="${href}" style="display:inline-block;padding:14px 28px;color:${NAVY};font-weight:700;font-size:14px;letter-spacing:0.06em;text-decoration:none;text-transform:uppercase;">${label}</a>
    </td></tr></table>`;
}

export const p = (text: string) =>
  `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#1a1c1f;">${text}</p>`;

export const small = (text: string) =>
  `<p style="margin:0 0 12px;font-size:13px;line-height:1.6;color:#5b616b;">${text}</p>`;
