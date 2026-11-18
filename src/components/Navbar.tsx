import { FourStar, IconClose, IconMenu, RoundIconButton } from "@/lumina-ui";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/config";
import { CtaButton } from "./CtaButton";

export const NAV_LINKS = [
  { href: "#fitur", label: "Fitur" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#tentang", label: "Tentang" },
  { href: "#faq", label: "FAQ" },
];

export function Logo({ className = "", dark }: { className?: string; dark?: boolean }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <FourStar size={22} className="text-gold" />
      <span className={`font-display text-2xl tracking-wide ${dark ? "text-slate" : "text-paper"}`}>
        {APP_NAME}
      </span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night-950/55 backdrop-blur-md">
      <nav
        className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-4 px-5"
        aria-label="Navigasi utama"
      >
        <a
          href="#"
          className="flex min-h-11 items-center"
          aria-label={`${APP_NAME}, ke atas halaman`}
        >
          <Logo />
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="inline-flex min-h-11 items-center px-4 font-display text-[15px] text-paper/85 transition hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <CtaButton />
          <RoundIconButton
            tone="dark"
            label={open ? "Tutup menu" : "Buka menu"}
            expanded={open}
            controls="menu-hp"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
          >
            {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </RoundIconButton>
        </div>
      </nav>

      {open && (
        <div
          id="menu-hp"
          className="border-t border-white/10 bg-night-950/95 px-5 pt-2 pb-5 md:hidden"
        >
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center gap-3 border-b border-white/10 font-display text-lg text-paper"
                >
                  <FourStar size={10} className="text-gold" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
