'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function DownloadBar() {
  const t = useTranslations('download_bar');
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (e.g., 500px)
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full p-4 transition-transform duration-500 md:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-charcoal/90 px-5 py-4 text-ivory backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-heroes p-0.5">
             <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-charcoal">
                <span className="font-display text-lg font-bold">H</span>
             </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-50">
              Heroes App
            </span>
            <span className="font-body text-sm font-medium leading-tight">
              {t('label')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex h-10 items-center justify-center rounded-full bg-ivory px-5 font-mono text-[11px] font-bold tracking-widest text-charcoal shadow-lg active:scale-95 transition-transform">
             GET
          </button>
          
          <button 
            onClick={() => setIsDismissed(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white"
            aria-label="Dismiss"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
