'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

export default function MedalScene() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Automatic gentle rotation
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={meshRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />
          <meshStandardMaterial 
            color="#F2BE5E" // Golden Amber
            metalness={0.9} 
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Decorative Rim */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#EC7A5C" metalness={1} roughness={0} />
        </mesh>

        {/* Embossed Detail Placeholder */}
        <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 1, 32]} />
          <meshStandardMaterial color="#F7F4F0" transparent opacity={0.2} metalness={1} />
        </mesh>
      </Float>
    </group>
  );
}
