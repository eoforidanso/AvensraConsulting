import type { Metadata } from "next";
import Link from "next/link";
import { ExecutiveResetVisual } from "@/components/ProductVisual";
import { BuyButton } from "@/components/BuyButton";
import { Reveal } from "@/components/Reveal";
import {
  Container,
  Section,
  SectionHeading,
  ButtonLink,
  Card,
  Bullet,
  IconCircle,
  Arrow,
  Rule,
  TM,
} from "@/components/ui";
import { IconClock, IconPeople, IconProduct, IconLicence } from "@/components/icons";
import { getProduct, formatUsd } from "@/content/products";
import { experiences } from "@/content/experiences";
import { commerceEnabled } from "@/lib/env";
import { site } from "@/lib/site";

const product = getProduct("the-executive-reset")!;

export const metadata: Metadata = {
  title: product.trademarkedName,
  description: product.summary,
  alternates: { canonical: product.href },
  openGraph: {
    title: `${product.trademarkedName} | ${site.name}`,
    description: product.summary,
    url: `${site.url}${product.href}`,
    type: "website",
  },
};

const journey = [
  {
    step: "Release",
    body: "Put down the mental load you have been carrying between meetings. Nothing to solve yet — just somewhere to set it down.",
  },
  {
    step: "Reset",
    body: "Give your attention somewhere deliberate to land. The colouring is not decoration; it is what lets the thinking mind step back.",
  },
  {
    step: "Reflect",
    body: "Prompts that ask the questions a full calendar never leaves room for. Short enough to answer honestly.",
  },
  {
    step: "Return",
    body: "Come back to the work having decided what actually matters this week — not just what is loudest.",
  },
];

export default function ExecutiveResetPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.trademarkedName,
    description: product.summary,
    sku: product.sku,
    brand: { "@type": "Brand", name: site.legalName },
    url: `${site.url}${product.href}`,
    offers: {
      "@type": "Offer",
      price: (product.priceUsd / 100).toFixed(2),
      priceCurrency: "USD",
      availability: commerceEnabled
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: `${site.url}${product.href}`,
      seller: { "@type": "Organization", name: site.legalName },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* ------------------------------ Hero ------------------------------ */}
      <section className="relative isolate overflow-hidden bg-navy">
        <svg
          className="pointer-events-none absolute -left-32 bottom-0 h-[120%] w-auto opacity-[0.05]"
          viewBox="0 0 320 288"
          aria-hidden="true"
        >
          <circle cx="160" cy="144" r="120" fill="none" stroke="#c79a44" strokeWidth="6" />
          <circle cx="160" cy="144" r="80" fill="none" stroke="#c79a44" strokeWidth="6" />
          <circle cx="160" cy="144" r="40" fill="none" stroke="#c79a44" strokeWidth="6" />
        </svg>

        <Container className="relative">
          <div className="grid items-center gap-12 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-40 lg:pb-24">
            <div>
              <p className="hero-rise text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Digital Product &middot; Guided Experience
              </p>
              <h1
                className="hero-rise mt-5 text-3xl leading-[1.1] text-white sm:text-4xl lg:text-[3rem]"
                style={{ animationDelay: "70ms" }}
              >
                The Executive
                <span className="block text-gold">
                  Reset
                  <TM />
                </span>
              </h1>
              <p
                className="hero-rise mt-4 font-heading text-lg italic leading-snug text-white/85"
                style={{ animationDelay: "110ms" }}
              >
                A guided colouring and reflection experience for busy professionals.
              </p>
              <div className="hero-rise" style={{ animationDelay: "140ms" }}>
                <Rule />
              </div>
              <p
                className="hero-rise font-heading text-lg text-gold"
                style={{ animationDelay: "140ms" }}
              >
                Release <span className="text-gold/55">&rarr;</span> Reset{" "}
                <span className="text-gold/55">&rarr;</span> Reflect{" "}
                <span className="text-gold/55">&rarr;</span> Return
              </p>
              <p
                className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-white/80"
                style={{ animationDelay: "170ms" }}
              >
                A guided experience that helps busy professionals pause, reset their focus,
                reflect with clarity and return to what matters.
              </p>

              <div
                className="hero-rise mt-9 flex flex-wrap items-baseline gap-3"
                style={{ animationDelay: "210ms" }}
              >
                <span className="font-heading text-[2.75rem] leading-none text-gold">
                  {formatUsd(product.priceUsd)}
                </span>
                <span className="text-sm text-white/55">USD &middot; yours to keep</span>
              </div>

              <div
                className="hero-rise mt-7 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "280ms" }}
              >
                <BuyButton
                  slug={product.slug}
                  label="Buy The Executive Reset"
                  disabled={!commerceEnabled}
                  disabledLabel="Available at launch"
                />
                <ButtonLink href="#corporate" variant="outline-light">
                  For teams
                </ButtonLink>
              </div>

              <p
                className="hero-rise mt-5 text-xs leading-relaxed text-white/50"
                style={{ animationDelay: "280ms" }}
              >
                Print it at home or work through it on a tablet with a stylus.
              </p>
            </div>

            <div
              className="hero-rise flex items-center justify-center"
              style={{ animationDelay: "180ms" }}
            >
              <ExecutiveResetVisual className="h-auto w-full max-w-md" />
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------ Journey --------------------------- */}
      <Section tone="white">
        <SectionHeading
          eyebrow="The journey"
          title="Four movements, one sitting"
          lead="Designed for someone with forty minutes and a lot on their mind — not for someone with a free afternoon."
          className="mb-14"
        />
        <ol className="grid gap-px border border-ivory-200 bg-ivory-200 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map(({ step, body }, index) => (
            <Reveal key={step} as="li" delay={index * 90} className="bg-white px-7 py-9">
              <span className="font-heading text-4xl text-gold/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-xl text-navy">{step}</h3>
              <Rule className="my-4" />
              <p className="text-[0.9rem] leading-relaxed text-charcoal/75">{body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ----------------------------- Included --------------------------- */}
      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What you get"
              title="A copy that is genuinely yours"
              align="left"
              lead="Personalised to you, delivered the moment you buy, and built to be marked up by hand."
            />
            <ul className="mt-2 space-y-3 text-charcoal/85">
              {product.includes.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <Reveal>
              <Card tone="white" className="flex gap-5 p-7">
                <IconCircle size="sm">
                  <IconProduct className="h-5 w-5" />
                </IconCircle>
                <div>
                  <h3 className="font-heading text-lg text-navy">Print it</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/75">
                    Printing for your own use is permitted and expected. Pencils, pens,
                    whatever you have. There is a reason it is not a screen-only product.
                  </p>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={90}>
              <Card tone="white" className="flex gap-5 p-7">
                <IconCircle size="sm">
                  <IconClock className="h-5 w-5" />
                </IconCircle>
                <div>
                  <h3 className="font-heading text-lg text-navy">Or use a stylus</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/75">
                    The file works with tablet annotation apps, so you can carry it and pick
                    it up in a hotel room or between flights.
                  </p>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={180}>
              <Card tone="white" className="flex gap-5 p-7">
                <IconCircle size="sm">
                  <IconPeople className="h-5 w-5" />
                </IconCircle>
                <div>
                  <h3 className="font-heading text-lg text-navy">Return to it</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/75">
                    It is not a one-time read. Most people come back to it at the points in
                    the year where the noise gets loudest.
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------ Purchase -------------------------- */}
      <Section tone="navy">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
            Get your copy
          </p>
          <h2 className="mt-5 font-heading text-3xl leading-tight text-white sm:text-4xl">
            The Executive Reset&trade;
          </h2>
          <div className="mt-8 flex flex-wrap items-baseline justify-center gap-3">
            <span className="font-heading text-5xl leading-none text-gold">
              {formatUsd(product.priceUsd)}
            </span>
            <span className="text-sm text-white/55">USD &middot; one-time</span>
          </div>

          <div className="mx-auto mt-8 max-w-sm">
            <BuyButton
              slug={product.slug}
              label="Buy The Executive Reset"
              disabled={!commerceEnabled}
              disabledLabel="Available at launch"
            />
          </div>

          {!commerceEnabled ? (
            <p className="mt-5 text-sm text-white/60">
              Online purchasing goes live at launch.{" "}
              <Link href="/contact" className="text-gold underline underline-offset-2">
                Contact us
              </Link>{" "}
              and we will arrange it directly.
            </p>
          ) : null}

          <p className="mt-6 text-xs leading-relaxed text-white/45">
            Access is issued immediately, so please read the{" "}
            <Link href="/refund-policy" className="text-gold underline underline-offset-2">
              Refund Policy
            </Link>{" "}
            and{" "}
            <Link href="/licence-terms" className="text-gold underline underline-offset-2">
              Licence Terms
            </Link>{" "}
            before buying.
          </p>
        </Reveal>
      </Section>

      {/* --------------------------- For teams ---------------------------- */}
      <Section tone="ivory" id="corporate">
        <SectionHeading
          eyebrow="For organisations"
          title="Run it with your team"
          lead="The Executive Reset™ also exists as a facilitated experience, and as a licence your own facilitators can run."
          className="mb-14"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Card tone="white" className="flex h-full flex-col p-8 sm:p-10">
              <IconCircle>
                <IconPeople className="h-7 w-7" />
              </IconCircle>
              <h3 className="mt-6 font-heading text-2xl text-navy">
                Avensra-facilitated experiences
              </h3>
              <Rule className="my-4" />
              <p className="text-[0.95rem] leading-relaxed text-charcoal/75">
                We run the session for your team &mdash; 30, 45 or 60 minutes, in person or
                online, for up to 20 participants.
              </p>
              <p className="mt-5 text-[0.7rem] uppercase tracking-[0.14em] text-charcoal/50">
                From
              </p>
              <p className="font-heading text-3xl text-navy">
                {formatUsd(experiences[0].fromUsd ?? 0)}
              </p>
              <div className="mt-auto pt-7">
                <ButtonLink href="/corporate-experiences" variant="navy">
                  Explore experiences <Arrow />
                </ButtonLink>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={110}>
            <Card tone="white" className="flex h-full flex-col p-8 sm:p-10">
              <IconCircle>
                <IconLicence className="h-7 w-7" />
              </IconCircle>
              <h3 className="mt-6 font-heading text-2xl text-navy">Corporate licensing</h3>
              <Rule className="my-4" />
              <p className="text-[0.95rem] leading-relaxed text-charcoal/75">
                Licence the material so your own facilitators can run Executive Reset&trade;
                sessions internally, within agreed participant volumes.
              </p>
              <p className="mt-5 text-[0.9rem] text-charcoal/60">
                Quoted per organisation. Enquiries handled directly by Avensra.
              </p>
              <div className="mt-auto pt-7">
                <ButtonLink href="/corporate-experiences#licensing" variant="outline">
                  Licensing options <Arrow />
                </ButtonLink>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
