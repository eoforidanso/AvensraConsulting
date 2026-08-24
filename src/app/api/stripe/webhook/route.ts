import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { fulfilOrder } from "@/lib/fulfilment";
import { getLicensingProvider } from "@/lib/licensing";
import { append, findById } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook — the only place an order is ever marked paid.
 *
 * The raw body is verified against STRIPE_WEBHOOK_SECRET before anything is
 * read from it, so a forged request cannot trigger fulfilment.
 */
export async function POST(request: Request) {
  if (!env.stripeWebhookSecret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const raw = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe().webhooks.constructEventAsync(
      raw,
      signature,
      env.stripeWebhookSecret,
    );
  } catch (error) {
    console.error("[webhook] signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await onCheckoutCompleted(event.data.object);
        break;
      case "charge.refunded":
        await onChargeRefunded(event.data.object);
        break;
      default:
        // Unhandled event types are acknowledged so Stripe stops retrying.
        break;
    }
  } catch (error) {
    // A 500 tells Stripe to retry; fulfilment is idempotent so that is safe.
    console.error(`[webhook] handling ${event.type} failed`, error);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function onCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    console.info(`[webhook] session ${session.id} not paid — ignoring`);
    return;
  }

  const sku = session.metadata?.sku;
  if (!sku) throw new Error(`Session ${session.id} has no SKU metadata`);

  const email =
    session.customer_details?.email ?? session.customer_email ?? undefined;
  if (!email) throw new Error(`Session ${session.id} has no customer email`);

  await fulfilOrder({
    orderId: session.id,
    sessionId: session.id,
    paymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? null),
    customerName: session.customer_details?.name ?? "Customer",
    customerEmail: email,
    sku,
    amountTotal: session.amount_total ?? 0,
    currency: session.currency ?? "usd",
    country: session.customer_details?.address?.country ?? null,
  });
}

/**
 * Refund administration: a full refund revokes the customer's access through
 * whichever licensing provider issued it, and is recorded against the order.
 */
async function onChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent?.id;
  if (!paymentIntentId) return;

  const sessions = await stripe().checkout.sessions.list({
    payment_intent: paymentIntentId,
    limit: 1,
  });
  const orderId = sessions.data[0]?.id;
  if (!orderId) {
    console.warn(`[webhook] no session found for refunded intent ${paymentIntentId}`);
    return;
  }

  const order = await findById("orders", orderId);
  const fullyRefunded = charge.amount_refunded >= charge.amount;

  if (fullyRefunded && order?.licenceId) {
    try {
      await getLicensingProvider().revokeLicence(String(order.licenceId));
    } catch (error) {
      // Never fail the webhook on revocation — it is followed up manually.
      console.error(`[webhook] revoke failed for ${order.licenceId}`, error);
    }
  }

  await append("orders", {
    id: `refund_${charge.id}`,
    orderId,
    type: "refund",
    amountRefunded: charge.amount_refunded,
    currency: charge.currency,
    fullyRefunded,
    accessRevoked: fullyRefunded,
    status: fullyRefunded ? "refunded" : "partially-refunded",
  });
}
