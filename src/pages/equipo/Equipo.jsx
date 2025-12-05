import React from "react";
import TeamHelixCanvas from "../../components/TeamHelixCanvas";

const skills = [
    "Business Intelligence",
    "Inteligencia Artificial",
    "Análisis de Datos / Analytics",
    "Psicometría",
];

const team = [
    {
        name: "Mauricio Olivares Faúndez",
        role: "Gerente General",
        bio: "Doctor en derecho y administración de empresas, Ingeniero comercial e Ingeniero informático, con maestría en gestión mención contabilidad y finanzas. Docente de la Universidad Técnica Federico Santa María y Universidad Viña del Mar.",
    },
    {
        name: "Hernán Nuñez",
        role: "Especialista en Administración",
        bio: "Administrador público.",
    },
    {
        name: "Alexis La Cruz",
        role: "Especialista en Gestión de Talento",
        bio: "Psicólogo, especialista en análisis de datos en ciencias sociales y en el desarrollo de instrumentos psicométricos.",
    },
];

// helper
const initials = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join("");

function Stat({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-sm px-4 py-3 shadow-sm">
            <div className="text-2xl font-extrabold text-[#0A2F4F] leading-none">{value}</div>
            <div className="text-[#0A2F4F]/70 text-sm font-semibold">{label}</div>
        </div>
    );
}

function Pill({ children }) {
    return (
        <span className="inline-flex items-center rounded-full border border-[#0A2F4F]/20 bg-white/80 px-3 py-1.5 text-sm font-semibold text-[#0A2F4F] shadow-sm">
            {children}
        </span>
    );
}

function MemberCard({ person }) {
    return (
        <article className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/90 p-5 shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
            {/* Glow en hover */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,#00A3E0_0,transparent_55%),radial-gradient(circle_at_bottom,#005587_0,transparent_55%)] mix-blend-soft-light"
            />

            <div className="relative">
                {/* Badge Socio fundador */}
                <span className="inline-flex items-center rounded-full bg-[#005587]/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#005587]">
                    Socio fundador
                </span>

                {/* Cargo grande con degradado + subrayado animado */}
                <div className="mt-3 inline-block">
                    <h3 className="relative text-xl sm:text-2xl font-black leading-tight">
                        <span className="bg-gradient-to-r from-[#005587] via-[#00A3E0] to-[#00C0FF] bg-clip-text text-transparent">
                            {person.role}
                        </span>
                        {/* Línea que se anima en hover */}
                        <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#005587] via-[#00A3E0] to-[#00C0FF] transition-transform duration-300 group-hover:scale-x-100" />
                    </h3>
                </div>

                {/* Bio */}
                <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#0A2F4F]/90">
                    {person.bio}
                </p>
            </div>
        </article>
    );
}

export default function Equipo() {
    return (
        <section className="relative overflow-hidden bg-[#EFEEF5]">
            {/* Contenido */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                {/* Bandera superior */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0A2F4F]/20 bg-white/80 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-[#00A3E0]" />
                    <span className="text-xs font-bold tracking-wider text-[#0A2F4F]/80 uppercase">
                        Fundada en 2018
                    </span>
                </div>

                {/* Layout editorial: izquierda sticky, derecha con fondo animado detrás de cards */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Col izquierda */}
                    <aside className="lg:col-span-5">
                        <div className="lg:sticky lg:top-28">
                            <h1 className="text-4xl sm:text-5xl font-black leading-[1.05] text-[#0A2F4F]">
                                <span className="relative inline-block">
                                    <span className="absolute inset-0 -skew-y-1 bg-gradient-to-r from-[#005587]/15 to-[#00A3E0]/15 rounded-xl" />
                                    <span className="relative px-1">Personas + Datos</span>
                                </span>{" "}
                                para decisiones con impacto
                            </h1>

                            <p className="mt-5 text-lg text-[#0A2F4F]/90 leading-relaxed">
                                Somos Sistemgraf, inteligencia integrada para Recursos Humanos y procesos de negocio.
                                Impulsamos el éxito empresarial con soluciones estratégicas de{" "}
                                <strong className="font-extrabold">BI, IA, Analytics y Psicometría</strong>.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {skills.map((s) => (
                                    <Pill key={s}>{s}</Pill>
                                ))}
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                                <Stat label="Áreas clave" value="4" />
                                <Stat label="Equipo" value={team.length.toString()} />
                                <Stat label="Foco" value="RR.HH." />
                            </div>

                            <blockquote className="mt-8 rounded-2xl border border-[#0A2F4F]/15 bg-white/70 p-5 backdrop-blur-sm shadow-sm">
                                <p className="text-[#0A2F4F] text-base leading-relaxed">
                                    “Transformamos cómo las organizaciones comprenden su talento y toman decisiones
                                    estratégicas mediante datos y tecnología.”
                                </p>
                            </blockquote>
                        </div>
                    </aside>

                    {/* Col derecha: fondo animado atrás de las cards */}
                    <main className="lg:col-span-7">
                        <div className="relative">
                            {/* 1) Canvas como fondo */}
                            <TeamHelixCanvas className="absolute inset-0 z-0 pointer-events-none" />

                            {/* 2) Desvanecido para que no invada la izquierda */}
                            <div
                                aria-hidden
                                className="
                                    absolute inset-0 z-10 hidden lg:block
                                    bg-[linear-gradient(90deg,rgba(239,238,245,1)_0%,rgba(239,238,245,0.6)_12%,transparent_28%)]
                                "
                            />

                            {/* 3) Cards encima del canvas y del fade */}
                            <div className="relative z-20">
                                <h2 className="sr-only">Nuestro Equipo</h2>
                                <div className="grid gap-5 sm:grid-cols-2 [grid-auto-rows:1fr]">
                                    {team.map((p) => (
                                        <MemberCard key={p.name} person={p} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}
