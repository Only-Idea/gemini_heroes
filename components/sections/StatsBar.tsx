'use client';

import { useTranslations } from 'next-intl';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function StatsBar() {
  const t = useTranslations();

  const stats = [
    { value: '3', label: t('stats.routes') },
    { value: '12', label: t('stats.activities') },
    { value: '32+', label: t('stats.countries') },
  ];

  return (
    <section 
      className="reveal py-20 bg-foreground/[0.02] border-y border-foreground/5 relative overflow-hidden"
      role="region"
      aria-label="Statistics"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-coral/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-around gap-12 px-6 md:flex-row md:gap-0 relative z-10">
        {stats.map((stat, index) => (
          <div key={stat.label} className="text-center group">
            <span className="block font-display text-stat font-bold text-foreground transition-transform duration-500 group-hover:scale-110">
              <AnimatedCounter value={stat.value} delay={index * 0.1} />
            </span>
            <p className="mt-2 font-mono text-label font-bold tracking-[0.2em] text-muted uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
