/**
 * In-memory fixed-window rate limiter.
 *
 * Sized for Phase 1's low volume and single deployment region. It is a spam
 * brake on public forms, not a security control; if the site later scales to
 * multiple instances this should move to a shared store.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

/** Best-effort client identity for rate limiting behind a proxy. */
export function clientKey(request: Request, scope: string): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  return `${scope}:${ip}`;
}

/** Cleans out expired windows so the map cannot grow without bound. */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (entry.resetAt < now) hits.delete(key);
  }
}, 300_000).unref?.();
