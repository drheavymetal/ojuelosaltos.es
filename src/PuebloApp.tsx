import { useEffect } from "react";
import Nav from "./components/Nav";
import VillageLogo from "./components/VillageLogo";
import { Reveal, Kicker, MapView, TrackMap } from "./components/ui";
import { H2, Counter, Stat, GalleryItem, setSeo } from "./shared";
import {
  OJUELOS,
  FUENTE_OBEJUNA,
  AYTO_URL,
  URL_ASOC,
  FACEBOOK_PUEBLO_URL,
  queVer,
  rutas,
  bares,
  galeria,
  alrededores,
} from "./data";

const links = [
  { href: "#pueblo", label: "El pueblo" },
  { href: "#historia", label: "Historia" },
  { href: "#comer", label: "Comer" },
  { href: "#rutas", label: "Rutas" },
  { href: "#alrededores", label: "Alrededores" },
  { href: "#cielo", label: "Cielo" },
];

export default function PuebloApp() {
  useEffect(() => {
    setSeo({
      title: "Ojuelos Altos · Aldea de Fuente Obejuna (Córdoba)",
      description:
        "Ojuelos Altos, aldea de Fuente Obejuna en la Sierra de Córdoba: historia, dónde comer (Bar Plaza y Coco's), rutas de senderismo, cielo Starlight y la Asociación de Vecinos El Horno.",
      canonical: "https://ojuelosaltos.es/",
      image: "https://ojuelosaltos.es/assets/fotos/foto-aldea.jpg",
      favicon: "/favicon.svg",
    });
  }, []);

  return (
    <>
      <Nav
        brand={{
          logo: <VillageLogo className="h-11 w-11 text-almagre-dark" />,
          title: "Ojuelos Altos",
          subtitle: "Sierra de Córdoba",
        }}
        links={links}
        cta={{ href: URL_ASOC, label: "La asociación ↗", external: true }}
      />

      {/* HERO */}
      <section id="inicio" className="hero-bg relative flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-28 text-paper sm:px-8">
        <div className="relative z-10 w-full min-w-0 max-w-3xl">
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-albero-light sm:mb-5 sm:text-sm sm:tracking-[0.2em]">
            Aldea de Fuente Obejuna · Sierra de Córdoba
          </p>
          <h1 className="mb-5 font-serif text-[clamp(2.4rem,9vw,6rem)] font-semibold leading-[1.02] tracking-tight break-words sm:mb-6">
            Ojuelos Altos
          </h1>
          <p className="mb-8 max-w-[56ch] text-base text-paper/90 sm:mb-9 sm:text-[clamp(1.05rem,2vw,1.3rem)]">
            Una aldea encalada en la sierra del norte de Córdoba. Se come bien, las fiestas
            llenan el verano y, cuando cae la noche, hay un cielo de los que ya casi no
            quedan.
          </p>
          <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:gap-4">
            <a href="#pueblo" className="rounded-full bg-verde px-6 py-3.5 text-center font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-verde-dark">
              Conoce el pueblo
            </a>
            <a href={URL_ASOC} className="rounded-full border-2 border-white/70 px-6 py-3.5 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
              Asociación de Vecinos «El Horno» ↗
            </a>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-12">
            <Stat number={<Counter end={180} />} label="vecinos" />
            <Stat number={<Counter end={621} suffix=" m" />} label="de altitud" />
            <Stat number={<span className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-albero-light">1476</span>} label="origen de la aldea" />
          </div>
        </div>
        <a href="#pueblo" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-2xl text-white/70" aria-label="Bajar">↓</a>
      </section>

      {/* EL PUEBLO */}
      <section id="pueblo" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(820px,92vw)]">
          <Reveal>
            <Kicker>Ojuelos Altos</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>Una aldea entre encinas, al norte de Córdoba</h2>
          </Reveal>
          <Reveal className="space-y-5 text-[clamp(1.05rem,1.6vw,1.18rem)] leading-[1.8] text-inksoft">
            <p>
              Ojuelos Altos es una de las catorce aldeas que tiene Fuente Obejuna, repartidas
              por la sierra al noroeste de la provincia de Córdoba. Está a unos trece
              kilómetros del pueblo grande, metida en el Valle del Alto Guadiato, rodeada de
              dehesa, encinas y algún olivar de los de monte. Quien sube hasta aquí se
              encuentra calles encaladas, tranquilas, con flores en las paredes y esa luz tan
              de la sierra que lo blanquea todo.
            </p>
            <p>
              No somos muchos. En el padrón andamos cerca de los ciento ochenta vecinos,
              aunque a mediados del siglo XIX llegamos a ser más de trescientos. Aquí siempre
              se ha vivido del campo: trigo, cebada y garbanzos en las tierras de labor, y
              luego el ganado, con el cerdo ibérico criándose en la dehesa de encinas. También
              se ha sacado buena miel. Los días de fiesta y los veranos el pueblo se llena
              otra vez con los que volvemos.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <p className="mb-3 text-sm font-medium text-inksoft">
              ¿Dónde está? En plena Sierra Morena cordobesa, cerca de la raya con Badajoz:
            </p>
            <MapView center={[38.22, -5.39]} zoom={10} markers={[{ pos: OJUELOS, label: "Ojuelos Altos" }, { pos: FUENTE_OBEJUNA, label: "Fuente Obejuna" }]} />
          </Reveal>
          <Reveal className="mt-12 border-t-2 border-almagre/15 pt-10">
            <h3 className="mb-5 font-serif text-[1.7rem] text-verde">De dónde venimos</h3>
            <div className="space-y-5 text-[clamp(1.05rem,1.6vw,1.18rem)] leading-[1.8] text-inksoft">
              <p>
                La aldea nace al calor de la repoblación de finales del siglo XV, cuando se
                quiso reunir a las familias que andaban dispersas por Sierra Morena. El nombre
                ya aparece en papeles del siglo XVI: hay escrituras de la época que hablan de{" "}
                <em>«casas y viñas en la fuente del ojuelo»</em>. De aquella fuente y aquel
                paraje viene lo de Ojuelos. Por los alrededores aún aparecen restos de
                poblados antiguos y más dispersos —trozos de tinajas, tejas y piedras de
                molino— de la gente que vivió aquí mucho antes.
              </p>
              <p>
                El corazón del pueblo de siempre ha sido la{" "}
                <strong className="text-ink">iglesia de Santa Bárbara</strong>, levantada
                hacia 1552. Durante mucho tiempo dependió de la vecina Cardenchosa, hasta que
                en 1801 se arregló y pasó a valerse por sí misma. Es una iglesia de una sola
                nave, con la cabecera cubierta por una cúpula, y en el altar preside el
                Santísimo Cristo de las Injurias, acompañado por Santa Bárbara y por San
                Antonio, patrón del pueblo. El cementerio se hizo en 1834.
              </p>
              <p>
                Y luego está <strong className="text-ink">el horno</strong>, el de pan, en la
                Plaza de las Ánimas: el horno comunal donde se cocía el pan de todas las casas
                y que llegó a surtir de buen pan a todo el término municipal. Hoy da nombre y
                escudo a la asociación de vecinos.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HISTORIA */}
      <section id="historia" className="bg-paper px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(820px,92vw)]">
          <Reveal>
            <Kicker>Fuente Obejuna</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>"Fuenteovejuna, todos a una"</h2>
          </Reveal>
          <Reveal className="space-y-5 text-[clamp(1.05rem,1.6vw,1.18rem)] leading-[1.8] text-inksoft">
            <p>
              Pertenecemos a Fuente Obejuna, uno de los municipios más extensos de España:
              casi 600 kilómetros cuadrados de sierra repartidos entre el pueblo y sus catorce
              aldeas, con algo más de cuatro mil habitantes en total. A unos ocho kilómetros
              del casco urbano están las ruinas de <strong className="text-ink">Mellaria</strong>,
              una ciudad romana que ya mencionaba Plinio el Viejo, que llegó a tener su
              acueducto y vivió su mejor momento en los siglos III y IV. En las excavaciones
              de los últimos años apareció allí una fuente romana que dicen que es de las
              mejor conservadas de toda Hispania.
            </p>
            <p>
              El nombre del pueblo viene, según se cuenta, del mercado de la lana que se hacía
              por la zona en el siglo XIV: de la oveja salió lo de «ovejuna». El núcleo actual
              aparece nombrado por primera vez hacia 1315.
            </p>
            <p>
              Pero si Fuente Obejuna es conocida en medio mundo es por lo que pasó en{" "}
              <strong className="text-ink">1476</strong>. La villa estaba en manos de la{" "}
              <strong className="text-ink">Orden de Calatrava</strong>, y su comendador mayor,{" "}
              <strong className="text-ink">Fernán Gómez de Guzmán</strong>, traía al pueblo
              harto con sus abusos. En la noche del 22 al 23 de abril los vecinos se echaron a
              la calle con los aperos del campo convertidos en armas, asaltaron su casa y
              acabaron con él. Cuando el juez de los Reyes Católicos preguntó quién lo había
              hecho, la respuesta fue siempre la misma: <em>Fuenteovejuna</em>. El pueblo
              entero, y nadie en concreto.
            </p>
            <p>
              Aquella historia le valió, más de un siglo después, una obra de teatro de{" "}
              <strong className="text-ink">Lope de Vega</strong>: <em>Fuenteovejuna</em> (1619),
              todavía hoy de las más representadas del teatro español. Todo esto pasa en plena{" "}
              <strong className="text-ink">Sierra Morena</strong>, en el Valle del Alto
              Guadiato, tierra de minas viejas y monte de encinas. Ojuelos Altos es una pieza
              pequeña de ese mapa.
            </p>
          </Reveal>
          <Reveal className="mt-10" as="figure">
            <img src="/assets/fotos/fuenteobejuna-ayuntamiento.jpg" alt="Ayuntamiento e iglesia de Nuestra Señora del Castillo en Fuente Obejuna" loading="lazy" className="w-full rounded-2xl shadow-xl" />
            <figcaption className="mt-3 text-center text-sm italic text-inksoft">El ayuntamiento y la iglesia de Nuestra Señora del Castillo, en Fuente Obejuna.</figcaption>
          </Reveal>
        </div>
      </section>

      {/* DÓNDE COMER */}
      <section id="comer" className="bg-linear-to-br from-almagre to-almagre-dark px-4 py-[clamp(4.5rem,9vw,8rem)] text-paper sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker light>Dónde comer</Kicker>
            <h2 className={`${H2} mb-6 max-w-[20ch] text-paper`}>Los bares del pueblo</h2>
            <p className="mb-11 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-paper/90">
              Aquí se come bien y sin pretensiones. Dos bares de siempre para tapear o
              sentarse a comer casero. Mejor llamar antes, sobre todo en fiestas.
            </p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {bares.map((b, i) => (
              <Reveal key={b.nombre} delay={i * 80} className="flex flex-col rounded-2xl bg-paper p-7 shadow-lg transition hover:-translate-y-1.5">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <h3 className="font-serif text-2xl text-ink">{b.nombre}</h3>
                  <span className="shrink-0 rounded-full bg-albero/20 px-3 py-1 text-[0.8rem] font-semibold text-almagre-dark">{b.rating}</span>
                </div>
                <p className="mb-4 text-sm text-inksoft">{b.dir}</p>
                <p className="mb-6 italic text-inksoft">{b.resena}</p>
                <a href={b.telLink} className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-verde px-5 py-2.5 font-semibold text-white transition hover:bg-verde-dark">
                  📞 Llamar · {b.tel}
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
            <Kicker>Naturaleza y patrimonio</Kicker>
            <h2 className={`${H2} mb-9 max-w-[18ch] text-ink`}>Qué ver y qué hacer</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {queVer.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 70} className="rounded-2xl border border-black/10 bg-paper p-7 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl">
                <h3 className="mb-2 font-serif text-xl text-verde">{v.titulo}</h3>
                <p className="text-inksoft">{v.texto}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 rounded-2xl bg-verde p-8 text-center text-paper">
            <h3 className="mb-5 font-serif text-2xl">Para llevarse en el paladar</h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-medium">
              <span>🐖 Jamón y lomo ibérico</span>
              <span>🍯 Miel de la sierra</span>
              <span>🍞 Pan de pueblo</span>
              <span>🫒 Aceite de olivar serrano</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RUTAS */}
      <section id="rutas" className="bg-paper px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker>Senderismo</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>Caminar la sierra</h2>
            <p className="mb-11 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">
              Alrededor del pueblo hay caminos viejos que cruzan la dehesa y bajan a los
              arroyos, entre olivares de sierra y berrocales de granito.
            </p>
          </Reveal>
          <div className="flex flex-col gap-8">
            {rutas.map((r, i) => (
              <Reveal key={r.titulo} delay={i * 60} className="grid items-stretch gap-0 overflow-hidden rounded-2xl border border-black/10 bg-cream shadow-sm md:grid-cols-2">
                <div className="flex flex-col p-7">
                  <h3 className="mb-3 font-serif text-2xl text-ink">{r.titulo}</h3>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {r.meta.map((m) => (<span key={m} className="rounded-full bg-verde/10 px-3 py-1 text-[0.82rem] font-semibold text-verde-dark">{m}</span>))}
                  </div>
                  <p className="mb-5 text-inksoft">{r.texto}</p>
                  <a href={r.url} target="_blank" rel="noopener" className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-verde px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-verde-dark">Abrir en Wikiloc ↗</a>
                </div>
                <div className="min-h-[320px] bg-cream2">
                  <TrackMap gpx={r.gpx} wikilocId={r.wikilocId} fallback={OJUELOS} label={r.titulo} />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 rounded-2xl border border-black/10 bg-cream p-7 shadow-sm">
            <h3 className="mb-2 font-serif text-xl text-ink">Y más alrededor</h3>
            <p className="text-inksoft">
              Estos caminos forman parte del{" "}
              <strong className="text-ink">Camino de la Encomienda Mellariense</strong>, que
              enlaza las catorce aldeas de Fuente Obejuna. Y a un rato en coche queda el{" "}
              <strong className="text-ink">Parque Natural Sierra de Hornachuelos</strong>{" "}
              (60.032 ha de Sierra Morena, por la A-3151), con senderos como el del Guadalora o
              el Cordel del Águila. Más rutas con track GPS en{" "}
              <a href="https://www.wikiloc.com/trails/hiking/spain/andalusia/ojuelos-altos" target="_blank" rel="noopener" className="font-semibold text-verde underline underline-offset-2">Wikiloc</a>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CERCA DE AQUÍ */}
      <section id="alrededores" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker>Los alrededores</Kicker>
            <h2 className={`${H2} mb-6 max-w-[20ch] text-ink`}>Cerca de aquí</h2>
            <p className="mb-11 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">
              A un rato en coche hay bastante que ver por el Valle del Alto Guadiato. Estos
              sitios merecen la parada.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alrededores.map((l, i) => (
              <Reveal
                key={l.titulo}
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
            <Kicker light>Astroturismo</Kicker>
            <h2 className={`${H2} mx-auto mb-6 max-w-[18ch] text-paper`}>Un cielo de los buenos</h2>
            <p className="mx-auto mb-10 max-w-[60ch] text-[clamp(1.1rem,2vw,1.3rem)] text-[#eef2ff]/90">
              Fuente Obejuna y sus aldeas forman parte del{" "}
              <strong className="text-albero-light">Destino Turístico Starlight del Valle del Alto Guadiato</strong>,
              una certificación de la Fundación Starlight avalada por la UNESCO. Aquí apenas
              hay contaminación lumínica, así que las noches despejadas se llenan de estrellas.
            </p>
          </Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-x-14 gap-y-6">
            {[{ n: "Starlight", l: "Destino certificado" }, { n: "6", l: "municipios del valle" }, { n: "Giordano Bruno", l: "observatorio en Piconcillo" }].map((f) => (
              <div key={f.l} className="flex flex-col">
                <span className="font-serif text-[clamp(1.5rem,3vw,2.1rem)] text-albero-light">{f.n}</span>
                <span className="text-[0.82rem] uppercase tracking-[0.1em] text-[#eef2ff]/65">{f.l}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto max-w-[56ch] text-[#eef2ff]/80">
            En la cercana aldea de Piconcillo hay una sociedad astronómica con observatorio.
            Una noche de verano, mantita y mirar para arriba: plan completo.
          </p>
        </div>
      </section>

      {/* METEORITO 1926 */}
      <section id="meteorito" className="night-bg relative overflow-hidden border-t border-white/10 px-4 py-[clamp(4.5rem,9vw,8rem)] text-[#eef2ff] sm:px-8">
        <div className="stars pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto w-[min(820px,92vw)]">
          <Reveal>
            <Kicker light>10 de diciembre de 1926</Kicker>
            <h2 className={`${H2} mb-6 max-w-[20ch] text-paper`}>
              El día que cayó una estrella
            </h2>
          </Reveal>
          <Reveal className="space-y-5 text-[clamp(1.05rem,1.6vw,1.18rem)] leading-[1.8] text-[#eef2ff]/90">
            <p>
              La mañana del 10 de diciembre de 1926, hacia las diez, el cielo de Ojuelos
              Altos se abrió. Los vecinos vieron algo <em>«como un volcán de fuego»</em> y
              oyeron un estruendo <em>«como volar un cerro con dinamita»</em>. Las detonaciones
              se escucharon hasta a sesenta kilómetros: en Posadas llegaron a temblar las
              casas. Era un <strong className="text-albero-light">meteorito</strong>, que cayó a
              kilómetro y medio al suroeste del pueblo, cerca del Puerto del Pico, junto al
              camino de Las Lomas.
            </p>
            <p>
              El trozo principal pesaba <strong className="text-albero-light">5,85 kg</strong> —una
              condrita, piedra del espacio rica en olivino—. Se lo disputaron Córdoba y Madrid:
              el ingeniero <strong className="text-white">Antonio Carbonell</strong>, por la Real
              Academia de Ciencias de Córdoba, y el catedrático{" "}
              <strong className="text-white">Lucas Fernández Navarro</strong>, por el Museo de
              Madrid. Mandó Madrid, y allí sigue: se conserva en el{" "}
              <strong className="text-white">Museo Nacional de Ciencias Naturales</strong>.
              Carbonell dejó escrito que los cordobeses deberían reclamar <em>«lo que es suyo»</em>.
            </p>
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-2.5">
            {["☄️ 10 dic 1926", "5,85 kg", "Condrita (L)", "Oído a 60 km", "~1,5 km del pueblo"].map((c) => (
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
              Leer la historia ↗
            </a>
            <a
              href="https://diarium.usal.es/guillermo/files/2021/07/El-meteorito-de-Ojuelos-AltosEstratos.pdf"
              target="_blank"
              rel="noopener"
              className="rounded-full border-2 border-white/40 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              Artículo (PDF) ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="bg-cream px-4 py-[clamp(4.5rem,9vw,8rem)] sm:px-8">
        <div className="mx-auto w-[min(1140px,92vw)]">
          <Reveal>
            <Kicker>Fotos</Kicker>
            <h2 className={`${H2} mb-6 max-w-[18ch] text-ink`}>El pueblo, en imágenes</h2>
            <p className="mb-8 max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.25rem)] text-inksoft">
              Algunas fotos del pueblo y sus rincones.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galeria.map((f) => (<GalleryItem key={f.src} foto={f} />))}
          </div>
        </div>
      </section>

      {/* CTA ASOCIACIÓN */}
      <section className="bg-linear-to-br from-verde to-verde-dark px-4 py-[clamp(4rem,8vw,7rem)] text-center text-paper sm:px-8">
        <div className="mx-auto w-[min(720px,92vw)]">
          <Reveal>
            <Kicker light>Vecinos</Kicker>
            <h2 className={`${H2} mx-auto mb-5 max-w-[20ch] text-paper`}>La Asociación de Vecinos «El Horno»</h2>
            <p className="mx-auto mb-8 max-w-[56ch] text-lg text-paper/90">
              Los vecinos mantienen vivas las fiestas, los espacios comunes y la piscina del
              pueblo. ¿Eres de Ojuelos Altos o tienes raíces aquí? Conoce la asociación y hazte
              socio.
            </p>
            <a href={URL_ASOC} className="inline-block rounded-full bg-white px-7 py-3.5 font-semibold text-verde shadow-lg transition hover:-translate-y-0.5">
              Conoce la Asociación de Vecinos →
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
              <span className="text-sm">Aldea de Fuente Obejuna (Córdoba)</span>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#pueblo" className="hover:text-albero-light">El pueblo</a>
            <a href="#comer" className="hover:text-albero-light">Comer</a>
            <a href="#rutas" className="hover:text-albero-light">Rutas</a>
            <a href="#cielo" className="hover:text-albero-light">Cielo</a>
            <a href={FACEBOOK_PUEBLO_URL} target="_blank" rel="noopener" className="hover:text-albero-light">Facebook del pueblo ↗</a>
            <a href={URL_ASOC} className="hover:text-albero-light">Asociación El Horno ↗</a>
            <a href={AYTO_URL} target="_blank" rel="noopener" className="hover:text-albero-light">Ayto. de Fuente Obejuna ↗</a>
          </nav>
        </div>
        <p className="mx-auto mt-6 max-w-[60ch] text-center text-xs text-paper/40">
          Fotos de Ojuelos Altos cortesía de guadiato.com y del Ayuntamiento de Fuente Obejuna;
          fotos del pueblo, de vecinos. Fuente Obejuna vía Wikimedia Commons (CC BY-SA / CC BY).
          Mapas © OpenStreetMap.
        </p>
        <p className="mt-3 text-center text-[0.8rem] text-paper/50">
          © {new Date().getFullYear()} Ojuelos Altos · Hecho con cariño por y para el pueblo por
          el Dr. Pedro Manso Bernal (
          <a href="mailto:contacto@pmanso.es" className="underline underline-offset-2 hover:text-albero-light">contacto@pmanso.es</a>)
        </p>
      </footer>

      {/* Barra inferior fija (móvil) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-black/10 bg-paper/95 px-4 py-3 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.4)] backdrop-blur md:hidden">
        <a href={URL_ASOC} className="flex-1 rounded-full bg-verde px-5 py-3 text-center font-semibold text-white">
          Asociación de Vecinos «El Horno» →
        </a>
      </div>
    </>
  );
}
