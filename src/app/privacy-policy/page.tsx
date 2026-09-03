import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Clause, LegalList, LegalNote } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Avensra Consulting collects, uses, stores and protects personal information, and the rights you have over your data.",
  alternates: { canonical: "/privacy-policy" },
};

const UPDATED = "1 September 2025";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      summary="This policy explains what personal information Avensra Consulting collects, why we collect it, who we share it with, and the rights you have over it."
    >
      <Clause n="1." title="Who we are">
        <p>
          {site.legalName} (&ldquo;Avensra&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is
          the controller of the personal information described in this policy. You can
          reach us at{" "}
          <a href={`mailto:${site.email}`} className="text-goldink underline underline-offset-2">
            {site.email}
          </a>
          .
        </p>
        <p className="text-sm text-charcoal/60">
          [Avensra to insert registered company name, company number and registered address
          before publication.]
        </p>
      </Clause>

      <Clause n="2." title="What we collect">
        <p>We collect only what we need to sell, deliver and support our products.</p>
        <p className="font-semibold text-navy">When you buy a digital product</p>
        <LegalList
          items={[
            "Your name and email address",
            "Billing address and country",
            "The product purchased, order reference and transaction identifiers",
            "Licence and access records, including activation and download events",
          ]}
        />
        <LegalNote>
          We do <strong>not</strong> receive or store your full card number, expiry date or
          security code. Card details are entered directly with our payment provider on
          their own secure checkout, and we only ever see a masked reference to the payment.
        </LegalNote>

        <p className="font-semibold text-navy">When you contact us or submit a form</p>
        <LegalList
          items={[
            "Your name, email address and organisation",
            "The content of your enquiry, corporate enquiry or feedback",
            "Any order reference you provide so we can locate your purchase",
          ]}
        />

        <p className="font-semibold text-navy">When you use the website</p>
        <LegalList
          items={[
            "Standard technical data such as IP address, browser type and pages visited",
            "Analytics data where analytics is enabled, collected in aggregate",
          ]}
        />
      </Clause>

      <Clause n="3." title="Why we use it, and our lawful basis">
        <LegalList
          items={[
            <>
              <strong>To fulfil your order</strong> — issuing your licence, delivering your
              product and sending confirmation. Lawful basis: performance of a contract.
            </>,
            <>
              <strong>To provide support</strong> — answering enquiries and resolving access
              problems. Lawful basis: performance of a contract, or our legitimate interest
              in supporting customers.
            </>,
            <>
              <strong>To protect our intellectual property</strong> — identifying copies,
              maintaining access records and investigating unauthorised distribution.
              Lawful basis: our legitimate interest in protecting our work.
            </>,
            <>
              <strong>To meet legal and accounting obligations</strong> — retaining
              transaction records. Lawful basis: legal obligation.
            </>,
            <>
              <strong>To improve what we offer</strong> — reviewing feedback and aggregate
              analytics. Lawful basis: legitimate interest.
            </>,
            <>
              <strong>To publish testimonials</strong> — only where you have given explicit,
              separate permission. Lawful basis: consent, which you may withdraw at any
              time.
            </>,
          ]}
        />
      </Clause>

      <Clause n="4." title="Marketing">
        <p>
          We do not add you to a marketing list simply because you bought something or
          contacted us. Where we do send marketing, it is because you asked us to, and every
          message contains a one-click unsubscribe. Transactional messages &mdash; order
          confirmations, access details, support replies &mdash; are not marketing and
          cannot be unsubscribed from while your purchase is active.
        </p>
      </Clause>

      <Clause n="5." title="Who we share it with">
        <p>
          We share personal information only with the service providers we need to run the
          business, and only to the extent required. Each acts on our instructions under a
          contract.
        </p>
        <LegalList
          items={[
            "Our payment provider, to take payment and administer refunds",
            "Our DRM/licensing provider, to issue and manage your product licence",
            "Our email provider, to send order confirmations and replies",
            "Our hosting and analytics providers, to run and measure the website",
            "Professional advisers and authorities, where we are legally required to",
          ]}
        />
        <p>
          We do not sell personal information, and we do not share it for anyone else&rsquo;s
          marketing.
        </p>
        <p className="text-sm text-charcoal/60">
          [Avensra to list the named providers here once selected at UAT.]
        </p>
      </Clause>

      <Clause n="6." title="International transfers">
        <p>
          Some of our providers operate outside the UK and European Economic Area. Where
          personal information is transferred internationally, we rely on an adequacy
          decision or on standard contractual clauses together with appropriate
          safeguards.
        </p>
      </Clause>

      <Clause n="7." title="How long we keep it">
        <LegalList
          items={[
            "Order and transaction records: retained for the period required by tax and accounting law, typically six years.",
            "Licence and access records: retained for as long as your licence is active, and for a reasonable period afterwards to support reissue and protect our rights.",
            "Enquiries and support correspondence: retained for up to 24 months after the matter is closed.",
            "Feedback: retained until you ask us to remove it; published testimonials are removed on request.",
          ]}
        />
      </Clause>

      <Clause n="8." title="Your rights">
        <p>Subject to the applicable law, you have the right to:</p>
        <LegalList
          items={[
            "Ask what personal information we hold about you, and receive a copy",
            "Have inaccurate information corrected",
            "Ask us to delete information we no longer need",
            "Object to, or ask us to restrict, certain processing",
            "Receive your information in a portable format",
            "Withdraw consent where our basis is consent, without affecting prior processing",
          ]}
        />
        <p>
          To exercise any of these, email{" "}
          <a href={`mailto:${site.email}`} className="text-goldink underline underline-offset-2">
            {site.email}
          </a>
          . We respond within one month. If you are unhappy with our response, you may
          complain to your data protection regulator &mdash; in the UK, the Information
          Commissioner&rsquo;s Office.
        </p>
      </Clause>

      <Clause n="9." title="Cookies and analytics">
        <p>
          We use only the cookies needed to make the website and checkout work, plus
          analytics cookies where analytics is enabled. Analytics is configured to collect
          aggregate usage data with IP anonymisation. Our payment provider sets its own
          cookies on its checkout pages, governed by its own policy.
        </p>
        <p>
          You can block or delete cookies in your browser settings. Blocking essential
          cookies may prevent checkout from working.
        </p>
      </Clause>

      <Clause n="10." title="Security">
        <p>
          The website is served over encrypted connections. Product files are held outside
          the public web root and released only against a signed, expiring access token
          issued after a confirmed payment, or through our licensing provider&rsquo;s secure
          viewer. Access to stored order and enquiry data is restricted to authorised
          Avensra personnel.
        </p>
        <p>
          No system is perfectly secure. If a breach affects your rights, we will notify you
          and the relevant regulator as the law requires.
        </p>
      </Clause>

      <Clause n="11." title="Children">
        <p>
          Our products are intended for professional adults. We do not knowingly collect
          information from anyone under 18.
        </p>
      </Clause>

      <Clause n="12." title="Changes to this policy">
        <p>
          We may update this policy from time to time. The version published here is always
          the current one, and the date at the top tells you when it last changed. Material
          changes affecting existing customers will be notified by email.
        </p>
      </Clause>

      <Clause n="13." title="Contact">
        <p>
          Questions about this policy or how we handle your information:{" "}
          <a href={`mailto:${site.email}`} className="text-goldink underline underline-offset-2">
            {site.email}
          </a>{" "}
          or via our{" "}
          <Link href="/contact" className="text-goldink underline underline-offset-2">
            contact form
          </Link>
          .
        </p>
      </Clause>
    </LegalPage>
  );
}
