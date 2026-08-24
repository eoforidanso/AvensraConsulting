/**
 * Product visuals.
 *
 * The artwork shows photographic mockups (a bound system with tablet, and a
 * printed reflection book). Those renders were not supplied, so these vector
 * stand-ins hold the same silhouette and weight. Replace with the supplied
 * mockup images in /public/products/ when they are available.
 */
type Props = { className?: string };

export function AlignmentSystemVisual({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      role="img"
      aria-label="The Business-to-People Alignment System, shown as a bound volume with a companion tablet"
    >
      <defs>
        <linearGradient id="bpasCover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16294a" />
          <stop offset="100%" stopColor="#0d1b33" />
        </linearGradient>
        <linearGradient id="bpasScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f5f2ee" />
        </linearGradient>
      </defs>

      {/* Tablet behind */}
      <g transform="translate(150 34)">
        <rect width="150" height="168" rx="5" fill="#1b1f24" />
        <rect x="6" y="6" width="138" height="156" rx="2" fill="url(#bpasScreen)" />
        <rect x="18" y="20" width="62" height="4" fill="#c79a44" />
        <rect x="18" y="34" width="106" height="3" fill="#0d1b33" opacity="0.25" />
        <rect x="18" y="43" width="94" height="3" fill="#0d1b33" opacity="0.25" />
        <rect x="18" y="58" width="48" height="34" fill="#0d1b33" opacity="0.09" />
        <rect x="74" y="58" width="48" height="34" fill="#c79a44" opacity="0.16" />
        <rect x="18" y="102" width="104" height="3" fill="#0d1b33" opacity="0.22" />
        <rect x="18" y="111" width="86" height="3" fill="#0d1b33" opacity="0.22" />
        <rect x="18" y="120" width="96" height="3" fill="#0d1b33" opacity="0.22" />
        <rect x="18" y="136" width="52" height="10" fill="#c79a44" />
      </g>

      {/* Bound volume in front */}
      <g transform="translate(18 22)">
        <rect x="4" y="8" width="132" height="182" rx="3" fill="#0d1b33" opacity="0.28" />
        <rect width="132" height="182" rx="3" fill="url(#bpasCover)" />
        <rect x="0" y="0" width="9" height="182" fill="#c79a44" opacity="0.85" />
        <g transform="translate(30 40)">
          <path d="M36 6 L66 60 H54 L36 27 L18 60 H6 L36 6 Z" fill="#c79a44" opacity="0.9" />
          <circle cx="19" cy="50" r="4" fill="#c79a44" />
        </g>
        <rect x="30" y="118" width="72" height="3" fill="#ffffff" opacity="0.85" />
        <rect x="30" y="128" width="52" height="2.5" fill="#c79a44" />
        <rect x="30" y="150" width="72" height="2" fill="#ffffff" opacity="0.35" />
      </g>
    </svg>
  );
}

export function ExecutiveResetVisual({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      role="img"
      aria-label="The Executive Reset, shown as a printed reflection book beside a tablet and stylus"
    >
      <defs>
        <linearGradient id="terPaper" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#efe9e1" />
        </linearGradient>
      </defs>

      {/* Tablet + stylus behind */}
      <g transform="translate(168 40)">
        <rect width="134" height="156" rx="5" fill="#1b1f24" />
        <rect x="6" y="6" width="122" height="144" rx="2" fill="#ffffff" />
        <g stroke="#0d1b33" strokeOpacity="0.35" strokeWidth="1.1" fill="none">
          <circle cx="67" cy="60" r="30" />
          <circle cx="67" cy="60" r="20" />
          <path d="M67 30v60M37 60h60M46 39l42 42M88 39L46 81" />
        </g>
        <path d="M52 108h30M46 118h42M56 128h22" stroke="#c79a44" strokeWidth="2" strokeLinecap="round" />
        <rect x="118" y="150" width="6" height="58" rx="3" transform="rotate(22 118 150)" fill="#c79a44" />
      </g>

      {/* Printed book in front */}
      <g transform="translate(16 26)">
        <rect x="5" y="9" width="150" height="176" rx="2" fill="#0d1b33" opacity="0.16" />
        <rect width="150" height="176" rx="2" fill="url(#terPaper)" stroke="#ebe6df" />
        <rect x="0" y="0" width="150" height="7" fill="#c79a44" />
        <text
          x="75"
          y="42"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="15"
          fill="#0d1b33"
        >
          The Executive
        </text>
        <text
          x="75"
          y="60"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="15"
          fill="#0d1b33"
        >
          Reset
        </text>
        <g stroke="#0d1b33" strokeOpacity="0.4" strokeWidth="1" fill="none">
          <path d="M40 88c14-18 34-18 46 0s26 20 30 2" />
          <circle cx="75" cy="118" r="26" />
          <path d="M49 118h52M75 92v52" />
          <path d="M57 100l36 36M93 100l-36 36" />
        </g>
        <path
          d="M34 158h82"
          stroke="#c79a44"
          strokeWidth="1.4"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function ProductVisual({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return slug === "the-executive-reset" ? (
    <ExecutiveResetVisual className={className} />
  ) : (
    <AlignmentSystemVisual className={className} />
  );
}
