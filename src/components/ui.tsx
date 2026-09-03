import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------- Layout -------------------------------- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[76rem] px-[var(--shell-x)] ${className}`}>
      {children}
    </div>
  );
}

type SectionTone = "ivory" | "white" | "navy" | "charcoal";

// Grain on the dark tones only: a large flat dark fill is where a screen
// most obviously reads as a screen, and where the texture does the most
// work. Light sections already get variation from type and card edges.
const sectionTones: Record<SectionTone, string> = {
  ivory: "bg-ivory text-charcoal",
  white: "bg-white text-charcoal",
  navy: "grain bg-navy text-white",
  charcoal: "grain bg-charcoal text-white",
};

export function Section({
  children,
  tone = "ivory",
  className = "",
  id,
  size = "default",
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  id?: string;
  size?: "default" | "compact" | "tall";
}) {
  const pad =
    size === "compact"
      ? "py-12 sm:py-16"
      : size === "tall"
        // Every current use of "tall" is a top-of-page state (404, admin
        // login, order-not-found, access errors) sitting directly under the
        // fixed header — the extra top padding is clearance, not a design
        // choice that would need revisiting for a mid-page "tall" section.
        ? "pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-32"
        : "py-16 sm:py-20 lg:py-24";

  return (
    <section
      id={id}
      className={`${sectionTones[tone]} ${pad} ${className}`}
      // Anchored sections must not sit under the sticky header.
      style={id ? { scrollMarginTop: "6rem" } : undefined}
    >
      <Container>{children}</Container>
    </section>
  );
}

/* -------------------------------- Type --------------------------------- */

export function Eyebrow({
  children,
  tone = "gold",
  className = "",
}: {
  children: ReactNode;
  tone?: "gold" | "navy" | "white";
  className?: string;
}) {
  const color =
    tone === "gold" ? "text-goldink" : tone === "white" ? "text-white/70" : "text-navy/60";
  return (
    <p
      className={`text-[0.7rem] font-semibold tracking-[0.24em] uppercase ${color} ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "dark",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <Eyebrow tone={tone === "light" ? "gold" : "navy"} className="mb-4">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] ${
          tone === "light" ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <Rule className={align === "center" ? "mx-auto" : ""} />
      {lead ? (
        <p
          className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
            tone === "light" ? "text-white/75" : "text-charcoal/75"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Trademark mark for display headings.
 *
 * Playfair Display draws ™ at roughly 1.75x the width of a capital letter,
 * which reads as heavy and unrefined at hero sizes (48px+). This renders it
 * small and raised, the way it is set in editorial and luxury typography,
 * without changing the accessible text — screen readers still announce the
 * trademark because it stays a real ™ character in the DOM.
 *
 * Only worth using in large display type. At body size the default glyph is
 * already correctly proportioned, so leave those as plain &trade;.
 */
export function TM({ className = "" }: { className?: string }) {
  return (
    <span
      className={`align-super text-[0.32em] tracking-normal ${className}`}
      style={{ lineHeight: 1 }}
    >
      &trade;
    </span>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <span className={`my-6 block h-px w-16 bg-gold ${className}`} aria-hidden="true" />;
}

/* ------------------------------- Buttons -------------------------------- */

type ButtonVariant = "gold" | "navy" | "outline" | "outline-light" | "ghost";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold text-navy hover:bg-gold-400 border border-gold hover:border-gold-400 hover:shadow-[0_16px_30px_-14px_rgba(193,135,76,0.6)]",
  navy: "bg-navy text-white hover:bg-navy-700 border border-navy hover:border-navy-700 hover:shadow-[0_16px_30px_-14px_rgba(9,19,32,0.5)]",
  outline: "border border-navy/25 text-navy hover:border-gold hover:text-goldink bg-transparent",
  "outline-light":
    "border border-white/35 text-white hover:border-gold hover:text-goldink bg-transparent",
  ghost: "text-goldink hover:text-goldink border border-transparent px-0 hover:translate-y-0",
};

// A tasteful lift, not a bounce: buttons rise 2px on hover and settle back
// down faster than they rose, echoing how apple.com's controls respond.
const buttonBase =
  "inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-[var(--ease-glide)] hover:-translate-y-0.5 active:translate-y-0 active:duration-150 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 disabled:hover:shadow-none";

export function Button({
  variant = "gold",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button className={`${buttonBase} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "gold",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link href={href} className={`${buttonBase} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 12"
      className={`h-2.5 w-4 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 6h17M13 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inline text link with the gold arrow used throughout the artwork. */
export function LinkArrow({
  href,
  children,
  className = "",
  tone = "gold",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "gold" | "navy";
}) {
  return (
    <Link
      href={href}
      className={`group tap-expand inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ease-[var(--ease-glide)] ${
        tone === "gold" ? "text-goldink hover:text-goldink" : "text-navy hover:text-goldink"
      } ${className}`}
    >
      {children}
      <Arrow className="transition-transform duration-300 ease-[var(--ease-glide)] group-hover:translate-x-1.5" />
    </Link>
  );
}

/* -------------------------------- Cards --------------------------------- */

export function Card({
  children,
  className = "",
  tone = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "ivory" | "navy";
  id?: string;
}) {
  // Dark cards now sit on a real palette step (navy-800) with a palette
  // border rather than white-at-10%, which was what made stacked dark
  // surfaces read as one flat plane. Light cards get a whisper of the
  // warm-tinted lift shadow so they separate from the paper without a
  // heavy border doing the work.
  const tones = {
    white: "bg-white border-ivory-200 shadow-[var(--shadow-lift)]",
    ivory: "bg-ivory border-ivory-300",
    navy: "bg-navy-800 border-navy-600 text-white",
  };
  return (
    <div id={id} className={`border ${tones[tone]} ${className}`}>
      {children}
    </div>
  );
}

/** Gold circle enclosing a line icon — the artwork's signature motif. */
export function IconCircle({
  children,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
}) {
  const dims = size === "sm" ? "h-11 w-11" : "h-16 w-16";
  return (
    <span
      className={`inline-flex ${dims} shrink-0 items-center justify-center rounded-full border border-gold/45 text-goldink transition-[transform,border-color,background-color] duration-500 ease-[var(--ease-glide)] group-hover:-translate-y-0.5 group-hover:border-gold group-hover:bg-gold/10 ${className}`}
    >
      {children}
    </span>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 ${className}`} aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path
        d="M6 10.2l2.6 2.6L14.2 7.4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="mt-1 text-goldink" />
      <span className="text-[0.95rem] leading-relaxed">{children}</span>
    </li>
  );
}
