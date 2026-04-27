'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer id="contact" className="reveal border-t border-foreground/5 bg-background px-6 pt-16 pb-28 md:py-16 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          {/* Logo/Brand */}
          <div className="inline-flex items-center gap-3">
            <Image
              src="/images/logo/logo.png"
              alt="Heroes"
              width={96}
              height={96}
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-[24px] font-bold tracking-tight text-foreground">
              Heroes
            </span>
          </div>

          {/* Social */}
          <div className="relative z-10 flex gap-6">
            <a
              href="https://x.com/HeroesMedalJp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 text-muted transition-all duration-300 hover:border-foreground hover:text-foreground"
              aria-label="X (Twitter)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/heroesmedal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 text-muted transition-all duration-300 hover:border-foreground hover:text-foreground"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center border-t border-foreground/5 pt-8">
          <p className="font-mono text-label font-normal tracking-widest text-muted/50 uppercase">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
