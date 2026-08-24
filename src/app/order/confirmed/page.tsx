import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Card, ButtonLink, IconCircle, Arrow, Rule } from "@/components/ui";
import { IconMail, IconLock, IconClock } from "@/components/icons";
import { ConversionScript } from "@/components/Analytics";
import { stripe } from "@/lib/stripe";
import { commerceEnabled } from "@/lib/env";
import { getProductBySku, formatUsd } from "@/content/products";
import { findById } from "@/lib/store";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Avensra purchase is confirmed and your access has been issued.",
  robots: { index: false, follow: false },
};

// Always fetched fresh — this page reflects a specific, just-completed payment.
export const dynamic = "force-dynamic";

type Summary = {
  ok: boolean;
  name?: string;
  email?: string;
  sku?: string;
  amount?: number;
  currency?: string;
  orderId?: string;
  accessUrl?: string;
};

async function loadOrder(sessionId: string | undefined): Promise<Summary> {
  if (!sessionId || !commerceEnabled) return { ok: false };

  try {
    const session = await stripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return { ok: false };

    // The webhook is the system of record. It usually lands before the
    // customer returns, but not always — the page works either way.
    const order = await findById("orders", session.id);

    return {
      ok: true,
      name: session.customer_details?.name ?? undefined,
      email: session.customer_details?.email ?? undefined,
      sku: session.metadata?.sku,
      amount: session.amount_total ?? 0,
      currency: session.currency ?? "usd",
      orderId: session.id,
      accessUrl: order?.accessUrl ? String(order.accessUrl) : undefined,
    };
  } catch (error) {
    console.error("[order/confirmed] could not retrieve session", error);
    return { ok: false };
  }
}

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const order = await loadOrder(sessionId);
  const product = order.sku ? getProductBySku(order.sku) : undefined;

  if (!order.ok) {
    return (
      <Section tone="ivory" size="tall">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-heading text-3xl text-navy">We could not find that order</h1>
          <Rule className="mx-auto" />
          <p className="text-[0.98rem] leading-relaxed text-charcoal/75">
            The link may have expired, or the payment may not have completed. If you have
            been charged, your confirmation email will contain your access.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="navy">
              Contact support <Arrow />
            </ButtonLink>
            <ButtonLink href="/digital-products" variant="outline">
              Back to products
            </ButtonLink>
          </div>
        </div>
      </Section>
    );
  }

  const firstName = order.name?.split(" ")[0];

  return (
    <>
      <ConversionScript
        event="purchase"
        value={(order.amount ?? 0) / 100}
        currency={(order.currency ?? "usd").toUpperCase()}
        id={order.orderId}
      />

      <section className="bg-navy">
        <Container>
          <div className="mx-auto max-w-2xl py-16 text-center sm:py-20">
            <IconCircle className="mx-auto border-gold bg-gold/10">
              <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconCircle>

            <h1 className="mt-7 font-heading text-3xl leading-tight text-white sm:text-4xl">
              Thank you{firstName ? `, ${firstName}` : ""} &mdash; your order is confirmed
            </h1>
            <Rule className="mx-auto" />
            <p className="text-[0.98rem] leading-relaxed text-white/75">
              {product ? (
                <>
                  Your purchase of <strong className="text-white">{product.trademarkedName}</strong>{" "}
                  is complete and your access has been issued.
                </>
              ) : (
                "Your purchase is complete and your access has been issued."
              )}
            </p>

            {order.accessUrl ? (
              <div className="mt-9">
                <ButtonLink href={order.accessUrl} variant="gold" className="px-9 py-4">
                  Access your purchase <Arrow />
                </ButtonLink>
              </div>
            ) : (
              <p className="mt-9 border border-white/15 px-6 py-5 text-[0.93rem] leading-relaxed text-white/70">
                Your access is being issued now and will arrive by email within a few
                minutes. There is nothing more you need to do.
              </p>
            )}
          </div>
        </Container>
      </section>

      <Section tone="ivory">
        <div className="mx-auto max-w-3xl">
          <Card tone="white" className="p-8 sm:p-10">
            <h2 className="font-heading text-xl text-navy">Your order</h2>
            <Rule className="my-5" />
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ["Product", product?.trademarkedName ?? "—"],
                ["Order reference", order.orderId ?? "—"],
                [
                  "Amount paid",
                  `${formatUsd(order.amount ?? 0)} ${(order.currency ?? "usd").toUpperCase()}`,
                ],
                ["Sent to", order.email ?? "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-charcoal/50">
                    {label}
                  </dt>
                  <dd className="mt-1.5 break-words text-[0.93rem] text-charcoal/85">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 border-t border-ivory-200 pt-6 text-sm leading-relaxed text-charcoal/65">
              Keep your order reference. Quoting it lets us find your purchase immediately if
              you ever need support.
            </p>
          </Card>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div>
              <IconCircle size="sm">
                <IconMail className="h-5 w-5" />
              </IconCircle>
              <h3 className="mt-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.12em] text-navy">
                Check your email
              </h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-charcoal/70">
                Your confirmation and access details are on their way to{" "}
                {order.email ?? "your inbox"}. Check spam if it has not arrived.
              </p>
            </div>
            <div>
              <IconCircle size="sm">
                <IconLock className="h-5 w-5" />
              </IconCircle>
              <h3 className="mt-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.12em] text-navy">
                Your licence
              </h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-charcoal/70">
                Issued to you personally. Please keep your access link to yourself &mdash;
                see the{" "}
                <Link href="/licence-terms" className="text-gold underline underline-offset-2">
                  Licence Terms
                </Link>
                .
              </p>
            </div>
            <div>
              <IconCircle size="sm">
                <IconClock className="h-5 w-5" />
              </IconCircle>
              <h3 className="mt-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.12em] text-navy">
                Need help?
              </h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-charcoal/70">
                Email{" "}
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="text-gold underline underline-offset-2"
                >
                  {site.supportEmail}
                </a>{" "}
                with your order reference and we will sort it.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
