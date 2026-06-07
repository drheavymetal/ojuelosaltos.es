import { type Env, hashPassword, jsonResponse } from "../_auth";

// POST /api/setup  { token, email, password }
// Crea el PRIMER admin. Solo funciona si no hay admins y el token coincide con SETUP_TOKEN.
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { token?: string; email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, msg: "json inválido" }, { status: 400 });
  }
  const { token, email, password } = body;
  if (!token || !email || !password) {
    return jsonResponse({ ok: false, msg: "faltan campos" }, { status: 400 });
  }
  if (!env.SETUP_TOKEN || token !== env.SETUP_TOKEN) {
    return jsonResponse({ ok: false, msg: "token de setup inválido" }, { status: 403 });
  }
  if (password.length < 10) {
    return jsonResponse({ ok: false, msg: "contraseña mínima 10 caracteres" }, { status: 400 });
  }

  const count = await env.DB.prepare(`SELECT COUNT(*) AS n FROM admin_users`).first<{ n: number }>();
  if (count && count.n > 0) {
    return jsonResponse({ ok: false, msg: "ya existe un admin" }, { status: 409 });
  }

  const hash = await hashPassword(password);
  await env.DB.prepare(`INSERT INTO admin_users (email, pass_hash) VALUES (?1, ?2)`)
    .bind(email.toLowerCase().trim(), hash)
    .run();

  return jsonResponse({ ok: true });
};
