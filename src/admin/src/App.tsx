import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { api, type NewsListItem } from "./api";
import Editor from "./Editor";

type Phase = "loading" | "setup" | "login" | "authed";

export default function App() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [email, setEmail] = useState("");

  const refreshAuth = useCallback(async () => {
    const res = await api.me();
    if (res.ok && res.data?.email) {
      setEmail(res.data.email);
      setPhase("authed");
    } else if (res.data?.needsSetup) {
      setPhase("setup");
    } else {
      setPhase("login");
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  if (phase === "loading") {
    return <div className="grid min-h-screen place-items-center text-slate-400">Cargando…</div>;
  }
  if (phase === "setup") return <Setup onDone={refreshAuth} />;
  if (phase === "login") return <Login onDone={refreshAuth} />;
  return <Dashboard email={email} onLogout={refreshAuth} />;
}

function Shell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-[min(420px,100%)] rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-1 text-xl font-bold">Ojuelos Altos · Backoffice</h1>
        <p className="mb-6 text-sm text-slate-500">{title}</p>
        {children}
      </div>
    </div>
  );
}

const fieldCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

function Login({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.login(email, password);
      onDone();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <Shell title="Entra para gestionar las noticias">
      <form onSubmit={submit} className="space-y-4">
        <input className={fieldCls} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className={fieldCls} type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-emerald-600 py-2.5 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60">
          {busy ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </Shell>
  );
}

function Setup({ onDone }: { onDone: () => void }) {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.setup(token, email, password);
      await api.login(email, password);
      onDone();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <Shell title="Primer acceso: crea el administrador">
      <form onSubmit={submit} className="space-y-4">
        <input className={fieldCls} placeholder="Token de configuración" value={token} onChange={(e) => setToken(e.target.value)} required />
        <input className={fieldCls} type="email" placeholder="Tu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className={fieldCls} type="password" placeholder="Contraseña (mín. 10)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={10} />
        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-emerald-600 py-2.5 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60">
          {busy ? "Creando…" : "Crear administrador"}
        </button>
      </form>
    </Shell>
  );
}

function Dashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [items, setItems] = useState<NewsListItem[] | null>(null);
  const [site, setSite] = useState("");
  const [editor, setEditor] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  const load = useCallback(() => {
    setItems(null);
    api.list(site || undefined).then(setItems).catch(() => setItems([]));
  }, [site]);

  useEffect(() => {
    load();
  }, [load]);

  const del = async (it: NewsListItem) => {
    if (!confirm(`¿Borrar "${it.title}"? No se puede deshacer.`)) return;
    await api.remove(it.id);
    load();
  };

  const logout = async () => {
    await api.logout();
    onLogout();
  };

  return (
    <div className="mx-auto min-h-screen w-[min(1080px,100%)] px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Noticias · Ojuelos Altos</h1>
          <p className="text-sm text-slate-500">{email}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setEditor({ open: true, id: null })} className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700">
            + Nueva noticia
          </button>
          <button onClick={logout} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200">
            Salir
          </button>
        </div>
      </header>

      <div className="mb-4 flex gap-2">
        {[
          { v: "", l: "Todas" },
          { v: "pueblo", l: "Pueblo" },
          { v: "asociacion", l: "Asociación" },
        ].map((f) => (
          <button
            key={f.v}
            onClick={() => setSite(f.v)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              site === f.v ? "bg-slate-800 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {f.l}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        {items === null ? (
          <div className="p-10 text-center text-slate-400">Cargando…</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-slate-400">No hay noticias todavía.</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Sitio</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <button onClick={() => setEditor({ open: true, id: it.id })} className="font-medium text-slate-800 hover:text-emerald-700">
                      {it.title || <span className="italic text-slate-400">(sin título)</span>}
                    </button>
                    {it.hasImage && <span className="ml-2 text-xs text-slate-400">📷</span>}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-600">{it.site}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${it.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {it.status === "published" ? "Publicada" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {(it.publishedAt || it.updatedAt || "").slice(0, 10)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditor({ open: true, id: it.id })} className="mr-3 text-sm font-medium text-emerald-700 hover:underline">
                      Editar
                    </button>
                    <button onClick={() => del(it)} className="text-sm font-medium text-rose-600 hover:underline">
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editor.open && (
        <Editor
          id={editor.id}
          onClose={() => setEditor({ open: false, id: null })}
          onSaved={() => {
            setEditor({ open: false, id: null });
            load();
          }}
        />
      )}
    </div>
  );
}
