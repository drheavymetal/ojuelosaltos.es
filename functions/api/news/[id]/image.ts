interface Env {
  DB: D1Database;
}

function b64decode(s: string): Uint8Array {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// GET /api/news/:id/image — sirve la imagen de una noticia publicada.
export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return new Response("bad id", { status: 400 });

  const row = await env.DB.prepare(
    `SELECT i.mime AS mime, i.data AS data
       FROM news_image i
       JOIN news n ON n.id = i.news_id
      WHERE i.news_id = ?1 AND n.status = 'published'`,
  )
    .bind(id)
    .first<{ mime: string; data: string }>();

  if (!row || !row.data) return new Response("not found", { status: 404 });

  return new Response(b64decode(row.data), {
    headers: {
      "content-type": row.mime || "image/jpeg",
      "cache-control": "public, max-age=86400",
    },
  });
};
