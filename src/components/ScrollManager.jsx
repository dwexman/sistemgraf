import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();
  const { pathname, hash, state } = location || {};

  useEffect(() => {
    // Evita la restauración automática del navegador
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Si venimos con hash (#contacto) o con state {scrollTo}, no forzar top aquí
    if (hash) return;
    if (state && state.scrollTo) return;

    // Sube al tope sin animación
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, state]);

  return null;
}
