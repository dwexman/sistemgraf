import React from "react";

function DateOnly({ date, className = "" }) {
  if (!date) return null;

  return (
    <div className={`text-xs sm:text-sm text-[#0A2F4F]/80 flex items-center gap-2 ${className}`}>
      <span className="inline-flex items-center gap-1">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {date}
      </span>
    </div>
  );
}

export default function ForumCard({ item, onOpen }) {
  // ✅ Con Blog.jsx normalizado, la imagen SIEMPRE viene en item.image (o vacío)
  const imageSrc = item?.image || "";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen?.(item);
      }}
      className="group relative rounded-[20px] overflow-hidden bg-white shadow-[0_14px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-[2px] cursor-pointer"
    >
      <div className="relative aspect-[16/10] bg-[#0A2F4F]/5">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={item?.title || "Artículo"}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-[#0A2F4F]/50 text-sm">
            (Sin imagen)
          </div>
        )}

        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00A3E0] to-[#69A9D1]" />
      </div>

      <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-[#FAFBFE]">
        <h4 className="text-[#0A2F4F] text-lg font-bold">{item?.title}</h4>

        {item?.excerpt ? (
          <p className="mt-2 text-sm text-[#0A2F4F]/80 leading-relaxed">
            {item.excerpt}
          </p>
        ) : null}

        {/* ✅ date ya viene formateado desde normalizeArticle */}
        <DateOnly date={item?.date} className="mt-3" />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-transparent group-hover:ring-[#00A3E0]/20 transition" />
    </article>
  );
}
