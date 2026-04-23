'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import GradientButton from '@/components/ui/GradientButton';

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
    const onScroll = () => setScrolled(window.scrollY > 20);
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

  const handleDownloadClick = () => {
    setMobileOpen(false);
    document.querySelector('#download')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-white/40 backdrop-blur-xl py-3 border-b border-white/50 shadow-heroes'
            : 'bg-transparent py-5 backdrop-blur-none'
        }`}
      >
        <div className="mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 lg:px-10 max-w-[1400px]">
          {/* Logo — left column */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Heroes — home"
            className="justify-self-start inline-flex items-center gap-2"
          >
            <Image
              src="/images/logo/logo.png"
              alt="Heroes"
              width={96}
              height={96}
              priority
              className="h-9 w-9 object-contain"
            />
            <span className="font-display text-[20px] font-bold tracking-tight text-foreground">
              Heroes
            </span>
          </a>

          {/* Desktop nav links — center column, always centered regardless of side widths */}
          <div className="hidden justify-self-center items-center gap-10 md:flex">
            {navLinks.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => handleAnchorClick(href)}
                className="font-body text-nav font-medium tracking-wide text-muted transition-colors duration-300 hover:text-foreground"
              >
                {t(key)}
              </button>
            ))}
          </div>

          {/* Right cluster (desktop) + mobile hamburger — right column */}
          <div className="hidden justify-self-end items-center gap-4 md:flex">
            <LanguageSwitcher size="compact" />
            <GradientButton
              variant="primary"
              onClick={handleDownloadClick}
              className="h-10 px-5 text-xs tracking-wide"
            >
              {t('download')}
            </GradientButton>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-12 w-12 items-center justify-self-end justify-center md:hidden relative z-[60]"
            aria-label="Toggle menu"
          >
            <div className="relative h-5 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-foreground transition-all duration-500 ${
                  mobileOpen ? 'top-[9px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] h-[1.5px] w-6 bg-foreground transition-opacity duration-300 ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-foreground transition-all duration-500 ${
                  mobileOpen ? 'top-[9px] -rotate-45' : 'top-[18px]'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl transition-all duration-700 ease-heroes md:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0 translate-y-[-10%]'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-12">
          {navLinks.map(({ key, href }) => (
            <button
              key={key}
              onClick={() => handleAnchorClick(href)}
              className="font-display text-[40px] font-bold tracking-tight text-foreground/40 transition-all duration-500 hover:text-foreground active:scale-95"
            >
              <span className={mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}>
                {t(key)}
              </span>
            </button>
          ))}
          <LanguageSwitcher size="default" className="mt-4" />
          <GradientButton
            variant="primary"
            size="lg"
            onClick={handleDownloadClick}
            className="mt-4 px-10"
          >
            {t('download')}
          </GradientButton>
        </div>
      </div>
    </>
  );
}
