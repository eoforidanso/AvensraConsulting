import type { Metadata } from "next";
import Link from "next/link";
import { Section, Card, ButtonLink, IconCircle, Arrow, Rule } from "@/components/ui";
import { IconLock, IconProduct } from "@/components/icons";
import { verifyAccessToken } from "@/lib/access-token";
import { isRevoked } from "@/lib/revocations";
import { getProductBySku } from "@/content/products";
import { drmActive } from "@/lib/licensing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your Access",
  // Never index a page reached with an access token.
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

function Problem({ title, body }: { title: string; body: string }) {
  return (
    <Section tone="ivory" size="tall">
      <div className="mx-auto max-w-xl text-center">
        <IconCircle className="mx-auto">
          <IconLock className="h-7 w-7" />
        </IconCircle>
        <h1 className="mt-7 font-heading text-3xl text-navy">{title}</h1>
        <Rule className="mx-auto" />
        <p className="text-[0.98rem] leading-relaxed text-charcoal/75">{body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="navy">
            Contact support <Arrow />
          </ButtonLink>
          <ButtonLink href="/faq#access-delivery" variant="outline">
            Access FAQ
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Problem
        title="No access link provided"
        body="Open the link from your order confirmation email. If you cannot find it, contact us from the address you used at purchase and we will reissue it."
      />
    );
  }

  const result = verifyAccessToken(token);

  if (!result.ok) {
    return result.reason === "expired" ? (
      <Problem
        title="This access link has expired"
        body="Access links are time-limited for security. Email us from the address you used at purchase, quoting your order reference, and we will issue a fresh one straight away."
      />
    ) : (
      <Problem
        title="This access link is not valid"
        body="The link may have been altered or copied incompletely. Please open it directly from your confirmation email, or contact us and we will reissue it."
      />
    );
  }

  const { claims } = result;

  if (await isRevoked(claims.orderId)) {
    return (
      <Problem
        title="Access for this order has been withdrawn"
        body="This usually follows a refund or a licence issue. If you believe this is a mistake, contact us and we will investigate promptly and restore access if we got it wrong."
      />
    );
  }

  const product = getProductBySku(claims.sku);

  if (!product) {
    return (
      <Problem
        title="We could not match this to a product"
        body="Please contact us with your order reference and we will resolve it."
      />
    );
  }

  return (
    <>
      <section className="bg-navy">
        <div className="mx-auto w-full max-w-[76rem] px-[var(--shell-x)]">
          <div className="max-w-2xl pt-28 pb-14 sm:pt-32 sm:pb-16">
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-goldink">
              Your access
            </p>
            <h1 className="font-heading text-3xl leading-tight text-white sm:text-4xl">
              {product.trademarkedName}
            </h1>
            <Rule />
            <p className="text-[0.98rem] leading-relaxed text-white/75">
              Licensed to <strong className="text-white">{claims.email}</strong>
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/45">
              Order reference: {claims.orderId}
            </p>
          </div>
        </div>
      </section>

      <Section tone="ivory">
        <div className="mx-auto max-w-3xl">
          <Card tone="white" className="p-8 sm:p-10">
            <h2 className="font-heading text-xl text-navy">Your files</h2>
            <Rule className="my-5" />

            <ul className="divide-y divide-ivory-200 border-y border-ivory-200">
              {product.assets.map((asset) => (
                <li
                  key={asset.file}
                  className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <IconCircle size="sm">
                      <IconProduct className="h-5 w-5" />
                    </IconCircle>
                    <div>
                      <p className="text-[0.95rem] font-medium text-navy">{asset.label}</p>
                      <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-charcoal/45">
                        PDF
                      </p>
                    </div>
                  </div>
                  <a
                    href={`/api/deliver/${encodeURIComponent(asset.file)}?token=${encodeURIComponent(token)}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 border border-navy bg-navy px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-navy-700"
                  >
                    Download <Arrow />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-l-2 border-gold bg-ivory px-5 py-4">
              <p className="text-[0.92rem] leading-relaxed text-charcoal/85">
                {product.protection === "strong" ? (
                  <>
                    This access is licensed to you personally and your copy is identifiable.
                    It is for your own use and may not be shared, redistributed or used with
                    clients.{" "}
                    <Link
                      href="/corporate-experiences#licensing"
                      className="text-goldink underline underline-offset-2"
                    >
                      Corporate licences
                    </Link>{" "}
                    are available if your team needs access.
                  </>
                ) : (
                  <>
                    Your copy is personalised to you. Print it for your own use, or open it
                    on a tablet and work through it with a stylus. Please do not share or
                    redistribute it &mdash; see the{" "}
                    <Link
                      href="/licence-terms"
                      className="text-goldink underline underline-offset-2"
                    >
                      Licence Terms
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>

            {drmActive() ? null : (
              <p className="mt-5 text-xs leading-relaxed text-charcoal/50">
                Keep this link private. It is unique to your order and grants access to your
                purchase.
              </p>
            )}
          </Card>

          <Card tone="white" className="mt-8 p-8">
            <h2 className="font-heading text-lg text-navy">Need help?</h2>
            <p className="mt-3 text-[0.93rem] leading-relaxed text-charcoal/75">
              {product.supportNote} Email{" "}
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-goldink underline underline-offset-2"
              >
                {site.supportEmail}
              </a>{" "}
              quoting order reference <strong>{claims.orderId}</strong> and we will help.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
