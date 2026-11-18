import { useId } from "react";
import { Castle, GrainFilter, rng } from "./shapes";

const W = 1200;
const H = 700;

function Windmill({ x, y, s }: { x: number; y: number; s: number }) {
  const blade = (
    <g>
      <rect
        x="-14"
        y="-210"
        width="28"
        height="190"
        rx="3"
        fill="#f2f8f4"
        stroke="#2b8f96"
        strokeWidth="3"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="-14"
          x2="14"
          y1={-190 + i * 36}
          y2={-190 + i * 36}
          stroke="#2b8f96"
          strokeWidth="2"
        />
      ))}
      <line x1="0" x2="0" y1="-210" y2="-20" stroke="#2b8f96" strokeWidth="2" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M -40 330 L -22 0 L 22 0 L 40 330 Z" fill="#1f6f78" opacity="0.85" />
      <g className="anim-spin">
        {[0, 90, 180, 270].map((r) => (
          <g key={r} transform={`rotate(${r + 20})`}>
            {blade}
          </g>
        ))}
        <circle r="16" fill="#17565f" stroke="#f2f8f4" strokeWidth="4" />
      </g>
    </g>
  );
}

/** Dunia mimpi toska: pita cahaya berputar, kincir angin, dan menara kampus. */
export function DreamScene({
  className = "",
  grain = true,
}: {
  className?: string;
  grain?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const r = rng(91);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#2aa3a6" />
          <stop offset="0.55" stopColor="#7fd8cc" />
          <stop offset="1" stopColor="#dff8ee" />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fffbe0" stopOpacity="1" />
          <stop offset="0.5" stopColor="#f4f7c8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#f4f7c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-ribbon`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff7d6" stopOpacity="0" />
          <stop offset="0.4" stopColor="#fff7d6" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff7d6" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={`${id}-ribbon2`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8fff2" stopOpacity="0.1" />
          <stop offset="0.6" stopColor="#c8fff2" stopOpacity="0.6" />
          <stop offset="1" stopColor="#c8fff2" stopOpacity="0" />
        </linearGradient>
        {grain && <GrainFilter id={`${id}-grain`} opacity={0.07} />}
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      {/* Pusaran lembut di latar */}
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M ${-100 + i * 60} ${120 + i * 40} C ${300} ${-40 + i * 30}, ${700} ${260 - i * 20}, ${1300} ${40 + i * 50}`}
          fill="none"
          stroke={`url(#${id}-ribbon2)`}
          strokeWidth={60 - i * 12}
          opacity="0.35"
        />
      ))}
      <circle cx="620" cy="360" r="230" fill={`url(#${id}-sun)`} />

      {/* Menara kampus */}
      <Castle x={720} y={520} scale={1.5} color="#1f6f78" window="#fff7c8" />
      <Castle x={930} y={540} scale={0.9} color="#3b9aa0" window="#fff7c8" />

      <Windmill x={250} y={380} s={0.95} />
      <Windmill x={420} y={470} s={0.45} />

      {/* Pita cahaya berputar di depan */}
      <path
        d="M -60 640 C 200 500, 420 700, 700 560 S 1100 360, 1280 420"
        fill="none"
        stroke={`url(#${id}-ribbon)`}
        strokeWidth="70"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M -60 560 C 160 470, 360 640, 640 520 S 1060 300, 1280 320"
        fill="none"
        stroke={`url(#${id}-ribbon)`}
        strokeWidth="16"
        opacity="0.9"
      />
      <path
        d="M -60 690 C 260 620, 520 720, 820 640 S 1140 520, 1280 560"
        fill="none"
        stroke="#ffe7a1"
        strokeWidth="3"
        opacity="0.8"
      />
      <path
        d="M 0 700 L 0 640 C 300 600, 600 700, 1200 620 L 1200 700 Z"
        fill="#e6faf2"
        opacity="0.85"
      />

      {/* Kilau kecil */}
      {Array.from({ length: 22 }, (_, i) => {
        const x = r() * W;
        const y = r() * H * 0.75;
        const s = 4 + r() * 9;
        return (
          <path
            key={i}
            d={`M ${x} ${y - s} Q ${x + 1} ${y - 1} ${x + s * 0.7} ${y} Q ${x + 1} ${y + 1} ${x} ${y + s} Q ${x - 1} ${y + 1} ${x - s * 0.7} ${y} Q ${x - 1} ${y - 1} ${x} ${y - s} Z`}
            fill="#ffffff"
            opacity={0.5 + r() * 0.5}
          />
        );
      })}

      {grain && <rect width={W} height={H} filter={`url(#${id}-grain)`} />}
    </svg>
  );
}
