import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logowhite.png";

const LINKS = [
  { id: "inicio", label: "Inicio", to: "/" },
  { id: "servicios", label: "Servicios", to: "/servicios" },
  { id: "equipo", label: "Equipo", to: "/equipo" },
  { id: "blog", label: "Blog", to: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const active = location.pathname;

  const INTRANET_URL =
    import.meta.env.VITE_INTRANET_URL || "https://sistemgraf.cl/intranet";

  const linkClass = (to) =>
    `px-1 py-2 border-b-2 ${
      active === to ? "border-white" : "border-transparent"
    } hover:border-white transition`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0A2F4F] text-white shadow-sm">
      <nav className="w-full">
        <div className="flex h-20 items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <img src={logo} alt="Logo" className="h-16 w-auto md:h-18" />
            </Link>

            {/* Links desktop */}
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

              <Link
                to={{ pathname: "/", hash: "#contacto" }}
                className="px-1 py-2 border-b-2 border-transparent hover:border-white transition"
                onClick={(e) => {
                  setOpen(false);
                  if (active === "/") {
                    e.preventDefault();
                    const el = document.getElementById("contacto");
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Right desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.instagram.com/sistemgraf.cl/"
              aria-label="Instagram"
              className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
              title="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/sistemgraf-cl-8a867b397/"
              aria-label="LinkedIn"
              className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
              title="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={20} />
            </a>

            <a
              href="https://x.com/SistemgrafCL?s=20"
              aria-label="X"
              className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
              title="X"
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter size={20} />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61583502002358"
              aria-label="Facebook"
              className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
              title="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF size={20} />
            </a>

            {/* ✅ Intranet directo (como antes) */}
            <a
              href={INTRANET_URL}
              className="rounded-full bg-white text-[#0A2F4F] px-4 py-2 text-sm font-semibold shadow-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
              target="_blank"
              rel="noreferrer"
            >
              Intranet
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="p-2 rounded-md ring-1 ring-white/15 hover:ring-white/30 transition"
            >
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${
          open ? "block" : "hidden"
        } border-t border-white/10 bg-[#0A2F4F]`}
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

          <Link
            to={{ pathname: "/", hash: "#contacto" }}
            className="block px-1 py-2 border-b-2 border-transparent hover:border-white transition"
            onClick={(e) => {
              setOpen(false);
              if (active === "/") {
                e.preventDefault();
                const el = document.getElementById("contacto");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            Contacto
          </Link>

          <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/sistemgraf.cl/"
                aria-label="Instagram"
                className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/sistemgraf-cl-8a867b397/"
                aria-label="LinkedIn"
                className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn size={20} />
              </a>

              <a
                href="https://x.com/SistemgrafCL?s=20"
                aria-label="X"
                className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
                target="_blank"
                rel="noreferrer"
              >
                <FaXTwitter size={20} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61583502002358"
                aria-label="Facebook"
                className="p-2 rounded-full ring-1 ring-white/15 hover:ring-white/30 transition"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF size={20} />
              </a>
            </div>

            {/* ✅ Intranet directo (como antes) */}
            <a
              href={INTRANET_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white text-[#0A2F4F] px-4 py-2 text-sm font-semibold shadow-sm hover:bg-white/90"
            >
              Intranet
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
