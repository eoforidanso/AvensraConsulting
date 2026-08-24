/**
 * Locklizard Safeguard adapter.
 *
 * STATUS: written against Locklizard's Web Service API shape but NOT yet
 * verified against a live account — Locklizard is under evaluation and the
 * provider is not confirmed until UAT (Phase 1 brief, s.4). Field names and
 * endpoints must be reconciled with the account's API documentation during
 * the DRM trial, which is activated only once the site is UAT-ready.
 *
 * Everything outside this file is provider-neutral, so replacing Locklizard
 * with another vendor means writing a sibling adapter, not reworking the site.
 */
import { env } from "@/lib/env";
import {
  policies,
  type IssueLicenceInput,
  type IssuedLicence,
  type LicensingProvider,
} from "./types";

async function call<T>(path: string, body: unknown): Promise<T> {
  if (!env.locklizard.apiUrl || !env.locklizard.apiKey) {
    throw new Error("Locklizard is not configured");
  }
  const res = await fetch(`${env.locklizard.apiUrl.replace(/\/$/, "")}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.locklizard.apiKey}`,
    },
    body: JSON.stringify({ accountId: env.locklizard.accountId, ...(body as object) }),
    // Never let a slow vendor call hold a webhook open.
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Locklizard ${path} failed: ${res.status} ${detail.slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

export const locklizardProvider: LicensingProvider = {
  name: "locklizard",

  isConfigured() {
    return Boolean(env.locklizard.apiUrl && env.locklizard.apiKey);
  },

  async issueLicence(input: IssueLicenceInput): Promise<IssuedLicence> {
    const policy = policies[input.protection];

    const created = await call<{
      customerId: string;
      licenceId: string;
      registrationCode: string;
      downloadUrl: string;
      viewerUrl?: string;
    }>("/customers", {
      // Customer identification / watermarking source data.
      name: input.customerName,
      email: input.customerEmail,
      reference: input.orderId,
      // Access and usage restrictions derived from the product's tier.
      publications: input.assets.map((a) => a.file),
      restrictions: {
        maxDevices: policy.deviceLimit,
        allowPrinting: policy.allowPrinting,
        maxPrints: policy.printLimit,
        disableCopyPaste: policy.blockCopyAndCapture,
        disableScreenCapture: policy.blockCopyAndCapture,
        watermark: policy.watermark
          ? "{name} · {email} · Order " + input.orderId
          : undefined,
        expiryDays: policy.expiryDays,
        allowOffline: policy.allowOffline,
      },
    });

    return {
      provider: this.name,
      licenceId: created.licenceId,
      activationCode: created.registrationCode,
      accessUrl: created.downloadUrl,
      viewerUrl: created.viewerUrl,
      policy,
      issuedAt: new Date().toISOString(),
    };
  },

  async revokeLicence(licenceId: string): Promise<void> {
    await call("/licences/revoke", { licenceId });
  },
};
