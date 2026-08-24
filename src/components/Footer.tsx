import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { IconMail, IconLinkedIn, IconGlobe } from "./icons";
import { site, footerNav } from "@/lib/site";

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
        {title}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm leading-relaxed text-charcoal/75 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ivory-200 bg-ivory">
      <Container>
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10 lg:py-16">
          <div>
            <Logo tone="dark" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-charcoal/70">
              {site.description}
            </p>
          </div>

          <Column title="Quick Links" links={footerNav.quickLinks} />
          <Column title="Solutions" links={footerNav.solutions} />

          <div>
            <h3 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
              Connect
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 text-sm text-charcoal/75 transition-colors hover:text-gold"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <IconMail className="h-4 w-4" />
                  </span>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-3 text-sm text-charcoal/75 transition-colors hover:text-gold"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <IconLinkedIn className="h-4 w-4" />
                  </span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.url}
                  className="group flex items-center gap-3 text-sm text-charcoal/75 transition-colors hover:text-gold"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <IconGlobe className="h-4 w-4" />
                  </span>
                  {site.url.replace(/^https?:\/\//, "")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-ivory-200 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-charcoal/60">
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-charcoal/60 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
