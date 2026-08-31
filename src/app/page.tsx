import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ProductVisual } from "@/components/ProductVisual";
import { Reveal } from "@/components/Reveal";
import {
  Container,
  Section,
  SectionHeading,
  ButtonLink,
  LinkArrow,
  IconCircle,
  Rule,
  Eyebrow,
  Arrow,
} from "@/components/ui";
import {
  IconStrategy,
  IconPeople,
  IconPerformance,
  IconProduct,
  IconShield,
  IconTarget,
  IconGlobe,
  IconTools,
  IconClock,
  IconLicence,
} from "@/components/icons";
import { products, formatUsd } from "@/content/products";
import { experiences } from "@/content/experiences";
import { advisoryServices, consultingIntro } from "@/content/consulting";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

const pillars = [
  { icon: IconStrategy, title: "Strategy", sub: "that clarifies" },
  { icon: IconPeople, title: "People", sub: "that deliver" },
  { icon: IconPerformance, title: "Performance", sub: "that lasts" },
];

const trustSignals = [
  {
    icon: IconShield,
    title: "Proven frameworks",
    body: "Built on real-world experience and results.",
  },
  {
    icon: IconTools,
    title: "Practical & applicable",
    body: "Tools and experiences your teams can use tomorrow.",
  },
  {
    icon: IconTarget,
    title: "Measurable impact",
    body: "Alignment that drives clarity, engagement and performance.",
  },
  {
    icon: IconGlobe,
    title: "Global perspective",
    body: "Solutions for organisations across industries and regions.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------ Hero ------------------------------ */}
      <section className="relative isolate bg-navy">
        <HeroBackdrop />
        <Container className="relative">
          {/* Top padding clears the fixed header (80px mobile / 88px lg+),
              which floats over this section rather than pushing it down. */}
          <div className="max-w-2xl pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-44 lg:pb-36">
            <h1 className="hero-rise text-[2.75rem] leading-[1.06] tracking-[-0.015em] text-white sm:text-5xl lg:text-[4rem] xl:text-[4.5rem]">
              Strategy is important.
              <span className="mt-1 block text-gold">Alignment is everything.</span>
            </h1>

            <div className="hero-rise" style={{ animationDelay: "120ms" }}>
              <Rule />
            </div>

            <p
              className="hero-rise max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ animationDelay: "180ms" }}
            >
              Avensra helps organisations align their strategy with their people so
              performance is not just planned, it is lived.
            </p>

            <div
              className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4"
              style={{ animationDelay: "280ms" }}
            >
              <ButtonLink href="/digital-products" variant="gold">
                Explore Digital Products <Arrow />
              </ButtonLink>
              <ButtonLink href="/corporate-experiences" variant="outline-light">
                Corporate Experiences
              </ButtonLink>
            </div>

            <dl
              className="hero-rise mt-14 grid max-w-xl grid-cols-1 gap-6 border-t border-white/15 pt-8 xs:grid-cols-3 sm:gap-4"
              style={{ animationDelay: "380ms" }}
            >
              {pillars.map(({ icon: Icon, title, sub }, index) => (
                <div
                  key={title}
                  className={`flex items-center gap-3 ${
                    index > 0 ? "xs:border-l xs:border-white/15 xs:pl-5" : ""
                  }`}
                >
                  <Icon className="h-7 w-7 shrink-0 text-gold" />
                  <div>
                    <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">
                      {title}
                    </dt>
                    <dd className="text-[0.68rem] uppercase tracking-[0.14em] text-white/55">
                      {sub}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* ------------------------- Three offer columns -------------------- */}
      <section className="bg-white">
        <Container>
          <div className="grid divide-y divide-ivory-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {/* Consulting */}
            <Reveal className="group flex flex-col px-0 py-14 lg:px-9 lg:py-16 lg:first:pl-0">
              <IconCircle className="mx-auto">
                <IconStrategy className="h-7 w-7" />
              </IconCircle>
              <h2 className="mt-6 flex min-h-[3.7rem] items-start justify-center text-center font-heading text-[1.45rem] leading-tight tracking-[0.02em] text-balance text-navy xl:text-[1.6rem]">
                CONSULTING &amp; ADVISORY
              </h2>
              <p className="mt-4 text-center text-[0.95rem] leading-relaxed text-charcoal/75">
                {consultingIntro}
              </p>

              {/* Concise summary only — one line each, no full service
                  descriptions. Detail lives on /consulting and the
                  Executive Career Positioning page. */}
              <ul className="mt-7 space-y-5">
                {advisoryServices.map((service) => (
                  <li key={service.slug}>
                    <p className="font-body text-[0.78rem] font-bold uppercase tracking-[0.06em] text-navy">
                      {service.name}
                    </p>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-charcoal/70">
                      {service.tagline}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-9">
                <ButtonLink href="/consulting" variant="navy" className="w-full sm:w-auto">
                  Explore Consulting <Arrow />
                </ButtonLink>
              </div>
            </Reveal>

            {/* Digital products */}
            <Reveal delay={110} className="group flex flex-col px-0 py-14 lg:px-9 lg:py-16">
              <IconCircle className="mx-auto">
                <IconProduct className="h-7 w-7" />
              </IconCircle>
              <h2 className="mt-6 flex min-h-[3.7rem] items-start justify-center text-center font-heading text-[1.45rem] leading-tight tracking-[0.02em] text-balance text-navy xl:text-[1.6rem]">
                DIGITAL PRODUCTS
              </h2>
              <p className="mt-4 text-center text-[0.95rem] leading-relaxed text-charcoal/75">
                Practical systems and experiences that help leaders and teams create
                alignment every day.
              </p>

              <div className="mt-7 space-y-6">
                {products.map((product, index) => (
                  <div
                    key={product.slug}
                    className={index > 0 ? "border-t border-ivory-200 pt-6" : ""}
                  >
                    <div className="flex items-start gap-4">
                      <ProductVisual
                        slug={product.slug}
                        className="h-[4.5rem] w-auto shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-body text-[0.78rem] font-bold uppercase leading-snug tracking-[0.08em] text-navy">
                          {product.trademarkedName}
                        </h3>
                        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-charcoal/70">
                          {product.tagline}
                        </p>
                        <LinkArrow href={product.href} className="mt-3">
                          Learn more
                        </LinkArrow>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-9">
                <Link
                  href="/digital-products"
                  className="flex w-full items-center justify-center gap-2 border border-gold/50 px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold transition-all duration-300 ease-[var(--ease-glide)] hover:-translate-y-0.5 hover:bg-gold hover:text-navy"
                >
                  View all digital products <Arrow />
                </Link>
              </div>
            </Reveal>

            {/* Corporate experiences */}
            <Reveal delay={220} className="group flex flex-col px-0 py-14 lg:px-9 lg:py-16 lg:last:pr-0">
              <IconCircle className="mx-auto">
                <IconPeople className="h-7 w-7" />
              </IconCircle>
              <h2 className="mt-6 flex min-h-[3.7rem] items-start justify-center text-center font-heading text-[1.45rem] leading-tight tracking-[0.02em] text-balance text-navy xl:text-[1.6rem]">
                CORPORATE EXPERIENCES
              </h2>
              <p className="mt-4 text-center text-[0.95rem] leading-relaxed text-charcoal/75">
                Facilitated experiences and licensing options that help leaders reset,
                realign and return with clarity.
              </p>

              <div className="mt-7 flex items-start gap-4">
                <IconCircle size="sm">
                  <IconPeople className="h-5 w-5" />
                </IconCircle>
                <div>
                  <h3 className="font-body text-[0.78rem] font-bold uppercase tracking-[0.08em] text-navy">
                    Avensra-facilitated experiences
                  </h3>
                  <p className="mt-2 font-heading text-[0.95rem] text-gold">
                    Release <span className="text-gold/60">&rarr;</span> Reset{" "}
                    <span className="text-gold/60">&rarr;</span> Reflect{" "}
                    <span className="text-gold/60">&rarr;</span> Return
                  </p>
                  <ul className="mt-3 space-y-1.5 text-[0.85rem] text-charcoal/75">
                    <li className="flex gap-2">
                      <span className="text-gold">&bull;</span> Up to 20 participants
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gold">&bull;</span> Choose from 30, 45 or
                      60-minute experiences
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gold">&bull;</span> Led by Avensra for maximum
                      impact
                    </li>
                  </ul>
                </div>
              </div>

              <ButtonLink
                href="/corporate-experiences"
                variant="navy"
                className="mt-7 w-full flex-col gap-0.5 py-3"
              >
                <span>Explore Corporate Experiences</span>
                <span className="text-[0.65rem] font-normal normal-case tracking-normal text-white/70">
                  From {formatUsd(experiences[0].fromUsd ?? 0)}
                </span>
              </ButtonLink>

              <div className="mt-8 flex items-start gap-4 border-t border-ivory-200 pt-7">
                <IconCircle size="sm">
                  <IconLicence className="h-5 w-5" />
                </IconCircle>
                <div>
                  <h3 className="font-body text-[0.78rem] font-bold uppercase tracking-[0.08em] text-navy">
                    Corporate licensing
                  </h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-charcoal/70">
                    Empower your teams to facilitate their own Executive Reset&trade;
                    sessions.
                  </p>
                  <LinkArrow href="/corporate-experiences#licensing" className="mt-3">
                    View licensing options
                  </LinkArrow>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --------------------- Executive Reset dark band ------------------ */}
      <section className="bg-navy py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12">
            <Reveal>
              <h2 className="font-heading text-[1.7rem] leading-tight text-gold">
                THE EXECUTIVE RESET&trade;
              </h2>
              <p className="mt-3 font-heading text-lg italic leading-snug text-white">
                A Guided Colouring and Reflection Experience for Busy Professionals
              </p>
              <p className="mt-4 font-heading text-base text-gold">
                Release <span className="text-gold/55">&rarr;</span> Reset{" "}
                <span className="text-gold/55">&rarr;</span> Reflect{" "}
                <span className="text-gold/55">&rarr;</span> Return
              </p>
              <p className="mt-5 text-[0.92rem] leading-relaxed text-white/70">
                A guided experience that helps busy professionals pause, reset their focus,
                reflect with clarity and return to what matters.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink href="/the-executive-reset" variant="gold">
                  Explore The Executive Reset&trade; <Arrow />
                </ButtonLink>
                <ButtonLink href="/corporate-experiences" variant="outline-light">
                  View all options
                </ButtonLink>
              </div>
            </Reveal>

            <div className="grid gap-px border-t border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4 lg:border-l lg:border-t-0">
              {experiences.map((experience, i) => (
                <Reveal key={experience.id} delay={i * 90}>
                  {/* Hover lift lives on this inner element, separate from
                      Reveal's own entrance transform on the wrapper above —
                      two transforms on one node would fight each other. */}
                  <div className="group flex h-full flex-col bg-navy px-6 py-8 text-center transition-[transform,background-color] duration-500 ease-[var(--ease-glide)] hover:-translate-y-1 hover:bg-navy-700">
                    <IconCircle size="sm" className="mx-auto">
                      {experience.fromUsd === null ? (
                        <IconPeople className="h-5 w-5" />
                      ) : (
                        <IconClock className="h-5 w-5" />
                      )}
                    </IconCircle>
                    <h3 className="mt-5 font-body text-[0.7rem] font-bold uppercase leading-snug tracking-[0.1em] text-white">
                      {experience.fromUsd === null
                        ? "21+ participants or custom needs"
                        : `${experience.duration.replace(" minutes", "-minute")} ${experience.name}`}
                    </h3>
                    <p className="mt-4 text-[0.83rem] leading-relaxed text-white/65">
                      {experience.fromUsd === null ? experience.promise : experience.promise}
                    </p>

                    <div className="mt-auto pt-6">
                      {experience.fromUsd === null ? (
                        <LinkArrow href="/contact">Contact us</LinkArrow>
                      ) : (
                        <>
                          <p className="text-[0.68rem] uppercase tracking-[0.14em] text-white/50">
                            From
                          </p>
                          <p className="font-heading text-[2rem] leading-none text-gold">
                            {formatUsd(experience.fromUsd)}
                          </p>
                          <p className="mt-2 text-[0.72rem] text-white/45">
                            {experience.capacity}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------- Trust signals ------------------------ */}
      <section className="border-y border-ivory-200 bg-white py-12">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {trustSignals.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} as="li" delay={i * 80} className="group flex items-start gap-4">
                <IconCircle size="sm">
                  <Icon className="h-5 w-5" />
                </IconCircle>
                <div>
                  <h3 className="font-body text-[0.7rem] font-bold uppercase tracking-[0.1em] text-navy">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-charcoal/70">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------- CTA ------------------------------ */}
      <Section tone="ivory" size="compact">
        <Reveal className="flex flex-col items-center gap-8 bg-navy px-8 py-12 text-center sm:px-12 lg:flex-row lg:justify-between lg:gap-12 lg:text-left">
          <div>
            <h2 className="font-heading text-2xl leading-tight text-white sm:text-[2rem]">
              Ready to align strategy, people and performance?
            </h2>
            <p className="mt-3 text-[0.95rem] text-white/70">
              Let&rsquo;s build the future your organisation and career deserve.
            </p>
          </div>
          <ButtonLink href="/contact" variant="gold" className="shrink-0 px-9 py-4">
            Let&rsquo;s Talk <Arrow />
          </ButtonLink>
        </Reveal>
      </Section>
    </>
  );
}
