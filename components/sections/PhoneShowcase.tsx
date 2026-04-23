'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePlatform } from '@/hooks/usePlatform';
import SectionLabel from '@/components/ui/SectionLabel';
import FeatureCard from '@/components/sections/FeatureCard';
import AppBadge from '@/components/ui/AppBadge';

gsap.registerPlugin(ScrollTrigger);

const FEATURE_IMAGES = [
  '/images/phone/1.png',
  '/images/phone/2.png',
  '/images/phone/3.png',
  '/images/phone/4.png',
  '/images/phone/5.png',
  '/images/phone/6.png',
] as const;

export default function PhoneShowcase() {
  const t = useTranslations('features');
  const platform = usePlatform();
  const showApple = platform === 'ios' || platform === 'other';
  const showGoogle = platform === 'android' || platform === 'other';
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const features: {
    id: string;
    title: string;
    description: string;
    accent: 'teal' | 'coral' | 'amber';
    showAppBadges?: boolean;
  }[] = useMemo(
    () => [
      { id: 'maps', title: t('maps.title'), description: t('maps.description'), accent: 'teal' },
      {
        id: 'impact',
        title: t('impact.title'),
        description: t('impact.description'),
        accent: 'coral',
      },
      {
        id: 'medals',
        title: t('medals.title'),
        description: t('medals.description'),
        accent: 'amber',
        showAppBadges: true,
      },
      { id: 'teams', title: t('teams.title'), description: t('teams.description'), accent: 'teal' },
      {
        id: 'achievements',
        title: t('achievements.title'),
        description: t('achievements.description'),
        accent: 'amber',
      },
      {
        id: 'inclusivity',
        title: t('inclusivity.title'),
        description: t('inclusivity.description'),
        accent: 'coral',
        showAppBadges: true,
      },
    ],
    [t]
  );

  // Scroll-driven active feature: the card whose vertical midpoint is
  // closest to viewport center is highlighted.
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const pickClosestToCenter = () => {
        const cards = container.querySelectorAll<HTMLElement>('[data-feature-card]');
        if (cards.length === 0) return;
        const center = window.innerHeight / 2;
        let closest = 0;
        let minDist = Infinity;
        cards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          const dist = Math.abs(mid - center);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        setActiveFeatureIndex(closest);
      };

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: pickClosestToCenter,
        onRefresh: pickClosestToCenter,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [features]);

  // 150ms stagger fade-in on first entry into the viewport.
  // `clearProps: 'all'` is important so the scroll-driven active/inactive
  // Tailwind classes (opacity-100 vs opacity-40) regain control after entry.
  useEffect(() => {
    const section = sectionRef.current;
    const bento = bentoRef.current;
    if (!section || !bento) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.from(bento.querySelectorAll('.feature-card'), {
        opacity: 0,
        y: reduced ? 0 : 30,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Phone tilt: rotateY from -15 → 0 through section scroll range.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const phoneViewport = section.querySelector<HTMLElement>('[data-phone-viewport]');
    if (!phoneViewport) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        phoneViewport,
        { rotateY: -15 },
        {
          rotateY: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'center center',
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-foreground/[0.02] py-32 lg:py-64"
      role="region"
      aria-label={t('section_title')}
      suppressHydrationWarning
    >
      <div className="mx-auto max-w-[1400px] px-6" suppressHydrationWarning>
        <SectionLabel
          number={t('label').split(' / ')[0]}
          label={t('label').split(' / ')[1]}
          title={t('section_title')}
          accentColor="teal"
          className="mb-24"
        />

        <div ref={containerRef} className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Sticky Phone Viewport — 2D mockup showing the real app screenshots. */}
          <div
            data-phone-viewport
            className="lg:sticky lg:top-[20vh] flex h-[60vh] lg:h-[70vh] w-full items-center justify-center"
            style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
          >
            <div className="relative h-full aspect-[1206/2622] max-h-full">
              {/* Phone frame */}
              <div className="absolute inset-0 rounded-[48px] bg-[#0f1114] shadow-heroes ring-1 ring-white/10" />
              {/* Screen */}
              <div className="absolute inset-[10px] overflow-hidden rounded-[40px] bg-background">
                {features.map((feature, i) => (
                  <Image
                    key={feature.id}
                    src={FEATURE_IMAGES[i] ?? FEATURE_IMAGES[0]}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    priority={i === 0}
                    className={`object-cover transition-opacity duration-700 ease-out ${
                      activeFeatureIndex === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
              {/* Notch */}
              <div className="pointer-events-none absolute left-1/2 top-[22px] h-6 w-28 -translate-x-1/2 rounded-full bg-[#0f1114]" />
            </div>
          </div>

          {/* Bento Grid Features */}
          <div ref={bentoRef} className="flex flex-col gap-12 lg:gap-32">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                id={feature.id}
                index={index}
                title={feature.title}
                description={feature.description}
                accent={feature.accent}
                active={activeFeatureIndex === index}
              >
                {feature.showAppBadges && (
                  <div className="flex flex-wrap gap-2">
                    {showApple && <AppBadge store="apple" size="micro" />}
                    {showGoogle && <AppBadge store="google" size="micro" />}
                  </div>
                )}
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
