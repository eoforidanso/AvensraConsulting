import type { ReactNode } from "react";
import { Container, Rule } from "./ui";

/** Compact navy header used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {/* Corner mark, echoing the hero on the home page */}
      <svg
        className="pointer-events-none absolute -right-16 -top-10 h-[130%] w-auto opacity-[0.07]"
        viewBox="0 0 320 288"
        aria-hidden="true"
      >
        <path d="M160 20 L300 268 H262 L160 90 L58 268 H20 L160 20 Z" fill="#c1874c" />
        <path d="M160 128 L226 244 H196 L160 180 L124 244 H94 L160 128 Z" fill="#c1874c" />
      </svg>

      <Container className="relative">
        {/* Top padding clears the fixed header (80px mobile / 88px lg+),
            which floats over this section rather than pushing it down. */}
        <div className="max-w-3xl pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
          {eyebrow ? (
            <p className="hero-rise mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-goldink">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className="hero-rise text-3xl leading-[1.12] text-white sm:text-4xl lg:text-[3rem]"
            style={{ animationDelay: "70ms" }}
          >
            {title}
          </h1>
          {lead ? (
            <>
              <div className="hero-rise" style={{ animationDelay: "140ms" }}>
                <Rule />
              </div>
              <p
                className="hero-rise max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
                style={{ animationDelay: "140ms" }}
              >
                {lead}
              </p>
            </>
          ) : null}
          {children ? (
            <div className="hero-rise mt-9" style={{ animationDelay: "230ms" }}>
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
