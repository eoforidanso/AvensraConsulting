import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Clause, LegalList, LegalNote } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms on which Avensra Consulting sells digital products, delivers corporate experiences and provides support.",
  alternates: { canonical: "/terms-and-conditions" },
};

const UPDATED = "1 September 2025";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated={UPDATED}
      summary="These terms govern your use of the Avensra website and your purchase of Avensra digital products and services. Please read them before buying."
    >
      <Clause n="1." title="About these terms">
        <p>
          These terms form a contract between you and {site.legalName}. By using this
          website or placing an order, you accept them. If you do not accept them, please do
          not use the website.
        </p>
        <p>
          Two further documents form part of this contract and should be read alongside it:
          our{" "}
          <Link href="/refund-policy" className="text-goldink underline underline-offset-2">
            Refund Policy
          </Link>{" "}
          and our{" "}
          <Link href="/licence-terms" className="text-goldink underline underline-offset-2">
            Digital Product Licence &amp; Usage Terms
          </Link>
          . Where they conflict with these terms on their subject matter, they take
          precedence.
        </p>
        <p className="text-sm text-charcoal/60">
          [Avensra to insert registered company name, company number, registered address and
          governing jurisdiction before publication.]
        </p>
      </Clause>

      <Clause n="2." title="Who may buy">
        <p>
          You may buy from us if you are at least 18 and legally able to enter a contract.
          If you buy on behalf of an organisation, you confirm you are authorised to bind
          it, and &ldquo;you&rdquo; means that organisation.
        </p>
      </Clause>

      <Clause n="3." title="Products and services">
        <LegalList
          items={[
            <>
              <strong>Digital products</strong> — bought through this website and delivered
              electronically under licence.
            </>,
            <>
              <strong>Corporate experiences</strong> — facilitated sessions arranged
              directly with Avensra under a separate written quotation.
            </>,
            <>
              <strong>Corporate licences</strong> — arranged directly with Avensra under a
              separate written licence agreement.
            </>,
            <>
              <strong>Consulting</strong> — engaged under a separate written agreement.
            </>,
          ]}
        />
        <p>
          Only digital products are sold through the website checkout. Everything else
          begins with an enquiry and is confirmed in writing.
        </p>
      </Clause>

      <Clause n="4." title="Orders and acceptance">
        <p>
          Placing an order is an offer to buy. A contract forms when we confirm your order
          by email and issue your access. If we cannot accept an order &mdash; for example
          because of a pricing error, a suspected fraudulent transaction or a technical
          failure &mdash; we will tell you and refund any payment in full.
        </p>
      </Clause>

      <Clause n="5." title="Prices and payment">
        <LegalList
          items={[
            "All digital product prices are shown and charged in US dollars (USD).",
            "Payment is taken in full at checkout through our payment provider's secure hosted checkout.",
            "If your card is issued in another currency, your bank sets the conversion rate and may add a foreign transaction fee. We do not control or receive those charges.",
            "Prices may change at any time, but a change never affects an order already placed.",
            "Where sales tax, VAT or an equivalent applies, it is calculated at checkout and shown before you pay.",
          ]}
        />
      </Clause>

      <Clause n="6." title="Delivery and access">
        <p>
          Digital products are delivered electronically to the email address used at
          checkout, immediately after payment is confirmed. It is your responsibility to
          give a correct address and to make sure our email can reach you.
        </p>
        <p>
          Access is provided under licence. Depending on the product, that may involve
          activating a licence in a secure viewer, or downloading a personalised file. The
          specific arrangements for each product are described on its page and in the
          Licence Terms.
        </p>
        <LegalNote>
          If you do not receive your access within an hour of paying, check your spam folder
          and then{" "}
          <Link href="/contact" className="text-goldink underline underline-offset-2">
            contact us
          </Link>
          . We will resolve it or refund you in full.
        </LegalNote>
      </Clause>

      <Clause n="7." title="Your right to cancel, and refunds">
        <p>
          Digital products are supplied immediately. By completing checkout you ask us to
          begin supply straight away and, to the extent permitted by law, acknowledge that
          you lose any statutory right to cancel once access has been issued.
        </p>
        <p>
          This does not affect your rights where a product is faulty, not as described, or
          where we cannot deliver it. Our{" "}
          <Link href="/refund-policy" className="text-goldink underline underline-offset-2">
            Refund Policy
          </Link>{" "}
          sets out in full when we do refund.
        </p>
      </Clause>

      <Clause n="8." title="Intellectual property">
        <p>
          All Avensra content, methodologies, frameworks, templates, materials and marks
          &mdash; including the Business-to-People Alignment System&trade; and The Executive
          Reset&trade; &mdash; remain the property of Avensra. Buying a product grants you a
          licence to use it; it does not transfer ownership of anything.
        </p>
        <p>
          Nothing on this website may be copied, reproduced, republished or used to create
          derivative works without our written permission.
        </p>
      </Clause>

      <Clause n="9." title="Acceptable use">
        <p>You agree not to:</p>
        <LegalList
          items={[
            "Share, resell, sublicense or redistribute any product or licence",
            "Circumvent, disable or attempt to defeat any licensing, watermarking or access control",
            "Use Avensra material commercially with third parties without a corporate or facilitator licence",
            "Attempt to gain unauthorised access to any part of the website or its systems",
            "Use the website for anything unlawful, or in a way that disrupts it for others",
          ]}
        />
        <p>
          We may suspend or revoke access, without refund, where these terms are materially
          breached.
        </p>
      </Clause>

      <Clause n="10." title="Support">
        <p>
          Purchases of the Business-to-People Alignment System&trade; include seven days of
          technical support from the date of purchase, covering licence activation, secure
          viewer installation and access problems. Support for The Executive Reset&trade;
          covers download and access issues by email.
        </p>
        <p>
          Technical support is not consulting. Questions about how to apply a methodology to
          your organisation are welcome, but are a consulting conversation rather than a
          support request.
        </p>
      </Clause>

      <Clause n="11." title="What we promise, and what we do not">
        <p>
          We supply our products with reasonable care and skill and as described. We do not
          promise any particular business outcome. Our products are professional tools; what
          they produce depends on how they are used and on circumstances outside our
          control.
        </p>
        <p>
          Nothing in our materials is legal, financial, tax or employment advice, and it
          should not be relied on as a substitute for professional advice.
        </p>
      </Clause>

      <Clause n="12." title="Liability">
        <p>
          We do not exclude or limit liability for death or personal injury caused by our
          negligence, for fraud, or for anything else that cannot lawfully be excluded.
        </p>
        <p>
          Subject to that, our total liability arising out of any purchase is limited to the
          amount you paid for it. We are not liable for loss of profit, loss of business,
          loss of anticipated savings, or any indirect or consequential loss.
        </p>
      </Clause>

      <Clause n="13." title="Availability">
        <p>
          We aim to keep the website available but do not guarantee uninterrupted access. We
          may suspend, withdraw or change any part of it, including discontinuing a product.
          Discontinuing a product does not revoke a licence already validly issued.
        </p>
      </Clause>

      <Clause n="14." title="Changes to these terms">
        <p>
          We may update these terms. The version in force for your purchase is the version
          published when you placed your order. Continued use of the website after a change
          means you accept the updated terms.
        </p>
      </Clause>

      <Clause n="15." title="Governing law">
        <p>
          These terms and any dispute arising from them are governed by the laws of [insert
          jurisdiction], and the courts of [insert jurisdiction] have exclusive
          jurisdiction. If you are a consumer, this does not deprive you of the protection
          of the mandatory laws of the country where you live.
        </p>
        <p className="text-sm text-charcoal/60">
          [Avensra to confirm governing law and jurisdiction with a qualified adviser.]
        </p>
      </Clause>

      <Clause n="16." title="Contact">
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${site.email}`} className="text-goldink underline underline-offset-2">
            {site.email}
          </a>
          .
        </p>
      </Clause>
    </LegalPage>
  );
}
