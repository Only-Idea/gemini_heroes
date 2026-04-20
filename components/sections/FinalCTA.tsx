'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/ui/SplitText';
import Magnetic from '@/components/ui/Magnetic';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const t = useTranslations('cta');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Typewriter effect using SplitText characters
        gsap.from('.cta-title .char', {
          scrollTrigger: {
            trigger: '.cta-title',
            start: 'top 80%',
          },
          opacity: 0,
          stagger: 0.05,
          duration: 0.1,
          ease: 'none',
        });

        // Reveal buttons
        gsap.from('.cta-button-container', {
          scrollTrigger: {
            trigger: '.cta-button-container',
            start: 'top 90%',
          },
          opacity: 0,
          y: 20,
          duration: 1,
          ease: 'power3.out',
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from('.cta-title, .cta-button-container', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 overflow-hidden bg-background"
      role="region"
      aria-label={t('title')}
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-heroes opacity-5" />
      
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="cta-title font-display text-[clamp(40px,8vw,80px)] font-bold leading-[1.1] tracking-tight text-foreground">
          <SplitText>{t('title')}</SplitText>
        </h2>

        <div className="cta-button-container mt-16 flex flex-wrap justify-center gap-6">
          <Magnetic strength={0.15}>
            <button className="rounded-full bg-foreground px-12 py-5 font-mono text-button font-bold tracking-widest text-background shadow-2xl transition-all duration-400 hover:scale-105 active:scale-95">
              App Store
            </button>
          </Magnetic>
          
          <Magnetic strength={0.15}>
            <button className="rounded-full border border-foreground/10 bg-white px-12 py-5 font-mono text-button font-bold tracking-widest text-foreground shadow-xl transition-all duration-400 hover:scale-105 active:scale-95">
              Google Play
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Decorative Gradient Blob */}
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal/10 blur-[100px]" />
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-coral/10 blur-[100px]" />
    </section>
  );
}
