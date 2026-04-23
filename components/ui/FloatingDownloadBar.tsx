'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePlatform } from '@/hooks/usePlatform';
import { STORE_LINKS } from '@/lib/storeLinks';

const DISMISS_KEY = 'heroes-download-bar-dismissed';

export default function FloatingDownloadBar() {
  const t = useTranslations('download_bar');
  const tCommon = useTranslations('common');
  const platform = usePlatform();
  const showApple = platform === 'ios' || platform === 'other';
  const showGoogle = platform === 'android' || platform === 'other';
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
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white">
            <Image
              src="/images/logo/logo.png"
              alt="Heroes"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
              {t('app_name')}
            </span>
            <span className="truncate font-medium text-sm text-foreground">{t('label')}</span>
          </div>

          {showApple && (
            <a
              href={STORE_LINKS.apple}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              className="inline-flex items-center transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Image
                src="/images/buttons/ios_button.webp"
                alt="Download on the App Store"
                width={314}
                height={100}
                className="h-9 w-auto"
              />
            </a>
          )}
          {showGoogle && (
            <a
              href={STORE_LINKS.google}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className="inline-flex items-center transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Image
                src="/images/buttons/android_button.webp"
                alt="Get it on Google Play"
                width={336}
                height={100}
                className="h-9 w-auto"
              />
            </a>
          )}

          <button
            onClick={onDismiss}
            className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-foreground/5 hover:text-foreground"
            aria-label={tCommon('dismiss')}
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

