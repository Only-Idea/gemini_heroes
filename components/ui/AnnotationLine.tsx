'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

interface AnnotationLineProps {
  /** SVG path `d` expression (in the local coordinate system of the SVG). */
  d: string;
  /** SVG viewBox, defaults to "0 0 200 100". */
  viewBox?: string;
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  /** Optional scroll trigger element; when it enters the viewport the line draws in. */
  triggerRef?: React.RefObject<Element | null>;
  /** Start point: `start` value for ScrollTrigger (default 'top 80%'). */
  start?: string;
}

/**
 * Dotted SVG line that draws itself in via stroke-dashoffset. Used to connect
 * feature annotations ("アプリ機能" badges) to the phone mockup on desktop.
 */
export default function AnnotationLine({
  d,
  viewBox = '0 0 200 100',
  className = '',
  stroke = 'currentColor',
  strokeWidth = 1.25,
  triggerRef,
  start = 'top 80%',
}: AnnotationLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    if (isReducedMotion) {
      gsap.set(path, { strokeDashoffset: 0 });
      return;
    }

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: triggerRef?.current
        ? { trigger: triggerRef.current, start }
        : undefined,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [d, isReducedMotion, start, triggerRef]);

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        ref={pathRef}
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="4 5"
        fill="none"
      />
    </svg>
  );
}
