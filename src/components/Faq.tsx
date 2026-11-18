import { AccordionItem, Eyebrow, PlaceholderTag } from "@/lumina-ui";
import { useState, type ReactNode } from "react";
import { APP_NAME } from "@/config";

const faqs: { q: string; a: ReactNode; placeholder?: boolean }[] = [
  {
    q: `Apa itu ${APP_NAME}?`,
    a: `${APP_NAME} adalah aplikasi persiapan UTBK yang belajarnya seperti game. Kamu belajar bab demi bab di peta pulau awan, mengumpulkan XP dan bintang, menuju kampus impianmu.`,
  },
  {
    q: "Apakah hasil kampus berarti aku pasti diterima?",
    a: "Tidak. Hasil kampus adalah kecocokan berdasarkan data referensi, bukan prediksi diterima.",
  },
  {
    q: "Apa yang dilakukan AI di X-Ray Kesalahan?",
    a: "Saat kamu salah menjawab, AI menunjukkan letak miskonsepsimu dan menjelaskannya singkat. Peta kelemahan lalu memperlihatkan submateri yang perlu diperkuat.",
  },
  {
    q: "Dari mana data kampusnya?",
    a: "Data kampus berasal dari sumber referensi yang dicantumkan di dalam aplikasi.",
  },
  {
    q: "Bagaimana cara mencobanya?",
    a: "Tekan tombol Masuk di pojok kanan atas. Untuk keperluan demo, tersedia akun demo yang bisa langsung dipakai.",
    placeholder: true,
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-gradient-to-b from-paper to-sky-100 px-5 pb-24 sm:pb-32"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-title"
            className="mt-5 text-4xl leading-[1.12] text-slate sm:text-5xl lg:text-[3.5rem]"
          >
            Masih <span className="text-gold-deep">penasaran?</span>
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-slate-mute">
            Pertanyaan yang paling mungkin muncul sebelum kamu mencoba.
          </p>
        </div>

        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <AccordionItem
                  question={f.q}
                  open={isOpen}
                  onToggle={() => setOpen(isOpen ? null : i)}
                >
                  <p>{f.a}</p>
                  {f.placeholder && <PlaceholderTag className="mt-3" />}
                </AccordionItem>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
