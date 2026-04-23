'use client';

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';

interface Cursor3DTiltProps {
  children: ReactNode;
  maxTilt?: number;
  glare?: boolean;
  className?: string;
}

/**
 * Perspective cursor tilt wrapper. Applies rotateX/rotateY on mousemove,
 * resets on leave. Honors prefers-reduced-motion and falls back to no-op
 * on touch devices (no mouse events).
 */
export default function Cursor3DTilt({
  children,
  maxTilt = 5,
  glare = false,
  className = '',
}: Cursor3DTiltProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || isReducedMotion) return;

    const xTo = gsap.quickTo(root, 'rotationY', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(root, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    const gxTo = glareRef.current
      ? gsap.quickTo(glareRef.current, 'xPercent', { duration: 0.5, ease: 'power2.out' })
      : null;
    const gyTo = glareRef.current
      ? gsap.quickTo(glareRef.current, 'yPercent', { duration: 0.5, ease: 'power2.out' })
      : null;

    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(nx * maxTilt * 2);
      yTo(-ny * maxTilt * 2);
      if (gxTo && gyTo) {
        gxTo(nx * 100);
        gyTo(ny * 100);
      }
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
      if (gxTo && gyTo) {
        gxTo(0);
        gyTo(0);
      }
    };

    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, [maxTilt, isReducedMotion]);

  return (
    <div
      ref={rootRef}
      className={`perspective-1000 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-50%] opacity-0 transition-opacity duration-500 [background:radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_60%)] group-hover:opacity-100"
          style={{ mixBlendMode: 'soft-light', filter: 'blur(28px)' }}
        />
      )}
      {children}
    </div>
  );
}
