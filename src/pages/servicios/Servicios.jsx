import { useEffect, useRef, useState } from "react";
import blueBlobs from "../../assets/blueblobs.png";

const servicios = [
  {
    id: 1,
    titulo: "Soluciones en organigrama y gestión empresarial",
    descripcion:
      "Diseño y optimización de estructuras organizacionales, definición de roles y flujos de trabajo para mejorar la eficiencia y la toma de decisiones.",
  },
  {
    id: 2,
    titulo: "Automatización de procesos",
    descripcion:
      "Levantamiento de procesos críticos y automatización con herramientas low-code/no-code para reducir tiempos y errores operativos.",
  },
  {
    id: 3,
    titulo: "Inteligencia de negocios (BI)",
    descripcion:
      "Tableros y analítica con métricas accionables para dirección y equipos. Integraciones con tus fuentes de datos y KPIs claros.",
  },
  {
    id: 4,
    titulo: "Gestión del cambio",
    descripcion:
      "Acompañamiento en la adopción tecnológica y cultural: comunicación, capacitación y soporte para una transición exitosa.",
  },
  {
    id: 5,
    titulo: "Consultoría en experiencia de cliente",
    descripcion:
      "Mapeo de journeys, detección de fricciones y diseño de mejoras que eleven la satisfacción y la retención de tus clientes.",
  },
];

function IconCircle() {
  return (
    <div
      className="
        flex items-center justify-center
        w-16 h-16 rounded-full mb-4
        bg-gradient-to-br from-[#006699] to-[#004366]
        shadow-[0_8px_18px_rgba(0,0,0,0.22)]
      "
    >
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 6V3" />
        <rect x="10" y="6" width="4" height="3" rx="1" />
        <path d="M12 9v3M6 17v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" />
        <rect x="3" y="17" width="5" height="4" rx="1.2" />
        <rect x="10" y="17" width="4" height="4" rx="1.2" />
        <rect x="16" y="17" width="5" height="4" rx="1.2" />
      </svg>
    </div>
  );
}

function Card({ titulo, descripcion, visible, delay = 0 }) {
  return (
    <div
      className={`
        relative w-[280px] sm:w-[300px] rounded-[24px] p-7 text-white text-center
        bg-gradient-to-b from-[#004366] to-[#002E49]
        shadow-[0_18px_28px_rgba(0,0,0,0.25)]
        transition-all duration-500 will-change-transform
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
        hover:scale-[1.03] hover:shadow-[0_22px_34px_rgba(0,0,0,0.35)]
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center">
        <IconCircle />
        <h3 className="mb-3 text-lg font-extrabold leading-snug tracking-tight relative">
          {titulo}
          <span className="block w-12 h-[2px] bg-[#00A3E0] opacity-90 mx-auto mt-2 rounded-full" />
        </h3>
        <p className="text-sm leading-relaxed text-[#E1EAF4]/95">
          {descripcion}
        </p>
      </div>

      {/* Halo suave al borde en hover */}
      <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/10 group-hover:ring-white/20 transition" />
    </div>
  );
}

export default function Servicios() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#EFEEF5] py-16 sm:py-20"
    >
      {/* Fondo blobs */}
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
        <h2 className="text-center text-[#0A2F4F] font-extrabold tracking-[0.12em] uppercase text-2xl sm:text-3xl mb-12">
          Nuestros Servicios
        </h2>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
          {servicios.map((s, i) => (
            <Card
              key={s.id}
              titulo={s.titulo}
              descripcion={s.descripcion}
              visible={visible}
              delay={i * 140}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
