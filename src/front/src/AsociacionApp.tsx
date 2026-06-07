import { useEffect } from "react";
import Nav from "./components/Nav";
import { Reveal, Kicker } from "./components/ui";
import NewsSection from "./components/NewsSection";
import { H2, Counter, Stat, MembershipForm, setSeo } from "./shared";
import { useT, Rich } from "./i18n";
import {
  WHATSAPP_URL,
  FACEBOOK_URL,
  SOCIO_EMAIL,
  URL_PUEBLO,
  noticias,
} from "./data";

export default function AsociacionApp() {
  const t = useT();
  const a = t.asoc;

  const links = [
    { href: "#asociacion", label: a.nav.asociacion },
    { href: "#piscina", label: a.nav.piscina },
    { href: "#fiestas", label: a.nav.fiestas },
    { href: "#noticias", label: t.news.nav },
    { href: URL_PUEBLO, label: a.nav.pueblo },
  ];

  useEffect(() => {
    setSeo({
      title: a.seo.title,
      description: a.seo.description,
      canonical: "https://elhorno.ojuelosaltos.es/",
      image: "https://elhorno.ojuelosaltos.es/assets/fotos/foto-piscina.jpg",
    });
  }, [a]);

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
          subtitle: a.nav.subtitle,
        }}
        links={links}
        cta={{ href: "#socio", label: a.nav.cta }}
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
              alt={a.hero.logoAlt}
              className="h-16 w-16 rounded-full bg-white/90 p-1 shadow-lg sm:h-20 sm:w-20"
            />
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-albero-light sm:text-sm sm:tracking-[0.2em]">
              {a.hero.kickerLines[0]}<br />{a.hero.kickerLines[1]}
            </p>
          </div>
          <h1 className="mb-5 font-serif text-[clamp(2.2rem,8vw,5.4rem)] font-semibold leading-[1.02] tracking-tight break-words sm:mb-6">
            «El Horno»
          </h1>
          <Rich className="rich rich-light mb-8 max-w-[56ch] text-base text-paper/90 sm:mb-9 sm:text-[clamp(1.05rem,2vw,1.3rem)]" html={a.hero.lead} />
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:gap-4">
            <a
              href="#socio"
              className="rounded-full bg-verde px-6 py-3.5 text-center font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-verde-dark"
            >
              {a.hero.btnSocio}
            </a>
            <a
              href="#piscina"
              className="rounded-full border-2 border-white/70 px-6 py-3.5 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              {a.hero.btnPiscina}
            </a>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-12">
            <Stat number={<Counter end={197} />} label={a.hero.statSocios} />
            <Stat
              number={
                <span className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-albero-light">
                  1
                </span>
              }
              label={a.hero.statPiscina}
            />
            <Stat
              number={
                <span className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-albero-light">
                  3
                </span>
              }
              label={a.hero.statFiestas}
            />
          </div>
        </div>
        <a href="#asociacion" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-2xl text-white/70" aria-label={a.hero.scroll}>↓</a>
      </section>

      {/* LA ASOCIACIÓN */}
      <section id="asociacion" className="bg-linear-to-br from-verde to-verde-dark px-4 py-[clamp(4.5rem,9vw,8rem)] text-paper sm:px-8">
        <div className="mx-auto grid w-[min(1140px,92vw)] items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="grid place-items-center rounded-3xl bg-cream p-[clamp(1.5rem,4vw,3rem)] shadow-xl">
            <img src="/assets/logo.png" alt={a.quienes.logoAlt} className="w-[min(280px,70%)] rounded-xl" />
          </Reveal>
          <Reveal>
            <Kicker light>{a.quienes.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-paper`}>{a.quienes.h2}</h2>
            <div className="rich rich-light space-y-4 text-paper/90">
              {a.quienes.p.map((html, i) => (
                <Rich key={i} html={html} />
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {a.quienes.chips.map((c) => (
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
            <Kicker light>{a.piscina.kicker}</Kicker>
            <h2 className={`${H2} mx-auto mb-6 max-w-[18ch] text-paper`}>{a.piscina.h2}</h2>
            <Rich className="rich rich-light mx-auto mb-9 max-w-[60ch] text-[clamp(1.1rem,2vw,1.35rem)] text-white/90" html={a.piscina.lead} />
          </Reveal>
          <Reveal as="figure" className="mx-auto mb-12 max-w-[760px]">
            <img src="/assets/fotos/foto-piscina.jpg" alt={a.piscina.imgAlt} loading="lazy" className="w-full rounded-2xl border-[3px] border-white/50 shadow-2xl" />
          </Reveal>
          <div className="mb-12 grid gap-6 sm:grid-cols-3">
            {a.piscina.cards.map((f, i) => (
              <Reveal key={f.t} delay={i * 80} className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                <div className="mb-3 text-4xl">{f.ic}</div>
                <h3 className="mb-2 font-serif text-xl">{f.t}</h3>
                <p className="text-white/85">{f.d}</p>
              </Reveal>
            ))}
          </div>
          <a href="#socio" className="inline-block rounded-full bg-white px-6 py-3.5 font-semibold text-azulejo-dark shadow-lg transition hover:-translate-y-0.5">
            {a.piscina.btn}
          </a>
        </div>
      </section>

      {/* NOTICIAS */}
      <NewsSection site="asociacion" />

      {/* FIESTAS + PRENSA */}
      <section id="fiestas" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker>{a.fiestas.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>{a.fiestas.h2}</h2>
            <p className="mb-11 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">{a.fiestas.intro}</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {a.fiestas.eventos.map((e, i) => (
              <Reveal key={i} delay={i * 80} className="rounded-2xl border border-black/5 bg-paper p-8 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-verde font-serif text-lg font-semibold text-white">{e.mes}</div>
                <h3 className="mb-2 font-serif text-2xl">{e.titulo}</h3>
                <p className="text-inksoft">{e.texto}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 border-t-2 border-almagre/15 pt-10">
            <h3 className="mb-6 font-serif text-2xl text-verde">{a.fiestas.prensaTitle}</h3>
            <div className="grid gap-5 md:grid-cols-3">
              {noticias.map((n) => (
                <a key={n.url} href={n.url} target="_blank" rel="noopener" className="flex flex-col gap-2 rounded-xl border border-black/10 border-l-4 border-l-albero bg-paper p-6 shadow-sm transition hover:-translate-y-1 hover:border-l-verde hover:shadow-lg">
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-albero">{n.fuente}</span>
                  <span className="font-serif text-lg leading-snug text-ink">{n.titulo}</span>
                  <span className="mt-auto text-sm font-semibold text-verde">{a.fiestas.prensaRead}</span>
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
            <Kicker>{a.socio.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>{a.socio.h2}</h2>
            <Rich className="rich mb-9 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft" html={a.socio.intro} />
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
            <Kicker light>{a.contacto.kicker}</Kicker>
            <h2 className={`${H2} mx-auto mb-6 max-w-[18ch] text-paper`}>{a.contacto.h2}</h2>
            <p className="mx-auto mb-9 max-w-[54ch] text-lg text-paper/90">{a.contacto.p}</p>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              <a href={`mailto:${SOCIO_EMAIL}`} className="rounded-full bg-white px-6 py-3.5 font-semibold text-verde shadow-lg transition hover:-translate-y-0.5">✉️ {SOCIO_EMAIL}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="rounded-full border-2 border-white/60 px-6 py-3.5 font-semibold text-white transition hover:bg-white/15">{a.contacto.whatsapp}</a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener" className="rounded-full border-2 border-white/60 px-6 py-3.5 font-semibold text-white transition hover:bg-white/15">{a.contacto.facebook}</a>
            </div>
            <p className="text-sm tracking-wide text-paper/65">
              <a href={URL_PUEBLO} className="underline underline-offset-2 hover:text-albero-light">{a.contacto.back}</a>
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />

      {/* Barra inferior fija (móvil) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-black/10 bg-paper/95 px-4 py-3 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.4)] backdrop-blur md:hidden">
        <a href="#socio" className="flex-1 rounded-full bg-verde px-5 py-3 text-center font-semibold text-white">{a.mobileSocio}</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-verde/30 bg-verde/10 text-xl">💬</a>
      </div>
    </>
  );
}

function Footer() {
  const a = useT().asoc;
  return (
    <footer className="bg-[#1a140f] px-4 pb-24 pt-12 text-paper/80 sm:px-8 md:pb-6">
      <div className="mx-auto flex w-[min(1140px,92vw)] flex-wrap items-center justify-between gap-8 border-b border-white/10 pb-8">
        <div className="flex items-center gap-3.5">
          <img src="/assets/logo.png" alt="" className="h-12 w-12 rounded-full bg-white" />
          <div>
            <strong className="block font-serif text-lg text-white">{a.footer.brand}</strong>
            <span className="text-sm">{a.footer.subtitle}</span>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="#asociacion" className="hover:text-albero-light">{a.footer.asociacion}</a>
          <a href="#piscina" className="hover:text-albero-light">{a.footer.piscina}</a>
          <a href="#fiestas" className="hover:text-albero-light">{a.footer.fiestas}</a>
          <a href="#socio" className="hover:text-albero-light">{a.footer.socio}</a>
          <a href={URL_PUEBLO} className="hover:text-albero-light">{a.footer.pueblo}</a>
        </nav>
      </div>
      <p className="mt-6 text-center text-[0.8rem] text-paper/50">
        © {new Date().getFullYear()} Asociación de Vecinos El Horno · {a.footer.madeBy} (
        <a href="mailto:contacto@pmanso.es" className="underline underline-offset-2 hover:text-albero-light">contacto@pmanso.es</a>)
      </p>
    </footer>
  );
}
