import { type Env, requireAuth, jsonResponse } from "../../_auth";

const SITES = ["pueblo", "asociacion"];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^\x00-\x7F]/g, "") // quita marcas diacríticas (y cualquier no-ASCII)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// GET /api/news?site=&status=  → todas (borradores incluidos), para el grid del admin.
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try {
    await requireAuth(request, env);
  } catch (r) {
    return r as Response;
  }
  const url = new URL(request.url);
  const site = url.searchParams.get("site");
  const status = url.searchParams.get("status");

  let sql = `SELECT id, site, slug, content, has_image, status, published_at, updated_at FROM news WHERE 1=1`;
  const binds: unknown[] = [];
  if (site && SITES.includes(site)) {
    binds.push(site);
    sql += ` AND site = ?${binds.length}`;
  }
  if (status === "draft" || status === "published") {
    binds.push(status);
    sql += ` AND status = ?${binds.length}`;
  }
  sql += ` ORDER BY COALESCE(published_at, updated_at) DESC`;

  const { results } = await env.DB.prepare(sql).bind(...binds).all<{
    id: number;
    site: string;
    slug: string;
    content: string;
    has_image: number;
    status: string;
    published_at: string | null;
    updated_at: string;
  }>();

  const items = (results || []).map((r) => {
    let title = "";
    try {
      title = (JSON.parse(r.content).es?.title as string) || "";
    } catch {
      /* corrupto */
    }
    return {
      id: r.id,
      site: r.site,
      slug: r.slug,
      title,
      status: r.status,
      hasImage: !!r.has_image,
      publishedAt: r.published_at,
      updatedAt: r.updated_at,
    };
  });
  return jsonResponse({ ok: true, data: items });
};

// POST /api/news  { site, slug?, content, status }  → crea noticia.
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    await requireAuth(request, env);
  } catch (r) {
    return r as Response;
  }
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

  const site = body.site;
  if (!site || !SITES.includes(site)) {
    return jsonResponse({ ok: false, msg: "site inválido" }, { status: 400 });
  }
  const content = body.content || {};
  const esTitle = content.es?.title?.trim();
  if (!esTitle) {
    return jsonResponse(
      { ok: false, msg: "el título en castellano es obligatorio" },
      { status: 400 },
    );
  }
  const status = body.status === "published" ? "published" : "draft";
  let slug = (body.slug || "").trim() ? slugify(body.slug!) : slugify(esTitle);
  if (!slug) slug = "noticia";

  // slug único por sitio: añade sufijo si choca.
  const base = slug;
  for (let i = 2; i < 50; i++) {
    const clash = await env.DB.prepare(`SELECT 1 FROM news WHERE site = ?1 AND slug = ?2`)
      .bind(site, slug)
      .first();
    if (!clash) break;
    slug = `${base}-${i}`;
  }

  const now = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  const publishedAt = status === "published" ? now : null;

  const res = await env.DB.prepare(
    `INSERT INTO news (site, slug, content, status, published_at, created_at, updated_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)`,
  )
    .bind(site, slug, JSON.stringify(content), status, publishedAt, now)
    .run();

  return jsonResponse({ ok: true, data: { id: res.meta.last_row_id, slug } });
};
