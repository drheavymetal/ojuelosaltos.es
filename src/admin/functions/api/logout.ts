import { type Env, clearCookie, jsonResponse } from "../_auth";

// POST /api/logout
export const onRequestPost: PagesFunction<Env> = async () =>
  jsonResponse({ ok: true }, { headers: { "set-cookie": clearCookie() } });
