'use client';

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

interface ImpactCounterProps {
  value: string;
  label: string;
  unit?: string;
  accent: 'teal' | 'coral' | 'amber';
  /** 0–1 progress toward the impact goal (drives the bar). */
  progress?: number;
  /** Label for the progress bar (e.g., "2030 goal"). */
  progressLabel?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Big impact number + animated progress bar + accent-coded dot/label.
 * The bar fills in on scroll enter (scrubbed).
 */
export default function ImpactCounter({
  value,
  label,
  unit,
  accent,
  progress = 0.5,
  progressLabel,
  className = '',
  children,
}: ImpactCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (isReducedMotion) {
      bar.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
      return;
    }

    gsap.set(bar, { scaleX: 0, transformOrigin: '0% 50%' });
    const tween = gsap.to(bar, {
      scaleX: Math.max(0, Math.min(1, progress)),
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [progress, isReducedMotion]);

  return (
    <div ref={rootRef} className={cn('group w-full', className)}>
      <span className="block font-display text-[56px] lg:text-[64px] font-bold text-foreground leading-none tabular-nums">
        <AnimatedCounter value={value} duration={2.2} />
        {unit && <span className="ml-1 text-2xl text-stone align-baseline">{unit}</span>}
      </span>

      <div className="mt-4 flex items-center gap-3">
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            `bg-${accent}`,
            accent === 'teal' && 'shadow-[0_0_8px_var(--color-teal)]',
            accent === 'coral' && 'shadow-[0_0_8px_var(--color-coral)]',
            accent === 'amber' && 'shadow-[0_0_8px_var(--color-amber)]'
          )}
        />
        <p className="font-mono text-[11px] font-bold tracking-widest text-muted uppercase">
          {label}
        </p>
      </div>

      <div className="mt-5">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-foreground/10">
          <div
            ref={barRef}
            className={cn(
              'h-full rounded-full',
              `bg-${accent}`,
              accent === 'teal' && 'shadow-[0_0_12px_var(--color-teal)]',
              accent === 'coral' && 'shadow-[0_0_12px_var(--color-coral)]',
              accent === 'amber' && 'shadow-[0_0_12px_var(--color-amber)]'
            )}
          />
        </div>
        {progressLabel && (
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.28em] text-muted">
            {progressLabel}
          </p>
        )}
      </div>

      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
