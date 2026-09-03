# Emmanus Plus Consulting — Phase 1 Website

Production website for Emmanus Plus Consulting: marketing, digital-product ecommerce,
secure post-payment delivery, DRM/licensing integration points, enquiry and
feedback capture, and analytics.

Built to the approved artwork in [`brand/avensra-design-direction.jpeg`](brand/avensra-design-direction.jpeg).

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router, TypeScript) | Static marketing pages plus server routes for payment, delivery and forms, in one deployable unit |
| Styling | Tailwind CSS v4 | Brand tokens defined once in `src/app/globals.css` |
| Payments | Stripe Checkout (hosted) | Card data never touches this site; PCI scope minimised; international cards, 3-D Secure and refunds handled natively |
| Email | Resend (HTTP API) | Transactional order, access and enquiry email |
| DRM / licensing | Provider-agnostic adapter | Locklizard adapter written; provider not confirmed until UAT |
| Storage | JSONL files (dev) / Postgres (prod) | Same interface, switched by `DATABASE_URL` |
| Hosting | Vercel (recommended) | First-class Next.js support; Emmanus Plus owns the account |

### Native vs custom (Phase 1 brief §11)

- **Native / third-party:** payments, refunds, customer records, receipts, tax
  (Stripe); email delivery (Resend); analytics (GA4); DRM (provider TBC).
- **Custom (thin):** the site itself, the checkout hand-off, the webhook
  fulfilment step, the signed-link delivery fallback, three forms, and a CSV
  export screen.
- **Deliberately not built:** custom SaaS backend, custom admin dashboard,
  proprietary DRM engine, corporate licensing portal, testimonial approval
  workflow, CRM. All are out of scope per §14.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you need
npm run dev
```

The site runs without any keys: marketing pages render, buy buttons show
"Available at launch", and forms log instead of emailing. Add keys to switch
each capability on.

| Command | Does |
|---|---|
| `npm run dev` | Development server on :3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript, no emit |

---

## Where things live

```
src/
  app/                     Pages and API routes (App Router)
    api/checkout/          Creates a Stripe Checkout session
    api/stripe/webhook/    THE only place an order is marked paid
    api/deliver/[file]/    Serves protected files against a signed token
    api/forms/             contact | corporate | feedback
    api/admin/             Login and CSV export
    access/                Customer's post-purchase access page
    order/confirmed/       Post-checkout confirmation + conversion tracking
    admin/                 Export screen
  components/              UI, header/footer, forms, product visuals
  content/                 products.ts | experiences.ts | faq.ts  <- EDIT COPY HERE
  lib/
    licensing/             Provider-agnostic DRM adapter (see below)
    access-token.ts        HMAC-signed, expiring delivery tokens
    fulfilment.ts          Record order -> issue licence -> email customer
    store.ts               JSONL / Postgres record store
    site.ts                Navigation, contact details, footer
protected/                 Product files. NEVER move into /public
data/                      Local record store (gitignored)
```

**To change copy, prices or FAQ answers, edit `src/content/`.** Pages read from
those files; no page code needs touching.

---

## The DRM / licensing integration (brief §4)

The provider is **not chosen until UAT**, so nothing outside
`src/lib/licensing/` knows which vendor is in use.

```
src/lib/licensing/
  types.ts        The contract + the two protection policies
  locklizard.ts   Locklizard Safeguard adapter (UNVERIFIED — see below)
  fallback.ts     Signed expiring links — used until a provider is live
  index.ts        Resolves the active provider from LICENSING_PROVIDER
```

**Protection tiers**, set per product in `src/content/products.ts`:

| | Business-to-People Alignment System™ | The Executive Reset™ |
|---|---|---|
| Tier | `strong` | `light` |
| Devices | 2 | unlimited |
| Printing | blocked | **allowed** (product is meant to be printed) |
| Copy / screen capture | blocked | allowed (blocking breaks stylus apps) |
| Watermark | yes | yes |
| Offline | yes | yes |

**To activate a provider at UAT:**

1. Set `LICENSING_PROVIDER=locklizard` and the three `LOCKLIZARD_*` variables.
2. Reconcile `locklizard.ts` against the live account's API documentation —
   the adapter is written to Locklizard's documented shape but has **not** been
   run against a real account, because the trial is only activated once the site
   is UAT-ready (brief §13).
3. Test a full purchase → licence → protected-access journey.

To use a different vendor instead, add a sibling adapter implementing
`LicensingProvider` and register it in `index.ts`. Nothing else changes.

Until a provider is live, the fallback issues signed, expiring, single-purchaser
access links. That is real access control — payment-gated, tokenised, revocable,
audit-logged — but it is **not DRM**: it does not restrict what happens to a file
after download. It exists so the commercial journey is complete and testable
before the DRM account exists.

---

## Payment and fulfilment flow

```
Customer clicks Buy
  -> POST /api/checkout          creates a Stripe Checkout Session (SKU in metadata)
  -> Stripe hosted checkout      card entry, 3-D Secure, ToS acceptance
  -> Stripe fires webhook        checkout.session.completed
  -> POST /api/stripe/webhook    signature verified BEFORE anything is read
       -> fulfilOrder()          idempotent: session id is the order id
            -> issue licence     via the active provider
            -> record order      name, email, product, amount, country, licence
            -> email customer    branded, with access link + activation code
            -> email Emmanus Plus     new-order notification
  -> Customer returns to /order/confirmed  (fires GA4 / Meta / LinkedIn purchase event)
```

**Refunds.** Refund in the Stripe dashboard. Stripe fires `charge.refunded`; a
full refund revokes the licence through the active provider and records the
revocation against the order. Partial refunds are recorded without revoking.

### Stripe setup checklist

1. Create the two Products/Prices in the Emmanus Plus-owned Stripe account (USD).
2. Put the Price IDs in `STRIPE_PRICE_BPAS` / `STRIPE_PRICE_TER`, and mirror the
   amounts in `NEXT_PUBLIC_PRICE_*` (display only).
3. Add webhook endpoint `https://<domain>/api/stripe/webhook`, subscribed to
   `checkout.session.completed` and `charge.refunded`. Copy the signing secret
   into `STRIPE_WEBHOOK_SECRET`.
4. Enable the card payment method and any regional methods Emmanus Plus wants.

Test locally with `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

---

## Administration (brief §10)

There is no custom dashboard, by design. Emmanus Plus administers:

| Task | Where |
|---|---|
| Orders, customers, receipts, refunds, tax | Stripe dashboard |
| Prices | Stripe dashboard (Price objects) |
| Licences, activation, revocation | DRM provider console (once live) |
| Enquiries, corporate enquiries, feedback | `/admin` → download CSV |
| Traffic, conversions | Google Analytics 4 |
| Page copy, FAQ, product detail | `src/content/` + deploy |

`/admin` is protected by `ADMIN_PASSWORD`, rate-limited to 5 attempts per 15
minutes, and `noindex`. CSVs carry a UTF-8 BOM so Excel renders `™` correctly,
and formula-triggering characters are neutralised.

---

## Security

- Card data never reaches this application (Stripe hosted checkout).
- Webhook payloads are signature-verified before being read.
- Product files sit outside `/public` and are released only against an
  HMAC-signed, expiring, SKU-scoped token, checked against a revocation list.
- Delivery responses are `no-store` and `noindex`; the filename is sanitised and
  the path cannot escape `PROTECTED_DIR`.
- Fulfilment is idempotent — a webhook retry cannot issue two licences.
- Security headers (HSTS, nosniff, frame options, referrer, permissions policy)
  are set in `next.config.ts`.
- Public forms are validated with Zod, rate-limited, and honeypotted.
- Untrusted values are escaped before entering HTML email bodies.
- `/admin`, `/access` and `/order/*` are `noindex` and disallowed in robots.txt.

**Before go-live:** set `DELIVERY_SECRET` to a strong random value
(`openssl rand -base64 48`). Access-token minting refuses to run in production
without it.

---

## SEO and analytics (brief §9)

Already configured: per-page titles and descriptions, canonicals, Open Graph and
Twitter cards, a generated PNG share image, `sitemap.xml`, `robots.txt`, and
JSON-LD for Organization, Product (both products), ItemList and FAQPage.

To switch tags on, set the env var — each stays completely dormant until then:

| Variable | Enables |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 + purchase conversion |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Search Console verification meta tag |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel + Purchase event |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag + conversion |

After deploying, submit `https://<domain>/sitemap.xml` in Search Console.

---

## Deployment (Vercel)

1. Emmanus Plus creates and owns the Vercel account; developers get Member access.
2. Import the repository, set every variable from `.env.example` in Project
   Settings → Environment Variables.
3. Set `DATABASE_URL` — **required in production**. Vercel's filesystem is
   ephemeral, so without it form submissions and order records are lost between
   invocations. Neon or Supabase Postgres is sufficient; tables are created
   automatically on first write.
4. Upload the real product files to `protected/` (they are committed with the
   deployment) or point `PROTECTED_DIR` at object storage.
5. Point the domain at Vercel and confirm HTTPS.

---

## Static preview (GitHub Pages)

**https://eoforidanso.github.io/AvensraConsulting/** — a static export of the
marketing and legal pages, for design review only.

GitHub Pages serves static files with no server, so this build necessarily
excludes everything that needs one: `/api/*`, `/admin`, `/access`,
`/order/confirmed`. Buy buttons correctly show "Available at launch" (no
Stripe key in that build), and the three forms fail with a friendly message
rather than submitting — both are the site's normal behaviour when a backend
isn't reachable, not something broken about this preview.

This preview lives entirely on the `gh-pages` branch, built from a scratch
copy with a temporary `output: "export"` config — `main` and its real
`next.config.ts` (security headers, API routes, dynamic rendering) are
untouched. **This is not the deployment path for the real site** — see
Deployment (Vercel) above for that. To refresh the preview after content
changes, rebuild the same way: copy the repo, strip `src/app/api`, `/admin`,
`/access`, `/order`, add `output: "export"` + the GitHub Pages `basePath`,
`next build`, push `out/` to `gh-pages`.

---

## Ownership (brief §12)

Every account below must be created and owned by Emmanus Plus, with developers added
under role-based access:

domain · hosting (Vercel) · Stripe · business email · Resend · DRM/licensing ·
Google Analytics · Search Console · Meta and LinkedIn ad accounts.

All code and configuration in this repository is Emmanus Plus's and is handed over at
completion.
