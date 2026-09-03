import type { Metadata } from "next";
import { Section, Card } from "@/components/ui";
import { AdminLogin, AdminExports } from "@/components/AdminPanel";
import { isAdmin, adminConfigured } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

/**
 * Export screen for Emmanus Plus.
 *
 * Deliberately minimal: the brief rules out a custom admin dashboard, and
 * Stripe's own dashboard already administers orders, refunds and customers.
 * This page exists only for the form submissions the platform itself holds.
 */
export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <Section tone="ivory" size="tall">
        <Card tone="white" className="mx-auto max-w-md p-8">
          <h1 className="font-heading text-2xl text-navy">Admin not configured</h1>
          <p className="mt-4 text-[0.92rem] leading-relaxed text-charcoal/75">
            Set <code className="bg-ivory px-1.5 py-0.5 text-sm">ADMIN_PASSWORD</code> in
            the environment to enable this screen.
          </p>
        </Card>
      </Section>
    );
  }

  return (
    <Section tone="ivory" size="tall">
      {(await isAdmin()) ? <AdminExports /> : <AdminLogin />}
    </Section>
  );
}
