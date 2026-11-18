import { CloudBand, GoldStar, StarDust, type CloudLayer, SectionTitle } from "@/lumina-ui";
import { useReveal } from "@/lib/useReveal";

// Sumber: PRD FR-L5.1 dan bagian 8.
const steps = [
  { tag: "Tujuan", title: "Pilih kampus impian", body: "Pilih kampus dan jurusan impianmu." },
  {
    tag: "Diagnostik",
    title: "Tes diagnostik",
    body: "Kerjakan tes diagnostik untuk melihat peta kelemahanmu.",
  },
  {
    tag: "Belajar",
    title: "Belajar di peta pulau",
    body: "Belajar bab demi bab di peta pulau awan.",
  },
  { tag: "Hasil", title: "Capai kampus", body: "Penuhi bar kampus dan capai tujuanmu." },
];

// Lapisan terdepan sama dengan latar Pratinjau (teal-100).
const toTeal: CloudLayer[] = [
  { color: "#2c4cae", rim: "#5d82e2", base: 90, minR: 70, maxR: 150, curls: 0.6, seed: 113 },
  {
    color: "#5fb7d8",
    rim: "#a8e2ec",
    shade: "#4ea4c8",
    base: 150,
    minR: 80,
    maxR: 170,
    curls: 0.6,
    seed: 127,
  },
  { color: "#e2f6f1", rim: "#ffffff", base: 205, minR: 90, maxR: 180, curls: 0.4, seed: 131 },
];

export function Steps() {
  const ref = useReveal<HTMLOListElement>();
  return (
    <section
      id="cara-kerja"
      aria-labelledby="langkah-title"
      className="relative overflow-hidden bg-gradient-to-b from-night-950 via-night-900 to-night-800"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1600 900"
        aria-hidden="true"
      >
        <StarDust width={1600} height={900} count={140} seed={29} />
      </svg>
      <div className="relative mx-auto max-w-[1200px] px-5 pt-24 sm:pt-32">
        <SectionTitle
          dark
          id="langkah-title"
          eyebrow="Cara kerja"
          title={
            <>
              Empat langkah <span className="text-gold">menuju kampus</span>
            </>
          }
          intro="Setiap langkah menyalakan satu bintang di jalur perjalananmu."
        />

        <ol
          ref={ref}
          className="reveal relative mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          <span
            className="pointer-events-none absolute top-[70px] right-[12%] left-[12%] hidden border-t border-dashed border-gold/50 lg:block"
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <li key={s.tag} className="relative flex flex-col items-center text-center">
              <svg viewBox="-80 -80 160 160" className="size-[140px]" aria-hidden="true">
                <GoldStar
                  x={0}
                  y={0}
                  size={i === 3 ? 72 : 58}
                  className={i === 3 ? "anim-twinkle" : ""}
                />
              </svg>
              <p className="mt-1 text-xs font-bold tracking-[0.3em] text-gold uppercase">
                {String(i + 1).padStart(2, "0")} · {s.tag}
              </p>
              <h3 className="mt-3 text-2xl text-paper">{s.title}</h3>
              <p className="mt-2 max-w-[240px] leading-relaxed text-sky-100/80">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
      <CloudBand layers={toTeal} className="mt-16" />
    </section>
  );
}
