/**
 * Signed, expiring access tokens for post-payment product delivery.
 *
 * A token is only ever minted server-side after Stripe confirms payment, so
 * possession of a valid token is proof of a completed purchase. Tokens are
 * HMAC-SHA256 signed and carry their own expiry; they are verified in
 * constant time and cannot be forged without DELIVERY_SECRET.
 */
import crypto from "node:crypto";
import { env } from "./env";

export type AccessClaims = {
  orderId: string;
  email: string;
  sku: string;
  /** Seconds since epoch. */
  exp: number;
};

function secret(): string {
  if (env.deliverySecret) return env.deliverySecret;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "DELIVERY_SECRET is not set. Refusing to issue access tokens in production.",
    );
  }
  // Development only: keeps the local journey testable without secrets.
  return "development-only-insecure-delivery-secret";
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function sign(payload: string): string {
  return b64url(crypto.createHmac("sha256", secret()).update(payload).digest());
}

export function signAccessToken(input: {
  orderId: string;
  email: string;
  sku: string;
  ttlSeconds: number;
}): string {
  const claims: AccessClaims = {
    orderId: input.orderId,
    email: input.email.toLowerCase(),
    sku: input.sku,
    exp: Math.floor(Date.now() / 1000) + input.ttlSeconds,
  };
  const payload = b64url(JSON.stringify(claims));
  return `${payload}.${sign(payload)}`;
}

export type VerifyResult =
  | { ok: true; claims: AccessClaims }
  | { ok: false; reason: "malformed" | "bad-signature" | "expired" };

export function verifyAccessToken(token: string): VerifyResult {
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "malformed" };
  const [payload, signature] = parts;

  const expected = sign(payload);
  const a = fromB64url(signature);
  const b = fromB64url(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "bad-signature" };
  }

  let claims: AccessClaims;
  try {
    claims = JSON.parse(fromB64url(payload).toString("utf8")) as AccessClaims;
  } catch {
    return { ok: false, reason: "malformed" };
  }

  if (typeof claims.exp !== "number" || claims.exp * 1000 < Date.now()) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true, claims };
}
