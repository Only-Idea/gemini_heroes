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
        image: '/images/cards/fuji.png',
        color: 'teal' as const,
        distanceKm: 74,
        days: 60,
        difficulty: 'Easy' as DifficultyLevel,
      },
      {
        id: 'ronin',
        title: t('ronin.title'),
        subtitle: t('ronin.subtitle'),
        image: '/images/cards/ronin.png',
        color: 'amber' as const,
        distanceKm: 1404,
        days: 270,
        difficulty: 'Moderate' as DifficultyLevel,
      },
      {
        id: 'rail',
        title: t('rail.title'),
        subtitle: t('rail.subtitle'),
        image: '/images/cards/rail.png',
        color: 'coral' as const,
        distanceKm: 3170,
        days: 365,
        difficulty: 'Epic' as DifficultyLevel,
      },
    ],
    [t]
  );

  return (
    <section
      ref={sectionRef}
      id="challenges"
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-center overflow-visible lg:overflow-hidden py-[var(--space-section-y)] lg:py-0"
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

      <div className="lg:min-h-[70vh] flex items-center">
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
              imageSrc={challenge.image}
              imageAlt={challenge.title}
              accentColor={challenge.color}
              index={i}
              distanceKm={challenge.distanceKm}
              days={challenge.days}
              difficulty={challenge.difficulty}
              className="challenge-card w-[90%] max-w-[400px] mx-auto lg:mx-0 lg:w-[450px] lg:h-[640px] shrink-0"
            />
          ))}
        </HorizontalScrollContainer>
      </div>
    </section>
  );
}
