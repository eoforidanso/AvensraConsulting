/**
 * Line icons drawn to a shared 24x24 grid with a 1.3 stroke, matching the
 * thin gold linework on the artwork sheet. All inherit currentColor.
 */
type IconProps = { className?: string };

const base = "h-6 w-6";
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className ?? ""}`} aria-hidden="true">
      {children}
    </svg>
  );
}

/** Compass — strategy that clarifies. */
export const IconStrategy = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" {...stroke} />
    <path d="M15.4 8.6l-2 4.8-4.8 2 2-4.8 4.8-2z" {...stroke} />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </Svg>
);

/** Three figures — people that deliver. */
export const IconPeople = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="12" cy="8" r="2.6" {...stroke} />
    <path d="M7.6 18.4a4.4 4.4 0 0 1 8.8 0" {...stroke} />
    <circle cx="5" cy="10" r="1.9" {...stroke} />
    <path d="M2 17.6a3.2 3.2 0 0 1 3.6-3.1" {...stroke} />
    <circle cx="19" cy="10" r="1.9" {...stroke} />
    <path d="M22 17.6a3.2 3.2 0 0 0-3.6-3.1" {...stroke} />
  </Svg>
);

/** Rising bars — performance that lasts. */
export const IconPerformance = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M3 20h18" {...stroke} />
    <path d="M6.5 20v-5M11 20v-8.5M15.5 20v-4M20 20v-11" {...stroke} />
    <path d="M5.5 9.5l4-3.5 4 2.5 5-5" {...stroke} />
  </Svg>
);

/** Framed page — digital products. */
export const IconProduct = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="4" y="3" width="16" height="18" {...stroke} />
    <path d="M8 3v18" {...stroke} />
    <path d="M11.5 8.5h5M11.5 12h5M11.5 15.5h3" {...stroke} />
  </Svg>
);

/** Shield — proven frameworks. */
export const IconShield = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 2.8l7 2.6v6c0 4.5-3 8.1-7 9.8-4-1.7-7-5.3-7-9.8v-6l7-2.6z" {...stroke} />
    <path d="M8.8 12l2.2 2.2 4.2-4.4" {...stroke} />
  </Svg>
);

/** Target — measurable impact. */
export const IconTarget = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" {...stroke} />
    <circle cx="12" cy="12" r="4.6" {...stroke} />
    <circle cx="12" cy="12" r="1.1" fill="currentColor" />
  </Svg>
);

/** Globe — global perspective. */
export const IconGlobe = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" {...stroke} />
    <path d="M3.5 12h17" {...stroke} />
    <ellipse cx="12" cy="12" rx="4" ry="8.5" {...stroke} />
  </Svg>
);

/** Toolkit — practical and applicable. */
export const IconTools = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="3" y="8" width="18" height="12" {...stroke} />
    <path d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8" {...stroke} />
    <path d="M3 13h18M10.5 13v2.2h3V13" {...stroke} />
  </Svg>
);

/** Clock — timed experiences. */
export const IconClock = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8.5" {...stroke} />
    <path d="M12 7v5.3l3.4 2" {...stroke} />
  </Svg>
);

/** Certificate — corporate licensing. */
export const IconLicence = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="4" y="3.5" width="16" height="13" {...stroke} />
    <path d="M7.5 7.5h9M7.5 11h5" {...stroke} />
    <circle cx="16" cy="17.5" r="2.6" {...stroke} />
    <path d="M14.3 19.6L13.6 23l2.4-1.3 2.4 1.3-.7-3.4" {...stroke} />
  </Svg>
);

/** Lock — secure delivery. */
export const IconLock = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="4.5" y="10" width="15" height="10.5" {...stroke} />
    <path d="M8 10V7.2a4 4 0 0 1 8 0V10" {...stroke} />
    <circle cx="12" cy="15.2" r="1.2" fill="currentColor" />
  </Svg>
);

export const IconMail = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="3" y="5.5" width="18" height="13" {...stroke} />
    <path d="M3.6 6.4L12 13l8.4-6.6" {...stroke} />
  </Svg>
);

export const IconLinkedIn = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="3" y="3" width="18" height="18" {...stroke} />
    <path d="M7.2 10.4V17M7.2 7.4v.1" {...stroke} />
    <path d="M11 17v-6.6M11 13.2c0-1.6.9-2.8 2.5-2.8s2.5 1 2.5 2.8V17" {...stroke} />
  </Svg>
);

export const IconSearch = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="10.8" cy="10.8" r="6.3" {...stroke} />
    <path d="M15.4 15.4L20 20" {...stroke} />
  </Svg>
);

export const IconChevron = ({ className }: IconProps) => (
  <svg viewBox="0 0 12 8" className={`h-2 w-3 ${className ?? ""}`} aria-hidden="true">
    <path
      d="M1 1.5L6 6.5l5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
