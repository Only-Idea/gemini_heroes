'use client';

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
 * Segmented-pill language switcher rendered as real anchors so search
 * engines see the locale alternates without executing JS. The onClick
 * just sets the NEXT_LOCALE cookie before the browser follows the link
 * (full nav, not soft) — that combination is what makes switching back
 * to the default un-prefixed locale reliable through the middleware.
 */
export default function LanguageSwitcher({
  locales = DEFAULT_LOCALES,
  size = 'compact',
  className = '',
}: LanguageSwitcherProps) {
  const currentLocale = useLocale();
  const t = useTranslations('language');
  const pathname = usePathname(); // locale-stripped path from next-intl

  const activeIndex = Math.max(
    0,
    locales.findIndex((l) => l.code === currentLocale)
  );

  const buildHref = (targetCode: string) => {
    const basePath = pathname || '/';
    return targetCode === DEFAULT_LOCALE
      ? basePath
      : `/${targetCode}${basePath === '/' ? '' : basePath}`;
  };

  const onSwitch = (e: React.MouseEvent<HTMLAnchorElement>, targetCode: string) => {
    if (targetCode === currentLocale) {
      e.preventDefault();
      return;
    }
    // Persist preference so subsequent visits land on the right locale.
    document.cookie = `NEXT_LOCALE=${targetCode}; Path=/; Max-Age=31536000; SameSite=Lax`;
    // Let the browser follow the href — full navigation runs middleware fresh.
  };

  const hPad = size === 'compact' ? 'h-9 p-0.5' : 'h-11 p-[3px]';
  const segW = size === 'compact' ? 'w-11 text-[11px]' : 'w-14 text-xs';
  const widthPx = size === 'compact' ? 44 : 56;
  const inset = size === 'compact' ? 2 : 3;

  return (
    <div
      role="group"
      aria-label={t('aria')}
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
          <a
            key={l.code}
            href={buildHref(l.code)}
            hrefLang={l.code}
            onClick={(e) => onSwitch(e, l.code)}
            aria-current={isActive ? 'true' : undefined}
            aria-label={l.label}
            className={cn(
              'relative z-10 flex h-full items-center justify-center rounded-full font-mono font-bold uppercase tracking-[0.2em] transition-colors duration-300',
              segW,
              isActive ? 'text-background' : 'text-muted hover:text-foreground'
            )}
          >
            {l.short}
          </a>
        );
      })}
    </div>
  );
}
