import { useState } from "react";
import logo from "../assets/logowhite.png";

const LINKS = [
  { id: "inicio", label: "Inicio", href: "#inicio" },
  { id: "servicios", label: "Servicios", href: "#servicios" },
  { id: "blog", label: "Blog", href: "#blog" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  const linkClass = (id) =>
    `px-1 py-2 border-b-2 ${
      active === id ? "border-white" : "border-transparent"
    } hover:border-white transition`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0A2F4F] text-white shadow-sm">
      <nav className="w-full px-0">
        <div className="flex h-16 items-center">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-12 w-auto md:h-14" />
            </a>

            <div className="hidden md:flex items-center gap-6">
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  className={linkClass(l.id)}
                  onClick={() => setActive(l.id)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="ml-auto md:hidden pr-2">
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Abrir menú"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" className={`md:hidden ${open ? "block" : "hidden"} border-t border-white/10`}>
        <div className="px-3 py-3 space-y-1">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className={`${linkClass(l.id)} block`}
              onClick={() => {
                setActive(l.id);
                setOpen(false);
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
