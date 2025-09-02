import { useState, useEffect, useRef } from "react";
import * as THREE from 'three';

export default function Contacto() {
  const [sending, setSending] = useState(false);
  const canvasRef = useRef(null);
  const mountRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => setSending(false), 1200);
  };

  useEffect(() => {
    // Configuración de Three.js
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ===== Crear partículas (mismo efecto, nuevos colores azules) =====
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;

    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    // Paleta alineada al form
    const colorStart = new THREE.Color("#003E65");
    const colorEnd   = new THREE.Color("#005587");

    // Posiciones aleatorias
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    // Colores: degradé entre #003E65 y #005587
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const t = Math.random(); // 0..1
      const c = colorStart.clone().lerp(colorEnd, t);
      colorArray[i3]     = c.r;
      colorArray[i3 + 1] = c.g;
      colorArray[i3 + 2] = c.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Material de partículas (sin cambios)
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    // Sistema de partículas
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Animación
    const clock = new THREE.Clock();
    let rafId;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotación suave (igual que antes)
      particlesMesh.rotation.y = elapsedTime * 0.05;

      // Ondulación vertical en función de X (igual que antes)
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = particlesGeometry.attributes.position.array[i3];
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x) * 0.2;
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      // Render
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    tick();

    // Redimensionado
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <section id="contacto" className="bg-[#EFEEF5] py-16 sm:py-20 flex items-center justify-center min-h-screen relative">
      {/* Canvas para Three.js */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <style>{`
        /* ====== BRILLO PERIMETRAL (recorre el borde) ====== */
        :root {
          --dash-len: 140;     /* largo del destello (mayor = trazo más largo) */
          --stroke-w: 4;       /* grosor del brillo */
          --halo-blur: 5;      /* intensidad del halo */
          --loop-s: 4s;        /* velocidad de la vuelta completa */
        }

        @keyframes dashmove {
          to { stroke-dashoffset: -1000; } /* recorre los 1000 "unidades" del pathLength */
        }

        .glow-svg { pointer-events: none; z-index: 2; }
        .glow-svg rect {
          vector-effect: non-scaling-stroke; /* mantiene el grosor en px aunque el SVG escale */
        }

        /* trazo que se mueve por el borde */
        .perimeter-moving {
          stroke: url(#glowGrad);
          stroke-width: var(--stroke-w);
          fill: none;
          stroke-linecap: round;
          stroke-dasharray: var(--dash-len) calc(1000 - var(--dash-len));
          animation: dashmove var(--loop-s) linear infinite;
          filter: url(#softGlow);
          opacity: 0.9;
        }

        /* suave guía estática debajo (opcional, da "carril" tenue) */
        .perimeter-base {
          stroke: rgba(255,255,255,0.25);
          stroke-width: 1.5;
          fill: none;
        }
      `}</style>

      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 flex justify-center items-center relative" style={{ zIndex: 2 }}>
        <div
          className="
            relative overflow-hidden
            mx-auto w-full max-w-md rounded-[22px] p-6 sm:p-8
            bg-[linear-gradient(180deg,#003E65_0%,#005587_100%)]
            shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            transform transition-all duration-500
          "
          style={{ maxWidth: '575px', minHeight: '580px' }}
          ref={mountRef}
        >
          {/* ====== SVG del brillo perimetral ====== */}
          <svg className="glow-svg absolute inset-0" width="100%" height="100%" aria-hidden="true">
            <defs>
              {/* gradiente del brillo */}
              <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00A3E0" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#00A3E0" />
              </linearGradient>

              {/* halo suave alrededor del trazo */}
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="var(--halo-blur)" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* guía tenue */}
            <rect
              className="perimeter-base"
              x="1" y="1"
              width="calc(100% - 2px)" height="calc(100% - 2px)"
              rx="22" ry="22"
            />

            {/* destello que recorre el borde */}
            <rect
              className="perimeter-moving"
              x="1" y="1"
              width="calc(100% - 2px)" height="calc(100% - 2px)"
              rx="22" ry="22"
              pathLength="1000"
            />
          </svg>

          <h2 className="text-center text-white tracking-[0.14em] font-extrabold text-2xl sm:text-3xl mb-8">
            CONTÁCTANOS
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="sr-only">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Nombre"
                className="
                  w-full rounded-[16px] px-5 py-4
                  bg-transparent text-white placeholder-white/80
                  border border-white/80
                  shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                  outline-none transition-all duration-300
                  focus:bg-white/10 focus:ring-2 focus:ring-white/80
                "
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="
                  w-full rounded-[16px] px-5 py-4
                  bg-transparent text-white placeholder-white/80
                  border border-white/80
                  shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                  outline-none transition-all duration-300
                  focus:bg-white/10 focus:ring-2 focus:ring-white/80
                "
              />
            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="message" className="sr-only">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Mensaje"
                className="
                  w-full rounded-[16px] px-5 py-4
                  bg-transparent text-white placeholder-white/80
                  border border-white/80
                  shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                  outline-none transition-all duration-300
                  focus:bg-white/10 focus:ring-2 focus:ring-white/80
                  resize-none
                "
              />
            </div>

            {/* Botón */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={sending}
                className="
                  w-full h-[58px]
                  rounded-[16px] bg-white
                  text-[20px] font-extrabold tracking-wide
                  text-[#003E65]
                  shadow-[0_12px_28px_rgba(0,0,0,0.25)]
                  disabled:opacity-70 disabled:cursor-not-allowed
                  relative overflow-hidden
                  transition-all duration-300
                  hover:bg-gray-100
                "
              >
                {sending ? "Enviando…" : "Enviar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
