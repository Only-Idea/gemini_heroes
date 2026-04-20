'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

export default function MedalScene() {
  const meshRef = useRef<THREE.Group>(null);

  // Create a custom gradient texture for reflection mapping
  const envMapTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#375E65'); // Deep Teal
      gradient.addColorStop(0.5, '#F2BE5E'); // Golden Amber
      gradient.addColorStop(1, '#EC7A5C'); // Coral Sunset
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    return texture;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    // Read scroll progress from store (driven by GSAP ScrollTrigger in MedalShowcase)
    const scrollProgress = useStore.getState().medalScrollProgress;
    
    // Map scroll progress to rotation: 90 degrees (profile) to 0 degrees (front)
    // plus one extra spin for flair
    const targetRotation = (1 - scrollProgress) * Math.PI / 2 + (scrollProgress * Math.PI * 2);
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation,
      0.1
    );

    // Subtle breathing if stationary
    if (scrollProgress === 0 || scrollProgress === 1) {
      meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* High-fidelity Shadows */}
      <AccumulativeShadows
        temporal
        frames={100}
        color="#375E65"
        colorBlend={2}
        opacity={0.7}
        scale={10}
        alphaTest={0.85}
      >
        <RandomizedLight
          amount={8}
          radius={4}
          ambient={0.5}
          intensity={1}
          position={[5, 5, -10]}
          bias={0.001}
        />
      </AccumulativeShadows>

      <group ref={meshRef}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />
            <meshStandardMaterial 
              color="#F2BE5E" // Golden Amber
              metalness={0.9} 
              roughness={0.05}
              envMap={envMapTexture}
              envMapIntensity={2.5}
            />
          </mesh>
          
          {/* Decorative Rim */}
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[1.5, 0.05, 16, 100]} />
            <meshStandardMaterial 
              color="#EC7A5C" 
              metalness={1} 
              roughness={0.1}
              envMap={envMapTexture}
            />
          </mesh>

          {/* Embossed Detail */}
          <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0, 1.2, 64]} />
            <meshStandardMaterial 
              color="#F7F4F0" 
              transparent 
              opacity={0.4} 
              metalness={1}
              roughness={0.1}
              envMap={envMapTexture}
            />
          </mesh>
        </Float>
      </group>
    </group>
  );
}
