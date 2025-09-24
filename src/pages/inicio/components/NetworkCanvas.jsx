import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NetworkCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -1, 1);

    let w = el.clientWidth, h = el.clientHeight;

    const resize = () => {
      w = el.clientWidth; h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.left = -w / 2; camera.right = w / 2;
      camera.top = h / 2; camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
    };
    resize();
    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize);

    // Ajustes para llenar mejor la esquina sup. izquierda en mobile
    const COUNT = prefersReduced ? 0 : (isMobile ? 70 : 110);
    const maxDist = isMobile ? 100 : 160;
    const speedScale = isMobile ? 0.24 : 0.3;
    const POINT_COLOR = 0x005587;
    const LINE_COLOR  = 0x005587;

    let points, lines, ptsGeo, lineGeo, ptsMat, lineMat, positions, vel, linesPos;

    if (COUNT > 0) {
      positions = new Float32Array(COUNT * 3);
      vel = new Float32Array(COUNT * 2);
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * w;
        positions[i * 3 + 1] = (Math.random() - 0.5) * h;
        positions[i * 3 + 2] = 0;
        vel[i * 2]     = (Math.random() - 0.5) * speedScale;
        vel[i * 2 + 1] = (Math.random() - 0.5) * speedScale;
      }

      ptsGeo = new THREE.BufferGeometry();
      ptsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      ptsMat = new THREE.PointsMaterial({
        color: POINT_COLOR,
        size: isMobile ? 2 : 3,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.8,
      });
      points = new THREE.Points(ptsGeo, ptsMat);
      scene.add(points);

      linesPos = new Float32Array(COUNT * COUNT * 6);
      lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linesPos, 3));
      lineGeo.setDrawRange(0, 0);
      lineMat = new THREE.LineBasicMaterial({
        color: LINE_COLOR,
        transparent: true,
        opacity: isMobile ? 0.2 : 0.25,
      });
      lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);
    }

    let raf;
    const animate = () => {
      if (COUNT > 0) {
        for (let i = 0; i < COUNT; i++) {
          positions[i * 3]     += vel[i * 2];
          positions[i * 3 + 1] += vel[i * 2 + 1];
          if (positions[i * 3] < -w / 2 || positions[i * 3] >  w / 2) vel[i * 2]     *= -1;
          if (positions[i * 3 + 1] < -h / 2 || positions[i * 3 + 1] >  h / 2) vel[i * 2 + 1] *= -1;
        }
        ptsGeo.attributes.position.needsUpdate = true;

        let ptr = 0;
        for (let i = 0; i < COUNT; i++) {
          const xi = positions[i * 3], yi = positions[i * 3 + 1];
          for (let j = i + 1; j < COUNT; j++) {
            const xj = positions[j * 3], yj = positions[j * 3 + 1];
            const dx = xi - xj, dy = yi - yj;
            const d2 = dx * dx + dy * dy; // distancia al cuadrado (perf)
            if (d2 < maxDist * maxDist) {
              linesPos[ptr++] = xi; linesPos[ptr++] = yi; linesPos[ptr++] = 0;
              linesPos[ptr++] = xj; linesPos[ptr++] = yj; linesPos[ptr++] = 0;
            }
          }
        }
        lineGeo.setDrawRange(0, ptr / 3);
        lineGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (ptsGeo) ptsGeo.dispose();
      if (lineGeo) lineGeo.dispose();
      if (ptsMat) ptsMat.dispose();
      if (lineMat) lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Z-index responsivo + escala mayor SOLO en mobile
  return (
    <div
      ref={containerRef}
      className="
        absolute inset-0 pointer-events-none
        z-[15] md:z-[1]
        scale-110 md:scale-100 origin-top-left
      "
    />
  );
}
