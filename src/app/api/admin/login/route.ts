import { NextResponse } from "next/server";
import { z } from "zod";
import { passwordMatches, makeSessionValue, sessionCookie } from "@/lib/admin-auth";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { adminConfigured } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({ password: z.string().min(1).max(300) });

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured. Set ADMIN_PASSWORD." },
      { status: 503 },
    );
  }

  // Tight limit: this endpoint guards every stored submission.
  const gate = rateLimit(clientKey(request, "admin-login"), 5, 15 * 60_000);
  if (!gate.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(gate.retryAfter) } },
    );
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !passwordMatches(parsed.data.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie(makeSessionValue()));
  return response;
}
