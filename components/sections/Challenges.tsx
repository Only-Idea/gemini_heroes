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
        href: 'https://shop.medalhero.com/products/%E5%AF%8C%E5%A3%AB%E5%B1%B1?variant=52923670102323',
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
        href: 'https://shop.medalhero.com/products/%E5%9B%9B%E5%8D%81%E4%B8%83%E5%A3%AB?variant=52923979497779',
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
        href: 'https://shop.medalhero.com/products/%E9%89%84%E9%81%93%E6%97%85%E8%B7%AF?variant=52924006400307',
      },
    ],
    [t]
  );

  return (
    <section
      ref={sectionRef}
      id="challenges"
      className="relative min-h-screen flex flex-col justify-center overflow-visible lg:overflow-visible py-32 lg:py-48"
      role="region"
      aria-label={t('label')}
    >
      <div className="mx-auto max-w-[1400px] w-full px-6 mb-24">
        <div className="max-w-2xl lg:w-1/2">
          <SectionLabel
            number={t('label').split(' / ')[0]}
            label={t('label').split(' / ')[1]}
            title={t('label').split(' / ')[1]}
            description={t('description')}
            accentColor="coral"
          />
        </div>
      </div>

      <div className="flex flex-col items-center lg:flex-row">
        <HorizontalScrollContainer
          className="flex flex-col items-center gap-6 px-5 w-full lg:flex-row lg:items-stretch lg:gap-8 lg:px-0 lg:w-max"
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
              href={challenge.href}
              className="challenge-card w-full max-w-[320px] aspect-[7/10] lg:w-[360px] lg:aspect-auto lg:h-[512px] lg:max-w-none lg:shrink-0"
            />
          ))}
        </HorizontalScrollContainer>
      </div>
    </section>
  );
}
