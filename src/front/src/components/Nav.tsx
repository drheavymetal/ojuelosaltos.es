import { useEffect, useState, type ReactNode } from "react";
import { LanguageSwitcher } from "../i18n";

export type NavLink = { href: string; label: string };
export type NavCta = { href: string; label: string; external?: boolean };

export default function Nav({
  brand,
  links,
  cta,
}: {
  brand: { logo: ReactNode; title: string; subtitle: string; href?: string };
  links: NavLink[];
  cta: NavCta;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaRel = cta.external ? "noopener" : undefined;
  const ctaTarget = cta.external ? "_blank" : undefined;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 transition-all duration-300 sm:px-8 ${
        scrolled || open
          ? "border-b border-black/10 bg-cream py-2 shadow-sm"
          : "py-3"
      }`}
    >
      <a href={brand.href ?? "#inicio"} className="flex items-center gap-2.5">
        {brand.logo}
        <span className="flex flex-col leading-none">
          <strong className="font-serif text-lg text-ink">{brand.title}</strong>
          <small className="text-[0.72rem] uppercase tracking-[0.14em] text-almagre">
            {brand.subtitle}
          </small>
        </span>
      </a>

      <nav className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[0.95rem] font-medium text-ink transition-colors hover:text-verde"
          >
            {l.label}
          </a>
        ))}
        <LanguageSwitcher />
        <a
          href={cta.href}
          target={ctaTarget}
          rel={ctaRel}
          className="rounded-full bg-verde px-4 py-2 font-semibold text-white transition-colors hover:bg-verde-dark"
        >
          {cta.label}
        </a>
      </nav>

      <div className="flex items-center gap-2 md:hidden">
        <LanguageSwitcher />
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
        >
        <span className={`h-[2.5px] w-7 rounded bg-ink transition-all duration-300 ${open ? "translate-y-[7.5px] rotate-45" : ""}`} />
        <span className={`h-[2.5px] w-7 rounded bg-ink transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`h-[2.5px] w-7 rounded bg-ink transition-all duration-300 ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[55] flex flex-col bg-cream transition-all duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-2">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
              className={`font-serif text-3xl text-ink transition-all duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={cta.href}
            target={ctaTarget}
            rel={ctaRel}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${links.length * 50}ms` : "0ms" }}
            className={`mt-6 rounded-full bg-verde px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
          >
            {cta.label}
          </a>
        </nav>
        <p className="pb-10 text-center text-sm tracking-wide text-inksoft">
          Ojuelos Altos · Fuente Obejuna
        </p>
      </div>
    </header>
  );
}
