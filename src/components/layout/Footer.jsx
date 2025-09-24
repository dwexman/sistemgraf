import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../assets/logowhite.png"; // misma ruta que en tu Navbar

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2F4F] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* fila principal */}
        <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* contacto */}
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm/6 opacity-90">
              Teléfono:{" "}
              <a
                href="tel:+56912345678"
                className="underline-offset-4 hover:underline"
              >
                +56 9 1234 5678
              </a>
            </p>
            <p className="text-sm/6 opacity-90">
              Email:{" "}
              <a
                href="mailto:contacto@sistemgraf.cl"
                className="underline-offset-4 hover:underline"
              >
                contacto@sistemgraf.cl
              </a>
            </p>
          </div>

          {/* logo centro con animación (más grande en desktop) */}
          <div className="flex justify-center">
            <div
              className="
                group inline-flex items-center justify-center rounded-full
                p-3 sm:p-4 md:p-6 lg:p-8
                ring-1 sm:ring-1 md:ring-2 lg:ring-4 ring-white/15 hover:ring-white/30
                shadow-sm md:shadow-md lg:shadow-lg
                transition
              "
            >
              <img
                src={logo}
                alt="Sistemgraf"
                className="
                  h-14 sm:h-16 md:h-20 lg:h-24 w-auto
                  drop-shadow
                  transition-transform duration-500
                  group-hover:scale-110
                "
              />
            </div>
          </div>

          {/* redes */}
          <div className="flex md:justify-end justify-center items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
              onClick={(e) => e.preventDefault()}
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
              onClick={(e) => e.preventDefault()}
            >
              <FaLinkedinIn size={20} />
            </a>
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
