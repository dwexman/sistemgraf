import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../assets/logowhite.png";

const LINKS = [
  { id: "inicio", label: "Inicio", to: "/" },
  { id: "servicios", label: "Servicios", to: "/servicios" },
  { id: "blog", label: "Blog", to: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname;

  const linkClass = (to) =>
    `px-1 py-2 border-b-2 ${
      active === to ? "border-white" : "border-transparent"
    } hover:border-white transition`;

  const goToContacto = (e) => {
    e.preventDefault();
    setOpen(false);
    if (active === "/") {
      const el = document.getElementById("contacto");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: "contacto" } });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0A2F4F] text-white shadow-sm">
      <nav className="w-full">
        {/* altura aumentada: h-20 */}
        <div className="flex h-20 items-center justify-between px-3 sm:px-4">
          {/* Izquierda: logo + links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              {/* logo más grande */}
              <img src={logo} alt="Logo" className="h-16 w-auto md:h-18" />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {LINKS.map((l) => (
                <Link
                  key={l.id}
                  to={l.to}
                  className={linkClass(l.to)}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}

              {/* Contacto como scroll */}
              <a
                href="/#contacto"
                onClick={goToContacto}
                className="px-1 py-2 border-b-2 border-transparent hover:border-white transition"
              >
                Contacto
              </a>
            </div>
          </div>

          {/* Derecha: Íconos oficiales + botón Intranet */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
              title="Instagram"
              onClick={(e) => e.preventDefault()}
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
              title="LinkedIn"
              onClick={(e) => e.preventDefault()}
            >
              <FaLinkedinIn size={20} />
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded-full bg-white text-[#0A2F4F] px-4 py-2 text-sm font-semibold shadow-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Intranet
            </a>
          </div>
        </div>
      </nav>

      {/* Menú móvil (si lo usas) */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-white/10`}
      >
        <div className="px-3 py-3 space-y-1">
          {LINKS.map((l) => (
            <Link
              key={l.id}
              to={l.to}
              className={`${linkClass(l.to)} block`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/#contacto"
            onClick={goToContacto}
            className="block px-1 py-2 border-b-2 border-transparent hover:border-white transition"
          >
            Contacto
          </a>

          {/* Íconos + Intranet en mobile */}
          <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full ring-1 ring-white/15" onClick={(e)=>e.preventDefault()}>
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full ring-1 ring-white/15" onClick={(e)=>e.preventDefault()}>
                <FaLinkedinIn size={20} />
              </a>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded-full bg-white text-[#0A2F4F] px-4 py-2 text-sm font-semibold shadow-sm"
            >
              Intranet
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
