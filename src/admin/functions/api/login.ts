import {
  type Env,
  verifyPassword,
  signJwt,
  sessionCookie,
  jsonResponse,
} from "../_auth";

// Hash ficticio (válido pero imposible de acertar) para verificar siempre y no filtrar por timing.
const DUMMY_HASH =
  "pbkdf2$100000$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

// POST /api/login  { email, password }
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, msg: "json inválido" }, { status: 400 });
  }
  const email = (body.email || "").toLowerCase().trim();
  const password = body.password || "";
  if (!email || !password) {
    return jsonResponse({ ok: false, msg: "faltan credenciales" }, { status: 400 });
  }

  const user = await env.DB.prepare(
    `SELECT email, pass_hash FROM admin_users WHERE email = ?1`,
  )
    .bind(email)
    .first<{ email: string; pass_hash: string }>();

  // Verifica siempre (aunque no exista el usuario) para no filtrar por timing.
  const ok = await verifyPassword(password, user?.pass_hash || DUMMY_HASH);
  if (!user || !ok) {
    return jsonResponse({ ok: false, msg: "credenciales incorrectas" }, { status: 401 });
  }

  const token = await signJwt(user.email, env.SESSION_SECRET);
  return jsonResponse(
    { ok: true, data: { email: user.email } },
    { headers: { "set-cookie": sessionCookie(token) } },
  );
};
