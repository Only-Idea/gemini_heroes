'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface WaveAnimationProps {
  className?: string;
  colorVar?: string;
}

/**
 * Decorative ocean wave background. Two SVG sine-path layers pan
 * horizontally at different speeds to fake a parallax surface.
 */
export default function WaveAnimation({
  className = '',
  colorVar = '--color-coral',
}: WaveAnimationProps) {
  const frontRef = useRef<SVGGElement>(null);
  const backRef = useRef<SVGGElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);

  useEffect(() => {
    const front = frontRef.current;
    const back = backRef.current;
    if (!front || !back || isReducedMotion) return;

    const t1 = gsap.to(front, { xPercent: -50, duration: 16, ease: 'none', repeat: -1 });
    const t2 = gsap.to(back, { xPercent: -50, duration: 26, ease: 'none', repeat: -1 });
    return () => {
      t1.kill();
      t2.kill();
    };
  }, [isReducedMotion]);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 200"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      style={{ color: `var(${colorVar})` }}
    >
      {/* Back wave (slower, subtler) */}
      <g ref={backRef} opacity="0.28">
        <path
          d="M0 140 Q 100 100 200 140 T 400 140 T 600 140 T 800 140 V 200 H 0 Z
             M800 140 Q 900 100 1000 140 T 1200 140 T 1400 140 T 1600 140 V 200 H 800 Z"
          fill="currentColor"
        />
      </g>
      {/* Front wave */}
      <g ref={frontRef} opacity="0.5">
        <path
          d="M0 160 Q 100 130 200 160 T 400 160 T 600 160 T 800 160 V 200 H 0 Z
             M800 160 Q 900 130 1000 160 T 1200 160 T 1400 160 T 1600 160 V 200 H 800 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
