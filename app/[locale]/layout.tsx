import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import GrainOverlay from '@/components/ui/GrainOverlay';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import SmoothScroll from '@/components/ui/SmoothScroll';
import '../globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Heroes — バーチャルチャレンジ',
  description:
    'すべての一歩が、冒険になる。富士山、四十七士、日本の鉄道。歩くほど、世界が変わる。',
};

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full bg-void text-ivory">
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <GrainOverlay />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <div className="flex min-h-screen flex-col">
              {children}
              <Footer />
            </div>
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
