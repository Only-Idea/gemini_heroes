'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
 * Activity glyph + JA/EN labels. Uses the ChatGPT-generated PNG icons
 * from /public/images/icons/activity-{key}.png. Scales up as the icon
 * crosses viewport center so the ribbon "breathes" with scroll.
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
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-foreground/5 bg-foreground/[0.03] transition-all duration-300 group-hover:rotate-6 group-hover:border-teal/30 group-hover:bg-teal/5 lg:h-20 lg:w-20">
        <Image
          src={`/images/icons/activity-${activity}.png`}
          alt=""
          width={72}
          height={72}
          className="h-[72%] w-[72%] select-none object-contain"
          sizes="80px"
        />
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
