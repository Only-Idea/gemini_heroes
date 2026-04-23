'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function HeroOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const shellMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const perfLevel = useStore((s) => s.perfLevel);
  const heroScrollProgress = useStore((s) => s.heroScrollProgress);
  const isReducedMotion = useStore((s) => s.isReducedMotion);
  const segments = perfLevel === 1 ? 32 : 64;

  useFrame((state) => {
    // Mouse parallax on the inner sphere
    if (meshRef.current) {
      const targetX = state.mouse.x * 0.5;
      const targetY = state.mouse.y * 0.5;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.05);
    }

    // Scroll dissolve: scale 1.0 → 0.85, fade shell slightly
    if (groupRef.current) {
      const scale = 1 - 0.15 * heroScrollProgress;
      groupRef.current.scale.setScalar(scale);
    }
    if (shellMatRef.current) {
      shellMatRef.current.opacity = 0.05 * (1 - heroScrollProgress);
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={isReducedMotion ? 0 : 2}
        rotationIntensity={isReducedMotion ? 0 : 0.5}
        floatIntensity={isReducedMotion ? 0 : 1}
      >
        <Sphere ref={meshRef} args={[1.5, segments, segments]}>
          <MeshDistortMaterial
            color="#F7F4F0"
            speed={2}
            distort={0.2}
            roughness={0.1}
            metalness={0.05}
            transmission={1.0}
            thickness={1.5}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>

        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <icosahedronGeometry args={[2.2, 1]} />
          <meshBasicMaterial
            ref={shellMatRef}
            color="#375E65"
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>
      </Float>
    </group>
  );
}
