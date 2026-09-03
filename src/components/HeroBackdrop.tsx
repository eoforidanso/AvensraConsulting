/**
 * Hero backdrop.
 *
 * The artwork uses a photographic sunrise-over-mountains scene with the
 * Avensra mark set large behind it. No licensed photograph was supplied, so
 * this is a vector stand-in built from the brand palette that holds the same
 * composition and contrast. To use the real photograph: drop it in
 * /public/hero.jpg, render it with next/image behind this component's
 * gradient overlays, and delete the mountain paths.
 */
export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="#091320" />
            <stop offset="52%" stopColor="#142438" />
            <stop offset="100%" stopColor="#091320" />
          </linearGradient>
          {/* Two-part light source. A tight, bright core inside a much
              wider, weaker bloom reads as atmosphere; a single stop reads
              as a coloured circle. */}
          <radialGradient id="sun" cx="0.68" cy="0.5" r="0.2">
            <stop offset="0%" stopColor="#f0d8b8" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#e7c39b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c1874c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bloom" cx="0.68" cy="0.5" r="0.62">
            <stop offset="0%" stopColor="#c1874c" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#9c6a37" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#091320" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ridgeFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a4160" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#142438" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="ridgeNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#091320" />
            <stop offset="100%" stopColor="#060d16" />
          </linearGradient>
          <linearGradient id="veil" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#091320" stopOpacity="0.97" />
            <stop offset="46%" stopColor="#091320" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#091320" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <rect width="1440" height="620" fill="url(#sky)" />
        {/* Wide bloom first, then the tight core on top of it. */}
        <rect width="1440" height="620" fill="url(#bloom)" />
        <rect width="1440" height="620" fill="url(#sun)" />

        {/* Distant ridge line, catching the light */}
        <path
          d="M0 470 L150 392 L268 438 L402 330 L520 400 L646 296 L792 392 L910 340 L1058 412 L1190 344 L1310 404 L1440 352 L1440 620 L0 620 Z"
          fill="url(#ridgeFar)"
        />
        {/* Sunlit edge along the summit */}
        <path
          d="M646 296 L792 392 L910 340 L1058 412"
          fill="none"
          stroke="#c1874c"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />

        {/* Near ridge, in shadow */}
        <path
          d="M0 560 L186 470 L340 528 L500 448 L664 534 L840 462 L1010 540 L1180 470 L1340 536 L1440 492 L1440 620 L0 620 Z"
          fill="url(#ridgeNear)"
        />

        {/* Oversized brand mark, as on the artwork sheet */}
        <g opacity="0.14" transform="translate(940 92) scale(1.42)">
          <path
            d="M160 20 L300 268 H262 L160 90 L58 268 H20 L160 20 Z"
            fill="#c1874c"
          />
          <path
            d="M160 128 L226 244 H196 L160 180 L124 244 H94 L160 128 Z"
            fill="#c1874c"
            opacity="0.65"
          />
        </g>

        {/* Readability veil behind the headline */}
        <rect width="1440" height="620" fill="url(#veil)" />
      </svg>
    </div>
  );
}
