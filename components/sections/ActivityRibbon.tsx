'use client';

import { useTranslations } from 'next-intl';
import Marquee from '@/components/ui/Marquee';
import ActivityIcon, { ActivityKey } from '@/components/ui/ActivityIcon';

interface ActivityEntry {
  activity: ActivityKey;
  ja: string;
  en: string;
}

const rowA: ActivityEntry[] = [
  { activity: 'walk', ja: '歩く', en: 'Walking' },
  { activity: 'run', ja: '走る', en: 'Running' },
  { activity: 'bike', ja: '自転車', en: 'Cycling' },
  { activity: 'swim', ja: '水泳', en: 'Swimming' },
  { activity: 'hike', ja: '登山', en: 'Hiking' },
  { activity: 'wheelchair', ja: '車椅子', en: 'Wheelchair' },
];

const rowB: ActivityEntry[] = [
  { activity: 'row', ja: 'ボート', en: 'Rowing' },
  { activity: 'elliptical', ja: 'エリプティカル', en: 'Elliptical' },
  { activity: 'stairs', ja: '階段', en: 'Stairs' },
  { activity: 'crossfit', ja: 'クロスフィット', en: 'Crossfit' },
  { activity: 'yoga', ja: 'ヨガ', en: 'Yoga' },
  { activity: 'pilates', ja: 'ピラティス', en: 'Pilates' },
];

export default function ActivityRibbon() {
  const t = useTranslations('activities');

  return (
    <section
      className="relative w-full bg-white py-16 lg:py-24 border-y border-foreground/5 overflow-hidden"
      role="region"
      aria-label={t('message')}
    >
      <div className="mx-auto mb-10 max-w-[1400px] px-6 text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-teal">
          12 Activities · 12種類
        </p>
        <h3 className="mt-3 font-display text-section-title font-bold tracking-tight text-foreground">
          {t('message')}
        </h3>
      </div>

      <div className="relative">
        {/* Row A — left */}
        <Marquee direction="left" speed={34} pauseOnHover className="py-4">
          {rowA.map((a) => (
            <ActivityIcon key={`a-${a.activity}`} {...a} />
          ))}
        </Marquee>

        {/* Row B — right (counter direction for depth) */}
        <Marquee direction="right" speed={42} pauseOnHover className="py-4">
          {rowB.map((a) => (
            <ActivityIcon key={`b-${a.activity}`} {...a} />
          ))}
        </Marquee>

        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}
