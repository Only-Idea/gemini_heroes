import Image from 'next/image';
import { cn } from '@/lib/utils';
import { STORE_LINKS } from '@/lib/storeLinks';

interface AppBadgeProps {
  store: 'apple' | 'google';
  size?: 'micro' | 'default';
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

export default function AppBadge({ store, size = 'default', className = '' }: AppBadgeProps) {
  const badge = BADGES[store];
  const heightClass = size === 'micro' ? 'h-8' : 'h-11';

  return (
    <a
      href={STORE_LINKS[store]}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download on ${badge.label}`}
      className={cn(
        'group inline-flex items-center rounded-xl transition-all duration-300',
        'hover:-translate-y-0.5 hover:drop-shadow-[0_10px_18px_rgba(15,17,20,0.25)]',
        className
      )}
    >
      <Image
        src={badge.src}
        alt={`Download on ${badge.label}`}
        width={badge.width}
        height={badge.height}
        className={cn(heightClass, 'w-auto')}
      />
    </a>
  );
}
