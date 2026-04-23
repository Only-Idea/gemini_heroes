'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  /** Scroll direction, defaults to 'left'. */
  direction?: 'left' | 'right';
  /** Seconds to travel one cycle (= one copy + gap). Lower = faster. */
  speed?: number;
  /** Pause translation while hovered. */
  pauseOnHover?: boolean;
  /** Gap between items AND between copies. */
  gap?: string;
  className?: string;
}

/**
 * Seamless marquee. Renders N identical copies of `children` so the track
 * always fully covers the viewport throughout the cycle, even when one
 * copy is narrower than the viewport. Each cycle shifts by exactly
 * `copyWidth + trackGap` so the next copy lands where the previous one
 * just was — no blank space, no visible jump.
 */
export default function Marquee({
  children,
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  gap = 'gap-12 lg:gap-16',
  className = '',
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [copyCount, setCopyCount] = useState(3);
  const isReducedMotion = useStore((s) => s.isReducedMotion);

  useEffect(() => {
    if (isReducedMotion) return;

    const track = trackRef.current;
    const copy = copyRef.current;
    if (!track || !copy) return;

    let tween: gsap.core.Tween | null = null;

    const run = () => {
      const copyWidth = copy.offsetWidth;
      const gapPx = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
      const shift = copyWidth + gapPx;
      if (shift <= 0) return;

      // Ensure there are enough copies that the track always covers the
      // viewport through the entire cycle (need NW + (N-1)G >= vw + shift).
      const needed = Math.max(3, Math.ceil(window.innerWidth / shift) + 2);
      if (needed > copyCount) {
        setCopyCount(needed);
        return; // effect will re-run with the larger count
      }

      if (tween) tween.kill();
      gsap.set(track, { x: direction === 'left' ? 0 : -shift });
      tween = gsap.to(track, {
        x: direction === 'left' ? -shift : 0,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    };

    run();
    const ro = new ResizeObserver(run);
    ro.observe(copy);
    window.addEventListener('resize', run);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', run);
      tween?.kill();
    };
  }, [direction, speed, isReducedMotion, children, copyCount]);

  const onEnter = () => {
    if (pauseOnHover && trackRef.current) {
      gsap.getTweensOf(trackRef.current).forEach((t) => t.pause());
    }
  };
  const onLeave = () => {
    if (pauseOnHover && trackRef.current) {
      gsap.getTweensOf(trackRef.current).forEach((t) => t.resume());
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn('relative w-full overflow-hidden', className)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={trackRef}
        className={cn('flex w-max flex-nowrap whitespace-nowrap will-change-transform', gap)}
      >
        {Array.from({ length: copyCount }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? copyRef : undefined}
            aria-hidden={i > 0}
            className={cn('flex flex-nowrap shrink-0', gap)}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
