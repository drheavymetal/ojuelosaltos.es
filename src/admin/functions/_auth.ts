// Autenticación propia del backoffice (sin Cloudflare Access).
// Hash de contraseña PBKDF2-HMAC-SHA256; sesión = JWT HS256 en cookie HttpOnly.
// Fichero con prefijo _ → el router de Pages lo ignora como ruta.

export interface Env {
  DB: D1Database;
  SESSION_SECRET: string;
  SETUP_TOKEN: string;
}

const enc = new TextEncoder();
const COOKIE = "oa_session";
const PBKDF2_ITER = 100000; // máximo que admite el runtime de Cloudflare Workers

// ---- base64 / base64url ----
function bytesToB64(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function b64url(bytes: Uint8Array): string {
  return bytesToB64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlToBytes(s: string): Uint8Array {
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  return b64ToBytes(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
}

/** Comparación en tiempo constante. */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// ---- contraseñas ----
async function pbkdf2(password: string, salt: Uint8Array, iter: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" },
    key,
    256,
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITER);
  return `pbkdf2$${PBKDF2_ITER}$${bytesToB64(salt)}$${bytesToB64(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iter = parseInt(parts[1], 10);
  const salt = b64ToBytes(parts[2]);
  const expected = b64ToBytes(parts[3]);
  const got = await pbkdf2(password, salt, iter);
  return timingSafeEqual(got, expected);
}

// ---- JWT HS256 ----
async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return new Uint8Array(sig);
}

export async function signJwt(email: string, secret: string, ttlSec = 7 * 24 * 3600): Promise<string> {
  const header = b64url(enc.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const now = Math.floor(Date.now() / 1000);
  const payload = b64url(enc.encode(JSON.stringify({ sub: email, iat: now, exp: now + ttlSec })));
  const data = `${header}.${payload}`;
  const sig = b64url(await hmac(secret, data));
  return `${data}.${sig}`;
}

export async function verifyJwt(token: string, secret: string): Promise<string | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const data = `${parts[0]}.${parts[1]}`;
  const expected = await hmac(secret, data);
  const got = b64urlToBytes(parts[2]);
  if (!timingSafeEqual(got, expected)) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(parts[1])));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

// ---- cookie ----
export function sessionCookie(token: string, ttlSec = 7 * 24 * 3600): string {
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${ttlSec}`;
}
export function clearCookie(): string {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

function readCookie(request: Request, name: string): string | null {
  const raw = request.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

/** Email del admin autenticado, o null. */
export async function getSession(request: Request, env: Env): Promise<string | null> {
  const token = readCookie(request, COOKIE);
  if (!token) return null;
  return verifyJwt(token, env.SESSION_SECRET);
}

export function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init.headers || {}),
    },
  });
}

/** Guarda: exige sesión válida; si no, 401. Devuelve email o lanza Response. */
export async function requireAuth(request: Request, env: Env): Promise<string> {
  const email = await getSession(request, env);
  if (!email) throw jsonResponse({ ok: false, msg: "no autorizado" }, { status: 401 });
  return email;
}
