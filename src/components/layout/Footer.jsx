import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import logo2 from "../../assets/transparentwhitelogo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2F4F] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Fila principal */}
        <div className="py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* IZQUIERDA: IG + LinkedIn / Teléfono / Mail */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Fila 1: Redes */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/tu_cuenta"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full ring-1 ring-white/20 hover:ring-white/40 transition"
                title="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/tu_empresa"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full ring-1 ring-white/20 hover:ring-white/40 transition"
                title="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>

            {/* Fila 2: Teléfono */}
            <a
              href="tel:+56941442980"
              className="inline-flex items-center gap-3 text-sm opacity-95 hover:opacity-100 transition"
            >
              <span className="p-2 rounded-full ring-1 ring-white/20">
                <FiPhone size={18} />
              </span>
              <span className="underline-offset-4 hover:underline select-all">
                +56 9 4144 2980
              </span>
            </a>

            {/* Fila 3: Email */}
            <a
              href="mailto:contacto@sistemgraf.cl"
              className="inline-flex items-center gap-3 text-sm opacity-95 hover:opacity-100 transition"
            >
              <span className="p-2 rounded-full ring-1 ring-white/20">
                <FiMail size={18} />
              </span>
              <span className="underline-offset-4 hover:underline select-all">
                contacto@sistemgraf.cl
              </span>
            </a>
          </div>

          {/* DERECHA: Logo en óvalo (más largo, NO más alto) */}
          <div className="flex md:justify-end justify-center items-center">
            <div
              className="
                group relative grid place-items-center rounded-full
                ring-4 ring-white/40 hover:ring-white/60 transition
                bg-white/5
                /* Alto controlado; ancho mayor para alargar */
                h-[160px] sm:h-[170px] md:h-[180px]
                w-[320px] sm:w-[380px] md:w-[460px] lg:w-[520px]
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
              "
              style={{
                boxShadow:
                  "inset 0 0 60px rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              {/* aro interior para profundidad */}
              <div className="absolute inset-3 rounded-full ring-1 ring-white/25" />
              <img
                src={logo2}
                alt="Sistemgraf"
                className="
                  h-[60%] w-auto
                  drop-shadow
                  transition-transform duration-500 group-hover:scale-105
                "
              />
            </div>
          </div>
        </div>

        {/* copyright */}
        <div className="py-4 border-t border-white/10">
          <p className="text-xs text-white/70 text-center">
            © {year} Sistemgraf. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
