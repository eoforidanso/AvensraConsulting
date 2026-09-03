import Image from "next/image";

/**
 * Founder portrait.
 *
 * A linocut-style illustrated portrait rather than a photograph, which
 * suits the editorial feel of the rest of the site — the print texture
 * sits naturally against the paper ground and the bronze rule.
 *
 * The source image is monochrome on a warm cream almost identical to
 * --color-ivory, so it needs no cropping or treatment to sit in the
 * palette. If it is ever replaced with a photograph, keep the 4:5
 * portrait ratio and this component needs no other change.
 */
export function FounderPortrait({
  className = "",
  alt,
}: {
  className?: string;
  alt: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/founder.png"
        alt={alt}
        width={900}
        height={1150}
        // Above the fold on /about at desktop widths, so it should not
        // wait for lazy-loading to start fetching.
        priority
        sizes="(min-width: 1024px) 22rem, 100vw"
        className="h-auto w-full"
      />

      {/* Bronze corner rule, matching the card treatment used site-wide */}
      <span
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-gold"
      />
    </div>
  );
}
