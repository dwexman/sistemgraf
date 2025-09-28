import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import blueBlobs from "../../../assets/blueblobs.png";
import organigrama from "../../../assets/organizational2.png";
import evaluation from "../../../assets/aprendizajecapacitaciones.png";
import proveedores from "../../../assets/evalproveedores.png";
import analitica from "../../../assets/psicometriamadurez.png";
import stress from "../../../assets/stresslaboral.png";
import powerBI from "../../../assets/evalBI.png";
import assistant from "../../../assets/seleccion.png";
import climate from "../../../assets/nlp.png";
import desarrollo from "../../../assets/gestiondesarrollo.png";

function IconOrg() { return <img src={organigrama} alt="" aria-hidden="true" className="w-26 h-26 mb-4 object-contain" loading="lazy" decoding="async" />; }
function IconLearning() { return <img src={evaluation} alt="" aria-hidden="true" className="w-22 h-22 mb-4 object-contain" loading="lazy" decoding="async" />; }
function IconVendors() { return <img src={proveedores} alt="" aria-hidden="true" className="w-22 h-22 mb-4 object-contain" loading="lazy" decoding="async" />; }
function IconMaturity() { return <img src={analitica} alt="" aria-hidden="true" className="w-24 h-24 mb-4 object-contain" loading="lazy" decoding="async" />; }
function IconStress() { return <img src={stress} alt="" aria-hidden="true" className="w-26 h-26 mb-4 object-contain" loading="lazy" decoding="async" />; }
function IconCulture() { return <img src={powerBI} alt="" aria-hidden="true" className="w-26 h-26 mb-4 object-contain" loading="lazy" decoding="async" />; }
function IconRecruiting() { return <img src={assistant} alt="" aria-hidden="true" className="w-24 h-24 mb-4 object-contain" loading="lazy" decoding="async" />; }
function IconNLP() { return <img src={climate} alt="" aria-hidden="true" className="w-26 h-26 mb-4 object-contain" loading="lazy" decoding="async" />; }
function IconPerformance() { return <img src={desarrollo} alt="" aria-hidden="true" className="w-26 h-26 mb-4 object-contain" loading="lazy" decoding="async" />; }

const servicios = [
  { id: 1,  titulo: "Organigramas Inteligentes para Empresas", Icon: IconOrg },
  { id: 2,  titulo: "Evaluación de Aprendizaje Logrado en Capacitaciones a Equipos", Icon: IconLearning },
  { id: 3,  titulo: "Evaluación de Proveedores de Capacitación", Icon: IconVendors },
  { id: 4,  titulo: "Psicometría: Madurez Organizacional en Analítica para Transformación Digital", Icon: IconMaturity },
  { id: 5,  titulo: "Evaluación de la Salud en el Trabajo: Estrés Laboral, Factores de Riesgo Psicosocial y Clima Organizacional", Icon: IconStress },
  { id: 6,  titulo: "Evaluación de Cultura Organizacional con BI", Icon: IconCulture },
  { id: 7,  titulo: "Reclutamiento y Selección Inteligente con IA", Icon: IconRecruiting },
  { id: 8,  titulo: "Evaluaciones de Clima Organizacional con NLP", Icon: IconNLP },
  { id: 9,  titulo: "Gestión de Desempeño y Planes de Desarrollo Automáticos", Icon: IconPerformance },
];

const CATEGORIES = [
  {
    key: "diag",
    titulo: "Diagnóstico Organizacional",
    descripcion:
      "Contamos con una plataforma mediante la cual podrás identificar la situación actual de tu organización (estructura, cultura, clima organizacional, salud en el trabajo) para tomar decisiones estratégicas.",
    services: [
      "Organigramas Inteligentes para Empresas",
      "Evaluación de la Cultura Organizacional con BI",
      "Evaluaciones de Clima Organizacional con NLP",
      "Evaluación de la Salud en el Trabajo: Estrés Laboral, Factores de Riesgo Psicosocial y Clima Organizacional",
    ],
  },
  {
    key: "cap",
    titulo: "Desarrollo del Talento y Capacitación",
    descripcion:
      "Medimos la efectividad de la formación, lo que te permitirá asegurar el retorno de inversión y mejorar continuamente las acciones de capacitación de tu talento.",
    services: [
      "Evaluación de Aprendizaje Logrado en Capacitaciones a Equipos",
      "Evaluación de Proveedores de Capacitación",
      "Gestión de Desempeño y Planes de Desarrollo Automáticos",
    ],
  },
  {
    key: "td",
    titulo: "Transformación Digital y Analítica",
    descripcion:
      "Con nuestra plataforma, te ayudamos a preparar a tu organización para el uso avanzado de datos y automatizar procesos de gestión de desempeño para mayor agilidad.",
    services: [
      "Psicometría: Madurez Organizacional en Analítica para Transformación Digital",
    ],
  },
  {
    key: "seleccion",
    titulo: "Atracción y Selección de Talento",
    descripcion:
      "Te ayudamos a optimizar los procesos de filtrado y selección de candidatos, reduciendo tiempos y costos y mejorando la calidad de las contrataciones.",
    services: [
      "Reclutamiento y Selección Inteligente con IA",
    ],
  },
];


const CATEGORY_COLORS = {
  diag: {
    cardBg: "linear-gradient(180deg,#002E49 0%,#005587 100%)",
    ctaBg:  "linear-gradient(90deg,#00A3E0 0%,#69A9D1 100%)",
    headerClosed: "linear-gradient(135deg,#003858 0%,#0073A3 100%)",
    headerOpen:   "linear-gradient(135deg,rgba(0,56,88,0.72) 0%,rgba(0,115,163,0.36) 100%)",
  },
  cap: {
    cardBg: "linear-gradient(180deg,#0A4D7A 0%,#117DB1 100%)",
    ctaBg:  "linear-gradient(90deg,#1AA6E0 0%,#7ECBF0 100%)",
    headerClosed: "linear-gradient(135deg,#0B5688 0%,#1590C8 100%)",
    headerOpen:   "linear-gradient(135deg,rgba(11,86,136,0.70) 0%,rgba(21,144,200,0.34) 100%)",
  },
  td: {
    cardBg: "linear-gradient(180deg,#123B6B 0%,#1E63A7 100%)",
    ctaBg:  "linear-gradient(90deg,#2D89E5 0%,#8AB9F5 100%)",
    headerClosed: "linear-gradient(135deg,#14457C 0%,#2475C4 100%)",
    headerOpen:   "linear-gradient(135deg,rgba(20,69,124,0.70) 0%,rgba(36,117,196,0.34) 100%)",
  },
  seleccion: {
    cardBg: "linear-gradient(180deg,#1B4F91 0%,#4FA0E2 100%)",
    ctaBg:  "linear-gradient(90deg,#58A9EA 0%,#A7D3F8 100%)",
    headerClosed: "linear-gradient(135deg,#1E5AA5 0%,#64B0EC 100%)",
    headerOpen:   "linear-gradient(135deg,rgba(30,90,165,0.68) 0%,rgba(100,176,236,0.32) 100%)",
  },
};

const byTitle = (t) => servicios.find((s) => s.titulo === t);

function ServiceCard({ service, palette, delay = 0 }) {
  const { id, titulo, Icon } = service;
  return (
    <div
      className="
        group relative w-[260px] sm:w-[280px] rounded-[22px]
        p-5 sm:p-6 text-white text-center
        shadow-[0_18px_28px_rgba(0,0,0,0.30)]
        flex flex-col min-h-[200px] sm:min-h-[220px]
        transition-transform hover:-translate-y-[2px]
      "
      style={{ background: palette.cardBg, transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center">
        {Icon ? <Icon /> : null}
        <h3 className="mb-4 leading-snug text-center break-words text-white">
          {titulo}
        </h3>
      </div>

      <Link
        to={`/servicios#serv-${id}`}
        aria-label={`Leer más sobre ${titulo}`}
        className="
          mt-auto inline-flex items-center justify-center
          rounded-[14px] px-6 py-2 text-sm font-semibold text-white shadow-md
          transition-transform hover:-translate-y-[1px]
        "
        style={{ background: palette.ctaBg }}
      >
        Leer más
      </Link>
    </div>
  );
}

function CategoryAccordion({ cat, palette, active, setActive, children }) {
  const isOpen = active === cat.key;
  return (
    <div
      className={`
        group rounded-2xl text-white shadow-sm transition-all duration-300
        ${isOpen ? "ring-1 ring-white/30" : "hover:shadow-md"}
      `}
      style={{
        background: isOpen ? palette.headerOpen : palette.headerClosed,
        backdropFilter: isOpen ? "saturate(140%) blur(1px)" : "none",
      }}
    >
      <button
        onClick={() => setActive(isOpen ? null : cat.key)}
        aria-expanded={isOpen}
        aria-controls={`${cat.key}-content`}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
      >
        <div>
          <span className="block font-extrabold text-[20px] md:text-[22px] leading-tight">
            {cat.titulo}
          </span>
          <span className="block text-white/95 text-[14px] md:text-[15px] mt-1">
            {cat.descripcion}
          </span>
        </div>

        <span
          className={`
            inline-flex h-9 w-9 items-center justify-center rounded-full
            border border-white/25 bg-white text-[#0A2F4F]
            transition-transform duration-300 ${isOpen ? "rotate-180" : ""}
          `}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        id={`${cat.key}-content`}
        className={`
          grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out
          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="min-h-0">
          <div className="px-5 md:px-6 pb-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiciosAgrupadosSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(CATEGORIES[0].key); 

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    if (sec.classList.contains("cards-entered")) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        sec.classList.add("cards-entered");
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="relative overflow-hidden bg-[#EFEEF5] py-16 sm:py-20">
      <img
        src={blueBlobs}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1962px] h-[1706px] max-w-none opacity-95"
        loading="lazy"
        decoding="async"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[#0A2F4F] font-extrabold tracking-[0.12em] uppercase text-2xl sm:text-3xl mb-10">
          NUESTROS SERVICIOS
        </h2>

        <div className="space-y-6">
          {CATEGORIES.map((cat) => {
            const palette = CATEGORY_COLORS[cat.key];
            const items = cat.services.map(byTitle).filter(Boolean);

            return (
              <CategoryAccordion
                key={cat.key}
                cat={cat}
                palette={palette}
                active={active}
                setActive={setActive}
              >
                <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
                  {items.map((s, i) => (
                    <ServiceCard key={s.id} service={s} palette={palette} delay={i * 120} />
                  ))}
                </div>
              </CategoryAccordion>
            );
          })}
        </div>
      </div>
    </section>
  );
}
