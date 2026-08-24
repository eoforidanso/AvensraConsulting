# Website Asset Integration Spec — for the Graphic Designer

This is the technical counterpart to `avensra-brand-product-production-brief.pdf`.
That brief specifies **what** to produce and to what creative standard; this
document specifies **exactly where each deliverable goes and in what format**,
so the finished files drop into the live website with no code changes.

The website developer (this repo) does not redesign the logo, book covers,
product identity or mock-ups, per §16 of the production brief. This document
exists so that boundary doesn't cost round-trips at handover.

Every placeholder listed below is vector, on-brand, and clearly commented in
the code — the site is fully reviewable today and simply swaps assets in.

---

## 1. Logo system

**Code today:** `src/components/Logo.tsx` draws a placeholder mark inline as
JSX/SVG (see the `Mark` component), not from a file. Nothing to delete —
swapping in real files means editing this one component to render an
`<Image>` instead of `<Mark/>`.

| Deliverable (brief §4–5) | File to supply | Used |
|---|---|---|
| Primary logo, dark/navy background | `public/logo-light.svg` | Header (navy bar), dark sections, footer if placed on navy |
| Primary logo, light/ivory/white background | `public/logo-dark.svg` | Footer (ivory background), any light-background placement |
| Standalone geometric A mark | `public/mark.svg` | Favicon source, loading states, small placements |
| Favicon | replaces `src/app/icon.svg` (currently a placeholder A on navy, 64×64 viewBox) | Browser tab |
| Apple touch icon | replaces `src/app/apple-icon.tsx` (currently generates a 180×180 PNG from the placeholder mark) | iOS home screen |
| Watermark A (brief §8) | `public/watermark-a.svg` | Home page hero, see §2 below |

**Format:** SVG for all web use (crisp at any size, small file, matches how
the placeholder is built today). Supply AI/EPS/vector PDF as the master
source per the brief — the website only consumes the SVG export.

**Sizing:** the header renders the mark at a fixed height (`h-9`/`h-10`,
≈36–40px) beside the wordmark. Supply the mark as its own SVG with a tight
viewBox — no baked-in padding — so it scales cleanly at header, footer and
favicon sizes alike.

---

## 2. Homepage hero (brief §8)

**Code today:** `src/components/HeroBackdrop.tsx` — a full vector stand-in:
gradient sky, a photographic-style ridge line, and the oversized A mark at
**14% opacity**, which sits inside the brief's specified 10–15% range already.

**To integrate the real photograph:**
1. Add `public/hero.jpg` (the mountain/sunrise photograph).
2. Add `public/watermark-a.svg` (per §1).
3. In `HeroBackdrop.tsx`, replace the `<svg>` sky/ridge illustration with a
   `next/image` render of `hero.jpg`, keep the existing gradient `<div>`
   overlays (they hold text-readability contrast on the left side — reusable
   as-is), and replace the inline mark `<g>` with `watermark-a.svg` at the
   same opacity and roughly the same scale/position (`translate(940 92)
   scale(1.42)` in the current 1440×620 viewBox — convert proportionally).

No other component references the hero image; this is the only file to touch.

---

## 3. Business-to-People Alignment System™ (brief §14)

**Code today:** `src/components/ProductVisual.tsx` exports
`AlignmentSystemVisual` — an inline SVG standing in for the bound-volume +
tablet mock-up shown on the artwork sheet.

| Deliverable | File | Used |
|---|---|---|
| Flat front-cover artwork | `public/products/bpas-cover.png` | Could replace the SVG cover face directly |
| Hero/sales-page product mock-up (transparent PNG) | `public/products/bpas.png` | Referenced today as `product.image` in `src/content/products.ts` (currently `.svg`, unused by any page yet — first real integration point) |
| Website product-card / thumbnail | `public/products/bpas-thumb.png` | Digital Products listing card, home page column |

**Where it renders today:** `<ProductVisual slug="business-to-people-alignment-system" />`
is used in three places — home page, `/digital-products`, and the sales page
hero. Swap the component's `AlignmentSystemVisual` branch for an `<Image
src="/products/bpas.png">` and every placement updates at once.

**Aspect ratio:** the SVG placeholder uses a `320×220` viewBox (≈1.45:1,
landscape). Match this ratio (or update the one `<Image>` call's width/height
together) so the surrounding layout — which sizes to `max-w-sm`/`max-w-xs`
containers — doesn't need adjusting.

**3D mock-up / promo graphics:** not yet wired to any page. Once supplied,
they're a straightforward addition to the sales page — flag when ready and
this repo will add the placement.

---

## 4. The Executive Reset™ (brief §15)

**Code today:** `ProductVisual.tsx` exports `ExecutiveResetVisual` — the
printed-book + tablet/stylus stand-in.

| Deliverable | File | Used |
|---|---|---|
| Front/back cover artwork | `public/products/executive-reset-cover.png` | Cover face |
| Print-ready interior (A4 + US Letter) | delivered as its own PDF, not part of the website build | Sold as the product itself — see §5 |
| Digital/tablet edition | same | |
| Corporate Edition (org name / licence ID fields) | same, plus confirm the field-fill mechanism (flat template vs. generated per order) — flag before building, it may need a small code change to `src/lib/fulfilment.ts` if the org name is inserted at the point of sale | |
| Website hero/sales-page mock-up | `public/products/executive-reset.png` | Same three placements as §3 |
| Website product-card / thumbnail | `public/products/executive-reset-thumb.png` | Listing card |

**Aspect ratio:** same `320×220` (≈1.45:1) viewBox as the Alignment System
visual — match it for a drop-in swap.

---

## 5. Important distinction: cover art vs. the actual product file

Everything in §3 and §4 above is **website presentation art** — what a buyer
sees before purchasing. It is not the product.

The actual product a customer receives after payment is a separate,
protected PDF, currently a placeholder at:

```
protected/bpas-methodology.pdf
protected/bpas-diagnostic.pdf
protected/bpas-toolkit.pdf
protected/executive-reset.pdf
```

These are content deliverables (the finished 40-page interior, the
methodology documents), not graphic-design deliverables — likely out of this
brief's scope, but flagging so nothing falls in the gap between the design
brief and content production. See `protected/README.md` for the security
note on replacing these (**the GitHub repo is currently public — do not
commit real files until that's resolved**, tracked in
`LAUNCH-CHECKLIST.md` §1.9).

---

## 6. Brand colour tokens — ⚠️ discrepancy to resolve before any asset work

The site's CSS tokens (`src/app/globals.css`) were built from the values on
`avensra-design-direction.jpeg`. The new production brief states **different**
hex values for the same five colours:

| Colour | Design-direction sheet (what the site uses today) | Production brief (this PDF, §3) |
|---|---|---|
| Navy | `#0D1B33` | `#0B1D33` |
| Gold | `#C79A44` | `#C7A24A` |
| Ivory | `#F5F2EE` | `#F7F5EE` |
| Charcoal | `#1B1F24` | `#2B2B2B` |
| White | `#FFFFFF` | `#FFFFFF` |

Navy and Gold are close (transposed digits — possibly a typo in one
document). Charcoal is materially different: `#1B1F24` is a navy-tinted
near-black, `#2B2B2B` is a neutral mid-grey — these would look visibly
different as body text and dark UI.

**Both documents are presented as approved Avensra brand direction. This
needs a decision from Avensra, not a guess** — whichever is confirmed correct,
it's a one-file change (`src/app/globals.css`, the five `--color-*` tokens
under `@theme`) and every page updates automatically; nothing else in the
codebase hardcodes a hex value.
