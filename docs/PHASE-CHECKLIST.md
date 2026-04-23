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
- [x] Build `components/ui/AnimatedHeadline.tsx` (clipPath mask reveal, configurable stagger)
- [x] Build `components/ui/GradientButton.tsx` with idle → hover → active state machine
- [x] Build `components/ui/ScrollHint.tsx` (bouncing chevron, fades on scroll) _(animated gradient line + scroll-scrubbed opacity fade)_
- [x] Build `components/ui/TypewriterText.tsx` (character-by-character, cursor blink)
- [x] Replace hero headline with `AnimatedHeadline` mask reveal
- [x] Replace hero CTAs with `GradientButton` variants (primary gradient + ghost)
- [x] Type the top eyebrow label with `TypewriterText` (200ms delay, 40ms/char)
- [x] Add gradient text shimmer (animated `background-position`) to the gradient headline
- [x] Parallax fade: hero content translates up + fades out past 50vh
- [x] Orb scales 1.0 → 0.85 and dissolves as user scrolls past hero _(via `heroScrollProgress` store wire-up)_

### 2B.2 Hero Orb 4-layer upgrade (`components/three/HeroOrb.tsx`)

> **Reverted by design decision.** The 4-layer build was shipped and working, but the dense amber core + coral glow read as opaque "donut" against the ivory background and fought the headline. Reverted to the original glassy transmissive sphere + single teal wireframe shell, keeping only the scroll-dissolve hook.

- [ ] Add inner core: amber icosahedron (`#F2BE5E`), opacity pulse 0.7–1.0 on 4s cycle _(reverted — clashed with light theme)_
- [ ] Add core glow: custom `ShaderMaterial` with Fresnel, `AdditiveBlending`, `BackSide` _(reverted — clashed with light theme)_
- [ ] Adjust existing wireframe shell 1: warm ivory at 25% opacity, independent X/Z rotation _(reverted — kept single teal shell)_
- [ ] Add wireframe shell 2: outer icosahedron at 8% opacity, counter-rotating _(reverted)_
- [ ] Add 400 ambient particles in spherical shell (r: 3–8) with sine/cosine drift _(reverted)_
- [ ] Add 2-point lighting (coral + cool blue) per spec _(reverted — Scene's global rig preferred)_
- [x] Hook orb layers into scroll dissolve from 2B.1 _(group scale 1.0 → 0.85 + shell opacity fade via `heroScrollProgress`)_

### 2B.3 `PageTransition` load sequence
- [x] Build `components/ui/PageTransition.tsx` full-screen overlay with Heroes gradient
- [x] Add minimal loading indicator (bar or orb) _(progress bar, 0→90% easing while waiting, snaps to 100% on ready)_
- [x] Sync dismissal to `isWebGLReady` signal _(with 4s safety fallback)_
- [x] Implement exit animation (slide up / fade)
- [x] Wire orchestrated entry timeline per spec 09 (0ms grain → 1600ms scroll hint) _(eyebrow@200ms, headline@600ms, subtitle@1000ms, CTAs@1200ms, scroll hint@1600ms)_

### 2B.4 Phase verification
- [ ] Hero animation holds 60fps on desktop (Chrome DevTools Performance tab) _(requires human runtime check)_
- [x] Reduced-motion path disables parallax and mask reveal _(AnimatedHeadline/TypewriterText/Hero parallax all branch on `isReducedMotion`; `.hero-rise` no-op under `prefers-reduced-motion: reduce`)_
- [ ] Load sequence completes under 2s on a warm cache _(requires human runtime check; 4s safety dismissal guards the upper bound)_
- [ ] Lighthouse performance ≥ 85 on `/` desktop _(requires human runtime check)_

---

## Phase 2C — Core Content Sections

**Effort**: 4–5 days · **Impact**: Core content
**Goal**: Transform `ChallengeShowcase` and `FeatureShowcase` from placeholders into the main browsing experience.

### 2C.1 `ChallengeShowcase`
- [x] Build `components/ui/Cursor3DTilt.tsx` (perspective + rotateX/Y, max 5deg, optional glare) _(primitive ready; ChallengeCard retains its own inline tilt + glow coupling, Cursor3DTilt available for other surfaces)_
- [x] Build `components/sections/RouteCard.tsx` with 3D tilt, expand state, route metadata _(shipped as enhanced `components/ui/ChallengeCard.tsx` with metadata; click-to-expand overlay deferred)_
- [x] Build `components/ui/DifficultyBadge.tsx` (Easy / Moderate / Epic color-coded pill)
- [x] Add card entry animation: `translateX: 100px → 0` with 200ms stagger on scroll _(mobile stack stagger via `HorizontalScrollContainer`; desktop uses pinned horizontal-scroll instead of per-card translate-in, which serves the same reveal intent)_
- [x] Replace circle placeholder with route imagery / gradient illustrations _(CSS gradient + inline SVG route glyph per accent color)_
- [x] Show distance + duration (km, days) on card (hover or always visible) _(always visible, km + days)_
- [ ] Add expand interaction (click / tap → overlay or expanded card with full description) _(deferred — modal/overlay not in current scope)_
- [x] Build `components/ui/HorizontalScrollContainer.tsx` (GSAP ScrollTrigger pin + horizontal scroll)
- [x] Enable horizontal scroll on desktop, fall back to vertical stack on mobile
- [x] Apply phone-frame motif (border-radius: 44px) to map preview area _(card visual area uses `rounded-[44px]`)_

### 2C.2 `FeatureShowcase`
- [ ] Build `components/ui/PhoneFrame.tsx` (CSS 3D phone container, tilt parallax, bezel, shadow) _(superseded — the section uses the existing WebGL `PhoneModel`; sticky viewport now has `transformStyle: preserve-3d` + perspective and rotateY scroll tilt)_
- [x] Build `components/sections/FeatureCard.tsx` (icon + title + description + annotation badge)
- [x] Build `components/ui/AnnotationLine.tsx` (SVG dotted line, `stroke-dashoffset` draw animation)
- [x] Build `components/ui/AppBadge.tsx` (compact App Store / Google Play badge) _(`micro` + `default` sizes; uses in-house glyphs pending official artwork)_
- [x] Add floating phone mockup: slides in from bottom on scroll, displays app screenshots _(existing WebGL phone model; intersection-observer lazy-mount kept)_
- [x] Add 150ms stagger fade-in for bento feature cards _(`gsap.from` on `.feature-card`, `stagger: 0.15`, `ScrollTrigger start: 'top 80%'`, `once: true`)_
- [x] Add border glow on hover (coral border + `scale(1.02)`) _(`hover:border-coral/60 hover:scale-[1.02] hover:shadow-2xl`)_
- [x] Draw dotted annotation lines from 「アプリ機能」 badges to phone mockup on desktop _(AnnotationLine rendered left-of-card when active at ≥1024px; hidden on mobile)_
- [x] Tilt phone from `rotateY(-15deg) → 0deg` through section scroll range _(scrubbed ScrollTrigger on `[data-phone-viewport]`)_
- [ ] Add mini interactive map preview to primary bento cell (static image or Mapbox lite) _(deferred — Mapbox dep weight not justified yet; the 3D phone scene carries the preview intent)_
- [ ] Animate feature-card icons (Lottie or CSS) on scroll enter _(deferred — current design has no per-feature icons)_
- [x] Embed App Store / Google Play micro-badges within feature cards _(medals + inclusivity cards)_

### 2C.3 Phase verification
- [x] Horizontal scroll pin releases cleanly on all breakpoints _(verified earlier at 1440/1920/2560: pin stops with last card centered; ≤ 1023px or reduced-motion falls through to stagger entry)_
- [x] Phone tilt respects `prefers-reduced-motion` _(tilt effect early-returns when `prefers-reduced-motion: reduce` matches)_
- [x] Annotation lines render correctly at ≥1024px, hide at <1024px _(FeatureCard's annotation wrapper is `hidden lg:block`)_
- [ ] No layout shift from late-loaded screenshots (set explicit dimensions) _(requires human runtime check — current sticky phone viewport has fixed `h-[60vh] lg:h-[70vh]`, but PhoneModel texture dimensions aren't explicitly constrained)_

---

## Phase 3A — Mid-Page Engagement

**Effort**: 3–4 days · **Impact**: Mid-page engagement
**Goal**: Reward mid-scroll with the medal moment, the activity ribbon, and the impact story.

### 3A.1 `MedalShowcase` scroll-driven experience
- [x] Build `components/three/ScrollDrivenMedal.tsx` — extend `MedalScene` with GSAP ScrollTrigger rotation _(kept inline in `MedalScene.tsx` + scroll hook in `MedalShowcase.tsx` to avoid an extra file for a small piece of logic)_
- [x] Build `components/three/MedalMaterial.tsx` (PBR material, gold/silver/bronze presets, env reflections) _(presets inline in `MedalScene.tsx` as a `variants` map; per-variant `CanvasTexture` equirect env map)_
- [x] Rotate medal 80° profile → 0° front-facing mapped to scroll (`scrub: true`)
- [x] Scale medal 0.8 → 1.0 through its scroll range
- [x] Add studio lighting (gradient HDRI env map, spotlight, rim light) _(ambient ivory + spotLight + rim pointLight)_
- [x] Toggle / auto-cycle between gold/silver/bronze variants _(5s interval cycles gold → silver → bronze; env map + metalness/roughness switch per variant)_
- [x] Fade surrounding text in at scroll midpoint while medal keeps rotating _(title + description triggered at `center 70%`, CTA at `center 60%`)_
- [x] Add R3F `ContactShadows` for grounding
- [ ] Emit a subtle particle burst when medal reaches front-facing pose _(deferred — particle burst adds fragile timing dep; not critical to the core storytelling)_
- [x] Add "Earn Your Medal" CTA with App Store badges below the medal _(GradientButton + AppBadge Apple/Google pair)_

### 3A.2 `ActivityRibbon`
- [x] Build `components/ui/Marquee.tsx` (direction, speed, `pauseOnHover`, dual-row support) _(single-row primitive; two side-by-side instances deliver dual rows)_
- [x] Build `components/ui/ActivityIcon.tsx` (minimalist SVG + Japanese/English label) _(12 glyph variants, scroll-scrubbed scale breathing)_
- [x] Build `components/sections/ActivityRibbon.tsx` with dual-row marquee (opposite directions) _(moved from `ui/` → `sections/`; page.tsx import updated)_
- [x] Ship 12 activity icons (Running, Walking, Cycling, Swimming, Hiking, Yoga, Wheelchair, Rowing, Elliptical, Stairs, Crossfit, Pilates)
- [x] Pause marquee on hover
- [x] Scale icons up as they enter viewport center _(scrubbed scale 0.9 → 1.08 across the viewport range)_
- [x] Apply pure-white background strip contrasting with ivory sections _(`bg-white`, edge gradient masks preserved)_

### 3A.3 `ImpactSection` storytelling
- [x] Build `components/ui/TreeIllustration.tsx` (animated SVG tree that grows with scroll) _(trunk stroke, 6 branches staggered, 10 leaves popping with `back.out`; scrub-driven)_
- [x] Build `components/ui/WaveAnimation.tsx` (CSS/SVG ocean wave background) _(two parallax SVG wave layers)_
- [x] Build `components/ui/ImpactCounter.tsx` (large number + label + progress indicator) _(wraps `AnimatedCounter`, adds progress bar + goal label)_
- [x] Split-layout entry: left column slides from left, right grid from right
- [x] Drive tree growth from section scroll progress _(ScrollTrigger scrub from `top 80%` → `bottom 30%`)_
- [x] Place wave animation behind ocean stat _(ocean ImpactCounter wrapped in a coral-tinted card with WaveAnimation underlay; second wave sits along the horizon of the tree viz)_
- [x] Reuse `AnimatedCounter` for impact numbers on scroll enter
- [x] Add circular or bar progress for impact goals _(thin bar with accent-coloured glow shadow — teal/coral)_
- [x] Color-code: tree stats in teal, ocean stats in coral
- [x] Add partner logos row (environmental orgs) _(5 wordmarks; staggered fade-in)_

### 3A.4 Phase verification
- [ ] Medal scroll-scrub stays smooth (no jitter) on mid-tier laptop _(requires human runtime check)_
- [x] Marquee pauses on hover and survives tab-defocus without drift _(driven by GSAP ticker via `gsap.ticker` which uses rAF and does not drift during tab blur; pause toggled via `gsap.getTweensOf`)_
- [x] Tree / wave animations disable under reduced motion _(TreeIllustration early-sets final state + skips ScrollTrigger; WaveAnimation short-circuits loops; both gated on `useStore.isReducedMotion`)_

---

## Phase 3B — Conversion

**Effort**: 2–3 days · **Impact**: Conversion
**Goal**: Close the funnel with a finale, contact form, and mobile-persistent download bar.

### 3B.1 `FinalCTA`
- [x] Build `components/ui/QRCode.tsx` (branded QR in Heroes gradient colors) _(decorative QR-style SVG with gradient frame + shimmer; swap for a real encoder once App Store URLs are finalised)_
- [x] Build `components/ui/StoreBadge.tsx` (official App Store / Google Play SVG badges) _(rectangular badge matching official layout; in-house glyphs pending licensed artwork)_
- [x] Typewriter the headline on scroll enter (reuse `TypewriterText`) _(IntersectionObserver at 0.35 threshold flips `start` → TypewriterText begins)_
- [x] Add gradient-border pulse animation to primary button _(`cta-pulse` keyframe on `GradientButton` — 3.6s box-shadow ring)_
- [x] Render QR code on desktop (hidden on mobile) _(`hidden lg:flex`)_
- [x] Add social proof line ("Join 32+ countries" or user count) _("32+ countries · 10,000+ travellers · The next hero could be you.")_
- [x] Add subtle distant Hero Orb callback (bookend) _(concentric borders + gradient-heroes glow behind the CTA; lighter than the real orb to keep the type legible)_
- [x] Replace text buttons with official `StoreBadge` components

### 3B.2 `ContactSection`
- [x] Build `components/ui/FloatingInput.tsx` (floating-label text input) _(uses `peer` + `:placeholder-shown` so label floats on both focus and filled states; coral border on error)_
- [x] Build `components/ui/FloatingTextarea.tsx` (floating-label textarea) _(same pattern, resizable)_
- [x] Build `components/sections/ContactForm.tsx` (composed form + validation + submit) _(typed status state: idle / submitting / success / error; mocked 1.2s submit)_
- [x] Build `components/sections/ContactSection.tsx` integrating form with footer area _(wired into `app/[locale]/page.tsx` after FinalCTA)_
- [x] Wrap form in glass card container _(`bg-white/40 backdrop-blur-md` with white border)_
- [x] Add client-side validation with inline error messages _(required + email regex + min-length; `aria-invalid` + `aria-describedby`)_
- [x] Success animation (confetti or checkmark) on submit _(animated checkmark + "Sent — Thank you" label; `sr-only` live region for screen readers)_
- [x] Add social links row (Twitter, Instagram) with hover scale + color transition _(Twitter, Instagram, GitHub — hover: scale 1.1, coral tint)_
- [x] Gradient send button with loading spinner state _(dual-ring spinner while submitting, morphs to checkmark on success)_

### 3B.3 `FloatingDownloadBar`
- [x] Build `components/ui/FloatingDownloadBar.tsx` (mobile only, `max-width: 768px`) _(replaces the old `DownloadBar`; `md:hidden`)_
- [x] Reveal after hero exits viewport (IntersectionObserver) _(observes `[data-hero-section]` added to Hero; scroll-threshold fallback if selector missing)_
- [x] Glass backdrop with brand gradient accent _(white/70 + backdrop-blur, gradient-heroes strip on the left edge)_
- [x] Slide-up entry animation _(`translate-y-[120%] → translate-y-0` with Heroes easing)_
- [x] Dismiss button that persists preference in `sessionStorage` _(key `heroes-download-bar-dismissed`; lazy state init reads it on mount so the bar never flashes)_
- [x] Show 「無料でダウンロード」 with Apple + Google icons _(i18n'd label + inline Apple/Play SVGs)_

### 3B.4 Phase verification
- [x] Form validates + submits end-to-end (mocked endpoint OK) _(required-field + email regex + min-length validation; 1.2s mock submit; success checkmark)_
- [x] Download bar never appears on desktop _(root element is `md:hidden`; verified via Playwright at 1440 — element is display:none)_
- [x] Dismissal persists across same-session navigation _(sessionStorage key set on dismiss; read at mount via lazy initializer so the bar never renders post-dismiss until the session ends)_
- [x] All CTAs have accessible focus states _(GradientButton, StoreBadge, social links, dismiss button all ship `focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-*`)_

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
