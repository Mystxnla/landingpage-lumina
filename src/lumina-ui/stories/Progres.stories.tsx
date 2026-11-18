import { IslandNode, ProgressBar, StageRow, StarRating, StatChip } from "../components/progress";
import { IconStar } from "../icons";
import type { Story, StoryMeta } from "./types";

export default {
  title: "Progres",
  description: "Bar kampus, bintang, XP, pulau di peta, dan tahap bab.",
  order: ["Bar", "Pulau", "Tahap"],
} satisfies StoryMeta;

export const Bar: Story = {
  name: "Bar dan bintang",
  render: () => (
    <div className="grid max-w-xl gap-6">
      <ProgressBar label="Bar kampus" value={42} />
      <ProgressBar label="XP bab ini" value={60} max={90} tone="gold" />
      <div className="flex flex-wrap items-center gap-4">
        <StarRating value={2} />
        <StarRating value={3} size="lg" />
        <StatChip label="XP" value="1.280 XP" />
        <StatChip label="Bintang" value="14" icon={<IconStar className="size-3.5" />} />
      </div>
    </div>
  ),
};

export const Pulau: Story = {
  name: "Pulau di peta",
  render: () => (
    <div className="flex flex-wrap gap-6">
      <IslandNode title="Penalaran Umum" status="done" stars={3} />
      <IslandNode title="Literasi Bahasa Indonesia" status="active" />
      <IslandNode title="Literasi Bahasa Inggris" status="locked" />
      <IslandNode title="Bab berikutnya" status="soon" />
    </div>
  ),
};

export const Tahap: Story = {
  name: "Tahap bab",
  render: () => (
    <div className="grid max-w-sm gap-2.5">
      <StageRow name="Belajar" detail="Materi singkat" xp="+20 XP" done />
      <StageRow name="Latsol" detail="Latihan soal" xp="+40 XP" done />
      <StageRow name="Review" detail="Bahas salah" xp="+30 XP" current />
    </div>
  ),
};
