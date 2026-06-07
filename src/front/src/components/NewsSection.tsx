import { useEffect, useState } from "react";
import { Reveal, Kicker } from "./ui";
import { H2 } from "../shared";
import { useT, useLang } from "../i18n";

type NewsItem = {
  id: number;
  site: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string | null;
  hasImage: boolean;
};
type NewsDetail = NewsItem & { body: string };

/** Markdown mínimo y seguro: escapa HTML y aplica negrita, cursiva, enlaces y párrafos. */
function mdToHtml(src: string): string {
  const esc = src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const inline = (s: string) =>
    s
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>',
      );
  return esc
    .split(/\n{2,}/)
    .map((p) => `<p>${inline(p.trim()).replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

function formatDate(iso: string | null, htmlLang: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(htmlLang, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleDateString("es");
  }
}

export default function NewsSection({ site }: { site: "pueblo" | "asociacion" }) {
  const t = useT();
  const { lang } = useLang();
  const n = site === "pueblo" ? t.news.pueblo : t.news.asoc;
  const htmlLang = t.meta.htmlLang;

  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [open, setOpen] = useState<NewsDetail | null>(null);

  useEffect(() => {
    let alive = true;
    setItems(null);
    fetch(`/api/news?site=${site}&lang=${lang}`)
      .then((r) => r.json())
      .then((res) => {
        if (alive) setItems(res.ok ? res.data : []);
      })
      .catch(() => alive && setItems([]));
    return () => {
      alive = false;
    };
  }, [site, lang]);

  const openDetail = (id: number) => {
    fetch(`/api/news/${id}?lang=${lang}`)
      .then((r) => r.json())
      .then((res) => res.ok && setOpen(res.data));
  };

  return (
    <section id="noticias" className="bg-paper px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
      <div className="mx-auto w-[min(1140px,92vw)]">
        <Reveal>
          <Kicker>{t.news.nav}</Kicker>
          <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>{n.h2}</h2>
          <p className="mb-11 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">
            {n.intro}
          </p>
        </Reveal>

        {items === null ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy>
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-cream2/60" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <Reveal className="rounded-2xl border border-dashed border-almagre/25 bg-cream px-6 py-16 text-center">
            <p className="text-[clamp(1.05rem,1.8vw,1.2rem)] text-inksoft">{t.news.empty}</p>
          </Reveal>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => (
              <Reveal
                key={it.id}
                delay={i * 60}
                as="article"
                className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-cream shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
              >
                {it.hasImage && (
                  <button
                    onClick={() => openDetail(it.id)}
                    className="block aspect-[16/10] w-full overflow-hidden bg-cream2"
                    aria-label={it.title}
                  >
                    <img
                      src={`/api/news/${it.id}/image`}
                      alt={it.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </button>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {it.date && (
                    <time className="mb-2 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-albero">
                      {formatDate(it.date, htmlLang)}
                    </time>
                  )}
                  <h3 className="mb-2 font-serif text-xl text-ink">{it.title}</h3>
                  <p className="mb-5 text-[0.96rem] text-inksoft">{it.excerpt}</p>
                  <button
                    onClick={() => openDetail(it.id)}
                    className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-verde transition hover:text-verde-dark"
                  >
                    {t.news.readMore}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpen(null)}
        >
          <article
            className="my-auto w-[min(720px,100%)] overflow-hidden rounded-2xl bg-paper shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {open.hasImage && (
              <img
                src={`/api/news/${open.id}/image`}
                alt={open.title}
                className="max-h-[42vh] w-full object-cover"
              />
            )}
            <div className="p-7 sm:p-9">
              <button
                onClick={() => setOpen(null)}
                className="mb-4 text-sm font-semibold text-verde transition hover:text-verde-dark"
              >
                {t.news.back}
              </button>
              {open.date && (
                <time className="mb-2 block text-[0.78rem] font-bold uppercase tracking-[0.1em] text-albero">
                  {formatDate(open.date, htmlLang)}
                </time>
              )}
              <h2 className={`${H2} mb-5 text-ink`}>{open.title}</h2>
              <div
                className="rich space-y-4 leading-[1.8] text-inksoft"
                dangerouslySetInnerHTML={{ __html: mdToHtml(open.body) }}
              />
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
