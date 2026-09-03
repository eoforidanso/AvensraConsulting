"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Container, Arrow } from "./ui";
import { IconChevron } from "./icons";
import { primaryNav, type NavItem } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Route changes must always leave the menus closed.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Every page opens on a navy hero, so the bar starts blended into it and
  // only gains its own solid, blurred surface once content has scrolled
  // underneath — read via rAF so it never fights the browser's paint work.
  useEffect(() => {
    let ticking = false;
    const measure = () => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (item: NavItem) =>
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href) ||
        (item.children?.some((c) => pathname === c.href.split("#")[0]) ?? false);

  const openWithDelay = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-[var(--ease-glide)] ${
        scrolled || mobileOpen
          ? "border-b border-white/10 bg-navy/90 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          : "border-b border-transparent bg-navy/40 backdrop-blur-md"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>

      <Container>
        <div className="flex h-20 items-center justify-between gap-6 lg:h-[5.5rem]">
          <Logo tone="light" className="shrink-0" />

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex xl:gap-2"
          >
            {primaryNav.map((item) => {
              const active = isActive(item);
              const hasChildren = Boolean(item.children?.length);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && openWithDelay(item.label)}
                  onMouseLeave={() => hasChildren && closeWithDelay()}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={hasChildren ? openMenu === item.label : undefined}
                    onClick={() => setOpenMenu(null)}
                    className={`flex items-center gap-1.5 whitespace-nowrap px-2.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.11em] transition-colors xl:px-3.5 xl:text-[0.7rem] xl:tracking-[0.13em] ${
                      active ? "text-goldink" : "text-white/85 hover:text-goldink"
                    }`}
                  >
                    {item.label}
                    {hasChildren ? (
                      <IconChevron
                        className={`mt-px transition-transform duration-200 ${
                          openMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    ) : null}
                  </Link>

                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />

                  {hasChildren ? (
                    <div
                      className={`absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300 ease-[var(--ease-glide)] ${
                        openMenu === item.label
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1.5 opacity-0"
                      }`}
                    >
                      <div className="border border-ivory-200 bg-white p-2 shadow-[0_18px_50px_-12px_rgba(9,19,32,0.35)]">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group block px-4 py-3 transition-colors hover:bg-ivory"
                          >
                            <span className="block text-sm font-semibold text-navy group-hover:text-goldink">
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className="mt-1 block text-xs leading-relaxed text-charcoal/65">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}

            <Link
              href="/contact"
              className="ml-3 inline-flex shrink-0 items-center gap-2 whitespace-nowrap bg-gold px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-400 xl:px-6 xl:text-[0.68rem] xl:tracking-[0.14em]"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-white lg:hidden"
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              {mobileOpen ? (
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 7h18M3 12h18M3 17h18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile sheet — always mounted so the collapse can animate; a CSS
          grid-rows trick handles unknown content height without measuring. */}
      <div
        id="mobile-nav"
        aria-hidden={!mobileOpen}
        className={`grid overflow-hidden border-t border-white/10 bg-navy transition-[grid-template-rows] duration-[400ms] ease-[var(--ease-glide)] lg:hidden ${
          mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="max-h-[calc(100dvh-5rem)] min-h-0 overflow-y-auto">
          <Container>
            <nav aria-label="Mobile" className="flex flex-col py-4">
              {primaryNav.map((item) => (
                <div key={item.label} className="border-b border-white/10 last:border-0">
                  <Link
                    href={item.href}
                    className={`block py-4 text-sm font-medium uppercase tracking-[0.13em] ${
                      isActive(item) ? "text-goldink" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <div className="-mt-1 flex flex-col gap-3 pb-4 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-sm leading-snug text-white/70 hover:text-goldink"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              <Link
                href="/contact"
                className="mt-6 mb-4 inline-flex items-center justify-center gap-2 bg-gold px-6 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-navy transition-transform duration-300 ease-[var(--ease-glide)] active:scale-[0.98]"
              >
                Contact Us <Arrow />
              </Link>
            </nav>
          </Container>
        </div>
      </div>
    </header>
  );
}
