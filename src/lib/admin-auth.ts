/**
 * Minimal shared-password gate for the Avensra export screens.
 *
 * Deliberately not a user system: the brief rules out custom account
 * functionality and complex role-based administration. Stripe's own dashboard
 * remains the place orders, refunds and customers are administered — this
 * gate only protects the form-submission exports the platform holds.
 */
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { env } from "./env";

const COOKIE = "avensra_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret(): string {
  return env.deliverySecret ?? env.adminPassword ?? "development-only-secret";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

export function passwordMatches(candidate: string): boolean {
  if (!env.adminPassword) return false;
  const a = Buffer.from(sign(candidate));
  const b = Buffer.from(sign(env.adminPassword));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function makeSessionValue(): string {
  const expires = Date.now() + MAX_AGE * 1000;
  return `${expires}.${sign(String(expires))}`;
}

export function sessionCookie(value: string) {
  return {
    name: COOKIE,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: value ? MAX_AGE : 0,
  };
}

export async function isAdmin(): Promise<boolean> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [expires, signature] = raw.split(".");
  if (!expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;

  const expected = Buffer.from(sign(expires));
  const given = Buffer.from(signature);
  return expected.length === given.length && crypto.timingSafeEqual(expected, given);
}

export const adminConfigured = () => Boolean(env.adminPassword);
