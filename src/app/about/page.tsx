import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FounderPortrait } from "@/components/FounderPortrait";
import {
  Section,
  SectionHeading,
  ButtonLink,
  Card,
  IconCircle,
  Arrow,
  Rule,
} from "@/components/ui";
import { IconStrategy, IconPeople, IconTarget } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Avensra",
  description:
    "Avensra Consulting is a business and people strategy consultancy helping organisations turn strategic priorities into practical action, stronger organisational capability and measurable performance.",
  alternates: { canonical: "/about" },
};

const founder = {
  name: "Nana Ama Setorwofia",
  role: "Founder & Principal Consultant",
};

/** The three solution areas, each linked to where the detail lives. */
const solutions = [
  {
    icon: IconStrategy,
    title: "Business and People Strategy",
    body: "Structured tools and advisory support that help organisations connect business priorities to organisational capability, workforce decisions, investment and measurable outcomes.",
    href: "/business-to-people-alignment-system",
    linkLabel: "Explore the system",
  },
  {
    icon: IconPeople,
    title: "Corporate Experiences",
    body: "Purpose-built experiences that create space for leaders and teams to reset, realign and return to work with greater clarity.",
    href: "/corporate-experiences",
    linkLabel: "Explore experiences",
  },
  {
    icon: IconTarget,
    title: "Executive Positioning",
    body: "Consulting support for experienced professionals seeking to articulate their value, strengthen their executive positioning and compete more effectively for senior opportunities.",
    href: "/executive-career-positioning",
    linkLabel: "Explore positioning",
  },
];

/** The questions that open every engagement. */
const approachQuestions = [
  "What is the organisation trying to achieve?",
  "What capabilities will that require?",
  "What could prevent execution?",
  "Where should leaders invest?",
  "How will success be measured?",
];

const standards = [
  "You should understand the problem more clearly.",
  "You should know what decisions need to be made.",
  "You should have practical tools for acting on those decisions.",
  "And you should be able to determine whether the work is producing results.",
];

export default function AboutPage() {
  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    description:
      "A business and people strategy consultancy helping organisations turn strategic priorities into practical action, stronger organisational capability and measurable performance.",
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      worksFor: { "@type": "Organization", name: site.legalName },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />

      <PageHero
        eyebrow="About Avensra"
        title={
          <>
            Strategy that connects.
            <span className="block">People who deliver.</span>
            <span className="block text-goldink">Performance that lasts.</span>
          </>
        }
        lead="Avensra Consulting is a business and people strategy consultancy helping organisations turn strategic priorities into practical action, stronger organisational capability and measurable performance."
      />

      {/* --------------------------- The gap ---------------------------- */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="At the point where business strategy, people and execution meet"
              align="left"
            />
          </Reveal>

          <Reveal delay={100} className="space-y-5 text-[1.02rem] leading-relaxed text-charcoal/80">
            <p>
              Many organisations know where they want to go. The challenge is translating
              that direction into the capabilities, workforce priorities, leadership actions
              and operating decisions required to get there.
            </p>
            <p className="font-heading text-xl text-navy sm:text-2xl">
              Avensra exists to help close that gap.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------- What we do -------------------------- */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow="What we do"
          title="From insight to action"
          lead="We develop practical consulting solutions, digital tools and corporate experiences that help organisations and professionals move from insight to action."
          className="mb-6"
        />
        <p className="mx-auto mb-14 max-w-2xl text-center text-[0.98rem] leading-relaxed text-charcoal/70">
          Our work is designed around a simple principle: people initiatives should connect
          clearly to the outcomes the organisation is trying to achieve.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          {solutions.map(({ icon: Icon, title, body, href, linkLabel }, index) => (
            <Reveal key={title} delay={index * 100}>
              <Card tone="white" className="group flex h-full flex-col p-8 lg:p-9">
                <IconCircle>
                  <Icon className="h-7 w-7" />
                </IconCircle>
                <h3 className="mt-6 font-heading text-xl text-navy">{title}</h3>
                <Rule className="my-4" />
                <p className="text-[0.95rem] leading-relaxed text-charcoal/75">{body}</p>
                <div className="mt-auto pt-7">
                  <Link
                    href={href}
                    className="tap-expand inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-goldink transition-colors duration-300 ease-[var(--ease-glide)] hover:text-goldink"
                  >
                    {linkLabel}
                    <Arrow className="shrink-0 transition-transform duration-300 ease-[var(--ease-glide)] group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-14 max-w-2xl text-center text-[1.02rem] leading-relaxed text-charcoal/80">
            Our work combines structured methodology with practical application. The goal is
            not to produce strategy that sits on a shelf. It is to help clients make better
            decisions and execute them.
          </p>
        </Reveal>
      </Section>

      {/* -------------------------- Our approach ------------------------- */}
      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-goldink">
              Our approach
            </p>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-white sm:text-4xl">
              We start with the business.
            </h2>
            <Rule />
            <p className="text-[0.98rem] leading-relaxed text-white/70">
              From there, we connect the people, organisational and leadership decisions
              required to support those priorities.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="divide-y divide-white/12 border-y border-white/12">
              {approachQuestions.map((question) => (
                <li
                  key={question}
                  className="flex items-start gap-4 py-4 text-[1.02rem] leading-relaxed text-white/85"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {question}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-white/65">
              <p>
                This approach shapes Avensra&rsquo;s consulting engagements and the products
                we build.
              </p>
              <p>
                It is also why our solutions are designed to be practical, structured and
                usable. Clients should leave with clear decisions, defined actions and tools
                they can continue using after the engagement ends.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------ Meet the founder ----------------------- */}
      <Section tone="white">
        {/* The name is carried by the portrait caption and the opening line
            of the bio — repeating it as the section title too read as a
            stutter, so the title does different work. */}
        <SectionHeading
          eyebrow="Meet the founder"
          title="The experience behind Avensra"
          className="mb-14"
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <Reveal>
            <FounderPortrait />
            <div className="mt-8">
              <p className="font-heading text-2xl text-navy">{founder.name}</p>
              <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-goldink">
                {founder.role}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="space-y-5 text-[1.02rem] leading-relaxed text-charcoal/80">
            <p>
              Avensra Consulting was founded by {founder.name}, a business and people leader
              with more than 15 years of professional experience across multiple industries
              and organisational environments.
            </p>
            <p>
              Her career has included senior HR leadership, organisational strategy,
              workforce transformation, capability development, employee relations,
              operations and business-facing leadership responsibilities.
            </p>
            <p>
              Throughout her career, one challenge appeared repeatedly: organisations often
              invest significantly in people initiatives without creating a strong enough
              connection between those investments and the business outcomes they need to
              achieve.
            </p>
            <p className="border-l-2 border-gold bg-ivory px-6 py-4 font-heading text-xl text-navy">
              That experience shaped the thinking behind Avensra.
            </p>
            <p>
              Nana Ama&rsquo;s work focuses on making that connection clearer. She brings
              together business context, people strategy, structured problem-solving and
              practical execution to help leaders move from broad organisational ambitions
              to decisions they can implement and measure.
            </p>
            <p>
              She has also contributed to professional and business conversations through
              speaking engagements, facilitation, career development initiatives and media
              discussions.
            </p>
            <p>
              Avensra brings that experience into a consulting model designed to serve
              organisations and professionals across markets.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* --------------------------- Why Avensra ------------------------- */}
      <Section tone="ivory">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-goldink">
              Why Avensra
            </p>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-navy sm:text-4xl">
              Good consulting should leave you with more than recommendations
            </h2>
            <Rule className="mx-auto" />
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-4 space-y-5">
              {standards.map((standard) => (
                <li
                  key={standard}
                  className="text-[1.05rem] leading-relaxed text-charcoal/80"
                >
                  {standard}
                </li>
              ))}
            </ul>

            <p className="mt-10 text-[0.98rem] leading-relaxed text-charcoal/70">
              That is the standard we are building Avensra around.
            </p>

            <p className="mt-8 font-heading text-2xl leading-snug text-navy sm:text-[1.9rem]">
              Clear strategy. <span className="text-goldink">Aligned people.</span> Stronger
              execution.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------- CTA ----------------------------- */}
      <Section tone="ivory" size="compact">
        <Reveal className="flex flex-col items-center gap-8 bg-navy px-8 py-12 text-center sm:px-12 lg:flex-row lg:justify-between lg:gap-12 lg:text-left">
          <div>
            <h2 className="font-heading text-2xl leading-tight text-white sm:text-[1.9rem]">
              Let&rsquo;s talk about what you are trying to achieve
            </h2>
            <p className="mt-3 text-[0.95rem] text-white/70">
              Tell us where the gap is showing up and we will tell you honestly whether we
              can help.
            </p>
          </div>
          <ButtonLink href="/contact" variant="gold" className="shrink-0 px-9 py-4">
            Get in touch <Arrow />
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
