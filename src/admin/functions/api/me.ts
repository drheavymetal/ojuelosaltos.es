import { type Env, getSession, jsonResponse } from "../_auth";

// GET /api/me  → { email } si hay sesión; también indica si falta el primer admin (needsSetup).
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const email = await getSession(request, env);
  if (email) return jsonResponse({ ok: true, data: { email } });

  const count = await env.DB.prepare(`SELECT COUNT(*) AS n FROM admin_users`).first<{ n: number }>();
  return jsonResponse({ ok: false, data: { needsSetup: !count || count.n === 0 } });
};
