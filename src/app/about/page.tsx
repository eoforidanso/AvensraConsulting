import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import {
  Section,
  SectionHeading,
  ButtonLink,
  IconCircle,
  Arrow,
  Rule,
} from "@/components/ui";
import {
  IconStrategy,
  IconPeople,
  IconPerformance,
  IconShield,
  IconTarget,
  IconGlobe,
} from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Avensra",
  description:
    "Avensra Consulting helps organisations align strategy with the people expected to deliver it — through consulting, digital systems and facilitated experiences.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: IconStrategy,
    title: "Alignment before activity",
    body: "Most strategies do not fail in the boardroom. They fail in the gap between what was decided and what people understood they were being asked to do. We start by closing that gap.",
  },
  {
    icon: IconPeople,
    title: "People are the delivery mechanism",
    body: "A strategy is only ever delivered through people — their clarity, their capability and their willingness. Treating that as a separate workstream is why so much good thinking never lands.",
  },
  {
    icon: IconPerformance,
    title: "Practical over theoretical",
    body: "Frameworks that stay in a deck change nothing. Everything we build is designed to be used by real teams, in real conditions, without a consultant in the room.",
  },
];

const values = [
  {
    icon: IconShield,
    title: "Proven frameworks",
    body: "Built on real-world experience and results, not borrowed theory.",
  },
  {
    icon: IconTarget,
    title: "Measurable impact",
    body: "Alignment that drives clarity, engagement and performance you can see.",
  },
  {
    icon: IconGlobe,
    title: "Global perspective",
    body: "Solutions designed for organisations across industries and regions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Avensra"
        title={
          <>
            Strategy is important.
            <span className="block text-gold">Alignment is everything.</span>
          </>
        }
        lead={site.description}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Why Avensra exists"
              title="The distance between a strategy and the people who deliver it"
              align="left"
            />
          </div>
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-charcoal/80">
            <p>
              Organisations rarely struggle for want of a plan. They struggle because the
              plan and the people are held in two different conversations &mdash; one about
              direction, one about delivery &mdash; and nobody owns the space between them.
            </p>
            <p>
              That space is where clarity leaks away. Priorities get reinterpreted at each
              level. Roles are designed around history rather than the strategy. Performance
              measures reward something other than what the strategy needs. By the time it
              reaches the people doing the work, the strategy has quietly become something
              else.
            </p>
            <p>
              Avensra works in that space. We help leaders translate strategy into
              structures, roles, capability and rhythms that their people can actually act
              on &mdash; so performance is not just planned, it is lived.
            </p>
            <p>
              We do that three ways: through consulting engagements, through digital
              systems and tools organisations can use themselves, and through facilitated
              experiences that give leadership teams the room to reset and realign.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHeading
          eyebrow="How we think"
          title="Three principles behind everything we build"
          className="mb-14"
        />
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {principles.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <IconCircle>
                <Icon className="h-7 w-7" />
              </IconCircle>
              <h3 className="mt-6 font-heading text-xl text-navy">{title}</h3>
              <Rule className="my-4" />
              <p className="text-[0.95rem] leading-relaxed text-charcoal/75">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHeading
          eyebrow="What we bring"
          title="Consulting judgement, made usable"
          tone="light"
          lead="Avensra's frameworks come from work inside real organisations, then get shaped into something a team can pick up and run with."
          className="mb-14"
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-5">
              <IconCircle size="sm">
                <Icon className="h-5 w-5" />
              </IconCircle>
              <div>
                <h3 className="font-body text-[0.72rem] font-bold uppercase tracking-[0.11em] text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-white/65">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ivory" size="compact">
        <div className="flex flex-col items-center gap-8 bg-white px-8 py-12 text-center sm:px-12 lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="font-heading text-2xl leading-tight text-navy sm:text-[1.9rem]">
              Let&rsquo;s talk about what alignment would change for you
            </h2>
            <p className="mt-3 text-[0.95rem] text-charcoal/70">
              Tell us where the gap is showing up and we will tell you honestly whether we
              can help.
            </p>
          </div>
          <ButtonLink href="/contact" variant="gold" className="shrink-0 px-9 py-4">
            Get in touch <Arrow />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
