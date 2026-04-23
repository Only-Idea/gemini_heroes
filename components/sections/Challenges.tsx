'use client';

import ChallengeCard from '@/components/ui/ChallengeCard';
import HorizontalScrollContainer from '@/components/ui/HorizontalScrollContainer';
import SectionLabel from '@/components/ui/SectionLabel';
import { useTranslations } from 'next-intl';
import { useMemo, useRef } from 'react';
import type { DifficultyLevel } from '@/components/ui/DifficultyBadge';

export default function Challenges() {
  const t = useTranslations('challenges');
  const sectionRef = useRef<HTMLElement>(null);

  const challenges = useMemo(
    () => [
      {
        id: 'fuji',
        title: t('fuji.title'),
        subtitle: t('fuji.subtitle'),
        color: 'teal' as const,
        distanceKm: 120,
        days: 14,
        difficulty: 'Epic' as DifficultyLevel,
      },
      {
        id: 'ronin',
        title: t('ronin.title'),
        subtitle: t('ronin.subtitle'),
        color: 'amber' as const,
        distanceKm: 86,
        days: 10,
        difficulty: 'Moderate' as DifficultyLevel,
      },
      {
        id: 'rail',
        title: t('rail.title'),
        subtitle: t('rail.subtitle'),
        color: 'coral' as const,
        distanceKm: 60,
        days: 7,
        difficulty: 'Easy' as DifficultyLevel,
      },
    ],
    [t]
  );

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
        <HorizontalScrollContainer
          className="flex flex-col lg:flex-row gap-8 px-6 lg:px-[15vw] w-full lg:w-max"
          stopMode="center"
          mobileEntrySelector=".challenge-card"
        >
          {challenges.map((challenge, i) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              subtitle={challenge.subtitle}
              accentColor={challenge.color}
              imageAlt={challenge.title}
              index={i}
              distanceKm={challenge.distanceKm}
              days={challenge.days}
              difficulty={challenge.difficulty}
              className="challenge-card w-full lg:w-[450px] aspect-[4/5] lg:aspect-auto lg:h-[500px] shrink-0"
            />
          ))}
        </HorizontalScrollContainer>
      </div>
    </section>
  );
}
