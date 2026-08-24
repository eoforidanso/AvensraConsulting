"use client";

import { useState } from "react";
import { Button, Arrow } from "@/components/ui";

/**
 * Starts a Stripe Checkout session and redirects.
 *
 * There is no cart: both launch products are single-item purchases, so
 * sending the customer straight to Stripe's hosted checkout removes a step
 * and keeps card handling entirely off this site.
 */
export function BuyButton({
  slug,
  label = "Buy now",
  variant = "gold",
  className = "",
  disabled = false,
  disabledLabel = "Coming soon",
}: {
  slug: string;
  label?: string;
  variant?: "gold" | "navy" | "outline";
  className?: string;
  disabled?: boolean;
  disabledLabel?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

      if (!res.ok || !data.url) {
        setError(
          data.error ??
            "We could not start checkout just now. Please try again, or contact us and we will help.",
        );
        setLoading(false);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setError("We could not reach the payment provider. Please try again.");
      setLoading(false);
    }
  }

  if (disabled) {
    return (
      <Button variant={variant} className={className} disabled>
        {disabledLabel}
      </Button>
    );
  }

  return (
    <div className={className}>
      <Button
        variant={variant}
        onClick={start}
        disabled={loading}
        aria-busy={loading}
        className="w-full"
      >
        {loading ? "Taking you to checkout…" : label}
        {loading ? null : <Arrow />}
      </Button>
      {error ? (
        <p role="alert" className="mt-3 text-sm leading-relaxed text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
