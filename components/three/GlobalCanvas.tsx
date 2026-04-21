'use client';

import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { View, Preload, PerformanceMonitor, Stats } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useStore } from '@/store/useStore';

function TickerSync() {
  const { advance } = useThree();
  
  useEffect(() => {
    const onTick = (time: number) => {
      advance(time);
    };
    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, [advance]);
  
  return null;
}

export default function GlobalCanvas() {
  const [dpr] = useState<number | [number, number]>(() => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: coarse)').matches) {
      return [1, 2];
    }
    return [1, 1.5];
  });
  
  const setPerfLevel = useStore((state) => state.setPerfLevel);
  const setReducedMotion = useStore((state) => state.setReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [setReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={dpr}
        frameloop="never"
        gl={{
          toneMapping: THREE.AgXToneMapping,
          toneMappingExposure: 1.0,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          const onLost = (e: Event) => e.preventDefault();
          gl.domElement.addEventListener('webglcontextlost', onLost, false);
        }}
      >
        <TickerSync />
        <Stats />
        <PerformanceMonitor 
          onIncline={() => setPerfLevel(3)} 
          onDecline={() => setPerfLevel(1)} 
          flipflops={3}
          onFallback={() => setPerfLevel(1)}
        />
        <View.Port />
        <Preload all />
      </Canvas>
    </div>
  );
}
