/**
 * Post-payment fulfilment: record the order, issue the licence through the
 * active DRM provider, and email the customer their access.
 *
 * Called only from the verified Stripe webhook. Written to be idempotent —
 * Stripe retries webhooks, and a customer must never receive two licences
 * for one payment.
 */
import { getProductBySku, formatUsd, type Product } from "@/content/products";
import { getLicensingProvider, type IssuedLicence } from "@/lib/licensing";
import { append, findById } from "@/lib/store";
import { sendMail, emailShell, button, p, small } from "@/lib/mail";
import { esc } from "@/lib/escape";
import { env } from "@/lib/env";
import { site } from "@/lib/site";

export type OrderInput = {
  orderId: string;
  sessionId: string;
  paymentIntentId: string | null;
  customerName: string;
  customerEmail: string;
  sku: string;
  amountTotal: number;
  currency: string;
  country: string | null;
};

export async function fulfilOrder(input: OrderInput) {
  // Idempotency: Stripe's session id is the order id, so a retry finds the
  // existing record and stops before issuing a second licence.
  const existing = await findById("orders", input.orderId);
  if (existing) {
    console.info(`[fulfil] order ${input.orderId} already fulfilled — skipping`);
    return { alreadyFulfilled: true as const };
  }

  const product = getProductBySku(input.sku);
  if (!product) {
    throw new Error(`Unknown SKU on order ${input.orderId}: ${input.sku}`);
  }

  const provider = getLicensingProvider();
  const licence = await provider.issueLicence({
    orderId: input.orderId,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    productSku: product.sku,
    productName: product.trademarkedName,
    protection: product.protection,
    assets: product.assets.map((a) => ({ label: a.label, file: a.file })),
  });

  await append("orders", {
    id: input.orderId,
    ...input,
    productName: product.trademarkedName,
    protection: product.protection,
    licenceProvider: licence.provider,
    licenceId: licence.licenceId,
    accessUrl: licence.accessUrl,
    status: "fulfilled",
  });

  await sendMail({
    to: input.customerEmail,
    subject: `Your access to ${product.trademarkedName}`,
    html: customerEmail(product, input, licence),
  });

  await sendMail({
    to: env.mailTo,
    subject: `New order — ${product.trademarkedName} (${input.orderId})`,
    html: adminEmail(product, input, licence),
  });

  return { alreadyFulfilled: false as const, licence };
}

function customerEmail(
  product: Product,
  order: OrderInput,
  licence: IssuedLicence,
): string {
  const firstName = esc(order.customerName.split(" ")[0] || "there");

  const activation = licence.activationCode
    ? p(
        `Your licence activation code is <strong style="font-family:monospace;letter-spacing:0.08em;">${esc(
          licence.activationCode,
        )}</strong>. You will be asked for this the first time you open the material.`,
      )
    : "";

  const viewer = licence.viewerUrl
    ? p(
        `This product opens in a secure viewer. If you do not already have it installed, <a href="${esc(
          licence.viewerUrl,
        )}" style="color:#c1874c;">download the viewer here</a> first.`,
      )
    : "";

  const usage = product.protection === "strong"
    ? small(
        "Your licence is unique to you and your copy is identifiable. It is for your own use — it may not be shared, redistributed or used with clients under this licence. Corporate and facilitator licences are available if you need wider access.",
      )
    : small(
        "Your copy is personalised to you and is yours to keep. Print it for your own use or open it on a tablet and work through it with a stylus. Please do not share or redistribute it.",
      );

  return emailShell(
    "Your purchase is ready",
    [
      p(`Hello ${firstName},`),
      p(
        `Thank you for your purchase of <strong>${esc(
          product.trademarkedName,
        )}</strong>. Your access has been issued and is ready now.`,
      ),
      button(licence.accessUrl, "Access your purchase"),
      activation,
      viewer,
      p(
        `<strong>Order reference:</strong> ${esc(order.orderId)}<br>` +
          `<strong>Amount paid:</strong> ${esc(formatUsd(order.amountTotal))} ${esc(
            order.currency.toUpperCase(),
          )}`,
      ),
      usage,
      small(
        `${esc(product.supportNote)} Reply to this email or write to ${esc(
          site.supportEmail,
        )} quoting your order reference and we will help.`,
      ),
    ].join(""),
  );
}

function adminEmail(
  product: Product,
  order: OrderInput,
  licence: IssuedLicence,
): string {
  return emailShell(
    "New order received",
    [
      p(
        `<strong>Product:</strong> ${esc(product.trademarkedName)}<br>` +
          `<strong>Customer:</strong> ${esc(order.customerName)}<br>` +
          `<strong>Email:</strong> ${esc(order.customerEmail)}<br>` +
          `<strong>Amount:</strong> ${esc(formatUsd(order.amountTotal))} ${esc(
            order.currency.toUpperCase(),
          )}<br>` +
          `<strong>Country:</strong> ${esc(order.country ?? "—")}<br>` +
          `<strong>Order reference:</strong> ${esc(order.orderId)}<br>` +
          `<strong>Payment intent:</strong> ${esc(order.paymentIntentId ?? "—")}<br>` +
          `<strong>Licence provider:</strong> ${esc(licence.provider)}<br>` +
          `<strong>Licence ID:</strong> ${esc(licence.licenceId)}`,
      ),
      small("Recorded automatically. View all orders in the Emmanus Plus admin export."),
    ].join(""),
  );
}
