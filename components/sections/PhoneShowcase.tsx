'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';
import SectionLabel from '@/components/ui/SectionLabel';
import GlassCard from '@/components/ui/GlassCard';

// Dynamic imports for 3D components
const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const PhoneModel = dynamic(() => import('@/components/three/PhoneModel'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function PhoneShowcase() {
  const t = useTranslations('features');
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [shouldMountScene, setShouldMountScene] = useState(false);
  const isWebGLReady = useStore((state) => state.isWebGLReady);

  const features: { id: string; title: string; description: string; accent: 'teal' | 'coral' | 'amber' }[] = useMemo(() => [
    {
      id: 'maps',
      title: t('maps.title'),
      description: t('maps.description'),
      accent: 'teal',
    },
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
    },
    {
      id: 'teams',
      title: t('teams.title'),
      description: t('teams.description'),
      accent: 'teal',
    },
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
    },
  ], [t]);

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
          <div className="lg:sticky lg:top-[20vh] h-[60vh] lg:h-[70vh] w-full rounded-3xl overflow-hidden glass border border-white/10 shadow-heroes">
            <div className={`w-full h-full transition-opacity duration-1000 ${shouldMountScene && isWebGLReady ? 'opacity-100' : 'opacity-0'}`}>
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
          <div className="flex flex-col gap-12 lg:gap-32">
            {features.map((feature, index) => (
              <GlassCard
                key={feature.id}
                glowColor={feature.accent}
                data-feature-card
                className={`transition-all duration-700 ${
                  activeFeatureIndex === index ? 'opacity-100 translate-x-4 border-white/40 shadow-2xl scale-105' : 'opacity-40 border-white/5 grayscale'
                }`}
              >
                <div id={`feature-${feature.id}`} className="absolute top-0 left-0 w-full h-1" />
                <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-${feature.accent}`}>
                  Feature / 0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-subhead font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-md text-muted font-medium leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Indicator dot */}
                <div className={`absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-500 bg-${feature.accent} ${
                  activeFeatureIndex === index ? 'scale-150 shadow-[0_0_15px_rgba(var(--glow-rgb),0.5)]' : 'scale-0'
                }`} />
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
