import { useEffect, useState, type ReactNode, type ElementType } from "react";
import L, { type LatLngBoundsExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { useInView } from "../hooks";

/** Envuelve contenido y lo revela al entrar en pantalla. */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function Kicker({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${
        light ? "text-albero-light" : "text-verde"
      }`}
    >
      {children}
    </p>
  );
}

const pinIcon = L.divIcon({
  className: "",
  html: '<div class="pin"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 18],
  popupAnchor: [0, -16],
});

export type Punto = { pos: [number, number]; label: string };

export function MapView({
  center,
  zoom,
  markers,
  className = "h-[400px]",
}: {
  center: [number, number];
  zoom: number;
  markers: Punto[];
  className?: string;
}) {
  return (
    <div
      className={`${className} w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_-22px_rgba(42,32,26,0.5)] ring-1 ring-black/10`}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker key={m.label} position={m.pos} icon={pinIcon}>
            <Popup>{m.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(positions as LatLngBoundsExpression, { padding: [24, 24] });
    }
  }, [map, positions]);
  return null;
}

/**
 * Track de la ruta. Si hay GPX propio (`/assets/tracks/x.gpx`) lo pinta nativo
 * sobre OpenStreetMap; mientras no exista, muestra el track real de Wikiloc
 * embebido. Así siempre se ve el recorrido, y al añadir el GPX sube a nativo.
 */
export function TrackMap({
  gpx,
  wikilocId,
  fallback,
  label,
  className = "h-full min-h-[320px]",
}: {
  gpx?: string;
  wikilocId?: number;
  fallback: [number, number];
  label: string;
  className?: string;
}) {
  const [pts, setPts] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!gpx) return;
    let alive = true;
    fetch(gpx)
      .then((r) => {
        if (!r.ok) throw new Error("sin gpx");
        return r.text();
      })
      .then((xml) => {
        const doc = new DOMParser().parseFromString(xml, "application/xml");
        const nodes = Array.from(doc.querySelectorAll("trkpt, rtept"));
        const coords = nodes
          .map((n) => [
            parseFloat(n.getAttribute("lat") || ""),
            parseFloat(n.getAttribute("lon") || ""),
          ] as [number, number])
          .filter(([la, lo]) => !Number.isNaN(la) && !Number.isNaN(lo));
        if (alive) setPts(coords);
      })
      .catch(() => {
        /* sin GPX aún: cae al embed de Wikiloc */
      });
    return () => {
      alive = false;
    };
  }, [gpx]);

  // Aún sin track nativo: mostrar el track real de Wikiloc embebido.
  if (pts.length <= 1 && wikilocId) {
    return (
      <iframe
        title={`Track de ${label} en Wikiloc`}
        src={`https://www.wikiloc.com/wikiloc/embedv2.do?id=${wikilocId}&measures=on&title=off&near=off&images=off&maptype=H`}
        loading="lazy"
        className={`${className} w-full border-0`}
      />
    );
  }

  return (
    <div className={`${className} w-full`}>
      <MapContainer
        center={fallback}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={pts} pathOptions={{ color: "#a8362a", weight: 4, opacity: 0.9 }} />
        <Marker position={pts[0]} icon={pinIcon}>
          <Popup>Inicio · {label}</Popup>
        </Marker>
        <FitBounds positions={pts} />
      </MapContainer>
    </div>
  );
}
