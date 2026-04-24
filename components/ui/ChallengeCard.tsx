'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import DifficultyBadge, { DifficultyLevel } from '@/components/ui/DifficultyBadge';
import { useStore } from '@/store/useStore';

interface ChallengeCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  accentColor: 'teal' | 'amber' | 'coral';
  index: number;
  distanceKm: number;
  days: number;
  difficulty: DifficultyLevel;
  className?: string;
}

export default function ChallengeCard({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  accentColor,
  index,
  distanceKm,
  days,
  difficulty,
  className = '',
}: ChallengeCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useStore((s) => s.isReducedMotion);
  const tCommon = useTranslations('common');

  useEffect(() => {
    const card = cardRef.current;
    if (!card || isReducedMotion) return;

    const xTo = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    const glowXTo = gsap.quickTo(glowRef.current, 'xPercent', {
      duration: 0.5,
      ease: 'power2.out',
    });
    const glowYTo = gsap.quickTo(glowRef.current, 'yPercent', {
      duration: 0.5,
      ease: 'power2.out',
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      // Max tilt 5° per spec 2C.1
      xTo(x * 10);
      yTo(-y * 10);
      glowXTo(x * 100);
      glowYTo(y * 100);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      glowXTo(0);
      glowYTo(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReducedMotion]);

  const colorClasses = {
    teal: 'from-teal/20 to-teal/5 border-teal/20',
    amber: 'from-amber/20 to-amber/5 border-amber/20',
    coral: 'from-coral/20 to-coral/5 border-coral/20',
  };

  const barShadowClass = {
    teal: 'bg-teal shadow-[0_0_20px_var(--color-teal)]',
    amber: 'bg-amber shadow-[0_0_20px_var(--color-amber)]',
    coral: 'bg-coral shadow-[0_0_20px_var(--color-coral)]',
  };

  const visualGradientClass = {
    teal: 'bg-gradient-to-br from-teal/25 via-transparent to-teal/5',
    amber: 'bg-gradient-to-br from-amber/25 via-transparent to-amber/5',
    coral: 'bg-gradient-to-br from-coral/25 via-transparent to-coral/5',
  };

  const labelTextClass = {
    teal: 'text-teal',
    amber: 'text-amber',
    coral: 'text-coral',
  };

  return (
    <button
      ref={cardRef}
      className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br ${colorClasses[accentColor]} p-6 md:p-8 backdrop-blur-md md:backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-2xl perspective-1000 text-left focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-background outline-none ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, var(--color-${accentColor}) 0%, transparent 70%)`,
          mixBlendMode: 'soft-light',
          filter: 'blur(40px)',
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%',
        }}
      />

      <div
        className="relative z-10 flex h-full flex-col justify-between"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div>
          <div className="flex items-center justify-between gap-3">
            <span
              className={`font-mono text-[10px] font-bold uppercase tracking-[0.3em] ${labelTextClass[accentColor]}`}
            >
              {tCommon('challenge_label')} / 0{index + 1}
            </span>
            <DifficultyBadge level={difficulty} />
          </div>

          <h3 className="mt-4 md:mt-5 font-display text-[20px] md:text-subhead font-bold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm font-medium text-muted">{subtitle}</p>

          <dl className="mt-4 md:mt-5 flex gap-6 text-left">
            <div>
              <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted">
                {tCommon('distance')}
              </dt>
              <dd className="mt-1 font-display text-base md:text-lg font-bold text-foreground">
                {distanceKm}
                <span className="ml-1 text-xs font-medium text-muted">{tCommon('unit_km')}</span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-muted">
                {tCommon('duration')}
              </dt>
              <dd className="mt-1 font-display text-base md:text-lg font-bold text-foreground">
                {days}
                <span className="ml-1 text-xs font-medium text-muted">{tCommon('unit_days')}</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Challenge visual — 1:1 square matches the 1206×1206 source artwork. */}
        <div className="relative mt-6 md:mt-8 aspect-[1.2/1] md:aspect-square overflow-hidden rounded-[32px] md:rounded-[44px] border border-white/10 bg-foreground/[0.03] transition-colors group-hover:bg-foreground/[0.06]">
          <div className={`absolute inset-0 ${visualGradientClass[accentColor]}`} />
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 450px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className={`absolute bottom-0 left-0 h-[2px] w-0 ${barShadowClass[accentColor]} transition-all duration-700 group-hover:w-full`}
          />
        </div>
      </div>
    </button>
  );
}

