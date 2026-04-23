'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';

interface AnimatedHeadlineProps {
  children: string;
  delay?: number;
  stagger?: number;
  start?: boolean;
  className?: string;
}

export default function AnimatedHeadline({
  children,
  delay = 0,
  stagger = 0.04,
  start = true,
  className = '',
}: AnimatedHeadlineProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);

  useEffect(() => {
    if (!rootRef.current) return;
    const chars = rootRef.current.querySelectorAll<HTMLElement>('.ah-char');
    if (chars.length === 0) return;

    if (isReducedMotion) {
      gsap.set(chars, { yPercent: 0, opacity: 1 });
      return;
    }

    if (!start) {
      gsap.set(chars, { yPercent: 120, opacity: 0 });
      return;
    }

    const tween = gsap.fromTo(
      chars,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger,
        delay: delay / 1000,
      }
    );

    return () => {
      tween.kill();
    };
  }, [children, delay, stagger, isReducedMotion, start]);

  return (
    <span ref={rootRef} className={`inline-block ${className}`} aria-label={children}>
      {Array.from(children).map((ch, i) => (
        <span
          key={i}
          className="ah-mask inline-block overflow-hidden align-bottom leading-[1.05]"
          style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
          aria-hidden="true"
        >
          <span className="ah-char inline-block will-change-transform">
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
