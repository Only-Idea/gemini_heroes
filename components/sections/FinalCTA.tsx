'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotionAnimation } from '@/hooks/useReducedMotionAnimation';
import { usePlatform } from '@/hooks/usePlatform';
import { STORE_LINKS } from '@/lib/storeLinks';
import TypewriterText from '@/components/ui/TypewriterText';
import StoreBadge from '@/components/ui/StoreBadge';
import QRCode from '@/components/ui/QRCode';
import GradientButton from '@/components/ui/GradientButton';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const t = useTranslations('cta');
  const sectionRef = useRef<HTMLElement>(null);
  const [headlineReady, setHeadlineReady] = useState(false);
  const platform = usePlatform();
  const showApple = platform === 'ios' || platform === 'other';
  const showGoogle = platform === 'android' || platform === 'other';

  const handleInstallClick = () => {
    if (platform === 'ios') {
      window.open(STORE_LINKS.apple, '_blank', 'noopener,noreferrer');
    } else if (platform === 'android') {
      window.open(STORE_LINKS.google, '_blank', 'noopener,noreferrer');
    }
  };

  // Gate the typewriter on the section being in view (not mount).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHeadlineReady(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useReducedMotionAnimation(
    sectionRef,
    () => {
      gsap.from('.cta-subline', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.6,
      });
      gsap.from('.cta-primary', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0,
        y: 24,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8,
      });
      gsap.from('.cta-store', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 1.0,
      });
      gsap.from('.cta-qr', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2,
      });
    },
    () => {
      gsap.from('.cta-subline, .cta-primary, .cta-store, .cta-qr', {
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }
  );

  return (
    <section
      ref={sectionRef}
      id="download"
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-background px-6 py-32 scroll-mt-24"
      aria-labelledby="cta-heading"
    >
      {/* Distant Hero Orb callback — a subtle gradient orb bookending the journey */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-heroes opacity-[0.08] blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/5" />
      </div>

      {/* Decorative side glows */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal/10 blur-[100px]" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-coral/10 blur-[100px]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-teal">
          {t('eyebrow')}
        </p>

        <h2 id="cta-heading" className="mt-6 font-display text-[clamp(40px,8vw,88px)] font-bold leading-[1.05] tracking-tight text-foreground">
          <TypewriterText start={headlineReady} speed={55} cursor>
            {t('title')}
          </TypewriterText>
        </h2>

        <p className="cta-subline mt-8 max-w-xl text-body-lg font-medium text-muted">
          {t('subline')}
        </p>

        {(platform === 'ios' || platform === 'android') && (
          <div className="cta-primary mt-10">
            <GradientButton
              variant="primary"
              size="lg"
              className="cta-pulse [animation:cta-pulse_3.6s_ease-in-out_infinite]"
              onClick={handleInstallClick}
            >
              {t('primary')}
            </GradientButton>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {showApple && <StoreBadge store="apple" className="cta-store" />}
          {showGoogle && <StoreBadge store="google" className="cta-store" />}
        </div>

        <div className="cta-qr mt-12 flex flex-col items-center justify-center gap-10 sm:flex-row sm:items-start sm:gap-12">
          {showApple && (
            <QRCode
              store="apple"
              caption={platform === 'other' ? 'App Store' : t('qr_label')}
              className="text-foreground"
            />
          )}
          {showGoogle && (
            <QRCode
              store="google"
              caption={platform === 'other' ? 'Google Play' : t('qr_label')}
              className="text-foreground"
            />
          )}
        </div>
      </div>
    </section>
  );
}
