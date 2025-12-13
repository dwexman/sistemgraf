import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import blueBlobs from "../../../assets/blueblobs.png";

import organigrama from "../../../assets/organizational2.png";
import evaluation from "../../../assets/aprendizajecapacitaciones.png";
import proveedores from "../../../assets/evalproveedores.png";
import analitica from "../../../assets/psicometriamadurez.png";
import stress from "../../../assets/stresslaboral.png";
import powerBI from "../../../assets/evalBI.png";
import assistant from "../../../assets/seleccion.png";
import climate from "../../../assets/nlp.png";
import desarrollo from "../../../assets/gestiondesarrollo.png";

// 🔗 Base API: viene de .env (VITE_API_BASE_URL)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://sistemgraf.cl/backend/index.php";

// Endpoints públicos
const SERVICES_ENDPOINT = `${API_BASE_URL}/api/public/services`;
const CATEGORIES_ENDPOINT = `${API_BASE_URL}/api/public/categories`;

const ICONS = {
  1: organigrama,
  2: evaluation,
  3: proveedores,
  4: analitica,
  5: stress,
  6: powerBI,
  7: assistant,
  8: climate,
  9: desarrollo,
};

// (solo por compatibilidad si algún servicio viejo no trae category_key)
const SERVICE_CATEGORY_FALLBACK = {
  1: "diag",
  6: "diag",
  8: "diag",
  5: "diag",
  2: "cap",
  3: "cap",
  9: "cap",
  4: "td",
  7: "seleccion",
};

// Fallback categorías (si /categories falla o devuelve [])
const DEFAULT_CATEGORIES = [
  {
    id: 1,
    key: "diag",
    name: "Diagnóstico Organizacional",
    description:
      "Identifica la situación actual de tu organización (estructura, cultura, clima, salud en el trabajo) para tomar decisiones estratégicas.",
    colorFrom: "#002E49",
    colorTo: "#005587",
    ctaFrom: "#00A3E0",
    ctaTo: "#69A9D1",
    sort_order: 0,
    is_active: true,
  },
  {
    id: 2,
    key: "cap",
    name: "Desarrollo del Talento y Capacitación",
    description:
      "Mide la efectividad de la formación para asegurar retorno de inversión y mejorar continuamente el desarrollo del talento.",
    colorFrom: "#0A4D7A",
    colorTo: "#117DB1",
    ctaFrom: "#1AA6E0",
    ctaTo: "#7ECBF0",
    sort_order: 1,
    is_active: true,
  },
  {
    id: 3,
    key: "td",
    name: "Transformación Digital y Analítica",
    description:
      "Prepara a tu organización para el uso avanzado de datos y automatiza la gestión de desempeño para mayor agilidad.",
    colorFrom: "#123B6B",
    colorTo: "#1E63A7",
    ctaFrom: "#2D89E5",
    ctaTo: "#8AB9F5",
    sort_order: 2,
    is_active: true,
  },
  {
    id: 4,
    key: "seleccion",
    name: "Atracción y Selección de Talento",
    description:
      "Optimiza el filtrado y selección de candidatos, reduciendo tiempos y costos y mejorando la calidad de las contrataciones.",
    colorFrom: "#1B4F91",
    colorTo: "#4FA0E2",
    ctaFrom: "#58A9EA",
    ctaTo: "#A7D3F8",
    sort_order: 3,
    is_active: true,
  },
];

// Paletas fallback para categorías nuevas (si aún no están creadas en DB)
const EXTRA_PALETTES = [
  {
    cardBg: "linear-gradient(180deg,#002E49 0%,#005587 100%)",
    ctaBg: "linear-gradient(90deg,#00A3E0 0%,#69A9D1 100%)",
    headerClosed: "linear-gradient(135deg,#003858 0%,#0073A3 100%)",
    headerOpen:
      "linear-gradient(135deg,rgba(0,56,88,0.72) 0%,rgba(0,115,163,0.36) 100%)",
  },
  {
    cardBg: "linear-gradient(180deg,#0A4D7A 0%,#117DB1 100%)",
    ctaBg: "linear-gradient(90deg,#1AA6E0 0%,#7ECBF0 100%)",
    headerClosed: "linear-gradient(135deg,#0B5688 0%,#1590C8 100%)",
    headerOpen:
      "linear-gradient(135deg,rgba(11,86,136,0.70) 0%,rgba(21,144,200,0.34) 100%)",
  },
  {
    cardBg: "linear-gradient(180deg,#123B6B 0%,#1E63A7 100%)",
    ctaBg: "linear-gradient(90deg,#2D89E5 0%,#8AB9F5 100%)",
    headerClosed: "linear-gradient(135deg,#14457C 0%,#2475C4 100%)",
    headerOpen:
      "linear-gradient(135deg,rgba(20,69,124,0.70) 0%,rgba(36,117,196,0.34) 100%)",
  },
  {
    cardBg: "linear-gradient(180deg,#1B4F91 0%,#4FA0E2 100%)",
    ctaBg: "linear-gradient(90deg,#58A9EA 0%,#A7D3F8 100%)",
    headerClosed: "linear-gradient(135deg,#1E5AA5 0%,#64B0EC 100%)",
    headerOpen:
      "linear-gradient(135deg,rgba(30,90,165,0.68) 0%,rgba(100,176,236,0.32) 100%)",
  },
];

function hashStr(str) {
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h;
}

function paletteFallbackForKey(key) {
  const h = Math.abs(hashStr(key));
  return EXTRA_PALETTES[h % EXTRA_PALETTES.length];
}

function humanizeCategoryKey(key) {
  return String(key || "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function hexToRgba(input, alpha) {
  const v = String(input || "").trim();
  if (!v) return `rgba(0,0,0,${alpha})`;
  if (v.startsWith("rgb")) return v;
  let hex = v.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  if (hex.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function paletteFromCategory(cat) {
  const colorFrom = cat?.colorFrom ?? cat?.color_from ?? "#002E49";
  const colorTo = cat?.colorTo ?? cat?.color_to ?? "#005587";

  // CTA: si no existe, tomamos variantes desde los mismos colores
  const ctaFrom = cat?.ctaFrom ?? cat?.cta_from ?? colorTo ?? "#00A3E0";
  const ctaTo = cat?.ctaTo ?? cat?.cta_to ?? colorFrom ?? "#69A9D1";

  return {
    cardBg: `linear-gradient(180deg,${colorFrom} 0%,${colorTo} 100%)`,
    ctaBg: `linear-gradient(90deg,${ctaFrom} 0%,${ctaTo} 100%)`,
    headerClosed: `linear-gradient(135deg,${colorFrom} 0%,${colorTo} 100%)`,
    headerOpen: `linear-gradient(135deg,${hexToRgba(
      colorFrom,
      0.72
    )} 0%,${hexToRgba(colorTo, 0.36)} 100%)`,
  };
}

function ServiceCard({ service, palette, delay = 0 }) {
  const id = service?.id;
  const titulo = service?.titulo ?? "";
  const iconKey = Number(service?.icon_key ?? service?.id);
  const icon = ICONS[iconKey] || organigrama;

  return (
    <div
      className="
        group relative w-[260px] sm:w-[280px] rounded-[22px]
        p-5 sm:p-6 text-white text-center
        shadow-[0_18px_28px_rgba(0,0,0,0.30)]
        flex flex-col min-h-[200px] sm:min-h-[220px]
        transition-transform hover:-translate-y-[2px]
      "
      style={{ background: palette.cardBg, transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center">
        {icon ? (
          <img
            src={icon}
            alt=""
            aria-hidden="true"
            className="w-24 h-24 mb-4 object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : null}

        <h3 className="mb-4 leading-snug text-center break-words text-white">
          {titulo}
        </h3>
      </div>

      <Link
        to={`/servicios#serv-${id}`}
        aria-label={`Leer más sobre ${titulo}`}
        className="
          mt-auto inline-flex items-center justify-center
          rounded-[14px] px-6 py-2 text-sm font-semibold text-white shadow-md
          transition-transform hover:-translate-y-[1px]
        "
        style={{ background: palette.ctaBg }}
      >
        Leer más
      </Link>
    </div>
  );
}

function CategoryAccordion({ cat, palette, active, setActive, children }) {
  const isOpen = active === cat.key;

  const title = cat?.titulo ?? cat?.name ?? humanizeCategoryKey(cat?.key);
  const desc = cat?.descripcion ?? cat?.description ?? "";

  return (
    <div
      className={`
        group rounded-2xl text-white shadow-sm transition-all duration-300
        ${isOpen ? "ring-1 ring-white/30" : "hover:shadow-md"}
      `}
      style={{
        background: isOpen ? palette.headerOpen : palette.headerClosed,
        backdropFilter: isOpen ? "saturate(140%) blur(1px)" : "none",
      }}
    >
      <button
        onClick={() => setActive(isOpen ? null : cat.key)}
        aria-expanded={isOpen}
        aria-controls={`${cat.key}-content`}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
      >
        <div>
          <span className="block font-extrabold text-[20px] md:text-[22px] leading-tight">
            {title}
          </span>
          {desc ? (
            <span className="block text-white/95 text-[14px] md:text-[15px] mt-1">
              {desc}
            </span>
          ) : null}
        </div>

        <span
          className={`
            inline-flex h-9 w-9 items-center justify-center rounded-full
            border border-white/25 bg-white text-[#0A2F4F]
            transition-transform duration-300 ${isOpen ? "rotate-180" : ""}
          `}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={`${cat.key}-content`}
        className={`
          grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out
          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="min-h-0">
          <div className="px-5 md:px-6 pb-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function ServiciosSection() {
  const sectionRef = useRef(null);

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const [active, setActive] = useState("diag");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Animación scroll
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

  // 1) cargar categories (para colores + textos)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(CATEGORIES_ENDPOINT, { cache: "no-store" });
        if (!res.ok) return;

        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.content)
          ? data.content
          : Array.isArray(data?.data?.content)
          ? data.data.content
          : null;

        if (!Array.isArray(list) || list.length === 0) return;

        const normalized = list
          .map((c) => ({
            id: c.id,
            key: c.key,
            name: c.name,
            description: c.description,
            colorFrom: c.colorFrom ?? c.color_from,
            colorTo: c.colorTo ?? c.color_to,
            ctaFrom: c.ctaFrom ?? c.cta_from,
            ctaTo: c.ctaTo ?? c.cta_to,
            sort_order: c.sort_order ?? 0,
            is_active: c.is_active ?? true,
          }))
          .filter((c) => Boolean(c.key));

        if (!cancelled && normalized.length) setCategories(normalized);
      } catch (_) {}

      return;
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // 2) cargar services
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setErr("");

      try {
        const res = await fetch(SERVICES_ENDPOINT, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const list =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.services)
            ? data.services
            : Array.isArray(data?.content)
            ? data.content
            : Array.isArray(data?.data?.content)
            ? data.data.content
            : [];

        if (!cancelled) setServices(Array.isArray(list) ? list : []);
      } catch (e) {
        if (!cancelled) setErr(e?.message || "Error cargando servicios");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // categorías a renderizar = DB (ordenadas) + placeholders si aparece category_key nuevo
  const categoriesToRender = useMemo(() => {
    const sorted = [...(categories || [])].sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
    );

    const existingKeys = new Set(sorted.map((c) => c.key));

    const keysFromServices = Array.from(
      new Set(
        (services || [])
          .map((s) => s?.category_key ?? SERVICE_CATEGORY_FALLBACK[s?.id])
          .filter(Boolean)
      )
    );

    const extras = keysFromServices
      .filter((k) => !existingKeys.has(k))
      .map((k) => ({
        id: `extra-${k}`,
        key: k,
        name: humanizeCategoryKey(k),
        description: "Categoría creada desde la intranet (pendiente descripción).",
        _isPlaceholder: true,
        sort_order: 999,
        is_active: true,
      }));

    return [...sorted, ...extras];
  }, [categories, services]);

  // si active no existe, cae a la primera
  useEffect(() => {
  if (!categoriesToRender.length) return;
  if (active === null) return;
  const exists = categoriesToRender.some((c) => c.key === active);
  if (!exists) setActive(categoriesToRender[0].key);
}, [categoriesToRender, active]);

  // paleta por key (DB o fallback)
  const paletteByKey = useMemo(() => {
    const map = new Map();
    (categoriesToRender || []).forEach((c) => {
      const pal = c?._isPlaceholder
        ? paletteFallbackForKey(c.key)
        : paletteFromCategory(c);
      map.set(c.key, pal);
    });
    return map;
  }, [categoriesToRender]);

  // agrupar servicios por categoría
  const servicesByCategory = useMemo(() => {
    return (categoriesToRender || []).map((cat) => {
      const items = (services || []).filter((s) => {
        const key = s?.category_key ?? SERVICE_CATEGORY_FALLBACK[s?.id];
        return key === cat.key;
      });

      return {
        cat,
        palette: paletteByKey.get(cat.key) || paletteFallbackForKey(cat.key),
        items,
      };
    });
  }, [categoriesToRender, services, paletteByKey]);

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
        className="pointer-events-none select-none absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1962px] h-[1706px] max-w-none opacity-95"
        loading="lazy"
        decoding="async"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[#0A2F4F] font-extrabold tracking-[0.12em] uppercase text-2xl sm:text-3xl mb-10">
          NUESTROS SERVICIOS
        </h2>

        {err ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
            {err}
          </div>
        ) : null}

        {loading ? (
          <div className="text-center text-[#0A2F4F]/80 text-sm py-10">
            Cargando…
          </div>
        ) : (
          <div className="space-y-6">
            {servicesByCategory.map(({ cat, palette, items }) => (
              <CategoryAccordion
                key={cat.key}
                cat={cat}
                palette={palette}
                active={active}
                setActive={setActive}
              >
                <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
                  {items.length ? (
                    items.map((s, i) => (
                      <ServiceCard
                        key={s.id}
                        service={s}
                        palette={palette}
                        delay={i * 120}
                      />
                    ))
                  ) : (
                    <div className="text-white/90 text-sm py-2">
                      Aún no hay servicios en esta categoría.
                    </div>
                  )}
                </div>
              </CategoryAccordion>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
