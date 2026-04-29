'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { useStore } from '@/store/useStore';
import { useIsMobile } from '@/hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHint() {
  const t = useTranslations();
  const pathRef = useRef<SVGPathElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const isIntroComplete = useStore((s) => s.isIntroComplete);
  const isMobile = useIsMobile();

  // Continuous path draw — desktop only. On mobile this 3s ticker runs
  // forever in the background; the hint fades out shortly anyway.
  useEffect(() => {
    if (isMobile) return;
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const pathTl = gsap.timeline({ repeat: -1 });
    pathTl
      .to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' })
      .to(path, { strokeDashoffset: -length, duration: 1.5, ease: 'power2.inOut' });
    return () => {
      pathTl.kill();
    };
  }, [isMobile]);

  // Pre-intro: hold the hint invisible.
  useEffect(() => {
    if (!rootRef.current || isIntroComplete) return;
    gsap.set(rootRef.current, { opacity: 0, y: 16 });
  }, [isIntroComplete]);

  // Intro fade-up after loader has exited, then scroll-linked fade takes over.
  useEffect(() => {
    if (!isIntroComplete || !rootRef.current) return;
    let fadeTween: gsap.core.Tween | null = null;
    const intro = gsap.to(rootRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.2,
      ease: 'power3.out',
      onComplete: () => {
        if (!rootRef.current) return;
        fadeTween = gsap.to(rootRef.current, {
          opacity: 0,
          y: 16,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: () => window.innerHeight * 0.5,
            scrub: 0.4,
          },
        });
      },
    });
    return () => {
      intro.kill();
      fadeTween?.scrollTrigger?.kill();
      fadeTween?.kill();
    };
  }, [isIntroComplete]);

  return (
    <div
      ref={rootRef}
      className="absolute bottom-12 flex flex-col items-center gap-4 z-10"
    >
      <span className="font-mono text-[13px] font-bold tracking-[0.3em] text-foreground/70 uppercase">
        {t('hero.scroll')}
      </span>
      <div className="relative h-16 w-8 flex items-center justify-center">
        <svg
          width="20"
          height="60"
          viewBox="0 0 20 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static Background Path */}
          <path
            d="M10 0V60"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-teal/10"
          />
          {/* Animated Path */}
          <path
            ref={pathRef}
            d="M10 0V60"
            stroke="url(#gradient-scroll)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient-scroll" x1="10" y1="0" x2="10" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#375E65" stopOpacity="0" />
              <stop offset="0.5" stopColor="#F2BE5E" />
              <stop offset="1" stopColor="#EC7A5C" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
