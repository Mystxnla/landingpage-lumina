import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { IconMinus, IconPlus } from "../icons";

/** Kolom isian dengan label, misalnya untuk layar Masuk. */
export function TextField({
  label,
  hint,
  error,
  className = "",
  ...input
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-slate">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`h-12 w-full rounded-xl bg-paper px-4 text-slate ring-1 transition outline-none placeholder:text-slate-mute/70 focus:ring-2 ${error ? "ring-ruby focus:ring-ruby" : "ring-paper-line focus:ring-gold-deep"}`}
        {...input}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-bold text-ruby">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-mute">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

/** Tab pil untuk berpindah tampilan, misalnya Belajar, Latsol, Review. */
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
}: {
  tabs: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex rounded-full bg-paper-2 p-1 ring-1 ring-paper-line"
    >
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={`h-9 rounded-full px-4 font-display text-sm transition ${active ? "bg-slate text-paper shadow" : "text-slate-mute hover:text-slate"}`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

/** Satu baris tanya-jawab yang bisa dibuka dan ditutup. */
export function AccordionItem({
  question,
  children,
  open,
  onToggle,
}: {
  question: string;
  children: ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <div
      className={`rounded-2xl bg-paper px-6 py-3 shadow-[0_12px_30px_-24px_rgba(8,17,58,0.6)] ring-1 transition ${open ? "ring-gold-deep" : "ring-paper-line"}`}
    >
      <h3 className="font-sans">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex min-h-12 w-full items-center justify-between gap-4 text-left"
        >
          <span className="font-display text-lg text-slate sm:text-xl">{question}</span>
          <span
            className={`grid size-10 shrink-0 place-items-center rounded-full ring-1 transition ${open ? "bg-slate text-gold ring-slate" : "bg-paper-2 text-slate ring-paper-line"}`}
            aria-hidden="true"
          >
            {open ? <IconMinus className="size-4" /> : <IconPlus className="size-4" />}
          </span>
        </button>
      </h3>
      <div id={id} hidden={!open} className="pt-2 pb-2 sm:pr-12">
        <div className="leading-relaxed text-slate-mute">{children}</div>
      </div>
    </div>
  );
}
