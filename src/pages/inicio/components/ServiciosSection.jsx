import { useEffect, useRef } from "react";
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


function IconOrg() {
  return (
    <img
      src={organigrama}
      alt=""
      aria-hidden="true"
      className="w-26 h-26 mb-4 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

function IconLearning() {
  return (
    <img
      src={evaluation}
      alt=""
      aria-hidden="true"
      className="w-22 h-22 mb-4 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

function IconVendors() {
  return (
    <img
      src={proveedores}
      alt=""
      aria-hidden="true"
      className="w-22 h-22 mb-4 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

function IconMaturity() {
  return (
    <img
      src={analitica}
      alt=""
      aria-hidden="true"
      className="w-24 h-24 mb-4 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

function IconStress() {
  return (
    <img
      src={stress}
      alt=""
      aria-hidden="true"
      className="w-26 h-26 mb-4 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

function IconCulture() {
  return (
    <img
      src={powerBI}
      alt=""
      aria-hidden="true"
      className="w-26 h-26 mb-4 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

function IconRecruiting() {
  return (
    <img
      src={assistant}
      alt=""
      aria-hidden="true"
      className="w-24 h-24 mb-4 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

function IconNLP() {
  return (
    <img
      src={climate}
      alt=""
      aria-hidden="true"
      className="w-26 h-26 mb-4 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}

function IconPerformance() {
  return (
    <img
      src={desarrollo}
      alt=""
      aria-hidden="true"
      className="w-26 h-26 mb-4 object-contain"
      loading="lazy"
      decoding="async"
    />
  );
}


const servicios = [
  { id: 1, titulo: "Organigramas Inteligentes para Empresas", Icon: IconOrg },
  { id: 2, titulo: "Evaluación de Aprendizaje Logrado en Capacitaciones a Equipos", Icon: IconLearning },
  { id: 3, titulo: "Evaluación de Proveedores de Capacitación", Icon: IconVendors },
  { id: 4, titulo: "Psicometría: Madurez Organizacional en Analítica para Transformación Digital", Icon: IconMaturity },
  { id: 5, titulo: "Psicometría para Estrés Laboral y Riesgos de Clima Organizacional", Icon: IconStress },
  { id: 6, titulo: "Evaluación de Cultura Organizacional con BI y Psicometría", Icon: IconCulture },
  { id: 7, titulo: "Reclutamiento y Selección Inteligente con IA", Icon: IconRecruiting },
  { id: 8, titulo: "Evaluaciones de Clima Organizacional con NLP", Icon: IconNLP },
  { id: 9, titulo: "Gestión de Desempeño y Planes de Desarrollo Automáticos", Icon: IconPerformance },
];

function Card({ titulo, Icon, delay = 0, dur = 2800 }) {
  return (
    <div
      className="
        group relative w-[260px] sm:w-[280px] rounded-[25px] p-5 sm:p-6
        text-white text-center
        shadow-[0_18px_28px_rgba(0,0,0,0.30)]
        bg-[linear-gradient(180deg,#002E49_0%,#005587_100%)]
        fall-card
        flex flex-col min-h-[200px] sm:min-h-[220px]
      "
      style={{ "--delay": `${delay}ms`, "--dur": `${dur}ms` }}
    >
      <div className="flex flex-col items-center">
        {Icon ? <Icon /> : <IconOrg />}

        <h3
          className="
    mb-4
    leading-snug
    text-center
    whitespace-normal   
    break-words         
    hyphens-auto        
    text-white
  "
        >
          {titulo}
        </h3>
      </div>


      <Link
        to="/servicios"
        aria-label={`Leer más sobre ${titulo}`}
        className="
          mt-auto
          inline-flex items-center justify-center
          rounded-[16px] px-6 py-2 text-sm font-semibold
          text-white shadow-md
          bg-[linear-gradient(90deg,#00A3E0_0%,#69A9D1_100%)]
          transition-transform group-hover:-translate-y-[1px]
        "
      >
        Leer más
      </Link>

      <div className="pointer-events-none absolute inset-0 rounded-[25px] shadow-[12px_16px_28px_rgba(0,0,0,0.35)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export default function Servicios() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    if (sec.classList.contains("cards-entered")) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sec.classList.add("cards-entered");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(sec);
    return () => io.disconnect();
  }, []);

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
        <h2 className="text-center text-[#0A2F4F] font-extrabold tracking-[0.12em] uppercase text-2xl sm:text-3xl mb-10">
          NUESTROS SERVICIOS
        </h2>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
          {servicios.map((s, i) => (
            <Card key={s.id} titulo={s.titulo} Icon={s.Icon} delay={i * 200} dur={2800} />
          ))}
        </div>
      </div>
    </section>
  );
}
