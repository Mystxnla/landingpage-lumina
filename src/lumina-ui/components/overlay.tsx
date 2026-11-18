import { useEffect, useRef, type ReactNode } from "react";
import { FourStar } from "../art/shapes";
import { Button } from "./base";

/** Jendela dialog bergaya popup game, memakai elemen <dialog> bawaan. */
export function Dialog({
  open,
  onClose,
  title,
  children,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  /** Isi null untuk menyembunyikan tombol batal. */
  cancelLabel?: string | null;
  onConfirm?: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(92vw,460px)] rounded-2xl bg-transparent p-0 backdrop:bg-night-950/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative rounded-2xl bg-paper px-7 pt-6 pb-7 text-center shadow-2xl">
        <span
          className="pointer-events-none absolute inset-[5px] rounded-[12px] border border-paper-line"
          aria-hidden="true"
        />
        <h2 className="relative font-display text-xl text-slate">{title}</h2>
        <div
          className="relative mx-auto my-4 flex items-center gap-3 text-gold-deep"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-paper-line" />
          <FourStar size={10} />
          <span className="h-px flex-1 bg-paper-line" />
        </div>
        <div className="relative leading-relaxed text-slate-mute">{children}</div>
        <div className="relative mt-7 flex flex-wrap justify-center gap-3">
          {cancelLabel !== null && (
            <Button icon="cancel" size="sm" variant="ghost-dark" onClick={onClose}>
              {cancelLabel}
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}

/** Pita pemberitahuan di tengah layar, misalnya "Bintang baru didapat". */
export function Notice({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={`relative overflow-hidden bg-gradient-to-r from-transparent via-night-950/85 to-transparent px-10 py-4 text-center ${className}`}
    >
      <span
        className="absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        aria-hidden="true"
      />
      <span
        className="absolute inset-x-[12%] bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        aria-hidden="true"
      />
      <p className="flex items-center justify-center gap-2 font-display text-lg text-gold">
        <FourStar size={12} /> {title} <FourStar size={12} />
      </p>
      {children && <p className="mt-1 text-sm text-sky-100/85">{children}</p>}
    </div>
  );
}
