'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function HeroOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const perfLevel = useStore((state) => state.perfLevel);
  const segments = perfLevel === 1 ? 32 : 64;

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth Mouse Parallax
    const targetX = state.mouse.x * 0.5;
    const targetY = state.mouse.y * 0.5;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, segments, segments]}>
        <MeshDistortMaterial
          color="#F7F4F0" // Warm Ivory base
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
      
      {/* Decorative Outer Shell (Wireframe) */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial 
          color="#375E65" // Deep Teal
          wireframe 
          transparent 
          opacity={0.05} 
        />
      </mesh>
    </Float>
  );
}
