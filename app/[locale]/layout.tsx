import type { Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale, getTranslations } from 'next-intl/server';
import ClientEffects from '@/components/ui/ClientEffects';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ScrollRevealMount from '@/components/ui/ScrollRevealMount';
import JsonLd from '@/components/ui/JsonLd';
import HomeJsonLd from '@/components/seo/HomeJsonLd';
import PageTransition from '@/components/ui/PageTransition';
import { SITE_URL, SOCIAL, localeUrl } from '@/lib/site';
import '../globals.css';

export function generateStaticParams() {
  return [{ locale: 'ja' }, { locale: 'en' }];
}

import { Suspense } from 'react';

// Only the weights matched by Tailwind utilities in use (font-medium=500,
// font-bold=700, body default=400). Wired through `@theme` in globals.css —
// audit again if you add font-light / font-black classes anywhere.
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  preload: true,
});

export const viewport: Viewport = {
  themeColor: '#375E65',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  // localePrefix: 'as-needed' + defaultLocale: 'ja' → JA at '/', EN at '/en'
  const canonicalPath = locale === 'en' ? '/en' : '/';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
    alternates: {
      canonical: canonicalPath,
      languages: {
        'ja': '/',
        'en': '/en',
        'x-default': '/',
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: canonicalPath,
      siteName: 'Heroes',
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function I18nProvider({ children, locale }: { children: React.ReactNode, locale: string }) {
  const messages = await getMessages();
  const pageUrl = localeUrl(locale);

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Heroes',
    'url': SITE_URL,
    'logo': `${SITE_URL}/images/logo/logo.png`,
    'sameAs': [SOCIAL.twitter, SOCIAL.instagram],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Heroes',
    'url': pageUrl,
    'inLanguage': locale === 'ja' ? 'ja-JP' : 'en-US',
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <HomeJsonLd locale={locale} />
      <PageTransition />
      <ClientEffects>
        <ScrollRevealMount />
        <Navbar />
        <div className="flex min-h-screen flex-col">
          {children}
          <Footer />
        </div>
      </ClientEffects>
    </NextIntlClientProvider>
  );
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-background focus:shadow-heroes focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2"
        >
          Skip to content
        </a>
        <Suspense fallback={
          <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="h-12 w-12 animate-pulse rounded-full bg-gradient-heroes opacity-20 blur-xl" />
          </div>
        }>
          <I18nProvider locale={locale}>
            {children}
          </I18nProvider>
        </Suspense>
      </body>
    </html>
  );
}
