import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import ServiciosSection from "./components/ServiciosSection";
import Modalidad from "./components/Modalidad";
import Contacto from "./components/Contacto";

export default function Inicio() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Soporta llegar con state {scrollTo:'contacto'} o via hash /#contacto
    const targetId =
      location.state?.scrollTo || (location.hash ? location.hash.slice(1) : null);

    if (targetId === "contacto") {
      // Espera a que el DOM esté renderizado
      requestAnimationFrame(() => {
        const el = document.getElementById("contacto");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // Limpia el state para que no se repita al navegar dentro de Home
          navigate(".", { replace: true, state: null });
        }
      });
    }
  }, [location, navigate]);

  return (
    <>
      <Hero />
      <About />
      <ServiciosSection />
      <Modalidad />
      <section id="contacto">
        <Contacto />
      </section>
    </>
  );
}
