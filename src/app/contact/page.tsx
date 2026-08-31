import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Section, Card, IconCircle, LinkArrow, Rule } from "@/components/ui";
import { IconMail, IconClock, IconLinkedIn, IconPeople } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Avensra Consulting about digital products, product support, corporate experiences, corporate licensing or consulting.",
  alternates: { canonical: "/contact" },
};

const validTopics = [
  "Digital products",
  "Product support",
  "Corporate experiences",
  "Corporate licensing",
  "Consulting",
  "Something else",
] as const;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  // Only ever pre-fill a topic this form actually offers — an arbitrary
  // query string can't be used to inject something into the select.
  const defaultTopic = validTopics.find((t) => t === topic);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s talk about
            <span className="block text-gold">what you are trying to change</span>
          </>
        }
        lead="Whether it is a question about a product you have bought, an experience for your team, or a conversation about consulting — this reaches us directly."
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <Card tone="ivory" className="p-8 sm:p-10">
              <h2 className="font-heading text-2xl text-navy">Send us a message</h2>
              <Rule className="my-5" />
              <ContactForm defaultTopic={defaultTopic} />
            </Card>
          </Reveal>

          <Reveal delay={100} className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl text-navy">Other ways to reach us</h2>
              <Rule className="my-5" />
            </div>

            <div className="flex gap-5">
              <IconCircle size="sm">
                <IconMail className="h-5 w-5" />
              </IconCircle>
              <div>
                <h3 className="font-body text-[0.7rem] font-bold uppercase tracking-[0.12em] text-navy">
                  Email
                </h3>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1.5 block text-[0.95rem] text-charcoal/80 transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </div>
            </div>

            <div className="flex gap-5">
              <IconCircle size="sm">
                <IconClock className="h-5 w-5" />
              </IconCircle>
              <div>
                <h3 className="font-body text-[0.7rem] font-bold uppercase tracking-[0.12em] text-navy">
                  Response times
                </h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-charcoal/75">
                  We aim to respond within one business day, and within two at the latest.
                  Support is handled during UK business hours, Monday to Friday.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <IconCircle size="sm">
                <IconLinkedIn className="h-5 w-5" />
              </IconCircle>
              <div>
                <h3 className="font-body text-[0.7rem] font-bold uppercase tracking-[0.12em] text-navy">
                  LinkedIn
                </h3>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-1.5 block text-[0.95rem] text-charcoal/80 transition-colors hover:text-gold"
                >
                  Follow Avensra Consulting
                </a>
              </div>
            </div>

            <Card tone="ivory" className="p-7">
              <h3 className="font-heading text-lg text-navy">
                Already bought something?
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-charcoal/75">
                Choose <strong>Product support</strong> in the form and include your order
                reference from your confirmation email. It lets us verify the purchase and
                fix access problems straight away.
              </p>
              <LinkArrow href="/faq#technical-support" className="mt-5" tone="navy">
                Check the support FAQ first
              </LinkArrow>
            </Card>

            <Card tone="ivory" className="p-7">
              <div className="flex items-start gap-4">
                <IconCircle size="sm">
                  <IconPeople className="h-5 w-5" />
                </IconCircle>
                <div>
                  <h3 className="font-heading text-lg text-navy">Corporate enquiry?</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/75">
                    The{" "}
                    <Link
                      href="/corporate-experiences#enquiry"
                      className="text-gold underline underline-offset-2"
                    >
                      corporate enquiry form
                    </Link>{" "}
                    asks the right questions and gets you a quotation faster.
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
