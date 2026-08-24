# Launch Checklist — Avensra Phase 1

Everything below is either **needed from Avensra** or **a decision to confirm**
before the site goes live. Items are ordered by what blocks launch first.

---

## 1. Blocking — the site cannot transact without these

| # | Item | Owner | Notes |
|---|---|---|---|
| 1.1 | **Confirm product prices** | Avensra | The brief did not state them. Current values are placeholders: **$497** (Alignment System) and **$37** (Executive Reset). Set in Stripe, then mirror in `NEXT_PUBLIC_PRICE_*`. |
| 1.2 | Stripe account created and activated | Avensra | Must be owned by Avensra. Developer added as Developer role. |
| 1.3 | Stripe Products/Prices created; IDs added to env | Dev | `STRIPE_PRICE_BPAS`, `STRIPE_PRICE_TER` |
| 1.4 | Stripe webhook endpoint + signing secret | Dev | `checkout.session.completed`, `charge.refunded` |
| 1.5 | `DELIVERY_SECRET` generated | Dev | `openssl rand -base64 48`. Token minting refuses to run in production without it. |
| 1.6 | `DATABASE_URL` set | Dev | Required on Vercel — the filesystem is ephemeral and records would be lost. |
| 1.7 | `ADMIN_PASSWORD` set | Avensra | Long random string; Avensra holds it. |
| 1.8 | Resend account + verified sending domain | Avensra | Needed for order confirmations to land, not go to spam. Add SPF/DKIM records. |
| 1.9 | **Real product files** placed in `protected/` | Avensra | Currently placeholder PDFs. Filenames must match `src/content/products.ts`. **The GitHub repo is currently PUBLIC — do not commit real product files until it is made private, or move delivery to object storage.** See `protected/README.md`. |
| 1.9a | **Decide repository visibility** | Avensra | `eoforidanso/AvensraConsulting` is public today. Recommend making it private before real product files or client-specific configuration are added. |
| 1.10 | Domain pointed at hosting, HTTPS confirmed | Dev | |

---

## 2. Brand assets still needed

| # | Item | Current state |
|---|---|---|
| 2.1 | **Official logo files** | The artwork sheet says "use supplied logo files only — do not alter or redraw". No files were supplied, so `src/components/Logo.tsx` contains a faithful **placeholder** built to the artwork's proportions. Drop the real SVGs into `public/` and swap `<Mark/>` for `<Image>`. |
| 2.2 | **Hero photograph** | The artwork uses a sunrise-over-mountains photograph. None was supplied. `HeroBackdrop.tsx` is an on-brand vector stand-in holding the same composition. Add `public/hero.jpg` and render it behind the existing gradient overlays. |
| 2.3 | **Product mockup images** | `ProductVisual.tsx` holds vector stand-ins for the bound system and printed book. Replace with the real renders when available. |
| 2.4 | LinkedIn company URL | `src/lib/site.ts` has a best guess — confirm the real URL. |

None of these block launch; all three placeholders are brand-consistent and
production-quality. They are marked with handover comments in the code.

---

## 3. Legal — review required

The four policy pages are **comprehensive, launch-ready drafts** written against
the Phase 1 brief and normal practice for digital-product sales. **They have not
been reviewed by a lawyer.**

| # | Action | Owner |
|---|---|---|
| 3.1 | Have a qualified adviser review Privacy Policy, Terms & Conditions, Refund Policy and Licence Terms | Avensra |
| 3.2 | Fill the bracketed placeholders: registered company name, company number, registered address, governing law and jurisdiction | Avensra |
| 3.3 | Name the actual sub-processors in the Privacy Policy once providers are chosen | Avensra |
| 3.4 | Confirm the consumer-cancellation-waiver wording is valid in the jurisdictions sold to | Adviser |
| 3.5 | Confirm sales tax / VAT treatment for digital goods; enable Stripe Tax if required | Avensra |

---

## 4. DRM / licensing — UAT stage

Per the brief, the DRM trial is activated **only when the site is ready for UAT**,
so the trial covers the complete purchase → licence → protected-access journey.

| # | Action |
|---|---|
| 4.1 | Select the provider (Locklizard is under evaluation, not confirmed) |
| 4.2 | Activate the trial once UAT-ready |
| 4.3 | Reconcile `src/lib/licensing/locklizard.ts` against the live account's API docs — the adapter is written to the documented shape but **has not been run against a real account** |
| 4.4 | Confirm the `strong` policy on the Alignment System: 2 devices, printing off, copy/capture blocked, watermarked |
| 4.5 | Confirm the `light` policy on The Executive Reset: **printing on**, copy/capture **not** blocked (blocking breaks tablet stylus apps), watermarked |
| 4.6 | Test licence revocation via a full Stripe refund |
| 4.7 | If a different vendor is chosen, add a sibling adapter — no other code changes |

---

## 5. Test before go-live (brief §13)

- [ ] Purchase each product end to end with a live card
- [ ] Order confirmation email arrives, is branded, and the access link works
- [ ] Avensra receives the new-order notification
- [ ] Access page opens; files download; a second person cannot use the link
- [ ] Expired and tampered tokens are rejected *(automated checks already pass)*
- [ ] Refund in Stripe → access revoked → order record updated
- [ ] Contact, corporate and feedback forms deliver and auto-reply
- [ ] `/admin` exports open cleanly in Excel with `™` intact
- [ ] Desktop, tablet and mobile on Chrome, Safari, Firefox and Edge
- [ ] GA4 records a purchase conversion
- [ ] Sitemap submitted to Search Console
- [ ] Five-person product pilot runs through the real journey

---

## 6. Decisions Avensra should confirm

| # | Question | Recommendation |
|---|---|---|
| 6.1 | Product prices | See 1.1 — placeholders in place |
| 6.2 | Cart vs. direct checkout | **No cart built.** Two single-item products; a cart adds a step and a failure point for no benefit. Trivial to add later if bundling arrives. |
| 6.3 | Customer accounts | **None built**, per §3 of the brief. Access is by signed link plus reissue-on-request, which is fewer moving parts and less to secure. Revisit if repeat purchasing grows. |
| 6.4 | Corporate pricing shown publicly | Guide prices ($350/$500/$750) are shown as on the artwork, with a note that final pricing is quoted. Say if you would rather show nothing. |
| 6.5 | Executive Career Positioning™ | **Deliberately not published**, per §6. The footer link on the artwork sheet has been omitted. Add one entry to `src/app/consulting/page.tsx` when approved. |
| 6.6 | Testimonials section | Not built — there is nothing approved to show yet. The feedback form captures explicit publish and name consent separately, so testimonials can be added by hand when you have them. |
| 6.7 | Support hours wording | Currently "UK business hours, Monday to Friday". Change in `src/content/faq.ts` if wrong. |

---

## 7. Recommended changes to the Phase 1 scope

Raised as the brief invites (§"Quotation Requested", final bullet).

| # | Requirement | Recommendation | Reason |
|---|---|---|---|
| 7.1 | "Provide cart/checkout functionality where required" | Direct-to-checkout, no cart | Two single-item digital products. A cart is a step to abandon at, with no upsell to justify it. The wording already says "where required". |
| 7.2 | "Customer account/member functionality only where required" | No accounts at launch | Signed expiring links plus reissue-on-request meets secure fulfilment with far less to build, secure and support. Matches §3's own steer. |
| 7.3 | Refund administration | Use Stripe's native refunds, with automatic licence revocation wired to the webhook | Avoids building a refund UI. Avensra refunds where they already reconcile payments. |
| 7.4 | Feedback export | CSV download rather than a viewer | The brief says Excel is the working tool. A CSV export is less to build and more useful than a read-only web table. |
| 7.5 | DRM for The Executive Reset™ | Keep protection genuinely light | Locking print or screen capture would break the product — it is meant to be printed and drawn on with a stylus. Watermarking plus identifiable copies is the right deterrent here. |
| 7.6 | Storage | Add a hosted Postgres from day one | Not in the brief, but on serverless hosting form submissions are silently lost without it. ~$0–19/month. |
