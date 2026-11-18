import type { Story, StoryMeta } from "./types";

export default {
  title: "Fondasi",
  description:
    "Warna dan tipografi Lumina. Semua tersedia sebagai kelas Tailwind, misalnya bg-night-900 atau text-gold.",
  order: ["Warna", "Tipografi"],
} satisfies StoryMeta;

const groups: { name: string; colors: [string, string][] }[] = [
  {
    name: "Langit malam",
    colors: [
      ["night-950", "#08113a"],
      ["night-900", "#0d1a4a"],
      ["night-800", "#15296d"],
      ["night-700", "#1f3f9a"],
      ["sky-500", "#4a86de"],
      ["sky-300", "#94c3f2"],
      ["sky-100", "#e3eefb"],
    ],
  },
  {
    name: "Dunia mimpi",
    colors: [
      ["teal-800", "#17565f"],
      ["teal-600", "#2b8f96"],
      ["teal-400", "#5fc9c2"],
      ["teal-100", "#e2f6f1"],
    ],
  },
  {
    name: "Kertas dan teks",
    colors: [
      ["paper", "#f4efe5"],
      ["paper-2", "#ece5d8"],
      ["paper-line", "#d8c9a3"],
      ["slate", "#3b4255"],
      ["slate-soft", "#4a5366"],
      ["slate-mute", "#6b7385"],
    ],
  },
  {
    name: "Aksen",
    colors: [
      ["gold", "#ffd780"],
      ["gold-deep", "#c9a45a"],
      ["gold-soft", "#fff1c4"],
      ["ruby", "#c4574f"],
      ["ruby-soft", "#fbe4df"],
    ],
  },
];

export const Warna: Story = {
  name: "Warna",
  render: () => (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g.name}>
          <p className="mb-2 text-sm font-bold text-slate">{g.name}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {g.colors.map(([n, hex]) => (
              <div key={n} className="overflow-hidden rounded-xl bg-paper ring-1 ring-paper-line">
                <div className="h-14" style={{ background: hex }} />
                <div className="px-3 py-2">
                  <p className="text-xs font-bold text-slate">{n}</p>
                  <p className="text-[11px] text-slate-mute">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Tipografi: Story = {
  name: "Tipografi",
  render: () => (
    <div className="space-y-4 text-slate">
      <p className="text-xs font-bold tracking-[0.32em] text-gold-deep uppercase">
        Eyebrow · 12 px
      </p>
      <p className="font-display text-5xl leading-tight">Judul besar · 48 px</p>
      <p className="font-display text-3xl">Judul bagian · 30 px</p>
      <p className="font-display text-xl">Judul kartu · 20 px</p>
      <p className="max-w-xl text-base leading-relaxed text-slate-mute">
        Teks paragraf · 16 px. Semua teks memakai HYWenHei 85W, mengikuti UI game yang memakai satu
        font untuk judul dan isi.
      </p>
    </div>
  ),
};
