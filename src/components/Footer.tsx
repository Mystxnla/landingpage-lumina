import {
  CloudBand,
  SkyScene,
  IconArrow,
  IconArrowUp,
  Button,
  RoundIconButton,
  type CloudLayer,
} from "@/lumina-ui";
import { APP_NAME, ROUTES } from "@/config";
import { Logo, NAV_LINKS } from "./Navbar";
import { useSession } from "@/lib/session";

// Awan menggantung dari bagian FAQ; lapisan terakhir sama dengan latar FAQ (sky-100).
const fromFaq: CloudLayer[] = [
  { color: "#9cc4f2", rim: "#d6e6fb", base: 110, minR: 70, maxR: 150, curls: 0.5, seed: 151 },
  { color: "#c6dcf8", rim: "#ffffff", base: 160, minR: 80, maxR: 160, curls: 0.5, seed: 163 },
  { color: "#e3eefb", base: 205, minR: 90, maxR: 170, seed: 173 },
];

// Awan bawah yang menyatu dengan warna footer (night-950).
const toFooter: CloudLayer[] = [
  {
    color: "#3a5cc4",
    rim: "#86a6f2",
    shade: "#3253b8",
    base: 110,
    minR: 70,
    maxR: 150,
    curls: 0.6,
    seed: 181,
  },
  { color: "#1f3790", rim: "#4e72d6", base: 165, minR: 80, maxR: 160, curls: 0.5, seed: 191 },
  { color: "#08113a", rim: "#25409e", base: 212, minR: 90, maxR: 170, curls: 0.3, seed: 199 },
];

export function ClosingCta() {
  return (
    <section
      aria-labelledby="penutup-title"
      className="relative isolate overflow-hidden bg-night-900"
    >
      <SkyScene
        className="absolute inset-0 -z-10 h-full w-full"
        castle
        star={{ x: 1240, y: 420, size: 115 }}
      />
      <CloudBand layers={fromFaq} flip />

      <div className="relative mx-auto max-w-4xl px-5 pt-6 pb-24 text-center sm:pb-32">
        <p className="font-display text-sm tracking-[0.35em] text-gold uppercase">Dreamward</p>
        <h2
          id="penutup-title"
          className="glow-text mt-5 text-5xl leading-[1.05] text-paper sm:text-7xl lg:text-[5.5rem]"
        >
          Sampai ketemu di <span className="text-gold">kampus impian</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-sky-100/90">
          Pilih kampus tujuanmu, kerjakan tes diagnostik, dan taklukkan pulau pertamamu bersama{" "}
          {APP_NAME}.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href={ROUTES.learnMore}>
            Pelajari lebih lanjut
            <IconArrow className="size-5 transition group-hover:translate-x-0.5" />
          </Button>
          <Button href="#faq" variant="ghost-light">
            Baca FAQ
          </Button>
        </div>
      </div>
      <CloudBand layers={toFooter} className="mt-40 sm:mt-56" />
    </section>
  );
}

export function Footer() {
  const session = useSession();
  return (
    <footer className="bg-night-950 px-5 pt-16 pb-8 text-sky-100/80">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm leading-relaxed">
              Aplikasi persiapan UTBK yang belajarnya seperti game: naik level bab demi bab menuju
              kampus impian.
            </p>
            <p className="mt-6 max-w-md rounded-2xl border border-gold/30 bg-white/5 p-4 text-sm leading-relaxed">
              <strong className="text-gold">Keterangan data.</strong> Hasil kampus adalah kecocokan
              berdasarkan data referensi, bukan prediksi diterima. Data kampus berasal dari sumber
              referensi yang dicantumkan di dalam aplikasi.
            </p>
          </div>
          <div>
            <p className="font-display text-lg text-gold">Jelajahi</p>
            <ul className="mt-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={session.loggedIn ? session.continueHref : ROUTES.login}
                  className="inline-flex min-h-11 items-center hover:text-gold"
                >
                  {session.loggedIn ? "Lanjutkan belajar" : "Masuk"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-sky-100/60">
          <p>© 2026 {APP_NAME}</p>
          <RoundIconButton href="#" label="Kembali ke atas" tone="dark">
            <IconArrowUp className="size-5" />
          </RoundIconButton>
        </div>
      </div>
    </footer>
  );
}
