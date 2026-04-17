'use client';

import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useStore } from '@/store/useStore';

interface SceneProps {
  children: React.ReactNode;
  cameraPos?: [number, number, number];
  shadows?: boolean;
}

// Internal component to handle ticker sync
function TickerSync() {
  const { advance } = useThree();
  
  useEffect(() => {
    // Sync R3F with GSAP ticker
    const onTick = (time: number) => {
      advance(time);
    };
    
    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, [advance]);
  
  return null;
}

// Notifier when 3D is ready
function SceneMountNotifier() {
  const setWebGLReady = useStore((state) => state.setWebGLReady);
  
  useEffect(() => {
    // Small delay to ensure everything is actually rendered
    const timer = setTimeout(() => setWebGLReady(true), 100);
    return () => {
      clearTimeout(timer);
      setWebGLReady(false);
    };
  }, [setWebGLReady]);
  
  return null;
}

export default function Scene({ children, cameraPos = [0, 0, 5], shadows = true }: SceneProps) {
  const [dpr, setDpr] = useState(1.5);
  const setPerfLevel = useStore((state) => state.setPerfLevel);
  const isReducedMotion = useStore((state) => state.isReducedMotion);
  const setReducedMotion = useStore((state) => state.setReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [setReducedMotion]);

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden transition-opacity duration-1000">
      <Canvas
        shadows={shadows}
        dpr={dpr}
        frameloop="never" // Essential for ticker sync
        gl={{ 
          toneMapping: THREE.AgXToneMapping, 
          toneMappingExposure: 1.0,
          antialias: true,
          alpha: true
        }}
        camera={{ position: cameraPos, fov: 45 }}
        className="h-full w-full"
      >
        <TickerSync />
        <SceneMountNotifier />
        
        <PerformanceMonitor 
          onIncline={() => { setDpr(2); setPerfLevel(3); }} 
          onDecline={() => { setDpr(1); setPerfLevel(1); }} 
        />
        
        {/* High-Key Global Illumination */}
        <Environment preset="studio" environmentIntensity={0.8} />
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        <Suspense fallback={null}>
          {children}
        </Suspense>

        {/* Soft Studio Ground Shadows - simplified for reduced motion/low perf */}
        {shadows && !isReducedMotion && (
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.3} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        )}
      </Canvas>
    </div>
  );
}
