'use client';

import ChallengeCard from '@/components/ui/ChallengeCard';
import SectionLabel from '@/components/ui/SectionLabel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Challenges() {
  const t = useTranslations('challenges');
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollRef.current;
    if (!section || !scrollContainer) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const lastCard = scrollContainer.lastElementChild as HTMLElement | null;
      if (!lastCard) return;
      const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
      const amountToScroll = lastCardCenter - window.innerWidth / 2;
      if (amountToScroll <= 0) return;
      gsap.to(scrollContainer, {
        x: -amountToScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.from('.challenge-card', {
        opacity: 0,
        y: reduced ? 0 : 40,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      });
    });

    return () => mm.revert();
  }, []);

  const challenges = useMemo(() => [
    { title: t('fuji.title'), subtitle: t('fuji.subtitle'), color: 'teal' as const },
    { title: t('ronin.title'), subtitle: t('ronin.subtitle'), color: 'amber' as const },
    { title: t('rail.title'), subtitle: t('rail.subtitle'), color: 'coral' as const }
  ], [t]);

  return (
    <section 
      ref={sectionRef} 
      id="challenges" 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-[var(--space-section-y)] lg:py-0"
      role="region"
      aria-label={t('label')}
    >
      <div className="mx-auto max-w-[1400px] w-full px-6 lg:px-[15vw] mb-12">
        <SectionLabel
          number={t('label').split(' / ')[0]}
          label={t('label').split(' / ')[1]}
          title={t('label').split(' / ')[1]}
          description={t('description')}
          accentColor="coral"
        />
      </div>

      <div className="lg:h-[60vh] flex items-center">
        <div 
          ref={scrollRef}
          className="flex flex-col lg:flex-row gap-8 px-6 lg:px-[15vw] w-full lg:w-max"
        >
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.title}
              title={challenge.title}
              subtitle={challenge.subtitle}
              accentColor={challenge.color}
              imageAlt={challenge.title}
              className="challenge-card w-full lg:w-[450px] aspect-[4/5] lg:aspect-auto lg:h-[500px] shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
