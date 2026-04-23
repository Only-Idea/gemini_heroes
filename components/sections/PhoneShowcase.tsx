'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';
import SectionLabel from '@/components/ui/SectionLabel';
import FeatureCard from '@/components/sections/FeatureCard';
import AppBadge from '@/components/ui/AppBadge';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const PhoneModel = dynamic(() => import('@/components/three/PhoneModel'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function PhoneShowcase() {
  const t = useTranslations('features');
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [shouldMountScene, setShouldMountScene] = useState(false);
  const isWebGLReady = useStore((state) => state.isWebGLReady);

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

  // Lazy-mount the Scene once the section is close to view.
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldMountScene(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
          {/* Sticky Phone Viewport */}
          <div
            data-phone-viewport
            className="lg:sticky lg:top-[20vh] h-[60vh] lg:h-[70vh] w-full rounded-3xl overflow-hidden glass border border-white/10 shadow-heroes"
            style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
          >
            <div
              className={`w-full h-full transition-opacity duration-1000 ${
                shouldMountScene && isWebGLReady ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {shouldMountScene && (
                <Scene cameraPos={[0, 0, 8]}>
                  <PhoneModel activeFeatureIndex={activeFeatureIndex} />
                </Scene>
              )}
            </div>
            {!(shouldMountScene && isWebGLReady) && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <span className="font-mono text-label font-bold uppercase tracking-widest text-muted/30">
                  Initializing Hardware...
                </span>
              </div>
            )}
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
                    <AppBadge store="apple" size="micro" />
                    <AppBadge store="google" size="micro" />
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
