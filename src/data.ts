// Coordenadas verificables (Wikipedia: 38°10′49″N 5°21′25″O)
export const OJUELOS: [number, number] = [38.1803, -5.3569];
export const FUENTE_OBEJUNA: [number, number] = [38.2667, -5.4167];

export const WHATSAPP_URL = "https://chat.whatsapp.com/"; // TODO: enlace real del grupo
export const FACEBOOK_URL =
  "https://www.facebook.com/groups/asociaciondevecinoselhorno?locale=es_ES";
export const FACEBOOK_PUEBLO_URL =
  "https://www.facebook.com/groups/46499739583/?locale=es_ES";
export const AYTO_URL = "https://fuenteobejuna.es/";

export type Evento = { mes: string; titulo: string; texto: string };
export const eventos: Evento[] = [
  {
    mes: "May",
    titulo: "San Antonio",
    texto:
      "Fiesta del santo del pueblo: procesión desde la iglesia hasta el albergue, lectura, coro y convivencia con comida y música hasta el atardecer. Reúne a vecinos y visitantes de toda la comarca.",
  },
  {
    mes: "Jun",
    titulo: "Fiesta de la Siega",
    texto:
      "Una creación de la propia asociación: recreación de la siega, oficios y artesanía en torno al grano y al pan. Memoria del campo y del horno que nos da nombre.",
  },
  {
    mes: "Ago",
    titulo: "Feria de verano",
    texto:
      "La gran feria de la aldea, entre la última semana de julio y la primera de agosto. Verbena, reencuentros y el pueblo lleno de quienes vuelven cada verano.",
  },
];

export type Noticia = { fuente: string; titulo: string; url: string };
export const noticias: Noticia[] = [
  {
    fuente: "Infoguadiato",
    titulo:
      "La celebración de San Antonio reunió a vecinos y visitantes en Ojuelos Altos",
    url: "https://infoguadiato.com/la-celebracion-de-san-antonio-reunio-a-vecinos-y-visitantes-en-ojuelos-altos/",
  },
  {
    fuente: "Diario Córdoba · 2007",
    titulo: "La fiesta de la siega de Ojuelos Altos",
    url: "https://www.diariocordoba.com/cordoba-ciudad/2007/06/17/fiesta-siega-38442671.html",
  },
  {
    fuente: "Fuenteovejuna Universal · 2010",
    titulo: "V Fiesta de la Siega en Ojuelos Altos",
    url: "https://fuenteovejunauniversal.blogspot.com/2010/06/v-fiesta-de-la-siega-en-ojuelos-altos.html",
  },
];

export type Ver = { titulo: string; texto: string };
export const queVer: Ver[] = [
  {
    titulo: "Iglesia de Santa Bárbara",
    texto:
      "Templo del siglo XVI, con cúpula sobre pechinas. Preside el Santísimo Cristo de las Injurias, junto a Santa Bárbara y San Antonio.",
  },
  {
    titulo: "El horno de pan",
    texto:
      "El horno comunal de la Plaza de las Ánimas, corazón de la vida del pueblo y origen del nombre de la asociación.",
  },
  {
    titulo: "Ruta Sierra de Ojuelos Altos",
    texto:
      "Sendero circular de 11 km (unas 3 h 30, dificultad media) por dehesa, encinar y arroyo. Forma parte del circuito NaturCOR.",
  },
  {
    titulo: "Dehesa y fauna",
    texto:
      "Encinares donde se cobijan tórtolas, palomas, conejos y liebres, y donde se cría el cerdo ibérico. Paisaje de monte mediterráneo ideal para senderismo y BTT.",
  },
];

export type Ruta = {
  titulo: string;
  meta: string[];
  texto: string;
  gpx: string; // /assets/tracks/x.gpx — cae al mapa de zona si aún no existe
  wikilocId: number;
  url: string;
};
// Rutas reales (IDs Wikiloc verificados). El track se pinta nativo desde el GPX.
export const rutas: Ruta[] = [
  {
    titulo: "Ojuelos Bajos – Ojuelos Altos",
    meta: ["↔ ~12 km", "⏱ ~4 h 30", "📈 Media-baja", "🔁 Circular"],
    texto:
      "Ruta circular entre las dos aldeas por caminos tradicionales, con campos de labor, prados y monte mediterráneo. La mejor para hacerse una idea del entorno.",
    gpx: "/assets/tracks/ojuelos-bajos-altos.gpx",
    wikilocId: 55906673,
    url: "https://es.wikiloc.com/rutas-senderismo/ojuelos-bajos-ojuelos-altos-55906673",
  },
  {
    titulo: "De la Cardenchosa a Ojuelos Altos",
    meta: ["🚶 Encomienda Mellariense"],
    texto:
      "Etapa del Camino de la Encomienda Mellariense, el sendero que enlaza las catorce aldeas de Fuente Obejuna por los caminos públicos de siempre. Llega a Ojuelos Altos desde la vecina La Cardenchosa.",
    gpx: "/assets/tracks/cardenchosa-ojuelos.gpx",
    wikilocId: 11125001,
    url: "https://es.wikiloc.com/rutas-senderismo/de-la-cardenchosa-a-ojuelos-altos-11125001",
  },
  {
    titulo: "Circula por Ojuelos Altos",
    meta: ["🥾 Senderismo", "📈 Asequible"],
    texto:
      "Un recorrido por el entorno de la aldea, entre dehesa, encinar y berrocales de granito. Buena opción para una mañana sin alejarse mucho del pueblo.",
    gpx: "/assets/tracks/circula-ojuelos.gpx",
    wikilocId: 12679848,
    url: "https://www.wikiloc.com/hiking-trails/circula-por-ojuelos-altos-fuente-obejuna-12679848",
  },
];

export const SOCIO_EMAIL = "vecinoselhorno@gmail.com";
export const URL_PUEBLO = "https://ojuelosaltos.es";
export const URL_ASOC = "https://elhorno.ojuelosaltos.es";

export type Lugar = { titulo: string; donde: string; texto: string };
export const alrededores: Lugar[] = [
  {
    titulo: "Palacete Modernista (Casa Cardona)",
    donde: "Fuente Obejuna · 13 km",
    texto:
      "La obra cumbre del modernismo en la provincia de Córdoba (1905-1908). Hoy alberga la oficina de turismo y el Museo Histórico Municipal. Visitable por dentro.",
  },
  {
    titulo: "Ruinas romanas de Mellaria",
    donde: "Cerro Masatrigo, Fuente Obejuna",
    texto:
      "El único municipio romano conocido del Alto Guadiato, citado por Plinio. Tuvo acueducto y una fuente romana de las mejor conservadas de Hispania.",
  },
  {
    titulo: "Plaza de Lope de Vega",
    donde: "Fuente Obejuna",
    texto:
      "El corazón del pueblo grande y escenario del levantamiento de 1476. Aquí se representa Fuenteovejuna, la obra de Lope de Vega.",
  },
  {
    titulo: "Dolmen de Los Delgados",
    donde: "Fuente Obejuna",
    texto:
      "Sepultura megalítica del Calcolítico: la huella de quienes habitaron esta sierra miles de años atrás.",
  },
  {
    titulo: "Observatorio Giordano Bruno",
    donde: "Piconcillo (aldea vecina)",
    texto:
      "Sociedad astronómica con observatorio, en pleno Destino Starlight del Valle del Alto Guadiato. Noches de estrellas con telescopio.",
  },
  {
    titulo: "Museo del Territorio Minero",
    donde: "Belmez",
    texto:
      "La memoria minera del Guadiato, una de las señas de identidad de toda la comarca, contada en un museo cercano.",
  },
];

export type Bar = {
  nombre: string;
  tel: string;
  telLink: string;
  dir: string;
  rating: string;
  resena: string;
};
export const bares: Bar[] = [
  {
    nombre: "Bar Plaza",
    tel: "957 57 41 58",
    telLink: "tel:+34957574158",
    dir: "Plaza de la Constitución, Ojuelos Altos",
    rating: "4,6★ · 389 reseñas",
    resena:
      "«Como entrar en casa de un familiar». Comida casera tradicional muy bien hecha, limpieza y el trato cercano de Loli. Precios asequibles.",
  },
  {
    nombre: "Coco's",
    tel: "957 57 42 74",
    telLink: "tel:+34957574274",
    dir: "Calle Juan Pedro Barrena, Ojuelos Altos",
    rating: "4,6★ · 84 reseñas",
    resena:
      "Papas, flamenquín y buen pescado. Sitio sencillo, gente maja y de los que repites.",
  },
];

export type Tramo = {
  nombre: string;
  precio: string;
  piscina: string;
  piscinaGratis: boolean;
  destacado?: boolean;
  puntos: string[];
};
export type Grupo = { titulo: string; sub: string; tramos: Tramo[] };
export const grupos: Grupo[] = [
  {
    titulo: "Socios antiguos",
    sub: "Más de 5 años en la asociación",
    tramos: [
      {
        nombre: "Cuota básica",
        precio: "20",
        piscina: "2 € por baño",
        piscinaGratis: false,
        puntos: [
          "Apoyas las fiestas del pueblo",
          "Acceso a la piscina (2 € cada entrada)",
          "Voz en la asociación",
        ],
      },
      {
        nombre: "Cuota completa",
        precio: "50",
        piscina: "gratis todo el verano",
        piscinaGratis: true,
        destacado: true,
        puntos: [
          "Todo lo anterior",
          "Piscina sin pagar por baño",
          "La opción más elegida del pueblo",
        ],
      },
    ],
  },
  {
    titulo: "Socios nuevos",
    sub: "5 años o menos en la asociación",
    tramos: [
      {
        nombre: "Cuota básica",
        precio: "60",
        piscina: "2 € por baño",
        piscinaGratis: false,
        puntos: [
          "Apoyas las fiestas del pueblo",
          "Acceso a la piscina (2 € cada entrada)",
          "Voz en la asociación",
        ],
      },
      {
        nombre: "Cuota completa",
        precio: "90",
        piscina: "gratis todo el verano",
        piscinaGratis: true,
        destacado: true,
        puntos: [
          "Todo lo anterior",
          "Piscina sin pagar por baño",
          "Recomendada si vas a usar la piscina",
        ],
      },
    ],
  },
];

export type Foto = {
  src: string;
  caption: string;
  wide?: boolean;
  placeholder?: string;
};
export const galeria: Foto[] = [
  { src: "/assets/fotos/foto-aldea.jpg", caption: "Ojuelos Altos", wide: true },
  {
    src: "/assets/fotos/fuenteobejuna-plaza-lope.jpg",
    caption: "Plaza de Lope de Vega, Fuente Obejuna",
  },
  { src: "/assets/fotos/foto-horno.jpg", caption: "El horno de pan" },
  { src: "/assets/fotos/paisaje-olivos.jpg", caption: "Olivos de la sierra" },
  { src: "/assets/fotos/foto-iglesia.jpg", caption: "Iglesia de Santa Bárbara" },
  {
    src: "/assets/fotos/foto-piscina.jpg",
    caption: "La piscina de la asociación",
    wide: true,
  },
  {
    src: "/assets/fotos/foto-fiestas.jpg",
    caption: "Las fiestas del pueblo",
    wide: true,
  },
  { src: "/assets/fotos/foto-calles.jpg", caption: "Calles de la aldea" },
  { src: "/assets/fotos/foto-plaza.jpg", caption: "La plaza de la iglesia", wide: true },
  { src: "/assets/fotos/foto-espadana.jpg", caption: "La espadaña de Santa Bárbara" },
  { src: "/assets/fotos/foto-paseo.jpg", caption: "Un paseo por el pueblo" },
];
