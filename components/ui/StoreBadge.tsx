'use client';

import { cn } from '@/lib/utils';

interface StoreBadgeProps {
  store: 'apple' | 'google';
  href?: string;
  className?: string;
}

/**
 * Full-size App Store / Google Play badge for the final CTA. Uses
 * rendered-in-house glyphs and type so we don't have to ship the
 * trademarked raster artwork — structure matches the official badges
 * so we can swap in the licensed SVG later without layout churn.
 */
export default function StoreBadge({ store, href = '#', className = '' }: StoreBadgeProps) {
  const eyebrow = store === 'apple' ? 'Download on the' : 'Get it on';
  const name = store === 'apple' ? 'App Store' : 'Google Play';
  return (
    <a
      href={href}
      aria-label={`Download Heroes on ${name}`}
      className={cn(
        'group inline-flex h-14 items-center gap-3 rounded-2xl border border-foreground/20 bg-foreground px-5 text-background shadow-heroes transition-all duration-300',
        'hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(15,17,20,0.45)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-background',
        className
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center">
        {store === 'apple' ? <AppleGlyph /> : <PlayGlyph />}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-background/70">
          {eyebrow}
        </span>
        <span className="font-display text-[17px] font-bold tracking-tight">{name}</span>
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
        <linearGradient id="store-play-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#375E65" />
          <stop offset="1" stopColor="#F2BE5E" />
        </linearGradient>
      </defs>
      <path
        fill="url(#store-play-g)"
        d="M3.5 2.5 14.3 12 3.5 21.5c-.3-.2-.5-.5-.5-.9V3.4c0-.4.2-.7.5-.9z"
      />
      <path fill="#EC7A5C" d="M17.7 8.6 14.3 12l3.4 3.4 2.7-1.5c1-.6 1-2.1 0-2.7z" />
      <path fill="#F2BE5E" d="m14.3 12-10.8 9.5c.3.2.7.2 1 0l10.2-5.8z" />
      <path fill="#375E65" d="M14.3 12 4.5 2.7c-.3-.2-.7-.2-1 0l10.8 9.3z" />
    </svg>
  );
}
