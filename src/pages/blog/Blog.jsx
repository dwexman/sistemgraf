import React, { useMemo, useState, useCallback, useEffect } from "react";
import blueBlobs from "../../assets/blueblobs.png";

import ActualidadList from "./components/ActualidadList";
import InvestigacionesList from "./components/InvestigacionesList";
import PublicacionesList from "./components/PublicacionesList";

/* Tabs locales */
const TAB_MAP = {
  actualidad: { label: "Actualidad", section: "actualidad" },
  investigaciones: {
    label: "Avances en Investigaciones",
    section: "investigaciones",
  },
  publicaciones: { label: "Publicaciones de Interés", section: "publicaciones" },
};

// ✅ OJO: NO uses /index.php acá. Solo el dominio/base real del backend.
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

/* =========================
   Helpers
   ========================= */

function toAbsUrl(apiBase, maybeUrl) {
  if (!maybeUrl) return "";
  if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl;

  const base = String(apiBase).replace(/\/+$/, "");
  const path = String(maybeUrl).startsWith("/") ? maybeUrl : `/${maybeUrl}`;
  return `${base}${path}`;
}

function formatDate(raw) {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("es-CL", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return "";
  }
}

function getMonthName(raw) {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("es-CL", { month: "long" });
  } catch {
    return "";
  }
}

function normalizeArticle(apiBase, a) {
  const publishedAt =
    a?.published_at || a?.publishedAt || a?.created_at || a?.createdAt || null;

  const monthRaw = getMonthName(publishedAt);
  const month =
    monthRaw && monthRaw.length
      ? monthRaw[0].toUpperCase() + monthRaw.slice(1)
      : "";

  return {
    id: a?.id,
    slug: a?.slug || "", // ✅ clave para el show
    section: a?.section || "",
    title: a?.title || "",
    excerpt: a?.excerpt || "",
    body: a?.body || "", // puede venir vacío si el listado no lo trae, ok
    image: toAbsUrl(apiBase, a?.cover_url),
    link: a?.link_url || "",
    qr: toAbsUrl(apiBase, a?.qr_url),
    date: formatDate(publishedAt),
    published_at: publishedAt,
    month,
  };
}

/* =========================
   Modal grande
   ========================= */

function BlogPostModal({ open, item, loading, error, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Overlay */}
      <button
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Cerrar modal"
      />

      {/* Card */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-black/10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-black/10">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#005587] uppercase tracking-widest">
              {item?.month ? `Publicación · ${item.month}` : "Entrada"}
            </p>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A2F4F] mt-1 break-words">
              {item?.title || (loading ? "Cargando…" : "Sin título")}
            </h2>

            {!!item?.date && (
              <div className="mt-2 text-sm text-[#0A2F4F]/70">
                <span>{item.date}</span>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="shrink-0 rounded-full px-4 py-2 text-sm font-bold bg-[#005587] text-white hover:opacity-90"
          >
            Cerrar
          </button>
        </div>

        {/* Body scroll */}
        <div className="max-h-[75vh] overflow-y-auto">
          {/* Loading / Error */}
          {error ? (
            <div className="px-6 py-6">
              <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            </div>
          ) : loading ? (
            <div className="px-6 py-10 text-[#0A2F4F]/70">Cargando…</div>
          ) : item ? (
            <>
              {/* Image */}
              {item.image ? (
                <div className="px-6 pt-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[240px] sm:h-[320px] object-cover rounded-2xl border border-black/5"
                  />
                </div>
              ) : null}

              {/* Content */}
              <div className="px-6 py-6">
                {item.excerpt ? (
                  <p className="text-base sm:text-lg leading-relaxed text-[#0A2F4F]/90">
                    {item.excerpt}
                  </p>
                ) : null}

                {/* Link + QR */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 rounded-2xl border border-black/10 p-4">
                    <p className="text-sm font-bold text-[#0A2F4F]">Link</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#005587] hover:underline break-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.link}
                        <span className="text-[#0A2F4F]/50">(abrir)</span>
                      </a>
                    ) : (
                      <p className="mt-2 text-sm text-[#0A2F4F]/60">
                        (Sin link asociado)
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-black/10 p-4 flex items-center justify-center">
                    {item.qr ? (
                      <img
                        src={item.qr}
                        alt={`QR ${item.title}`}
                        className="w-[120px] h-[120px] object-contain"
                      />
                    ) : (
                      <p className="text-sm text-[#0A2F4F]/60 text-center">
                        (Sin QR)
                      </p>
                    )}
                  </div>
                </div>

                {/* Body (HTML) */}
                {item.body ? (
                  <div className="mt-8 rounded-2xl border border-black/10 p-4">
                    <p className="text-sm font-bold text-[#0A2F4F] mb-2">
                      Contenido
                    </p>
                    <div
                      className="prose max-w-none prose-p:leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* =========================
   Page
   ========================= */

export default function Blog() {
  const apiBase = String(API_BASE).replace(/\/+$/, "");

  const [activeTab, setActiveTab] = useState("actualidad");

  // Datos por tab
  const [itemsByTab, setItemsByTab] = useState({
    actualidad: [],
    investigaciones: [],
    publicaciones: [],
  });
  const [loadingByTab, setLoadingByTab] = useState({
    actualidad: false,
    investigaciones: false,
    publicaciones: false,
  });
  const [errorByTab, setErrorByTab] = useState({
    actualidad: "",
    investigaciones: "",
    publicaciones: "",
  });

  // Modal + detalle
  const [modalOpen, setModalOpen] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  // Fetch listado por tab
  useEffect(() => {
    const cfg = TAB_MAP[activeTab];
    if (!cfg) return;

    const controller = new AbortController();

    const run = async () => {
      setLoadingByTab((p) => ({ ...p, [activeTab]: true }));
      setErrorByTab((p) => ({ ...p, [activeTab]: "" }));

      try {
        const params = new URLSearchParams();
        params.set("per_page", "50");
        params.set("page", "1");
        params.set("status", "published");
        params.set("section", cfg.section);

        const res = await fetch(
          `${apiBase}/api/public/articles?${params.toString()}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error("No se pudo cargar el contenido");

        const json = await res.json();
        const rows = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json)
          ? json
          : [];

        const normalized = rows.map((a) => normalizeArticle(apiBase, a));
        setItemsByTab((p) => ({ ...p, [activeTab]: normalized }));
      } catch (e) {
        if (e?.name !== "AbortError") {
          setErrorByTab((p) => ({
            ...p,
            [activeTab]: e?.message || "Error al cargar",
          }));
        }
      } finally {
        setLoadingByTab((p) => ({ ...p, [activeTab]: false }));
      }
    };

    run();
    return () => controller.abort();
  }, [activeTab, apiBase]);

  const currentItems = useMemo(
    () => itemsByTab[activeTab] || [],
    [itemsByTab, activeTab]
  );
  const currentLoading = loadingByTab[activeTab];
  const currentError = errorByTab[activeTab];

  // ✅ Abrir modal: trae detalle por slug desde /api/public/articles/{slug}
  const openModal = useCallback(
    async (item) => {
      setModalOpen(true);
      setDetailError("");
      setDetailLoading(true);

      // mostramos algo inmediatamente
      setOpenItem(item);

      try {
        const slug = item?.slug;
        if (!slug) throw new Error("Artículo sin slug (no se puede abrir detalle)");

        const res = await fetch(`${apiBase}/api/public/articles/${slug}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error("No se pudo cargar el detalle");

        const full = await res.json();
        setOpenItem(normalizeArticle(apiBase, full));
      } catch (e) {
        setDetailError(e?.message || "Error al abrir el artículo");
      } finally {
        setDetailLoading(false);
      }
    },
    [apiBase]
  );

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setOpenItem(null);
    setDetailError("");
    setDetailLoading(false);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#EFEEF5] py-16 sm:py-20 min-h-screen">
      {/* Fondo */}
      <img
        src={blueBlobs}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1962px] h-[1706px] max-w-none opacity-90"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#EFEEF5]/60 via-transparent to-[#EFEEF5]/80" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h1 className="text-[#0A2F4F] font-extrabold tracking-[0.12em] uppercase text-2xl sm:text-3xl">
            FORO
          </h1>
        </header>

        {/* Tabs */}
        <nav className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {Object.entries(TAB_MAP).map(([key, { label }]) => {
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition
                    ${
                      active
                        ? "bg-[#005587] text-white"
                        : "bg-white text-[#005587] hover:bg-[#E6F6FC] ring-1 ring-[#005587]/20"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Estado */}
        {currentError ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
            {currentError}
          </div>
        ) : null}

        {currentLoading ? (
          <div className="mb-6 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-[#0A2F4F]/70">
            Cargando…
          </div>
        ) : null}

        {/* Contenido */}
        {activeTab === "actualidad" && (
          <ActualidadList items={currentItems} onOpen={openModal} />
        )}
        {activeTab === "investigaciones" && (
          <InvestigacionesList items={currentItems} onOpen={openModal} />
        )}
        {activeTab === "publicaciones" && (
          <PublicacionesList items={currentItems} onOpen={openModal} />
        )}
      </div>

      {/* Modal */}
      <BlogPostModal
        open={modalOpen}
        item={openItem}
        loading={detailLoading}
        error={detailError}
        onClose={closeModal}
      />
    </section>
  );
}
