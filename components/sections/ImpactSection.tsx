'use client';

import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionAnimation } from '@/hooks/useReducedMotionAnimation';
import SectionLabel from '@/components/ui/SectionLabel';
import ImpactCounter from '@/components/ui/ImpactCounter';
import TreeIllustration from '@/components/ui/TreeIllustration';

gsap.registerPlugin(ScrollTrigger);

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
      aria-labelledby="impact-heading"
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
              headingId="impact-heading"
            />

            <div className="mt-12 w-full">
              <ImpactCounter
                value="1000"
                unit={t('common.unit_ki')}
                label={t('impact.trees')}
                eyebrow={t('impact.goal_eyebrow')}
                progressLabel={t('impact.goal_note')}
                accent="teal"
              />
            </div>

            <a
              href="https://morinoproject.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-8 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/60 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {t('impact.button')}
              <span aria-hidden="true" className="text-base leading-none">→</span>
            </a>
          </div>

          {/* Viz column — tree illustration slides from right */}
          <div
            ref={vizRef}
            className="relative aspect-square lg:aspect-[4/5] rounded-[40px] overflow-hidden bg-gradient-to-b from-teal/[0.06] to-teal/[0.02] border border-foreground/5 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal/[0.04] to-transparent" />
            <TreeIllustration
              triggerRef={vizRef as React.RefObject<Element | null>}
              className="relative z-10 h-[85%] w-[85%]"
            />
            {/* Ground line */}
            <div className="absolute bottom-[14%] left-[12%] right-[12%] h-px bg-foreground/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
