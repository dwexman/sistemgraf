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
    const wantsContacto =
      location.state?.scrollTo === "contacto" || location.hash === "#contacto";

    if (!wantsContacto) return;

    requestAnimationFrame(() => {
      setTimeout(() => {
        const el = document.getElementById("contacto");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

        if (location.state?.scrollTo === "contacto") {
          navigate(".", { replace: true, state: null });
        }
      }, 0);
    });
  }, [location.key]);

  return (
    <>
      <Hero />
      <About />
      <ServiciosSection />
      <Modalidad />
      <section id="contacto" className="scroll-mt-24">
        <Contacto />
      </section>
    </>
  );
}
