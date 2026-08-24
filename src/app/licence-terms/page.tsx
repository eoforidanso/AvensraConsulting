import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, Clause, LegalList, LegalNote } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Digital Product Licence & Usage Terms",
  description:
    "What your Avensra digital product licence permits, what it does not, how licences are protected and identified, and when a licence can be revoked.",
  alternates: { canonical: "/licence-terms" },
};

const UPDATED = "1 September 2025";

export default function LicenceTermsPage() {
  return (
    <LegalPage
      title="Digital Product Licence & Usage Terms"
      updated={UPDATED}
      summary="Buying an Avensra digital product gives you a licence to use it. It does not transfer ownership. This document sets out exactly what that licence permits."
    >
      <Clause n="1." title="What you are buying">
        <p>
          When you purchase an Avensra digital product you receive a{" "}
          <strong>limited, personal, non-exclusive, non-transferable licence</strong> to use
          it under these terms. All intellectual property in the product &mdash; the
          methodology, frameworks, templates, tools, text, design and marks &mdash; remains
          owned by {site.legalName}.
        </p>
        <LegalNote>
          In plain terms: it is yours to use, for your own work. It is not yours to give
          away, sell, publish, or use to deliver services to other people.
        </LegalNote>
      </Clause>

      <Clause n="2." title="Licence types">
        <p className="font-semibold text-navy">Single-user licence (standard purchase)</p>
        <p>
          Every purchase made through this website is a single-user licence, issued to the
          named purchaser. It covers use by that one individual.
        </p>

        <p className="font-semibold text-navy">Corporate licence</p>
        <p>
          Where an organisation needs access for multiple people, or wants its own
          facilitators to run sessions using Avensra material, a corporate licence is
          required. These are agreed directly with Avensra under a separate written
          agreement.{" "}
          <Link
            href="/corporate-experiences#licensing"
            className="text-gold underline underline-offset-2"
          >
            Enquire about corporate licensing
          </Link>
          .
        </p>
      </Clause>

      <Clause n="3." title="What your licence permits">
        <LegalList
          items={[
            "Use of the product for your own professional work, including inside the organisation you work for",
            "Applying the frameworks, diagnostics and templates to your own organisation's situation",
            "Using completed templates and outputs internally, including sharing your own completed outputs with colleagues",
            "Retaining your licensed access for as long as your licence remains valid",
          ]}
        />
        <p className="text-[0.93rem] text-charcoal/70">
          Sharing an output you produced using a template is fine. Sharing the template
          itself is not.
        </p>
      </Clause>

      <Clause n="4." title="What your licence does not permit">
        <LegalList
          items={[
            "Sharing, sending, uploading or otherwise distributing the product or any part of it",
            "Reselling, sublicensing, renting or transferring your licence to anyone else",
            "Using the product to deliver training, facilitation, coaching or consulting to third parties",
            "Using the product to create a competing or derivative product",
            "Removing, altering or obscuring any watermark, identifier, copyright notice or trademark",
            "Circumventing, disabling or attempting to defeat any licensing, access control or protection measure",
            "Publishing the product or extracts from it, including on internal wikis, shared drives or social media",
            "Using Avensra marks or branding in a way that suggests endorsement or partnership",
          ]}
        />
      </Clause>

      <Clause n="5." title="Product-specific terms">
        <p className="font-semibold text-navy">
          Business-to-People Alignment System&trade;
        </p>
        <p>
          Because of the commercial value of its methodology, templates and tools, this
          product is delivered under stronger protection. Access is issued through a
          licensed secure viewer rather than as an open file, and your licence may be
          limited to a set number of devices. Printing and copying are governed by the
          restrictions applied to your licence and confirmed when it is issued.
        </p>
        <p>
          The purchase includes seven days of technical support from the date of purchase,
          covering licence activation, viewer installation and access problems.
        </p>

        <p className="font-semibold text-navy">The Executive Reset&trade;</p>
        <p>
          This product is designed to be worked on by hand, so it is delivered with lighter
          protection.{" "}
          <strong>You may print it for your own personal use</strong>, and you may open it
          on a tablet and complete it with a stylus. Your copy is personalised and
          identifiable to you. Printing for distribution to others, or supplying copies to
          colleagues or participants, requires a corporate licence.
        </p>
      </Clause>

      <Clause n="6." title="Identification and watermarking">
        <p>
          Copies are identifiable to the purchaser. Depending on the product, this may
          include visible or embedded watermarking, licence identifiers, and records of
          activation and download events.
        </p>
        <p>
          We do this to protect our work, and it has a consequence worth stating plainly: if
          a copy is distributed without authorisation, it can be traced back to the licence
          it came from. Please keep your access to yourself.
        </p>
      </Clause>

      <Clause n="7." title="Devices, access and reissue">
        <LegalList
          items={[
            "Where a device limit applies to your licence, it is stated when your licence is issued.",
            "If you change or lose a device, contact us and we can move your licence, subject to reasonable use.",
            "If you lose your access link or it expires, we will reissue it on request from the purchase email address.",
            "Access links are personal. Do not forward them.",
          ]}
        />
      </Clause>

      <Clause n="8." title="Duration and revocation">
        <p>
          Your licence is granted for the duration stated at purchase. Where no duration is
          stated, it is perpetual for your own use, subject to these terms.
        </p>
        <p>We may suspend or revoke a licence, without refund, where:</p>
        <LegalList
          items={[
            "The product has been shared, redistributed or published without authorisation",
            "Protection or licensing measures have been circumvented or attempted to be circumvented",
            "The product has been used commercially with third parties without the appropriate licence",
            "The purchase was refunded, reversed or charged back",
            "These terms have otherwise been materially breached",
          ]}
        />
        <p>
          Where we revoke a licence, you must stop using the product and delete or destroy
          any copies in your possession.
        </p>
      </Clause>

      <Clause n="9." title="If your licence is revoked in error">
        <p>
          Tell us. We will investigate promptly and, if we got it wrong, restore your access
          immediately and without cost to you.
        </p>
      </Clause>

      <Clause n="10." title="Corporate and facilitator use">
        <p>
          If you want to use Avensra material with a team, with participants, or with
          clients, that is a conversation we welcome &mdash; it simply needs the right
          licence. A corporate licence covers licensed materials for your facilitators,
          facilitator guidance, agreed participant volumes and defined usage terms.
        </p>
        <p>
          <Link
            href="/corporate-experiences#licensing"
            className="text-gold underline underline-offset-2"
          >
            Enquire about corporate licensing
          </Link>
          .
        </p>
      </Clause>

      <Clause n="11." title="Changes">
        <p>
          We may update these terms for future purchases. The version applying to your
          licence is the version in force when you bought it, except where a change is
          needed for legal or security reasons.
        </p>
      </Clause>

      <Clause n="12." title="Contact">
        <p>
          Questions about what your licence permits &mdash; ask before assuming, and we will
          give you a straight answer:{" "}
          <a href={`mailto:${site.email}`} className="text-gold underline underline-offset-2">
            {site.email}
          </a>
          .
        </p>
      </Clause>
    </LegalPage>
  );
}
