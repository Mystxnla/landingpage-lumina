import { Button, FourStar, SkyScene } from "@/lumina-ui";
import type { Story, StoryMeta } from "@/lumina-ui/stories/types";

type StoryModule = { default: StoryMeta } & Record<string, Story | StoryMeta>;

// Story yang sama dipakai untuk katalog ini dan untuk Make kit.
const modules = import.meta.glob<StoryModule>("../lumina-ui/stories/*.stories.tsx", {
  eager: true,
});

const ORDER = [
  "Fondasi",
  "Tombol",
  "Permukaan",
  "Progres",
  "Latsol dan X-Ray",
  "Dialog dan pemberitahuan",
  "Formulir",
  "Ilustrasi",
];

const groups = Object.values(modules)
  .map((m) => ({
    meta: m.default,
    // Ikuti urutan di meta.order; ekspor ES module selalu berurutan alfabet.
    stories: (m.default.order ?? Object.keys(m).filter((k) => k !== "default"))
      .map((key) => m[key] as Story)
      .filter(Boolean),
  }))
  .sort((a, b) => ORDER.indexOf(a.meta.title) - ORDER.indexOf(b.meta.title));

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const ZIP_URL = `${import.meta.env.BASE_URL}downloads/lumina-ui-kit.zip`;

export function KitPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="relative isolate overflow-hidden">
        <SkyScene
          className="absolute inset-0 -z-10 h-full w-full"
          star={{ x: 1250, y: 420, size: 150 }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night-950/85 via-night-900/50 to-transparent" />
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:py-20">
          <p className="flex items-center gap-2 font-display text-sm tracking-[0.3em] text-gold uppercase">
            <FourStar size={14} /> Lumina UI Kit
          </p>
          <h1 className="glow-text mt-4 max-w-2xl text-4xl leading-tight text-paper sm:text-6xl">
            Komponen untuk aplikasi inti
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-sky-100/85">
            React + Tailwind CSS v4. Berisi token warna, font, ilustrasi, dan komponen untuk peta,
            latsol, X-Ray Kesalahan, dan layar Masuk.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={ZIP_URL}>Unduh UI kit (.zip)</Button>
            <Button href="./" variant="ghost-light" icon="none">
              Kembali ke landing page
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 lg:grid-cols-[200px_1fr]">
        <nav aria-label="Kelompok komponen" className="lg:sticky lg:top-6 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {groups.map((g) => (
              <li key={g.meta.title}>
                <a
                  href={`#${slug(g.meta.title)}`}
                  className="inline-flex min-h-10 items-center rounded-full px-3 font-display text-sm text-slate-mute transition hover:bg-paper-2 hover:text-slate"
                >
                  {g.meta.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 space-y-16">
          <section aria-labelledby="pakai-h" className="rounded-2xl bg-slate p-6 text-paper sm:p-8">
            <h2 id="pakai-h" className="text-2xl">
              Cara memakai
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sky-100/85">
              <li>
                Salin folder <code className="text-gold">src/lumina-ui</code> ke proyek React +
                Tailwind v4.
              </li>
              <li>
                Salin <code className="text-gold">public/fonts/HYWenHei-85W.woff2</code> ke folder
                public proyekmu.
              </li>
              <li>
                Di CSS utama: <code className="text-gold">@import "tailwindcss";</code> lalu{" "}
                <code className="text-gold">@import "./lumina-ui/lumina.css";</code>
              </li>
              <li>
                Impor komponen:{" "}
                <code className="text-gold">{'import { Button } from "./lumina-ui";'}</code>
              </li>
            </ol>
          </section>
          {groups.map((g) => (
            <section
              key={g.meta.title}
              id={slug(g.meta.title)}
              aria-labelledby={`${slug(g.meta.title)}-h`}
              className="scroll-mt-6"
            >
              <h2 id={`${slug(g.meta.title)}-h`} className="text-3xl text-slate">
                {g.meta.title}
              </h2>
              {g.meta.description && (
                <p className="mt-2 max-w-2xl text-slate-mute">{g.meta.description}</p>
              )}
              <div className="mt-6 space-y-6">
                {g.stories.map((s) => (
                  <div key={s.name} className="overflow-hidden rounded-2xl ring-1 ring-paper-line">
                    <p className="border-b border-paper-line bg-paper-2 px-5 py-2.5 text-sm font-bold text-slate">
                      {s.name}
                    </p>
                    <div
                      className={`p-6 sm:p-8 ${s.dark ? "bg-gradient-to-br from-night-950 to-night-700" : "bg-white/60"}`}
                    >
                      {s.render()}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
