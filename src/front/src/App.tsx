import PuebloApp from "./PuebloApp";
import AsociacionApp from "./AsociacionApp";

// elhorno.ojuelosaltos.es → asociación · ojuelosaltos.es (y www) → pueblo
const isAsociacion =
  typeof window !== "undefined" &&
  window.location.hostname.startsWith("elhorno.");

export default function App() {
  return isAsociacion ? <AsociacionApp /> : <PuebloApp />;
}
