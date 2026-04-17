'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';

// Dynamic imports for 3D components
const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), { ssr: false });
const MedalScene = dynamic(() => import('@/components/three/MedalScene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const t = useTranslations();
  const heroRef = useRef<HTMLDivElement>(null);
  const isWebGLReady = useStore((state) => state.isWebGLReady);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        {/* 3D Hero Orb Background - Animated transition */}
        <div className={`transition-opacity duration-1000 absolute inset-0 ${isWebGLReady ? 'opacity-100' : 'opacity-0'}`}>
          <Scene>
            <HeroOrb />
          </Scene>
        </div>

        {/* Static Placeholder (Optional, can be a subtle gradient) */}
        {!isWebGLReady && (
          <div className="absolute inset-0 bg-background flex items-center justify-center">
            <div className="h-32 w-32 rounded-full bg-gradient-heroes opacity-5 blur-3xl animate-pulse" />
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center">
          <p className="hero-reveal font-mono text-label font-bold uppercase tracking-[0.3em] text-teal/60">
            {t('hero.label')}
          </p>
          <h1 className="hero-reveal mt-8 max-w-5xl text-center font-display text-hero font-bold leading-[1.05] tracking-tight text-foreground">
            {t('hero.title')}
          </h1>
          <p className="hero-reveal mt-8 max-w-2xl text-center text-body-lg font-medium leading-[1.6] text-muted">
            {t('hero.subtitle')}
          </p>
          <div className="hero-reveal mt-12 flex flex-wrap justify-center gap-6">
            <button className="rounded-full bg-gradient-heroes px-10 py-4 font-mono text-button font-bold tracking-widest text-white shadow-xl transition-all duration-400 hover:scale-105 active:scale-95">
              {t('hero.cta_download')}
            </button>
            <button className="rounded-full border border-foreground/10 px-10 py-4 font-mono text-button font-bold tracking-widest text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground/5">
              {t('hero.cta_learn')}
            </button>
          </div>
        </div>
        
        {/* Scroll hint */}
        <div className="absolute bottom-12 flex flex-col items-center gap-3 z-10">
          <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-muted/30 uppercase">
            {t('hero.scroll')}
          </span>
          <div className="h-12 w-[1.5px] bg-gradient-to-b from-teal/20 to-transparent" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 bg-foreground/[0.02] border-y border-foreground/5">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-around gap-12 px-6 md:flex-row md:gap-0">
          {[
            { value: '3', label: t('stats.routes') },
            { value: '12', label: t('stats.activities') },
            { value: '32+', label: t('stats.countries') },
          ].map(({ value, label }) => (
            <div key={label} className="text-center group">
              <span className="block font-display text-stat font-bold text-foreground transition-transform duration-500 group-hover:scale-110">
                {value}
              </span>
              <p className="mt-2 font-mono text-label font-bold tracking-[0.2em] text-muted uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenges */}
      <section id="challenges" className="px-6 py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-label font-bold uppercase tracking-[0.3em] text-coral">
                01 / Explore
              </p>
              <h2 className="mt-4 font-display text-section-title font-bold leading-tight text-foreground">
                {t('nav.challenges')}
              </h2>
            </div>
            <p className="max-w-md text-body font-medium text-muted">
              Choose your path through the heart of Japan. Each route is a unique journey of discovery.
            </p>
          </div>
          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {[
              { name: '富士山', color: 'teal' },
              { name: '浪人', color: 'amber' },
              { name: '鉄道', color: 'coral' }
            ].map(({ name, color }) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-3xl border border-foreground/5 bg-white p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-heroes opacity-10 blur-3xl transition-opacity group-hover:opacity-20" />
                <div className="mb-10 aspect-[4/3] rounded-2xl bg-foreground/[0.03] flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/20">
                    {name[0]}
                  </div>
                </div>
                <h3 className="font-display text-subhead font-bold tracking-tight text-foreground">
                  {name}
                </h3>
                <div className="mt-4 h-1 w-0 bg-gradient-heroes transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-32 bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-mono text-label font-bold uppercase tracking-[0.3em] text-teal">
            02 / Experience
          </p>
          <h2 className="mt-4 font-display text-section-title font-bold text-foreground">
            {t('nav.features')}
          </h2>
          
          <div className="mt-20 bento-grid">
            <div className="col-span-12 lg:col-span-8 glass rounded-3xl p-12 min-h-[400px] flex flex-col justify-end">
              <div className="absolute top-12 right-12 h-24 w-24 bg-teal/10 blur-2xl rounded-full" />
              <h3 className="font-display text-subhead font-bold text-foreground">{t('features.tracking')}</h3>
              <p className="mt-4 max-w-md text-muted font-medium">Precision tracking for over 12 activity types, seamlessly integrated with your journey.</p>
            </div>
            
            <div className="col-span-12 md:col-span-6 lg:col-span-4 glass rounded-3xl p-10">
              <h3 className="font-display text-[20px] font-bold text-foreground">{t('features.map')}</h3>
              <p className="mt-2 text-muted text-sm font-medium">Beautiful 3D maps of your progress across Japan.</p>
            </div>
            
            <div className="col-span-12 md:col-span-6 lg:col-span-4 glass rounded-3xl p-10">
              <h3 className="font-display text-[20px] font-bold text-foreground">{t('features.team')}</h3>
              <p className="mt-2 text-muted text-sm font-medium">Join teams and compete in global challenges.</p>
            </div>
            
            <div className="col-span-12 lg:col-span-8 glass rounded-3xl p-10 flex items-center justify-between">
              <div>
                <h3 className="font-display text-[20px] font-bold text-foreground">{t('features.achievements')}</h3>
                <p className="mt-2 text-muted text-sm font-medium">Earn unique digital medals for every milestone.</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-amber/10 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-amber/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medal Section */}
      <section className="px-6 py-48">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="font-mono text-label font-bold uppercase tracking-[0.3em] text-coral">
            03 / {t('medal.label')}
          </p>
          <h2 className="mt-6 font-display text-section-title font-bold text-foreground">
            {t('medal.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-muted">
            {t('medal.description')}
          </p>
          
          <div className="relative mx-auto mt-20 flex aspect-square max-w-2xl items-center justify-center rounded-full bg-foreground/[0.01] border border-foreground/5 shadow-heroes overflow-hidden">
            <div className={`w-full h-full transition-opacity duration-1000 ${isWebGLReady ? 'opacity-100' : 'opacity-0'}`}>
              <Scene cameraPos={[0, 0, 5]} shadows={true}>
                <MedalScene />
              </Scene>
            </div>
            {!isWebGLReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <span className="font-mono text-label font-bold uppercase tracking-widest text-muted/30">
                  Initializing Odyssey...
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="px-6 py-32 border-t border-foreground/5 bg-white">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="font-mono text-label font-bold uppercase tracking-[0.3em] text-teal">
                04 / Impact
              </p>
              <h2 className="mt-6 font-display text-section-title font-bold text-foreground">
                {t('impact.title')}
              </h2>
              <p className="mt-8 text-body-lg font-medium text-muted leading-relaxed">
                Your journey contributes to real-world change. We partner with environmental organizations to ensure every step you take makes a difference.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="glass rounded-3xl p-10 text-center">
                <span className="block font-display text-[48px] font-bold text-foreground">10k+</span>
                <p className="mt-2 font-mono text-label font-bold tracking-widest text-teal uppercase">
                  {t('impact.trees')}
                </p>
              </div>
              <div className="glass rounded-3xl p-10 text-center">
                <span className="block font-display text-[48px] font-bold text-foreground">500+</span>
                <p className="mt-2 font-mono text-label font-bold tracking-widest text-coral uppercase">
                  {t('impact.ocean')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-heroes opacity-5" />
        <h2 className="relative font-display text-section-title font-bold text-center text-foreground max-w-4xl leading-tight">
          {t('cta.title')}
        </h2>
        <div className="relative mt-16 flex flex-wrap justify-center gap-6">
          <button className="rounded-full bg-foreground text-background px-12 py-5 font-mono text-button font-bold tracking-widest shadow-2xl transition-all duration-400 hover:scale-105 active:scale-95">
            App Store
          </button>
          <button className="rounded-full bg-white text-foreground border border-foreground/10 px-12 py-5 font-mono text-button font-bold tracking-widest shadow-xl transition-all duration-400 hover:scale-105 active:scale-95">
            Google Play
          </button>
        </div>
      </section>
    </main>
  );
}
