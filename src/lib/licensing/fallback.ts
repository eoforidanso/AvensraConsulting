/**
 * Fallback provider used before a DRM vendor is selected at UAT, and as the
 * delivery mechanism for lightly-protected products.
 *
 * It issues a signed, expiring, single-purchaser access link served by
 * /api/deliver. This is genuine access control (payment-gated, tokenised,
 * watermark metadata attached) but it is NOT DRM — it does not restrict what
 * happens to a file after download. It exists so the purchase and fulfilment
 * journey is complete and testable before the DRM account is live.
 */
import { env } from "@/lib/env";
import { signAccessToken } from "@/lib/access-token";
import { policies, type IssueLicenceInput, type IssuedLicence, type LicensingProvider } from "./types";

export const fallbackProvider: LicensingProvider = {
  name: "emmanusplus-signed-link",

  isConfigured() {
    return Boolean(env.deliverySecret);
  },

  async issueLicence(input: IssueLicenceInput): Promise<IssuedLicence> {
    const policy = policies[input.protection];
    const token = signAccessToken({
      orderId: input.orderId,
      email: input.customerEmail,
      sku: input.productSku,
      // Access links stay valid for 30 days; re-issue on request after that.
      ttlSeconds: 60 * 60 * 24 * 30,
    });

    return {
      provider: this.name,
      licenceId: `LIC-${input.orderId}`,
      accessUrl: `${env.siteUrl}/access?token=${encodeURIComponent(token)}`,
      policy,
      issuedAt: new Date().toISOString(),
    };
  },

  async revokeLicence(licenceId: string): Promise<void> {
    // Signed links are revoked by adding the order to the revocation list
    // checked in /api/deliver. Rotating DELIVERY_SECRET revokes all links.
    const { revoke } = await import("@/lib/revocations");
    await revoke(licenceId.replace(/^LIC-/, ""));
  },
};
