import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import blueBlobs from "../../assets/blueblobs.png";

import organigrama from "../../assets/organizational2.png";
import evaluation from "../../assets/aprendizajecapacitaciones.png";
import proveedores from "../../assets/evalproveedores.png";
import analitica from "../../assets/psicometriamadurez.png";
import stress from "../../assets/stresslaboral.png";
import powerBI from "../../assets/evalBI.png";
import assistant from "../../assets/seleccion.png";
import climate from "../../assets/nlp.png";
import desarrollo from "../../assets/gestiondesarrollo.png";

const ICONS = {
  1: organigrama,
  2: evaluation,
  3: proveedores,
  4: analitica,
  5: stress,
  6: powerBI,
  7: assistant,
  8: climate,
  9: desarrollo,
};

const servicios = [
  {
    id: 1,
    titulo: "Organigramas Inteligentes para Empresas",
    descripcion:
      "Transforma la gestión organizacional visualizando y optimizando tu estructura de equipos en tiempo real. Nuestra solución integra inteligencia de negocios, dashboards interactivos y análisis avanzado para mapear jerarquías, identificar brechas y tomar decisiones estratégicas con agilidad, flexibilidad y total visibilidad, adaptando tu organización al ritmo del cambio digital.",
  },
  {
    id: 2,
    titulo: "Evaluación de Aprendizaje Logrado en Capacitaciones a Equipos",
    descripcion:
      "Convierte cada capacitación en resultados medibles. Analizamos el impacto y el aprendizaje logrado por tus colaboradores a través de indicadores visuales y analítica avanzada, facilitando la toma de decisiones sobre futuras formaciones y asegurando que la inversión en desarrollo realmente potencie a tu equipo.",
  },
  {
    id: 3,
    titulo: "Evaluación de Proveedores de Capacitación",
    descripcion:
      "Asegura que cada aliado estratégico sume valor a tu empresa. Con nuestro benchmarking y BI, compara desempeño, calidad y retorno de inversión de tus proveedores de capacitación usando métricas objetivas y dashboards, lo que te permite elegir a los mejores e impulsar la excelencia en el desarrollo de talento.",
  },
  {
    id: 4,
    titulo:
      "Detección del Nivel de Madurez Organizacional en Analítica para la Transformación Digital",
    descripcion:
      "Mide el pulso analítico y digital de tu organización mediante el uso de BI e instrumentos estandarizados de medición válidos y confiables. Identificamos las fortalezas y brechas de tu talento en competencias clave y aceleramos la transformación digital a través de la formación de equipos preparados para los retos de la nueva economía.",
  },
  {
    id: 5,
    titulo:
      "Evaluación de la Salud en el Trabajo: Estrés Laboral, Factores de Riesgo Psicosocial y Clima Organizacional",
    descripcion:
      "¡Anticípate a los riesgos! Evaluamos el clima laboral, detectamos el nivel de estrés laboral y el grado de exposición de tu talento a los factores de riesgo psicosocial mediante instrumentos estandarizados de medición válidos y confiables. Podrás visualizar, en tiempo real, los resultados a través de dashboards interactivos, lo que facilita la implementación de acciones preventivas para mejorar el bienestar y la productividad de tu organización.",
  },
  {
    id: 6,
    titulo: "Evaluación de Cultura Organizacional con BI",
    descripcion:
      "Impulsa una cultura sólida y alineada a la estrategia de tu negocio. Medimos, visualizamos y detectamos puntos críticos y fortalezas culturales a través de BI y la administración de instrumentos psicométricos, facilitando intervenciones precisas y efectivas para transformar tu organización desde dentro.",
  },
  {
    id: 7,
    titulo: "Reclutamiento y Selección Inteligente con IA",
    descripcion:
      "Lleva el hiring a nivel superior con IA. Automatiza la búsqueda, evaluación y selección de talento utilizando análisis automático de CVs, matching algorítmico y video entrevistas con inteligencia artificial, identificando los candidatos ideales y asegurando el fit cultural y competencial.",
  },
  {
    id: 8,
    titulo: "Evaluaciones de Clima Organizacional con NLP",
    descripcion:
      "Escucha y entiende lo que piensa realmente tu equipo. Empleamos procesamiento de lenguaje natural para analizar comentarios, identificar patrones y extraer insights en tiempo real, reduciendo sesgos y permitiendo una gestión proactiva del clima laboral.",
  },
  {
    id: 9,
    titulo: "Gestión de Desempeño y Planes de Desarrollo Automáticos",
    descripcion:
      "Impulsa el crecimiento de tus colaboradores con tecnología. Implementamos evaluaciones de desempeño 90° y 360° potenciadas por IA que generan planes de desarrollo individuales automáticos, con monitoreo en tiempo real y retroalimentación personalizada para acelerar el alto rendimiento y el avance profesional.",
  },
];

function IconBadge({ src, alt }) {
  return (
    <div
      className="
        flex items-center justify-center
        w-20 h-20 rounded-full mb-4
        bg-gradient-to-br from-[#006699] to-[#004366]
        shadow-[0_10px_20px_rgba(0,0,0,0.24)]
      "
    >
      <img
        src={src}
        alt={alt}
        className="w-14 h-14 md:w-16 md:h-16 object-contain"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
    </div>
  );
}

function Card({ id, titulo, descripcion, icon, visible, isFocused, delay = 0 }) {
  return (
    <div
      id={`serv-${id}`}
      className={[
        "group relative rounded-[24px] p-7 text-white",
        "bg-gradient-to-b from-[#004366] to-[#002E49]",
        "shadow-[0_18px_28px_rgba(0,0,0,0.25)] transition-all duration-500 will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        "hover:scale-[1.02] hover:shadow-[0_22px_34px_rgba(0,0,0,0.35)]",
        "text-center",
        "scroll-mt-20", 
        isFocused ? "ring-4 ring-[#00A3E0]/70 shadow-[0_0_0_6px_rgba(0,163,224,0.2)]" : ""
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center">
        <IconBadge src={icon || organigrama} alt={`${titulo} - icono`} />
        <h3 className="mb-3 text-[18px] font-extrabold leading-snug tracking-tight relative">
          {titulo}
          <span className="block w-12 h-[2px] bg-[#00A3E0] opacity-90 mt-2 rounded-full mx-auto" />
        </h3>
        <p className="text-[14px] leading-relaxed text-[#E1EAF4]/95">
          {descripcion}
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/10 group-hover:ring-white/20 transition" />
    </div>
  );
}

function AccordionItem({ id, title, children, activeId, setActiveId, delay = 0 }) {
  const isOpen = activeId === id;
  return (
    <div
      className={[
        "group rounded-2xl border border-white/15",
        "bg-gradient-to-br from-[#005587] to-[#00A3E0] text-white",
        "shadow-sm hover:shadow-md transition-all duration-300",
        isOpen ? "ring-1 ring-white/40" : "",
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setActiveId(isOpen ? null : id)}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
      >
        <span className="font-extrabold text-[20px] md:text-[22px] leading-tight">
          {title}
        </span>

        <span
          className={[
            "inline-flex h-9 w-9 items-center justify-center rounded-full",
            "border border-white/20 shadow-sm",
            "bg-white text-[#005587]",
            "transition-transform duration-300",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={`${id}-content`}
        className={[
          "grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="min-h-0">
          <div className="px-5 md:px-6 pb-5 md:pb-6 text-white/95 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Servicios() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const [focusedId, setFocusedId] = useState(null);
  const { hash } = useLocation();

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!hash) return;
    const targetId = hash.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const num = parseInt(targetId.replace("serv-", ""), 10);
        if (!Number.isNaN(num)) {
          setFocusedId(num);
          setTimeout(() => setFocusedId(null), 2500);
        }
      });
    }
  }, [hash]);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#EFEEF5] py-16 sm:py-20"
    >
      <img
        src={blueBlobs}
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none select-none absolute z-0
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[1962px] h-[1706px] max-w-none opacity-95
        "
        loading="lazy"
        decoding="async"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl text-center">
          <style>{`
            @keyframes shine { 0% { background-position: 0% } 100% { background-position: 200% } }
            @keyframes underlineGrow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
            @keyframes floaty { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-5px) } }
            .animate-shine { animation: shine 6s linear infinite }
            .animate-underline { transform-origin: 0 50%; transform: scaleX(0); animation: underlineGrow .9s cubic-bezier(.2,.9,.2,1) .15s forwards }
            .sparkle { animation: floaty 4s ease-in-out infinite }
          `}</style>

          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-[720px] h-[220px] rounded-full blur-3xl
              bg-[radial-gradient(60%_60%_at_50%_50%,rgba(0,163,224,.18),rgba(0,85,135,.12)_45%,transparent_70%)]" />
          </div>

          <h2
            className="
              relative inline-block font-extrabold uppercase tracking-[0.18em]
              text-3xl sm:text-4xl
              text-transparent bg-clip-text
              bg-[linear-gradient(90deg,#005587,#00A3E0,#005587)]
              [background-size:200%_auto] animate-shine
            "
          >
            Nuestros Servicios

            <span className="absolute -left-8 -top-2 sparkle" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00A3E0" strokeWidth="2">
                <path d="M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2z" />
              </svg>
            </span>
            <span className="absolute -right-7 top-1 sparkle [animation-delay:1.2s]" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#69A9D1" strokeWidth="2">
                <path d="M12 3l1.2 2.8L16 7l-2.8 1.2L12 11l-1.2-2.8L8 7l2.8-1.2L12 3z" />
              </svg>
            </span>

            <span className="block mx-auto mt-3 h-[6px] w-48 rounded-full
              bg-[linear-gradient(90deg,#005587, #00A3E0, #005587)]
              animate-underline" />
          </h2>

          <p className="mt-5 text-[#0A2F4F] font-semibold leading-snug
            text-[17px] sm:text-[19px] max-w-4xl mx-auto">
            Disfruta de <span className="font-bold">dashboards interactivos</span>, <span className="font-bold">analítica avanzada</span> y
            <span className="font-bold"> resultados en tiempo real</span> para una gestión ágil, precisa y escalable.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicios.map((s, i) => (
            <Card
              key={s.id}
              id={s.id}
              titulo={s.titulo}
              descripcion={s.descripcion}
              icon={ICONS[s.id]}
              visible={visible}
              isFocused={focusedId === s.id}
              delay={i * 120}
            />
          ))}
        </div>

        <div className="mt-12 space-y-4">
          <AccordionItem
            id="desarrollo-medida"
            title="Servicio de Desarrollo a la medida para necesidades de capital humano"
            activeId={activeId}
            setActiveId={setActiveId}
          >
            <p className="mb-3">
              Desarrollos personalizados enfocados en las necesidades estratégicas de tu capital humano. Creamos soluciones tecnológicas a la medida para potenciar procesos de gestión, integración de sistemas, automatización de indicadores clave y desarrollo de herramientas BI de acuerdo con los retos específicos de tu organización.
            </p>
            <p>
              Nuestros desarrollos se adaptan al escenario actual de tu equipo, facilitando el diagnóstico de brechas, el monitoreo del talento y el crecimiento organizacional sostenible.
            </p>
          </AccordionItem>

          <AccordionItem
            id="consultoria-bi-psico"
            title="Servicio de Consultoría en Inteligencia de Negocios y Psicología Organizacional"
            activeId={activeId}
            setActiveId={setActiveId}
          >
            <p className="mb-3">
              En nuestro Servicio de Consultoría en Psicología Organizacional con herramientas avanzadas de Inteligencia de Negocios, ponemos el énfasis en la experiencia de nuestro equipo de psicólogos organizacionales certificados, quienes lideran la aplicación de remediales estratégicos y acciones de mejora basadas en datos rigurosos.
            </p>
            <p>
              Analizamos métricas clave del capital humano mediante dashboards avanzados y diagnósticos exhaustivos, para desarrollar intervenciones personalizadas que impactan el bienestar, el clima laboral, la gestión del desempeño y el desarrollo de talento.
            </p>
          </AccordionItem>
        </div>
      </div>
    </section>
  );
}
