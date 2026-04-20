'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';
import SplitText from '@/components/ui/SplitText';
import Magnetic from '@/components/ui/Magnetic';
import ScrollHint from '@/components/ui/ScrollHint';

// Dynamic imports for 3D components
const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), { ssr: false });

export default function Hero() {
  const t = useTranslations();
  const heroRef = useRef<HTMLDivElement>(null);
  const isWebGLReady = useStore((state) => state.isWebGLReady);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Standard animations
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();

        // Label fade in
        tl.from('.hero-label', {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        });

        // Title character-by-character animation
        tl.from('.hero-title .char', {
          opacity: 0,
          y: 40,
          stagger: 0.02,
          duration: 1,
          ease: 'power4.out',
        }, '-=0.4');

        // Subtitle fade in
        tl.from('.hero-subtitle', {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.6');

        // CTA buttons fade in
        tl.from('.hero-cta', {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }, '-=0.8');

        // Scroll hint fade in
        tl.from('.hero-scroll-hint', {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        }, '-=0.5');
      });

      // Reduced motion fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from('.hero-label, .hero-title, .hero-subtitle, .hero-cta, .hero-scroll-hint', {
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 overflow-hidden"
      role="region"
      aria-label={t('label')}
    >
      {/* 3D Hero Orb Background */}
      <div className={`transition-opacity duration-1000 absolute inset-0 ${isWebGLReady ? 'opacity-100' : 'opacity-0'}`}>
        <Scene>
          <HeroOrb />
        </Scene>
      </div>

      {/* Static Placeholder */}
      {!isWebGLReady && (
        <div className="absolute inset-0 bg-background flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-gradient-heroes opacity-5 blur-3xl animate-pulse" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        <p className="hero-label font-mono text-label font-bold uppercase tracking-[0.3em] text-teal/60">
          {t('hero.label')}
        </p>
        
        <h1 className="hero-title mt-8 max-w-5xl text-center font-display text-hero font-bold leading-[1.05] tracking-tight text-foreground">
          <SplitText>{t('hero.title')}</SplitText>
        </h1>
        
        <p className="hero-subtitle mt-8 max-w-2xl text-center text-body-lg font-medium leading-[1.6] text-muted">
          {t('hero.subtitle')}
        </p>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <Magnetic strength={0.2}>
            <button className="hero-cta rounded-full bg-gradient-heroes px-10 py-4 font-mono text-button font-bold tracking-widest text-white shadow-xl transition-all duration-400 hover:scale-105 active:scale-95">
              {t('hero.cta_download')}
            </button>
          </Magnetic>
          
          <Magnetic strength={0.2}>
            <button className="hero-cta rounded-full border border-foreground/10 px-10 py-4 font-mono text-button font-bold tracking-widest text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground/5">
              {t('hero.cta_learn')}
            </button>
          </Magnetic>
        </div>
      </div>
      
      <div className="hero-scroll-hint">
        <ScrollHint />
      </div>
    </section>
  );
}
