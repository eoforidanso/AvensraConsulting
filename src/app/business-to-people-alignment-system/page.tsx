import type { Metadata } from "next";
import Link from "next/link";
import { AlignmentSystemVisual } from "@/components/ProductVisual";
import { BuyButton } from "@/components/BuyButton";
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
} from "@/components/ui";
import {
  IconStrategy,
  IconPeople,
  IconPerformance,
  IconLock,
  IconShield,
  IconClock,
  IconTools,
} from "@/components/icons";
import { getProduct, formatUsd } from "@/content/products";
import { commerceEnabled } from "@/lib/env";
import { site } from "@/lib/site";

const product = getProduct("business-to-people-alignment-system")!;

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

const outcomeIcons = [IconStrategy, IconPeople, IconPerformance];

const symptoms = [
  "Your strategy is clear to you and vague three levels down.",
  "Teams are busy, but not obviously busy on the things the strategy depends on.",
  "Roles were designed for the organisation you used to be.",
  "Performance measures reward something other than the strategy.",
  "Every alignment conversation starts from scratch because nothing was written down.",
];

const protection = [
  {
    icon: IconLock,
    title: "Licensed to you alone",
    body: "Access is issued under a licence unique to your purchase, activated through a secure viewer rather than a plain PDF reader.",
  },
  {
    icon: IconShield,
    title: "Identifiable copies",
    body: "Your copy carries identifying information. It protects the methodology and it means we can trace any unauthorised distribution.",
  },
  {
    icon: IconClock,
    title: "Seven-day technical support",
    body: "Included from the date of purchase, covering licence activation, viewer installation and any access problem.",
  },
];

export default function AlignmentSystemPage() {
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
          className="pointer-events-none absolute -right-24 top-0 h-full w-auto opacity-[0.06]"
          viewBox="0 0 320 288"
          aria-hidden="true"
        >
          <path d="M160 20 L300 268 H262 L160 90 L58 268 H20 L160 20 Z" fill="#c79a44" />
        </svg>

        <Container className="relative">
          <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-24">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Digital Product &middot; Protected System
              </p>
              <h1 className="mt-5 text-3xl leading-[1.1] text-white sm:text-4xl lg:text-[3rem]">
                Business-to-People
                <span className="block text-gold">Alignment System&trade;</span>
              </h1>
              <Rule />
              <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                The complete system for leaders who need their strategy to actually land
                with the people expected to deliver it. Frameworks, diagnostics, templates
                and facilitation tools in one structured methodology.
              </p>

              <div className="mt-9 flex flex-wrap items-baseline gap-3">
                <span className="font-heading text-[2.75rem] leading-none text-gold">
                  {formatUsd(product.priceUsd)}
                </span>
                <span className="text-sm text-white/55">
                  USD &middot; one-time &middot; single-user licence
                </span>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <BuyButton
                  slug={product.slug}
                  label="Buy the system"
                  disabled={!commerceEnabled}
                  disabledLabel="Available at launch"
                />
                <ButtonLink href="#included" variant="outline-light">
                  See what is included
                </ButtonLink>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-white/50">
                Secure card payment &middot; immediate access &middot; seven-day technical
                support included
              </p>
            </div>

            <div className="flex items-center justify-center">
              <AlignmentSystemVisual className="h-auto w-full max-w-md" />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------- The problem ------------------------- */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="The problem it solves"
            title="Strategies do not usually fail. They get lost in translation."
            align="left"
          />
          <div>
            <p className="text-[1.02rem] leading-relaxed text-charcoal/80">
              Between the strategy you set and the work your people do, there is a
              translation layer &mdash; structures, roles, capability, measures, rhythms.
              When that layer is left to chance, the strategy quietly becomes something
              else on the way down.
            </p>
            <p className="mt-5 text-[0.95rem] font-semibold uppercase tracking-[0.1em] text-navy">
              You may recognise some of this
            </p>
            <ul className="mt-4 space-y-2.5 text-charcoal/85">
              {symptoms.map((symptom) => (
                <Bullet key={symptom}>{symptom}</Bullet>
              ))}
            </ul>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-charcoal/80">
              The Alignment System gives that translation layer a structure &mdash; and
              gives you the tools to build it deliberately rather than hope it forms.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------ Outcomes -------------------------- */}
      <Section tone="navy">
        <SectionHeading
          eyebrow="What it delivers"
          title="Three outcomes, in sequence"
          tone="light"
          className="mb-14"
        />
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {product.outcomes.map((outcome, index) => {
            const Icon = outcomeIcons[index] ?? IconStrategy;
            return (
              <div key={outcome.title}>
                <IconCircle>
                  <Icon className="h-7 w-7" />
                </IconCircle>
                <h3 className="mt-6 font-heading text-xl text-white">{outcome.title}</h3>
                <Rule className="my-4" />
                <p className="text-[0.95rem] leading-relaxed text-white/70">
                  {outcome.body}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ------------------------------ Included -------------------------- */}
      <Section tone="ivory" id="included">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="What you get"
              title="Everything needed to run alignment work yourself"
              align="left"
              lead="Not a book about alignment. The actual instruments — designed to be used in a room, with a team, against a live strategy."
            />
            <div className="mt-8 hidden lg:block">
              <AlignmentSystemVisual className="h-auto w-full max-w-xs" />
            </div>
          </div>

          <Card tone="white" className="p-8 sm:p-10">
            <ul className="space-y-4 text-charcoal/85">
              {product.includes.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>

            <div className="mt-8 border-t border-ivory-200 pt-7">
              <h3 className="font-body text-[0.7rem] font-bold uppercase tracking-[0.13em] text-navy">
                Delivered as
              </h3>
              <ul className="mt-4 space-y-3">
                {product.assets.map((asset) => (
                  <li key={asset.file} className="flex items-center gap-3">
                    <IconTools className="h-5 w-5 shrink-0 text-gold" />
                    <span className="text-[0.92rem] text-charcoal/85">{asset.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* -------------------------- Who it is for ------------------------- */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Who it is for" title="Built for people who own the gap" align="left" />
            <ul className="mt-2 space-y-3 text-charcoal/85">
              {product.audience.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </div>

          <Card tone="ivory" className="p-8 sm:p-10">
            <h3 className="font-heading text-xl text-navy">
              It is probably not for you if&hellip;
            </h3>
            <Rule className="my-4" />
            <ul className="space-y-3 text-[0.95rem] leading-relaxed text-charcoal/75">
              <li>
                &mdash; You are looking for a reading experience rather than something to
                work with.
              </li>
              <li>
                &mdash; You want to use the material with your own clients. That needs a
                facilitator or corporate licence, not this one.
              </li>
              <li>
                &mdash; You need the work done for you. That is a{" "}
                <Link href="/consulting" className="text-gold underline underline-offset-2">
                  consulting engagement
                </Link>
                .
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* ------------------- Delivery, protection, support ---------------- */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow="Access and protection"
          title="How the system reaches you"
          lead="This is high-value methodology, so it is delivered under real protection rather than as an open file."
          className="mb-14"
        />
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {protection.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <IconCircle>
                <Icon className="h-7 w-7" />
              </IconCircle>
              <h3 className="mt-6 font-heading text-xl text-navy">{title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-charcoal/60">
          Full detail of what your licence permits is set out in the{" "}
          <Link href="/licence-terms" className="text-gold underline underline-offset-2">
            Digital Product Licence &amp; Usage Terms
          </Link>
          . Because access is issued immediately, please read the{" "}
          <Link href="/refund-policy" className="text-gold underline underline-offset-2">
            Refund Policy
          </Link>{" "}
          before buying.
        </p>
      </Section>

      {/* ------------------------------ Purchase -------------------------- */}
      <Section tone="navy">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
            Get the system
          </p>
          <h2 className="mt-5 font-heading text-3xl leading-tight text-white sm:text-4xl">
            {product.trademarkedName}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.98rem] leading-relaxed text-white/70">
            One payment. Immediate, licensed access. Seven days of technical support to get
            you up and running.
          </p>

          <div className="mt-9 flex flex-wrap items-baseline justify-center gap-3">
            <span className="font-heading text-5xl leading-none text-gold">
              {formatUsd(product.priceUsd)}
            </span>
            <span className="text-sm text-white/55">USD &middot; one-time</span>
          </div>

          <div className="mx-auto mt-8 max-w-sm">
            <BuyButton
              slug={product.slug}
              label="Buy the system"
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
            Priced in USD. International cards accepted subject to your card issuer.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 border-t border-white/12 pt-9 sm:flex-row">
            <ButtonLink href="/corporate-experiences#licensing" variant="outline-light">
              Need it for a team? <Arrow />
            </ButtonLink>
            <ButtonLink href="/faq" variant="outline-light">
              Read the FAQ
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
