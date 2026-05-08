import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, Grid } from '@react-three/drei'
import * as THREE from 'three'

const vertex = /* glsl */`
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vView;
  varying vec3 vViewNormal;
  varying vec3 wPos;

  void main() {
    vViewNormal = normalize((modelViewMatrix * vec4(normal, 0.0)).xyz);
    wPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vec4 transformed = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-transformed.xyz);
    vUv = uv;
    vNormal = normal;
    vPosition = position;
    gl_Position = projectionMatrix * transformed;
  }
`

const fragment = /* glsl */`
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vView;
  uniform sampler2D uMatcap;
  uniform float uTime;
  uniform float uProgress;
  varying vec3 wPos;
  varying vec3 vViewNormal;

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float cnoise(vec3 P){
    vec3 Pi0=floor(P);vec3 Pi1=Pi0+vec3(1.0);
    Pi0=mod(Pi0,289.0);Pi1=mod(Pi1,289.0);
    vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.0);
    vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);
    vec4 iy=vec4(Pi0.yy,Pi1.yy);
    vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;
    vec4 ixy=permute(permute(ix)+iy);
    vec4 ixy0=permute(ixy+iz0);vec4 ixy1=permute(ixy+iz1);
    vec4 gx0=ixy0/7.0;vec4 gy0=fract(floor(gx0)/7.0)-0.5;
    gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);
    vec4 sz0=step(gz0,vec4(0.0));
    gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);
    vec4 gx1=ixy1/7.0;vec4 gy1=fract(floor(gx1)/7.0)-0.5;
    gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);
    vec4 sz1=step(gz1,vec4(0.0));
    gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);
    vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
    g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;
    vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
    g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;
    float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));
    float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));
    float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
    float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);
    vec3 fade_xyz=fade(Pf0);
    vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
    vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);
    return 2.2*mix(n_yz.x,n_yz.y,fade_xyz.x);
  }

  void main() {
    vec3 a=vec3(0.5,0.5,0.5);
    vec3 b=vec3(0.5,0.5,0.5);
    vec3 c=vec3(1.0,1.0,1.0);
    vec3 d=vec3(0.00,0.33,0.67);

    vec3 viewDir=normalize(cameraPosition-wPos);
    vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));
    vec3 y=cross(viewDir,x);
    vec2 uv=vec2(dot(x,vViewNormal),dot(y,vViewNormal))*0.495+0.5;
    vec4 matcapColor=texture2D(uMatcap,uv);

    float diff=abs(dot(vViewNormal,normalize(vec3(1.0,1.0,0.0))))+abs(dot(vViewNormal,normalize(vec3(1.0,-1.0,0.0))));
    diff*=0.5;

    float noise=0.5*(cnoise(vPosition)+1.0)+uProgress-vPosition.y*0.08;
    float stepped=smoothstep(0.1,0.09,noise);
    vec3 animateColor=a+b*cos(2.0*3.1415*(c*diff+d+uTime/3.0));

    gl_FragColor=mix(matcapColor,vec4(animateColor,1.0),stepped);
  }
`

function createMatcap(): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Base: deep navy
  ctx.fillStyle = '#040d1f'
  ctx.fillRect(0, 0, size, size)

  // Top-left highlight
  const highlight = ctx.createRadialGradient(size * 0.3, size * 0.3, 0, size * 0.5, size * 0.5, size * 0.55)
  highlight.addColorStop(0, 'rgba(100,160,255,0.95)')
  highlight.addColorStop(0.3, 'rgba(40,90,200,0.7)')
  highlight.addColorStop(0.7, 'rgba(10,30,90,0.2)')
  highlight.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = highlight
  ctx.fillRect(0, 0, size, size)

  // Subtle cyan rim (brand accent)
  const rim = ctx.createRadialGradient(size * 0.68, size * 0.68, size * 0.25, size * 0.68, size * 0.68, size * 0.65)
  rim.addColorStop(0, 'rgba(0,0,0,0)')
  rim.addColorStop(1, 'rgba(135,255,251,0.18)')
  ctx.fillStyle = rim
  ctx.fillRect(0, 0, size, size)

  return new THREE.CanvasTexture(canvas)
}

function Pyramid({ scrollProgress }: { scrollProgress: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const matcap = useMemo(() => createMatcap(), [])
  const geometry = useMemo(() => new THREE.CylinderGeometry(0, 4, 5, 4, 1), [])

  const material = useMemo(() => new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uMatcap: { value: matcap },
      uProgress: { value: 0 },
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
  }), [matcap])

  useFrame((state, delta) => {
    const t = scrollProgress.current
    material.uniforms.uProgress.value = -t
    material.uniforms.uTime.value += delta
    meshRef.current.rotation.y = t * Math.PI
    state.camera.position.set(0, 3, 10 - t * 4)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0.8, 0]} scale={0.5}>
      <Edges linewidth={1.5} scale={1} threshold={15} color="white" />
    </mesh>
  )
}

function InvalidateController({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const { invalidate } = useThree()

  useEffect(() => {
    let rafId: number
    let visible = false

    const tick = () => {
      if (visible) {
        invalidate()
        rafId = requestAnimationFrame(tick)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) tick()
        else cancelAnimationFrame(rafId)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [invalidate, sectionRef])

  return null
}

function Scene({ scrollProgress, sectionRef }: { scrollProgress: React.RefObject<number>, sectionRef: React.RefObject<HTMLElement | null> }) {
  return (
    <>
      <InvalidateController sectionRef={sectionRef} />
      <Pyramid scrollProgress={scrollProgress} />
      <Grid
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#1a1a2e"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#2a2a4a"
        fadeDistance={18}
        fadeStrength={1.5}
        infiniteGrid
        position={[0, -0.01, 0]}
      />
    </>
  )
}

export function FunnelSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollProgress = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const total = window.innerHeight + rect.height
      scrollProgress.current = Math.max(0, Math.min(1, 1 - rect.bottom / total))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[85vh] border-t border-white/5">
      <Canvas frameloop="demand" camera={{ position: [0, 3, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} sectionRef={sectionRef} />
        </Suspense>
      </Canvas>



      {/* Overlay: bottom headline */}
      <div className="absolute bottom-0 inset-x-0 pb-16 flex flex-col items-center pointer-events-none">
        <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter uppercase text-center leading-none">
          Find The Gold.<br /><span className="text-gradient-animate">Scale The Signal.</span>
        </h2>

      </div>
    </section>
  )
}
