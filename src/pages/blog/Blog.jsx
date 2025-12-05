// src/pages/blog/Blog.jsx
import React, { useMemo, useState } from "react";
import blueBlobs from "../../assets/blueblobs.png";
import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";

import ActualidadList from "./components/ActualidadList";
import InvestigacionesList from "./components/InvestigacionesList";
import PublicacionesList from "./components/PublicacionesList";

/* Datos de ejemplo (reemplaza por API cuando quieras) */
const actualidad = [
  {
    id: "a1",
    title: "Tendencias BI 2025: decisiones con IA explicable",
    excerpt:
      "De indicadores descriptivos a analítica prescriptiva con modelos transparentes y auditables.",
    author: "Equipo Sistemgraf",
    date: "02 Sep 2025",
    image: blog1,
  },
  {
    id: "a2",
    title: "People Analytics: del excel a la estrategia",
    excerpt:
      "Cómo pasar de reportes estáticos a insights accionables para RR.HH. y líderes.",
    author: "María Ramos",
    date: "28 Ago 2025",
    image: blog2,
  },
];

const investigaciones = [
  {
    id: "i1",
    title:
      "Efecto de tableros de desempeño en la retención de talento (estudio 2024-2025)",
    excerpt:
      "Resultados preliminares: OKRs visibles correlacionan con una mejora del 12% en retención.",
    author: "Equipo I+D",
    date: "18 Sep 2025",
    image: blog2,
  },
  {
    id: "i2",
    title: "Algoritmos de recomendación de capacitación en empresas medianas",
    excerpt:
      "Matching de brechas y rutas de aprendizaje personalizadas con aprendizaje por refuerzo.",
    author: "Jorge Fuentes",
    date: "07 Sep 2025",
    image: blog1,
  },
];

const publicaciones = [
  { id: "p01", month: "Enero",  title: "Guía de KPIs de Capital Humano", file: "/files/kpis-capital-humano.pdf", author: "Equipo Sistemgraf", date: "15 Ene 2025", image: blog1 },
  { id: "p02", month: "Febrero",title: "Playbook de Tableros Ejecutivos",  file: "/files/tableros-ejecutivos.pdf",  author: "Equipo Sistemgraf", date: "14 Feb 2025", image: blog2 },
  { id: "p03", month: "Marzo",  title: "Segmentación de Desempeño",       file: "/files/segmentacion-desempeno.pdf", author: "Equipo Sistemgraf", date: "12 Mar 2025", image: blog1 },
  { id: "p04", month: "Abril",  title: "Benchmark de Engagement 2025",    file: "/files/benchmark-engagement-2025.pdf", author: "Equipo Sistemgraf", date: "16 Abr 2025", image: blog2 },
];

/* Tabs locales (sin navegación) */
const TAB_MAP = {
  actualidad: { label: "Actualidad" },
  investigaciones: { label: "Avances en Investigaciones" },
  publicaciones: { label: "Publicaciones de Interés" },
};

function BottomRatingPanel() {
  const [value, setValue] = useState(0);
  return (
    <div className="mt-10 flex flex-col items-center">
      <p className="text-sm text-[#0A2F4F]/70 mb-2">Valora esta sección</p>
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const active = i < value;
          return (
            <button
              key={i}
              onClick={() => setValue(i + 1)}
              className={`h-4 w-10 rounded-sm ${active ? "bg-[#00A3E0]" : "bg-[#E2E8F0]"}`}
              aria-label={`Valor ${i + 1}`}
              title={`${i + 1}/5`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Blog() {
  const [activeTab, setActiveTab] = useState("actualidad");

  // Descargas anuales (solo para Publicaciones)
  const MAX_YEARLY = 12;
  const [downloadedIds, setDownloadedIds] = useState(new Set());
  const downloadedCount = downloadedIds.size;
  const downloadsLeft = Math.max(0, MAX_YEARLY - downloadedCount);

  const handleDownload = (id) => {
    setDownloadedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const SectionList = useMemo(() => {
    if (activeTab === "actualidad") return actualidad;
    if (activeTab === "investigaciones") return investigaciones;
    return publicaciones;
  }, [activeTab]);

  return (
    <section className="relative overflow-hidden bg-[#EFEEF5] py-16 sm:py-20 min-h-screen">
      {/* Fondo (z-0) */}
      <img
        src={blueBlobs}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1962px] h-[1706px] max-w-none opacity-90"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#EFEEF5]/60 via-transparent to-[#EFEEF5]/80" />

      {/* Contenido (z-10) */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecera: SOLO título */}
        <header className="text-center mb-10">
          <h1 className="text-[#0A2F4F] font-extrabold tracking-[0.12em] uppercase text-2xl sm:text-3xl">
            FORO
          </h1>
        </header>

        {/* Menú superior (tabs locales) */}
        <nav className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {Object.entries(TAB_MAP).map(([key, { label }]) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition
                    ${active ? "bg-[#005587] text-white" : "bg-white text-[#005587] hover:bg-[#E6F6FC] ring-1 ring-[#005587]/20"}
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Contenido por tab (SIN cambiar de página) */}
        {activeTab === "actualidad" && <ActualidadList items={actualidad} />}

        {activeTab === "investigaciones" && (
          <InvestigacionesList items={investigaciones} />
        )}

        {activeTab === "publicaciones" && (
          <PublicacionesList
            items={SectionList}
            maxYearly={MAX_YEARLY}
            downloadedCount={downloadedCount}
            downloadsLeft={downloadsLeft}
            downloadedIds={downloadedIds}
            onDownload={handleDownload}
          />
        )}

        {/* Panel inferior de valoración */}
        <BottomRatingPanel />
      </div>
    </section>
  );
}
