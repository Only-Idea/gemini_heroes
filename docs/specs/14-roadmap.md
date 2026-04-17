# 14 — Implementation Roadmap

## Phase 1: Foundation (Week 1–2)

- [x] Set up Next.js 15 project with TypeScript, Tailwind CSS 4, and ESLint/Prettier
- [x] Configure i18n routing (ja default, /en for English)
- [x] Implement design system: CSS variables for colors, spacing, typography
- [x] Load all Japanese Google Fonts with proper subsets and display strategies
- [x] Build layout components: Navbar, Footer, GrainOverlay, CustomCursor
- [x] Set up Lenis smooth scroll integration
- [x] Deploy skeleton to Vercel for continuous preview

## Phase 2: 3D & Hero (Week 3–4)

### 2.1 3D Foundation & Canvas
- [x] Initialize R3F Canvas in `Hero.tsx` with `AgX` tone mapping and high-key global illumination.
- [x] Implement `studio` Environment map to generate high-end reflections on the Warm Ivory surface.
- [ ] Create `components/three/LoadingState.tsx` for 3D assets with high-key branding.
- [x] Optimize with `PerformanceMonitor` to scale quality (DPR, shadow resolution) based on device.

### 2.2 Hero Orb Section
- [x] Create `HeroOrb.tsx` using `Float` (Drei) for gentle breathing and mouse-parallax motion.
- [x] Implement multi-layered glass material for the orb (Inner glow + Outer crystalline refraction).
- [ ] Implement GSAP `SplitText` logic for the character-by-character "fade & lift" entrance animation.
- [ ] Build the "Begin the Ascent" scroll hint with a custom-animated SVG path.
- [ ] Refactor CTA buttons to use magnetic hover effects (GSAP + MouseEvent).

### 2.3 3D Medal Showcase Foundation
- [x] Build `MedalScene.tsx` as a standalone reusable 3D viewport.
- [x] Create a procedural high-reflectivity "Medal" placeholder (Gold/Silver/Bronze presets).
- [ ] Link medal rotation to scroll progress (0.4–0.6 range) using GSAP ScrollTrigger.
- [x] Implement `ContactShadows` as a performant mobile fallback for grounding.

### 2.4 Scroll & Interaction Engine
- [ ] Configure `Lenis` to sync perfectly with R3F frame loop via GSAP `ticker`.
- [ ] Implement a global "WebGL Ready" state to orchestrate the transition from placeholder to 3D.
- [ ] Set up `Stats.js` or `Leva` (dev-only) for real-time 3D performance monitoring.
- [ ] Create a robust fallback for "Reduced Motion" and "No-WebGL" scenarios.

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
