import { useEffect, useRef, useState } from "react";
import sistemImg from "../../../assets/mujervirtual.jpg";

function AccordionItem({ id, title, children, activeId, setActiveId, delay = 0 }) {
  const isOpen = activeId === id;
  return (
    <div
      className={`
        group rounded-2xl border border-white/15
        bg-gradient-to-br from-[#005587] to-[#00A3E0] text-white
        shadow-sm hover:shadow-md transition-all duration-300
        ${isOpen ? "ring-1 ring-white/40" : ""}
        w-full max-w-[520px] mx-auto md:max-w-none
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setActiveId(isOpen ? null : id)}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
      >
        <span className="text-white font-extrabold text-[22px] md:text-[24px] leading-tight">
          {title}
        </span>

        <span
          className={`
            inline-flex h-9 w-9 items-center justify-center rounded-full
            border border-white/20 shadow-sm
            bg-white text-[#005587]
            transition-transform duration-300 ${isOpen ? "rotate-180" : ""}
          `}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        id={`${id}-content`}
        className={`
          grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out
          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
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

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState("vision");

  useEffect(() => {
    const el = sectionRef.current;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShow(true),
      { threshold: 0.18 }
    );
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      const img = imgRef.current;
      if (!sec || !img) return;
      const r = sec.getBoundingClientRect();
      const centerDelta = r.top + r.height / 2 - window.innerHeight / 2;
      const shift = Math.max(-24, Math.min(24, -centerDelta * 0.02));
      img.style.transform = `translateY(${shift}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const valores = [
    {
      titulo: "Innovación",
      desc: "Tecnología de vanguardia para anticipar tendencias y desafíos.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M5.6 18.4l2.1-2.1M12 18v3M18.4 18.4l-2.1-2.1M18 12h3M18.4 5.6l-2.1 2.1" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      titulo: "Colaboración",
      desc: "Trabajo en equipo con clientes y partners estratégicos.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4zM8 11c1.657 0 3-1.79 3-4S9.657 3 8 3 5 4.79 5 7s1.343 4 3 4z" />
          <path d="M2 21v-1a5 5 0 015-5h2M22 21v-1a5 5 0 00-5-5h-2" />
        </svg>
      ),
    },
    {
      titulo: "Ética y Confidencialidad",
      desc: "Protección y uso responsable de la información.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1l7 4v6c0 5-3.8 9.7-7 11-3.2-1.3-7-6-7-11V5l7-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      titulo: "Excelencia",
      desc: "Resultados de alta calidad y soluciones medibles.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 17l-5 3 1.9-5.8L4 10l6-.2L12 4l2 5.8 6 .2-4.8 4.2L17 20z" />
        </svg>
      ),
    },
    {
      titulo: "Impacto",
      desc: "Mejorar organizaciones, bienestar y experiencia laboral.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V6M5 12l7-7 7 7" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#EFEEF5] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#00A3E0]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#005587]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-start md:items-center gap-10 md:grid-cols-2 md:gap-16 justify-items-center md:justify-items-stretch">
          {/* Columna izquierda */}
          <div className={`w-full max-w-[640px] mx-auto md:mx-0 transition-all duration-700 ease-out ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-[#00A3E0] text-[20px] font-medium mb-4 tracking-wider uppercase">
              Acerca de
            </p>

            <h2 className="text-[#0A2F4F] text-[42px] md:text-[48px] font-extrabold leading-[1.1] tracking-tight mb-6">
              Visión, Misión y Valores
            </h2>

            <div className="h-1 w-16 bg-gradient-to-r from-[#00A3E0] to-[#005587] mb-6 rounded-full" />

            {/* Cards centradas en mobile */}
            <div className="space-y-4 mb-10 w-full max-w-[520px] mx-auto md:max-w-none">
              <AccordionItem id="vision" title="Visión" activeId={activeId} setActiveId={setActiveId} delay={0}>
                <p>
                  Liderar la transformación digital estratégica, fortaleciendo una cultura organizacional
                  innovadora, adaptable y colaborativa. Desarrollamos capacidades críticas en inteligencia
                  de negocios, análisis de datos y competencias laborales, impulsando un cambio sostenible
                  donde el talento humano es el motor clave del éxito.
                </p>
              </AccordionItem>

              <AccordionItem id="mision" title="Misión" activeId={activeId} setActiveId={setActiveId} delay={70}>
                <p>
                  Empoderar a las áreas de Recursos Humanos mediante el uso estratégico de datos integrados
                  y una visión 360° del capital humano, apalancados en modelos de inteligencia de negocios,
                  inteligencia artificial y análisis estadístico avanzado. Nuestro objetivo es facilitar la
                  toma de decisiones con menor riesgo, garantizando un proceso de mejora continua en las
                  organizaciones.
                </p>
              </AccordionItem>
            </div>

            <h3 className="text-[#0A2F4F] font-bold text-[24px] mb-4">Valores</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[560px] mx-auto md:max-w-none">
              {valores.map((v, i) => (
                <li
                  key={v.titulo}
                  className={`
                    group rounded-2xl border border-white/15
                    bg-gradient-to-br from-[#005587] to-[#00A3E0] text-white
                    p-5 shadow-sm hover:shadow-md transition-all duration-500
                    ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
                  `}
                  style={{ transitionDelay: `${150 + i * 80}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        flex h-10 w-10 items-center justify-center rounded-xl
                        bg-white/10 text-white
                        transform transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105
                      "
                    >
                      {v.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{v.titulo}</p>
                      <p className="text-white/90 text-[15px] mt-1">{v.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna derecha (imagen) */}
          <div className={`relative flex md:justify-end transition-all duration-800 ease-out delay-100 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px] mx-auto md:mx-0">
              <div className="absolute -inset-2 md:-inset-4 border-2 border-[#00A3E0]/20 rounded-2xl rotate-3"></div>
              <div className="absolute -inset-3 md:-inset-6 border-2 border-[#005587]/10 rounded-2xl -rotate-2"></div>
              <div
                className="absolute inset-0 -z-10 scale-110 opacity-70"
                style={{
                  background:
                    "radial-gradient(55% 55% at 60% 40%, rgba(0,163,224,.25), rgba(0,85,135,.20) 45%, transparent 70%)",
                  filter: "blur(22px)",
                }}
              />

              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  ref={imgRef}
                  src={sistemImg}
                  alt="Ilustración: analítica y equipo de trabajo"
                  className="w-full h-auto object-contain select-none will-change-transform transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="absolute -bottom-3 -right-3 w-14 h-14 md:-bottom-4 md:-right-4 md:w-20 md:h-20 bg-[#00A3E0]/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-[#00A3E0] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
