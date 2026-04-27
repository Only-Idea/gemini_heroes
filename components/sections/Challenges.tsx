'use client';

import ChallengeCard from '@/components/ui/ChallengeCard';
import HorizontalScrollContainer from '@/components/ui/HorizontalScrollContainer';
import SectionLabel from '@/components/ui/SectionLabel';
import { useTranslations } from 'next-intl';
import { useMemo, useRef } from 'react';
import { CHALLENGES } from '@/lib/challenges';

export default function Challenges() {
  const t = useTranslations('challenges');
  const sectionRef = useRef<HTMLElement>(null);

  const challenges = useMemo(
    () =>
      CHALLENGES.map((c) => ({
        ...c,
        title: t(`${c.id}.title`),
        subtitle: t(`${c.id}.subtitle`),
      })),
    [t]
  );

  return (
    <section
      ref={sectionRef}
      id="challenges"
      className="relative min-h-screen flex flex-col justify-center overflow-visible lg:overflow-visible py-32 lg:py-48"
      aria-labelledby="challenges-heading"
    >
      <div className="mx-auto max-w-[1400px] w-full px-6 mb-24">
        <div className="max-w-2xl lg:w-1/2">
          <SectionLabel
            number={t('label').split(' / ')[0]}
            label={t('label').split(' / ')[1]}
            title={t('label').split(' / ')[1]}
            description={t('description')}
            accentColor="coral"
            headingId="challenges-heading"
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
              imageAlt={`${challenge.title} virtual challenge — ${challenge.distanceKm}km route across Japan`}
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
