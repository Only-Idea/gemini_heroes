'use client';

import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/ui/SectionLabel';
import ContactForm from '@/components/sections/ContactForm';
import { cn } from '@/lib/utils';

const socials: { label: string; href: string; icon: 'twitter' | 'instagram' }[] = [
  { label: 'Twitter', href: 'https://twitter.com/medalhero', icon: 'twitter' },
  { label: 'Instagram', href: 'https://instagram.com/medalhero', icon: 'instagram' },
];

export default function ContactSection() {
  const t = useTranslations();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background px-6 py-32 lg:py-48"
      role="region"
      aria-label={t('nav.contact')}
    >
      {/* Soft background accent */}
      <div className="pointer-events-none absolute -left-32 top-12 h-72 w-72 rounded-full bg-teal/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-72 w-72 rounded-full bg-coral/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="flex flex-col justify-center">
          <SectionLabel
            number={t('contact.number')}
            label={t('nav.contact')}
            title={t('contact.title')}
            description={t('contact.description')}
            accentColor="teal"
          />

          <ul className="mt-10 flex flex-wrap items-center gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className={cn(
                    'group flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.02] text-foreground/60 transition-all duration-300',
                    'hover:scale-110 hover:border-coral/60 hover:bg-coral/10 hover:text-coral'
                  )}
                >
                  <SocialGlyph icon={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function SocialGlyph({ icon }: { icon: 'twitter' | 'instagram' }) {
  if (icon === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M18 3h3l-7 8 8 10h-6l-5-6-6 6H2l8-9L2 3h6l4 5z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
