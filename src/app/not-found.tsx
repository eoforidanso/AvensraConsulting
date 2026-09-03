import { Section, ButtonLink, Rule, Arrow } from "@/components/ui";

export default function NotFound() {
  return (
    <Section tone="ivory" size="tall">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-heading text-6xl text-goldink/40">404</p>
        <h1 className="mt-5 font-heading text-3xl text-navy sm:text-4xl">
          That page is not here
        </h1>
        <Rule className="mx-auto" />
        <p className="text-[0.98rem] leading-relaxed text-charcoal/75">
          The link may be out of date, or the page may have moved. Here are the places most
          people are looking for.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="navy">
            Home <Arrow />
          </ButtonLink>
          <ButtonLink href="/digital-products" variant="outline">
            Digital products
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
