import { ArrowButton, PlaceholderTag, SectionTitle } from "@/lumina-ui";
import { useEffect, useRef, useState } from "react";

// PLACEHOLDER: artikel belum ada di PRD. Ganti judul, ringkasan, dan tautan saat artikel siap.
const stories: {
  tag: string;
  title: string;
  excerpt: string;
  img: string;
  alt: string;
}[] = [
  {
    tag: "Tips belajar",
    title: "Cara membaca peta kelemahanmu",
    excerpt: "Mulai dari submateri yang paling sering salah, bukan dari bab pertama di buku.",
    img: "/images/story-1-tips.png",
    alt: "Ikon clipboard dengan kaca pembesar dan grafik detak jantung",
  },
  {
    tag: "Kampus impian",
    title: "Memilih kampus dan jurusan tanpa panik",
    excerpt: "Pertanyaan sederhana yang membantumu menentukan tujuan sebelum mulai latihan.",
    img: "/images/story-2-kampus.jpg",
    alt: "Halaman kampus dengan kolam peta Indonesia, pohon pinus, dan gedung berarsitektur khas",
  },
  {
    tag: "Kebiasaan",
    title: "Satu pulau sehari, pelan tapi rutin",
    excerpt: "Belajar sedikit setiap hari lebih mudah dijaga daripada belajar semalam suntuk.",
    img: "/images/story-3-kebiasaan.png",
    alt: "Ilustrasi orang berlari menaiki tangga grafik yang terus naik",
  },
  {
    tag: "X-Ray",
    title: "Kenapa salah justru berguna",
    excerpt: "Jawaban salah memberi tahu bagian konsep mana yang belum benar-benar kamu pahami.",
    img: "/images/story-4-xray.jpg",
    alt: "Poster hitam bertulisan It's Okay To Fail",
  },
];

export function Stories() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="cerita-title" className="bg-paper px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            align="left"
            id="cerita-title"
            eyebrow="Bacaan"
            title={
              <>
                <span className="text-gold-deep">Cerita</span> & tips belajar
              </>
            }
            intro={
              <>
                Bacaan singkat dari tim tentang cara belajar dan persiapan UTBK.{" "}
                <PlaceholderTag className="ml-1 align-middle" />
              </>
            }
          />
          <div className="flex gap-3">
            <ArrowButton
              direction="left"
              label="Artikel sebelumnya"
              onClick={() => scroll(-1)}
              disabled={edge.start}
            />
            <ArrowButton
              direction="right"
              label="Artikel berikutnya"
              onClick={() => scroll(1)}
              disabled={edge.end}
            />
          </div>
        </div>

        <ul
          ref={track}
          onScroll={update}
          className="-mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pt-4 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((s) => (
            <li
              key={s.title}
              className="w-[82%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <article className="group">
                <div className="stamp-sm relative drop-shadow-[0_18px_26px_rgba(8,17,58,0.22)] [--c:#fffdf8]">
                  <div className="overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.alt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute top-5 left-5 rounded-full bg-slate/90 px-3 py-1 text-[11px] font-bold tracking-[0.15em] text-paper uppercase backdrop-blur">
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl leading-tight text-slate">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-mute">{s.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-paper-line pt-3 text-sm font-bold text-slate-mute">
                  <span>Artikel menyusul</span>
                  <span className="text-gold-deep">Segera</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
