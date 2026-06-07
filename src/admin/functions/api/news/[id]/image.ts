import { type Env, requireAuth, jsonResponse } from "../../../_auth";

const MAX_BYTES = 1_500_000; // ~1,5 MB (la imagen ya viene reescalada del cliente)
const OK_MIME = ["image/jpeg", "image/png", "image/webp"];

function b64encode(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  const CH = 0x8000;
  for (let i = 0; i < bytes.length; i += CH) {
    bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + CH)));
  }
  return btoa(bin);
}
function b64decode(s: string): Uint8Array {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// GET /api/news/:id/image  → preview en el admin (incluye borradores). Requiere sesión.
export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  try {
    await requireAuth(request, env);
  } catch (r) {
    return r as Response;
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) return new Response("bad id", { status: 400 });
  const row = await env.DB.prepare(`SELECT mime, data FROM news_image WHERE news_id = ?1`)
    .bind(id)
    .first<{ mime: string; data: string }>();
  if (!row) return new Response("not found", { status: 404 });
  return new Response(b64decode(row.data), {
    headers: { "content-type": row.mime || "image/jpeg", "cache-control": "no-store" },
  });
};

// PUT /api/news/:id/image  (body binario, content-type = mime) → guarda imagen.
export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  try {
    await requireAuth(request, env);
  } catch (r) {
    return r as Response;
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) return jsonResponse({ ok: false, msg: "id inválido" }, { status: 400 });

  const exists = await env.DB.prepare(`SELECT 1 FROM news WHERE id = ?1`).bind(id).first();
  if (!exists) return jsonResponse({ ok: false, msg: "noticia no encontrada" }, { status: 404 });

  const mime = (request.headers.get("content-type") || "").split(";")[0].trim();
  if (!OK_MIME.includes(mime)) {
    return jsonResponse({ ok: false, msg: "tipo de imagen no admitido" }, { status: 415 });
  }
  const buf = await request.arrayBuffer();
  if (buf.byteLength === 0 || buf.byteLength > MAX_BYTES) {
    return jsonResponse({ ok: false, msg: "imagen vacía o demasiado grande" }, { status: 413 });
  }

  await env.DB.prepare(
    `INSERT INTO news_image (news_id, mime, data) VALUES (?1, ?2, ?3)
     ON CONFLICT(news_id) DO UPDATE SET mime = excluded.mime, data = excluded.data`,
  )
    .bind(id, mime, b64encode(buf))
    .run();
  await env.DB.prepare(`UPDATE news SET has_image = 1 WHERE id = ?1`).bind(id).run();

  return jsonResponse({ ok: true });
};

// DELETE /api/news/:id/image
export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  try {
    await requireAuth(request, env);
  } catch (r) {
    return r as Response;
  }
  const id = Number(params.id);
  if (!Number.isInteger(id)) return jsonResponse({ ok: false, msg: "id inválido" }, { status: 400 });
  await env.DB.prepare(`DELETE FROM news_image WHERE news_id = ?1`).bind(id).run();
  await env.DB.prepare(`UPDATE news SET has_image = 0 WHERE id = ?1`).bind(id).run();
  return jsonResponse({ ok: true });
};
