import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TeamHelixCanvas({
  className = "",
  particleCountPerSpiral = 600,
  radius = 5.2,       // ← más ancho
  height = 18,        // ← un poco más alto para proporción
  turns = 8.5,        // ← más vueltas, sensación de “profundidad”
  speed = 0.0006,     // ← más lento
}) {
  const canvasRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    // Scene
    const scene = new THREE.Scene();
    // Fog suave para profundidad
    scene.fog = new THREE.Fog(new THREE.Color("#e6eef5"), 20, 60);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 22);

    const setSize = () => {
      const { clientWidth, clientHeight } = mountRef.current;
      renderer.setSize(clientWidth, clientHeight, false);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    // Partículas: doble hélice
    const total = particleCountPerSpiral * 2;
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);

    const colorA = new THREE.Color("#005587");
    const colorB = new THREE.Color("#00A3E0");

    for (let i = 0; i < particleCountPerSpiral; i++) {
      const t = i / (particleCountPerSpiral - 1); // 0..1
      const angle = t * turns * Math.PI * 2;

      // Spiral 1
      {
        const x = Math.cos(angle) * radius;
        const y = (t - 0.5) * height;
        const z = Math.sin(angle) * radius;

        const idx = i * 3;
        positions[idx + 0] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        const c = colorA.clone().lerp(colorB, t);
        colors[idx + 0] = c.r;
        colors[idx + 1] = c.g;
        colors[idx + 2] = c.b;
      }

      // Spiral 2 (opuesta)
      {
        const j = i + particleCountPerSpiral;
        const angle2 = angle + Math.PI;
        const x = Math.cos(angle2) * radius;
        const y = (t - 0.5) * height;
        const z = Math.sin(angle2) * radius;

        const idx = j * 3;
        positions[idx + 0] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;

        const c = colorB.clone().lerp(colorA, t);
        colors[idx + 0] = c.r;
        colors[idx + 1] = c.g;
        colors[idx + 2] = c.b;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Núcleo
    const coreMat = new THREE.PointsMaterial({
      size: 0.08,           // un pelín más grande
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const corePoints = new THREE.Points(geometry, coreMat);
    scene.add(corePoints);

    // “Glow” suave (duplicado con additive)
    const glowMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glowPoints = new THREE.Points(geometry.clone(), glowMat);
    scene.add(glowPoints);

    // Puentes entre hélices
    const barCount = 140;
    const barGeom = new THREE.BufferGeometry();
    const barPositions = new Float32Array(barCount * 2 * 3);
    for (let k = 0; k < barCount; k++) {
      const t = k / (barCount - 1);
      const angle = t * turns * Math.PI * 2;

      const x1 = Math.cos(angle) * radius;
      const y1 = (t - 0.5) * height;
      const z1 = Math.sin(angle) * radius;

      const angle2 = angle + Math.PI;
      const x2 = Math.cos(angle2) * radius;
      const y2 = y1;
      const z2 = Math.sin(angle2) * radius;

      const idx = k * 2 * 3;
      barPositions[idx + 0] = x1; barPositions[idx + 1] = y1; barPositions[idx + 2] = z1;
      barPositions[idx + 3] = x2; barPositions[idx + 4] = y2; barPositions[idx + 5] = z2;
    }
    barGeom.setAttribute("position", new THREE.BufferAttribute(barPositions, 3));
    const barMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#6EC1FF"),
      transparent: true,
      opacity: 0.18, // un poco más sutil
    });
    const bars = new THREE.LineSegments(barGeom, barMat);
    scene.add(bars);

    // Parallax más tranquilo
    const mouse = new THREE.Vector2(0, 0);
    const onPointerMove = (e) => {
      const rect = mountRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouse.set((x - 0.5) * 2, (y - 0.5) * 2);
    };
    window.addEventListener("pointermove", onPointerMove);

    // Luces suaves
    const l1 = new THREE.PointLight("#69B6FF", 0.55, 70);
    l1.position.set(10, 8, 12);
    scene.add(l1);
    const l2 = new THREE.PointLight("#1D4ED8", 0.35, 70);
    l2.position.set(-10, -8, -12);
    scene.add(l2);
    const amb = new THREE.AmbientLight("#ffffff", 0.25);
    scene.add(amb);

    // Animación
    let rafId;
    let t = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const rotSpeed = prefersReduced ? speed * 0.4 : speed; // aún más lento si reduce motion
      t += rotSpeed * 60;

      corePoints.rotation.y = t;
      glowPoints.rotation.y = t;        // el glow acompaña
      bars.rotation.y = -t * 0.65;      // contra-rotación más lenta

      // parallax muy suave
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    // Init
    const onResize = () => setSize();
    setSize();
    window.addEventListener("resize", onResize);
    if (!prefersReduced) animate();
    else renderer.render(scene, camera);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(rafId);
      geometry.dispose();
      barGeom.dispose();
      coreMat.dispose();
      glowMat.dispose();
      barMat.dispose();
      renderer.dispose();
    };
  }, [particleCountPerSpiral, radius, height, turns, speed]);

  return (
    <div ref={mountRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
