/**
 * Consulting & Advisory.
 *
 * Executive Career Positioning™ was gated by the Phase 1 brief — "still
 * under development... should only be published after Avensra approves the
 * final offer" — and is published here from that approved offer.
 *
 * This replaces the earlier four-pillar "Strategy & Business Alignment /
 * Organisation Design & Effectiveness / Leadership & People Alignment /
 * Performance & Change" framing, which was drawn from decorative bullet
 * points on the design-direction artwork rather than a specified service
 * catalogue. The approved offer is these two named advisory services.
 */

export type AdvisorySummary = {
  slug: string;
  name: string;
  tagline: string;
  href: string;
};

/** Concise, homepage-safe summaries only — full detail lives on each page. */
export const advisoryServices: AdvisorySummary[] = [
  {
    slug: "executive-career-positioning",
    name: "Executive Career Positioning™",
    tagline:
      "One-to-one advisory for experienced professionals preparing for senior leadership and executive opportunities.",
    href: "/executive-career-positioning",
  },
  {
    slug: "business-to-people-advisory-support",
    name: "Business-to-People Advisory Support",
    tagline:
      "Optional expert guidance for purchasers of the Business-to-People Alignment System™ as they develop and refine their people strategy.",
    href: "/consulting#business-to-people-advisory-support",
  },
];

export const consultingIntro =
  "Focused advisory support for executive career positioning and successful people strategy development.";

export type PositioningPillar = {
  n: string;
  title: string;
  items: string[];
};

export const executiveCareerPositioning = {
  name: "Executive Career Positioning™",
  tagline:
    "One-to-one strategic advisory for experienced professionals preparing for senior leadership, executive and future board-level opportunities.",
  intro: [
    "Executive Career Positioning™ helps experienced professionals reposition how the market understands their value.",
    "The service examines your experience, leadership contribution, business impact and career direction to develop a clear executive position. It then translates that positioning across your professional profile, market narrative and career strategy.",
  ],
  pillars: [
    {
      n: "1.",
      title: "Executive Brand & Positioning",
      items: [
        "Executive brand audit",
        "Leadership profile assessment",
        "Market positioning",
        "Executive value proposition",
        "Positioning against target opportunities",
      ],
    },
    {
      n: "2.",
      title: "Executive Narrative & Profile",
      items: [
        "Executive CV",
        "LinkedIn executive positioning",
        "Executive biography",
        "Career narrative",
        "Reframing functional achievements into enterprise and business impact",
        "Leadership achievement evidence",
        "Executive interview story bank",
      ],
    },
    {
      n: "3.",
      title: "Executive Presence & Market Visibility",
      items: [
        "Executive communication",
        "Interview coaching and preparation",
        "LinkedIn thought-leadership positioning",
        "Speaking profile",
        "Professional image and executive presence",
      ],
    },
    {
      n: "4.",
      title: "Executive Career Strategy",
      items: [
        "Target-role and target-organisation strategy",
        "Career transition strategy",
        "Promotion and progression roadmap",
        "Strategic networking",
        "Salary and executive compensation negotiation",
        "Board-readiness positioning",
      ],
    },
  ] satisfies PositioningPillar[],
};

export const businessToPeopleAdvisorySupport = {
  name: "Business-to-People Advisory Support",
  tagline:
    "Optional expert guidance for purchasers of the Business-to-People Alignment System™ as they develop and refine their people strategy.",
  body: "The Alignment System is built to be used on your own. This advisory support is for teams who would rather have an Avensra consultant alongside them for part of that journey — reviewing your diagnostic results, sense-checking your alignment plan, or working through a specific sticking point with your leadership team.",
  eligibility:
    "Available to purchasers of the Business-to-People Alignment System™. Mention your order reference when you enquire, so we can confirm your purchase and get started.",
};
