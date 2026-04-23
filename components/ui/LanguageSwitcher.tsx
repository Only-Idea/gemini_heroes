'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  /** Supported locales shown in the segmented control. */
  locales?: { code: string; short: string; label: string }[];
  /** Use `compact` in tight spots (navbar), `default` for wider layouts. */
  size?: 'compact' | 'default';
  className?: string;
}

const DEFAULT_LOCALES = [
  { code: 'ja', short: 'JA', label: '日本語' },
  { code: 'en', short: 'EN', label: 'English' },
];

const DEFAULT_LOCALE = 'ja';

/**
 * Elegant segmented-pill language switcher. Uses next-intl's locale-aware
 * router so switching to the default locale correctly strips the `/en`
 * prefix (the bug with "JA not working" was the plain Next router fighting
 * the NEXT_LOCALE cookie set by middleware).
 */
export default function LanguageSwitcher({
  locales = DEFAULT_LOCALES,
  size = 'compact',
  className = '',
}: LanguageSwitcherProps) {
  const currentLocale = useLocale();
  const t = useTranslations('language');
  const pathname = usePathname(); // locale-stripped path from next-intl
  const [isPending, startTransition] = useTransition();

  const activeIndex = Math.max(
    0,
    locales.findIndex((l) => l.code === currentLocale)
  );

  const go = (targetCode: string) => {
    if (targetCode === currentLocale) return;
    const basePath = pathname || '/';
    const target =
      targetCode === DEFAULT_LOCALE
        ? basePath
        : `/${targetCode}${basePath === '/' ? '' : basePath}`;

    startTransition(() => {
      // Use a full navigation so the middleware re-runs with the right
      // cookie and locale — in-app soft navigation was not reliably
      // switching back to the default (un-prefixed) locale here.
      if (typeof window !== 'undefined') {
        // Write the cookie up-front so the middleware picks up the intent
        // even during a fast client-side re-request.
        document.cookie = `NEXT_LOCALE=${targetCode}; Path=/; Max-Age=31536000; SameSite=Lax`;
        window.location.assign(target);
      }
    });
  };

  const hPad = size === 'compact' ? 'h-9 p-0.5' : 'h-11 p-[3px]';
  const segW = size === 'compact' ? 'w-11 text-[11px]' : 'w-14 text-xs';
  const widthPx = size === 'compact' ? 44 : 56;
  const inset = size === 'compact' ? 2 : 3;

  return (
    <div
      role="group"
      aria-label={t('aria')}
      aria-busy={isPending || undefined}
      className={cn(
        'relative inline-flex items-center rounded-full border border-foreground/15 bg-foreground/[0.03] backdrop-blur-sm',
        hPad,
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute rounded-full bg-foreground shadow-heroes transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{
          width: `${widthPx}px`,
          top: inset,
          bottom: inset,
          left: inset,
          transform: `translateX(${activeIndex * widthPx}px)`,
        }}
      />

      {locales.map((l) => {
        const isActive = l.code === currentLocale;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => go(l.code)}
            aria-pressed={isActive}
            aria-label={l.label}
            disabled={isPending}
            className={cn(
              'relative z-10 flex h-full items-center justify-center rounded-full font-mono font-bold uppercase tracking-[0.2em] transition-colors duration-300',
              segW,
              isActive ? 'text-background' : 'text-muted hover:text-foreground',
              'disabled:cursor-wait'
            )}
          >
            {l.short}
          </button>
        );
      })}
    </div>
  );
}
