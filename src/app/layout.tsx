import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { site } from "@/lib/site";
import { env } from "@/lib/env";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "business to people alignment",
    "strategy and people alignment",
    "organisation design",
    "leadership alignment",
    "executive reset",
    "performance consulting",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  ...(env.searchConsoleToken
    ? { verification: { google: env.searchConsoleToken } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0d1b33",
  width: "device-width",
  initialScale: 1,
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  slogan: site.tagline,
  description: site.description,
  email: site.email,
  sameAs: [site.linkedin],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.supportEmail,
      availableLanguage: ["English"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          // Static, developer-authored structured data.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
