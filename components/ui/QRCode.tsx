'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface QRCodeProps {
  /** Which store the QR resolves to. */
  store?: 'apple' | 'google' | 'heroes';
  /** Caption under the QR. Passed in so it can be localised by the caller. */
  caption?: string;
  className?: string;
}

const QR_SOURCES = {
  apple: { src: '/images/qr_codes/ios.webp', label: 'App Store' },
  google: { src: '/images/qr_codes/android.webp', label: 'Google Play' },
  heroes: { src: '/images/qr_codes/ios.webp', label: 'Heroes' },
} as const;

/**
 * Heroes-branded QR code. Wraps the real store QR image in the signature
 * gradient frame so it sits flush with the rest of the design system.
 */
export default function QRCode({ store = 'heroes', caption, className = '' }: QRCodeProps) {
  const qr = QR_SOURCES[store];

  return (
    <div className={cn('inline-flex flex-col items-center gap-2', className)}>
      <div className="relative inline-block rounded-2xl p-[3px] bg-gradient-heroes bg-[length:200%_200%] shadow-heroes [animation:hero-shimmer_8s_ease-in-out_infinite]">
        <div className="relative rounded-[14px] bg-white p-4">
          <Image
            src={qr.src}
            alt={caption ?? `Download Heroes — scan to open ${qr.label}`}
            width={160}
            height={160}
            className="block h-40 w-40"
          />
        </div>
      </div>
      {caption && (
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">{caption}</p>
      )}
    </div>
  );
}
