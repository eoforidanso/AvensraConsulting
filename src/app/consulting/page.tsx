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
import { IconPeople, IconTarget } from "@/components/icons";
import {
  consultingIntro,
  executiveCareerPositioning,
  businessToPeopleAdvisorySupport,
} from "@/content/consulting";

export const metadata: Metadata = {
  title: "Consulting & Advisory",
  description: consultingIntro,
  alternates: { canonical: "/consulting" },
};

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Consulting & Advisory"
        title={
          <>
            Focused advisory,
            <span className="block text-goldink">built around you</span>
          </>
        }
        lead={consultingIntro}
      >
        <ButtonLink href="/contact?topic=Consulting" variant="gold">
          Start a conversation <Arrow />
        </ButtonLink>
      </PageHero>

      <Section tone="white">
        <SectionHeading
          eyebrow="Two ways to work with us"
          title="Advisory, not automation"
          lead="Both services are one-to-one. There is no self-serve version of either — that is the point."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Executive Career Positioning */}
          <Reveal>
            <Card tone="ivory" className="flex h-full flex-col p-8 lg:p-10">
              <IconCircle>
                <IconTarget className="h-7 w-7" />
              </IconCircle>
              <h2 className="mt-6 font-heading text-2xl text-navy">
                {executiveCareerPositioning.name}
              </h2>
              <Rule className="my-4" />
              <p className="text-[0.95rem] leading-relaxed text-charcoal/75">
                {executiveCareerPositioning.tagline}
              </p>
              <ul className="mt-6 space-y-2.5 text-charcoal/85">
                {executiveCareerPositioning.pillars.map((pillar) => (
                  <Bullet key={pillar.n}>{pillar.title}</Bullet>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <ButtonLink href="/executive-career-positioning" variant="navy">
                  Explore Executive Career Positioning <Arrow />
                </ButtonLink>
              </div>
            </Card>
          </Reveal>

          {/* Business-to-People Advisory Support */}
          <Reveal delay={100}>
            <Card
              tone="ivory"
              id="business-to-people-advisory-support"
              className="flex h-full scroll-mt-28 flex-col p-8 lg:p-10"
            >
              <IconCircle>
                <IconPeople className="h-7 w-7" />
              </IconCircle>
              <h2 className="mt-6 font-heading text-2xl text-navy">
                {businessToPeopleAdvisorySupport.name}
              </h2>
              <Rule className="my-4" />
              <p className="text-[0.95rem] leading-relaxed text-charcoal/75">
                {businessToPeopleAdvisorySupport.tagline}
              </p>
              <p className="mt-5 text-[0.92rem] leading-relaxed text-charcoal/70">
                {businessToPeopleAdvisorySupport.body}
              </p>
              <p className="mt-6 border-l-2 border-gold bg-white px-4 py-3 text-[0.85rem] leading-relaxed text-charcoal/70">
                {businessToPeopleAdvisorySupport.eligibility}
              </p>
              <div className="mt-auto pt-8">
                <ButtonLink href="/contact?topic=Consulting" variant="navy">
                  Enquire about advisory support <Arrow />
                </ButtonLink>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="ivory">
        <Reveal className="grid gap-10 border border-ivory-200 bg-white p-9 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Not ready for one-to-one advisory?"
              title="Start with the system instead"
              align="left"
              lead="The Business-to-People Alignment System™ puts the same frameworks, diagnostics and templates in your hands, to use at your own pace — with advisory support available if you want it."
            />
          </div>
          <div className="flex flex-col gap-3">
            <ButtonLink href="/business-to-people-alignment-system" variant="navy">
              Explore the system <Arrow />
            </ButtonLink>
            <ButtonLink href="/contact?topic=Consulting" variant="outline">
              Talk to us first
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
