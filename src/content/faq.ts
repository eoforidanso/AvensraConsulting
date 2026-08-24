/** FAQ / support content. Structured by category for the searchable index. */

export type FaqCategory = {
  id: string;
  title: string;
  blurb: string;
  items: { q: string; a: string }[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "orders-payment",
    title: "Orders & Payment",
    blurb: "Buying, pricing, currency and receipts.",
    items: [
      {
        q: "What currency are your products priced in?",
        a: "All digital product prices are shown and charged in US dollars (USD). If your card is issued in another currency, your bank will convert the amount at their prevailing rate and may add a foreign transaction fee.",
      },
      {
        q: "Which payment methods do you accept?",
        a: "We accept major international credit and debit cards through our payment provider. Card details are entered on the provider's secure hosted checkout — Avensra never sees or stores your full card number.",
      },
      {
        q: "Can I buy from outside the United States?",
        a: "Yes. We accept international cards subject to our payment provider's supported countries and your card issuer's own controls.",
      },
      {
        q: "Will I get a receipt?",
        a: "Yes. An order and payment confirmation is emailed automatically to the address used at checkout, immediately after a successful payment.",
      },
      {
        q: "I did not receive my confirmation email.",
        a: "Check your spam or junk folder first, and confirm the address you used at checkout. If it still has not arrived, contact us with the name and email used and we will resend it.",
      },
      {
        q: "Do you offer corporate invoicing?",
        a: "Yes, for corporate experiences and corporate licences. These are arranged directly with Avensra rather than through the website checkout — send us an enquiry and we will issue a quotation and invoice.",
      },
    ],
  },
  {
    id: "access-delivery",
    title: "Product Access & Delivery",
    blurb: "How you receive and open what you have bought.",
    items: [
      {
        q: "How soon do I get access after paying?",
        a: "Immediately. Once payment is confirmed, your access is issued automatically and an email is sent to the address used at checkout.",
      },
      {
        q: "How is the Business-to-People Alignment System™ delivered?",
        a: "It is delivered as a protected digital system. You receive a licence that is unique to you, activated through our licensing provider's secure viewer. This protects the methodology, templates and tools that make up the system.",
      },
      {
        q: "How is The Executive Reset™ delivered?",
        a: "As a personalised PDF issued to your purchase email. It is intended to be printed for your own use or opened on a tablet and completed with a stylus.",
      },
      {
        q: "Can I print The Executive Reset™?",
        a: "Yes. Printing for your own personal use is permitted and expected — it is designed to be worked on by hand.",
      },
      {
        q: "Can I print the Business-to-People Alignment System™?",
        a: "Access and printing for the Alignment System are governed by the licence issued with your purchase. Where printing is restricted, this is stated in your licence terms at the point of access.",
      },
      {
        q: "How many devices can I use?",
        a: "Your licence covers your own use. Device limits, where they apply, are set out in the Digital Product Licence & Usage Terms and confirmed when your licence is issued.",
      },
      {
        q: "I have lost my access or changed device.",
        a: "Contact us from the email address used at purchase. We can reissue access or move your licence to a new device, subject to the terms of your licence.",
      },
    ],
  },
  {
    id: "licence-usage",
    title: "Licence & Usage",
    blurb: "What you may do with what you have bought.",
    items: [
      {
        q: "Can I share my purchase with colleagues?",
        a: "No. A standard purchase is a single-user licence for your own use. Copies are identifiable to the purchaser. If you need your team to have access, a corporate licence is the correct route and is usually better value.",
      },
      {
        q: "Can I use these materials with my own clients?",
        a: "Not under a standard single-user licence. Facilitation and client-facing use require a corporate or facilitator licence agreed with Avensra.",
      },
      {
        q: "Are my copies identifiable?",
        a: "Yes. Copies carry identifying information linked to the purchaser. This deters redistribution and lets us trace the source of any unauthorised copy.",
      },
      {
        q: "Can a licence be revoked?",
        a: "Yes, where the licence terms are breached — for example redistribution or unauthorised commercial use. See the Digital Product Licence & Usage Terms.",
      },
    ],
  },
  {
    id: "technical-support",
    title: "Technical Support",
    blurb: "Help with activation, access and files.",
    items: [
      {
        q: "What technical support is included?",
        a: "Purchases of the Business-to-People Alignment System™ include seven days of technical support from the date of purchase, covering licence activation, secure viewer installation and access problems. Support for The Executive Reset™ covers download and access issues by email.",
      },
      {
        q: "How do I contact technical support?",
        a: "Email us from the address you used at purchase and include your order reference. This lets us verify the purchase and resolve access issues quickly.",
      },
      {
        q: "What are your support hours?",
        a: "Support is handled during UK business hours, Monday to Friday. We aim to respond within one business day, and within two business days at the latest.",
      },
      {
        q: "The secure viewer will not open my file.",
        a: "Confirm you have activated your licence using the code sent to your purchase email, and that you are opening the file with the licensed viewer rather than a standard PDF reader. If it still fails, send us the error message and we will help.",
      },
    ],
  },
  {
    id: "corporate",
    title: "Corporate Experiences & Licensing",
    blurb: "Facilitated sessions and team-wide access.",
    items: [
      {
        q: "How do I book a facilitated Executive Reset™?",
        a: "Send a corporate enquiry with your preferred format, approximate participant numbers and timing. We will come back with a quotation and available dates.",
      },
      {
        q: "How many people can attend?",
        a: "Standard experiences are designed for up to 20 participants. For 21 or more, or for multi-team and multi-region delivery, we design a custom experience.",
      },
      {
        q: "Are sessions delivered online or in person?",
        a: "Both. Tell us which you need in your enquiry and we will confirm what is possible for your dates and locations.",
      },
      {
        q: "What is a corporate licence?",
        a: "A corporate licence lets your own facilitators run Executive Reset™ sessions internally, using licensed materials and facilitator guidance, within agreed participant volumes and usage terms.",
      },
    ],
  },
  {
    id: "refunds",
    title: "Refunds & Cancellations",
    blurb: "Where refunds do and do not apply.",
    items: [
      {
        q: "Can I get a refund on a digital product?",
        a: "Because access is issued immediately and cannot be returned, digital product sales are final once access has been issued. We do refund duplicate charges, and failed deliveries we cannot resolve. Full detail is in our Refund Policy.",
      },
      {
        q: "What if I was charged twice?",
        a: "Contact us with both order references and we will refund the duplicate charge in full.",
      },
      {
        q: "Can I cancel a booked corporate experience?",
        a: "Yes, subject to the notice periods set out in your quotation and the Refund Policy.",
      },
      {
        q: "How long does a refund take?",
        a: "Approved refunds are issued to the original payment method. Your bank typically takes five to ten business days to show the credit.",
      },
    ],
  },
];

/** Flat list used by the client-side FAQ search. */
export const faqIndex = faqCategories.flatMap((c) =>
  c.items.map((item, i) => ({
    id: `${c.id}-${i}`,
    category: c.title,
    categoryId: c.id,
    ...item,
  })),
);
