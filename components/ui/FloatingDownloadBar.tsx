'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const DISMISS_KEY = 'heroes-download-bar-dismissed';

export default function FloatingDownloadBar() {
  const t = useTranslations('download_bar');
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      return false;
    }
  });

  // Observe Hero section exit to flip visibility.
  useEffect(() => {
    if (typeof window === 'undefined' || dismissed) return;

    const hero = document.querySelector<HTMLElement>('[data-hero-section]');
    if (hero && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0 }
      );
      obs.observe(hero);
      return () => obs.disconnect();
    }

    // Fallback: scroll-threshold if hero sentinel isn't found.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  const onDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* swallow — UX degrades, nothing more */
    }
  };

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label={t('label')}
      className={[
        'pointer-events-auto fixed inset-x-0 bottom-4 z-50 mx-auto w-[calc(100%-24px)] max-w-sm md:hidden',
        'transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0',
      ].join(' ')}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-heroes backdrop-blur-md">
        {/* Brand gradient accent on the left edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-heroes"
        />

        <div className="flex items-center gap-3 px-4 py-3 pl-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-heroes p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
              <span className="font-display text-base font-bold text-foreground">H</span>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
              Heroes App
            </span>
            <span className="truncate font-medium text-sm text-foreground">{t('label')}</span>
          </div>

          <a
            href="#"
            aria-label="Download on the App Store"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-foreground text-background transition-colors hover:bg-foreground/90"
          >
            <AppleGlyph />
          </a>
          <a
            href="#"
            aria-label="Get it on Google Play"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-white text-foreground transition-colors hover:bg-foreground/5"
          >
            <PlayGlyph />
          </a>

          <button
            onClick={onDismiss}
            className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-foreground/5 hover:text-foreground"
            aria-label="Dismiss"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16.5 1.5c0 1.2-.5 2.3-1.3 3.1-.9.9-2.2 1.6-3.3 1.5-.1-1.1.4-2.3 1.2-3.1.9-.9 2.2-1.5 3.4-1.5zM20 17.8c-.5 1.1-1.1 2.2-1.9 3.1-1 1.2-2 2-3.4 2-1.3 0-1.8-.8-3.3-.8-1.6 0-2.1.8-3.4.9-1.3 0-2.4-1.1-3.3-2.2C2 18.6 1.2 14.4 3 11.6c.9-1.4 2.3-2.2 3.9-2.2 1.3 0 2.5.8 3.3.8.7 0 2.3-1 3.9-.8.7 0 2.6.3 3.9 2.1-.1 0-2.3 1.3-2.3 4 0 3.1 2.7 4.1 2.3 2.3z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <defs>
        <linearGradient id="fdb-play" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#375E65" />
          <stop offset="1" stopColor="#F2BE5E" />
        </linearGradient>
      </defs>
      <path
        fill="url(#fdb-play)"
        d="M3.5 2.5 14.3 12 3.5 21.5c-.3-.2-.5-.5-.5-.9V3.4c0-.4.2-.7.5-.9z"
      />
      <path fill="#EC7A5C" d="M17.7 8.6 14.3 12l3.4 3.4 2.7-1.5c1-.6 1-2.1 0-2.7z" />
      <path fill="#F2BE5E" d="m14.3 12-10.8 9.5c.3.2.7.2 1 0l10.2-5.8z" />
    </svg>
  );
}
