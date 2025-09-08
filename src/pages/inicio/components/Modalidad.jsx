import ModalidadBG from "./ModalidadBG";

import nube from "../../../assets/nube.png";
import suscription from "../../../assets/suscription.png";
import escalabilidad from "../../../assets/escalabilidad.png";
import soluciones from "../../../assets/soluciones.png";

const items = [
  { title: "Mantenimiento", desc: "Plataforma gestionada por Inteligencia Integrada.", icon: nube },
  { title: "Suscripción", desc: "Plan anual por usuario para controlar costos y acceder a todas las herramientas.", icon: suscription },
  { title: "Escalabilidad", desc: "Ajuste dinámico de usuarios y módulos a medida del crecimiento de tu organización.", icon: escalabilidad },
  { title: "Soluciones personalizadas", desc: "Adaptación de herramientas estratégicas según las necesidades específicas de cada empresa.", icon: soluciones },
];

function Card({ title, desc, icon }) {
  return (
    <div className="w-[200px] sm:w-[220px] text-center">
      <div
        className="
          mx-auto mb-2.5 grid place-items-center
          w-[128px] h-[128px] rounded-[22px]
          shadow-[0_12px_26px_rgba(0,0,0,0.22)]
          bg-[linear-gradient(180deg,#002E49_0%,#005587_100%)]
          transition-transform duration-300 hover:scale-105
          p-4
        "
      >
        <img
          src={icon}
          alt={title}
          className="w-[86px] h-[86px] object-contain"
          loading="lazy"
          draggable="false"
        />
      </div>

      <h3 className="text-[#0A2F4F] font-semibold text-[18px] leading-tight">
        {title}
      </h3>

      <p className="mt-1 text-[#0A2F4F] font-semibold text-[14px] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

export default function Modalidad() {
  return (
    <section id="modalidad" className="relative overflow-hidden bg-[#EFEEF5] py-16 sm:py-20">
      <ModalidadBG />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[#0A2F4F] font-extrabold tracking-[0.12em] uppercase text-2xl sm:text-3xl mb-12">
          MODALIDAD DE SERVICIOS
        </h2>

        <div
          className="
            grid grid-cols-1 sm:grid-cols-2
            gap-4 sm:gap-4
            justify-items-center
            mx-auto max-w-[240px] sm:max-w-[480px] md:max-w-[500px]
          "
        >
          {items.map((it, i) => (
            <Card key={i} title={it.title} desc={it.desc} icon={it.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
