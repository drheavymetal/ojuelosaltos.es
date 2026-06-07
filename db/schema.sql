-- ===== Esquema D1 (SQLite) — noticias Ojuelos Altos =====
-- Un solo backend, dos categorías (site). Contenido multilingüe en JSON (es obligatorio).

CREATE TABLE IF NOT EXISTS news (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  site         TEXT NOT NULL CHECK (site IN ('pueblo', 'asociacion')),
  slug         TEXT NOT NULL,
  -- JSON: { "es": {"title": "...", "body": "..."}, "en": {...}, ... }  es siempre presente
  content      TEXT NOT NULL,
  has_image    INTEGER NOT NULL DEFAULT 0,   -- 0/1, evita pedir el blob en los listados
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TEXT,                          -- ISO8601 cuando se publica
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  UNIQUE (site, slug)
);

CREATE INDEX IF NOT EXISTS idx_news_site_status_pub
  ON news (site, status, published_at DESC);

-- Imagen aparte: solo se lee bajo demanda (/api/news/:id/image), no en los listados.
-- Se guarda como base64 (TEXT) para evitar la ambigüedad de BLOB entre versiones de D1.
CREATE TABLE IF NOT EXISTS news_image (
  news_id INTEGER PRIMARY KEY REFERENCES news (id) ON DELETE CASCADE,
  mime    TEXT NOT NULL,
  data    TEXT NOT NULL   -- base64 de la imagen reescalada
);

-- Usuarios del backoffice. pass_hash = "pbkdf2$<iter>$<saltB64>$<hashB64>".
CREATE TABLE IF NOT EXISTS admin_users (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT NOT NULL UNIQUE,
  pass_hash  TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
