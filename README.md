# ojuelosaltos.es

Web del pueblo **Ojuelos Altos** (aldea de Fuente Obejuna, Córdoba) y su
**Asociación de Vecinos «El Horno»**, con sección de noticias y backoffice.
Monorepo desplegado en **Cloudflare Pages** (front + admin) sobre **D1**.

## Estructura

```
.
├── db/
│   └── schema.sql          # esquema de la base de datos D1 (compartida)
└── src/
    ├── front/              # sitio público (Vite + React 19 + Tailwind v4)
    │   ├── src/            #   enrutado por dominio: pueblo / elhorno
    │   ├── functions/      #   Pages Functions: API de noticias (solo lectura)
    │   └── wrangler.toml   #   proyecto Pages "elhorno" + binding D1
    └── admin/              # backoffice (Vite + React)
        ├── src/            #   login propio + CRUD de noticias
        ├── functions/      #   Pages Functions: auth + escritura (protegidas)
        └── wrangler.toml   #   proyecto Pages "oa-admin" + binding D1
```

- **Público** → `ojuelosaltos.es` (pueblo) y `elhorno.ojuelosaltos.es` (asociación).
- **Backoffice** → `admin.ojuelosaltos.es` (auth propia: PBKDF2 + JWT en cookie).
- **i18n**: 9 idiomas (es por defecto; en, pt, fr, de, gl, ca, eu, ast).
- **Noticias**: una sola tabla con columna `site` (`pueblo` | `asociacion`),
  contenido multilingüe (fallback a castellano); imágenes guardadas en D1.

## Desarrollo

```bash
# front
cd src/front && npm install && npm run dev
# admin
cd src/admin && npm install && npm run dev
```

## Despliegue (Cloudflare Pages)

```bash
# Público (producción ojuelosaltos.es)
cd src/front && npm run build && npx wrangler pages deploy dist --project-name elhorno

# Backoffice (admin.ojuelosaltos.es)
cd src/admin && npm run build && npx wrangler pages deploy dist --project-name oa-admin
```

## Base de datos (D1: `ojuelos-news`)

```bash
# aplicar esquema
npx wrangler d1 execute ojuelos-news --remote --file db/schema.sql
```

Secretos del backoffice (proyecto `oa-admin`): `SESSION_SECRET`, `SETUP_TOKEN`
vía `npx wrangler pages secret put <NOMBRE> --project-name oa-admin`.

---

Hecho con cariño por y para el pueblo por el Dr. Pedro Manso Bernal
([contacto@pmanso.es](mailto:contacto@pmanso.es)).
