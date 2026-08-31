/**
 * Single source of truth for site-wide identity, navigation and contact
 * details. Avensra can change any of this without touching page code.
 */

export const site = {
  name: "Avensra Consulting",
  shortName: "Avensra",
  tagline: "Strategy. People. Performance.",
  description:
    "Avensra helps organisations align their strategy with their people so performance is not just planned, it is lived.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://avensraconsulting.com",
  locale: "en_GB",
  email: "info@avensraconsulting.com",
  supportEmail: "info@avensraconsulting.com",
  linkedin: "https://www.linkedin.com/company/avensra-consulting",
  legalName: "Avensra Consulting",
  foundedYear: 2025,
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    // Short in the nav by design — "Consulting & Advisory" is the full name
    // used on the page itself, but at 22 characters plus a dropdown chevron
    // it was wide enough to push "Contact Us" off-screen at 1440px, a very
    // common laptop width. Verified against the nav's actual rendered width
    // before shortening, not guessed.
    label: "Consulting",
    href: "/consulting",
    children: [
      {
        label: "Executive Career Positioning™",
        href: "/executive-career-positioning",
        description: "One-to-one advisory for senior leadership and executive opportunities.",
      },
      {
        label: "Business-to-People Advisory Support",
        href: "/consulting#business-to-people-advisory-support",
        description: "Expert guidance for Alignment System purchasers refining their people strategy.",
      },
    ],
  },
  {
    label: "Digital Products",
    href: "/digital-products",
    children: [
      {
        label: "Business-to-People Alignment System™",
        href: "/business-to-people-alignment-system",
        description: "The system that aligns strategy, people and performance.",
      },
      {
        label: "The Executive Reset™",
        href: "/the-executive-reset",
        description: "A guided colouring and reflection experience.",
      },
      {
        label: "View all digital products",
        href: "/digital-products",
        description: "Compare both launch products side by side.",
      },
    ],
  },
  {
    label: "Corporate Experiences",
    href: "/corporate-experiences",
    children: [
      {
        label: "Facilitated Experiences",
        href: "/corporate-experiences#experiences",
        description: "Avensra-led Executive Reset™ sessions.",
      },
      {
        label: "Corporate Licensing",
        href: "/corporate-experiences#licensing",
        description: "Run Executive Reset™ with your own facilitators.",
      },
    ],
  },
  { label: "Resources", href: "/faq" },
];

export const footerNav = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "What We Do", href: "/consulting" },
    { label: "Digital Products", href: "/digital-products" },
    { label: "Corporate Experiences", href: "/corporate-experiences" },
    { label: "Resources", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
  solutions: [
    {
      label: "Executive Career Positioning™",
      href: "/executive-career-positioning",
    },
    {
      label: "Business-to-People Alignment System™",
      href: "/business-to-people-alignment-system",
    },
    { label: "The Executive Reset™", href: "/the-executive-reset" },
    {
      label: "The Executive Reset™ (Facilitated)",
      href: "/corporate-experiences",
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Digital Product Licence", href: "/licence-terms" },
  ],
};
