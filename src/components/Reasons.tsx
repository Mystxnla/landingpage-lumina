import { CloudBand, FourStar, StarDust, type CloudLayer, Eyebrow } from "@/lumina-ui";
import type { CSSProperties } from "react";
import { useReveal } from "@/lib/useReveal";

// Posisi bintang di rasi (persen lebar dan tinggi area).
const nodes: { label: string; x: number; y: number }[] = [
  { label: "Peta pulau awan", x: 12, y: 16 },
  { label: "XP & bintang", x: 36, y: 6 },
  { label: "X-Ray Kesalahan", x: 68, y: 10 },
  { label: "Didukung AI", x: 89, y: 30 },
  { label: "Peta kelemahan", x: 84, y: 78 },
  { label: "Belajar · Latsol · Review", x: 54, y: 93 },
  { label: "Tes diagnostik", x: 22, y: 84 },
  { label: "Kampus impian", x: 7, y: 52 },
];

// Lapisan terdepan sama dengan latar bagian Fitur (sky-100).
const toLight: CloudLayer[] = [
  { color: "#2c4cae", rim: "#5d82e2", base: 90, minR: 70, maxR: 150, curls: 0.6, seed: 71 },
  {
    color: "#7fa5ee",
    rim: "#bcd4fb",
    shade: "#6b8fe2",
    base: 150,
    minR: 80,
    maxR: 170,
    curls: 0.6,
    seed: 83,
  },
  { color: "#e3eefb", rim: "#ffffff", base: 205, minR: 90, maxR: 180, curls: 0.4, seed: 97 },
];

export function Reasons() {
  const ref = useReveal<HTMLDivElement>();
  const ring = [...nodes, nodes[0]];
  return (
    <section
      aria-labelledby="alasan-title"
      className="relative overflow-hidden bg-gradient-to-b from-night-800 to-night-950"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1600 900"
        aria-hidden="true"
      >
        <StarDust width={1600} height={900} count={160} seed={19} />
      </svg>

      <div
        ref={ref}
        className="reveal relative mx-auto max-w-[1200px] px-5 pt-24 pb-10 lg:h-[680px] lg:pt-0 lg:pb-0"
      >
        {/* Garis rasi */}
        <svg
          className="absolute inset-x-5 inset-y-16 hidden h-[calc(100%-8rem)] w-[calc(100%-2.5rem)] lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline
            points={ring.map((n) => `${n.x},${n.y}`).join(" ")}
            fill="none"
            stroke="#ffd780"
            strokeOpacity="0.4"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-xl text-center lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <Eyebrow dark center>
            Kenapa Lumina
          </Eyebrow>
          <h2
            id="alasan-title"
            className="glow-text mt-5 text-4xl leading-[1.12] text-paper sm:text-5xl lg:text-[3.5rem]"
          >
            Alasan kamu <span className="text-gold">betah belajar</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-sky-100/80 sm:text-lg">
            Setiap bab terasa seperti bintang baru di rasi perjalananmu, bukan tumpukan soal.
          </p>
        </div>

        <ul className="relative mt-12 grid grid-cols-2 gap-x-4 gap-y-5 lg:absolute lg:inset-x-5 lg:inset-y-16 lg:mt-0 lg:block">
          {nodes.map((n) => (
            <li
              key={n.label}
              className="flex items-center gap-2.5 lg:absolute lg:top-(--y) lg:left-(--x) lg:-translate-x-1/2 lg:-translate-y-1/2 lg:flex-col lg:gap-2"
              style={{ "--x": `${n.x}%`, "--y": `${n.y}%` } as CSSProperties}
            >
              <span className="relative grid size-7 shrink-0 place-items-center" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-gold/25 blur-md" />
                <FourStar size={22} className="relative text-gold anim-twinkle" />
              </span>
              <span className="font-display text-[15px] text-paper lg:text-base lg:whitespace-nowrap">
                {n.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <CloudBand layers={toLight} />
    </section>
  );
}
