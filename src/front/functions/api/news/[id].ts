import { normLang, resolve, json } from "../../_shared";

interface Env {
  DB: D1Database;
}

// GET /api/news/:id?lang=xx — detalle de una noticia publicada.
export const onRequestGet: PagesFunction<Env> = async ({ params, request, env }) => {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return json({ ok: false, msg: "id inválido" }, { status: 400 });
  const lang = normLang(new URL(request.url).searchParams.get("lang"));

  const row = await env.DB.prepare(
    `SELECT id, site, slug, content, has_image, published_at
       FROM news
      WHERE id = ?1 AND status = 'published'`,
  )
    .bind(id)
    .first<{
      id: number;
      site: string;
      slug: string;
      content: string;
      has_image: number;
      published_at: string | null;
    }>();

  if (!row) return json({ ok: false, msg: "no encontrada" }, { status: 404 });

  const { title, body } = resolve(row.content, lang);
  return json({
    ok: true,
    data: {
      id: row.id,
      site: row.site,
      slug: row.slug,
      title,
      body,
      date: row.published_at,
      hasImage: !!row.has_image,
    },
  });
};
