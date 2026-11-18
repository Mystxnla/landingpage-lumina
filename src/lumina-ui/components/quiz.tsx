import type { ReactNode } from "react";
import { FourStar } from "../art/shapes";
import { IconCheck, IconClose } from "../icons";

export type AnswerState = "idle" | "selected" | "correct" | "wrong";

/** Pilihan jawaban latsol dengan huruf A sampai E. */
export function AnswerOption({
  letter,
  children,
  state = "idle",
  disabled,
  onSelect,
}: {
  letter: string;
  children: ReactNode;
  state?: AnswerState;
  disabled?: boolean;
  onSelect?: () => void;
}) {
  const box = {
    idle: "bg-paper ring-paper-line hover:ring-slate/40",
    selected: "bg-gold-soft/60 ring-2 ring-gold-deep",
    correct: "bg-teal-100 ring-2 ring-teal-600",
    wrong: "bg-ruby-soft ring-2 ring-ruby",
  }[state];
  const dot = {
    idle: "bg-paper-2 text-slate",
    selected: "bg-slate text-gold",
    correct: "bg-teal-600 text-white",
    wrong: "bg-ruby text-white",
  }[state];
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={state === "selected"}
      className={`flex w-full items-center gap-3.5 rounded-2xl px-3 py-3 text-left ring-1 transition disabled:cursor-default ${box}`}
    >
      <span className={`grid size-9 shrink-0 place-items-center rounded-full font-display ${dot}`}>
        {state === "correct" ? (
          <IconCheck className="size-4" />
        ) : state === "wrong" ? (
          <IconClose className="size-4" />
        ) : (
          letter
        )}
      </span>
      <span className="flex-1 leading-snug text-slate">{children}</span>
      {state === "correct" && <span className="sr-only">Jawaban benar</span>}
      {state === "wrong" && <span className="sr-only">Jawaban salah</span>}
    </button>
  );
}

/** Kartu penjelasan X-Ray Kesalahan dari AI. */
export function XRayCard({
  yourAnswer,
  correctAnswer,
  misconception,
  explanation,
  subtopic,
}: {
  yourAnswer: ReactNode;
  correctAnswer: ReactNode;
  misconception: ReactNode;
  explanation: ReactNode;
  subtopic?: string;
}) {
  return (
    <section className="overflow-hidden rounded-2xl bg-paper shadow-[0_22px_44px_-30px_rgba(8,17,58,0.65)] ring-1 ring-paper-line">
      <header className="flex items-center justify-between gap-3 bg-gradient-to-r from-night-900 to-night-700 px-5 py-3.5">
        <p className="font-display text-paper">X-Ray Kesalahan</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-gold ring-1 ring-gold/40">
          <FourStar size={10} /> Didukung AI
        </span>
      </header>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-ruby-soft px-3 py-2.5">
            <p className="text-[11px] font-bold tracking-wide text-ruby uppercase">Jawabanmu</p>
            <p className="mt-0.5 text-slate">{yourAnswer}</p>
          </div>
          <div className="rounded-xl bg-teal-100 px-3 py-2.5">
            <p className="text-[11px] font-bold tracking-wide text-teal-800 uppercase">
              Seharusnya
            </p>
            <p className="mt-0.5 text-slate">{correctAnswer}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-gold-deep uppercase">
            Letak miskonsepsi
          </p>
          <p className="mt-1 font-display text-lg leading-snug text-slate">{misconception}</p>
        </div>
        <p className="leading-relaxed text-slate-mute">{explanation}</p>
        {subtopic && (
          <p className="border-t border-paper-line pt-3 text-xs font-bold text-slate-mute">
            Masuk ke peta kelemahan: <span className="text-slate">{subtopic}</span>
          </p>
        )}
      </div>
    </section>
  );
}
