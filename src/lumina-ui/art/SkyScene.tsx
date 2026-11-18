import { useId } from "react";
import {
  Castle,
  CloudLayers,
  GoldStar,
  GrainFilter,
  StarDust,
  curlPath,
  type CloudLayer,
} from "./shapes";

const W = 1600;
const H = 1000;

const skyClouds: CloudLayer[] = [
  {
    color: "#b9d5fa",
    rim: "#e6f0ff",
    shade: "#9fc1f3",
    base: 770,
    minR: 70,
    maxR: 160,
    curls: 0.5,
    seed: 11,
  },
  {
    color: "#7fa5ee",
    rim: "#c7dcfc",
    shade: "#6b8fe2",
    base: 850,
    minR: 80,
    maxR: 180,
    curls: 0.6,
    seed: 23,
  },
  {
    color: "#5274d4",
    rim: "#98b8f5",
    shade: "#4363c6",
    base: 925,
    minR: 90,
    maxR: 200,
    curls: 0.6,
    seed: 37,
  },
];

/** Lengkung awan samping, seperti gelombang besar di kiri ilustrasi. */
function SideSwirl({
  x,
  y,
  s,
  color,
  rim,
}: {
  x: number;
  y: number;
  s: number;
  color: string;
  rim: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M -260 260 C -260 120 -170 20 -40 10 C 80 0 150 80 130 160 C 115 220 40 236 0 200 C -30 172 -14 126 26 126 C 56 126 64 160 44 170 L 60 260 Z"
        fill={color}
      />
      <path
        d="M -230 250 C -228 130 -150 46 -40 38 C 66 30 124 96 106 156 C 94 200 40 214 10 190"
        fill="none"
        stroke={rim}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d={curlPath(30, 150, 22)}
        fill="none"
        stroke={rim}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>
  );
}

type Props = {
  className?: string;
  /** Posisi bintang utama dalam koordinat 1600 x 1000. */
  star?: { x: number; y: number; size: number };
  castle?: boolean;
  align?: string;
};

/** Panorama langit malam "Dreamward": berkas cahaya, bintang emas, dan awan spiral. */
export function SkyScene({
  className = "",
  star = { x: 1010, y: 330, size: 150 },
  castle,
  align = "xMidYMid",
}: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={`${align} slice`}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1545" />
          <stop offset="0.38" stopColor="#173a92" />
          <stop offset="0.68" stopColor="#3c78d8" />
          <stop offset="1" stopColor="#9ccaf6" />
        </linearGradient>
        <radialGradient id={`${id}-haze`} cx="18%" cy="62%" r="45%">
          <stop offset="0" stopColor="#d8ecff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#d8ecff" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id={`${id}-beam`}
          gradientUnits="userSpaceOnUse"
          x1="-100"
          y1="-80"
          x2={star.x}
          y2={star.y}
        >
          <stop offset="0" stopColor="#7af0d4" stopOpacity="0" />
          <stop offset="0.45" stopColor="#8ef3d6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff0a8" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`${id}-meteor`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>
        <pattern id={`${id}-swirl`} width="180" height="140" patternUnits="userSpaceOnUse">
          <path d={curlPath(50, 50, 30)} fill="none" stroke="#9fc0ff" strokeWidth="2" />
          <path d={curlPath(140, 110, 22)} fill="none" stroke="#9fc0ff" strokeWidth="2" />
          <path d="M 80 50 C 100 20 130 30 150 50" fill="none" stroke="#9fc0ff" strokeWidth="2" />
        </pattern>
        <GrainFilter id={`${id}-grain`} />
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <rect width={W} height={H * 0.6} fill={`url(#${id}-swirl)`} opacity="0.035" />
      <rect width={W} height={H} fill={`url(#${id}-haze)`} />
      <StarDust width={W} height={H} count={170} seed={5} maxY={620} />

      {/* Meteor kecil */}
      {[
        [1240, 90, 90],
        [1420, 210, 70],
        [380, 120, 60],
        [1490, 520, 60],
      ].map(([x, y, l], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={l}
          height="2.4"
          rx="1.2"
          fill={`url(#${id}-meteor)`}
          transform={`rotate(32 ${x} ${y})`}
        />
      ))}

      {/* Berkas cahaya menuju bintang */}
      <g style={{ mixBlendMode: "screen" }}>
        {[
          [-260, -40, 30, 6],
          [-200, 60, 18, 3],
          [-120, -160, 46, 10],
          [80, -220, 14, 2],
          [-320, 180, 10, 2],
        ].map(([sx, sy, w0, w1], i) => (
          <path
            key={i}
            d={`M ${sx} ${sy} L ${sx} ${sy + w0} L ${star.x} ${star.y + w1} L ${star.x} ${star.y - w1} Z`}
            fill={`url(#${id}-beam)`}
            opacity={0.55 + i * 0.06}
          />
        ))}
      </g>

      {castle && (
        <g opacity="0.95">
          <Castle
            x={star.x + 10}
            y={star.y + star.size * 2.1}
            scale={star.size / 130}
            color="#5f86d8"
          />
        </g>
      )}

      <GoldStar x={star.x} y={star.y} size={star.size} className="anim-twinkle" />
      <GoldStar x={star.x + star.size * 0.62} y={star.y - star.size * 0.6} size={star.size * 0.5} />

      <SideSwirl x={160} y={520} s={1.1} color="#8db4f2" rim="#d2e4ff" />
      <SideSwirl x={1520} y={560} s={-0.9} color="#5c80dc" rim="#a9c6f8" />
      <CloudLayers layers={skyClouds} width={W} height={H} />

      <rect width={W} height={H} filter={`url(#${id}-grain)`} />
    </svg>
  );
}

/** Pita awan untuk peralihan antarbagian. Lapisan terakhir harus sama dengan warna bagian berikutnya. */
export function CloudBand({
  layers,
  className = "",
  flip,
  height = 220,
}: {
  layers: CloudLayer[];
  className?: string;
  flip?: boolean;
  height?: number;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none block w-full ${flip ? "-scale-y-100" : ""} ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <CloudLayers layers={layers} width={W} height={height} />
    </svg>
  );
}
