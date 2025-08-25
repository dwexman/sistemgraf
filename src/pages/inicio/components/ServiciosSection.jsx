import { useEffect, useRef } from "react";
import blueBlobs from "../../../assets/blueblobs.png";

const servicios = [
  { id: 1, titulo: "Soluciones en organigrama y gestión empresarial" },
  { id: 2, titulo: "Soluciones en organigrama y gestión empresarial" },
  { id: 3, titulo: "Soluciones en organigrama y gestión empresarial" },
  { id: 4, titulo: "Soluciones en organigrama y gestión empresarial" },
  { id: 5, titulo: "Soluciones en organigrama y gestión empresarial" },
];

function IconOrg() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-12 h-12 mb-4"
      fill="none"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 6V3" />
      <rect x="10" y="6" width="4" height="3" rx="1" stroke="white" />
      <path d="M12 9v3M6 17v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" />
      <rect x="3" y="17" width="5" height="4" rx="1.2" stroke="white" />
      <rect x="10" y="17" width="4" height="4" rx="1.2" stroke="white" />
      <rect x="16" y="17" width="5" height="4" rx="1.2" stroke="white" />
    </svg>
  );
}

function Card({ titulo, delay = 0, dur = 2800 }) {
  return (
    <div
      className="
        group relative w-[260px] sm:w-[280px] rounded-[25px] p-6 sm:p-7
        text-white text-center
        shadow-[0_18px_28px_rgba(0,0,0,0.30)]
        bg-[linear-gradient(180deg,#002E49_0%,#005587_100%)]
        fall-card
      "
      style={{ "--delay": `${delay}ms`, "--dur": `${dur}ms` }}
    >
      <div className="flex flex-col items-center">
        <IconOrg />
        <p className="mb-6 leading-snug">{titulo}</p>
        <a
          href="#"
          className="
            inline-flex items-center justify-center
            rounded-[16px] px-6 py-2 text-sm font-semibold
            text-white shadow-md
            bg-[linear-gradient(90deg,#00A3E0_0%,#69A9D1_100%)]
            transition-transform group-hover:-translate-y-[1px]
          "
        >
          Leer más
        </a>
      </div>

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
            <Card key={s.id} titulo={s.titulo} delay={i * 320} dur={3000} />
          ))}
        </div>
      </div>
    </section>
  );
}
