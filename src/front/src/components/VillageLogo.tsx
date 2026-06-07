/**
 * El horno de Ojuelos Altos, vectorizado limpio a partir del escudo:
 * chimenea de piedra + horno abovedado (cúpula con hiladas) sobre base cúbica.
 * Line-art monocromo, usa currentColor.
 */
export default function VillageLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="El horno de Ojuelos Altos"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* ===== Chimenea (detrás) ===== */}
      {/* remate / capa superior */}
      <path d="M40 9 h11 v4 h-11 z" fill="currentColor" stroke="none" />
      {/* fuste ligeramente troncocónico */}
      <path d="M42 13 L40.5 47 H50.5 L49 13 Z" />
      {/* hiladas de piedra */}
      <path d="M41.6 22 H49.4 M41.2 31 H49.8 M40.8 40 H50.2" strokeWidth={1.4} />

      {/* ===== Base cúbica (delante) ===== */}
      <path d="M13 35 L13 53 H35 V35" />
      {/* cara superior en perspectiva */}
      <path d="M13 35 L18 31 H40 L35 35 Z" />
      {/* arista derecha de la caja */}
      <path d="M35 35 L40 31 V49 L35 53" strokeWidth={1.6} />

      {/* ===== Cúpula del horno ===== */}
      <path d="M13 35 A 11 11 0 0 1 35 35" fill="currentColor" fillOpacity={0.07} />
      {/* hiladas de la cúpula */}
      <path d="M15.5 30.5 A 8.4 8.4 0 0 1 32.5 30.5" strokeWidth={1.4} />
      <path d="M18.5 26.6 A 5.6 5.6 0 0 1 29.5 26.6" strokeWidth={1.4} />
      {/* boca del horno */}
      <path d="M20 35 v-4 a4 4 0 0 1 8 0 v4 z" fill="currentColor" stroke="none" />
    </svg>
  );
}
