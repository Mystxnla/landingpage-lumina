import {
  Eyebrow,
  Panel,
  PhoneMockup,
  PlaceholderTag,
  SectionTitle,
  Ticker,
} from "../components/base";
import { Badge, ItemCard } from "../components/cards";
import { IconCastle, IconLevels, IconTarget, IconXRay } from "../icons";
import type { Story, StoryMeta } from "./types";

export default {
  title: "Permukaan",
  description: "Panel kertas, kartu item berwarna tingkatan, label, dan judul bagian.",
  order: ["Kartu", "PanelKertas", "Judul", "BingkaiHP"],
} satisfies StoryMeta;

export const Kartu: Story = {
  name: "Kartu item",
  render: () => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <ItemCard tone="gold" number="01" tag="Belajar" icon={IconLevels} title="Belajar Bertingkat">
        Tone emas untuk hal utama.
      </ItemCard>
      <ItemCard tone="violet" number="02" tag="Mulai" icon={IconTarget} title="Tes Diagnostik">
        Tone ungu.
      </ItemCard>
      <ItemCard
        tone="blue"
        number="03"
        tag="Analisis"
        icon={IconXRay}
        title="X-Ray"
        footer={<Badge>Didukung AI</Badge>}
      >
        Tone biru, dengan footer.
      </ItemCard>
      <ItemCard tone="teal" number="04" tag="Tujuan" icon={IconCastle} title="Kampus Impian">
        Tone toska.
      </ItemCard>
    </div>
  ),
};

export const PanelKertas: Story = {
  name: "Panel dan label",
  render: () => (
    <div className="grid items-start gap-5 md:grid-cols-2">
      <Panel className="p-6">
        <Eyebrow>Misi</Eyebrow>
        <p className="mt-3 font-display text-2xl text-slate">Panel kertas</p>
        <p className="mt-2 text-slate-mute">Wadah umum untuk isi di latar terang.</p>
      </Panel>
      <div className="flex flex-wrap gap-3">
        <Badge>Didukung AI</Badge>
        <Badge tone="gold">+40 XP</Badge>
        <Badge tone="teal">Selesai</Badge>
        <PlaceholderTag />
      </div>
    </div>
  ),
};

export const Judul: Story = {
  name: "Judul bagian",
  render: () => (
    <SectionTitle
      eyebrow="Peta"
      title={
        <>
          Pulau <span className="text-gold-deep">berikutnya</span>
        </>
      }
      intro="Judul dengan eyebrow dan pengantar. Pakai dark untuk latar malam."
    />
  ),
};

export const BingkaiHP: Story = {
  name: "Bingkai HP dan pita berjalan",
  render: () => (
    <div className="space-y-6">
      <PhoneMockup className="h-[360px] w-[200px]" />
      <Ticker items={["Peta pulau awan", "X-Ray Kesalahan"]} />
    </div>
  ),
};
