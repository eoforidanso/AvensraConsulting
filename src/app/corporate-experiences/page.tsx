import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CorporateForm } from "@/components/forms/CorporateForm";
import { Reveal } from "@/components/Reveal";
import {
  Section,
  SectionHeading,
  ButtonLink,
  Card,
  Bullet,
  IconCircle,
  Arrow,
  Rule,
} from "@/components/ui";
import { IconClock, IconPeople, IconLicence, IconGlobe } from "@/components/icons";
import { experiences, licensingBenefits } from "@/content/experiences";
import { formatUsd } from "@/content/products";

export const metadata: Metadata = {
  title: "Corporate Experiences",
  description:
    "Facilitated Executive Reset™ experiences and corporate licensing for organisations — 30, 45 and 60-minute formats for up to 20 participants, in person or online.",
  alternates: { canonical: "/corporate-experiences" },
};

const included = [
  "A facilitator who has run the experience many times",
  "All participant materials, licensed for the session",
  "A short pre-session conversation to tune the emphasis",
  "Delivery in person or online, wherever your team is",
];

export default function CorporateExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate Experiences"
        title={
          <>
            Give your leaders room to
            <span className="block text-gold">reset and realign</span>
          </>
        }
        lead="Facilitated experiences and licensing options that help leaders reset, realign and return with clarity."
      >
        <ButtonLink href="#enquiry" variant="gold">
          Send an enquiry <Arrow />
        </ButtonLink>
      </PageHero>

      {/* --------------------------- Experiences -------------------------- */}
      <Section tone="white" id="experiences">
        <SectionHeading
          eyebrow="Avensra-facilitated"
          title="The Executive Reset™, run for your team"
          lead="Release → Reset → Reflect → Return. Choose the length that fits the moment you are designing around."
          className="mb-14"
        />

        <div className="grid gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((experience, index) => (
            <Reveal
              key={experience.id}
              delay={index * 90}
              className={`flex flex-col bg-white px-7 py-9 ${
                experience.featured ? "ring-1 ring-inset ring-gold/40" : ""
              }`}
            >
              {/* Reserved on every card so the badge never pushes one row out
                  of line with the others. */}
              <div className="mb-4 min-h-[1.5rem]">
                {experience.featured ? (
                  <span className="inline-block bg-gold px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-navy">
                    Most requested
                  </span>
                ) : null}
              </div>

              <IconCircle size="sm">
                {experience.fromUsd === null ? (
                  <IconPeople className="h-5 w-5" />
                ) : (
                  <IconClock className="h-5 w-5" />
                )}
              </IconCircle>

              <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
                {experience.duration}
              </p>
              <h3 className="mt-2 font-heading text-xl leading-snug text-navy">
                {experience.name}
              </h3>
              <p className="mt-3 text-[0.85rem] font-medium text-charcoal/80">
                {experience.promise}
              </p>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-charcoal/65">
                {experience.body}
              </p>

              <div className="mt-auto pt-7">
                {experience.fromUsd === null ? (
                  <ButtonLink href="#enquiry" variant="outline" className="w-full">
                    Contact us <Arrow />
                  </ButtonLink>
                ) : (
                  <>
                    <p className="text-[0.65rem] uppercase tracking-[0.14em] text-charcoal/50">
                      From
                    </p>
                    <p className="font-heading text-[2rem] leading-none text-navy">
                      {formatUsd(experience.fromUsd)}
                    </p>
                    <p className="mt-1.5 text-[0.72rem] text-charcoal/55">
                      {experience.capacity}
                    </p>
                    <ButtonLink href="#enquiry" variant="navy" className="mt-5 w-full">
                      Enquire <Arrow />
                    </ButtonLink>
                  </>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-charcoal/60">
          Prices shown are guide prices in USD for standard delivery. Final pricing depends
          on format, participant numbers, location and travel, and is confirmed in a written
          quotation.
        </p>
      </Section>

      {/* ---------------------------- Included ---------------------------- */}
      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What is included"
              title="Everything except the diary wrangling"
              tone="light"
              align="left"
            />
            <ul className="mt-2 space-y-3 text-white/85">
              {included.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <Card tone="navy" className="h-full p-7">
                <IconCircle size="sm">
                  <IconPeople className="h-5 w-5" />
                </IconCircle>
                <h3 className="mt-5 font-body text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white">
                  Up to 20 participants
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-white/65">
                  Small enough that people actually speak. For 21 or more we design a custom
                  format.
                </p>
              </Card>
            </Reveal>
            <Reveal delay={100}>
              <Card tone="navy" className="h-full p-7">
                <IconCircle size="sm">
                  <IconGlobe className="h-5 w-5" />
                </IconCircle>
                <h3 className="mt-5 font-body text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white">
                  In person or online
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-white/65">
                  Both formats are designed properly. The online version is not a compromise
                  of the in-person one.
                </p>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------- Licensing --------------------------- */}
      <Section tone="ivory" id="licensing">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Corporate licensing"
              title="Run it yourself, under licence"
              align="left"
              lead="Empower your own teams to facilitate Executive Reset™ sessions internally, using licensed Avensra material."
            />
            <IconCircle className="mt-2">
              <IconLicence className="h-7 w-7" />
            </IconCircle>
          </div>

          <Reveal>
            <Card tone="white" className="p-8 sm:p-10">
              <h3 className="font-heading text-xl text-navy">A corporate licence covers</h3>
              <Rule className="my-4" />
              <ul className="space-y-3 text-charcoal/85">
                {licensingBenefits.map((benefit) => (
                  <Bullet key={benefit}>{benefit}</Bullet>
                ))}
              </ul>
              <p className="mt-7 border-t border-ivory-200 pt-6 text-[0.9rem] leading-relaxed text-charcoal/70">
                Licences are quoted per organisation based on participant volumes, duration
                and territory. Enquiries, quotations, participant lists, invoicing and
                licence administration are handled directly by Avensra.
              </p>
              <ButtonLink href="#enquiry" variant="navy" className="mt-7">
                Request licensing details <Arrow />
              </ButtonLink>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* ----------------------------- Enquiry ---------------------------- */}
      <Section tone="white" id="enquiry">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Enquire"
              title="Tell us what you are planning"
              align="left"
              lead="A few details are enough to get you a quotation and some dates. If it is easier to talk it through, say so and we will arrange a call."
            />
            <div className="mt-2 space-y-4 text-[0.9rem] leading-relaxed text-charcoal/70">
              <p>
                <strong className="text-navy">Response time:</strong> usually within one
                business day.
              </p>
              <p>
                <strong className="text-navy">No obligation:</strong> a quotation is a
                quotation, not a commitment.
              </p>
            </div>
          </div>

          <Reveal>
            <Card tone="ivory" className="p-8 sm:p-10">
              <CorporateForm />
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
