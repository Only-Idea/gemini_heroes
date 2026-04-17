'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const navLinks = [
  { key: 'challenges', href: '#challenges' },
  { key: 'features', href: '#features' },
  { key: 'impact', href: '#impact' },
  { key: 'contact', href: '#contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-colors duration-500 ${
          scrolled
            ? 'bg-slate/80 backdrop-blur-xl'
            : 'bg-transparent backdrop-blur-none'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-[18px] font-bold tracking-[0.02em] text-ivory"
          >
            Heroes
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => handleAnchorClick(href)}
                className="font-body text-nav font-normal tracking-[0.06em] text-ivory/70 transition-opacity duration-300 hover:text-ivory"
              >
                {t(key)}
              </button>
            ))}
          </div>

          {/* Download button (desktop) */}
          <button
            className="hidden rounded-full border border-transparent bg-gradient-heroes px-5 py-2 font-mono text-button font-medium tracking-[0.1em] text-void transition-transform duration-400 hover:-translate-y-0.5 md:block"
          >
            {t('download')}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-12 w-12 items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            <div className="relative h-5 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-ivory transition-all duration-300 ${
                  mobileOpen ? 'top-[9px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] h-[1.5px] w-6 bg-ivory transition-opacity duration-300 ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-ivory transition-all duration-300 ${
                  mobileOpen ? 'top-[9px] -rotate-45' : 'top-[18px]'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-void/95 backdrop-blur-xl transition-opacity duration-500 md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8 pt-16">
          {navLinks.map(({ key, href }) => (
            <button
              key={key}
              onClick={() => handleAnchorClick(href)}
              className="min-h-[48px] font-display text-[24px] font-bold tracking-[0.02em] text-ivory/80 transition-colors duration-300 hover:text-ivory"
            >
              {t(key)}
            </button>
          ))}
          <button
            onClick={() => setMobileOpen(false)}
            className="mt-4 rounded-full bg-gradient-heroes px-8 py-3 font-mono text-button font-medium tracking-[0.1em] text-void"
          >
            {t('download')}
          </button>
        </div>
      </div>
    </>
  );
}
