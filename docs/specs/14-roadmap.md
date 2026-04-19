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
- [x] Create `components/three/LoadingState.tsx` for 3D assets with high-key branding.
- [x] Optimize with `PerformanceMonitor` to scale quality (DPR, shadow resolution) based on device.

### 2.2 Hero Orb Section
- [x] Create `HeroOrb.tsx` using `Float` (Drei) for gentle breathing and mouse-parallax motion.
- [x] Implement multi-layered glass material for the orb (Inner glow + Outer crystalline refraction).
- [x] Implement GSAP `SplitText` logic for the character-by-character "fade & lift" entrance animation.
- [x] Build the "Begin the Ascent" scroll hint with a custom-animated SVG path.
- [x] Refactor CTA buttons to use magnetic hover effects (GSAP + MouseEvent).

### 2.3 3D Medal Showcase Foundation
- [x] Build `MedalScene.tsx` as a standalone reusable 3D viewport.
- [x] Create a procedural high-reflectivity "Medal" placeholder (Gold/Silver/Bronze presets).
- [x] Link medal rotation to scroll progress (0.4–0.6 range) using GSAP ScrollTrigger.
- [x] Implement `ContactShadows` as a performant mobile fallback for grounding.

### 2.4 Scroll & Interaction Engine
- [x] Configure `Lenis` to sync perfectly with R3F frame loop via GSAP `ticker`.
- [x] Implement a global "WebGL Ready" state to orchestrate the transition from placeholder to 3D.
- [x] Set up `Stats.js` or `Leva` (dev-only) for real-time 3D performance monitoring.
- [x] Create a robust fallback for "Reduced Motion" and "No-WebGL" scenarios.

## Phase 3: Content Sections (Week 5–6)

### 3.1 Stats Bar & Animated Counters
- [x] Implement `StatsBar.tsx` with high-contrast Ivory counters and Muted labels.
- [x] Create a reusable `AnimatedCounter.tsx` component using GSAP `snap` for counting.
- [x] Integrate `ScrollTrigger` to fire count-up animations as they enter view.
- [x] Add subtle "glow" entry effect for numbers using the brand gradient.

### 3.2 Challenge Showcase (Bento Grid)
- [x] Refactor `Challenges.tsx` into a responsive 6-column Bento Grid base.
- [x] Implement horizontal "overflow-scroll" logic for desktop using GSAP ScrollTrigger.
- [x] Build crystalline glass cards with `24px` radius and high-reflectivity borders.
- [x] Add hover-induced 3D tilt effect to cards using GSAP or framer-motion.

### 3.3 Medal Showcase Integration (Conversion)
- [x] Finalize `MedalScene.tsx` integration with `AccumulativeShadows` for grounded realism.
- [x] Link medal rotation (90° profile to 0° front) to the scroll range of this section.
- [x] Implement "Reflection Mapping" on the medal using the brand gradient as an HDR source.
- [x] Build the conversion UI (label, title, description) with "character-wipe" entrance.

### 3.4 Feature Showcase (3D Phone + Bento)
- [x] Build `PhoneShowcase.tsx` featuring a high-fidelity 3D phone mockup in R3F.
- [x] Organize the 6 features into an asymmetric Bento layout (2x3 or custom span).
- [x] Implement "Scrollytelling" link: as each feature card enters view, the 3D phone screen updates.
- [ ] Add SVG "annotation lines" that connect Bento cards to specific points on the 3D phone.

### 3.5 Environmental Impact & Activity Ribbon
- [x] Build the "Path of Purpose" section with a 50/50 split (Visuals/Stats).
- [x] Implement an infinite-scroll `ActivityRibbon.tsx` for the 12 activity icons.
- [x] Create animated SVGs for "Trees Planted" and "Ocean Plastic" counters.
- [x] Apply a pure white background transition for the ribbon to contrast with Warm Ivory.

### 3.6 Final CTA & Global Footer
- [x] Build the "Odyssey Conclusion" section with a centered, oversized font typewriter headline.
- [x] Refactor `Footer.tsx` with elegant link-hover states (2px gradient line draw-in).
- [x] Implement "Magnetic Buttons" for the App Store/Google Play CTAs.
- [x] Conduct a final sweep of `isWebGLReady` transitions for all content sections.

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
