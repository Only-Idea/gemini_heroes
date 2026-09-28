import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { STORE_LINKS } from './lib/storeLinks';

const nextConfig: NextConfig = {
  // @ts-ignore - cacheComponents is the new home for PPR in Next.js 15/16
  cacheComponents: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Common legacy marketing paths — safe to ship even if Studio.design
      // didn't actually use them. Each maps to the closest homepage anchor
      // so old inbound links don't 404.
      { source: '/about', destination: '/#impact', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/challenges', destination: '/#challenges', permanent: true },
      { source: '/features', destination: '/#features', permanent: true },
      { source: '/download', destination: '/#download', permanent: true },
      // Smart app link (QR codes, social bios): /app → store by user-agent,
      // everyone else → Japanese homepage. Temporary so store URLs can change.
      // ponytail: iPadOS 13+ sends a desktop Mac UA, so iPads land on the homepage.
      {
        source: '/app',
        has: [{ type: 'header', key: 'user-agent', value: '.*(iPhone|iPad|iPod).*' }],
        destination: STORE_LINKS.apple,
        permanent: false,
        basePath: false,
      },
      {
        source: '/app',
        has: [{ type: 'header', key: 'user-agent', value: '.*Android.*' }],
        destination: STORE_LINKS.google,
        permanent: false,
        basePath: false,
      },
      { source: '/app', destination: '/ja', permanent: false },
      // Direct deep-links for the three challenge products → Shopify variants.
      // `basePath: false` keeps the locale prefix from being prepended to the
      // external destination URL.
      {
        source: '/challenges/fuji',
        destination:
          'https://shop.medalhero.com/products/%E5%AF%8C%E5%A3%AB%E5%B1%B1',
        permanent: true,
        basePath: false,
      },
      {
        source: '/challenges/ronin',
        destination:
          'https://shop.medalhero.com/products/%E5%9B%9B%E5%8D%81%E4%B8%83%E5%A3%AB',
        permanent: true,
        basePath: false,
      },
      {
        source: '/challenges/rail',
        destination:
          'https://shop.medalhero.com/products/%E9%89%84%E9%81%93%E6%97%85%E8%B7%AF',
        permanent: true,
        basePath: false,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
