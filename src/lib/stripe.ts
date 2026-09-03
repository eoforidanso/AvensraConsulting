import Stripe from "stripe";
import { env } from "./env";

let client: Stripe | null = null;

/** Lazily constructed so the site builds and renders without Stripe keys. */
export function stripe(): Stripe {
  if (!env.stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  client ??= new Stripe(env.stripeSecretKey, {
    appInfo: { name: "Emmanus Plus Consulting", version: "1.0.0" },
  });
  return client;
}
