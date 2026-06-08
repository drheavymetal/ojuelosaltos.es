import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type ElementType,
} from "react";
import { es, type Dict } from "./locales/es";
import { en } from "./locales/en";
import { pt } from "./locales/pt";
import { fr } from "./locales/fr";
import { de } from "./locales/de";
import { gl } from "./locales/gl";
import { ca } from "./locales/ca";
import { eu } from "./locales/eu";
import { ast } from "./locales/ast";
import { nl } from "./locales/nl";
import { ja } from "./locales/ja";
import { zh } from "./locales/zh";

export type Lang =
  | "es"
  | "en"
  | "pt"
  | "fr"
  | "de"
  | "nl"
  | "ja"
  | "zh"
  | "gl"
  | "ca"
  | "eu"
  | "ast";

// Orden del selector: castellano primero, luego internacionales, luego lenguas de España.
export const LANG_ORDER: Lang[] = [
  "es",
  "en",
  "pt",
  "fr",
  "de",
  "nl",
  "ja",
  "zh",
  "gl",
  "ca",
  "eu",
  "ast",
];

export const DICTS: Record<Lang, Dict> = { es, en, pt, fr, de, nl, ja, zh, gl, ca, eu, ast };

const STORAGE_KEY = "oa_lang";

/** Idioma por defecto: el castellano vive en la URL "limpia" (sin ?lang) y es el x-default. */
export const DEFAULT_LANG: Lang = "es";

/** URL canónica de un sitio en un idioma dado. El idioma por defecto no lleva query. */
export function langHref(base: string, l: Lang): string {
  return l === DEFAULT_LANG ? base : `${base}?lang=${l}`;
}

/** Idioma indicado por ?lang= en la URL, si es válido. */
function langFromQuery(): Lang | null {
  if (typeof window === "undefined") return null;
  const q = new URLSearchParams(window.location.search).get("lang");
  return q && LANG_ORDER.includes(q as Lang) ? (q as Lang) : null;
}

/** Refleja el idioma activo en la URL (?lang=xx; sin query para el idioma por defecto) sin recargar. */
function syncUrlLang(l: Lang) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (l === DEFAULT_LANG) url.searchParams.delete("lang");
  else url.searchParams.set("lang", l);
  if (url.href !== window.location.href) {
    window.history.replaceState(null, "", url.href);
  }
}

/** Elige idioma inicial: ?lang= en la URL → elección guardada → idioma del navegador → castellano. */
function detectLang(): Lang {
  const fromQuery = langFromQuery();
  if (fromQuery) return fromQuery;
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && LANG_ORDER.includes(saved)) return saved;
  } catch {
    /* localStorage no disponible */
  }
  if (typeof navigator !== "undefined") {
    const cands = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    for (const c of cands) {
      const code = c.toLowerCase().split("-")[0] as Lang;
      if (LANG_ORDER.includes(code)) return code;
    }
  }
  return DEFAULT_LANG;
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Detecta en cliente tras montar (evita desajustes en SSR/primer render).
  useEffect(() => {
    const l = detectLang();
    setLangState(l);
    syncUrlLang(l); // URL, idioma y canónica quedan coherentes desde el primer render.
  }, []);

  useEffect(() => {
    document.documentElement.lang = DICTS[lang].meta.htmlLang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    syncUrlLang(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* localStorage no disponible */
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  return ctx;
}

/** Diccionario del idioma activo. */
export function useT(): Dict {
  return useLanguage().t;
}

export function useLang() {
  const { lang, setLang } = useLanguage();
  return { lang, setLang };
}

/** Renderiza prosa con HTML interno (énfasis estilado por .rich en index.css). */
export function Rich({
  html,
  as: Tag = "p",
  className = "",
}: {
  html: string;
  as?: ElementType;
  className?: string;
}) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

const GlobeIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />
  </svg>
);

/** Selector de idioma: botón con globo + menú de nombres nativos. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-lang-switcher]")) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div data-lang-switcher className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={DICTS[lang].meta.switchLabel}
        className="flex items-center gap-1.5 rounded-full border border-black/15 bg-paper/70 px-3 py-1.5 text-sm font-semibold text-ink transition hover:border-verde hover:text-verde"
      >
        <GlobeIcon className="h-[1.05rem] w-[1.05rem]" />
        <span className="hidden sm:inline">{DICTS[lang].meta.name}</span>
        <span className="sm:hidden">{lang.toUpperCase()}</span>
        <span className={`text-[0.6rem] transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      <ul
        role="listbox"
        className={`absolute right-0 z-[70] mt-2 max-h-[70vh] w-48 overflow-auto rounded-2xl border border-black/10 bg-paper p-1.5 shadow-xl ring-1 ring-black/5 transition-all duration-150 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {LANG_ORDER.map((l) => (
          <li key={l} role="option" aria-selected={l === lang}>
            <button
              type="button"
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-cream ${
                l === lang ? "font-semibold text-verde" : "text-ink"
              }`}
            >
              <span>{DICTS[l].meta.name}</span>
              {l === lang && <span aria-hidden>✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
