import { DreamScene, SkyScene, FourStar, PhoneMockup, SectionTitle } from "@/lumina-ui";
import { useReveal } from "@/lib/useReveal";

// Sumber: PRD bagian 3 (Target Pengunjung).
const groups = [
  {
    title: "Untuk siswa kelas 12 & gap year",
    scene: "dream" as const,
    overlay: "from-teal-800/95 via-teal-800/70 to-teal-800/0",
    points: [
      "Belajar bab demi bab seperti naik level",
      "Ada tujuan kampus yang jelas sejak awal",
      "Tahu letak salah lewat X-Ray Kesalahan",
      "Progres terlihat dari XP dan bintang",
    ],
  },
  {
    title: "Untuk dosen & penguji projek",
    scene: "sky" as const,
    overlay: "from-night-950/95 via-night-900/70 to-night-900/0",
    points: [
      "Tiga fitur utama terlihat dalam sekali lihat",
      "Integrasi LLM pada X-Ray Kesalahan",
      "Alur jelas dari Masuk sampai layar akhir",
      "Bisa dicoba lewat akun demo",
    ],
  },
];

export function Audience() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section aria-labelledby="siapa-title" className="bg-paper px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle
          id="siapa-title"
          eyebrow="Sasaran"
          title={
            <>
              Dibuat <span className="text-gold-deep">untuk siapa?</span>
            </>
          }
          intro="Lumina dirancang untuk siswa yang menyiapkan UTBK, dan cukup jelas untuk dipahami penguji dalam sekali demo."
        />

        <div ref={ref} className="reveal mt-14 grid gap-6 lg:grid-cols-2">
          {groups.map((g, i) => (
            <article
              key={g.title}
              className="relative isolate min-h-[640px] overflow-hidden rounded-[28px] p-8 shadow-[0_30px_60px_-36px_rgba(8,17,58,0.8)] sm:p-10"
            >
              {g.scene === "dream" ? (
                <DreamScene className="absolute inset-0 -z-10 h-full w-full" grain={false} />
              ) : (
                <SkyScene
                  className="absolute inset-0 -z-10 h-full w-full"
                  star={{ x: 1200, y: 560, size: 150 }}
                  align="xMaxYMid"
                />
              )}
              <div
                className={`absolute inset-x-0 top-0 -z-10 h-[70%] bg-gradient-to-b ${g.overlay}`}
              />
              <span
                className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-white/25"
                aria-hidden="true"
              />

              <h3 className="glow-text max-w-sm text-4xl leading-[1.1] text-paper sm:text-[2.75rem]">
                {g.title}
              </h3>
              <ul className="mt-6 max-w-sm space-y-3">
                {g.points.map((p) => (
                  <li key={p} className="flex gap-3 font-bold text-paper">
                    <FourStar size={13} className="mt-1.5 shrink-0 text-gold" />
                    {p}
                  </li>
                ))}
              </ul>
              <PhoneMockup
                className={`absolute -bottom-24 h-80 w-[240px] ${i === 0 ? "right-8 rotate-6" : "right-8 -rotate-6 sm:right-auto sm:left-10"}`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
