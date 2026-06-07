import { useEffect, useState } from "react";
import { api, type Content, type Lang, type NewsInput } from "./api";
import { downscaleImage } from "./image";

const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "gl", label: "Galego" },
  { code: "ca", label: "Català" },
  { code: "eu", label: "Euskara" },
  { code: "ast", label: "Asturianu" },
];

const inputCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export default function Editor({
  id,
  onClose,
  onSaved,
}: {
  id: number | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [site, setSite] = useState<"pueblo" | "asociacion">("pueblo");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState<Content>({ es: { title: "", body: "" } });
  const [tab, setTab] = useState<Lang>("es");
  const [hasImage, setHasImage] = useState(false);
  const [imgVersion, setImgVersion] = useState(0);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [removeImg, setRemoveImg] = useState(false);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    api
      .get(id)
      .then((n) => {
        setSite(n.site);
        setStatus(n.status);
        setSlug(n.slug);
        setContent({ es: { title: "", body: "" }, ...n.content });
        setHasImage(n.hasImage);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const setField = (lang: Lang, key: "title" | "body", value: string) =>
    setContent((c) => ({ ...c, [lang]: { ...c[lang], [key]: value } }));

  const pickImage = (file: File) => {
    setPendingFile(file);
    setRemoveImg(false);
  };

  const save = async () => {
    setError("");
    if (!content.es?.title?.trim()) {
      setError("El título en castellano es obligatorio.");
      setTab("es");
      return;
    }
    setSaving(true);
    try {
      // Limpia idiomas vacíos (solo se mandan los que tienen algo, es siempre).
      const clean: Content = {};
      for (const { code } of LANGS) {
        const t = content[code]?.title?.trim();
        const b = content[code]?.body?.trim();
        if (code === "es" || t || b) clean[code] = { title: t || "", body: b || "" };
      }
      const input: NewsInput = { site, status, content: clean, slug: slug.trim() || undefined };

      let newsId = id;
      if (id) {
        await api.update(id, input);
      } else {
        const created = await api.create(input);
        newsId = created.id;
      }
      if (newsId) {
        if (removeImg && hasImage) await api.deleteImage(newsId);
        if (pendingFile) {
          const blob = await downscaleImage(pendingFile);
          await api.uploadImage(newsId, blob);
        }
      }
      onSaved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const previewSrc = pendingFile
    ? URL.createObjectURL(pendingFile)
    : id && hasImage && !removeImg
      ? `/api/news/${id}/image?v=${imgVersion}`
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-8 w-[min(820px,100%)] rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-bold">{id ? "Editar noticia" : "Nueva noticia"}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Cerrar">
            ✕
          </button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-500">Cargando…</div>
        ) : (
          <div className="space-y-5 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Sitio</span>
                <select value={site} onChange={(e) => setSite(e.target.value as "pueblo" | "asociacion")} className={inputCls}>
                  <option value="pueblo">Pueblo</option>
                  <option value="asociacion">Asociación</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Estado</span>
                <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")} className={inputCls}>
                  <option value="draft">Borrador</option>
                  <option value="published">Publicada</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Slug (opcional)</span>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto desde el título" className={inputCls} />
              </label>
            </div>

            {/* Imagen */}
            <div className="rounded-xl border border-slate-200 p-4">
              <span className="mb-2 block text-sm font-semibold">Imagen (opcional)</span>
              <div className="flex items-center gap-4">
                {previewSrc ? (
                  <img src={previewSrc} alt="" className="h-24 w-36 rounded-lg object-cover" />
                ) : (
                  <div className="grid h-24 w-36 place-items-center rounded-lg bg-slate-100 text-xs text-slate-400">
                    sin imagen
                  </div>
                )}
                <div className="space-y-2 text-sm">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && pickImage(e.target.files[0])}
                    className="block text-sm"
                  />
                  {(pendingFile || (hasImage && !removeImg)) && (
                    <button
                      type="button"
                      onClick={() => {
                        setPendingFile(null);
                        setRemoveImg(true);
                        setImgVersion((v) => v + 1);
                      }}
                      className="text-rose-600 hover:underline"
                    >
                      Quitar imagen
                    </button>
                  )}
                  <p className="text-xs text-slate-400">Se reescala sola a 1200&nbsp;px.</p>
                </div>
              </div>
            </div>

            {/* Pestañas idioma */}
            <div className="flex flex-wrap gap-1.5">
              {LANGS.map(({ code, label }) => {
                const filled = !!(content[code]?.title?.trim() || content[code]?.body?.trim());
                return (
                  <button
                    key={code}
                    onClick={() => setTab(code)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      tab === code ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {label}
                    {code === "es" && <span className="ml-1 text-rose-300">*</span>}
                    {code !== "es" && filled && <span className="ml-1 text-emerald-500">●</span>}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">
                  Título {tab === "es" && <span className="text-rose-500">(obligatorio)</span>}
                </span>
                <input
                  value={content[tab]?.title || ""}
                  onChange={(e) => setField(tab, "title", e.target.value)}
                  placeholder={tab === "es" ? "Título de la noticia" : "Vacío → se usa el castellano"}
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Cuerpo (Markdown)</span>
                <textarea
                  value={content[tab]?.body || ""}
                  onChange={(e) => setField(tab, "body", e.target.value)}
                  rows={10}
                  placeholder={tab === "es" ? "Texto de la noticia. **negrita**, *cursiva*, [enlace](https://…)" : "Vacío → se usa el castellano"}
                  className={`${inputCls} font-mono text-sm`}
                />
              </label>
            </div>

            {error && <p className="rounded-lg bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</p>}

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button onClick={onClose} className="rounded-lg px-4 py-2 font-medium text-slate-600 hover:bg-slate-100">
                Cancelar
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {saving ? "Guardando…" : "Guardar"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
