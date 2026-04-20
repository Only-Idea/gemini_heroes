'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';
import SplitText from '@/components/ui/SplitText';

// Dynamic import for 3D component
const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const MedalScene = dynamic(() => import('@/components/three/MedalScene'), { ssr: false });

export default function MedalShowcase() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const isWebGLReady = useStore((state) => state.isWebGLReady);
  const setMedalScrollProgress = useStore((state) => state.setMedalScrollProgress);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Character-wipe entrance for titles
        gsap.from('.medal-title .char', {
          scrollTrigger: {
            trigger: '.medal-title',
            start: 'top 80%',
          },
          opacity: 0,
          x: -20,
          stagger: 0.02,
          duration: 0.8,
          ease: 'power2.out',
        });

        gsap.from('.medal-description', {
          scrollTrigger: {
            trigger: '.medal-description',
            start: 'top 85%',
          },
          opacity: 0,
          y: 20,
          duration: 1,
          ease: 'power3.out',
        });

        // Drive medal rotation via scroll progress
        gsap.to({}, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              setMedalScrollProgress(self.progress);
            },
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from('.medal-title, .medal-description', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
        });
        // Reset progress for static view
        setMedalScrollProgress(0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [setMedalScrollProgress]);

  return (
    <section 
      ref={sectionRef} 
      className="px-6 py-48 relative overflow-hidden"
      role="region"
      aria-label={t('medal.label')}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1400px] text-center relative z-10">
        <p className="font-mono text-label font-bold uppercase tracking-[0.3em] text-coral">
          03 / {t('medal.label')}
        </p>
        <h2 className="medal-title mt-6 font-display text-section-title font-bold text-foreground">
          <SplitText>{t('medal.title')}</SplitText>
        </h2>
        <p className="medal-description mx-auto mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-muted">
          {t('medal.description')}
        </p>
        
        <div className="relative mx-auto mt-20 flex aspect-square max-w-2xl items-center justify-center rounded-full bg-foreground/[0.01] border border-foreground/5 shadow-heroes overflow-hidden group">
          <div className={`w-full h-full transition-opacity duration-1000 ${isWebGLReady ? 'opacity-100' : 'opacity-0'}`}>
            <Scene cameraPos={[0, 0, 5]} shadows={true}>
              <MedalScene />
            </Scene>
          </div>
          {!isWebGLReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
              <span className="font-mono text-label font-bold uppercase tracking-widest text-muted/30">
                Crafting Your Reward...
              </span>
            </div>
          )}
          
          {/* Interactive Hint */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone">
              Scroll to Rotate
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
