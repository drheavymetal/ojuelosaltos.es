// Helpers compartidos por las Functions públicas (solo lectura).
// Fichero con prefijo _ → el router de Pages lo ignora como ruta.

export const LANGS = ["es", "en", "pt", "fr", "de", "gl", "ca", "eu", "ast"] as const;
export type Lang = (typeof LANGS)[number];

export type NewsContent = Record<string, { title?: string; body?: string }>;

export function normLang(raw: string | null): Lang {
  const l = (raw || "es").toLowerCase();
  return (LANGS as readonly string[]).includes(l) ? (l as Lang) : "es";
}

export function normSite(raw: string | null): "pueblo" | "asociacion" | null {
  return raw === "pueblo" || raw === "asociacion" ? raw : null;
}

/** Devuelve título/cuerpo en `lang`, cayendo a castellano campo a campo. */
export function resolve(contentJson: string, lang: Lang) {
  let c: NewsContent = {};
  try {
    c = JSON.parse(contentJson) as NewsContent;
  } catch {
    /* contenido corrupto → vacío */
  }
  const es = c.es || {};
  const cur = c[lang] || {};
  return {
    title: (cur.title && cur.title.trim()) || es.title || "",
    body: (cur.body && cur.body.trim()) || es.body || "",
  };
}

/** Entradilla de texto plano a partir de cuerpo Markdown/HTML. */
export function excerpt(body: string, max = 180): string {
  const plain = body
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~\-]+/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

export function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60",
      ...(init.headers || {}),
    },
  });
}
