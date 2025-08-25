import { useEffect, useRef, useState } from "react";
import sistemImg from "../../../assets/sistemimgblue.png";

export default function About() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const [show, setShow] = useState(false);

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

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#EFEEF5] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#00A3E0]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#005587]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div
            className={`transition-all duration-700 ease-out
                       ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="text-[#00A3E0] text-[20px] font-medium mb-4 tracking-wider uppercase">
              Acerca de
            </p>

            <h2 className="text-[#0A2F4F] text-[42px] md:text-[48px] font-extrabold leading-[1.1] tracking-tight mb-6">
              SOMOS SISTEMGRAF:
              <span className="block mt-2 bg-gradient-to-r from-[#00A3E0] to-[#005587] bg-clip-text text-transparent">
                inteligencia integrada
              </span>
              para Recursos Humanos y procesos de negocio.
            </h2>

            <div className="h-1 w-16 bg-gradient-to-r from-[#00A3E0] to-[#005587] mb-6 rounded-full"></div>

            <p className="text-[#0A2F4F]/80 text-[18px] md:text-[20px] leading-[1.7] max-w-3xl mb-8">
              Fundada en 2018, nuestra misión es transformar la forma en que las
              organizaciones gestionan su capital humano y toman decisiones
              estratégicas con el valor de los datos. Con un equipo de expertos
              apasionados por la innovación, destacamos en el uso de Inteligencia
              Artificial, Business Intelligence y Analytics para impulsar el éxito
              empresarial.
            </p>

            <a
              href="#contacto"
              className="group relative mt-8 inline-flex items-center justify-center
                         w-[192px] h-[62px] rounded-[12px] overflow-hidden
                         text-white text-[18px] font-semibold text-center
                         shadow-lg hover:shadow-xl transition-all duration-300
                         bg-gradient-to-r from-[#00A3E0] to-[#005587] hover:from-[#005587] hover:to-[#00A3E0]"
            >
              Leer más
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>

          <div
            className={`relative flex md:justify-end transition-all duration-800 ease-out delay-100
                        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="relative w-full max-w-[400px] mx-auto md:mx-0">
              <div className="absolute -inset-4 border-2 border-[#00A3E0]/20 rounded-2xl rotate-3"></div>
              <div className="absolute -inset-6 border-2 border-[#005587]/10 rounded-2xl -rotate-2"></div>
              
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
              
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#00A3E0]/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-4 h-4 bg-[#00A3E0] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}