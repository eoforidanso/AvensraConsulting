/**
 * Provider-agnostic licensing contract.
 *
 * Phase 1 requirement: the site must integrate a THIRD-PARTY DRM/licensing
 * provider, and the provider is not chosen until UAT. Everything the rest of
 * the application touches is defined here, so selecting Locklizard (or an
 * alternative) is a matter of adding one adapter file and setting env vars.
 * No proprietary DRM engine is built.
 */
import type { ProtectionTier } from "@/content/products";

export type LicencePolicy = {
  /** Number of devices the licence may be activated on. null = unlimited. */
  deviceLimit: number | null;
  /** Whether the licensed viewer permits printing. */
  allowPrinting: boolean;
  /** Print run cap where printing is allowed. null = unlimited. */
  printLimit: number | null;
  /** Whether copy/paste and screen capture are blocked by the viewer. */
  blockCopyAndCapture: boolean;
  /** Stamp purchaser identity onto every page/screen. */
  watermark: boolean;
  /** Licence expiry in days from issue. null = perpetual. */
  expiryDays: number | null;
  /** Whether offline use is permitted after activation. */
  allowOffline: boolean;
};

/**
 * The two protection tiers required by the brief.
 *
 * "strong" — Business-to-People Alignment System™. High commercial value:
 *   methodology, templates and tools. Locked down, printing off by default.
 * "light"  — The Executive Reset™. Must remain compatible with authorised
 *   printing and tablet/stylus use, so printing and offline use stay on and
 *   copy/capture blocking is off (it would break stylus apps).
 */
export const policies: Record<ProtectionTier, LicencePolicy> = {
  strong: {
    deviceLimit: 2,
    allowPrinting: false,
    printLimit: 0,
    blockCopyAndCapture: true,
    watermark: true,
    expiryDays: null,
    allowOffline: true,
  },
  light: {
    deviceLimit: null,
    allowPrinting: true,
    printLimit: null,
    blockCopyAndCapture: false,
    watermark: true,
    expiryDays: null,
    allowOffline: true,
  },
};

export type IssueLicenceInput = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  productSku: string;
  productName: string;
  protection: ProtectionTier;
  assets: { label: string; file: string }[];
};

export type IssuedLicence = {
  provider: string;
  licenceId: string;
  /** Activation/registration code the customer enters in the viewer, if any. */
  activationCode?: string;
  /** Where the customer goes to get their protected files. */
  accessUrl: string;
  /** Viewer download page, when the provider requires a licensed reader. */
  viewerUrl?: string;
  policy: LicencePolicy;
  issuedAt: string;
};

export interface LicensingProvider {
  readonly name: string;
  /** True when the provider is configured and safe to call. */
  isConfigured(): boolean;
  issueLicence(input: IssueLicenceInput): Promise<IssuedLicence>;
  revokeLicence(licenceId: string): Promise<void>;
}
