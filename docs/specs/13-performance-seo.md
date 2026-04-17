# 13 — Performance & SEO

## Core Web Vitals Strategy

- **LCP**: The hero text is the LCP element. Ensure fonts are preloaded and hero text renders within 2s. 3D scene loads after text.
- **FID/INP**: All interactions respond within 200ms. 3D scenes run on `requestAnimationFrame`, never blocking the main thread.
- **CLS**: All elements have explicit dimensions. Font fallback stacks prevent layout shift. Phone frames use `aspect-ratio` CSS.

## SEO for Single-Page Scroll Site

- Server-side render all text content (Next.js SSR). 3D scenes hydrate client-side.
- **Semantic HTML**: Use `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`. Each section has a heading hierarchy (h1 > h2 > h3).
- **Meta tags**: Unique `<title>` and `<meta description>` in Japanese. Open Graph tags with app screenshot as `og:image`.
- **Structured data**: Use Organization, MobileApplication, and FAQ schema (JSON-LD).
- **Canonical URL**: `https://medalhero.com/` with `hreflang` tags for ja and en.
- **Sitemap**: Even though it is a single page, include `sitemap.xml` with the main URL and any future pages.
- **robots.txt**: Allow all crawlers. Disallow `/api/` routes.

## Accessibility

- All 3D scenes have `aria-hidden="true"` and are supplemented by descriptive text.
- **Keyboard navigation**: All interactive elements are focusable. Custom cursor does not replace system focus indicators.
- **Color contrast**: Warm ivory (`#E8E2D6`) on void background (`#0F1114`) achieves 11.8:1 ratio (AAA).
- **Reduced motion**: Respect `prefers-reduced-motion` media query. Disable all scroll animations, GSAP tweens, and 3D rotations. Show static fallbacks.
- **Screen reader**: All sections have `aria-label` in Japanese. Image placeholders have `alt` text.
- **Language**: `<html lang="ja">` with `lang="en"` attributes on English-only elements.
