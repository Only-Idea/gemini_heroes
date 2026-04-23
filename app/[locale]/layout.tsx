import { Noto_Sans_JP } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale, getTranslations } from 'next-intl/server';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import GrainOverlay from '@/components/ui/GrainOverlay';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ScrollRevealMount from '@/components/ui/ScrollRevealMount';
import GlobalCanvas from '@/components/three/GlobalCanvas';
import DevTools from '@/components/three/DevTools';
import FloatingDownloadBar from '@/components/ui/FloatingDownloadBar';
import JsonLd from '@/components/ui/JsonLd';
import PageTransition from '@/components/ui/PageTransition';
import '../globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  preload: true,
});

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const baseUrl = 'https://medalhero.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
    alternates: {
      canonical: '/',
      languages: {
        'ja': '/ja',
        'en': '/en',
      },
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: './',
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
    }
  };
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Heroes',
    'url': 'https://medalhero.com',
    'logo': 'https://medalhero.com/images/logo.png',
    'sameAs': [
      'https://twitter.com/medalhero',
      'https://instagram.com/medalhero'
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Heroes',
    'url': 'https://medalhero.com'
  };

  return (
    <html lang={locale} className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground" suppressHydrationWarning>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <NextIntlClientProvider messages={messages}>
          <PageTransition />
          <SmoothScroll>
            <ScrollRevealMount />
            <GlobalCanvas />
            <GrainOverlay />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <div className="flex min-h-screen flex-col">
              {children}
              <Footer />
            </div>
            <FloatingDownloadBar />
            <DevTools />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
