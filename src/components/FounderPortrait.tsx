/**
 * Founder portrait placeholder.
 *
 * NOTE FOR HANDOVER: no photograph of Nana Ama Setorwofia was supplied.
 * This is a brand-consistent monogram standing in for one, so the About
 * page is complete and reviewable.
 *
 * To use the real photograph: drop it in /public/founder.jpg and replace
 * this component's <svg> with next/image, keeping the same square aspect
 * ratio and the gold corner rule. Nothing else on the page changes.
 */
export function FounderPortrait({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="h-auto w-full"
        role="img"
        aria-label="Nana Ama Setorwofia, Founder and Principal Consultant of Avensra Consulting"
      >
        <defs>
          <linearGradient id="founderBg" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#142438" />
            <stop offset="100%" stopColor="#091320" />
          </linearGradient>
        </defs>

        <rect width="400" height="400" fill="url(#founderBg)" />

        {/* Oversized brand mark, echoing the hero treatment */}
        <g opacity="0.09" transform="translate(150 40) scale(0.95)">
          <path d="M160 20 L300 268 H262 L160 90 L58 268 H20 L160 20 Z" fill="#c1874c" />
        </g>

        <text
          x="200"
          y="212"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="88"
          letterSpacing="6"
          fill="#c1874c"
        >
          NA
        </text>
        <rect x="170" y="240" width="60" height="1.5" fill="#c1874c" opacity="0.8" />
        <text
          x="200"
          y="272"
          textAnchor="middle"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="11"
          letterSpacing="4"
          fill="#ffffff"
          opacity="0.6"
        >
          FOUNDER
        </text>
      </svg>

      {/* Gold corner rule, matching the card treatment used site-wide */}
      <span
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-gold"
      />
    </div>
  );
}
