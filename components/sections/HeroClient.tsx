'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';
import { useIsMobile } from '@/hooks/useIsMobile';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const HeroOrb = dynamic(() => import('@/components/three/HeroOrb'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function HeroClient({ children }: { children: React.ReactNode }) {
  const isWebGLReady = useStore((s) => s.isWebGLReady);
  const setWebGLReady = useStore((s) => s.setWebGLReady);
  const isReducedMotion = useStore((s) => s.isReducedMotion);
  const isIntroComplete = useStore((s) => s.isIntroComplete);
  const setHeroScrollProgress = useStore((s) => s.setHeroScrollProgress);
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile && !isWebGLReady) setWebGLReady(true);
  }, [isMobile, isWebGLReady, setWebGLReady]);

  useEffect(() => {
    if (isMobile) return;
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
  }, [isReducedMotion, setHeroScrollProgress, isMobile]);

  return (
    <section
      ref={sectionRef}
      data-hero-section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
      aria-labelledby="hero-heading"
    >
      {!isMobile && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isWebGLReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Scene>
            <HeroOrb />
          </Scene>
        </div>
      )}

      {(isMobile || !isWebGLReady) && (
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
        {children}
      </div>
    </section>
  );
}
