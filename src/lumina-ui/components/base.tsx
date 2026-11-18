import type { ReactNode } from "react";
import { FourStar } from "../art/shapes";
import { IconChevron } from "../icons";

/* Komponen UI mengikuti bahasa visual menu Genshin: pil krem, panel kertas, teks slate. */

/** Label untuk isi yang belum ada di PRD dan masih perlu diganti tim. */
export function PlaceholderTag({ className = "", dark }: { className?: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${dark ? "border-gold/60 text-gold" : "border-gold-deep/70 text-gold-deep"} ${className}`}
    >
      Isi sementara
    </span>
  );
}

type ButtonProps = {
  children: ReactNode;
  /** Jika diisi, tombol dirender sebagai tautan. */
  href?: string;
  variant?: "primary" | "ghost-light" | "ghost-dark";
  size?: "sm" | "md";
  /** Ikon lingkaran di kiri: cincin kuning (konfirmasi), silang biru (batal), atau tanpa ikon. */
  icon?: "confirm" | "cancel" | "none";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

/** Tombol pil dengan lingkaran ikon di kiri, seperti tombol konfirmasi di menu game. */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon = "confirm",
  type = "button",
  disabled,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "group inline-flex items-center rounded-full font-display transition duration-200 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.9),0_0_22px_rgba(255,255,255,0.55)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none";
  const sizing =
    icon === "none"
      ? size === "sm"
        ? "h-11 px-5 text-[15px]"
        : "h-14 px-8 text-lg"
      : size === "sm"
        ? "h-11 gap-2.5 pl-1.5 pr-5 text-[15px]"
        : "h-14 gap-3 pl-2 pr-7 text-lg";
  const tone = {
    primary: "bg-paper-2 text-slate shadow-[0_8px_24px_-10px_rgba(8,17,58,0.6)]",
    "ghost-light": "bg-white/10 text-paper ring-1 ring-paper/50 backdrop-blur-sm",
    "ghost-dark": "bg-white/60 text-slate ring-1 ring-slate/25",
  }[variant];
  const dot = size === "sm" ? "size-8" : "size-10";
  const dotBg =
    variant === "primary" ? "bg-slate" : variant === "ghost-light" ? "bg-paper/15" : "bg-slate/10";
  const content = (
    <>
      {icon !== "none" && (
        <span
          className={`grid ${dot} shrink-0 place-items-center rounded-full ${dotBg}`}
          aria-hidden="true"
        >
          {icon === "confirm" ? (
            <span
              className={`rounded-full border-[2.5px] ${size === "sm" ? "size-3.5" : "size-4.5"} ${variant === "ghost-dark" ? "border-slate" : "border-gold"}`}
            />
          ) : (
            <svg viewBox="0 0 12 12" className={size === "sm" ? "size-3" : "size-3.5"}>
              <path
                d="M2 2l8 8M10 2l-8 8"
                stroke="#6fb3ff"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      )}
      {children}
    </>
  );
  const cls = `${base} ${sizing} ${tone} ${className}`;
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}

/** Tombol bulat polos untuk ikon. */
export function RoundIconButton({
  children,
  label,
  onClick,
  href,
  expanded,
  controls,
  disabled,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  expanded?: boolean;
  controls?: string;
  disabled?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const cls = `grid size-11 shrink-0 place-items-center rounded-full transition disabled:opacity-35 ${
    tone === "light"
      ? "bg-paper-2 text-slate hover:shadow-[0_0_0_2px_#fff,0_0_16px_rgba(255,255,255,0.6)]"
      : "bg-white/10 text-paper ring-1 ring-paper/40 hover:bg-white/20"
  } ${className}`;
  if (href) {
    return (
      <a href={href} aria-label={label} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      disabled={disabled}
      className={cls}
    >
      {children}
    </button>
  );
}

export function ArrowButton({
  direction,
  ...rest
}: {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <RoundIconButton {...rest}>
      <IconChevron className={`size-5 ${direction === "left" ? "rotate-180" : ""}`} />
    </RoundIconButton>
  );
}

/** Eyebrow kecil dengan garis tipis dan bintang. */
export function Eyebrow({
  children,
  dark,
  center,
}: {
  children: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-bold tracking-[0.32em] uppercase ${center ? "justify-center" : ""} ${dark ? "text-gold" : "text-gold-deep"}`}
    >
      <span className={`h-px w-8 ${dark ? "bg-gold/60" : "bg-gold-deep/50"}`} aria-hidden="true" />
      <FourStar size={11} />
      {children}
      <FourStar size={11} />
      <span className={`h-px w-8 ${dark ? "bg-gold/60" : "bg-gold-deep/50"}`} aria-hidden="true" />
    </p>
  );
}

/** Judul bagian. */
export function SectionTitle({
  eyebrow,
  title,
  intro,
  id,
  dark,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      {eyebrow && (
        <Eyebrow dark={dark} center={center}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        id={id}
        className={`mt-5 text-4xl leading-[1.12] sm:text-5xl lg:text-[3.5rem] ${dark ? "glow-text text-paper" : "text-slate"}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-sky-100/80" : "text-slate-mute"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** Panel kertas krem dengan garis dalam tipis. */
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl bg-paper shadow-[0_18px_40px_-28px_rgba(8,17,58,0.55)] ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-[5px] rounded-[12px] border border-paper-line/80"
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Bingkai HP. Tanpa isi, layar menampilkan penanda tangkapan layar yang menyusul. */
export function PhoneMockup({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.4rem] bg-gradient-to-b from-[#3b4a7a] to-[#1c2448] p-[7px] shadow-[0_40px_70px_-30px_rgba(8,17,58,0.85)] ring-1 ring-gold/40 ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-paper to-paper-2">
        <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-bold text-slate">
          <span>09.41</span>
          <span className="h-4 w-16 rounded-full bg-[#1c2448]" aria-hidden="true" />
          <span className="flex gap-0.5" aria-hidden="true">
            <span className="h-2 w-1 rounded-sm bg-slate/70" />
            <span className="h-2.5 w-1 rounded-sm bg-slate/70" />
            <span className="h-3 w-1 rounded-sm bg-slate/70" />
          </span>
        </div>
        {children ?? (
          <div className="absolute inset-x-5 top-14 bottom-6 grid place-items-center rounded-3xl border border-dashed border-paper-line text-center">
            <div className="px-4 text-slate-mute">
              <FourStar size={18} className="mx-auto text-gold-deep" />
              <p className="mt-2 text-xs font-bold">Tangkapan layar aplikasi</p>
              <p className="text-[11px]">menyusul</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** Pita teks berjalan yang tipis. */
export function Ticker({ items, tone = "slate" }: { items: string[]; tone?: "slate" | "paper" }) {
  const toneCls =
    tone === "slate" ? "bg-slate text-paper-2" : "bg-paper-2 text-slate border-y border-paper-line";
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden py-3.5 ${toneCls}`} aria-hidden="true">
      <div className="flex w-max anim-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0">
            {row.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center gap-7 pr-7 font-display text-[15px] tracking-[0.18em] uppercase"
              >
                {item}
                <FourStar size={12} className="text-gold-deep" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
