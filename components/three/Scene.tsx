'use client';

import { View, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { useStore } from '@/store/useStore';

interface SceneProps {
  children: React.ReactNode;
  cameraPos?: [number, number, number];
  shadows?: boolean;
}

// Notifier when 3D is ready
function SceneMountNotifier() {
  const setWebGLReady = useStore((state) => state.setWebGLReady);

  useEffect(() => {
    // Small delay to ensure everything is actually rendered
    const timer = setTimeout(() => setWebGLReady(true), 100);
    return () => clearTimeout(timer);
  }, [setWebGLReady]);

  return null;
}

export default function Scene({ children, cameraPos = [0, 0, 5], shadows = true }: SceneProps) {
  const container = useRef<HTMLDivElement>(null!);
  const isReducedMotion = useStore((state) => state.isReducedMotion);

  return (
    <div ref={container} className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden">
      <View track={container} className="h-full w-full">
        <SceneMountNotifier />
        
        <PerspectiveCamera makeDefault position={cameraPos} fov={45} />
        
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
      </View>
    </div>
  );
}
