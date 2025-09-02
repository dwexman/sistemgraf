import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2F4F] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* contacto */}
          <div className="space-y-1">
            <p className="text-sm/6 opacity-90">
              Teléfono:{" "}
              <a href="tel:+56912345678" className="underline-offset-4 hover:underline">
                +56 9 1234 5678
              </a>
            </p>
            <p className="text-sm/6 opacity-90">
              Email:{" "}
              <a href="mailto:hola@tuempresa.com" className="underline-offset-4 hover:underline">
                hola@tuempresa.com
              </a>
            </p>
          </div>

          {/* redes oficiales */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
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
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        <div className="py-4 border-t border-white/10">
          <p className="text-xs text-white/70 text-center">
            © {year} Tu Empresa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
