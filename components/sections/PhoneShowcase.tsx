'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';

// Dynamic imports for 3D components
const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const PhoneModel = dynamic(() => import('@/components/three/PhoneModel'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 'maps',
    title: 'Interactive Maps',
    description: 'Explore Japan with high-fidelity Mapbox maps in three distinct styles.',
    accent: 'teal',
  },
  {
    id: 'impact',
    title: 'Real-time Impact',
    description: 'Track your steps as they translate into trees planted and plastic removed.',
    accent: 'coral',
  },
  {
    id: 'medals',
    title: 'Physical Medals',
    description: 'Earn premium physical artifacts shipped globally upon completion.',
    accent: 'amber',
  },
  {
    id: 'teams',
    title: 'Team Journeys',
    description: 'Collaborate with friends in real-time chat and shared leaderboards.',
    accent: 'teal',
  },
  {
    id: 'achievements',
    title: 'Global Achievements',
    description: 'Unlock 10 categories of achievements with 5 rarity tiers.',
    accent: 'amber',
  },
  {
    id: 'inclusivity',
    title: '12 Activity Types',
    description: 'Whether you walk, run, or roll, every movement counts.',
    accent: 'coral',
  },
];

export default function PhoneShowcase() {
  const t = useTranslations('nav');
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [shouldMountScene, setShouldMountScene] = useState(false);
  const isWebGLReady = useStore((state) => state.isWebGLReady);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldMountScene(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      features.forEach((feature, index) => {
        ScrollTrigger.create({
          trigger: `#feature-${feature.id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive) setActiveFeatureIndex(index);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="features" 
      className="relative bg-foreground/[0.02] py-32 lg:py-64"
      role="region"
      aria-label={t('features')}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-24">
          <p className="font-mono text-label font-bold uppercase tracking-[0.3em] text-teal">
            02 / Experience
          </p>
          <h2 className="mt-4 font-display text-section-title font-bold text-foreground">
            The Digital Companion
          </h2>
        </div>

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
              <div
                key={feature.id}
                id={`feature-${feature.id}`}
                className={`group relative glass rounded-[24px] p-10 transition-all duration-700 ${
                  activeFeatureIndex === index ? 'opacity-100 translate-x-4 border-white/20 shadow-2xl scale-105' : 'opacity-40 border-white/5 grayscale pointer-events-none'
                }`}
              >
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
                  activeFeatureIndex === index ? 'scale-150 shadow-[0_0_15px_rgba(var(--color-teal-rgb),0.5)]' : 'scale-0'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
