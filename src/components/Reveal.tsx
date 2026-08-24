"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/**
 * Scroll-triggered fade/rise, in the same spirit as apple.com's section
 * reveals — subtle, once per element, never re-triggered.
 *
 * Safety first: every render starts "visible". Content is only ever moved
 * to a hidden pre-state from an effect, and only when the element is
 * confirmed to be below the fold at mount time — so SSR output, no-JS
 * browsers, and the instant before hydration all show full content. Users
 * who prefer reduced motion never get the hidden state at all.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement | HTMLLIElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already in (or past) the viewport at mount — nothing to reveal.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    setHidden(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = {
    opacity: hidden ? 0 : 1,
    transform: hidden ? "translateY(28px)" : "translateY(0)",
    transition: `opacity 800ms var(--ease-glide) ${delay}ms, transform 800ms var(--ease-glide) ${delay}ms`,
  };

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Wraps a list of items in Reveal with an increasing stagger delay. */
export function RevealGroup({
  children,
  step = 90,
  className = "",
  itemClassName = "",
}: {
  children: ReactNode[];
  step?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
