# Lumina UI Kit

Komponen React + Tailwind CSS v4 bergaya "Dreamward": langit malam, bintang emas, dan UI kertas krem ala menu game. Dipakai oleh landing page Lumina dan siap dipakai untuk aplikasi inti.

## Pasang

1. Salin folder `lumina-ui/` ke `src/` di proyek React 19 + Tailwind CSS v4.
2. Salin `public/fonts/HYWenHei-85W.woff2` ke folder `public/fonts/` proyekmu.
3. Di CSS utama (yang diimpor oleh `main.tsx`):

   ```css
   @import "tailwindcss";
   @import "./lumina-ui/lumina.css";
   ```

4. Impor komponen:

   ```tsx
   import { Button, Panel, ProgressBar, SkyScene } from "./lumina-ui";
   ```

Kit tidak butuh paket tambahan selain `react` dan `tailwindcss`.

## Isi

| Kelompok  | Komponen                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| Dasar     | `Button`, `RoundIconButton`, `ArrowButton`, `Eyebrow`, `SectionTitle`, `Panel`, `PhoneMockup`, `Ticker`, `PlaceholderTag` |
| Kartu     | `ItemCard` (tone gold, violet, blue, teal), `Badge`                                                                       |
| Progres   | `ProgressBar`, `StarRating`, `StatChip`, `IslandNode`, `StageRow`                                                         |
| Latsol    | `AnswerOption` (idle, selected, correct, wrong), `XRayCard`                                                               |
| Overlay   | `Dialog` (memakai `<dialog>` bawaan), `Notice`                                                                            |
| Formulir  | `TextField`, `Tabs`, `AccordionItem`                                                                                      |
| Ilustrasi | `SkyScene`, `DreamScene`, `CloudBand`, `GoldStar`, `FourStar`, `Castle`, `StarDust`                                       |
| Ikon      | `IconArrow`, `IconCheck`, `IconClose`, `IconStar`, `IconLock`, dan lainnya di `icons.tsx`                                 |

Contoh pemakaian setiap komponen ada di `stories/*.stories.tsx`. Di proyek landing page, semuanya bisa dilihat di `/kit.html`.

## Token

Warna tersedia sebagai kelas Tailwind: `night-950` sampai `night-700`, `sky-500/300/100`, `teal-800/600/400/100`, `paper`, `paper-2`, `paper-line`, `slate`, `slate-soft`, `slate-mute`, `gold`, `gold-deep`, `gold-soft`, `ruby`, `ruby-soft`. Contoh: `bg-night-900`, `text-gold`, `ring-paper-line`.

Kelas tambahan: `stamp` dan `stamp-sm` (bingkai perangko), `glow-text` (judul bercahaya di latar malam), `reveal` (animasi muncul, butuh menambah kelas `is-visible`), serta animasi `anim-twinkle`, `anim-spin`, `anim-pulse-ring`, `anim-marquee`, `anim-drift`. Semua animasi mati otomatis jika pengguna memilih kurangi gerakan.

## Font

`HYWenHei-85W.woff2` sudah dipangkas ke huruf Latin, angka, huruf beraksen, dan tanda baca umum (15 KB). Huruf lain akan tampil dengan font sistem. HYWenHei adalah font komersial dari Hanyi; pastikan penggunaannya sesuai lisensi.

## Contoh layar latsol

```tsx
import { useState } from "react";
import { AnswerOption, Button, ProgressBar, XRayCard, type AnswerState } from "./lumina-ui";

export function Soal() {
  const [pilih, setPilih] = useState<number | null>(null);
  const [cek, setCek] = useState(false);
  const benar = 2;
  const status = (i: number): AnswerState =>
    !cek
      ? pilih === i
        ? "selected"
        : "idle"
      : i === benar
        ? "correct"
        : pilih === i
          ? "wrong"
          : "idle";

  return (
    <div className="mx-auto max-w-[430px] space-y-3 bg-paper p-5">
      <ProgressBar label="Soal 3 dari 10" value={3} max={10} showValue={false} />
      {["12", "16", "18", "24"].map((o, i) => (
        <AnswerOption
          key={o}
          letter={"ABCD"[i]}
          state={status(i)}
          disabled={cek}
          onSelect={() => setPilih(i)}
        >
          {o}
        </AnswerOption>
      ))}
      <Button disabled={pilih === null || cek} onClick={() => setCek(true)}>
        Periksa
      </Button>
      {cek && pilih !== benar && (
        <XRayCard
          yourAnswer={["12", "16", "18", "24"][pilih!]}
          correctAnswer="18"
          misconception="..."
          explanation="..."
        />
      )}
    </div>
  );
}
```
