# Heroes Website — Component Enhancement Roadmap

> Comprehensive plan for transforming the current skeleton into an elegant, modern, and interactive premium experience.

---

## Current State Assessment

The foundation is solid: Next.js 15, R3F, GSAP+Lenis, Tailwind 4, i18n — all wired correctly. However, **all sections live inline in `page.tsx`** (267 lines) and `components/sections/` is empty. The 3D scenes are placeholder geometry, scroll animations are minimal, and interactivity is basic hover effects only.

**What works well**: Navbar, SmoothScroll, GrainOverlay, CustomCursor, ScrollProgress, HeroOrb distortion sphere, MedalScene placeholder, design system CSS variables.

**What needs work**: Everything below the hero is static content with no scroll-driven animation, no extracted components, no real interactivity, and placeholder content where rich experiences should be.

---

## Priority 1 — Extract & Enhance Existing Sections

### 1.1 `components/sections/HeroSection.tsx` — Extract & Upgrade

**Current**: Inline in page.tsx. Basic GSAP fade-in. Static buttons.

**Enhancements**:
| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **Staggered mask reveal** | Replace simple fade with `clipPath` mask reveal on each headline line (bottom-to-top wipe) | High visual polish |
| **Hero Orb 4-layer upgrade** | Add inner core (amber icosahedron), Fresnel glow shell, wireframe shells (2 layers), ambient particles (400 points) per spec 07 | Signature visual |
| **Parallax fade on scroll** | Hero content fades out + translates up as user scrolls past 50vh. Orb scales down 1.0 → 0.85 and dissolves | Narrative flow |
| **Gradient text shimmer** | Animated `background-position` on the gradient headline — slow, subtle movement | Premium feel |
| **Button micro-interactions** | Primary: gradient brightens + lift (-2px) + shadow bloom. Ghost: border transitions to ivory, background tints | Tactile response |
| **Typewriter label** | Top label types itself letter-by-letter on load (200ms delay, 40ms/char) | Cinematic entrance |

**New sub-components**:
- `AnimatedHeadline` — mask-based line-by-line text reveal with configurable stagger
- `GradientButton` — reusable CTA with hover state machine (idle → hover → active)
- `ScrollHint` — animated bouncing chevron with fade-out on scroll

---

### 1.2 `components/sections/StatsBar.tsx` — Animated Counters

**Current**: Static numbers, basic hover scale.

**Enhancements**:
| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **CountUp animation** | Numbers count from 0 to target on scroll enter (IntersectionObserver, 2s duration, ease-out) | Engagement |
| **Staggered entry** | Each stat column enters 200ms apart from left to right | Choreography |
| **Gradient border reveal** | Top border draws itself from center outward on scroll trigger | Visual delight |
| **Number spring physics** | Use spring easing (slight overshoot) on counter for organic feel | Polish |
| **Locale-aware formatting** | Use `Intl.NumberFormat('ja-JP')` for proper number display | i18n |

**New sub-components**:
- `AnimatedCounter` — scroll-triggered number counter with spring physics, configurable target/duration/format
- `StatCard` — reusable stat display with label, value, hover effect

---

### 1.3 `components/sections/ChallengeShowcase.tsx` — Interactive Route Cards

**Current**: 3 static cards with gradient line hover. Placeholder content.

**Enhancements**:
| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **Card entry animation** | Cards enter from right (`translateX: 100px → 0`) with 200ms stagger on scroll | Dramatic reveal |
| **3D tilt on hover** | CSS `perspective` + `rotateX/Y` based on mouse position within card (max 5deg) | Depth & interactivity |
| **Route preview images** | Replace circle placeholder with actual route imagery or gradient illustrations | Content richness |
| **Difficulty badge** | Small pill badge (Easy/Moderate/Epic) with color-coded accent | Information density |
| **Distance & duration** | Show route stats (km, estimated days) on card hover or always visible | Useful data |
| **Expand interaction** | Click/tap opens an overlay or expands card to reveal full route description | Deep engagement |
| **Horizontal scroll (desktop)** | Pin section, scroll horizontally through cards (GSAP ScrollTrigger horizontal) | Spec compliance |
| **Phone frame motif** | Map preview area within cards uses phone-shaped container (border-radius: 44px) | App reinforcement |

**New sub-components**:
- `RouteCard` — interactive card with 3D tilt, expand state, route metadata
- `HorizontalScrollContainer` — GSAP-powered horizontal scroll with pin
- `DifficultyBadge` — color-coded route difficulty indicator

---

### 1.4 `components/sections/FeatureShowcase.tsx` — Bento Grid Upgrade

**Current**: Basic glass cards in bento grid. No interactivity. Placeholder text.

**Enhancements**:
| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **Floating phone mockup** | CSS 3D phone frame floating in from bottom on scroll. Shows app screenshots | Core visual |
| **Feature card stagger** | Cards fade in with 150ms stagger on scroll enter | Choreography |
| **Border glow on hover** | Card border transitions to coral, subtle `scale(1.02)` | Interaction feedback |
| **Annotation lines (desktop)** | Dotted SVG lines draw from 「アプリ機能」 badges to phone mockup (`stroke-dashoffset` animation) | Unique differentiator |
| **Phone tilt parallax** | Phone rotates from `rotateY(-15deg)` to `0deg` as user scrolls through section | 3D integration |
| **Interactive map snippet** | Primary bento cell shows a mini interactive map preview (static image or Mapbox lite) | Engagement |
| **Icon animations** | Each feature card has an animated icon (Lottie or CSS) that plays on scroll enter | Visual interest |
| **App badge integration** | Small App Store / Google Play micro-badges within feature cards | Download push |

**New sub-components**:
- `PhoneFrame` — phone-shaped container with tilt parallax, shadow, bezel
- `FeatureCard` — bento cell with icon, title, description, annotation badge
- `AnnotationLine` — SVG dotted line that draws on scroll (stroke-dashoffset)
- `AppBadge` — compact App Store / Google Play badge component

---

### 1.5 `components/sections/MedalShowcase.tsx` — 3D Medal Experience

**Current**: Medal floats with auto-rotation. No scroll interaction.

**Enhancements**:
| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **Scroll-driven rotation** | Medal rotates from 80deg profile to 0deg front-facing, mapped to scroll position (`scrub: true`) | Core interaction |
| **Scale animation** | Medal scales 0.8 → 1.0 through its scroll range | Dramatic reveal |
| **Studio lighting** | Enhanced lighting with environment map (gradient HDRI), spotlight, rim light | Premium quality |
| **Gold/Silver/Bronze variants** | Toggle or auto-cycle between medal materials | Aspiration |
| **Surrounding text parallax** | Text fades in at scroll midpoint while medal continues rotating | Layered narrative |
| **Contact shadows** | R3F `ContactShadows` grounding the medal on the ivory surface | Physical grounding |
| **Particle burst** | Subtle particle effect when medal reaches front-facing position | Celebration moment |
| **Conversion CTA** | "Earn Your Medal" CTA with App Store badges appears below medal | Conversion |

**New sub-components**:
- `ScrollDrivenMedal` — enhanced MedalScene with GSAP ScrollTrigger rotation binding
- `MedalMaterial` — PBR material with gold/silver/bronze presets and environment reflections

---

### 1.6 `components/sections/ImpactSection.tsx` — Environmental Storytelling

**Current**: Static 2x2 grid with numbers. No animation.

**Enhancements**:
| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **Split layout slide-in** | Left column slides from left, right grid from right (opposing directions) | Dynamic entry |
| **Tree growth illustration** | Animated SVG/CSS tree that "grows" as user scrolls through section | Emotional connection |
| **Ocean wave animation** | Subtle CSS wave animation behind ocean stat | Thematic |
| **Animated counters** | Impact numbers count up on scroll enter (reuse AnimatedCounter) | Consistency |
| **Progress visualization** | Circular or bar progress showing impact goals | Motivation |
| **Teal/Coral color coding** | Tree stats in teal, ocean stats in coral — per brand guidelines | Brand consistency |
| **Partner logos** | Small row of environmental partner organization logos | Credibility |

**New sub-components**:
- `TreeIllustration` — animated SVG tree with scroll-driven growth
- `WaveAnimation` — CSS/SVG ocean wave background effect
- `ImpactCounter` — large number + label + progress indicator

---

### 1.7 `components/sections/FinalCTA.tsx` — Conversion Finale

**Current**: Static headline + two buttons. Gradient background wash.

**Enhancements**:
| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **Typewriter headline** | Headline types itself character by character on scroll enter | Cinematic |
| **Button pulse** | Gradient border animation pulses subtly to draw attention | Conversion |
| **QR Code (desktop)** | Branded QR code in Heroes gradient colors linking to app store | Desktop conversion |
| **Social proof** | "Join 32+ countries" or user count near buttons | Trust signal |
| **Background orb callback** | Subtle, distant version of the Hero Orb reappears (bookend effect) | Narrative closure |
| **App Store official badges** | Official SVG App Store and Google Play badges (not text buttons) | Legitimacy |

**New sub-components**:
- `TypewriterText` — character-by-character text reveal with cursor blink
- `QRCode` — branded QR code generator (gradient-colored, desktop only)
- `StoreBadge` — official app store download badge component

---

## Priority 2 — New Components to Add

### 2.1 `components/sections/ActivityRibbon.tsx` — Infinite Scroll Marquee

**Status**: Not built. Specified in section 8.

**Implementation**:
| Feature | Description |
|---------|-------------|
| **Infinite horizontal scroll** | CSS `@keyframes` marquee or GSAP-driven infinite loop |
| **12 activity icons** | Minimalist line icons: Running, Walking, Cycling, Swimming, Hiking, Yoga, etc. |
| **Icon + label pairs** | Each activity has an icon and Japanese/English label |
| **Pause on hover** | Marquee pauses when user hovers over it |
| **Dual-row variant** | Two rows scrolling in opposite directions for visual richness |
| **Scale on enter** | Icons scale up as they enter viewport center |
| **White background strip** | Pure white background contrasting with ivory sections |

**New sub-components**:
- `Marquee` — reusable infinite scroll component (direction, speed, pauseOnHover)
- `ActivityIcon` — minimalist activity icon with label (SVG)
- `ActivityRibbon` — composed section with dual-row marquee

---

### 2.2 `components/sections/ContactSection.tsx` — Form & Footer Integration

**Status**: Only Footer.tsx exists. No contact form.

**Implementation**:
| Feature | Description |
|---------|-------------|
| **Glass form card** | Form wrapped in crystalline glass container |
| **Floating labels** | Input labels float up on focus (material design pattern) |
| **Validation** | Client-side validation with inline error messages |
| **Success animation** | Confetti or checkmark animation on successful submit |
| **Social links row** | Twitter, Instagram with hover scale + color transition |
| **Gradient send button** | Submit button with brand gradient + loading spinner |

**New sub-components**:
- `FloatingInput` — text input with animated floating label
- `FloatingTextarea` — textarea with animated floating label
- `ContactForm` — composed form with validation and submit handling

---

### 2.3 `components/ui/FloatingDownloadBar.tsx` — Mobile Sticky CTA

**Status**: Not built. Specified in spec 10.

**Implementation**:
| Feature | Description |
|---------|-------------|
| **Mobile only** | Visible only on `max-width: 768px` |
| **Appears after hero** | Shows after scrolling past hero section (IntersectionObserver) |
| **Glass backdrop** | `backdrop-filter: blur` with brand gradient accent |
| **Dismiss button** | X button to hide (stores preference in sessionStorage) |
| **Slide-up entry** | Animates up from bottom of screen |
| **Download text** | 「無料でダウンロード」 with Apple + Google icons |

---

### 2.4 `components/ui/PageTransition.tsx` — Load Experience

**Status**: Not built.

**Implementation**:
| Feature | Description |
|---------|-------------|
| **Loading screen** | Full-screen overlay during initial load with Heroes gradient |
| **Progress indicator** | Minimal loading bar or orb animation |
| **Text sequence** | "Preparing your odyssey..." → fade out to reveal page |
| **WebGL sync** | Waits for `isWebGLReady` before dismissing |
| **Exit animation** | Slides up / fades out to reveal the hero section |

---

## Priority 3 — 3D Scene Enhancements

### 3.1 `components/three/HeroOrb.tsx` — Full 4-Layer Implementation

**Current**: Single distortion sphere + wireframe shell. Missing 2 of 4 spec layers.

| Layer | Status | Enhancement |
|-------|--------|-------------|
| **Inner core** | Missing | Amber icosahedron (`#F2BE5E`), opacity pulse 0.7–1.0 on 4s cycle |
| **Core glow** | Missing | Custom `ShaderMaterial` with Fresnel glow, `AdditiveBlending`, `BackSide` |
| **Wireframe shell 1** | Exists (partial) | Warm ivory at 25% opacity, independent X/Z rotation |
| **Wireframe shell 2** | Missing | Outer icosahedron at 8% opacity, counter-rotating |
| **Ambient particles** | Missing | 400 points in spherical shell (r: 3–8), sine/cosine drift |
| **Dissolve on scroll** | Missing | Wireframe opacity decreases, particles drift outward past hero |
| **Lighting** | Basic | Add 2-point lighting (coral + cool blue) per spec |

---

### 3.2 `components/three/FujiScene.tsx` — New

**Status**: Not built. Referenced in GEMINI.md.

| Feature | Description |
|---------|-------------|
| **Terrain mesh** | Low-poly heightmap of Mt. Fuji or stylized mountain |
| **Auto-rotation** | Gentle continuous rotation on Y-axis |
| **Snow cap** | White material on top vertices |
| **Atmosphere** | Gradient sky backdrop within the scene |
| **Trigger** | Renders only when challenge card is in viewport |
| **LOD** | Simplified geometry on mobile |

---

### 3.3 `components/three/PhoneFloat.tsx` — New

**Status**: Not built. Referenced in GEMINI.md.

| Feature | Description |
|---------|-------------|
| **CSS 3D approach** | Phone frame using CSS `perspective` + `transform`, not full WebGL |
| **App screenshots** | Rotate through app screens inside the phone frame |
| **Cursor tilt** | Desktop: tilt based on mouse position. Mobile: gyroscope API |
| **Float animation** | Gentle Y-axis oscillation (R3F Float or CSS keyframes) |
| **Scroll-driven** | Tilts from angled to front-facing through feature section scroll |

---

### 3.4 `components/three/MapGlobe.tsx` — Future (Optional)

**Status**: Not built. Listed as optional in spec 07.

| Feature | Description |
|---------|-------------|
| **Procedural sphere** | Earth-like globe with simplified land masses |
| **Route markers** | Glowing dots on 32+ countries where users are active |
| **Drag interaction** | User can drag to rotate the globe |
| **Connection lines** | Animated arcs connecting active regions |
| **Hero alternative** | Could replace or complement the Hero Orb |

---

## Priority 4 — Scroll & Animation System

### 4.1 `ScrollReveal` — Global Scroll Animation System

**Current**: `.reveal` CSS class exists but not implemented with IntersectionObserver or GSAP.

**Implementation**:
| Feature | Description |
|---------|-------------|
| **IntersectionObserver wrapper** | React hook `useScrollReveal` that adds `.visible` class at 15% threshold |
| **GSAP ScrollTrigger integration** | For complex animations (scrub, pin, stagger) |
| **Reveal variants** | `fade-up` (default), `fade-left`, `fade-right`, `scale-up`, `mask-reveal` |
| **Stagger groups** | Parent with `data-stagger` auto-staggers children |
| **Reduced motion** | Respects `prefers-reduced-motion` — instant reveal, no transform |

**New hooks & utilities**:
- `useScrollReveal(ref, options)` — IntersectionObserver-based reveal
- `useScrollProgress(ref)` — returns 0–1 scroll progress within element
- `useParallax(ref, speed)` — parallax transform at specified speed

---

### 4.2 Page Load Sequence — Orchestrated Entry

**Current**: Simple GSAP fade-in for hero elements.

**Target** (per spec 09):
| Time | Element | Effect |
|------|---------|--------|
| 0ms | Background | Render immediately with grain |
| 200ms | Navbar | Fade in (600ms) |
| 400ms | Hero label | Slide up + typewriter |
| 600ms | Headline L1 | Mask reveal from bottom |
| 750ms | Headline L2 | Mask reveal (italic, gradient) |
| 1000ms | Subtitle | Fade up |
| 1200ms | CTA buttons | Fade up + scale 0.95→1.0 |
| 1400ms | 3D Orb | Fade in (800ms), breathing begins |
| 1600ms | Scroll hint | Fade in at bottom |

---

## Priority 5 — UI Polish Components

### 5.1 `components/ui/SectionLabel.tsx`

Reusable section header pattern (currently duplicated in every section).

```
[number] / [label]  — monospace, uppercase, tracking-wide, accent color
[title]             — display font, bold, foreground
[description]       — body-lg, muted, max-width
```

---

### 5.2 `components/ui/GlassCard.tsx`

Reusable glass card with configurable size, hover effects, and content slots.

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `'default' \| 'feature' \| 'stat' \| 'impact'` | Style presets |
| `hoverEffect` | `'lift' \| 'glow' \| 'tilt' \| 'none'` | Hover interaction |
| `glowColor` | `string` | Background glow blob color |
| `span` | `number` | Bento grid column span |

---

### 5.3 `components/ui/GradientText.tsx`

Reusable gradient text with animation option.

| Prop | Type | Description |
|------|------|-------------|
| `animate` | `boolean` | Enable shimmer animation |
| `gradient` | `string` | Custom gradient or use brand default |
| `as` | `'h1' \| 'h2' \| 'span'` | Rendered element |

---

### 5.4 `components/ui/Cursor3DTilt.tsx`

Wrapper that adds 3D perspective tilt to any child element based on cursor position.

| Prop | Type | Description |
|------|------|-------------|
| `maxTilt` | `number` | Maximum rotation degrees (default: 5) |
| `perspective` | `number` | CSS perspective value (default: 1000) |
| `scale` | `number` | Scale on hover (default: 1.02) |
| `glare` | `boolean` | Add light glare effect following cursor |

---

### 5.5 `components/ui/MagneticButton.tsx`

Button that subtly pulls toward cursor when nearby (magnetic effect).

| Prop | Type | Description |
|------|------|-------------|
| `strength` | `number` | Magnetic pull distance (px) |
| `variant` | `'gradient' \| 'ghost' \| 'dark'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | Size preset |

---

### 5.6 `components/ui/ParallaxLayer.tsx`

Wrapper that moves content at a fraction of scroll speed for depth.

| Prop | Type | Description |
|------|------|-------------|
| `speed` | `number` | Scroll multiplier (0.5 = half speed, default) |
| `direction` | `'vertical' \| 'horizontal'` | Parallax direction |

---

## Priority 6 — Future Enhancements (Post-Launch)

### 6.1 "Try in Browser" Mini-Experience

Per spec 10 — an interactive phone-framed container showing a mini Mapbox map with a simulated challenge route. Users can click landmarks to see info popups. Bridges browsing → downloading.

| Feature | Description |
|---------|-------------|
| **Phone-framed container** | `border-radius: 44px`, `aspect-ratio: 9/19.5` |
| **Mapbox embed** | Lite map showing a challenge route |
| **Interactive landmarks** | Click markers for info popups |
| **Route animation** | Animated path drawing along the route |
| **"Open in App" CTA** | Button at bottom of mini-experience |

---

### 6.2 Testimonial / Social Proof Section

Not in current spec but valuable for conversion.

| Feature | Description |
|---------|-------------|
| **User stories carousel** | Auto-scrolling testimonials from real users |
| **Country flags** | Show global community diversity |
| **Photo + quote** | Glass cards with user avatar, quote, country |
| **Rating display** | App Store rating visualization |

---

### 6.3 Blog / Updates Section

| Feature | Description |
|---------|-------------|
| **Latest updates ribbon** | Horizontal scroll of latest blog/update cards |
| **Category pills** | Filter by: Routes, Features, Community |
| **Glass cards** | Consistent with site design language |
| **Link to blog** | External link to full blog when it launches |

---

### 6.4 Accessibility Enhancements

| Feature | Description |
|---------|-------------|
| **Skip to content** | Hidden link for keyboard users |
| **Focus indicators** | Custom focus rings matching brand (coral outline) |
| **Screen reader text** | `sr-only` labels for all interactive elements |
| **Reduced motion mode** | Full implementation: disable 3D, simplify animations |
| **High contrast mode** | CSS media query adjustments |
| **Keyboard navigation** | Tab order through all sections, Enter to interact |

---

### 6.5 Performance Optimizations

| Feature | Description |
|---------|-------------|
| **Image optimization** | Next.js `<Image>` with blur placeholders, WebP/AVIF |
| **3D lazy loading** | Load 3D scenes only when section approaches viewport |
| **Bundle splitting** | Dynamic imports for each section component |
| **Font subsetting** | Load only required Noto Sans JP glyphs per page |
| **Service worker** | Offline-capable with pre-cached assets |
| **LOD system** | Mobile gets simplified 3D (fewer particles, lower detail) |

---

## Component Architecture Summary

```
components/
├── three/
│   ├── Scene.tsx              ✅ exists (enhance ticker)
│   ├── HeroOrb.tsx            ✅ exists (upgrade to 4-layer)
│   ├── MedalScene.tsx         ✅ exists (add scroll-driven rotation)
│   ├── DevTools.tsx           ✅ exists
│   ├── FujiScene.tsx          🆕 new (challenge card 3D)
│   ├── PhoneFloat.tsx         🆕 new (CSS 3D phone mockup)
│   └── MapGlobe.tsx           🆕 future (optional globe)
├── sections/
│   ├── HeroSection.tsx        🆕 extract from page.tsx
│   ├── StatsBar.tsx           🆕 extract from page.tsx
│   ├── ChallengeShowcase.tsx  🆕 extract from page.tsx
│   ├── FeatureShowcase.tsx    🆕 extract from page.tsx
│   ├── MedalShowcase.tsx      🆕 extract from page.tsx
│   ├── ImpactSection.tsx      🆕 extract from page.tsx
│   ├── ActivityRibbon.tsx     🆕 new section
│   ├── FinalCTA.tsx           🆕 extract from page.tsx
│   └── ContactSection.tsx     🆕 new section
├── ui/
│   ├── Navbar.tsx             ✅ exists (minor polish)
│   ├── Footer.tsx             ✅ exists
│   ├── GrainOverlay.tsx       ✅ exists
│   ├── CustomCursor.tsx       ✅ exists
│   ├── ScrollProgress.tsx     ✅ exists
│   ├── SmoothScroll.tsx       ✅ exists
│   ├── SectionLabel.tsx       🆕 new (reusable header)
│   ├── GlassCard.tsx          🆕 new (reusable card)
│   ├── GradientText.tsx       🆕 new (animated gradient text)
│   ├── AnimatedCounter.tsx    🆕 new (scroll-triggered counter)
│   ├── AnimatedHeadline.tsx   🆕 new (mask reveal text)
│   ├── TypewriterText.tsx     🆕 new (character reveal)
│   ├── MagneticButton.tsx     🆕 new (magnetic hover)
│   ├── GradientButton.tsx     🆕 new (brand CTA button)
│   ├── Cursor3DTilt.tsx       🆕 new (3D tilt wrapper)
│   ├── ParallaxLayer.tsx      🆕 new (scroll parallax)
│   ├── Marquee.tsx            🆕 new (infinite scroll)
│   ├── FloatingDownloadBar.tsx 🆕 new (mobile sticky CTA)
│   ├── PageTransition.tsx     🆕 new (loading screen)
│   ├── PhoneFrame.tsx         🆕 new (phone-shaped container)
│   ├── AppBadge.tsx           🆕 new (store badges)
│   ├── AnnotationLine.tsx     🆕 new (SVG dotted line)
│   ├── FloatingInput.tsx      🆕 new (form input)
│   └── QRCode.tsx             🆕 future (branded QR)
└── hooks/
    ├── useScrollReveal.ts     🆕 new (IntersectionObserver reveal)
    ├── useScrollProgress.ts   🆕 new (section scroll 0-1)
    └── useParallax.ts         🆕 new (parallax transform)
```

---

## Implementation Priority Order

| Phase | Components | Effort | Impact |
|-------|-----------|--------|--------|
| **Phase 2A** | Extract all sections from page.tsx, SectionLabel, GlassCard, AnimatedCounter, useScrollReveal | 3-4 days | Foundation for everything |
| **Phase 2B** | HeroSection upgrade (mask reveal, 4-layer orb, parallax fade), PageTransition | 3-4 days | First impression |
| **Phase 2C** | ChallengeShowcase (3D tilt, horizontal scroll), FeatureShowcase (phone mockup, annotations) | 4-5 days | Core content |
| **Phase 3A** | MedalShowcase (scroll-driven rotation), ActivityRibbon (marquee), ImpactSection (animations) | 3-4 days | Mid-page engagement |
| **Phase 3B** | FinalCTA (typewriter, QR), ContactSection (form), FloatingDownloadBar | 2-3 days | Conversion |
| **Phase 4** | FujiScene, PhoneFloat, MapGlobe, "Try in Browser" mini-experience | 5-7 days | Premium differentiation |
| **Phase 5** | Performance optimization, accessibility, testing, deployment | 3-4 days | Production readiness |

---

## Magic UI Component Integration Map

Based on research of the **full Magic UI registry (77 components)**, here are the components directly applicable to Heroes, with source code reviewed and adaptation notes.

### Direct-Use Components (install or copy)

| Magic UI Component | Heroes Use Case | Adaptation Notes |
|--------------------|----------------|------------------|
| **`marquee`** | ActivityRibbon (Section 8) — infinite scroll of activity icons | Props: `reverse`, `pauseOnHover`, `vertical`, `repeat`. Uses CSS `animate-marquee`. Dual-row: two `<Marquee>` instances with `reverse` on second. Add `[--duration:30s]` for speed control. |
| **`number-ticker`** | StatsBar + ImpactSection — animated counters (3, 12, 32+, 10k+, 500+) | Uses `motion/react` springs (`damping:60, stiffness:100`). Props: `value`, `startValue`, `direction`, `delay`, `decimalPlaces`. Adapt `Intl.NumberFormat` locale from `en-US` to `ja-JP`. |
| **`bento-grid`** | FeatureShowcase — structured card layout | `BentoGrid` (3-col auto-rows) + `BentoCard` (icon, name, description, background, CTA). Adapt: change grid to 12-col, add glass styling, remove dark mode styles, use Heroes color tokens. |
| **`typing-animation`** | Hero label + FinalCTA headline — typewriter text effect | Full-featured: `typeSpeed`, `deleteSpeed`, `words[]` cycling, `showCursor`, `cursorStyle`, `startOnView`, `loop`. Use `as="h2"` for CTA. Disable `loop` for one-shot hero label. |
| **`text-reveal`** | ImpactSection or MedalSection — scroll-driven word reveal | Words reveal opacity 0→1 mapped to `scrollYProgress`. Uses `200vh` sticky container. Adapt: match Heroes typography, use brand colors instead of black/white. |
| **`blur-fade`** | Global scroll reveal — fade+blur entrance for all sections | Props: `direction` (up/down/left/right), `delay`, `offset`, `blur`, `inView`. Drop-in replacement for custom `useScrollReveal`. Uses `motion/react` AnimatePresence. |
| **`shimmer-button`** | Hero primary CTA — premium animated button | Conic-gradient shimmer rotating around button. Adapt: change `--bg` to Heroes gradient, `--shimmer-color` to ivory, `borderRadius` to `999px` (pill). |
| **`border-beam`** | GlassCard accent — animated beam traveling card borders | Animated gradient dot traveling card perimeter. Props: `colorFrom`/`colorTo` (use coral→teal), `duration`, `size`. Add to feature cards on hover. |
| **`particles`** | Hero background — mouse-reactive floating particles | Canvas-based, mouse-magnetic particles. Props: `quantity` (400 per spec), `color` (ivory), `staticity`, `ease`, `size`. Layer behind HeroOrb for depth. |
| **`globe`** | MapGlobe (Priority 3.4) — interactive world globe | Uses `cobe` library. Props: `markers` (32+ country locations), drag-to-rotate. Adapt: light theme (`dark:0`), marker color to coral, base color to ivory. |

### Accent/Enhancement Components (add interactivity polish)

| Magic UI Component | Heroes Use Case | Notes |
|--------------------|----------------|-------|
| **`ripple`** | MedalShowcase background — expanding concentric circles | Creates ambient motion behind medal. Adapt: use `foreground/10` opacity, reduce `numCircles` to 5. |
| **`ripple-button`** | Contact form submit — click ripple effect | Material-design ripple on click. Adapt `rippleColor` to coral. |
| **`meteors`** | Hero section or FinalCTA — falling star/meteor effect | Animated diagonal streaks. Use sparingly (5-8 meteors) at low opacity for subtle magic. Adapt angle for downward flow. |
| **`progressive-blur`** | Navbar scroll effect — progressive blur at page top | Layered `backdrop-filter` blur. Replace current simple blur with graduated blur for premium feel. Position: `top`. |
| **`dock`** | Mobile navigation alternative — macOS-style icon dock | Spring-physics magnification on hover. Could replace hamburger menu with bottom dock on mobile. Uses `motion/react` springs. |
| **`iphone`** | FeatureShowcase — realistic phone frame for app screenshots | Pre-built iPhone mockup component. Use instead of custom PhoneFrame for consistency. |
| **`animated-shiny-text`** | Section labels or badges — shimmering text accent | Animated gradient sweep across text. Use for "NEW" badges or section labels. |
| **`animated-gradient-text`** | Hero headline — animated gradient cycling | Gradient color animation on text. Alternative to static `text-gradient-heroes`. |
| **`confetti`** | Contact form success — celebration animation | Trigger on form submit success. Use Heroes gradient colors for confetti. |
| **`cool-mode`** | Easter egg — fun particle burst on click anywhere | Spawns emoji/particles on click. Optional fun feature for engagement. |
| **`sparkles-text`** | Medal section title — sparkle effect on "achievement" text | Animated sparkle stars around text. Use on medal/achievement-related headings. |
| **`orbiting-circles`** | Medal or Hero section — orbiting decorative elements | Circles orbit around a center point. Could orbit around medal or hero orb. |
| **`scroll-based-velocity`** | ActivityRibbon enhancement — speed reacts to scroll velocity | Text/elements speed up when user scrolls faster. More dynamic than static marquee speed. |
| **`morphing-text`** | Hero or CTA — smooth text morphing between words | Text morphs between multiple strings. Could cycle: "旅" → "冒険" → "達成". |
| **`noise-texture`** | Global — improved grain overlay | Better noise texture than current SVG fractalNoise. Could replace GrainOverlay. |
| **`neon-gradient-card`** | Challenge cards — glowing border effect | Moving gradient glow border. More premium than current static border + gradient line. |
| **`magic-card`** | Feature/Challenge cards — spotlight hover effect | Mouse-following spotlight gradient inside card. Premium interactive feel. |
| **`glare-hover`** | Challenge/Feature cards — light glare following cursor | Realistic light glare effect on hover. Adds physical "shiny surface" feel to glass cards. |
| **`lens`** | Feature screenshots — magnification lens effect | Hover magnification on images. Use on app screenshots in feature section. |
| **`interactive-grid-pattern`** | Background — mouse-reactive grid dots | Grid pattern that lights up near cursor. Could be subtle section background. |
| **`warp-background`** | Hero or CTA background — warping dot grid | Animated dots with wave distortion. Alternative hero background effect. |

### Dependency Notes

| Dependency | Required By | Already In Project? |
|------------|-------------|---------------------|
| `motion` (motion/react) | number-ticker, typing-animation, text-reveal, blur-fade, border-beam, dock | No — need to install |
| `cobe` | globe | No — need to install |
| `class-variance-authority` | dock | No — need to install |
| `@radix-ui/react-icons` | bento-grid | No — optional, can use custom icons |
| `cn` utility (`@/lib/utils`) | All components | No — need to create (clsx + tailwind-merge) |

**Install command**:
```bash
npm install motion cobe class-variance-authority clsx tailwind-merge
```

**Create `lib/utils.ts`**:
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```

### Tailwind Animation Keyframes Required

Add to `tailwind.config.ts` or `globals.css`:
```css
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(calc(-100% - var(--gap))); } }
@keyframes marquee-vertical { from { transform: translateY(0); } to { transform: translateY(calc(-100% - var(--gap))); } }
@keyframes shimmer-slide { to { transform: translate(calc(100cqw - 100%), 0); } }
@keyframes spin-around { 0% { transform: translateZ(0) rotate(0); } 15%, 35% { transform: translateZ(0) rotate(90deg); } 65%, 85% { transform: translateZ(0) rotate(270deg); } 100% { transform: translateZ(0) rotate(360deg); } }
@keyframes meteor { 0% { transform: rotate(var(--angle)) translateX(0); opacity: 1; } 70% { opacity: 1; } 100% { transform: rotate(var(--angle)) translateX(-500px); opacity: 0; } }
@keyframes ripple { 0% { transform: translate(-50%, -50%) scale(1); opacity: var(--opacity); } 100% { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
@keyframes blink-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
```

---

## Design Principles for All New Components

1. **Glass-first surfaces** — all cards use `glass` utility (white/40 + blur-12 + 1px crystalline border)
2. **Brand gradient as accent only** — never as large backgrounds, only text, lines, badges, buttons
3. **Scroll-driven narrative** — every section responds to scroll position, not just appears
4. **Minimal but tactile** — interactions should feel physical (spring physics, magnetic pull, 3D tilt)
5. **Mobile-first, 3D-optional** — every feature works without WebGL; 3D enhances but isn't required
6. **Japanese-first copy** — all text from translation files, culturally adapted not translated
7. **60fps or nothing** — if an animation can't run at 60fps on desktop, simplify or remove it
8. **Reduced motion respect** — every animation has a `prefers-reduced-motion` fallback
