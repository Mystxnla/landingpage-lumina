import { useId } from "react";

/* Bentuk dasar ilustrasi: semua digambar sebagai SVG supaya tajam di semua ukuran. */

/** Angka acak deterministik supaya ilustrasi sama setiap render. */
export function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type CloudLayer = {
  color: string;
  rim?: string;
  base: number;
  minR: number;
  maxR: number;
  curls?: number;
  shade?: string;
  seed: number;
};

/** Deretan awan bergelombang dengan ujung spiral, seperti awan ilustrasi event. */
export function cloudPath(layer: CloudLayer, width: number, height: number) {
  const r = rng(layer.seed);
  let x = -80;
  let y = layer.base;
  let d = `M -80 ${height + 40} L -80 ${y}`;
  const tops: { x: number; y: number; rad: number }[] = [];
  while (x < width + 80) {
    const rad = layer.minR + r() * (layer.maxR - layer.minR);
    const nx = x + rad * (1.45 + r() * 0.45);
    const ny = layer.base + (r() - 0.5) * rad * 0.7;
    d += ` A ${rad} ${rad} 0 0 1 ${nx.toFixed(1)} ${ny.toFixed(1)}`;
    const half = Math.hypot(nx - x, ny - y) / 2;
    const sag = rad - Math.sqrt(Math.max(rad * rad - half * half, 0));
    // Titik di dalam gumpalan, tempat spiral digambar.
    tops.push({ x: (x + nx) / 2, y: (y + ny) / 2 - sag * 0.15, rad: sag });
    x = nx;
    y = ny;
  }
  d += ` L ${width + 80} ${height + 40} Z`;
  return { d, tops };
}

/** Spiral kecil di dalam gumpalan awan. */
export function curlPath(cx: number, cy: number, a: number) {
  return [
    `M ${cx + a} ${cy}`,
    `A ${a * 0.9} ${a * 0.9} 0 0 0 ${cx - a * 0.8} ${cy}`,
    `A ${a * 0.7} ${a * 0.7} 0 0 0 ${cx + a * 0.6} ${cy}`,
    `A ${a * 0.48} ${a * 0.48} 0 0 0 ${cx - a * 0.35} ${cy}`,
    `A ${a * 0.26} ${a * 0.26} 0 0 0 ${cx + a * 0.15} ${cy}`,
  ].join(" ");
}

export function CloudLayers({
  layers,
  width,
  height,
}: {
  layers: CloudLayer[];
  width: number;
  height: number;
}) {
  return (
    <>
      {layers.map((layer, i) => {
        const { d, tops } = cloudPath(layer, width, height);
        const r = rng(layer.seed + 7);
        const curls = tops.filter((t) => t.rad > 18 && r() < (layer.curls ?? 0));
        return (
          <g key={i}>
            <path d={d} fill={layer.color} />
            {/* Pita bayangan di bawah tepi atas, memberi kesan lapisan lukisan */}
            {layer.shade && (
              <path d={d} fill={layer.shade} transform="translate(0 30)" opacity="0.55" />
            )}
            {layer.rim && (
              <path d={d} fill="none" stroke={layer.rim} strokeWidth="2.5" strokeOpacity="0.9" />
            )}
            {layer.rim &&
              curls.map((t, j) => (
                <path
                  key={j}
                  d={curlPath(
                    t.x + (j % 2 ? 10 : -10),
                    t.y + t.rad * 0.15,
                    Math.min(t.rad * 0.5, 26),
                  )}
                  fill="none"
                  stroke={layer.rim}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeOpacity="0.75"
                />
              ))}
          </g>
        );
      })}
    </>
  );
}

/** Bintang empat sudut emas dengan cincin putus-putus. */
export function GoldStar({
  x,
  y,
  size,
  ring = true,
  className = "",
}: {
  x: number;
  y: number;
  size: number;
  ring?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const ry = size;
  const rx = size * 0.72;
  const k = size * 0.1;
  const d = `M 0 ${-ry} Q ${k} ${-k} ${rx} 0 Q ${k} ${k} 0 ${ry} Q ${-k} ${k} ${-rx} 0 Q ${-k} ${-k} 0 ${-ry} Z`;
  return (
    // Animasi CSS memakai transform, jadi posisi diletakkan di grup luar.
    <g transform={`translate(${x} ${y})`}>
      <g className={className}>
        <defs>
          <radialGradient id={`${id}-f`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#fffbe6" />
            <stop offset="0.35" stopColor="#ffe08a" />
            <stop offset="1" stopColor="#f0b443" />
          </radialGradient>
          <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#fff3b8" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff3b8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r={size * 0.9} fill={`url(#${id}-g)`} />
        {ring && (
          <>
            <circle
              r={size * 0.62}
              fill="none"
              stroke="#ffd780"
              strokeWidth={Math.max(1.5, size * 0.012)}
              strokeDasharray={`${size * 0.9} ${size * 0.12} ${size * 0.3} ${size * 0.1}`}
              strokeOpacity="0.85"
            />
            <circle
              r={size * 0.7}
              fill="none"
              stroke="#ffd780"
              strokeWidth={Math.max(1, size * 0.006)}
              strokeDasharray={`${size * 0.04} ${size * 0.08}`}
              strokeOpacity="0.5"
            />
          </>
        )}
        <path d={d} fill={`url(#${id}-f)`} />
      </g>
    </g>
  );
}

/** Siluet kastel di atas pulau awan: kampus impian di kejauhan. */
export function Castle({
  x,
  y,
  scale = 1,
  color,
  window = "#ffe08a",
}: {
  x: number;
  y: number;
  scale?: number;
  color: string;
  window?: string;
}) {
  const towers = [
    { x: -96, w: 22, h: 70 },
    { x: -70, w: 30, h: 110 },
    { x: -36, w: 20, h: 82 },
    { x: -14, w: 34, h: 150 },
    { x: 24, w: 22, h: 96 },
    { x: 50, w: 30, h: 124 },
    { x: 84, w: 20, h: 76 },
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-104" y="-40" width="216" height="40" fill={color} />
      {towers.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={-t.h} width={t.w} height={t.h} fill={color} />
          <path
            d={`M ${t.x - 3} ${-t.h} L ${t.x + t.w / 2} ${-t.h - t.w * 1.6} L ${t.x + t.w + 3} ${-t.h} Z`}
            fill={color}
          />
          <rect
            x={t.x + t.w / 2 - 2.5}
            y={-t.h + 16}
            width="5"
            height="9"
            rx="2.5"
            fill={window}
            opacity="0.9"
          />
        </g>
      ))}
      <path d="M -6 0 v -18 a 9 9 0 0 1 18 0 v 18 Z" fill={window} opacity="0.75" />
    </g>
  );
}

/** Bintik bintang kecil tersebar. */
export function StarDust({
  width,
  height,
  count,
  seed,
  maxY,
}: {
  width: number;
  height: number;
  count: number;
  seed: number;
  maxY?: number;
}) {
  const r = rng(seed);
  const limit = maxY ?? height;
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const gold = r() < 0.12;
        return (
          <circle
            key={i}
            cx={r() * width}
            cy={r() * limit}
            r={gold ? 1.6 + r() * 1.6 : 0.5 + r() * 1.3}
            fill={gold ? "#ffd780" : "#ffffff"}
            opacity={0.35 + r() * 0.6}
          />
        );
      })}
    </g>
  );
}

/** Filter butiran agar warna terasa seperti lukisan digital. */
export function GrainFilter({ id, opacity = 0.09 }: { id: string; opacity?: number }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="table" tableValues={`0 ${opacity}`} />
      </feComponentTransfer>
    </filter>
  );
}

/** Bintang empat sudut kecil untuk ornamen teks dan bullet. */
export function FourStar({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-10 -10 20 20"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 -10 Q1 -1 7 0 Q1 1 0 10 Q-1 1 -7 0 Q-1 -1 0 -10Z" fill="currentColor" />
    </svg>
  );
}
