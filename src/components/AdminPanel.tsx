"use client";

import { useState } from "react";
import { Button, Arrow, Card, Rule } from "@/components/ui";
import { Field, Input } from "@/components/forms/fields";

const collections = [
  {
    id: "feedback",
    title: "Feedback & testimonials",
    body: "Every feedback submission, including whether the person gave permission to publish and whether their name may be used.",
  },
  {
    id: "corporate",
    title: "Corporate enquiries",
    body: "Facilitated experience and corporate licence enquiries, with organisation, format, participant numbers and timing.",
  },
  {
    id: "contact",
    title: "Contact enquiries",
    body: "General enquiries and product support requests submitted through the contact form.",
  },
  {
    id: "orders",
    title: "Orders & access log",
    body: "Order records, licence issuance, refunds and download events. Stripe remains the system of record for payments.",
  },
];

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(undefined);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.reload();
      return;
    }
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setError(data.error ?? "Incorrect password.");
    setBusy(false);
  }

  return (
    <Card tone="white" className="mx-auto max-w-md p-8 sm:p-10">
      <h1 className="font-heading text-2xl text-navy">Avensra admin</h1>
      <Rule className="my-5" />
      <p className="mb-6 text-[0.92rem] leading-relaxed text-charcoal/70">
        Enter the admin password to download form submissions and order records.
      </p>

      <form onSubmit={onSubmit} className="space-y-5">
        <Field id="admin-password" label="Password" required>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        {error ? (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={busy} className="w-full">
          {busy ? "Checking…" : "Sign in"}
        </Button>
      </form>
    </Card>
  );
}

export function AdminExports() {
  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-navy">Exports</h1>
          <p className="mt-2 text-[0.93rem] text-charcoal/70">
            Each download is a CSV file that opens directly in Excel.
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="text-[0.7rem] font-semibold uppercase tracking-[0.13em] text-charcoal/60 underline underline-offset-4 hover:text-goldink"
        >
          Sign out
        </button>
      </div>

      <Rule className="my-7" />

      <ul className="space-y-5">
        {collections.map((collection) => (
          <li key={collection.id}>
            <Card tone="white" className="flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-xl text-navy">{collection.title}</h2>
                <p className="mt-2 max-w-lg text-[0.9rem] leading-relaxed text-charcoal/70">
                  {collection.body}
                </p>
              </div>
              <a
                href={`/api/admin/export?collection=${collection.id}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 border border-navy bg-navy px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-navy-700"
              >
                Download CSV <Arrow />
              </a>
            </Card>
          </li>
        ))}
      </ul>

      <Card tone="white" className="mt-8 p-7">
        <h2 className="font-heading text-lg text-navy">Where everything else is managed</h2>
        <ul className="mt-4 space-y-2.5 text-[0.9rem] leading-relaxed text-charcoal/75">
          <li>
            <strong className="text-navy">Payments, refunds, customers, receipts</strong> —
            the Stripe dashboard. Refunding there automatically revokes product access.
          </li>
          <li>
            <strong className="text-navy">Product licences and revocation</strong> — your
            DRM provider&rsquo;s console, once selected at UAT.
          </li>
          <li>
            <strong className="text-navy">Prices and product copy</strong> — Stripe for
            price, and the site content files for copy.
          </li>
          <li>
            <strong className="text-navy">Traffic and conversions</strong> — Google
            Analytics 4.
          </li>
        </ul>
      </Card>
    </div>
  );
}
