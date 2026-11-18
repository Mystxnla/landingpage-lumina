type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconLevels = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M3 20h5v-5h5v-5h5V5h3" />
    <path d="M18 2.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="currentColor" />
  </svg>
);

export const IconXRay = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 21 21" />
    <path d="M10.5 7v3.5l2.2 1.8" />
  </svg>
);

export const IconCastle = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 21V11l2-2 2 2v10M16 21V11l2-2 2 2v10" />
    <path d="M8 21v-9h8v9M8 12l4-6 4 6" />
    <path d="M12 6V2.5l3 1.2-3 1.2" />
    <path d="M10.5 21v-3a1.5 1.5 0 0 1 3 0v3M2.5 21h19" />
  </svg>
);

export const IconCompass = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </svg>
);

export const IconScroll = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M7 4h11a2 2 0 0 1 2 2v1h-4" />
    <path d="M16 7v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h10" />
    <path d="M7 4a2 2 0 0 0-2 2v11M9 9h4M9 12.5h4" />
  </svg>
);

export const IconIsland = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M3 12h18c-1.5 4-5 7.5-9 9-4-1.5-7.5-5-9-9Z" />
    <path d="M12 12V6M12 6c-2-2.5-4.5-2-6-1M12 6c2-2.5 4.5-2 6-1" />
  </svg>
);

export const IconLock = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2.5" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const IconStar = ({ className, filled = true }: IconProps & { filled?: boolean }) => (
  <svg {...base} className={className} strokeWidth={1.4}>
    <path
      d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z"
      fill={filled ? "currentColor" : "none"}
    />
  </svg>
);

export const IconArrow = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconCheck = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={3}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconMenu = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.2}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const IconClose = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.2}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconPlus = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.4}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.4}>
    <path d="M5 12h14" />
  </svg>
);

export const IconChevron = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.6}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const IconArrowUp = ({ className }: IconProps) => (
  <svg {...base} className={className} strokeWidth={2.2}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const IconTarget = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const IconChart = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
  </svg>
);
