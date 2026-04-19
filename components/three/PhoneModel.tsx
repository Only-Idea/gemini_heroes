'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface PhoneModelProps {
  activeFeatureIndex: number;
}

export default function PhoneModel({ activeFeatureIndex }: PhoneModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  // Define screen colors for different features as placeholders
  const screenColors = [
    '#375E65', // Teal (Maps)
    '#EC7A5C', // Coral (Impact)
    '#F2BE5E', // Amber (Medals)
    '#375E65', // Teal (Teams)
    '#F2BE5E', // Amber (Achievements)
    '#EC7A5C', // Coral (Inclusivity)
  ];

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle floating and tilting based on mouse
    const targetRotationX = state.mouse.y * 0.2;
    const targetRotationY = state.mouse.x * 0.2;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05);

    if (screenRef.current) {
      const targetColor = new THREE.Color(screenColors[activeFeatureIndex] || screenColors[0]);
      (screenRef.current.material as THREE.MeshStandardMaterial).color.lerp(targetColor, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Phone Frame */}
        <RoundedBox args={[2.5, 5, 0.3]} radius={0.2} smoothness={4}>
          <meshStandardMaterial color="#181B21" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.16]}>
          <planeGeometry args={[2.3, 4.8]} />
          <meshStandardMaterial 
            color={screenColors[0]} 
            emissive={screenColors[0]} 
            emissiveIntensity={0.5}
            roughness={0.1}
          />
        </mesh>

        {/* Home Indicator / Notch */}
        <mesh position={[0, 2.2, 0.17]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>
    </Float>
  );
}
