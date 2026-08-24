/**
 * Resolves the active licensing provider from configuration.
 *
 * Selection order:
 *   1. LICENSING_PROVIDER names a provider AND that provider is configured
 *   2. otherwise the signed-link fallback (payment-gated, not DRM)
 *
 * The fallback keeps the purchase-to-access journey working end to end while
 * the DRM vendor is still being evaluated, which is exactly what the brief
 * asks for: activate the DRM trial only when the site is ready for UAT.
 */
import { fallbackProvider } from "./fallback";
import { locklizardProvider } from "./locklizard";
import { env } from "@/lib/env";
import type { LicensingProvider } from "./types";

const registry: Record<string, LicensingProvider> = {
  locklizard: locklizardProvider,
};

export function getLicensingProvider(): LicensingProvider {
  const chosen = registry[env.licensingProvider];
  if (chosen?.isConfigured()) return chosen;
  return fallbackProvider;
}

/** True when a real third-party DRM provider is live. */
export function drmActive(): boolean {
  return getLicensingProvider().name !== fallbackProvider.name;
}

export * from "./types";
