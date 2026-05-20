import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.offsetWidth, el.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    el.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      vertexShader: /* glsl */`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseStrength;

        float hash(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p *= 2.1;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          float r = length(uv);
          float t = uTime * 0.4;

          vec2 dir = uv / max(r, 0.001);

          // Mouse liquid distortion — push plasma away from cursor
          vec2 mDelta = uv - uMouse;
          float mDist = length(mDelta);
          float mInfluence = exp(-mDist * 2.2) * uMouseStrength;
          vec2 mPush = normalize(mDelta + 0.0001) * mInfluence * 0.22;

          // FBM-based boundary wobble
          float wobble = 0.045 * fbm(dir * 2.8 + vec2(t * 0.28,  t * 0.20))
                       + 0.022 * fbm(dir * 5.2 - vec2(t * 0.17,  t * 0.25));

          // Edge bulges toward cursor
          float edgePush = dot(dir, normalize(uMouse + 0.0001)) * 0.07 * uMouseStrength;
          float edge = 0.90 + wobble + edgePush;

          // Plasma sampled on displaced coords
          vec2 p1 = (uv + mPush) * 1.7 + vec2(t * 0.17,  t * 0.11);
          vec2 p2 = (uv + mPush * 0.6) * 2.4 - vec2(t * 0.10,  t * 0.14);
          float plasma = 0.6 * fbm(p1) + 0.4 * fbm(p2);

          // Palette: all entries are #2563EB scaled/tinted — no hue deviation
          vec3 deep   = vec3(0.008, 0.018, 0.10);   // near-black navy
          vec3 core   = vec3(0.040, 0.130, 0.52);   // dark brand blue
          vec3 bright = vec3(0.145, 0.388, 0.922);  // #2563EB
          vec3 bloom  = vec3(0.52,  0.68,  0.97);   // brand blue lightened toward white

          float radial = clamp(r / edge, 0.0, 1.0);

          // Clamp plasma mix so it never extrapolates past core
          vec3 color = mix(deep, core, clamp(plasma * 1.5, 0.0, 1.0));
          color = mix(color, bright, smoothstep(0.25, 0.80, radial));

          // Ring pulse — lerp instead of additive to prevent channel clipping
          float ring = smoothstep(0.68, 0.96, radial) * smoothstep(1.02, 0.88, radial);
          float pulse = 0.65 + 0.35 * sin(uTime * 1.6);
          color = mix(color, bloom, ring * pulse * 0.75);

          // Inner glow — lerp toward core
          float innerGlow = (1.0 - smoothstep(0.0, 0.5, radial)) * 0.28 * (0.75 + 0.25 * plasma);
          color = mix(color, core * 1.3, innerGlow);

          // Shimmer veins — lerp toward bright
          float vein = fbm(uv * 3.5 + vec2(t * 0.22, -t * 0.16));
          color = mix(color, bright, 0.10 * vein * (1.0 - smoothstep(0.0, 0.85, radial)));

          // Mouse glow — lerp toward bloom
          color = mix(color, bloom, mInfluence * 0.45 * (1.0 - smoothstep(0.0, 0.6, radial)));

          float alpha = smoothstep(1.38, edge - 0.04, r);

          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // Smooth mouse tracking
    const mouse = { x: 0, y: 0 };
    const lerpedMouse = { x: 0, y: 0 };
    let mouseTarget = 0;
    let mouseStrength = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseTarget = 1;
    };
    const onMouseLeave = () => { mouseTarget = 0; };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    let rafId: number;
    let visible = false;

    const tick = () => {
      // Lerp mouse for fluid feel
      lerpedMouse.x += (mouse.x - lerpedMouse.x) * 0.07;
      lerpedMouse.y += (mouse.y - lerpedMouse.y) * 0.07;
      mouseStrength += (mouseTarget - mouseStrength) * 0.05;

      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.set(lerpedMouse.x, lerpedMouse.y);
      uniforms.uMouseStrength.value = mouseStrength;

      renderer.render(scene, camera);
      if (visible) rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) { clock.start(); tick(); }
        else cancelAnimationFrame(rafId);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const onResize = () => renderer.setSize(el.offsetWidth, el.offsetHeight);
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
