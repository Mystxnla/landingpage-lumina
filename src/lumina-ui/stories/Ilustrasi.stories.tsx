import { DreamScene } from "../art/DreamScene";
import { SkyScene } from "../art/SkyScene";
import { FourStar, GoldStar } from "../art/shapes";
import type { Story, StoryMeta } from "./types";

export default {
  title: "Ilustrasi",
  description:
    "Panorama SVG yang bisa dipakai sebagai latar layar. Atur posisi bintang lewat prop star.",
  order: ["Langit", "Mimpi", "Bintang"],
} satisfies StoryMeta;

export const Langit: Story = {
  name: "SkyScene (langit malam)",
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="relative h-64 overflow-hidden rounded-2xl">
        <SkyScene className="absolute inset-0 h-full w-full" />
      </div>
      <div className="relative h-64 overflow-hidden rounded-2xl">
        <SkyScene
          className="absolute inset-0 h-full w-full"
          castle
          star={{ x: 1000, y: 380, size: 120 }}
        />
      </div>
    </div>
  ),
};

export const Mimpi: Story = {
  name: "DreamScene (dunia mimpi) dengan bingkai perangko",
  render: () => (
    <div className="stamp max-w-xl">
      <div className="relative h-64 overflow-hidden">
        <DreamScene className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  ),
};

export const Bintang: Story = {
  name: "Bintang",
  dark: true,
  render: () => (
    <div className="flex items-center gap-6">
      <svg viewBox="-80 -80 160 160" className="size-32" aria-hidden="true">
        <GoldStar x={0} y={0} size={60} />
      </svg>
      <FourStar size={28} className="text-gold" />
    </div>
  ),
};
