import {
  Button,
  DreamScene,
  Eyebrow,
  FourStar,
  IslandNode,
  PhoneMockup,
  StageRow,
  type IslandStatus,
} from "@/lumina-ui";
import { useReveal } from "@/lib/useReveal";

// Data tetap untuk pratinjau (PRD FR-L6.2); tidak memanggil API.
const islands: { title: string; status: IslandStatus; stars?: number; x: string }[] = [
  { title: "Penalaran Umum", status: "done", stars: 3, x: "left-[12%]" },
  { title: "Pengetahuan Kuantitatif", status: "done", stars: 2, x: "right-[10%]" },
  { title: "Literasi Bahasa Indonesia", status: "active", x: "left-[16%]" },
  { title: "Literasi Bahasa Inggris", status: "locked", x: "right-[14%]" },
  { title: "Bab berikutnya", status: "soon", x: "left-[30%]" },
];

const stages = [
  { name: "Belajar", detail: "Materi singkat", xp: "+20 XP", done: true },
  { name: "Latsol", detail: "Latihan soal", xp: "+40 XP", done: true },
  { name: "Review", detail: "Bahas salah", xp: "+30 XP", done: false },
];

export function Preview() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      aria-labelledby="pratinjau-title"
      className="bg-gradient-to-b from-teal-100 to-paper px-5 pt-8 pb-24 sm:pb-32"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>Pratinjau aplikasi</Eyebrow>
          <h2
            id="pratinjau-title"
            className="mt-5 text-4xl leading-[1.12] text-slate sm:text-5xl lg:text-[3.5rem]"
          >
            Belajar di atas <span className="text-teal-600">peta pulau awan</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-mute">
            Setiap bab adalah pulau. Selesaikan pulau untuk mengumpulkan bintang dan membuka jalan
            ke pulau berikutnya.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Pulau selesai menampilkan bintang yang kamu kumpulkan",
              "Penanda “Kamu di sini” menunjukkan bab aktif",
              "Pulau terkunci terbuka setelah bab sebelumnya selesai",
            ].map((p) => (
              <li key={p} className="flex gap-3 font-bold text-slate">
                <FourStar size={13} className="mt-1.5 shrink-0 text-gold-deep" />
                {p}
              </li>
            ))}
          </ul>
          <Button href="#fitur" variant="ghost-dark" className="mt-9">
            Lihat semua fitur
          </Button>
        </div>

        <div ref={ref} className="reveal">
          <div className="stamp drop-shadow-[0_24px_40px_rgba(23,86,95,0.35)]">
            <div className="relative isolate overflow-hidden px-4 py-10 sm:px-8">
              <DreamScene className="absolute inset-0 -z-10 h-full w-full" />
              <div className="flex justify-center gap-5 sm:gap-7">
                {/* HP 1: peta pulau */}
                <PhoneMockup className="relative h-[600px] w-[260px] shrink-0">
                  <div className="px-4 pt-4">
                    <p className="font-display text-lg text-slate">Peta perjalanan</p>
                    <div className="mt-1 h-2 rounded-full bg-white ring-1 ring-paper-line">
                      <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-teal-400 to-teal-600" />
                    </div>
                    <p className="mt-1 text-[10px] font-bold text-slate-mute">Bar kampus 42%</p>
                  </div>
                  <div className="relative mt-4 h-[480px]">
                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox="0 0 256 480"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M70 26 C 200 50, 220 90, 190 122 S 40 190, 80 218 S 230 300, 180 316 S 90 400, 120 420"
                        fill="none"
                        stroke="#c9a45a"
                        strokeOpacity="0.7"
                        strokeWidth="2"
                        strokeDasharray="5 7"
                      />
                    </svg>
                    <ol>
                      {islands.map((isl, i) => (
                        <li
                          key={isl.title}
                          className={`absolute ${isl.x}`}
                          style={{ top: `${i * 96}px` }}
                        >
                          <IslandNode {...isl} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </PhoneMockup>

                {/* HP 2: tahap dalam satu bab */}
                <PhoneMockup className="relative hidden h-[600px] w-[270px] shrink-0 translate-y-8 md:block">
                  <div className="px-4 pt-5">
                    <p className="text-center text-[11px] font-bold tracking-[0.2em] text-gold-deep uppercase">
                      Bab 3
                    </p>
                    <p className="mt-1 text-center font-display text-lg leading-tight text-slate">
                      Literasi Bahasa Indonesia
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2 rounded-full bg-slate py-1.5 text-[11px] font-bold text-gold">
                      <FourStar size={10} /> XP bab ini: 60 dari 90
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {stages.map((s) => (
                        <li key={s.name}>
                          <StageRow {...s} current={!s.done} />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex justify-center">
                      <span className="inline-flex h-10 items-center gap-2 rounded-full bg-paper-2 pr-5 pl-1.5 font-display text-sm text-slate shadow ring-1 ring-paper-line">
                        <span className="grid size-7 place-items-center rounded-full bg-slate">
                          <span className="size-3 rounded-full border-2 border-gold" />
                        </span>
                        Mulai Review
                      </span>
                    </div>
                  </div>
                </PhoneMockup>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs font-bold text-slate-mute">
            Contoh tampilan dengan data tetap
          </p>
        </div>
      </div>
    </section>
  );
}
