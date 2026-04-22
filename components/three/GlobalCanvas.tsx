'use client';

import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { View, Preload, PerformanceMonitor, Stats } from '@react-three/drei';
import { useEffect, useState, useMemo } from 'react';
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
  const [dpr, setDpr] = useState<number | [number, number]>(1);
  const setPerfLevel = useStore((state) => state.setPerfLevel);
  const setReducedMotion = useStore((state) => state.setReducedMotion);

  useEffect(() => {
    // Client-side only DPR initialization to avoid hydration mismatch
    const initialDpr = !window.matchMedia('(pointer: coarse)').matches ? [1, 2] : [1, 1.5];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDpr(initialDpr as [number, number]);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [setReducedMotion]);

  // Handle THREE.Clock -> THREE.Timer if available in r184+
  const clock = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const T = THREE as any;
    return T.Timer ? new T.Timer() : new THREE.Clock();
  }, []);

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
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        onCreated={({ gl, set }) => {
          const onLost = (e: Event) => e.preventDefault();
          gl.domElement.addEventListener('webglcontextlost', onLost, false);
          // Set custom clock
          set({ clock });
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
