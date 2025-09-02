import ModalidadBG from "./ModalidadBG"; // Cambiado de ModalidadBG a ParticlesBG

const items = [
  "Acceso basado en la nube",
  "Escalabilidad automática",
  "Alta disponibilidad",
  "Backups automáticos",
  "Seguridad integrada",
  "Soporte 24/7",
  "Actualizaciones automáticas"
];

// Icono blanco (cloud/server) – inline SVG
function IconCloud() {
  return (
    <svg viewBox="0 0 48 48" className="w-16 h-16" fill="none" stroke="white" strokeWidth="2">
      <path d="M18 24a8 8 0 0 1 15.7-2.6A7 7 0 1 1 36 34H16a6 6 0 0 1 2-10z" stroke="white" />
      <rect x="18" y="30" width="14" height="8" rx="2" fill="white" stroke="none" />
      <path d="M20 30v-3h10v3M20 38v3M30 38v3" stroke="white" />
    </svg>
  );
}

function Card({ title }) {
  return (
    <div className="w-[200px] text-center">
      {/* “Card” cuadrada con degradé azul e icono centrado */}
      <div
        className="
          mx-auto mb-3 grid place-items-center
          w-[160px] h-[160px] rounded-[25px]
          shadow-[0_14px_30px_rgba(0,0,0,0.25)]
          bg-[linear-gradient(180deg,#002E49_0%,#005587_100%)]
          transition-transform duration-300 hover:scale-105
        "
      >
        <IconCloud />
      </div>
      {/* Título debajo */}
      <p className="text-[#0A2F4F] font-medium leading-tight">{title}</p>
    </div>
  );
}

export default function Modalidad() {
  return (
    <section id="modalidad" className="relative overflow-hidden bg-[#EFEEF5] py-16 sm:py-20">
      {/* Fondo de partículas 3D */}
      <ModalidadBG />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[#0A2F4F] font-extrabold tracking-[0.12em] uppercase text-2xl sm:text-3xl mb-12">
          MODALIDAD DE SERVICIO
        </h2>

        {/* 4 arriba + 3 abajo (se arma solo con wrap) */}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
          {items.map((t, i) => (
            <Card key={i} title={t} />
          ))}
        </div>
      </div>
    </section>
  );
}