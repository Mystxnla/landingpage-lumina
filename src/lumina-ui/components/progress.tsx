import type { ReactNode } from "react";
import { FourStar } from "../art/shapes";
import { IconCheck, IconLock, IconStar } from "../icons";

/** Bar kemajuan, misalnya bar kampus atau XP bab. */
export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  tone = "teal",
  className = "",
}: {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  tone?: "teal" | "gold";
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill =
    tone === "teal" ? "from-teal-400 to-teal-600" : "from-gold-soft via-gold to-gold-deep";
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-slate-mute">
          {label && <span>{label}</span>}
          {showValue && (
            <span className="text-slate">
              {value} / {max}
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className="relative h-2.5 overflow-hidden rounded-full bg-white ring-1 ring-paper-line"
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-[width] duration-500 ${fill}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** Bintang hasil (misalnya 0 sampai 3 bintang per pulau). */
export function StarRating({
  value,
  max = 3,
  size = "md",
  className = "",
}: {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const s = { sm: "size-4", md: "size-6", lg: "size-9" }[size];
  return (
    <span
      className={`inline-flex gap-0.5 ${className}`}
      role="img"
      aria-label={`${value} dari ${max} bintang`}
    >
      {Array.from({ length: max }, (_, i) => (
        <IconStar
          key={i}
          filled={i < value}
          className={`${s} ${i < value ? "text-gold drop-shadow-[0_1px_2px_rgba(155,116,37,0.6)]" : "text-paper-line"}`}
        />
      ))}
    </span>
  );
}

/** Angka kecil dengan ikon, misalnya XP atau jumlah bintang. */
export function StatChip({
  icon,
  value,
  label,
  tone = "light",
}: {
  icon?: ReactNode;
  value: ReactNode;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex h-9 items-center gap-2 rounded-full pr-3.5 pl-1.5 text-sm font-bold ${tone === "light" ? "bg-paper-2 text-slate ring-1 ring-paper-line" : "bg-white/10 text-paper ring-1 ring-white/20"}`}
    >
      <span
        className="grid size-6 place-items-center rounded-full bg-slate text-gold"
        aria-hidden="true"
      >
        {icon ?? <FourStar size={11} />}
      </span>
      <span className="sr-only">{label}: </span>
      {value}
    </span>
  );
}

export type IslandStatus = "done" | "active" | "locked" | "soon";

const islandText: Record<IslandStatus, string> = {
  done: "Selesai",
  active: "Kamu di sini",
  locked: "Terkunci",
  soon: "Segera hadir",
};

/** Pulau di peta perjalanan dengan empat status. */
export function IslandNode({
  title,
  status,
  stars = 0,
  onClick,
}: {
  title: string;
  status: IslandStatus;
  stars?: number;
  onClick?: () => void;
}) {
  const body = {
    done: "bg-gradient-to-b from-[#9fe0d6] to-teal-600",
    active: "bg-gradient-to-b from-gold-soft to-gold ring-2 ring-gold-deep",
    locked: "bg-gradient-to-b from-paper-2 to-[#c9c2b3]",
    soon: "border border-dashed border-slate/30 bg-white/40",
  }[status];
  const interactive = onClick && (status === "done" || status === "active");
  const Tag = interactive ? "button" : "div";
  return (
    <Tag
      {...(interactive ? { type: "button" as const, onClick } : {})}
      className={`flex w-[118px] flex-col items-center text-center ${interactive ? "cursor-pointer rounded-2xl transition hover:-translate-y-0.5" : ""}`}
    >
      <span className="relative">
        {status === "active" && (
          <span
            className="absolute inset-0 rounded-[45%] bg-gold/60 anim-pulse-ring"
            aria-hidden="true"
          />
        )}
        <span
          className={`relative grid h-12 w-16 place-items-center rounded-[45%] shadow-[0_10px_14px_-8px_rgba(8,17,58,0.5)] ${body}`}
        >
          {status === "locked" ? (
            <IconLock className="size-5 text-slate-mute" />
          ) : status === "soon" ? (
            <span className="font-display text-slate-mute">?</span>
          ) : status === "active" ? (
            <FourStar size={18} className="text-slate" />
          ) : (
            <span className="flex">
              {[0, 1, 2].map((i) => (
                <IconStar
                  key={i}
                  filled={i < stars}
                  className={`size-3.5 ${i < stars ? "text-gold" : "text-white/70"}`}
                />
              ))}
            </span>
          )}
        </span>
      </span>
      <span className="mt-1.5 text-[11px] leading-tight font-bold text-slate">{title}</span>
      <span
        className={`text-[10px] font-bold ${status === "active" ? "text-gold-deep" : "text-slate-mute"}`}
      >
        {islandText[status]}
        {status === "done" && ` · ${stars}/3 bintang`}
      </span>
    </Tag>
  );
}

/** Satu tahap dalam bab (Belajar, Latsol, Review). */
export function StageRow({
  name,
  detail,
  xp,
  done,
  current,
}: {
  name: string;
  detail?: string;
  xp?: string;
  done?: boolean;
  current?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-xl bg-white/80 px-3.5 py-2.5 ring-1 ${current ? "ring-gold-deep" : "ring-paper-line"}`}
      aria-current={current ? "step" : undefined}
    >
      <div>
        <p className="text-sm font-bold text-slate">{name}</p>
        {detail && <p className="text-[11px] text-slate-mute">{detail}</p>}
      </div>
      <div className="flex items-center gap-2">
        {xp && (
          <span className="rounded-md bg-gold-soft px-1.5 py-1 text-[10px] font-bold whitespace-nowrap text-gold-deep">
            {xp}
          </span>
        )}
        <span
          className={`grid size-6 place-items-center rounded-full ${done ? "bg-teal-600 text-white" : "border border-dashed border-slate/40"}`}
        >
          {done && <IconCheck className="size-3.5" />}
          <span className="sr-only">{done ? "Selesai" : "Belum selesai"}</span>
        </span>
      </div>
    </div>
  );
}
