import { useEffect } from "react";
import Nav from "./components/Nav";
import VillageLogo from "./components/VillageLogo";
import { Reveal, Kicker, MapView, TrackMap } from "./components/ui";
import NewsSection from "./components/NewsSection";
import { H2, Counter, Stat, GalleryItem, setSeo } from "./shared";
import { useT, Rich } from "./i18n";
import {
  OJUELOS,
  FUENTE_OBEJUNA,
  AYTO_URL,
  URL_ASOC,
  FACEBOOK_PUEBLO_URL,
  baresInfo,
  rutasInfo,
  galeriaInfo,
} from "./data";

export default function PuebloApp() {
  const t = useT();
  const p = t.pueblo;

  const links = [
    { href: "#pueblo", label: p.nav.pueblo },
    { href: "#noticias", label: t.news.nav },
    { href: "#historia", label: p.nav.historia },
    { href: "#comer", label: p.nav.comer },
    { href: "#rutas", label: p.nav.rutas },
    { href: "#alrededores", label: p.nav.alrededores },
    { href: "#cielo", label: p.nav.cielo },
  ];

  useEffect(() => {
    setSeo({
      title: p.seo.title,
      description: p.seo.description,
      canonical: "https://ojuelosaltos.es/",
      image: "https://ojuelosaltos.es/assets/fotos/foto-aldea.jpg",
      favicon: "/favicon.svg",
    });
  }, [p]);

  return (
    <>
      <Nav
        brand={{
          logo: <VillageLogo className="h-11 w-11 text-almagre-dark" />,
          title: "Ojuelos Altos",
          subtitle: p.nav.subtitle,
        }}
        links={links}
        cta={{ href: URL_ASOC, label: p.nav.cta, external: true }}
      />

      {/* HERO */}
      <section id="inicio" className="hero-bg relative flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-28 text-paper sm:px-8">
        <div className="relative z-10 w-full min-w-0 max-w-3xl">
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-albero-light sm:mb-5 sm:text-sm sm:tracking-[0.2em]">
            {p.hero.kicker}
          </p>
          <h1 className="mb-5 font-serif text-[clamp(2.4rem,9vw,6rem)] font-semibold leading-[1.02] tracking-tight break-words sm:mb-6">
            Ojuelos Altos
          </h1>
          <p className="mb-8 max-w-[56ch] text-base text-paper/90 sm:mb-9 sm:text-[clamp(1.05rem,2vw,1.3rem)]">
            {p.hero.lead}
          </p>
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:gap-4">
            <a href="#pueblo" className="rounded-full bg-verde px-6 py-3.5 text-center font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-verde-dark">
              {p.hero.btnPueblo}
            </a>
            <a href={URL_ASOC} className="rounded-full border-2 border-white/70 px-6 py-3.5 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
              {p.hero.btnAsoc}
            </a>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-12">
            <Stat number={<Counter end={180} />} label={p.hero.statVecinos} />
            <Stat number={<Counter end={621} suffix=" m" />} label={p.hero.statAltitud} />
            <Stat number={<span className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-albero-light">1476</span>} label={p.hero.statOrigen} />
          </div>
        </div>
        <a href="#pueblo" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-2xl text-white/70" aria-label={p.hero.scroll}>↓</a>
      </section>

      {/* EL PUEBLO */}
      <section id="pueblo" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(820px,92vw)]">
          <Reveal>
            <Kicker>{p.pueblo.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>{p.pueblo.h2}</h2>
          </Reveal>
          <Reveal className="space-y-5 text-[clamp(1.05rem,1.6vw,1.18rem)] leading-[1.8] text-inksoft">
            {p.pueblo.p.map((txt, i) => (
              <p key={i}>{txt}</p>
            ))}
          </Reveal>
          <Reveal className="mt-10">
            <p className="mb-3 text-sm font-medium text-inksoft">{p.pueblo.mapIntro}</p>
            <MapView center={[38.22, -5.39]} zoom={10} markers={[{ pos: OJUELOS, label: p.pueblo.mapOjuelos }, { pos: FUENTE_OBEJUNA, label: p.pueblo.mapFuente }]} />
          </Reveal>
          <Reveal className="mt-12 border-t-2 border-almagre/15 pt-10">
            <h3 className="mb-5 font-serif text-[1.7rem] text-verde">{p.pueblo.h3}</h3>
            <div className="rich space-y-5 text-[clamp(1.05rem,1.6vw,1.18rem)] leading-[1.8] text-inksoft">
              {p.pueblo.history.map((html, i) => (
                <Rich key={i} html={html} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* NOTICIAS */}
      <NewsSection site="pueblo" />

      {/* HISTORIA */}
      <section id="historia" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(820px,92vw)]">
          <Reveal>
            <Kicker>{p.historia.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>{p.historia.h2}</h2>
          </Reveal>
          <Reveal className="rich space-y-5 text-[clamp(1.05rem,1.6vw,1.18rem)] leading-[1.8] text-inksoft">
            {p.historia.p.map((html, i) => (
              <Rich key={i} html={html} />
            ))}
          </Reveal>
          <Reveal className="mt-10" as="figure">
            <img src="/assets/fotos/fuenteobejuna-ayuntamiento.jpg" alt={p.historia.imgAlt} loading="lazy" className="w-full rounded-2xl shadow-xl" />
            <figcaption className="mt-3 text-center text-sm italic text-inksoft">{p.historia.figcaption}</figcaption>
          </Reveal>
        </div>
      </section>

      {/* DÓNDE COMER */}
      <section id="comer" className="bg-linear-to-br from-almagre to-almagre-dark px-4 py-[clamp(4.5rem,9vw,8rem)] text-paper sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker light>{p.comer.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[20ch] text-paper`}>{p.comer.h2}</h2>
            <p className="mb-11 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-paper/90">{p.comer.intro}</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {baresInfo.map((b, i) => (
              <Reveal key={b.nombre} delay={i * 80} className="flex flex-col rounded-2xl bg-paper p-7 shadow-lg transition hover:-translate-y-1.5">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl text-ink">{b.nombre}</h3>
                  <span className="shrink-0 rounded-full bg-albero/20 px-3 py-1 text-[0.8rem] font-semibold text-almagre-dark">{p.comer.bares[i].rating}</span>
                </div>
                <p className="mb-4 text-sm text-inksoft">{b.dir}</p>
                <p className="mb-6 italic text-inksoft">{p.comer.bares[i].resena}</p>
                <a href={b.telLink} className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-verde px-5 py-2.5 font-semibold text-white transition hover:bg-verde-dark">
                  📞 {p.comer.call} · {b.tel}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ VER */}
      <section id="ver" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker>{p.ver.kicker}</Kicker>
            <h2 className={`${H2} mb-9 max-w-[18ch] text-ink`}>{p.ver.h2}</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.ver.items.map((v, i) => (
              <Reveal key={i} delay={i * 70} className="rounded-2xl border border-black/10 bg-paper p-7 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl">
                <h3 className="mb-2 font-serif text-xl text-verde">{v.titulo}</h3>
                <p className="text-inksoft">{v.texto}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 rounded-2xl bg-verde p-8 text-center text-paper">
            <h3 className="mb-5 font-serif text-2xl">{p.ver.tasteTitle}</h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-medium">
              {p.ver.taste.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* RUTAS */}
      <section id="rutas" className="bg-paper px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker>{p.rutas.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>{p.rutas.h2}</h2>
            <p className="mb-11 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">{p.rutas.intro}</p>
          </Reveal>
          <div className="flex flex-col gap-8">
            {rutasInfo.map((r, i) => {
              const ri = p.rutas.items[i];
              return (
                <Reveal key={i} delay={i * 60} className="grid items-stretch gap-0 overflow-hidden rounded-2xl border border-black/10 bg-cream shadow-sm md:grid-cols-2">
                  <div className="flex flex-col p-7">
                    <h3 className="mb-3 font-serif text-2xl text-ink">{ri.titulo}</h3>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {ri.meta.map((m) => (<span key={m} className="rounded-full bg-verde/10 px-3 py-1 text-[0.82rem] font-semibold text-verde-dark">{m}</span>))}
                    </div>
                    <p className="mb-5 text-inksoft">{ri.texto}</p>
                    <a href={r.url} target="_blank" rel="noopener" className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-verde px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-verde-dark">{p.rutas.open}</a>
                  </div>
                  <div className="min-h-[320px] bg-cream2">
                    <TrackMap gpx={r.gpx} wikilocId={r.wikilocId} fallback={OJUELOS} label={ri.titulo} />
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mt-10 rounded-2xl border border-black/10 bg-cream p-7 shadow-sm">
            <h3 className="mb-2 font-serif text-xl text-ink">{p.rutas.moreTitle}</h3>
            <Rich className="rich text-inksoft" html={p.rutas.more} />
          </Reveal>
        </div>
      </section>

      {/* CERCA DE AQUÍ */}
      <section id="alrededores" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker>{p.alrededores.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[20ch] text-ink`}>{p.alrededores.h2}</h2>
            <p className="mb-11 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">{p.alrededores.intro}</p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.alrededores.items.map((l, i) => (
              <Reveal
                key={i}
                delay={i * 60}
                className="flex flex-col rounded-2xl border border-black/10 bg-paper p-7 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
              >
                <span className="mb-2 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-albero">
                  {l.donde}
                </span>
                <h3 className="mb-2 font-serif text-xl text-verde">{l.titulo}</h3>
                <p className="text-[0.96rem] text-inksoft">{l.texto}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CIELO */}
      <section id="cielo" className="night-bg relative overflow-hidden px-4 py-[clamp(4.5rem,9vw,8rem)] text-center text-[#eef2ff] sm:px-8">
        <div className="stars pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto w-[min(780px,92vw)]">
          <Reveal>
            <Kicker light>{p.cielo.kicker}</Kicker>
            <h2 className={`${H2} mx-auto mb-6 max-w-[18ch] text-paper`}>{p.cielo.h2}</h2>
            <Rich className="rich rich-light mx-auto mb-10 max-w-[60ch] text-[clamp(1.1rem,2vw,1.3rem)] text-[#eef2ff]/90" html={p.cielo.lead} />
          </Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-x-14 gap-y-6">
            {p.cielo.facts.map((f) => (
              <div key={f.l} className="flex flex-col">
                <span className="font-serif text-[clamp(1.5rem,3vw,2.1rem)] text-albero-light">{f.n}</span>
                <span className="text-[0.82rem] uppercase tracking-[0.1em] text-[#eef2ff]/65">{f.l}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto max-w-[56ch] text-[#eef2ff]/80">{p.cielo.closing}</p>
        </div>
      </section>

      {/* METEORITO 1926 */}
      <section id="meteorito" className="night-bg relative overflow-hidden border-t border-white/10 px-4 py-[clamp(4.5rem,9vw,8rem)] text-[#eef2ff] sm:px-8">
        <div className="stars pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto w-[min(820px,92vw)]">
          <Reveal>
            <Kicker light>{p.meteorito.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[20ch] text-paper`}>{p.meteorito.h2}</h2>
          </Reveal>
          <Reveal className="rich rich-light space-y-5 text-[clamp(1.05rem,1.6vw,1.18rem)] leading-[1.8] text-[#eef2ff]/90">
            {p.meteorito.p.map((html, i) => (
              <Rich key={i} html={html} />
            ))}
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-2.5">
            {p.meteorito.chips.map((c) => (
              <span key={c} className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium">{c}</span>
            ))}
          </Reveal>
          <Reveal className="mt-7 flex flex-wrap gap-4">
            <a
              href="https://diarium.usal.es/guillermo/astronomia/disputas-por-el-meteorito-de-ojuelos-altos-1926/"
              target="_blank"
              rel="noopener"
              className="rounded-full bg-albero px-5 py-2.5 font-semibold text-[#1a140f] transition hover:-translate-y-0.5"
            >
              {p.meteorito.btnRead}
            </a>
            <a
              href="https://diarium.usal.es/guillermo/files/2021/07/El-meteorito-de-Ojuelos-AltosEstratos.pdf"
              target="_blank"
              rel="noopener"
              className="rounded-full border-2 border-white/40 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              {p.meteorito.btnPdf}
            </a>
          </Reveal>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker>{p.galeria.kicker}</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>{p.galeria.h2}</h2>
            <p className="mb-8 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">{p.galeria.intro}</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galeriaInfo.map((f, i) => (
              <GalleryItem key={f.src} src={f.src} wide={f.wide} caption={p.galeria.captions[i]} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA ASOCIACIÓN */}
      <section className="bg-linear-to-br from-verde to-verde-dark px-4 py-[clamp(4rem,8vw,7rem)] text-center text-paper sm:px-8">
        <div className="mx-auto w-[min(720px,92vw)]">
          <Reveal>
            <Kicker light>{p.ctaAsoc.kicker}</Kicker>
            <h2 className={`${H2} mx-auto mb-5 max-w-[20ch] text-paper`}>{p.ctaAsoc.h2}</h2>
            <p className="mx-auto mb-8 max-w-[56ch] text-lg text-paper/90">{p.ctaAsoc.p}</p>
            <a href={URL_ASOC} className="inline-block rounded-full bg-white px-7 py-3.5 font-semibold text-verde shadow-lg transition hover:-translate-y-0.5">
              {p.ctaAsoc.btn}
            </a>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a140f] px-4 pb-24 pt-12 text-paper/80 sm:px-8 md:pb-6">
        <div className="mx-auto flex w-[min(1140px,92vw)] flex-wrap items-center justify-between gap-8 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3.5 text-albero-light">
            <VillageLogo className="h-12 w-12" />
            <div className="text-paper/80">
              <strong className="block font-serif text-lg text-white">Ojuelos Altos</strong>
              <span className="text-sm">{p.footer.subtitle}</span>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#pueblo" className="hover:text-albero-light">{p.footer.pueblo}</a>
            <a href="#comer" className="hover:text-albero-light">{p.footer.comer}</a>
            <a href="#rutas" className="hover:text-albero-light">{p.footer.rutas}</a>
            <a href="#cielo" className="hover:text-albero-light">{p.footer.cielo}</a>
            <a href={FACEBOOK_PUEBLO_URL} target="_blank" rel="noopener" className="hover:text-albero-light">{p.footer.fbPueblo}</a>
            <a href={URL_ASOC} className="hover:text-albero-light">{p.footer.asoc}</a>
            <a href={AYTO_URL} target="_blank" rel="noopener" className="hover:text-albero-light">{p.footer.ayto}</a>
          </nav>
        </div>
        <p className="mx-auto mt-6 max-w-[60ch] text-center text-xs text-paper/40">{p.footer.credits}</p>
        <p className="mt-3 text-center text-[0.8rem] text-paper/50">
          © {new Date().getFullYear()} Ojuelos Altos · {p.footer.madeBy} (
          <a href="mailto:contacto@pmanso.es" className="underline underline-offset-2 hover:text-albero-light">contacto@pmanso.es</a>)
        </p>
      </footer>

      {/* Barra inferior fija (móvil) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-black/10 bg-paper/95 px-4 py-3 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.4)] backdrop-blur md:hidden">
        <a href={URL_ASOC} className="flex-1 rounded-full bg-verde px-5 py-3 text-center font-semibold text-white">
          {p.mobileCta}
        </a>
      </div>
    </>
  );
}
