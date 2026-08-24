import type { ReactNode } from "react";
import Link from "next/link";
import { Container, Rule } from "./ui";
import { footerNav } from "@/lib/site";

/**
 * Shared shell for the four policy pages.
 *
 * IMPORTANT — FOR AVENSRA:
 * The policy copy in these pages is a comprehensive, launch-ready draft
 * written against the Phase 1 brief and normal practice for digital-product
 * sales. It has NOT been reviewed by a lawyer. Have a qualified adviser
 * review all four documents against your jurisdiction, your registered
 * entity details and your final payment/DRM providers before go-live, and
 * fill in the bracketed placeholders.
 */
export function LegalPage({
  title,
  updated,
  summary,
  children,
}: {
  title: string;
  updated: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-navy">
        <Container>
          <div className="max-w-3xl py-14 sm:py-16">
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              Legal
            </p>
            <h1 className="text-3xl leading-tight text-white sm:text-4xl">{title}</h1>
            <Rule />
            <p className="text-[0.98rem] leading-relaxed text-white/75">{summary}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.14em] text-white/45">
              Last updated: {updated}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_3fr] lg:gap-16">
            <nav aria-label="Policies" className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
                All policies
              </h2>
              <ul className="mt-5 space-y-3">
                {footerNav.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm leading-snug text-charcoal/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="legal-prose max-w-2xl">{children}</div>
          </div>
        </Container>
      </section>
    </>
  );
}

export function Clause({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  const id = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <section id={id} style={{ scrollMarginTop: "7rem" }} className="mb-11">
      <h2 className="flex gap-3 font-heading text-xl text-navy sm:text-2xl">
        <span className="text-gold">{n}</span>
        <span>{title}</span>
      </h2>
      <div className="mt-4 space-y-4 text-[0.97rem] leading-relaxed text-charcoal/80">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Highlighted callout for the clauses customers most need to notice. */
export function LegalNote({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-gold bg-ivory px-5 py-4 text-[0.93rem] leading-relaxed text-charcoal/85">
      {children}
    </div>
  );
}
