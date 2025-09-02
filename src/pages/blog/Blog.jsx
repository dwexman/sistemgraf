import blueBlobs from "../../assets/blueblobs.png";
import blog1 from "../../assets/blog1.png"; 
import blog2 from "../../assets/blog2.png"; 
const featured = {
  id: "f1",
  title: "Transformación digital con foco en personas",
  excerpt:
    "Cómo priorizar cultura y procesos al momento de implementar tecnología para maximizar adopción y ROI.",
  author: "Equipo Sistemgraf",
  date: "02 Sep 2025",
  image: blog2, 
};

const posts = [
  {
    id: "p1",
    title: "5 métricas clave para tu tablero de BI",
    excerpt:
      "Desde NPS hasta eficiencia operativa: un vistazo rápido a los indicadores que no pueden faltar.",
    author: "María Ramos",
    date: "28 Ago 2025",
    image: "/assets/blog/post-1.jpg",
  },
  {
    id: "p2",
    title: "Automatización low-code, ¿por dónde partir?",
    excerpt:
      "Buenas prácticas para levantar procesos y elegir herramientas sin sobredimensionar el roadmap.",
    author: "Jorge Fuentes",
    date: "21 Ago 2025",
    image: "/assets/blog/post-2.jpg",
  },
  {
    id: "p3",
    title: "Organigramas vivos: estructuras adaptables",
    excerpt:
      "Cómo mantener los roles y equipos alineados con los objetivos de negocio en ciclos trimestrales.",
    author: "Equipo Sistemgraf",
    date: "12 Ago 2025",
    image: "/assets/blog/post-3.jpg",
  },
  {
    id: "p4",
    title: "Experiencia de cliente: fricciones invisibles",
    excerpt:
      "Microinteracciones y puntos ciegos que afectan conversión y retención sin que lo notes.",
    author: "Camila Pérez",
    date: "05 Ago 2025",
    image: "/assets/blog/post-4.jpg",
  },
];

function AuthorDate({ author, date, className = "" }) {
  return (
    <div
      className={`text-xs sm:text-sm text-[#0A2F4F]/80 flex items-center gap-2 ${className}`}
    >
      <span className="inline-flex items-center gap-1">
        {/* Icono autor */}
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="3" />
        </svg>
        {author}
      </span>
      <span>•</span>
      <span className="inline-flex items-center gap-1">
        {/* Icono calendario */}
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
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

function FeaturedPost({ post }) {
  return (
    <article
      className="
        relative rounded-[24px] overflow-hidden
        bg-white shadow-[0_18px_28px_rgba(0,0,0,0.10)]
        ring-1 ring-black/5
        grid grid-cols-1
        md:grid-cols-[minmax(300px,40%)_1fr]  /* ⬅️ menos larga */
        md:min-h-[360px]                      /* ⬅️ más alta */
      "
    >
      {/* Imagen izquierda */}
      <div className="relative aspect-[16/9] md:aspect-auto md:h-[360px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Banda decorativa arriba */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00A3E0] to-[#69A9D1]" />
      </div>

      {/* Contenido derecha */}
      <div
        className="
          relative flex flex-col p-6 sm:p-8
          bg-gradient-to-b from-white to-[#F7F9FC]
          md:min-h-[360px]
        "
      >
        <h3 className="text-[#0A2F4F] text-xl sm:text-2xl font-extrabold text-center">
          {post.title}
        </h3>

        <p className="mt-4 text-sm sm:text-base text-[#0A2F4F]/80 leading-relaxed">
          {post.excerpt}
        </p>

        <AuthorDate
          author={post.author}
          date={post.date}
          className="mt-6 md:mt-auto md:self-end"
        />
      </div>
    </article>
  );
}

function BlogCard({ post }) {
  return (
    <article
      className="
        group relative rounded-[20px] overflow-hidden bg-white
        shadow-[0_14px_24px_rgba(0,0,0,0.08)] ring-1 ring-black/5
        transition-transform duration-300 hover:-translate-y-[2px]
      "
    >
      {/* Imagen arriba */}
      <div className="relative aspect-[16/10]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00A3E0] to-[#69A9D1]" />
      </div>

      {/* Texto */}
      <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-[#FAFBFE]">
        <h4 className="text-[#0A2F4F] text-lg font-bold">{post.title}</h4>
        <p className="mt-2 text-sm text-[#0A2F4F]/80 leading-relaxed">
          {post.excerpt}
        </p>

        <AuthorDate author={post.author} date={post.date} className="mt-4" />
      </div>

      {/* Halo sutil en hover */}
      <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-transparent group-hover:ring-[#00A3E0]/20 transition" />
    </article>
  );
}

export default function Blog() {
  return (
    <section className="relative overflow-hidden bg-[#EFEEF5] py-16 sm:py-20">
      {/* Fondo blobs + velo sutil */}
      <img
        src={blueBlobs}
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none select-none absolute z-0
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[1962px] h-[1706px] max-w-none opacity-90
        "
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#EFEEF5]/60 via-transparent to-[#EFEEF5]/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título sección */}
        <h2 className="text-center text-[#0A2F4F] font-extrabold tracking-[0.12em] uppercase text-2xl sm:text-3xl mb-10">
          Blog
        </h2>

        {/* Destacado (menos ancho) */}
        <div className="mb-10 sm:mb-14 max-w-5xl mx-auto">
          <FeaturedPost post={featured} />
        </div>

        {/* Grid de 4 posts  */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => (
            <BlogCard key={p.id} post={{ ...p, image: blog1 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
