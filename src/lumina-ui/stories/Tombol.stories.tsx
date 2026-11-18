import { ArrowButton, Button, RoundIconButton } from "../components/base";
import { IconArrow, IconClose, IconMenu } from "../icons";
import type { Story, StoryMeta } from "./types";

export default {
  title: "Tombol",
  description: "Tombol pil dengan lingkaran ikon. Isi href untuk tautan, atau onClick untuk aksi.",
  order: ["Utama", "DiLatarMalam", "Ikon"],
} satisfies StoryMeta;

export const Utama: Story = {
  name: "Utama dan sekunder",
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Konfirmasi</Button>
      <Button icon="cancel" variant="ghost-dark">
        Batal
      </Button>
      <Button size="sm">Masuk</Button>
      <Button icon="none" variant="ghost-dark" size="sm">
        Tanpa ikon
      </Button>
      <Button disabled>Nonaktif</Button>
    </div>
  ),
};

export const DiLatarMalam: Story = {
  name: "Di latar malam",
  dark: true,
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        Pelajari lebih lanjut <IconArrow className="size-5" />
      </Button>
      <Button variant="ghost-light">Lihat cara kerja</Button>
      <RoundIconButton tone="dark" label="Menu">
        <IconMenu className="size-5" />
      </RoundIconButton>
    </div>
  ),
};

export const Ikon: Story = {
  name: "Tombol ikon",
  render: () => (
    <div className="flex items-center gap-3">
      <RoundIconButton label="Tutup">
        <IconClose className="size-5" />
      </RoundIconButton>
      <ArrowButton direction="left" label="Sebelumnya" onClick={() => {}} />
      <ArrowButton direction="right" label="Berikutnya" onClick={() => {}} />
    </div>
  ),
};
