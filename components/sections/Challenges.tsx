'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChallengeCard from '@/components/ui/ChallengeCard';

gsap.registerPlugin(ScrollTrigger);

export default function Challenges() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollRef.current;
    if (!section || !scrollContainer) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const amountToScroll = scrollContainer.scrollWidth - window.innerWidth;
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

  const challenges = [
    { title: '富士山', subtitle: 'Conquer the sacred peak of Japan.', color: 'teal' as const },
    { title: '浪人', subtitle: 'Follow the path of the masterless warrior.', color: 'amber' as const },
    { title: '鉄道', subtitle: 'Journey through the historic rail routes.', color: 'coral' as const },
    { title: '桜', subtitle: 'A seasonal journey through cherry blossoms.', color: 'teal' as const },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="challenges" 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-[var(--space-section-y)] lg:py-0"
      role="region"
      aria-label={t('nav.challenges')}
    >
      <div className="mx-auto max-w-[1400px] px-6 w-full mb-12 lg:absolute lg:top-24 lg:left-1/2 lg:-translate-x-1/2">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-label font-bold uppercase tracking-[0.3em] text-coral">
              01 / Explore
            </p>
            <h2 className="mt-4 font-display text-section-title font-bold leading-tight text-foreground">
              {t('nav.challenges')}
            </h2>
          </div>
          <p className="max-w-md text-body font-medium text-muted">
            Choose your path through the heart of Japan. Each route is a unique journey of discovery.
          </p>
        </div>
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
