'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionAnimation } from '@/hooks/useReducedMotionAnimation';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactSection() {
  const t = useTranslations('nav');
  const sectionRef = useRef<HTMLElement>(null);

  useReducedMotionAnimation(
    sectionRef,
    () => {
      gsap.from('.impact-reveal', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.impact-viz', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      });
    },
    () => {
      gsap.from('.impact-reveal, .impact-viz', {
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    },
  );

  return (
    <section 
      ref={sectionRef} 
      id="impact" 
      className="relative px-6 py-32 lg:py-48 bg-white overflow-hidden"
      role="region"
      aria-label={t('impact')}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Visual Side */}
          <div className="impact-viz relative aspect-square lg:aspect-[4/5] rounded-[40px] overflow-hidden bg-foreground/[0.03] flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-coral/5 opacity-50" />
             
             {/* Simple geometric representation of "Impact" */}
             <div className="relative w-2/3 h-2/3">
                <div className="absolute top-0 left-0 w-full h-full rounded-full border border-teal/20 animate-[spin_20s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border border-coral/20 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                   <div className="h-20 w-20 rounded-full bg-gradient-heroes opacity-20 blur-2xl animate-pulse" />
                   <span className="font-display text-4xl font-black text-foreground opacity-10 uppercase tracking-tighter">Impact</span>
                </div>
             </div>
          </div>

          {/* Copy Side */}
          <div className="flex flex-col items-start">
            <p className="impact-reveal font-mono text-label font-bold uppercase tracking-[0.3em] text-teal">
              03 / Path of Purpose
            </p>
            <h2 className="impact-reveal mt-6 font-display text-section-title font-bold leading-tight text-foreground">
              Every Step, <br />A Lasting Legacy.
            </h2>
            <p className="impact-reveal mt-8 text-body-lg font-medium text-muted leading-relaxed max-w-xl">
              Heroes transcends fitness by weaving environmental stewardship into every challenge. We partner with global reforestation and ocean cleanup organizations to ensure your sweat equity translates into real-world change.
            </p>

            <div className="mt-16 grid grid-cols-2 gap-8 w-full">
              <div className="impact-reveal group">
                <span className="block font-display text-[64px] font-bold text-foreground leading-none">
                  <AnimatedCounter value="10250" duration={2.5} />
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_8px_var(--color-teal)]" />
                  <p className="font-mono text-[11px] font-bold tracking-widest text-muted uppercase">
                    Trees Planted
                  </p>
                </div>
              </div>

              <div className="impact-reveal group">
                <span className="block font-display text-[64px] font-bold text-foreground leading-none">
                  <AnimatedCounter value="580" duration={2} />
                  <span className="text-2xl ml-1 text-stone">kg</span>
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-coral shadow-[0_0_8px_var(--color-coral)]" />
                  <p className="font-mono text-[11px] font-bold tracking-widest text-muted uppercase">
                    Plastic Removed
                  </p>
                </div>
              </div>
            </div>

            <button className="impact-reveal mt-16 rounded-full border border-foreground/10 px-10 py-4 font-mono text-button font-bold tracking-widest text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground/5">
              View Audit Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
