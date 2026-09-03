/**
 * Environment access. Nothing here throws at import time — the site must
 * still render (and marketing pages must still work) if commerce keys are
 * absent, so that content can be reviewed before Stripe is connected.
 */

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,

  resendApiKey: process.env.RESEND_API_KEY,
  mailFrom: process.env.MAIL_FROM ?? "Emmanus Plus Consulting <info@avensraconsulting.com>",
  mailTo: process.env.MAIL_TO ?? "info@avensraconsulting.com",

  /** Secret used to sign delivery/access tokens. Required in production. */
  deliverySecret: process.env.DELIVERY_SECRET,

  /** Shared password for the /admin export screens. */
  adminPassword: process.env.ADMIN_PASSWORD,

  licensingProvider: (process.env.LICENSING_PROVIDER ?? "none") as
    | "none"
    | "locklizard",
  locklizard: {
    apiUrl: process.env.LOCKLIZARD_API_URL,
    apiKey: process.env.LOCKLIZARD_API_KEY,
    accountId: process.env.LOCKLIZARD_ACCOUNT_ID,
  },

  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  linkedInPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
  searchConsoleToken: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
} as const;

export const commerceEnabled = Boolean(env.stripeSecretKey);

/** Fails loudly in production if a launch-critical secret is missing. */
export function assertLaunchReady(): string[] {
  const missing: string[] = [];
  if (!env.stripeSecretKey) missing.push("STRIPE_SECRET_KEY");
  if (!env.stripeWebhookSecret) missing.push("STRIPE_WEBHOOK_SECRET");
  if (!env.deliverySecret) missing.push("DELIVERY_SECRET");
  if (!env.resendApiKey) missing.push("RESEND_API_KEY");
  if (!env.adminPassword) missing.push("ADMIN_PASSWORD");
  return missing;
}
