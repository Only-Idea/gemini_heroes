'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { STORE_LINKS } from '@/lib/storeLinks';

interface StoreBadgeProps {
  store: 'apple' | 'google';
  href?: string;
  className?: string;
}

const BADGES = {
  apple: {
    src: '/images/buttons/ios_button.webp',
    width: 314,
    height: 100,
    label: 'App Store',
  },
  google: {
    src: '/images/buttons/android_button.webp',
    width: 336,
    height: 100,
    label: 'Google Play',
  },
} as const;

export default function StoreBadge({ store, href, className = '' }: StoreBadgeProps) {
  const badge = BADGES[store];
  const resolvedHref = href ?? STORE_LINKS[store];
  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download Heroes on ${badge.label}`}
      className={cn(
        'group inline-flex h-14 items-center transition-all duration-300',
        'hover:-translate-y-0.5 hover:drop-shadow-[0_18px_24px_rgba(15,17,20,0.35)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl',
        className
      )}
    >
      <Image
        src={badge.src}
        alt={`Download on ${badge.label}`}
        width={badge.width}
        height={badge.height}
        priority
        className="h-14 w-auto"
      />
    </a>
  );
}
