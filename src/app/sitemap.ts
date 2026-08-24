import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products } from "@/content/products";

/**
 * Sitemap. Transactional and private routes (/order, /access, /admin) are
 * excluded deliberately — they are also noindex at the page level.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; frequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, frequency: "weekly" },
    { path: "/about", priority: 0.8, frequency: "monthly" },
    { path: "/consulting", priority: 0.8, frequency: "monthly" },
    { path: "/digital-products", priority: 0.9, frequency: "weekly" },
    ...products.map((product) => ({
      path: product.href,
      priority: 0.9,
      frequency: "weekly" as const,
    })),
    { path: "/corporate-experiences", priority: 0.9, frequency: "monthly" },
    { path: "/contact", priority: 0.7, frequency: "monthly" },
    { path: "/faq", priority: 0.7, frequency: "monthly" },
    { path: "/feedback", priority: 0.4, frequency: "yearly" },
    { path: "/privacy-policy", priority: 0.3, frequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.3, frequency: "yearly" },
    { path: "/refund-policy", priority: 0.4, frequency: "yearly" },
    { path: "/licence-terms", priority: 0.4, frequency: "yearly" },
  ];

  return pages.map(({ path, priority, frequency }) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: frequency,
    priority,
  }));
}
