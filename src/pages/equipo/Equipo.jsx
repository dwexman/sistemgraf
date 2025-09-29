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
    { name: "Hernán Nuñez", role: "Especialista en Administración", bio: "Administrador público." },
    {
        name: "Alexis La Cruz",
        role: "Especialista en Gestión de Talento",
        bio: "Psicólogo, especialista en análisis de datos en ciencias sociales y en el desarrollo de instrumentos psicométricos.",
    },
    {
        name: "Paula Marti",
        role: "Especialista en Desarrollo de Sistemas",
        bio: "Ingeniero de ejecución informática con experiencia en el área de operaciones, administración, desarrollo de sistemas y gestión de la información.",
    },
    {
        name: "Ferndols Alvarado",
        role: "Jefe de Proyectos TI",
        bio: "Contador auditor con maestría en tecnologías de la información.",
    },
    {
        name: "Jaime Olivares",
        role: "Soporte TI",
        bio: "Ingeniero en electricidad e Ingeniero civil industrial.",
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
        <article className="group relative rounded-2xl border border-white/30 bg-white/85 backdrop-blur-sm p-5 shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(0,0,0,0.12)]">
            <div className="flex items-start gap-4">
                <div
                    className="
            grid place-items-center shrink-0 w-16 h-16 rounded-2xl text-white text-xl font-extrabold
            bg-[linear-gradient(135deg,#005587,#00A3E0)]
            shadow-[0_8px_18px_rgba(0,0,0,0.2)]
          "
                >
                    {initials(person.name)}
                </div>
                <div>
                    <h3 className="text-[#0A2F4F] font-extrabold text-lg leading-tight">{person.name}</h3>
                    <p className="mt-0.5 text-[#0A2F4F]/80 font-semibold">{person.role}</p>
                </div>
            </div>
            <p className="mt-3 text-[#0A2F4F]/90 leading-relaxed">{person.bio}</p>
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
                            {/* 1) Canvas como fondo (sin -z), siempre visible (sin xs:) */}
                            <TeamHelixCanvas
                                className="absolute inset-0 z-0 pointer-events-none"
                            />

                            {/* 2) (Opcional) Desvanecido para que no invada la izquierda */}
                            <div
                                aria-hidden
                                className="
        absolute inset-0 z-10 hidden lg:block
        bg-[linear-gradient(90deg,rgba(239,238,245,1)_0%,rgba(239,238,245,0.6)_12%,transparent_28%)]
      "
                            />

                            {/* 3) Cards ENCIMA del canvas y del fade */}
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
