import { useEffect } from "react";
import Nav from "./components/Nav";
import { Reveal, Kicker } from "./components/ui";
import { H2, Counter, Stat, MembershipForm, setSeo } from "./shared";
import {
  WHATSAPP_URL,
  FACEBOOK_URL,
  AYTO_URL,
  SOCIO_EMAIL,
  URL_PUEBLO,
  eventos,
  noticias,
} from "./data";

const links = [
  { href: "#asociacion", label: "La asociación" },
  { href: "#piscina", label: "La piscina" },
  { href: "#fiestas", label: "Fiestas" },
  { href: URL_PUEBLO, label: "El pueblo ↗" },
];

export default function AsociacionApp() {
  useEffect(() => {
    setSeo({
      title: 'Asociación de Vecinos "El Horno" · Ojuelos Altos',
      description:
        "Asociación de Vecinos El Horno de Ojuelos Altos (Fuente Obejuna, Córdoba). Fiestas, piscina para socios y vida en común. Hazte socio.",
      canonical: "https://elhorno.ojuelosaltos.es/",
      image: "https://elhorno.ojuelosaltos.es/assets/fotos/foto-piscina.jpg",
      favicon: "/assets/logo.png",
    });
  }, []);

  return (
    <>
      <Nav
        brand={{
          logo: (
            <img
              src="/assets/logo.png"
              alt="Logo El Horno"
              className="h-10 w-10 rounded-full border border-black/15 bg-white object-cover"
            />
          ),
          title: "El Horno",
          subtitle: "Ojuelos Altos",
        }}
        links={links}
        cta={{ href: "#socio", label: "Hazte socio" }}
      />

      {/* HERO */}
      <section
        id="inicio"
        className="hero-bg relative flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-28 text-paper sm:px-8"
      >
        <div className="relative z-10 w-full min-w-0 max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <img
              src="/assets/logo.png"
              alt="Asociación de Vecinos El Horno"
              className="h-16 w-16 rounded-full bg-white/90 p-1 shadow-lg sm:h-20 sm:w-20"
            />
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-albero-light sm:text-sm sm:tracking-[0.2em]">
              Asociación de Vecinos<br />Ojuelos Altos · Fuente Obejuna
            </p>
          </div>
          <h1 className="mb-5 font-serif text-[clamp(2.2rem,8vw,5.4rem)] font-semibold leading-[1.02] tracking-tight break-words sm:mb-6">
            «El Horno»
          </h1>
          <p className="mb-8 max-w-[56ch] text-base text-paper/90 sm:mb-9 sm:text-[clamp(1.05rem,2vw,1.3rem)]">
            Donde se cocía el pan del pueblo, hoy se cuece la vida en común. Cuidamos las
            fiestas, la <strong className="text-white">piscina de los socios</strong> y lo que
            es de todos.
          </p>
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:gap-4">
            <a
              href="#socio"
              className="rounded-full bg-verde px-6 py-3.5 text-center font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-verde-dark"
            >
              Hazte socio
            </a>
            <a
              href="#piscina"
              className="rounded-full border-2 border-white/70 px-6 py-3.5 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              La piscina
            </a>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-12">
            <Stat number={<Counter end={197} />} label="socios" />
            <Stat
              number={
                <span className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-albero-light">
                  1
                </span>
              }
              label="piscina propia"
            />
            <Stat
              number={
                <span className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-albero-light">
                  3
                </span>
              }
              label="grandes fiestas al año"
            />
          </div>
        </div>
        <a href="#asociacion" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-2xl text-white/70" aria-label="Bajar">↓</a>
      </section>

      {/* LA ASOCIACIÓN */}
      <section id="asociacion" className="bg-linear-to-br from-verde to-verde-dark px-4 py-[clamp(4.5rem,9vw,8rem)] text-paper sm:px-8">
        <div className="mx-auto grid w-[min(1140px,92vw)] items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="grid place-items-center rounded-3xl bg-cream p-[clamp(1.5rem,4vw,3rem)] shadow-xl">
            <img src="/assets/logo.png" alt="Logo de la Asociación de Vecinos El Horno" className="w-[min(280px,70%)] rounded-xl" />
          </Reveal>
          <Reveal>
            <Kicker light>Quiénes somos</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-paper`}>Un nombre que sale del horno del pueblo</h2>
            <div className="space-y-4 text-paper/90">
              <p>
                La asociación toma su nombre y su escudo del{" "}
                <strong className="text-white">horno de pan comunal</strong> de Ojuelos Altos,
                en la <strong className="text-white">Plaza de las Ánimas</strong>. Durante
                generaciones varios vecinos cocían su pan a la vez en él, y cada familia
                marcaba sus hogazas con un sello propio para reconocerlas al sacarlas.
              </p>
              <p>
                El horno se encalaba cada año y se limpiaba a diario entre todos; la leña se
                recogía del campo. Aquella manera de hacer las cosas —<em>juntos, por el bien
                común</em>— es justo lo que la{" "}
                <strong className="text-white">Asociación de Vecinos "El Horno"</strong>{" "}
                mantiene viva hoy.
              </p>
              <p>
                Organizamos las fiestas, cuidamos los espacios compartidos y damos motivos para
                que la aldea siga reuniéndose. Lo hacemos mano a mano con el{" "}
                <a href={AYTO_URL} target="_blank" rel="noopener" className="font-semibold text-white underline underline-offset-2">
                  Ayuntamiento de Fuente Obejuna
                </a>
                .
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["197 socios", "Fiestas del pueblo", "Piscina de socios", "Tradición viva"].map((c) => (
                <span key={c} className="rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-medium">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* LA PISCINA */}
      <section id="piscina" className="relative overflow-hidden bg-linear-to-b from-azulejo via-azulejo-dark to-[#143f60] px-4 py-[clamp(4.5rem,9vw,8rem)] text-center text-white sm:px-8">
        <div className="azulejo-stripes pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto w-[min(780px,92vw)]">
          <Reveal>
            <Kicker light>Solo para socios</Kicker>
            <h2 className={`${H2} mx-auto mb-6 max-w-[18ch] text-paper`}>La piscina de la asociación</h2>
            <p className="mx-auto mb-9 max-w-[60ch] text-[clamp(1.1rem,2vw,1.35rem)] text-white/90">
              El gran privilegio de pertenecer a El Horno: una{" "}
              <strong>piscina privada para los socios y sus familias</strong>. Los veranos de
              la sierra aprietan, y aquí los pasamos en el agua, a la sombra y entre vecinos.
            </p>
          </Reveal>
          <Reveal as="figure" className="mx-auto mb-12 max-w-[760px]">
            <img src="/assets/fotos/foto-piscina.jpg" alt="La piscina de la asociación al atardecer" loading="lazy" className="w-full rounded-2xl border-[3px] border-white/50 shadow-2xl" />
          </Reveal>
          <div className="mb-12 grid gap-6 sm:grid-cols-3">
            {[
              { ic: "🏊", t: "Acceso exclusivo", d: "Reservada a socios al corriente de su cuota y a su familia." },
              { ic: "☀️", t: "Todo el verano", d: "Abierta en temporada estival, el mejor refugio del calor serrano." },
              { ic: "👨‍👩‍👧‍👦", t: "Punto de encuentro", d: "El lugar donde se juntan las familias y crecen los más pequeños." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 80} className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                <div className="mb-3 text-4xl">{f.ic}</div>
                <h3 className="mb-2 font-serif text-xl">{f.t}</h3>
                <p className="text-white/85">{f.d}</p>
              </Reveal>
            ))}
          </div>
          <a href="#socio" className="inline-block rounded-full bg-white px-6 py-3.5 font-semibold text-azulejo-dark shadow-lg transition hover:-translate-y-0.5">
            Quiero usar la piscina · Hazte socio
          </a>
        </div>
      </section>

      {/* FIESTAS + PRENSA */}
      <section id="fiestas" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker>Calendario</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>Fiestas y tradiciones</h2>
            <p className="mb-11 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">
              El año en Ojuelos Altos se mide en celebraciones: la Candelaria en febrero, la
              Semana Santa con sus tracas, y luego el verano. Estas son las grandes citas que
              la asociación ayuda a mantener vivas.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {eventos.map((e, i) => (
              <Reveal key={e.titulo} delay={i * 80} className="rounded-2xl border border-black/5 bg-paper p-8 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-verde font-serif text-lg font-semibold text-white">{e.mes}</div>
                <h3 className="mb-2 font-serif text-2xl">{e.titulo}</h3>
                <p className="text-inksoft">{e.texto}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 border-t-2 border-almagre/15 pt-10">
            <h3 className="mb-6 font-serif text-2xl text-verde">El Horno en la prensa</h3>
            <div className="grid gap-5 md:grid-cols-3">
              {noticias.map((n) => (
                <a key={n.url} href={n.url} target="_blank" rel="noopener" className="flex flex-col gap-2 rounded-xl border border-black/10 border-l-4 border-l-albero bg-paper p-6 shadow-sm transition hover:-translate-y-1 hover:border-l-verde hover:shadow-lg">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-albero">{n.fuente}</span>
                  <span className="font-serif text-lg leading-snug text-ink">{n.titulo}</span>
                  <span className="mt-auto text-sm font-semibold text-verde">Leer noticia →</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* HAZTE SOCIO — formulario */}
      <section id="socio" className="bg-paper px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(760px,92vw)]">
          <Reveal>
            <Kicker>Únete</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>Contáctanos para hacerte socio</h2>
            <p className="mb-9 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">
              Ser socio es sostener las fiestas, cuidar lo de todos y disfrutar de la{" "}
              <strong className="text-ink">piscina de la asociación</strong>. Déjanos tus
              datos y la junta te contacta para darte de alta y explicarte la cuota. Al
              enviar se abrirá tu correo con todo listo para mandar a{" "}
              <strong className="text-ink">{SOCIO_EMAIL}</strong>.
            </p>
          </Reveal>
          <Reveal>
            <MembershipForm />
          </Reveal>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="bg-linear-to-br from-verde to-verde-dark px-4 py-[clamp(4.5rem,9vw,8rem)] text-center text-paper sm:px-8">
        <div className="mx-auto w-[min(780px,92vw)]">
          <Reveal>
            <Kicker light>Contacto</Kicker>
            <h2 className={`${H2} mx-auto mb-6 max-w-[18ch] text-paper`}>Hablemos</h2>
            <p className="mx-auto mb-9 max-w-[54ch] text-lg text-paper/90">
              ¿Quieres apuntarte, colaborar o saber más? Escríbenos al correo de la
              asociación, o búscanos en el grupo de WhatsApp y en Facebook.
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${SOCIO_EMAIL}`} className="rounded-full bg-white px-6 py-3.5 font-semibold text-verde shadow-lg transition hover:-translate-y-0.5">✉️ {SOCIO_EMAIL}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="rounded-full border-2 border-white/60 px-6 py-3.5 font-semibold text-white transition hover:bg-white/15">💬 WhatsApp</a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener" className="rounded-full border-2 border-white/60 px-6 py-3.5 font-semibold text-white transition hover:bg-white/15">f Facebook</a>
            </div>
            <p className="text-sm tracking-wide text-paper/65">
              <a href={URL_PUEBLO} className="underline underline-offset-2 hover:text-albero-light">← Volver a la web del pueblo</a>
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />

      {/* Barra inferior fija (móvil) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-black/10 bg-paper/95 px-4 py-3 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.4)] backdrop-blur md:hidden">
        <a href="#socio" className="flex-1 rounded-full bg-verde px-5 py-3 text-center font-semibold text-white">Hazte socio</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-verde/30 bg-verde/10 text-xl">💬</a>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1a140f] px-4 pb-24 pt-12 text-paper/80 sm:px-8 md:pb-6">
      <div className="mx-auto flex w-[min(1140px,92vw)] flex-wrap items-center justify-between gap-8 border-b border-white/10 pb-8">
        <div className="flex items-center gap-3.5">
          <img src="/assets/logo.png" alt="" className="h-12 w-12 rounded-full bg-white" />
          <div>
            <strong className="block font-serif text-lg text-white">Asociación de Vecinos "El Horno"</strong>
            <span className="text-sm">Ojuelos Altos, Fuente Obejuna (Córdoba)</span>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="#asociacion" className="hover:text-albero-light">La asociación</a>
          <a href="#piscina" className="hover:text-albero-light">La piscina</a>
          <a href="#fiestas" className="hover:text-albero-light">Fiestas</a>
          <a href="#socio" className="hover:text-albero-light">Hazte socio</a>
          <a href={URL_PUEBLO} className="hover:text-albero-light">El pueblo ↗</a>
        </nav>
      </div>
      <p className="mt-6 text-center text-[0.8rem] text-paper/50">
        © {new Date().getFullYear()} Asociación de Vecinos El Horno · Hecho con cariño por y
        para el pueblo por el Dr. Pedro Manso Bernal (
        <a href="mailto:contacto@pmanso.es" className="underline underline-offset-2 hover:text-albero-light">contacto@pmanso.es</a>)
      </p>
    </footer>
  );
}
