// ===== Constantes NO traducibles =====
// El texto (títulos, descripciones, prosa) vive en los diccionarios de src/i18n/locales.
// Aquí solo lo estable entre idiomas: coordenadas, URLs, teléfonos, fotos, IDs.

// Coordenadas verificables (Wikipedia: 38°10′49″N 5°21′25″O)
export const OJUELOS: [number, number] = [38.1803, -5.3569];
export const FUENTE_OBEJUNA: [number, number] = [38.2667, -5.4167];

export const WHATSAPP_URL = "https://chat.whatsapp.com/"; // TODO: enlace real del grupo
export const FACEBOOK_URL =
  "https://www.facebook.com/groups/asociaciondevecinoselhorno?locale=es_ES";
export const FACEBOOK_PUEBLO_URL =
  "https://www.facebook.com/groups/46499739583/?locale=es_ES";
export const AYTO_URL = "https://fuenteobejuna.es/";
export const WIKILOC_LIST_URL =
  "https://www.wikiloc.com/trails/hiking/spain/andalusia/ojuelos-altos";

export const SOCIO_EMAIL = "vecinoselhorno@gmail.com";
export const URL_PUEBLO = "https://ojuelosaltos.es";
export const URL_ASOC = "https://elhorno.ojuelosaltos.es";

// Bares: datos estables. El rating y la reseña (texto) van en el diccionario, por índice.
export type BarInfo = { nombre: string; tel: string; telLink: string; dir: string };
export const baresInfo: BarInfo[] = [
  {
    nombre: "Bar Plaza",
    tel: "957 57 41 58",
    telLink: "tel:+34957574158",
    dir: "Plaza de la Constitución, Ojuelos Altos",
  },
  {
    nombre: "Coco's",
    tel: "957 57 42 74",
    telLink: "tel:+34957574274",
    dir: "Calle Juan Pedro Barrena, Ojuelos Altos",
  },
];

// Rutas: track estable. titulo/meta/texto van en el diccionario, por índice.
export type RutaInfo = { gpx: string; wikilocId: number; url: string };
export const rutasInfo: RutaInfo[] = [
  {
    gpx: "/assets/tracks/ojuelos-bajos-altos.gpx",
    wikilocId: 55906673,
    url: "https://es.wikiloc.com/rutas-senderismo/ojuelos-bajos-ojuelos-altos-55906673",
  },
  {
    gpx: "/assets/tracks/cardenchosa-ojuelos.gpx",
    wikilocId: 11125001,
    url: "https://es.wikiloc.com/rutas-senderismo/de-la-cardenchosa-a-ojuelos-altos-11125001",
  },
  {
    gpx: "/assets/tracks/circula-ojuelos.gpx",
    wikilocId: 12679848,
    url: "https://www.wikiloc.com/hiking-trails/circula-por-ojuelos-altos-fuente-obejuna-12679848",
  },
];

// Galería: la foto es estable; el pie (caption) va en el diccionario, por índice.
export type FotoInfo = { src: string; wide?: boolean };
export const galeriaInfo: FotoInfo[] = [
  { src: "/assets/fotos/foto-aldea.jpg", wide: true },
  { src: "/assets/fotos/fuenteobejuna-plaza-lope.jpg" },
  { src: "/assets/fotos/foto-horno.jpg" },
  { src: "/assets/fotos/paisaje-olivos.jpg" },
  { src: "/assets/fotos/foto-iglesia.jpg" },
  { src: "/assets/fotos/foto-piscina.jpg", wide: true },
  { src: "/assets/fotos/foto-fiestas.jpg", wide: true },
  { src: "/assets/fotos/foto-calles.jpg" },
  { src: "/assets/fotos/foto-plaza.jpg", wide: true },
  { src: "/assets/fotos/foto-espadana.jpg" },
  { src: "/assets/fotos/foto-paseo.jpg" },
];

// Prensa: titulares reales de artículos en español → se dejan tal cual (no se inventan/traducen).
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
