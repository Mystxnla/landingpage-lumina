import { SkyScene, FourStar, Eyebrow, Panel, PlaceholderTag } from "@/lumina-ui";
import { APP_NAME } from "@/config";
import { useReveal } from "@/lib/useReveal";

// PLACEHOLDER: visi dan misi belum ada di PRD. Ganti dengan rumusan tim.
const missions = [
  "Membuat persiapan UTBK terasa seperti perjalanan yang punya tujuan.",
  "Menunjukkan letak salah dengan penjelasan singkat, bukan sekadar kunci jawaban.",
  "Menjaga suasana belajar yang ramah dan tidak menghakimi saat siswa salah.",
  "Bersikap jujur: hasil kampus adalah kecocokan, bukan janji diterima.",
];

export function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="tentang" aria-labelledby="tentang-title" className="bg-paper px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Tentang kami</Eyebrow>
            <h2
              id="tentang-title"
              className="mt-5 text-4xl leading-[1.12] text-slate sm:text-5xl lg:text-[3.5rem]"
            >
              Kami percaya <span className="text-gold-deep">salah</span> itu bagian dari belajar.
            </h2>
          </div>
          <div className="lg:pt-12">
            <p className="text-lg leading-relaxed text-slate-mute">
              {APP_NAME} adalah aplikasi persiapan UTBK yang belajarnya seperti game. Kamu memilih
              kampus tujuan, menaklukkan bab demi bab di peta pulau awan, dan AI membantu
              menunjukkan letak miskonsepsimu.
            </p>
          </div>
        </div>

        <div ref={ref} className="reveal mt-16">
          <div className="relative isolate overflow-hidden rounded-[28px] px-8 py-12 sm:px-14 sm:py-16">
            <SkyScene
              className="absolute inset-0 -z-10 h-full w-full"
              star={{ x: 1300, y: 300, size: 160 }}
              align="xMaxYMid"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night-950/90 via-night-900/60 to-transparent" />
            <span
              className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-white/25"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-bold tracking-[0.32em] text-gold uppercase">Visi</p>
              <PlaceholderTag dark />
            </div>
            <p className="glow-text mt-4 max-w-3xl font-display text-2xl leading-snug text-paper sm:text-[2.2rem]">
              Menjadi teman belajar UTBK yang membuat setiap siswa berani mencoba, paham letak
              salahnya, dan yakin melangkah ke kampus tujuannya.
            </p>
          </div>

          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {missions.map((m, i) => (
              <li key={m}>
                <Panel className="h-full p-6">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-gold-deep uppercase">
                    <FourStar size={10} /> Misi
                  </p>
                  <p className="mt-1 font-display text-4xl text-slate">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 leading-relaxed text-slate-mute">{m}</p>
                </Panel>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
