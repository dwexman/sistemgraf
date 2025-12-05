import React, { useState } from "react";

function AuthorDate({ author, date, className = "" }) {
  return (
    <div className={`text-xs sm:text-sm text-[#0A2F4F]/80 flex items-center gap-2 ${className}`}>
      <span className="inline-flex items-center gap-1">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="3" />
        </svg>
        {author}
      </span>
      <span>•</span>
      <span className="inline-flex items-center gap-1">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
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

function StarRating({ value = 0, onChange }) {
  return (
    <div className="inline-flex items-center gap-1" aria-label="Valorar publicación">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(i + 1)}
            className="p-1"
            aria-label={`Calificar con ${i + 1} estrellas`}
            title={`${i + 1}`}
          >
            <svg
              className={`w-5 h-5 ${filled ? "text-[#00A3E0]" : "text-[#0A2F4F]/30"}`}
              viewBox="0 0 24 24"
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function ActionBar({ rating, setRating, onToggleComment }) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        type="button"
        onClick={onToggleComment}
        className="inline-flex items-center gap-2 text-[#005587] hover:text-[#00A3E0] font-semibold"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
        Comentar
      </button>
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm text-[#0A2F4F]/70">Valorar:</span>
        <StarRating value={rating} onChange={setRating} />
      </div>
    </div>
  );
}

export default function ForumCard({ item }) {
  const [rating, setRating] = useState(0);
  const [showComment, setShowComment] = useState(false);

  return (
    <article className="group relative rounded-[20px] overflow-hidden bg-white shadow-[0_14px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-[2px]">
      <div className="relative aspect-[16/10]">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00A3E0] to-[#69A9D1]" />
      </div>

      <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-[#FAFBFE]">
        <h4 className="text-[#0A2F4F] text-lg font-bold">{item.title}</h4>
        {item.excerpt && (
          <p className="mt-2 text-sm text-[#0A2F4F]/80 leading-relaxed">{item.excerpt}</p>
        )}
        <AuthorDate author={item.author} date={item.date} className="mt-3" />

        <ActionBar
          rating={rating}
          setRating={setRating}
          onToggleComment={() => setShowComment((v) => !v)}
        />

        {showComment && (
          <div className="mt-3">
            <textarea
              rows={3}
              className="w-full rounded-lg border border-[#E2E8F0] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
              placeholder="Escribe tu comentario…"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-[#005587] text-white hover:bg-[#00A3E0] text-sm font-semibold"
              >
                Publicar
              </button>
            </div>
          </div>
        )}

        {item.file && (
          <div className="mt-4 flex items-center justify-end">
            <a
              href={item.file}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#FF6B55] text-white shadow-[0_6px_12px_rgba(100,107,156,0.35)] hover:brightness-110"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Descargar
            </a>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-transparent group-hover:ring-[#00A3E0]/20 transition" />
    </article>
  );
}
