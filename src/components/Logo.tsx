import Link from "next/link";

type Tone = "light" | "dark";

/**
 * Emmanus Plus wordmark.
 *
 * NOTE FOR HANDOVER: the artwork sheet says "use supplied logo files only —
 * do not alter, redraw, stretch or change proportions". This is a faithful
 * placeholder built to the artwork's proportions so the site is complete and
 * reviewable. Drop the supplied SVG into /public/logo-{light,dark}.svg and
 * swap `<Mark/>` for an <Image>; nothing else needs to change.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 56"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 4 58 52H46L32 25 18 52H6L32 4Z"
        fill="var(--color-gold)"
        opacity="0.95"
      />
      <path
        d="M32 18 45 42h-8l-5-9.5L27 42h-8L32 18Z"
        fill="var(--color-navy)"
        opacity="0.35"
      />
      <circle cx="20.5" cy="41" r="4.2" fill="var(--color-gold)" />
      <circle cx="20.5" cy="41" r="1.7" fill="var(--color-navy)" />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  href = "/",
  className = "",
}: {
  tone?: Tone;
  href?: string;
  className?: string;
}) {
  const wordColor = tone === "light" ? "text-white" : "text-navy";

  return (
    <Link
      href={href}
      className={`group flex shrink-0 items-center gap-3 ${className}`}
      aria-label="Emmanus Plus Consulting — home"
    >
      <Mark className="h-9 w-auto shrink-0 sm:h-10" />
      <span className="flex flex-col justify-center whitespace-nowrap">
        {/*
          Tracking is tuned to the length of the name, not fixed. At twelve
          characters, the 0.28em used for the previous seven-letter mark
          pushed the header past the viewport at 1280px and knocked the
          Contact Us button off-screen. This keeps the spaced, engraved feel
          while fitting the bar.
        */}
        <span
          className={`font-heading text-base leading-none tracking-[0.14em] sm:text-lg sm:tracking-[0.16em] xl:text-xl xl:tracking-[0.18em] ${wordColor}`}
        >
          EMMANUS PLUS
        </span>
        <span className="mt-1.5 flex items-center gap-1.5">
          <span className="h-px w-3 bg-gold" aria-hidden="true" />
          <span className="text-[0.5rem] leading-none tracking-[0.3em] text-goldink sm:text-[0.55rem]">
            CONSULTING
          </span>
          <span className="h-px w-3 bg-gold" aria-hidden="true" />
        </span>
        <span
          className={`mt-1 text-[0.42rem] leading-none tracking-[0.22em] sm:text-[0.47rem] ${
            tone === "light" ? "text-white/65" : "text-navy/60"
          }`}
        >
          STRATEGY. PEOPLE. PERFORMANCE.
        </span>
      </span>
    </Link>
  );
}
