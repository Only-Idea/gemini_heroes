'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionAnimation } from '@/hooks/useReducedMotionAnimation';
import SplitText from '@/components/ui/SplitText';
import SectionLabel from '@/components/ui/SectionLabel';
import MedalCarousel from '@/components/sections/MedalCarousel';

gsap.registerPlugin(ScrollTrigger);

export default function MedalShowcase() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);

  useReducedMotionAnimation(
    sectionRef,
    () => {
      // Copy fades in at the scroll midpoint while the carousel keeps its own motion.
      gsap.from('.medal-reveal-title .char', {
        opacity: 0,
        x: -20,
        stagger: 0.02,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'center 70%' },
      });
      gsap.from('.medal-reveal-desc', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'center 70%' },
      });
    },
    () => {
      gsap.from('.medal-reveal-title, .medal-reveal-desc', {
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }
  );

  return (
    <section
      ref={sectionRef}
      className="px-6 py-48 relative overflow-hidden"
      role="region"
      aria-label={t('medal.label')}
      suppressHydrationWarning
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/5 blur-[150px] rounded-full" />

      <div className="mx-auto max-w-[1400px] text-center relative z-10" suppressHydrationWarning>
        <SectionLabel
          number="05"
          label={t('medal.label').split(' / ')[1]}
          title={<SplitText>{t('medal.title')}</SplitText>}
          description={t('medal.description')}
          accentColor="coral"
          align="center"
          titleClassName="medal-reveal-title"
          descriptionClassName="medal-reveal-desc"
        />

        <div className="relative mx-auto mt-20 flex aspect-square max-w-2xl items-center justify-center rounded-full bg-foreground/[0.01] border border-foreground/5 shadow-heroes overflow-hidden group">
          <MedalCarousel />

          {/* Interactive hint that reveals on hover */}
          <div className="pointer-events-none absolute bottom-[13%] left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone">
              {t('medal.scroll_hint')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
