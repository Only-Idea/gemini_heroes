# Heroes Website — Phase Implementation Checklist

> Subtask checklists derived from `COMPONENT-ROADMAP.md` → **Implementation Priority Order**.
> Track progress by checking boxes as each item lands. Each phase ends with a verification block.

---

## Phase 2A — Foundation Extraction & Core Primitives

**Effort**: 3–4 days · **Impact**: Foundation for everything
**Goal**: Extract every section out of `page.tsx` and ship the shared primitives every later phase depends on.

### 2A.1 Extract sections from `app/page.tsx`
- [x] Create `components/sections/HeroSection.tsx` and move hero markup + GSAP entry logic out of `page.tsx` _(shipped as `Hero.tsx`)_
- [x] Create `components/sections/StatsBar.tsx` with the current static stat markup
- [x] Create `components/sections/ChallengeShowcase.tsx` with the 3 route cards _(shipped as `Challenges.tsx`)_
- [x] Create `components/sections/FeatureShowcase.tsx` with the bento grid _(shipped as `PhoneShowcase.tsx`)_
- [x] Create `components/sections/MedalShowcase.tsx` wrapping the existing `MedalScene`
- [x] Create `components/sections/ImpactSection.tsx` with the 2×2 impact grid
- [x] Create `components/sections/FinalCTA.tsx` with headline + CTA buttons
- [x] Replace the inline sections in `page.tsx` with the extracted components (target: `page.tsx` < 60 lines) _(53 lines)_
- [x] Verify i18n keys still resolve from each extracted section
- [x] Verify no visual regressions vs. pre-extraction baseline _(build passes, DOM structure preserved)_

### 2A.2 Shared UI primitives
- [x] Build `components/ui/SectionLabel.tsx` (number / label / title / description) and adopt in every section
- [x] Build `components/ui/GlassCard.tsx` with `variant`, `hoverEffect`, `glowColor`, `span` props
- [x] Build `components/ui/AnimatedCounter.tsx` with scroll-triggered spring counting + `Intl.NumberFormat('ja-JP')`
- [x] Replace duplicated glass-card markup with `<GlassCard />` across sections _(PhoneShowcase feature cards)_

### 2A.3 Scroll system foundation
- [x] Build `hooks/useScrollReveal.ts` (IntersectionObserver at 15% threshold, adds `.visible`)
- [x] Wire `useScrollReveal` to the existing `.reveal` CSS class _(via `ScrollRevealMount` in layout)_
- [x] Respect `prefers-reduced-motion` (instant reveal, no transform)

### 2A.4 Phase verification
- [x] `npm run lint` passes _(0 errors; 3 pre-existing warnings in 3D files, unrelated)_
- [x] `npm run typecheck` (or `tsc --noEmit`) passes _(via `next build` TypeScript pass)_
- [ ] Manual smoke test: scroll full page on desktop + mobile viewport, confirm no hydration or layout shift _(requires human runtime check)_

---

## Phase 2B — Hero Upgrade & Load Experience

**Effort**: 3–4 days · **Impact**: First impression
**Goal**: Turn the hero into a signature moment and wrap the initial load in an orchestrated sequence.

### 2B.1 `HeroSection` enhancements
- [ ] Build `components/ui/AnimatedHeadline.tsx` (clipPath mask reveal, configurable stagger)
- [ ] Build `components/ui/GradientButton.tsx` with idle → hover → active state machine
- [ ] Build `components/ui/ScrollHint.tsx` (bouncing chevron, fades on scroll)
- [ ] Build `components/ui/TypewriterText.tsx` (character-by-character, cursor blink)
- [ ] Replace hero headline with `AnimatedHeadline` mask reveal
- [ ] Replace hero CTAs with `GradientButton` variants (primary gradient + ghost)
- [ ] Type the top eyebrow label with `TypewriterText` (200ms delay, 40ms/char)
- [ ] Add gradient text shimmer (animated `background-position`) to the gradient headline
- [ ] Parallax fade: hero content translates up + fades out past 50vh
- [ ] Orb scales 1.0 → 0.85 and dissolves as user scrolls past hero

### 2B.2 Hero Orb 4-layer upgrade (`components/three/HeroOrb.tsx`)
- [ ] Add inner core: amber icosahedron (`#F2BE5E`), opacity pulse 0.7–1.0 on 4s cycle
- [ ] Add core glow: custom `ShaderMaterial` with Fresnel, `AdditiveBlending`, `BackSide`
- [ ] Adjust existing wireframe shell 1: warm ivory at 25% opacity, independent X/Z rotation
- [ ] Add wireframe shell 2: outer icosahedron at 8% opacity, counter-rotating
- [ ] Add 400 ambient particles in spherical shell (r: 3–8) with sine/cosine drift
- [ ] Add 2-point lighting (coral + cool blue) per spec
- [ ] Hook orb layers into scroll dissolve from 2B.1

### 2B.3 `PageTransition` load sequence
- [ ] Build `components/ui/PageTransition.tsx` full-screen overlay with Heroes gradient
- [ ] Add minimal loading indicator (bar or orb)
- [ ] Sync dismissal to `isWebGLReady` signal
- [ ] Implement exit animation (slide up / fade)
- [ ] Wire orchestrated entry timeline per spec 09 (0ms grain → 1600ms scroll hint)

### 2B.4 Phase verification
- [ ] Hero animation holds 60fps on desktop (Chrome DevTools Performance tab)
- [ ] Reduced-motion path disables parallax and mask reveal
- [ ] Load sequence completes under 2s on a warm cache
- [ ] Lighthouse performance ≥ 85 on `/` desktop

---

## Phase 2C — Core Content Sections

**Effort**: 4–5 days · **Impact**: Core content
**Goal**: Transform `ChallengeShowcase` and `FeatureShowcase` from placeholders into the main browsing experience.

### 2C.1 `ChallengeShowcase`
- [ ] Build `components/ui/Cursor3DTilt.tsx` (perspective + rotateX/Y, max 5deg, optional glare)
- [ ] Build `components/sections/RouteCard.tsx` with 3D tilt, expand state, route metadata
- [ ] Build `components/ui/DifficultyBadge.tsx` (Easy / Moderate / Epic color-coded pill)
- [ ] Add card entry animation: `translateX: 100px → 0` with 200ms stagger on scroll
- [ ] Replace circle placeholder with route imagery / gradient illustrations
- [ ] Show distance + duration (km, days) on card (hover or always visible)
- [ ] Add expand interaction (click / tap → overlay or expanded card with full description)
- [ ] Build `components/ui/HorizontalScrollContainer.tsx` (GSAP ScrollTrigger pin + horizontal scroll)
- [ ] Enable horizontal scroll on desktop, fall back to vertical stack on mobile
- [ ] Apply phone-frame motif (border-radius: 44px) to map preview area

### 2C.2 `FeatureShowcase`
- [ ] Build `components/ui/PhoneFrame.tsx` (CSS 3D phone container, tilt parallax, bezel, shadow)
- [ ] Build `components/sections/FeatureCard.tsx` (icon + title + description + annotation badge)
- [ ] Build `components/ui/AnnotationLine.tsx` (SVG dotted line, `stroke-dashoffset` draw animation)
- [ ] Build `components/ui/AppBadge.tsx` (compact App Store / Google Play badge)
- [ ] Add floating phone mockup: slides in from bottom on scroll, displays app screenshots
- [ ] Add 150ms stagger fade-in for bento feature cards
- [ ] Add border glow on hover (coral border + `scale(1.02)`)
- [ ] Draw dotted annotation lines from 「アプリ機能」 badges to phone mockup on desktop
- [ ] Tilt phone from `rotateY(-15deg) → 0deg` through section scroll range
- [ ] Add mini interactive map preview to primary bento cell (static image or Mapbox lite)
- [ ] Animate feature-card icons (Lottie or CSS) on scroll enter
- [ ] Embed App Store / Google Play micro-badges within feature cards

### 2C.3 Phase verification
- [ ] Horizontal scroll pin releases cleanly on all breakpoints
- [ ] Phone tilt respects `prefers-reduced-motion`
- [ ] Annotation lines render correctly at ≥1024px, hide at <1024px
- [ ] No layout shift from late-loaded screenshots (set explicit dimensions)

---

## Phase 3A — Mid-Page Engagement

**Effort**: 3–4 days · **Impact**: Mid-page engagement
**Goal**: Reward mid-scroll with the medal moment, the activity ribbon, and the impact story.

### 3A.1 `MedalShowcase` scroll-driven experience
- [ ] Build `components/three/ScrollDrivenMedal.tsx` — extend `MedalScene` with GSAP ScrollTrigger rotation
- [ ] Build `components/three/MedalMaterial.tsx` (PBR material, gold/silver/bronze presets, env reflections)
- [ ] Rotate medal 80° profile → 0° front-facing mapped to scroll (`scrub: true`)
- [ ] Scale medal 0.8 → 1.0 through its scroll range
- [ ] Add studio lighting (gradient HDRI env map, spotlight, rim light)
- [ ] Toggle / auto-cycle between gold/silver/bronze variants
- [ ] Fade surrounding text in at scroll midpoint while medal keeps rotating
- [ ] Add R3F `ContactShadows` for grounding
- [ ] Emit a subtle particle burst when medal reaches front-facing pose
- [ ] Add "Earn Your Medal" CTA with App Store badges below the medal

### 3A.2 `ActivityRibbon`
- [ ] Build `components/ui/Marquee.tsx` (direction, speed, `pauseOnHover`, dual-row support)
- [ ] Build `components/ui/ActivityIcon.tsx` (minimalist SVG + Japanese/English label)
- [ ] Build `components/sections/ActivityRibbon.tsx` with dual-row marquee (opposite directions)
- [ ] Ship 12 activity icons (Running, Walking, Cycling, Swimming, Hiking, Yoga, …)
- [ ] Pause marquee on hover
- [ ] Scale icons up as they enter viewport center
- [ ] Apply pure-white background strip contrasting with ivory sections

### 3A.3 `ImpactSection` storytelling
- [ ] Build `components/ui/TreeIllustration.tsx` (animated SVG tree that grows with scroll)
- [ ] Build `components/ui/WaveAnimation.tsx` (CSS/SVG ocean wave background)
- [ ] Build `components/ui/ImpactCounter.tsx` (large number + label + progress indicator)
- [ ] Split-layout entry: left column slides from left, right grid from right
- [ ] Drive tree growth from section scroll progress
- [ ] Place wave animation behind ocean stat
- [ ] Reuse `AnimatedCounter` for impact numbers on scroll enter
- [ ] Add circular or bar progress for impact goals
- [ ] Color-code: tree stats in teal, ocean stats in coral
- [ ] Add partner logos row (environmental orgs)

### 3A.4 Phase verification
- [ ] Medal scroll-scrub stays smooth (no jitter) on mid-tier laptop
- [ ] Marquee pauses on hover and survives tab-defocus without drift
- [ ] Tree / wave animations disable under reduced motion

---

## Phase 3B — Conversion

**Effort**: 2–3 days · **Impact**: Conversion
**Goal**: Close the funnel with a finale, contact form, and mobile-persistent download bar.

### 3B.1 `FinalCTA`
- [ ] Build `components/ui/QRCode.tsx` (branded QR in Heroes gradient colors)
- [ ] Build `components/ui/StoreBadge.tsx` (official App Store / Google Play SVG badges)
- [ ] Typewriter the headline on scroll enter (reuse `TypewriterText`)
- [ ] Add gradient-border pulse animation to primary button
- [ ] Render QR code on desktop (hidden on mobile)
- [ ] Add social proof line ("Join 32+ countries" or user count)
- [ ] Add subtle distant Hero Orb callback (bookend)
- [ ] Replace text buttons with official `StoreBadge` components

### 3B.2 `ContactSection`
- [ ] Build `components/ui/FloatingInput.tsx` (floating-label text input)
- [ ] Build `components/ui/FloatingTextarea.tsx` (floating-label textarea)
- [ ] Build `components/sections/ContactForm.tsx` (composed form + validation + submit)
- [ ] Build `components/sections/ContactSection.tsx` integrating form with footer area
- [ ] Wrap form in glass card container
- [ ] Add client-side validation with inline error messages
- [ ] Success animation (confetti or checkmark) on submit
- [ ] Add social links row (Twitter, Instagram) with hover scale + color transition
- [ ] Gradient send button with loading spinner state

### 3B.3 `FloatingDownloadBar`
- [ ] Build `components/ui/FloatingDownloadBar.tsx` (mobile only, `max-width: 768px`)
- [ ] Reveal after hero exits viewport (IntersectionObserver)
- [ ] Glass backdrop with brand gradient accent
- [ ] Slide-up entry animation
- [ ] Dismiss button that persists preference in `sessionStorage`
- [ ] Show 「無料でダウンロード」 with Apple + Google icons

### 3B.4 Phase verification
- [ ] Form validates + submits end-to-end (mocked endpoint OK)
- [ ] Download bar never appears on desktop
- [ ] Dismissal persists across same-session navigation
- [ ] All CTAs have accessible focus states

---

## Phase 4 — Premium Differentiation

**Effort**: 5–7 days · **Impact**: Premium differentiation
**Goal**: Ship the optional 3D scenes and the in-browser mini-experience that make Heroes feel singular.

### 4.1 `FujiScene` (`components/three/FujiScene.tsx`)
- [ ] Build low-poly Mt. Fuji heightmap mesh (or stylized mountain)
- [ ] Add gentle continuous Y-axis auto-rotation
- [ ] Apply white snow-cap material on top vertices
- [ ] Add gradient sky backdrop within the scene
- [ ] Render only when a challenge card is in viewport (trigger)
- [ ] Provide LOD: simplified geometry on mobile

### 4.2 `PhoneFloat` (`components/three/PhoneFloat.tsx`)
- [ ] Build CSS 3D phone frame (`perspective` + `transform`, no full WebGL)
- [ ] Rotate through app screenshots inside the phone frame
- [ ] Desktop: tilt based on cursor position
- [ ] Mobile: tilt via gyroscope API (with permission prompt)
- [ ] Add gentle Y-axis float oscillation (R3F `Float` or CSS keyframes)
- [ ] Drive tilt from angled → front-facing across feature section scroll

### 4.3 `MapGlobe` (`components/three/MapGlobe.tsx`) — optional
- [ ] Build procedural earth-like sphere with simplified land masses
- [ ] Add glowing dot markers for 32+ active countries
- [ ] Enable drag-to-rotate interaction
- [ ] Animate connection arcs between active regions
- [ ] Decide placement: Hero alternative vs. complementary section

### 4.4 "Try in Browser" mini-experience
- [ ] Build phone-framed container (`border-radius: 44px`, `aspect-ratio: 9/19.5`)
- [ ] Embed Mapbox lite map with a challenge route
- [ ] Animate route path drawing along the course
- [ ] Add interactive landmarks with info popups
- [ ] Add "Open in App" CTA at the bottom of the mini-experience

### 4.5 Phase verification
- [ ] All optional 3D scenes lazy-load (dynamic import, only when section near viewport)
- [ ] Mobile bundle increase from Phase 4 stays under +150KB gzipped
- [ ] Gyroscope path degrades gracefully when permission denied

---

## Phase 5 — Production Readiness

**Effort**: 3–4 days · **Impact**: Production readiness
**Goal**: Performance, accessibility, testing, and deployment hardening.

### 5.1 Performance optimization
- [ ] Convert all raster assets to `next/image` with blur placeholders + WebP/AVIF
- [ ] Lazy-load every 3D scene when its section approaches viewport
- [ ] Dynamic-import each section component for bundle splitting
- [ ] Subset Noto Sans JP fonts per page (load only required glyphs)
- [ ] Register a service worker with pre-cached critical assets
- [ ] Implement LOD system: fewer particles / lower detail on mobile

### 5.2 Accessibility
- [ ] Add skip-to-content link (hidden until focused)
- [ ] Apply brand-matching focus rings (coral outline) to every interactive element
- [ ] Add `sr-only` labels to all icon-only controls
- [ ] Implement full reduced-motion mode: disable WebGL, simplify animations
- [ ] Add high-contrast media-query adjustments
- [ ] Verify tab order through every section; Enter/Space activates all controls
- [ ] Run axe DevTools; resolve every critical/serious violation

### 5.3 Testing
- [ ] Add unit tests for counters, scroll hooks, and form validation
- [ ] Add Playwright E2E covering hero entry, scroll narrative, form submit, download bar
- [ ] Visual regression snapshots for hero, medal, and final CTA
- [ ] Cross-browser smoke on Chrome, Safari, Firefox, Edge

### 5.4 Deployment
- [ ] Verify production build (`next build`) completes cleanly
- [ ] Hit target Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] Confirm Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Configure analytics + error monitoring
- [ ] Set up CDN caching headers and preconnect hints
- [ ] Ship a release candidate to staging; run full QA pass before production cutover

### 5.5 Phase verification
- [ ] All quality gates green in CI
- [ ] Production deploy rollback plan documented
- [ ] Stakeholder sign-off recorded

---

## Cross-Phase Reference

| Phase | Components Delivered | Effort | Impact |
|-------|---------------------|--------|--------|
| 2A | Extract sections, `SectionLabel`, `GlassCard`, `AnimatedCounter`, `useScrollReveal` | 3–4 days | Foundation for everything |
| 2B | `HeroSection` upgrade (mask reveal, 4-layer orb, parallax fade), `PageTransition` | 3–4 days | First impression |
| 2C | `ChallengeShowcase` (3D tilt, horizontal scroll), `FeatureShowcase` (phone mockup, annotations) | 4–5 days | Core content |
| 3A | `MedalShowcase` (scroll-driven rotation), `ActivityRibbon` (marquee), `ImpactSection` (animations) | 3–4 days | Mid-page engagement |
| 3B | `FinalCTA` (typewriter, QR), `ContactSection` (form), `FloatingDownloadBar` | 2–3 days | Conversion |
| 4 | `FujiScene`, `PhoneFloat`, `MapGlobe`, "Try in Browser" mini-experience | 5–7 days | Premium differentiation |
| 5 | Performance optimization, accessibility, testing, deployment | 3–4 days | Production readiness |
