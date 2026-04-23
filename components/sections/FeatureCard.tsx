'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import GlassCard from '@/components/ui/GlassCard';
import AnnotationLine from '@/components/ui/AnnotationLine';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  id: string;
  index: number;
  title: string;
  description: string;
  accent: 'teal' | 'coral' | 'amber';
  active: boolean;
  children?: ReactNode;
}

export default function FeatureCard({
  id,
  index,
  title,
  description,
  accent,
  active,
  children,
}: FeatureCardProps) {
  const tCommon = useTranslations('common');
  return (
    <GlassCard
      glowColor={accent}
      data-feature-card
      className={cn(
        'feature-card group relative cursor-default transition-all duration-700',
        'hover:-translate-y-0.5 hover:border-coral/60 hover:scale-[1.02] hover:shadow-2xl',
        active
          ? 'opacity-100 translate-x-4 border-white/40 shadow-2xl scale-105'
          : 'opacity-40 border-white/5 grayscale'
      )}
    >
      <div id={`feature-${id}`} className="absolute top-0 left-0 w-full h-1" />

      {/* Desktop-only annotation line pointing toward the phone (to the left).
          Hidden under 1024px and when the card is not active. */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute right-full top-1/2 hidden -translate-y-1/2 pr-4 lg:block',
          'transition-opacity duration-500',
          active ? 'opacity-80' : 'opacity-0'
        )}
      >
        <AnnotationLine
          d="M0 12 L200 12"
          viewBox="0 0 200 24"
          className={`h-6 w-40 text-${accent}`}
          strokeWidth={1.5}
        />
      </div>

      <span
        className={cn(
          'font-mono text-[10px] font-bold uppercase tracking-[0.3em]',
          `text-${accent}`
        )}
      >
        {tCommon('feature_label')} / 0{index + 1}
      </span>

      <h3 className="mt-4 font-display text-subhead font-bold text-foreground">{title}</h3>

      <p className="mt-4 max-w-md text-muted font-medium leading-relaxed">{description}</p>

      {children && <div className="mt-6">{children}</div>}

      {/* Indicator dot on the left edge */}
      <div
        className={cn(
          'absolute -left-6 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full transition-all duration-500',
          `bg-${accent}`,
          active ? 'scale-150 shadow-[0_0_15px_rgba(var(--glow-rgb),0.5)]' : 'scale-0'
        )}
      />
    </GlassCard>
  );
}
