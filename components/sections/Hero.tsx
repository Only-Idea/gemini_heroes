'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';
import AnimatedHeadline from '@/components/ui/AnimatedHeadline';
import TypewriterText from '@/components/ui/TypewriterText';
import GradientButton from '@/components/ui/GradientButton';
import ScrollHint from '@/components/ui/ScrollHint';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations();
  const isWebGLReady = useStore((s) => s.isWebGLReady);
  const isReducedMotion = useStore((s) => s.isReducedMotion);
  const isIntroComplete = useStore((s) => s.isIntroComplete);
  const setHeroScrollProgress = useStore((s) => s.setHeroScrollProgress);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax fade + drive heroScrollProgress for the orb dissolve.
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      if (!isReducedMotion) {
        gsap.to(content, {
          y: -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=50%',
            scrub: 0.5,
          },
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => setHeroScrollProgress(self.progress),
      });
    }, section);

    return () => ctx.revert();
  }, [isReducedMotion, setHeroScrollProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
      role="region"
      aria-label={t('hero.label')}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isWebGLReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Scene>
          <HeroOrb />
        </Scene>
      </div>

      {!isWebGLReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <div className="h-32 w-32 animate-pulse rounded-full bg-gradient-heroes opacity-5 blur-3xl" />
        </div>
      )}

      <div
        ref={contentRef}
        className={`relative z-10 flex max-w-5xl flex-col items-center text-center ${
          isIntroComplete ? 'hero-ready' : ''
        }`}
      >
        <p className="font-mono text-label font-bold uppercase tracking-[0.3em] text-teal">
          <TypewriterText start={isIntroComplete} delay={100} speed={45}>
            {t('hero.label')}
          </TypewriterText>
        </p>

        <h1 className="mt-8 font-display text-hero font-bold leading-[1.05] tracking-tight text-foreground">
          <span className="animate-hero-shimmer bg-gradient-heroes bg-[length:200%_200%] bg-clip-text text-transparent [animation:hero-shimmer_8s_ease-in-out_infinite]">
            <AnimatedHeadline start={isIntroComplete} delay={420} stagger={0.035}>
              {t('hero.title')}
            </AnimatedHeadline>
          </span>
        </h1>

        <p
          className="hero-rise mt-8 max-w-2xl text-body-lg font-medium text-muted"
          style={{ animationDelay: '800ms' }}
        >
          {t('hero.subtitle')}
        </p>

        <div
          className="hero-rise mt-12 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: '1000ms' }}
        >
          <GradientButton variant="primary" size="lg" aria-label={t('hero.cta_download')}>
            {t('hero.cta_download')}
          </GradientButton>
          <GradientButton variant="ghost" size="lg" aria-label={t('hero.cta_learn')}>
            {t('hero.cta_learn')}
          </GradientButton>
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}
