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
  /** 0–1 progress toward the impact goal. Omit to hide the bar entirely
   *  (useful when the counter represents a forward-looking target rather
   *  than tracked progress). */
  progress?: number;
  /** Label for the progress bar area (still shown when `progress` is
   *  omitted — useful for subtext like "2025 から開始"). */
  progressLabel?: string;
  /** Small eyebrow above the number (e.g., "今年の目標"). */
  eyebrow?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Big impact number + optional progress bar + accent-coded dot/label.
 * The bar fills in on scroll enter (scrubbed). When `progress` is omitted
 * the bar is not rendered and the counter reads as a forward-looking
 * target — `progressLabel` and `eyebrow` still render around the number.
 */
export default function ImpactCounter({
  value,
  label,
  unit,
  accent,
  progress,
  progressLabel,
  eyebrow,
  className = '',
  children,
}: ImpactCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);
  const showBar = typeof progress === 'number';

  useEffect(() => {
    if (!showBar) return;
    const bar = barRef.current;
    if (!bar) return;

    const target = Math.max(0, Math.min(1, progress ?? 0));
    if (isReducedMotion) {
      bar.style.transform = `scaleX(${target})`;
      return;
    }

    gsap.set(bar, { scaleX: 0, transformOrigin: '0% 50%' });
    const tween = gsap.to(bar, {
      scaleX: target,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [progress, isReducedMotion, showBar]);

  const dotAccentShadow =
    accent === 'teal'
      ? 'shadow-[0_0_8px_var(--color-teal)]'
      : accent === 'coral'
      ? 'shadow-[0_0_8px_var(--color-coral)]'
      : 'shadow-[0_0_8px_var(--color-amber)]';

  const barAccentShadow =
    accent === 'teal'
      ? 'shadow-[0_0_12px_var(--color-teal)]'
      : accent === 'coral'
      ? 'shadow-[0_0_12px_var(--color-coral)]'
      : 'shadow-[0_0_12px_var(--color-amber)]';

  return (
    <div ref={rootRef} className={cn('group w-full', className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-muted">
          {eyebrow}
        </p>
      )}

      <span className="block font-display text-[56px] lg:text-[64px] font-bold text-foreground leading-none tabular-nums">
        <AnimatedCounter value={value} duration={2.2} />
        {unit && <span className="ml-1 text-2xl text-stone align-baseline">{unit}</span>}
      </span>

      <div className="mt-4 flex items-center gap-3">
        <span className={cn('h-1.5 w-1.5 rounded-full', `bg-${accent}`, dotAccentShadow)} />
        <p className="font-mono text-[13px] font-bold tracking-widest text-foreground/75 uppercase">
          {label}
        </p>
      </div>

      {(showBar || progressLabel) && (
        <div className="mt-5">
          {showBar && (
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-foreground/10">
              <div
                ref={barRef}
                className={cn('h-full rounded-full', `bg-${accent}`, barAccentShadow)}
              />
            </div>
          )}
          {progressLabel && (
            <p
              className={cn(
                'font-mono text-[12px] font-bold uppercase tracking-[0.28em] text-foreground/70',
                showBar ? 'mt-2' : 'mt-0'
              )}
            >
              {progressLabel}
            </p>
          )}
        </div>
      )}

      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
