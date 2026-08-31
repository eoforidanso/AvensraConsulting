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
import { IconTarget, IconProduct, IconGlobe, IconStrategy } from "@/components/icons";
import { executiveCareerPositioning as ecp } from "@/content/consulting";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: ecp.name,
  description: ecp.tagline,
  alternates: { canonical: "/executive-career-positioning" },
  openGraph: {
    title: `${ecp.name} | ${site.name}`,
    description: ecp.tagline,
    url: `${site.url}/executive-career-positioning`,
    type: "website",
  },
};

const pillarIcons = [IconTarget, IconProduct, IconGlobe, IconStrategy];

export default function ExecutiveCareerPositioningPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: ecp.name,
    description: ecp.tagline,
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
    areaServed: "Global",
    url: `${site.url}/executive-career-positioning`,
    serviceType: "Executive career advisory",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <PageHero
        eyebrow="Consulting & Advisory"
        title={
          <>
            Executive Career
            <span className="block text-gold">Positioning&trade;</span>
          </>
        }
        lead={ecp.tagline}
      >
        <ButtonLink href="/contact?topic=Consulting" variant="gold">
          Start a conversation <Arrow />
        </ButtonLink>
      </PageHero>

      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-5 text-center text-[1.02rem] leading-relaxed text-charcoal/80">
          {ecp.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHeading
          eyebrow="How it works"
          title="Four areas, one clear position"
          lead="Every engagement is one-to-one and built around where you are now — most people draw on all four areas over the course of the advisory."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {ecp.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? IconTarget;
            return (
              <Reveal key={pillar.n} delay={(index % 2) * 100}>
                <Card tone="white" className="flex h-full flex-col p-8 lg:p-10">
                  <div className="flex items-start gap-5">
                    <IconCircle>
                      <Icon className="h-7 w-7" />
                    </IconCircle>
                    <div>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
                        {pillar.n}
                      </span>
                      <h2 className="mt-1 font-heading text-xl text-navy sm:text-2xl">
                        {pillar.title}
                      </h2>
                    </div>
                  </div>
                  <Rule className="my-5" />
                  <ul className="space-y-2.5 text-charcoal/85">
                    {pillar.items.map((item) => (
                      <Bullet key={item}>{item}</Bullet>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="navy">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
            Get started
          </p>
          <h2 className="mt-5 font-heading text-3xl leading-tight text-white sm:text-4xl">
            Let&rsquo;s talk about your positioning
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-white/70">
            Every advisory starts with a conversation about where you are and where you are
            trying to get to. Tell us a little about your situation and we will come back to
            you directly.
          </p>
          <div className="mx-auto mt-8 max-w-sm">
            <ButtonLink
              href="/contact?topic=Consulting"
              variant="gold"
              className="w-full"
            >
              Start a conversation <Arrow />
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
