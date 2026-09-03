import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FaqSearch } from "@/components/FaqSearch";
import { Reveal } from "@/components/Reveal";
import { Section, Card, ButtonLink, IconCircle, Arrow } from "@/components/ui";
import { IconMail, IconClock, IconLock } from "@/components/icons";
import { faqIndex } from "@/content/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ & Support",
  description:
    "Answers on orders, payment, product access, licences, technical support, corporate experiences and refunds — plus how to reach Avensra support directly.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqIndex.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="FAQ & Support"
        title={
          <>
            Answers, and
            <span className="block text-goldink">a real person if you need one</span>
          </>
        }
        lead="Search below, or jump to a section. If your question is not here, we would rather you asked us than guessed."
      />

      <Section tone="white">
        <FaqSearch />
      </Section>

      <Section tone="ivory">
        <div className="grid gap-8 lg:grid-cols-3">
          <Reveal>
            <Card tone="white" className="flex h-full flex-col p-8">
              <IconCircle size="sm">
                <IconClock className="h-5 w-5" />
              </IconCircle>
              <h2 className="mt-5 font-heading text-xl text-navy">
                Seven-day technical support
              </h2>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal/75">
                Every purchase of the Business-to-People Alignment System&trade; includes
                seven days of technical support from the date of purchase, covering licence
                activation, secure viewer installation and access problems.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={100}>
            <Card tone="white" className="flex h-full flex-col p-8">
              <IconCircle size="sm">
                <IconLock className="h-5 w-5" />
              </IconCircle>
              <h2 className="mt-5 font-heading text-xl text-navy">Access problems</h2>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal/75">
                Lost your link, changed device, or the viewer will not open your file? Email
                us from the address you bought with and quote your order reference &mdash;
                we can reissue access or move your licence.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={200}>
            <Card tone="white" className="flex h-full flex-col p-8">
              <IconCircle size="sm">
                <IconMail className="h-5 w-5" />
              </IconCircle>
              <h2 className="mt-5 font-heading text-xl text-navy">Still stuck?</h2>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal/75">
                Write to{" "}
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="text-goldink underline underline-offset-2"
                >
                  {site.supportEmail}
                </a>{" "}
                or use the contact form. We aim to respond within one business day.
              </p>
              <div className="mt-auto pt-6">
                <ButtonLink href="/contact" variant="navy">
                  Contact support <Arrow />
                </ButtonLink>
              </div>
            </Card>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-ivory-200 pt-10">
          <h2 className="font-heading text-xl text-navy">Related policies</h2>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-0 sm:mt-5 sm:gap-y-3">
            {[
              { label: "Refund Policy", href: "/refund-policy" },
              { label: "Digital Product Licence & Usage Terms", href: "/licence-terms" },
              { label: "Terms & Conditions", href: "/terms-and-conditions" },
              { label: "Privacy Policy", href: "/privacy-policy" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-2.5 text-sm text-charcoal/70 underline underline-offset-4 transition-colors hover:text-goldink sm:py-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
