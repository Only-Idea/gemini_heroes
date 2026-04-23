import { cn } from '@/lib/utils';

interface AppBadgeProps {
  store: 'apple' | 'google';
  size?: 'micro' | 'default';
  className?: string;
}

/**
 * Compact App Store / Google Play badge. The `micro` size is meant to be
 * embedded inside feature cards; `default` is for the primary CTA areas.
 *
 * We use Unicode/SVG glyphs rather than the trademarked store artwork so
 * we can ship without waiting on legal assets; the layout can later be
 * swapped for the official badges.
 */
export default function AppBadge({ store, size = 'default', className = '' }: AppBadgeProps) {
  const isMicro = size === 'micro';
  const label = store === 'apple' ? 'App Store' : 'Google Play';
  const eyebrow = store === 'apple' ? 'Download on the' : 'Get it on';

  return (
    <a
      href="#"
      aria-label={`Download on ${label}`}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/[0.02] transition-colors hover:border-foreground/50 hover:bg-foreground/5',
        isMicro ? 'h-7 px-3 text-[10px]' : 'h-11 px-4 text-xs',
        className
      )}
    >
      <span className={cn('flex items-center justify-center', isMicro ? 'h-3.5 w-3.5' : 'h-5 w-5')}>
        {store === 'apple' ? <AppleGlyph /> : <PlayGlyph />}
      </span>
      <span className="flex flex-col leading-tight text-left">
        <span
          className={cn(
            'font-mono uppercase tracking-[0.22em] text-muted',
            isMicro ? 'text-[8px]' : 'text-[9px]'
          )}
        >
          {eyebrow}
        </span>
        <span
          className={cn(
            'font-medium tracking-tight text-foreground',
            isMicro ? 'text-[11px]' : 'text-sm'
          )}
        >
          {label}
        </span>
      </span>
    </a>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M16.5 1.5c0 1.2-.5 2.3-1.3 3.1-.9.9-2.2 1.6-3.3 1.5-.1-1.1.4-2.3 1.2-3.1.9-.9 2.2-1.5 3.4-1.5zM20 17.8c-.5 1.1-1.1 2.2-1.9 3.1-1 1.2-2 2-3.4 2-1.3 0-1.8-.8-3.3-.8-1.6 0-2.1.8-3.4.9-1.3 0-2.4-1.1-3.3-2.2C2 18.6 1.2 14.4 3 11.6c.9-1.4 2.3-2.2 3.9-2.2 1.3 0 2.5.8 3.3.8.7 0 2.3-1 3.9-.8.7 0 2.6.3 3.9 2.1-.1 0-2.3 1.3-2.3 4 0 3.1 2.7 4.1 2.3 2.3z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <defs>
        <linearGradient id="app-play-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#375E65" />
          <stop offset="1" stopColor="#F2BE5E" />
        </linearGradient>
      </defs>
      <path
        fill="url(#app-play-g1)"
        d="M3.5 2.5 14.3 12 3.5 21.5c-.3-.2-.5-.5-.5-.9V3.4c0-.4.2-.7.5-.9z"
      />
      <path fill="#EC7A5C" d="M17.7 8.6 14.3 12l3.4 3.4 2.7-1.5c1-.6 1-2.1 0-2.7z" />
      <path fill="#F2BE5E" d="m14.3 12-10.8 9.5c.3.2.7.2 1 0l10.2-5.8z" />
      <path fill="#375E65" d="M14.3 12 4.5 2.7c-.3-.2-.7-.2-1 0l10.8 9.3z" />
    </svg>
  );
}
