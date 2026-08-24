import { NextResponse } from "next/server";
import { sessionCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie(""));
  return response;
}
