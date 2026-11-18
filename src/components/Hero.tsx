import { CloudBand, SkyScene, IconArrow, Button, PhoneMockup, type CloudLayer } from "@/lumina-ui";
import { ROUTES } from "@/config";

// Lapisan terdepan sama dengan warna bagian berikutnya (night-800).
const foreground: CloudLayer[] = [
  {
    color: "#3a5cc4",
    rim: "#86a6f2",
    shade: "#3253b8",
    base: 110,
    minR: 70,
    maxR: 150,
    curls: 0.6,
    seed: 41,
  },
  {
    color: "#25409e",
    rim: "#5d82e2",
    shade: "#1f3890",
    base: 165,
    minR: 80,
    maxR: 160,
    curls: 0.6,
    seed: 53,
  },
  { color: "#15296d", rim: "#3654b8", base: 212, minR: 90, maxR: 170, curls: 0.5, seed: 67 },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative -mt-[68px] overflow-hidden bg-night-900"
    >
      <SkyScene className="absolute inset-0 h-full w-full" />
      {/* Di layar sempit, berkas cahaya melintasi judul; gelapkan sedikit agar tetap terbaca */}
      <div className="absolute inset-x-0 top-0 h-[720px] bg-gradient-to-b from-night-950/70 via-night-900/40 to-transparent lg:hidden" />

      <div className="relative mx-auto max-w-[1200px] px-5 pt-36 sm:pt-44">
        <div className="max-w-2xl text-center lg:text-left">
          <p className="font-display text-sm tracking-[0.35em] text-gold uppercase">
            Persiapan UTBK
          </p>
          <h1
            id="hero-title"
            className="glow-text mt-4 text-[2.6rem] leading-[1.08] text-paper sm:text-6xl lg:text-[4.6rem]"
          >
            Belajar UTBK serasa <span className="text-gold">naik level</span> menuju kampus impian
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-sky-100/90 sm:text-lg lg:mx-0">
            Pilih kampusmu, taklukkan bab demi bab di peta pulau awan, dan biarkan AI menunjukkan di
            mana letak salahmu.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button href={ROUTES.learnMore}>
              Pelajari lebih lanjut
              <IconArrow className="size-5 transition group-hover:translate-x-0.5" />
            </Button>
            <Button href="#cara-kerja" variant="ghost-light">
              Lihat cara kerja
            </Button>
          </div>
        </div>
      </div>

      {/* Mockup HP tenggelam di lautan awan; isi layar menyusul */}
      <div className="relative mt-20 flex items-end justify-center gap-6 px-5 sm:mt-24">
        <PhoneMockup className="hidden h-[400px] w-[220px] shrink-0 translate-y-10 md:block" />
        <PhoneMockup className="h-[440px] w-[240px] shrink-0" />
        <PhoneMockup className="hidden h-[400px] w-[220px] shrink-0 translate-y-10 md:block" />
      </div>
      <CloudBand layers={foreground} className="relative -mt-40" />
    </section>
  );
}
