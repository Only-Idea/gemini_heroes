'use client';

import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/ui/SectionLabel';
import ContactForm from '@/components/sections/ContactForm';
import { cn } from '@/lib/utils';

const socials: { label: string; href: string; icon: 'twitter' | 'instagram' | 'github' }[] = [
  { label: 'Twitter', href: 'https://twitter.com/medalhero', icon: 'twitter' },
  { label: 'Instagram', href: 'https://instagram.com/medalhero', icon: 'instagram' },
  { label: 'GitHub', href: 'https://github.com/medalhero', icon: 'github' },
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
            number="06"
            label={t('nav.contact')}
            title="Let&rsquo;s Talk."
            description="Questions, partnerships, or a story to share? We read every message and love hearing from travellers and organisers alike."
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

function SocialGlyph({ icon }: { icon: 'twitter' | 'instagram' | 'github' }) {
  if (icon === 'twitter') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M18 3h3l-7 8 8 10h-6l-5-6-6 6H2l8-9L2 3h6l4 5z" />
      </svg>
    );
  }
  if (icon === 'instagram') {
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
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.8 0 0 .9-.3 2.8 1A9.7 9.7 0 0 1 12 7c.9 0 1.8.1 2.6.4 1.9-1.3 2.8-1 2.8-1 .5 1.5.2 2.5.1 2.8.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.5C22 6.5 17.5 2 12 2z" />
    </svg>
  );
}
