import type { ComponentType, ReactNode } from "react";
import { FourStar } from "../art/shapes";

export type ItemTone = "gold" | "violet" | "blue" | "teal";

const toneBg: Record<ItemTone, string> = {
  gold: "from-[#8a5c2e] via-[#c38a43] to-[#e9be6c]",
  violet: "from-[#4d3d80] via-[#7663b0] to-[#a58ad8]",
  blue: "from-[#2b4a8f] via-[#4a72c0] to-[#7ea6e6]",
  teal: "from-[#17565f] via-[#2b8f96] to-[#5fc9c2]",
};

/** Kartu bergaya kartu item: latar warna tingkatan di atas, kertas di bawah. */
export function ItemCard({
  tone = "blue",
  number,
  tag,
  icon: Icon,
  title,
  children,
  footer,
}: {
  tone?: ItemTone;
  number?: string;
  tag?: string;
  icon?: ComponentType<{ className?: string }>;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl bg-paper shadow-[0_22px_44px_-30px_rgba(8,17,58,0.65)] ring-1 ring-paper-line transition duration-300 hover:-translate-y-1">
      <div
        className={`relative h-40 overflow-hidden rounded-br-[36px] bg-gradient-to-br ${toneBg[tone]}`}
      >
        <span
          className="absolute -right-10 -bottom-16 size-48 rounded-full border border-white/25"
          aria-hidden="true"
        />
        <span
          className="absolute -right-4 -bottom-10 size-32 rounded-full border border-white/20"
          aria-hidden="true"
        />
        {number && (
          <span className="absolute top-4 left-5 font-display text-2xl text-white/75">
            {number}
          </span>
        )}
        {tag && (
          <span className="absolute top-5 right-5 text-[11px] font-bold tracking-[0.2em] text-white/85 uppercase">
            {tag}
          </span>
        )}
        {Icon && (
          <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
            <span className="absolute size-24 rounded-full bg-white/20 blur-xl" />
            <Icon className="relative size-14 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]" />
          </span>
        )}
        <FourStar size={14} className="absolute bottom-5 left-6 text-white/80" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl text-slate">{title}</h3>
        {children && <div className="mt-2.5 leading-relaxed text-slate-mute">{children}</div>}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </article>
  );
}

/** Label kecil, misalnya "Didukung AI". */
export function Badge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: "slate" | "gold" | "teal";
}) {
  const cls = {
    slate: "bg-slate text-gold",
    gold: "bg-gold-soft text-gold-deep ring-1 ring-gold-deep/30",
    teal: "bg-teal-100 text-teal-800 ring-1 ring-teal-600/30",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${cls}`}
    >
      <FourStar size={10} /> {children}
    </span>
  );
}
