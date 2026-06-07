import { useState, type ReactNode } from "react";
import { useCountUp } from "./hooks";
import { SOCIO_EMAIL } from "./data";
import { useT } from "./i18n";

export const H2 =
  "font-serif font-semibold leading-[1.08] tracking-tight text-[clamp(1.9rem,4.2vw,3.1rem)]";

/** Ajusta título + meta SEO/Open Graph según el sitio activo. */
export function setSeo(o: {
  title: string;
  description: string;
  canonical: string;
  image: string;
  favicon?: string;
}) {
  document.title = o.title;
  if (o.favicon) {
    let icon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.type = o.favicon.endsWith(".svg") ? "image/svg+xml" : "image/png";
    icon.href = o.favicon;
  }
  const setMeta = (sel: string, attr: string, key: string, val: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", val);
    return sel;
  };
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = o.canonical;
  setMeta("", "name", "description", o.description);
  setMeta("", "property", "og:title", o.title);
  setMeta("", "property", "og:description", o.description);
  setMeta("", "property", "og:url", o.canonical);
  setMeta("", "property", "og:image", o.image);
}

export function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const { ref, value } = useCountUp(end);
  return (
    <span ref={ref} className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-albero-light">
      {value}
      {suffix}
    </span>
  );
}

export function Stat({ number, label }: { number: ReactNode; label: string }) {
  return (
    <div className="flex flex-col text-sm uppercase tracking-[0.1em] text-paper/70">
      {number}
      <span>{label}</span>
    </div>
  );
}

export function GalleryItem({
  src,
  caption,
  wide,
}: {
  src: string;
  caption: string;
  wide?: boolean;
}) {
  const [err, setErr] = useState(false);
  const span = wide ? "sm:col-span-2" : "";
  if (err) {
    return (
      <figure
        className={`grid h-[210px] place-items-center rounded-xl border-2 border-dashed border-almagre/35 bg-cream p-5 text-center ${span}`}
      >
        <span className="font-semibold text-almagre">📷 {caption}</span>
      </figure>
    );
  }
  return (
    <figure className={`group relative h-[210px] overflow-hidden rounded-xl shadow ${span}`}>
      <img
        src={src}
        alt={caption}
        loading="lazy"
        onError={() => setErr(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-3 pb-2.5 pt-5 text-sm font-medium text-white">
        {caption}
      </figcaption>
    </figure>
  );
}

// Valores canónicos en castellano para el correo (que va SIEMPRE en español),
// por índice con form.antiguedadOpts del diccionario.
const ANTIGUEDAD_ES = [
  "Soy nuevo (5 años o menos)",
  "Soy socio/vecino de siempre (más de 5 años)",
  "Familia con menores",
  "Prefiero que me lo expliquéis",
];

export function MembershipForm() {
  const { form } = useT();
  const [f, setF] = useState({
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    antiguedad: 0, // índice
    mensaje: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // El correo a la junta va siempre en castellano, lo lea quien lo lea.
    const subject = `Quiero hacerme socio de El Horno — ${f.nombre} ${f.apellidos}`.trim();
    const body =
      `Hola, quiero hacerme socio de la Asociación de Vecinos "El Horno".\n\n` +
      `Nombre: ${f.nombre} ${f.apellidos}\n` +
      `Teléfono: ${f.telefono}\n` +
      `Email: ${f.email}\n` +
      `Situación: ${ANTIGUEDAD_ES[f.antiguedad]}\n\n` +
      `Mensaje:\n${f.mensaje}\n`;
    window.location.href = `mailto:${SOCIO_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-ink outline-none transition focus:border-verde focus:ring-2 focus:ring-verde/20";
  const label = "mb-1.5 block text-sm font-semibold text-ink";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-black/10 bg-cream p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="nombre">{form.nombre} *</label>
          <input id="nombre" required value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} className={field} placeholder={form.nombrePh} />
        </div>
        <div>
          <label className={label} htmlFor="apellidos">{form.apellidos} *</label>
          <input id="apellidos" required value={f.apellidos} onChange={(e) => setF({ ...f, apellidos: e.target.value })} className={field} placeholder={form.apellidosPh} />
        </div>
        <div>
          <label className={label} htmlFor="telefono">{form.telefono} *</label>
          <input id="telefono" required type="tel" value={f.telefono} onChange={(e) => setF({ ...f, telefono: e.target.value })} className={field} placeholder={form.telefonoPh} />
        </div>
        <div>
          <label className={label} htmlFor="email">{form.email}</label>
          <input id="email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={field} placeholder={form.emailPh} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="antiguedad">{form.antiguedadLabel}</label>
          <select id="antiguedad" value={f.antiguedad} onChange={(e) => setF({ ...f, antiguedad: Number(e.target.value) })} className={field}>
            {form.antiguedadOpts.map((opt, i) => (
              <option key={i} value={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="mensaje">{form.mensaje}</label>
          <textarea id="mensaje" rows={4} value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })} className={field} placeholder={form.mensajePh} />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-verde px-6 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-verde-dark sm:w-auto"
      >
        {form.submit}
      </button>
      <p className="mt-3 text-sm text-inksoft">
        {form.note} {SOCIO_EMAIL}.
      </p>
    </form>
  );
}
