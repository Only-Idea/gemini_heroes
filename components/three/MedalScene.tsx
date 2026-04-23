'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '@/store/useStore';

type Variant = 'gold' | 'silver' | 'bronze';

const variants: Record<
  Variant,
  { disc: string; rim: string; env: [string, string, string]; metalness: number; roughness: number }
> = {
  gold: {
    disc: '#F2BE5E',
    rim: '#EC7A5C',
    env: ['#375E65', '#F2BE5E', '#EC7A5C'],
    metalness: 0.9,
    roughness: 0.05,
  },
  silver: {
    disc: '#E8E2D6',
    rim: '#9AA4AE',
    env: ['#375E65', '#E8E2D6', '#B4B9C1'],
    metalness: 0.95,
    roughness: 0.08,
  },
  bronze: {
    disc: '#C98756',
    rim: '#8F4A2C',
    env: ['#4A2A1C', '#C98756', '#EC7A5C'],
    metalness: 0.85,
    roughness: 0.18,
  },
};

export default function MedalScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [variant, setVariant] = useState<Variant>('gold');

  // Auto-cycle gold → silver → bronze → gold every 5s.
  useEffect(() => {
    const order: Variant[] = ['gold', 'silver', 'bronze'];
    const id = window.setInterval(() => {
      setVariant((v) => order[(order.indexOf(v) + 1) % order.length]);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Per-variant env map for reflections.
  const envMapTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const g = ctx.createLinearGradient(0, 0, 512, 512);
      g.addColorStop(0, variants[variant].env[0]);
      g.addColorStop(0.5, variants[variant].env[1]);
      g.addColorStop(1, variants[variant].env[2]);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);
    }
    const t = new THREE.CanvasTexture(canvas);
    t.mapping = THREE.EquirectangularReflectionMapping;
    return t;
  }, [variant]);

  useFrame(() => {
    if (!groupRef.current) return;
    const progress = useStore.getState().medalScrollProgress;

    // Spec: 80° profile → 0° front mapped to scroll progress (scrubbed).
    const targetRotation = (1 - progress) * (80 * (Math.PI / 180));
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      0.1
    );

    // Spec: scale 0.8 → 1.0 through scroll range.
    const targetScale = 0.8 + progress * 0.2;
    const cur = groupRef.current.scale.x;
    const s = THREE.MathUtils.lerp(cur, targetScale, 0.1);
    groupRef.current.scale.setScalar(s);

    // Gentle idle float near the endpoints.
    const idle = progress <= 0.02 || progress >= 0.98;
    if (idle) {
      groupRef.current.position.y = -0.5 + Math.sin(Date.now() * 0.001) * 0.05;
    } else {
      groupRef.current.position.y = -0.5;
    }
  });

  const v = variants[variant];

  return (
    <>
      {/* Studio rim + spot lights for metallic highlights. */}
      <ambientLight intensity={0.35} color="#E8E2D6" />
      <spotLight position={[4, 6, 4]} angle={0.5} penumbra={0.6} intensity={2.2} color="#F7F4F0" />
      <pointLight position={[-5, 2, -3]} intensity={0.8} color="#8AB4D4" />

      <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={8} blur={2.4} far={3} />

      <group ref={groupRef} position={[0, -0.5, 0]}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />
            <meshStandardMaterial
              color={v.disc}
              metalness={v.metalness}
              roughness={v.roughness}
              envMap={envMapTexture ?? undefined}
              envMapIntensity={2.5}
            />
          </mesh>

          <mesh>
            <torusGeometry args={[1.5, 0.05, 16, 100]} />
            <meshStandardMaterial
              color={v.rim}
              metalness={1}
              roughness={0.1}
              envMap={envMapTexture ?? undefined}
            />
          </mesh>

          <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0, 1.2, 64]} />
            <meshStandardMaterial
              color="#F7F4F0"
              transparent
              opacity={0.4}
              metalness={1}
              roughness={0.1}
              envMap={envMapTexture ?? undefined}
            />
          </mesh>
        </Float>
      </group>
    </>
  );
}
