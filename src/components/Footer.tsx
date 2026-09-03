import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { IconMail, IconLinkedIn, IconGlobe } from "./icons";
import { site, footerNav } from "@/lib/site";

/**
 * Footer.
 *
 * Mobile stacks to a single centred column; from `sm` up it becomes the
 * left-aligned multi-column layout on the artwork sheet. Link padding is
 * sized so every tap target clears ~40px on touch devices.
 */
function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-goldink">
        {title}
      </h3>
      <ul className="mt-4 space-y-0 sm:mt-5 sm:space-y-1.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="inline-block py-2.5 text-sm leading-relaxed text-charcoal/75 transition-colors hover:text-goldink sm:py-0.5"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConnectLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="flex items-center gap-3 py-1.5 text-sm text-charcoal/75 transition-colors hover:text-goldink"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-goldink">
        {icon}
      </span>
      {label}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ivory-200 bg-ivory">
      <Container>
        <div className="grid gap-10 py-12 text-center sm:grid-cols-2 sm:gap-12 sm:text-left lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10 lg:py-16">
          <div className="flex flex-col items-center sm:items-start">
            <Logo tone="dark" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-charcoal/70">
              {site.description}
            </p>
          </div>

          <Column title="Quick Links" links={footerNav.quickLinks} />
          <Column title="Solutions" links={footerNav.solutions} />

          <div>
            <h3 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-goldink">
              Connect
            </h3>
            <ul className="mt-4 inline-flex flex-col gap-2 text-left sm:mt-5 sm:flex sm:gap-3">
              <li>
                <ConnectLink
                  href={`mailto:${site.email}`}
                  icon={<IconMail className="h-4 w-4" />}
                  label={site.email}
                />
              </li>
              <li>
                <ConnectLink
                  href={site.linkedin}
                  icon={<IconLinkedIn className="h-4 w-4" />}
                  label="LinkedIn"
                  external
                />
              </li>
              <li>
                <ConnectLink
                  href={site.url}
                  icon={<IconGlobe className="h-4 w-4" />}
                  label={site.url.replace(/^https?:\/\//, "")}
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-ivory-200 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-7 sm:text-left">
          <p className="text-xs text-charcoal/60">
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-0 sm:justify-end sm:gap-x-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-2.5 text-xs text-charcoal/60 transition-colors hover:text-goldink sm:py-0"
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
