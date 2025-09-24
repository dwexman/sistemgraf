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
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Partículas azules
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const colorStart = new THREE.Color("#003E65");
    const colorEnd   = new THREE.Color("#005587");

    for (let i = 0; i < particlesCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 10;
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3, t = Math.random();
      const c = colorStart.clone().lerp(colorEnd, t);
      colorArray[i3] = c.r; colorArray[i3+1] = c.g; colorArray[i3+2] = c.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 5;

    const clock = new THREE.Clock();
    let rafId;
    const tick = () => {
      const t = clock.getElapsedTime();
      particlesMesh.rotation.y = t * 0.05;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3, x = particlesGeometry.attributes.position.array[i3];
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(t + x) * 0.2;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <section id="contacto" className="bg-[#EFEEF5] py-16 sm:py-20 flex items-center justify-center min-h-screen relative">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

      <style>{`
        :root { --dash-len: 140; --stroke-w: 4; --halo-blur: 5; --loop-s: 4s; }
        @keyframes dashmove { to { stroke-dashoffset: -1000; } }

        .glow-svg { pointer-events: none; z-index: 2; }
        .glow-svg rect { vector-effect: non-scaling-stroke; }
        .perimeter-moving {
          stroke: url(#glowGrad); stroke-width: var(--stroke-w); fill: none; stroke-linecap: round;
          stroke-dasharray: var(--dash-len) calc(1000 - var(--dash-len));
          animation: dashmove var(--loop-s) linear infinite; filter: url(#softGlow); opacity: 0.9;
        }
        .perimeter-base { stroke: rgba(255,255,255,0.25); stroke-width: 1.5; fill: none; }

        /* ===== Subrayado degradé animado (debajo del texto, una sola línea que cubre todo el bloque) ===== */
        @keyframes underlineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes shimmerSweep {
          0% { transform: translateX(-120%); opacity: 0; }
          30% { opacity: 0.7; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        .underline-wrap {
          position: relative;
          display: inline-block;
          padding: 0 .08em .26em;
          white-space: normal;     /* ← permite varias líneas */
        }
        .u-text { position: relative; z-index: 2; } /* texto por encima */
        .underline-bar {
          position: absolute; left: 0; right: 0; bottom: 0;
          height: .16em;
          border-radius: .22em;
          background: linear-gradient(90deg,#00A3E0 0%, #69A9D1 50%, #005587 100%);
          transform-origin: 0 50%; transform: scaleX(0);
          animation: underlineGrow 900ms cubic-bezier(.2,.9,.2,1) 120ms forwards;
          opacity: .95; z-index: 0;
        }
        .underline-shimmer {
          position: absolute; left: 0; right: 0; bottom: 0; height: .16em;
          border-radius: .22em; overflow: hidden; pointer-events: none; z-index: 1;
        }
        .underline-shimmer::after {
          content: ""; position: absolute; top: 0; bottom: 0; left: 0; width: 24%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.85) 50%, rgba(255,255,255,0) 100%);
          filter: blur(6px); animation: shimmerSweep 1.8s ease-in-out 400ms infinite;
        }

        /* Flotación sutil del bloque de texto */
        @keyframes floaty { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-2px); } }
        .floaty { animation: floaty 4s ease-in-out infinite; }
      `}</style>

      <div className="w-full relative z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 text-center floaty">
          <h3 className="text-[#0A2F4F] font-extrabold leading-tight text-[24px] sm:text-[30px] md:text-[36px]">
            ¿Listo para <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#005587] to-[#00A3E0]">potenciar</span> el futuro de tu empresa?
          </h3>

          {/* ← Texto en 3 líneas fijas */}
          <p className="mt-3 sm:mt-4 text-[#0A2F4F] font-semibold leading-snug text-[18px] sm:text-[20px] md:text-[22px]">
            <span className="underline-wrap">
              <span className="u-text">
                <span className="block">Elige la modalidad que más se ajusta</span>
                <span className="block">a tu estrategia y comienza a</span>
                <span className="block">transformar tu capital humano.</span>
              </span>
              <span className="underline-bar"></span>
              <span className="underline-shimmer"></span>
            </span>
          </p>
        </div>

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
            {/* SVG del brillo perimetral */}
            <svg className="glow-svg absolute inset-0" width="100%" height="100%" aria-hidden="true">
              <defs>
                <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00A3E0" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#00A3E0" />
                </linearGradient>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="var(--halo-blur)" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <rect className="perimeter-base" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="22" ry="22" />
              <rect className="perimeter-moving" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="22" ry="22" pathLength="1000" />
            </svg>

            <h2 className="text-center text-white tracking-[0.14em] font-extrabold text-2xl sm:text-3xl mb-8">
              CONTÁCTANOS
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">Nombre</label>
                <input
                  id="name" name="name" type="text" required placeholder="Nombre"
                  className="w-full rounded-[16px] px-5 py-4 bg-transparent text-white placeholder-white/80
                             border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                             outline-none transition-all duration-300 focus:bg-white/10 focus:ring-2 focus:ring-white/80"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email" name="email" type="email" required placeholder="Email"
                  className="w-full rounded-[16px] px-5 py-4 bg-transparent text-white placeholder-white/80
                             border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                             outline-none transition-all duration-300 focus:bg-white/10 focus:ring-2 focus:ring-white/80"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Mensaje</label>
                <textarea
                  id="message" name="message" rows={4} required placeholder="Mensaje"
                  className="w-full rounded-[16px] px-5 py-4 bg-transparent text-white placeholder-white/80
                             border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.25)]
                             outline-none transition-all duration-300 focus:bg-white/10 focus:ring-2 focus:ring-white/80
                             resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit" disabled={sending}
                  className="w-full h-[58px] rounded-[16px] bg-white text-[20px] font-extrabold tracking-wide text-[#003E65]
                             shadow-[0_12px_28px_rgba(0,0,0,0.25)] disabled:opacity-70 disabled:cursor-not-allowed
                             relative overflow-hidden transition-all duration-300 hover:bg-gray-100"
                >
                  {sending ? "Enviando…" : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
