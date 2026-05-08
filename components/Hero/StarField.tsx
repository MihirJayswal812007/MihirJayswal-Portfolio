"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * components/Hero/StarField.tsx — Mihir Jayswal Portfolio
 * 
 * Three-layer parallax starfield using Three.js BufferGeometry.
 * Layers scroll downwards and wrap around. Stars twinkle via time.
 * Spec: spec/02-hero.md
 */

export default function StarField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // ── Setup ───────────────────────────────────────────────
    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    // Use Orthographic camera for a flat 2D projection
    const camera = new THREE.OrthographicCamera(0, w, 0, h, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // ── Star Layers Configuration ───────────────────────────
    const layerConfigs = [
      { count: 80, speed: 0.12, size: 1.5, opacity: 0.3 }, // Slow
      { count: 60, speed: 0.25, size: 2.0, opacity: 0.5 }, // Medium
      { count: 30, speed: 0.50, size: 2.5, opacity: 0.8 }, // Fast
    ];

    const materials: THREE.ShaderMaterial[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const pointsObjects: THREE.Points[] = [];

    // Base color for stars — a slightly warm white/gold
    const starColor = new THREE.Color("#E8DFC0");

    layerConfigs.forEach((config) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(config.count * 3);
      const phases = new Float32Array(config.count); // For twinkling

      for (let i = 0; i < config.count; i++) {
        positions[i * 3 + 0] = Math.random() * w; // x
        positions[i * 3 + 1] = Math.random() * h; // y
        positions[i * 3 + 2] = 0;                 // z
        
        phases[i] = Math.random() * Math.PI * 2;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
      geometries.push(geometry);

      // We use a custom shader to handle the twinkling since PointsMaterial
      // applies the same opacity to all particles.
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: starColor },
          baseOpacity: { value: config.opacity },
          size: { value: config.size * renderer.getPixelRatio() }
        },
        vertexShader: `
          attribute float phase;
          varying float vPhase;
          uniform float size;
          void main() {
            vPhase = phase;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          uniform float baseOpacity;
          varying float vPhase;
          void main() {
            // Circle shape
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            float r = dot(cxy, cxy);
            if (r > 1.0) discard;
            
            // Twinkle: opacity = base × (0.5 + 0.5×sin(twinkle_timer))
            float twinkle = 0.5 + 0.5 * sin(time * 2.0 + vPhase);
            float alpha = baseOpacity * twinkle * (1.0 - r); // smooth edge
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      });

      materials.push(material);

      const points = new THREE.Points(geometry, material);
      pointsObjects.push(points);
      scene.add(points);
    });

    // ── Animation Loop ──────────────────────────────────────
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Update uniforms and positions
      pointsObjects.forEach((points, index) => {
        const material = points.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time;

        const positions = points.geometry.attributes.position.array as Float32Array;
        const speed = layerConfigs[index].speed;

        for (let i = 0; i < layerConfigs[index].count; i++) {
          // Move downwards
          positions[i * 3 + 1] -= speed;

          // Wrap around to top if it goes below screen
          if (positions[i * 3 + 1] < 0) {
            positions[i * 3 + 1] = h;
            positions[i * 3 + 0] = Math.random() * w; // random new X
          }
        }
        points.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // ── Resize Handler ──────────────────────────────────────
    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      
      camera.right = newW;
      camera.top = newH;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newW, newH);
      
      // Update sizes for device pixel ratio
      materials.forEach((mat, i) => {
        mat.uniforms.size.value = layerConfigs[i].size * renderer.getPixelRatio();
      });
    };

    window.addEventListener("resize", handleResize);

    // ── Cleanup ─────────────────────────────────────────────
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      currentMount?.removeChild(renderer.domElement);
      
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
