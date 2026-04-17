'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer id="contact" className="border-t border-border bg-void px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Links */}
          <div className="flex gap-6">
            {(['privacy', 'terms', 'contact'] as const).map((key) => (
              <a
                key={key}
                href="#"
                className="group relative font-mono text-footer font-normal tracking-[0.08em] text-stone transition-colors duration-300 hover:text-ivory"
              >
                {t(key)}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-ivory transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-5">
            <a
              href="#"
              className="text-stone transition-colors duration-300 hover:text-ivory"
              aria-label="Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
            <a
              href="#"
              className="text-stone transition-colors duration-300 hover:text-ivory"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="font-mono text-footer font-normal tracking-[0.08em] text-ash">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
