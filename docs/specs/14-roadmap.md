# 14 — Implementation Roadmap

## Phase 1: Foundation (Week 1–2)

- Set up Next.js 15 project with TypeScript, Tailwind CSS 4, and ESLint/Prettier
- Configure i18n routing (ja default, /en for English)
- Implement design system: CSS variables for colors, spacing, typography
- Load all Japanese Google Fonts with proper subsets and display strategies
- Build layout components: Navbar, Footer, GrainOverlay, CustomCursor
- Set up Lenis smooth scroll integration
- Deploy skeleton to Vercel for continuous preview

## Phase 2: 3D & Hero (Week 3–4)

- Build the Hero Orb scene with React Three Fiber
- Implement breathing animation cycle and mouse parallax
- Build medal placeholder scene (procedural cylinder)
- Set up ScrollControls and GSAP ScrollTrigger integration
- Implement hero section with all text, animations, and CTAs
- Test WebGL fallback for devices without GPU support

## Phase 3: Content Sections (Week 5–6)

- Build Stats Bar with animated counters
- Build Challenge Showcase with horizontal scroll on desktop
- Build Medal Showcase with scroll-driven rotation
- Build Feature Showcase with phone mockup and annotation lines
- Build Environmental Impact section with animated illustrations
- Build Activity Types horizontal ribbon
- Build Final CTA section
- Build Contact form and Footer

## Phase 4: Polish & Responsive (Week 7–8)

- Full responsive testing across all breakpoints (320px to 1440px+)
- Mobile-specific optimizations: sticky download bar, reduced 3D, touch states
- Performance optimization: lazy loading, code splitting, image optimization
- Accessibility audit: keyboard nav, screen reader, reduced motion, contrast
- SEO: meta tags, structured data, sitemap, robots.txt, OG images
- Cross-browser testing: Chrome, Safari, Firefox, Edge, iOS Safari, Android Chrome

## Phase 5: Production Assets (Week 9–10)

- Replace all image placeholders with real app screenshots
- Replace medal placeholder with real 3D model (if available)
- Replace challenge placeholders with licensed photography or illustrations
- Create custom activity type icon set
- Final copy review in Japanese (brand voice compliance)
- Generate QR code with proper app store deep links
- Set up analytics (Vercel Analytics or Plausible)

## Phase 6: Launch (Week 11)

- DNS migration: Point medalhero.com to new deployment
- Set up 301 redirects from old `/about-app` and `/contact` to scroll anchors
- Lighthouse audit: target 90+ across all categories
- Smoke test across all devices and browsers
- Launch announcement on social channels
- Monitor Core Web Vitals for 2 weeks post-launch
