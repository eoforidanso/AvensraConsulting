import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { getProduct, formatUsd } from "@/content/products";
import { env, commerceEnabled } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  slug: z.string().min(1).max(120),
});

/**
 * Creates a Stripe Checkout session for a single digital product.
 *
 * Card data never touches this application — the customer is redirected to
 * Stripe's hosted checkout, which handles PCI scope, 3-D Secure and
 * international card support.
 */
export async function POST(request: Request) {
  if (!commerceEnabled) {
    return NextResponse.json(
      { error: "Checkout is not yet configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const product = getProduct(parsed.data.slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  // A configured Stripe Price is preferred: it keeps Stripe as the source of
  // commercial truth and lets Emmanus Plus change prices from the dashboard.
  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem[] = product.stripePriceId
    ? [{ price: product.stripePriceId, quantity: 1 }]
    : [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: product.priceUsd,
            product_data: {
              name: product.trademarkedName,
              description: product.tagline,
            },
          },
        },
      ];

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItem,
      // The SKU travels with the payment so the webhook knows what to fulfil.
      metadata: { sku: product.sku, slug: product.slug },
      payment_intent_data: {
        metadata: { sku: product.sku },
        description: `${product.trademarkedName} — ${formatUsd(product.priceUsd)}`,
      },
      customer_creation: "always",
      billing_address_collection: "required",
      phone_number_collection: { enabled: false },
      allow_promotion_codes: true,
      consent_collection: { terms_of_service: "required" },
      custom_text: {
        terms_of_service_acceptance: {
          message: `I agree to the Emmanus Plus [Terms & Conditions](${env.siteUrl}/terms-and-conditions), [Refund Policy](${env.siteUrl}/refund-policy) and [Digital Product Licence](${env.siteUrl}/licence-terms).`,
        },
      },
      success_url: `${env.siteUrl}/order/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.siteUrl}${product.href}?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] failed", error);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 },
    );
  }
}
