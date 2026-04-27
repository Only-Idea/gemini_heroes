import type { MetadataRoute } from 'next';

const BASE_URL = 'https://medalhero.com';

// Build timestamp — pinned per build so sitemap doesn't claim a fresh
// mtime on every request (which suppresses re-crawl signals).
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // localePrefix: 'as-needed' + defaultLocale: 'ja' → JA at root, EN at /en.
  // Each entry declares the full hreflang set so Google can pair locales.
  const languages = {
    ja: BASE_URL,
    en: `${BASE_URL}/en`,
    'x-default': BASE_URL,
  };

  return [
    {
      url: BASE_URL,
      lastModified: BUILD_TIME,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: BUILD_TIME,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
  ];
}
