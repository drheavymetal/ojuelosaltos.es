// Cliente del backoffice. Mismo origen (oa-admin) → cookies de sesión incluidas.

export type Lang = "es" | "en" | "pt" | "fr" | "de" | "gl" | "ca" | "eu" | "ast";
export type Content = Partial<Record<Lang, { title?: string; body?: string }>>;

export type NewsListItem = {
  id: number;
  site: "pueblo" | "asociacion";
  slug: string;
  title: string;
  status: "draft" | "published";
  hasImage: boolean;
  publishedAt: string | null;
  updatedAt: string;
};
export type NewsFull = {
  id: number;
  site: "pueblo" | "asociacion";
  slug: string;
  content: Content;
  hasImage: boolean;
  status: "draft" | "published";
  publishedAt: string | null;
};
export type NewsInput = {
  site: "pueblo" | "asociacion";
  slug?: string;
  content: Content;
  status: "draft" | "published";
};

async function j<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok || data.ok === false) {
    throw new Error(data.msg || `Error ${res.status}`);
  }
  return data.data as T;
}

const opts = (method: string, body?: unknown): RequestInit => ({
  method,
  credentials: "include",
  headers: body ? { "content-type": "application/json" } : undefined,
  body: body ? JSON.stringify(body) : undefined,
});

export const api = {
  me: () =>
    fetch("/api/me", { credentials: "include" }).then((r) => r.json()) as Promise<{
      ok: boolean;
      data?: { email?: string; needsSetup?: boolean };
    }>,
  login: (email: string, password: string) =>
    fetch("/api/login", opts("POST", { email, password })).then(j<{ email: string }>),
  logout: () => fetch("/api/logout", opts("POST")).then((r) => r.json()),
  setup: (token: string, email: string, password: string) =>
    fetch("/api/setup", opts("POST", { token, email, password })).then(j<unknown>),

  list: (site?: string, status?: string) => {
    const q = new URLSearchParams();
    if (site) q.set("site", site);
    if (status) q.set("status", status);
    return fetch(`/api/news?${q}`, { credentials: "include" }).then(j<NewsListItem[]>);
  },
  get: (id: number) => fetch(`/api/news/${id}`, { credentials: "include" }).then(j<NewsFull>),
  create: (input: NewsInput) => fetch("/api/news", opts("POST", input)).then(j<{ id: number; slug: string }>),
  update: (id: number, input: NewsInput) => fetch(`/api/news/${id}`, opts("PUT", input)).then(j<unknown>),
  remove: (id: number) => fetch(`/api/news/${id}`, opts("DELETE")).then(j<unknown>),

  uploadImage: (id: number, blob: Blob) =>
    fetch(`/api/news/${id}/image`, {
      method: "PUT",
      credentials: "include",
      headers: { "content-type": blob.type || "image/jpeg" },
      body: blob,
    }).then(j<unknown>),
  deleteImage: (id: number) => fetch(`/api/news/${id}/image`, opts("DELETE")).then(j<unknown>),
};
