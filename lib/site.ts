// Override per-environment via NEXT_PUBLIC_SITE_URL (no trailing slash).
// Falls back to production so prod builds don't need the var set.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://medalhero.com';

export const SOCIAL = {
  twitter: 'https://x.com/HeroesMedalJp',
  instagram: 'https://www.instagram.com/heroesmedal/',
} as const;

/**
 * Build a fully-qualified canonical URL for a given locale + path.
 * `localePrefix: 'as-needed'` + `defaultLocale: 'ja'` means JA lives at
 * the bare path, EN gets `/en` prefixed.
 */
export function localeUrl(locale: string, path = '/'): string {
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return locale === 'en'
    ? `${SITE_URL}/en${cleanPath}`
    : `${SITE_URL}${cleanPath || '/'}`;
}
