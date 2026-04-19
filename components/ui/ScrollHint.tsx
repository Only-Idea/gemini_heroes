'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';

export default function ScrollHint() {
  const t = useTranslations();
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    })
    .to(path, {
      strokeDashoffset: -length,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="absolute bottom-12 flex flex-col items-center gap-4 z-10">
      <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-muted/30 uppercase">
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
