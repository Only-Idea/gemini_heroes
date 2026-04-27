import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip:
  //  - api / trpc routes
  //  - Next.js + Vercel internals (_next, _vercel)
  //  - Root-level metadata routes (icon, apple-icon) — these are NOT
  //    locale-prefixed, and routing them through next-intl 404s the
  //    generated PNGs (manifest references /icon/192 and /icon/512).
  //  - Anything with a file extension (sitemap.xml, robots.txt,
  //    favicon.ico, manifest.webmanifest, etc.)
  matcher: '/((?!api|trpc|_next|_vercel|icon|apple-icon|.*\\..*).*)',
};
