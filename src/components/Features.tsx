import {
  IconChart,
  IconCastle,
  IconIsland,
  IconLevels,
  IconTarget,
  IconXRay,
  SectionTitle,
  Badge,
  ItemCard,
  type ItemTone,
} from "@/lumina-ui";
import { useReveal } from "@/lib/useReveal";

type Tone = ItemTone;
type Feature = {
  tab: string;
  tone: Tone;
  title: string;
  body: string;
  Icon: typeof IconTarget;
  ai?: boolean;
};

// Tiga fitur utama (PRD bagian 8) memakai latar emas, seperti item bintang lima.
const features: Feature[] = [
  {
    tab: "Belajar",
    tone: "gold",
    title: "Belajar Bertingkat",
    body: "Setiap bab punya tiga tahap: Belajar, Latsol, Review. Dapatkan XP dan bintang, lalu isi bar kampusmu.",
    Icon: IconLevels,
  },
  {
    tab: "Didukung AI",
    tone: "gold",
    title: "X-Ray Kesalahan",
    body: "Saat salah menjawab, AI menunjukkan letak miskonsepsimu dan menjelaskannya singkat.",
    Icon: IconXRay,
    ai: true,
  },
  {
    tab: "Tujuan",
    tone: "gold",
    title: "Kampus Impian",
    body: "Pilih kampus dan jurusan sebagai tujuan, lalu capai layar akhir saat bar kampus penuh.",
    Icon: IconCastle,
  },
  {
    tab: "Mulai",
    tone: "violet",
    title: "Tes Diagnostik",
    body: "Kerjakan tes di awal untuk melihat peta kelemahanmu sebelum mulai belajar.",
    Icon: IconTarget,
  },
  {
    tab: "Peta",
    tone: "blue",
    title: "Peta Pulau Awan",
    body: "Setiap bab adalah pulau. Selesaikan pulau untuk membuka jalan ke pulau berikutnya.",
    Icon: IconIsland,
  },
  {
    tab: "Analisis",
    tone: "violet",
    title: "Peta Kelemahan",
    body: "Lihat submateri mana yang perlu diperkuat, supaya waktu belajarmu tepat sasaran.",
    Icon: IconChart,
  },
];

export function Features() {
  const ref = useReveal<HTMLUListElement>();
  return (
    <section
      id="fitur"
      aria-labelledby="fitur-title"
      className="bg-gradient-to-b from-sky-100 to-paper px-5 pt-10 pb-24 sm:pb-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle
          id="fitur-title"
          eyebrow="Fitur"
          title={
            <>
              Fiturnya, <span className="text-gold-deep">satu per satu</span>
            </>
          }
          intro="Tiga fitur utama berlatar emas, ditemani tiga fitur pendukung."
        />

        <ul ref={ref} className="reveal mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <li key={f.title}>
              <ItemCard
                tone={f.tone}
                number={String(i + 1).padStart(2, "0")}
                tag={f.tab}
                icon={f.Icon}
                title={f.title}
                footer={f.ai && <Badge>Didukung AI</Badge>}
              >
                {f.body}
              </ItemCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
