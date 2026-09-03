import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProductVisual } from "@/components/ProductVisual";
import { BuyButton } from "@/components/BuyButton";
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
import { IconLock, IconMail, IconShield } from "@/components/icons";
import { products, formatUsd } from "@/content/products";
import { commerceEnabled } from "@/lib/env";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Digital Products",
  description:
    "Practical systems and experiences that help leaders and teams create alignment every day — the Business-to-People Alignment System™ and The Executive Reset™.",
  alternates: { canonical: "/digital-products" },
};

const howItWorks = [
  {
    icon: IconLock,
    title: "Secure checkout",
    body: "Pay by international card through our payment provider's hosted checkout. Your card details never touch this website.",
  },
  {
    icon: IconMail,
    title: "Immediate access",
    body: "As soon as payment clears, your access is issued automatically and sent to the email address you used at checkout.",
  },
  {
    icon: IconShield,
    title: "Licensed to you",
    body: "Every copy is issued under a licence unique to the purchaser and is identifiable, which is how we keep the work protected.",
  },
];

export default function DigitalProductsPage() {
  const catalogueSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}${product.href}`,
      name: product.trademarkedName,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogueSchema) }}
      />

      <PageHero
        eyebrow="Digital Products"
        title={
          <>
            Practical tools for
            <span className="block text-goldink">everyday alignment</span>
          </>
        }
        lead="Systems and experiences you can use yourself — bought once, delivered securely, yours to work with."
      />

      <Section tone="white">
        <div className="space-y-16 lg:space-y-20">
          {products.map((product, index) => (
            <Reveal
              as="article"
              key={product.slug}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="flex items-center justify-center bg-ivory p-10 sm:p-14">
                <ProductVisual slug={product.slug} className="h-auto w-full max-w-sm" />
              </div>

              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-goldink">
                  {product.protection === "strong"
                    ? "Protected digital system"
                    : "Guided digital experience"}
                </p>
                <h2 className="mt-4 font-heading text-3xl leading-tight text-navy sm:text-[2.1rem]">
                  {product.trademarkedName}
                </h2>
                <Rule className="my-5" />
                <p className="text-[1.02rem] leading-relaxed text-charcoal/80">
                  {product.summary}
                </p>

                <ul className="mt-7 space-y-2.5 text-charcoal/85">
                  {product.includes.slice(0, 4).map((item) => (
                    <Bullet key={item}>{item}</Bullet>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-baseline gap-3 border-t border-ivory-200 pt-7">
                  <span className="font-heading text-[2.4rem] leading-none text-navy">
                    {formatUsd(product.priceUsd)}
                  </span>
                  <span className="text-sm text-charcoal/55">USD &middot; one-time</span>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <BuyButton
                    slug={product.slug}
                    label={`Buy ${product.shortName}`}
                    className="sm:w-auto"
                    disabled={!commerceEnabled}
                    disabledLabel="Available at launch"
                  />
                  <ButtonLink href={product.href} variant="outline">
                    Full details <Arrow />
                  </ButtonLink>
                </div>

                {!commerceEnabled ? (
                  <p className="mt-4 text-xs leading-relaxed text-charcoal/55">
                    Online purchasing goes live at launch.{" "}
                    <Link href="/contact" className="text-goldink underline underline-offset-2">
                      Contact us
                    </Link>{" "}
                    in the meantime and we will arrange it directly.
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHeading
          eyebrow="Buying from Avensra"
          title="How it works"
          className="mb-14"
        />
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {howItWorks.map(({ icon: Icon, title, body }, index) => (
            <Reveal key={title} delay={index * 100}>
              <IconCircle>
                <Icon className="h-7 w-7" />
              </IconCircle>
              <h3 className="mt-6 font-heading text-xl text-navy">{title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={90}>
          <Card tone="white" className="mt-12 p-8 sm:p-10">
            <h3 className="font-heading text-xl text-navy">
              Buying for a team, or want to use these with clients?
            </h3>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-charcoal/75">
              A standard purchase is a single-user licence. If you need access for a team, or
              want to facilitate sessions using Avensra material, a corporate licence is the
              right route &mdash; and usually better value.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/corporate-experiences#licensing" variant="navy">
                Corporate licensing <Arrow />
              </ButtonLink>
              <ButtonLink href="/licence-terms" variant="outline">
                Read the licence terms
              </ButtonLink>
            </div>
          </Card>
        </Reveal>
      </Section>
    </>
  );
}
