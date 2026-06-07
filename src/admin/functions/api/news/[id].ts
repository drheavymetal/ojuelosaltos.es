import { type Env, requireAuth, jsonResponse } from "../../_auth";

const SITES = ["pueblo", "asociacion"];

// GET /api/news/:id  → noticia completa (todos los idiomas) para editar.
export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  try {
    await requireAuth(request, env);
  } catch (r) {
    return r as Response;
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) return jsonResponse({ ok: false, msg: "id inválido" }, { status: 400 });

  const row = await env.DB.prepare(
    `SELECT id, site, slug, content, has_image, status, published_at, created_at, updated_at
       FROM news WHERE id = ?1`,
  )
    .bind(id)
    .first<{
      id: number;
      site: string;
      slug: string;
      content: string;
      has_image: number;
      status: string;
      published_at: string | null;
      created_at: string;
      updated_at: string;
    }>();
  if (!row) return jsonResponse({ ok: false, msg: "no encontrada" }, { status: 404 });

  let content: unknown = {};
  try {
    content = JSON.parse(row.content);
  } catch {
    /* corrupto */
  }
  return jsonResponse({
    ok: true,
    data: {
      id: row.id,
      site: row.site,
      slug: row.slug,
      content,
      hasImage: !!row.has_image,
      status: row.status,
      publishedAt: row.published_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    },
  });
};

// PUT /api/news/:id  { site, slug, content, status }  → actualiza.
export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  try {
    await requireAuth(request, env);
  } catch (r) {
    return r as Response;
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) return jsonResponse({ ok: false, msg: "id inválido" }, { status: 400 });

  let body: {
    site?: string;
    slug?: string;
    content?: Record<string, { title?: string; body?: string }>;
    status?: string;
  };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, msg: "json inválido" }, { status: 400 });
  }

  const existing = await env.DB.prepare(
    `SELECT status, published_at FROM news WHERE id = ?1`,
  )
    .bind(id)
    .first<{ status: string; published_at: string | null }>();
  if (!existing) return jsonResponse({ ok: false, msg: "no encontrada" }, { status: 404 });

  const site = body.site && SITES.includes(body.site) ? body.site : null;
  if (!site) return jsonResponse({ ok: false, msg: "site inválido" }, { status: 400 });
  const content = body.content || {};
  if (!content.es?.title?.trim()) {
    return jsonResponse(
      { ok: false, msg: "el título en castellano es obligatorio" },
      { status: 400 },
    );
  }
  const status = body.status === "published" ? "published" : "draft";
  const slug = (body.slug || "").trim();
  if (!slug) return jsonResponse({ ok: false, msg: "slug requerido" }, { status: 400 });

  // unicidad de slug (excluyendo la propia)
  const clash = await env.DB.prepare(
    `SELECT 1 FROM news WHERE site = ?1 AND slug = ?2 AND id <> ?3`,
  )
    .bind(site, slug, id)
    .first();
  if (clash) return jsonResponse({ ok: false, msg: "ya existe ese slug en el sitio" }, { status: 409 });

  const now = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  // published_at: se fija al publicar por primera vez; al despublicar se conserva el valor previo.
  const publishedAt =
    status === "published" ? existing.published_at || now : existing.published_at;

  await env.DB.prepare(
    `UPDATE news SET site = ?1, slug = ?2, content = ?3, status = ?4, published_at = ?5, updated_at = ?6
      WHERE id = ?7`,
  )
    .bind(site, slug, JSON.stringify(content), status, publishedAt, now, id)
    .run();

  return jsonResponse({ ok: true });
};

// DELETE /api/news/:id
export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  try {
    await requireAuth(request, env);
  } catch (r) {
    return r as Response;
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) return jsonResponse({ ok: false, msg: "id inválido" }, { status: 400 });
  await env.DB.prepare(`DELETE FROM news_image WHERE news_id = ?1`).bind(id).run();
  await env.DB.prepare(`DELETE FROM news WHERE id = ?1`).bind(id).run();
  return jsonResponse({ ok: true });
};
