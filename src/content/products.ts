/**
 * Launch product catalogue.
 *
 * PRICING: amounts are in USD cents and are PLACEHOLDERS pending Avensra
 * confirmation. Set them here (or via the matching env vars) before go-live.
 * The Stripe Price ID is the commercial source of truth at checkout — the
 * `priceUsd` below is used for display and structured data only, so the two
 * must be kept in step.
 *
 * DRM: `protection` selects which policy the licensing adapter applies. The
 * concrete provider (Locklizard or the alternative chosen at UAT) is resolved
 * at runtime in src/lib/licensing/. Nothing here is provider-specific.
 */

export type ProtectionTier = "strong" | "light";

export type Product = {
  slug: string;
  sku: string;
  name: string;
  trademarkedName: string;
  shortName: string;
  tagline: string;
  summary: string;
  priceUsd: number; // cents
  compareAtUsd?: number; // cents
  stripePriceId: string | undefined;
  protection: ProtectionTier;
  format: string;
  deliveryNote: string;
  supportNote: string;
  includes: string[];
  outcomes: { title: string; body: string }[];
  audience: string[];
  href: string;
  image: string;
  /** Filenames handed to the licensing/delivery adapter after payment. */
  assets: { label: string; file: string; kind: "document" | "workbook" | "toolkit" }[];
};

export const products: Product[] = [
  {
    slug: "business-to-people-alignment-system",
    sku: "AVN-BPAS-01",
    name: "Business-to-People Alignment System",
    trademarkedName: "Business-to-People Alignment System™",
    shortName: "Alignment System",
    tagline: "The system that aligns strategy, people and performance.",
    summary:
      "A complete, practical system for leaders who need their strategy to actually land with the people expected to deliver it. Frameworks, diagnostics, templates and facilitation tools in one structured methodology.",
    priceUsd: Number(process.env.NEXT_PUBLIC_PRICE_BPAS ?? 49700),
    stripePriceId: process.env.STRIPE_PRICE_BPAS,
    protection: "strong",
    format: "Protected digital system — documents, templates and tools",
    deliveryNote:
      "Access is issued to the purchase email immediately after payment. The system is delivered through Avensra's licensed secure viewer; each licence is unique to the purchaser.",
    supportNote:
      "Includes seven-day technical support for licence activation and secure access, from the date of purchase.",
    includes: [
      "The full Business-to-People Alignment System™ methodology",
      "Strategy-to-people alignment diagnostic",
      "Organisation design and effectiveness frameworks",
      "Leadership and people alignment tools",
      "Performance and change templates",
      "Facilitation guides for running alignment sessions internally",
      "Seven-day technical support for licence activation",
    ],
    outcomes: [
      {
        title: "Strategy that clarifies",
        body: "Translate a board-level strategy into language and priorities that every team can act on.",
      },
      {
        title: "People that deliver",
        body: "Align roles, capability and accountability to the outcomes the strategy actually depends on.",
      },
      {
        title: "Performance that lasts",
        body: "Embed measurement and rhythm so alignment survives the quarter it was created in.",
      },
    ],
    audience: [
      "Executives accountable for delivering a strategy through other people",
      "HR and people directors leading organisation design or change",
      "Consultants and internal practitioners running alignment work",
    ],
    href: "/business-to-people-alignment-system",
    image: "/products/bpas.svg",
    assets: [
      { label: "Alignment System — Core Methodology", file: "bpas-methodology.pdf", kind: "document" },
      { label: "Alignment Diagnostic", file: "bpas-diagnostic.pdf", kind: "workbook" },
      { label: "Template & Tool Pack", file: "bpas-toolkit.pdf", kind: "toolkit" },
    ],
  },
  {
    slug: "the-executive-reset",
    sku: "AVN-TER-01",
    name: "The Executive Reset",
    trademarkedName: "The Executive Reset™",
    shortName: "Executive Reset",
    tagline: "A guided colouring and reflection experience for busy professionals.",
    summary:
      "A guided experience that helps busy professionals pause, reset their focus, reflect with clarity and return to what matters. Designed to be printed or used on a tablet with a stylus.",
    priceUsd: Number(process.env.NEXT_PUBLIC_PRICE_TER ?? 3700),
    stripePriceId: process.env.STRIPE_PRICE_TER,
    protection: "light",
    format: "Personalised PDF — print at home or use on a tablet with a stylus",
    deliveryNote:
      "Your personalised copy is issued to the purchase email immediately after payment. Printing for your own use is permitted, and the file works with tablet and stylus apps.",
    supportNote:
      "Email support for download and access issues. Response within two business days.",
    includes: [
      "The full Release → Reset → Reflect → Return journey",
      "Guided colouring and reflection pages",
      "Prompts designed for professionals with limited time",
      "Print-ready and tablet/stylus friendly",
      "Personalised to you — yours to keep",
    ],
    outcomes: [
      {
        title: "Release",
        body: "Put down the mental load you have been carrying between meetings.",
      },
      { title: "Reset", body: "Give your attention somewhere deliberate to land." },
      {
        title: "Reflect",
        body: "Ask the questions that get lost when the calendar is full.",
      },
      { title: "Return", body: "Come back to the work with clarity about what matters." },
    ],
    audience: [
      "Executives and senior professionals carrying sustained pressure",
      "Leaders looking for a reset that is not another productivity system",
      "Teams wanting a shared, human moment in a demanding period",
    ],
    href: "/the-executive-reset",
    image: "/products/executive-reset.svg",
    assets: [
      { label: "The Executive Reset™ — Guided Experience", file: "executive-reset.pdf", kind: "document" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductBySku(sku: string): Product | undefined {
  return products.find((p) => p.sku === sku);
}

/** Formats USD cents for display, e.g. 49700 -> "$497". */
export function formatUsd(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: dollars % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(dollars);
}
