import { normLang, normSite, resolve, excerpt, json } from "../_shared";

interface Env {
  DB: D1Database;
}

// GET /api/news?site=pueblo|asociacion&lang=xx&limit=20
// Lista de noticias PUBLICADAS de un sitio, en el idioma pedido (fallback es).
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const site = normSite(url.searchParams.get("site"));
  if (!site) return json({ ok: false, msg: "site inválido" }, { status: 400 });
  const lang = normLang(url.searchParams.get("lang"));
  const limit = Math.min(Number(url.searchParams.get("limit")) || 30, 60);

  const { results } = await env.DB.prepare(
    `SELECT id, site, slug, content, has_image, published_at
       FROM news
      WHERE site = ?1 AND status = 'published'
      ORDER BY published_at DESC
      LIMIT ?2`,
  )
    .bind(site, limit)
    .all<{
      id: number;
      site: string;
      slug: string;
      content: string;
      has_image: number;
      published_at: string | null;
    }>();

  const items = (results || []).map((r) => {
    const { title, body } = resolve(r.content, lang);
    return {
      id: r.id,
      site: r.site,
      slug: r.slug,
      title,
      excerpt: excerpt(body),
      date: r.published_at,
      hasImage: !!r.has_image,
    };
  });

  return json({ ok: true, data: items });
};
