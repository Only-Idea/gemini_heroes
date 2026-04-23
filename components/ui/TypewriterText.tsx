'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';

interface TypewriterTextProps {
  children: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
  start?: boolean;
  className?: string;
}

export default function TypewriterText({
  children,
  delay = 0,
  speed = 40,
  cursor = true,
  start = true,
  className = '',
}: TypewriterTextProps) {
  const isReducedMotion = useStore((s) => s.isReducedMotion);
  const [typed, setTyped] = useState<string>(() => (isReducedMotion ? children : ''));

  useEffect(() => {
    if (!start) return;

    const timers: number[] = [];
    let cancelled = false;

    if (isReducedMotion) {
      const t = window.setTimeout(() => {
        if (!cancelled) setTyped(children);
      }, 0);
      timers.push(t);
      return () => {
        cancelled = true;
        timers.forEach(clearTimeout);
      };
    }

    // Reset to empty via timer to avoid a synchronous setState in effect body.
    timers.push(
      window.setTimeout(() => {
        if (!cancelled) setTyped('');
      }, 0)
    );

    const chars = Array.from(children);
    timers.push(
      window.setTimeout(() => {
        if (cancelled) return;
        let i = 0;
        const tick = () => {
          if (cancelled) return;
          i += 1;
          setTyped(chars.slice(0, i).join(''));
          if (i < chars.length) {
            timers.push(window.setTimeout(tick, speed));
          }
        };
        tick();
      }, delay)
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [children, delay, speed, isReducedMotion, start]);

  const isTyping = typed.length < children.length;

  return (
    <span className={`inline-flex items-baseline ${className}`} aria-label={children}>
      <span aria-hidden="true">{typed}</span>
      {cursor && !isReducedMotion && isTyping && (
        <span
          aria-hidden="true"
          className="ml-[3px] inline-block h-[0.9em] w-[1.5px] translate-y-[0.08em] animate-pulse bg-current"
        />
      )}
    </span>
  );
}
