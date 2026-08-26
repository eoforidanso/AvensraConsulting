import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  Section,
  SectionHeading,
  ButtonLink,
  Card,
  IconCircle,
  Bullet,
  Arrow,
  Rule,
} from "@/components/ui";
import {
  IconStrategy,
  IconPeople,
  IconPerformance,
  IconTools,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Consulting",
  description:
    "Strategy, alignment and performance consulting that turns your vision into measurable results — organisation design, leadership alignment, performance and change.",
  alternates: { canonical: "/consulting" },
};

/**
 * PUBLISHED CONSULTING SERVICES.
 *
 * Executive Career Positioning™ is deliberately NOT listed. Per the Phase 1
 * brief it is still under development and must only be published once Avensra
 * approves the final offer. To publish it later, add an entry to this array —
 * the page, navigation and sitemap pick it up with no other changes.
 */
const services = [
  {
    icon: IconStrategy,
    title: "Strategy & Business Alignment",
    body: "Translating strategic intent into priorities, decisions and trade-offs that hold up at every level of the organisation.",
    points: [
      "Strategy clarification and articulation",
      "Priority and trade-off frameworks",
      "Cascade design so intent survives translation",
      "Alignment diagnostics across leadership layers",
    ],
  },
  {
    icon: IconTools,
    title: "Organisation Design & Effectiveness",
    body: "Shaping structures, roles and ways of working around what the strategy actually requires, rather than around how things have always been arranged.",
    points: [
      "Operating model and structure review",
      "Role clarity and accountability mapping",
      "Decision rights and governance design",
      "Capability gap assessment",
    ],
  },
  {
    icon: IconPeople,
    title: "Leadership & People Alignment",
    body: "Building the shared understanding and commitment a leadership team needs before it asks the wider organisation to move.",
    points: [
      "Leadership team alignment sessions",
      "Behavioural expectations and modelling",
      "Communication and engagement design",
      "Manager enablement",
    ],
  },
  {
    icon: IconPerformance,
    title: "Performance & Change",
    body: "Putting measurement, rhythm and reinforcement in place so alignment outlives the workshop that created it.",
    points: [
      "Performance framework and measure design",
      "Operating rhythm and review cadence",
      "Change readiness and adoption planning",
      "Embedding and sustainment",
    ],
  },
];

const approach = [
  {
    step: "01",
    title: "Understand",
    body: "We start with where the gap is actually showing up — not where it is assumed to be. That usually means talking to people at more than one level.",
  },
  {
    step: "02",
    title: "Diagnose",
    body: "We map the distance between the strategy as written and the strategy as understood, and identify what is causing the drift.",
  },
  {
    step: "03",
    title: "Design",
    body: "We build the structures, roles, measures and rhythms that close the gap, sized to what your organisation can realistically absorb.",
  },
  {
    step: "04",
    title: "Embed",
    body: "We hand over tools and practices your own people can run, so the alignment does not leave when we do.",
  },
];

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Consulting"
        title={
          <>
            Turn your vision into
            <span className="block text-gold">measurable results</span>
          </>
        }
        lead="Strategy, alignment and performance solutions for organisations that need their plan to land with the people expected to deliver it."
      >
        <ButtonLink href="/contact" variant="gold">
          Start a conversation <Arrow />
        </ButtonLink>
      </PageHero>

      <Section tone="white">
        <SectionHeading
          eyebrow="What we do"
          title="Four areas, one outcome"
          lead="Most engagements draw on more than one of these. We scope to the problem, not to a package."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {services.map(({ icon: Icon, title, body, points }, index) => (
            <Reveal key={title} delay={(index % 2) * 100}>
              <Card tone="ivory" className="flex h-full flex-col p-8 lg:p-10">
                <IconCircle>
                  <Icon className="h-7 w-7" />
                </IconCircle>
                <h2 className="mt-6 font-heading text-2xl text-navy">{title}</h2>
                <Rule className="my-4" />
                <p className="text-[0.95rem] leading-relaxed text-charcoal/75">{body}</p>
                <ul className="mt-6 space-y-2.5 text-charcoal/85">
                  {points.map((point) => (
                    <Bullet key={point}>{point}</Bullet>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHeading
          eyebrow="How we work"
          title="A sequence, not a template"
          tone="light"
          className="mb-14"
        />
        <ol className="grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map(({ step, title, body }, index) => (
            <Reveal key={step} as="li" delay={index * 90} className="bg-navy px-7 py-9">
              <span className="font-heading text-4xl text-gold/45">{step}</span>
              <h3 className="mt-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.13em] text-white">
                {title}
              </h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-white/65">{body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="ivory">
        <Reveal className="grid gap-10 border border-ivory-200 bg-white p-9 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Not ready for an engagement?"
              title="Start with the system instead"
              align="left"
              lead="The Business-to-People Alignment System™ puts the same frameworks, diagnostics and templates in your hands, to use at your own pace."
            />
          </div>
          <div className="flex flex-col gap-3">
            <ButtonLink href="/business-to-people-alignment-system" variant="navy">
              Explore the system <Arrow />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Talk to us first
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
