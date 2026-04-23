'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionAnimation } from '@/hooks/useReducedMotionAnimation';
import SectionLabel from '@/components/ui/SectionLabel';
import ImpactCounter from '@/components/ui/ImpactCounter';
import TreeIllustration from '@/components/ui/TreeIllustration';
import WaveAnimation from '@/components/ui/WaveAnimation';

gsap.registerPlugin(ScrollTrigger);

const partners = ['One Tree Planted', 'Ocean Conservancy', 'Re:earth', 'Blue Planet', '4Ocean'];

export default function ImpactSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const vizRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useReducedMotionAnimation(
    sectionRef,
    () => {
      // Split-layout entry: copy slides from left, viz from right.
      gsap.from(copyRef.current, {
        x: -60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from(vizRef.current, {
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.partner-logo', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.partner-row', start: 'top 85%' },
      });
    },
    () => {
      gsap.from([copyRef.current, vizRef.current], {
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }
  );

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative px-6 py-32 lg:py-48 bg-white overflow-hidden"
      role="region"
      aria-label={t('impact.title')}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Copy column — slides from left */}
          <div ref={copyRef} className="flex flex-col items-start">
            <SectionLabel
              number="03"
              label={t('impact.eyebrow')}
              title={<>{t('impact.title')}</>}
              description={t('impact.description')}
              accentColor="teal"
            />

            <div className="mt-12 grid w-full grid-cols-1 gap-10">
              <ImpactCounter
                value="10250"
                label={t('impact.trees')}
                accent="teal"
                progress={0.68}
                progressLabel={t('impact.goal_trees')}
              />
              <div className="relative isolate overflow-hidden rounded-3xl border border-coral/10 bg-coral/[0.03] p-6">
                <WaveAnimation className="-z-10 opacity-80" colorVar="--color-coral" />
                <ImpactCounter
                  value="580"
                  label={t('impact.ocean')}
                  unit="kg"
                  accent="coral"
                  progress={0.42}
                  progressLabel={t('impact.goal_ocean')}
                />
              </div>
            </div>

            <button className="mt-12 rounded-full border border-foreground/15 px-8 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/60 hover:bg-foreground/5">
              {t('impact.button')}
            </button>
          </div>

          {/* Viz column — slides from right */}
          <div
            ref={vizRef}
            className="relative aspect-square lg:aspect-[4/5] rounded-[40px] overflow-hidden bg-gradient-to-b from-teal/[0.05] to-coral/[0.05] border border-foreground/5 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal/[0.03] to-coral/[0.03]" />
            <TreeIllustration
              triggerRef={vizRef as React.RefObject<Element | null>}
              className="relative z-10 h-[85%] w-[85%]"
            />
            {/* Horizon line */}
            <div className="absolute bottom-[14%] left-0 right-0 h-px bg-foreground/5" />
            {/* Subtle wave along the horizon (ocean stat visual callback) */}
            <div className="absolute bottom-0 left-0 right-0 h-[16%]">
              <WaveAnimation className="opacity-60" colorVar="--color-coral" />
            </div>
          </div>
        </div>

        {/* Partner logos row */}
        <div className="partner-row mt-24 border-t border-foreground/5 pt-10">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-muted text-center">
            {t('impact.partners_heading')}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map((name) => (
              <li
                key={name}
                className="partner-logo font-display text-sm font-bold tracking-tight text-foreground/40 transition-colors hover:text-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
