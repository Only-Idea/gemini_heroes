'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

export type ActivityKey =
  | 'walk'
  | 'run'
  | 'bike'
  | 'swim'
  | 'hike'
  | 'wheelchair'
  | 'row'
  | 'elliptical'
  | 'stairs'
  | 'crossfit'
  | 'yoga'
  | 'pilates';

interface ActivityIconProps {
  activity: ActivityKey;
  /** Japanese label. */
  ja: string;
  /** English label. */
  en: string;
  className?: string;
}

/**
 * Minimalist activity icon with Japanese + English labels. Scales up as it
 * crosses viewport center so a row of icons "breathes" with scroll.
 */
export default function ActivityIcon({ activity, ja, en, className = '' }: ActivityIconProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || isReducedMotion) return;

    const tween = gsap.fromTo(
      root,
      { scale: 0.9 },
      {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isReducedMotion]);

  return (
    <div
      ref={rootRef}
      className={cn(
        'group flex shrink-0 flex-col items-center gap-3 px-1 will-change-transform',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-foreground/5 bg-foreground/[0.03] text-foreground/60 transition-all duration-300 group-hover:rotate-6 group-hover:border-teal/30 group-hover:bg-teal/5 group-hover:text-teal lg:h-16 lg:w-16">
        <IconGlyph activity={activity} />
      </div>
      <div className="flex flex-col items-center leading-tight">
        <span className="font-display text-sm font-bold text-foreground">{ja}</span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-muted">
          {en}
        </span>
      </div>
    </div>
  );
}

function IconGlyph({ activity }: { activity: ActivityKey }) {
  const common = 'h-6 w-6 lg:h-7 lg:w-7';
  // Minimalist 24x24 glyphs — simple strokes rather than photorealistic.
  switch (activity) {
    case 'walk':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13" cy="4" r="2" />
          <path d="M8 22l3-8 3 2 3 6" />
          <path d="M11 14l-3-4 4-3 3 3 3-1" />
        </svg>
      );
    case 'run':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="15" cy="4" r="2" />
          <path d="M5 22l4-6 3 2 3 5" />
          <path d="M9 16l-2-5 5-3 3 3 3-1" />
          <path d="M4 10l3 1" />
        </svg>
      );
    case 'bike':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="17" r="3.5" />
          <circle cx="19" cy="17" r="3.5" />
          <path d="M5 17l5-7 4 5 4-5" />
          <circle cx="15" cy="4" r="1.2" />
        </svg>
      );
    case 'swim':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="6" r="1.5" />
          <path d="M4 10l5 1 4-3 5 4" />
          <path d="M3 17q3-2 6 0t6 0 6 0" />
          <path d="M3 21q3-2 6 0t6 0 6 0" />
        </svg>
      );
    case 'hike':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21L9 9l5 7 7-12" />
          <path d="M14 16l3 5" />
          <circle cx="17" cy="5" r="1.2" />
        </svg>
      );
    case 'wheelchair':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="18" r="4" />
          <circle cx="12" cy="4" r="1.6" />
          <path d="M12 6v6h5l2 4" />
          <path d="M10 12l4 2" />
        </svg>
      );
    case 'row':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 15h18" />
          <path d="M5 19l4-5 6 2 5-6" />
          <path d="M3 19l3-2" />
        </svg>
      );
    case 'elliptical':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="18" rx="7" ry="3" />
          <path d="M7 18l4-10 4 6" />
          <circle cx="11" cy="4" r="1.4" />
        </svg>
      );
    case 'stairs':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h4v-3h4v-3h4v-3h4v-3h2" />
          <circle cx="17" cy="4" r="1.3" />
        </svg>
      );
    case 'crossfit':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="10" width="3" height="4" rx="0.6" />
          <rect x="19" y="10" width="3" height="4" rx="0.6" />
          <rect x="6" y="11" width="12" height="2" rx="0.6" />
        </svg>
      );
    case 'yoga':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="1.8" />
          <path d="M5 20l4-6 3 2 3-2 4 6" />
          <path d="M7 11l5-3 5 3" />
        </svg>
      );
    case 'pilates':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="5" r="1.5" />
          <path d="M6 8l4 4 6-3 3 4" />
          <path d="M3 20l18-4" />
        </svg>
      );
  }
}
