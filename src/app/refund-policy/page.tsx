import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Clause, LegalList, LegalNote } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "When Avensra Consulting refunds digital product purchases and corporate bookings, how to request a refund, and how long refunds take.",
  alternates: { canonical: "/refund-policy" },
};

const UPDATED = "1 September 2025";

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated={UPDATED}
      summary="Digital products are delivered instantly and cannot be returned, so sales are final once access has been issued. This policy explains the exceptions — and there are several."
    >
      <Clause n="1." title="The short version">
        <LegalNote>
          Once we have issued your access, a digital product sale is final. But we{" "}
          <strong>always</strong> refund a duplicate charge, a payment where we could not
          deliver, and a product that is faulty or not as described. If something has gone
          wrong,{" "}
          <Link href="/contact" className="text-gold underline underline-offset-2">
            tell us
          </Link>{" "}
          &mdash; we would rather fix it than argue about it.
        </LegalNote>
      </Clause>

      <Clause n="2." title="Why digital sales are final">
        <p>
          Our digital products are delivered immediately and in full. Once a licence has
          been issued and access provided, the product cannot be returned or un-received.
          By completing checkout you ask us to supply immediately and, to the extent
          permitted by law, acknowledge that you lose any statutory cancellation right at
          that point.
        </p>
        <p>
          This is why each product page describes in detail what is included, what format it
          is delivered in and what the licence permits. Please read that before buying, and
          ask us anything you are unsure about first &mdash; we would much rather answer a
          question than process a disappointment.
        </p>
      </Clause>

      <Clause n="3." title="When we do refund">
        <p>We refund in full, without argument, in each of these cases.</p>
        <LegalList
          items={[
            <>
              <strong>Duplicate payment.</strong> You were charged more than once for the
              same product. Send us both order references.
            </>,
            <>
              <strong>Failed delivery.</strong> We could not issue your access and cannot
              resolve it.
            </>,
            <>
              <strong>Faulty or not as described.</strong> The product is materially
              different from its description, or is unusable for reasons on our side, and we
              cannot put it right.
            </>,
            <>
              <strong>Unauthorised transaction.</strong> A payment was made without your
              authority and this is confirmed with our payment provider.
            </>,
            <>
              <strong>Order we could not accept.</strong> We declined or cancelled your
              order, for example because of a pricing error.
            </>,
          ]}
        />
      </Clause>

      <Clause n="4." title="When we usually do not refund">
        <LegalList
          items={[
            "You changed your mind after access was issued.",
            "You bought the wrong product, where the correct one was clearly described. We will normally offer to move you across instead, paying or refunding the difference.",
            "You did not use it. Access having been provided is what matters, not whether it was opened.",
            "The product did not produce the business outcome you hoped for. Our products are tools; we cannot guarantee results.",
            "Access was revoked because the licence terms were breached.",
          ]}
        />
        <p>
          None of this limits your legal rights where a product is faulty, not as described,
          or not supplied with reasonable care and skill.
        </p>
      </Clause>

      <Clause n="5." title="Technical problems come first">
        <p>
          If you cannot access something you have paid for, that is a support matter before
          it is a refund matter, and it is almost always fixable. Contact us with your order
          reference and we will reissue access, move your licence to another device, or
          resolve the activation problem.
        </p>
        <p>
          Purchases of the Business-to-People Alignment System&trade; include seven days of
          technical support for exactly this. If we genuinely cannot get you access, we
          refund you in full.
        </p>
      </Clause>

      <Clause n="6." title="Corporate experiences and licences">
        <p>
          Facilitated experiences and corporate licences are arranged under a separate
          written quotation or agreement, and the cancellation terms in that document apply.
          In the absence of anything different being agreed in writing:
        </p>
        <LegalList
          items={[
            "Cancelled more than 14 days before the session date: full refund of any deposit or fee paid.",
            "Cancelled 7 to 14 days before: 50% of the fee is payable.",
            "Cancelled less than 7 days before: the full fee is payable.",
            "Rescheduling with more than 7 days' notice: no charge, subject to availability.",
            "If Avensra cancels or cannot deliver: full refund, or a rescheduled date at your choice.",
          ]}
        />
        <p>
          Corporate licence fees are non-refundable once licensed materials have been issued
          to your organisation.
        </p>
      </Clause>

      <Clause n="7." title="How to request a refund">
        <p>
          Email{" "}
          <a href={`mailto:${site.email}`} className="text-gold underline underline-offset-2">
            {site.email}
          </a>{" "}
          from the address used at purchase, or use the{" "}
          <Link href="/contact" className="text-gold underline underline-offset-2">
            contact form
          </Link>
          , and include:
        </p>
        <LegalList
          items={[
            "Your order reference from your confirmation email",
            "The name and email address used at checkout",
            "What went wrong, in as much or as little detail as you like",
          ]}
        />
        <p>
          We acknowledge requests within one business day and decide within five business
          days. If we need more information, we will ask rather than decline.
        </p>
      </Clause>

      <Clause n="8." title="How refunds are paid">
        <LegalList
          items={[
            "Refunds are issued to the original payment method. We cannot refund to a different card or account.",
            "Refunds are made in USD, the currency of the original charge.",
            "Your bank typically takes five to ten business days to show the credit after we issue it.",
            "Where your bank applied a currency conversion or foreign transaction fee, that is a matter between you and your bank. The rate at refund may differ from the rate at purchase.",
          ]}
        />
      </Clause>

      <Clause n="9." title="Access after a refund">
        <p>
          Where a refund is issued in full, the associated licence is revoked and access is
          withdrawn. Any copies in your possession must be deleted or destroyed. Continuing
          to use a refunded product is a breach of the{" "}
          <Link href="/licence-terms" className="text-gold underline underline-offset-2">
            Licence Terms
          </Link>
          .
        </p>
      </Clause>

      <Clause n="10." title="Chargebacks">
        <p>
          If something has gone wrong, please contact us before raising a chargeback. We can
          almost always resolve it faster than your bank can, and a chargeback raised without
          contacting us first may result in access being suspended while it is investigated.
        </p>
      </Clause>

      <Clause n="11." title="Contact">
        <p>
          Any question about this policy:{" "}
          <a href={`mailto:${site.email}`} className="text-gold underline underline-offset-2">
            {site.email}
          </a>
          .
        </p>
      </Clause>
    </LegalPage>
  );
}
