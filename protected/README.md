# Protected product files

> ## ⚠️ THIS REPOSITORY IS PUBLIC
>
> Anything committed here is readable by anyone on the internet, which would
> completely defeat the paywall and the DRM.
>
> **Do not commit the real product files while this repository is public.**
>
> Choose one of these before go-live:
>
> 1. **Make the repository private** (`gh repo edit --visibility private`), then
>    commit the real files. Simplest option.
> 2. **Keep it public** and host the files outside the repo — point
>    `PROTECTED_DIR` at a mounted volume, or move delivery to object storage
>    (S3 / Cloudflare R2) with the same signed-token check in front of it.
>
> The files currently in this directory are generated placeholders with no
> commercial value, so they are safe to have here today.

Files in this directory are **never** served directly. They are released only
by `/api/deliver/[file]`, against a signed access token minted after a
confirmed Stripe payment, and only for the SKU that token was issued for.

Do not move these into `/public` — that would make them downloadable by
anyone who guesses the filename.

## Expected filenames

These must match the `assets[].file` values in `src/content/products.ts`:

| File | Product |
|---|---|
| `bpas-methodology.pdf` | Business-to-People Alignment System™ — Core Methodology |
| `bpas-diagnostic.pdf` | Business-to-People Alignment System™ — Alignment Diagnostic |
| `bpas-toolkit.pdf` | Business-to-People Alignment System™ — Template & Tool Pack |
| `executive-reset.pdf` | The Executive Reset™ |

The placeholder PDFs currently here exist so the purchase and delivery journey
can be tested before the real product files are supplied. **Replace them with
the real files before go-live.**

Once a DRM provider is live for the Alignment System, that provider serves its
own protected files and the `bpas-*.pdf` entries here become unused.
