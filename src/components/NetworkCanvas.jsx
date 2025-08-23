import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NetworkCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    window.addEventListener("resize", resize);

    // --- parámetros más visibles ---
    const COUNT = 110;        // antes 90
    const maxDist = 160;      // antes 140
    const POINT_COLOR = 0x005587;
    const LINE_COLOR  = 0x005587;

    // puntos
    const positions = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 2);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * w;
      positions[i * 3 + 1] = (Math.random() - 0.5) * h;
      positions[i * 3 + 2] = 0;
      vel[i * 2]     = (Math.random() - 0.5) * 0.3;
      vel[i * 2 + 1] = (Math.random() - 0.5) * 0.3;
    }
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const ptsMat = new THREE.PointsMaterial({
      color: POINT_COLOR,
      size: 3,                // antes 2
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.8,           // antes 0.65
    });
    const points = new THREE.Points(ptsGeo, ptsMat);
    scene.add(points);

    // líneas
    const linesPos = new Float32Array(COUNT * COUNT * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linesPos, 3));
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({
      color: LINE_COLOR,
      transparent: true,
      opacity: 0.25,          // antes 0.15
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    let raf;
    const animate = () => {
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
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            linesPos[ptr++] = xi; linesPos[ptr++] = yi; linesPos[ptr++] = 0;
            linesPos[ptr++] = xj; linesPos[ptr++] = yj; linesPos[ptr++] = 0;
          }
        }
      }
      lineGeo.setDrawRange(0, ptr / 3);
      lineGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ptsGeo.dispose(); lineGeo.dispose(); ptsMat.dispose(); lineMat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  // z-0 (no negativo) para que no quede debajo del fondo del section
  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
