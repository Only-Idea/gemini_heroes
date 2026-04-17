# Phase 1: Foundation — Task Checklist

**Timeline**: Week 1–2
**Spec refs**: `docs/specs/03-technical-architecture.md`, `docs/specs/04-design-system.md`, `docs/specs/05-typography.md`

---

## 1. Project Setup

- [x] Initialize Next.js 15 project with App Router (`npx create-next-app@latest`)
- [x] Configure TypeScript (`strict: true` in tsconfig)
- [x] Install & configure Tailwind CSS 4.0 with PostCSS
- [x] Set up ESLint with Next.js recommended rules
- [x] Set up Prettier with consistent formatting rules
- [x] Create `.editorconfig` for consistent editor settings
- [x] Create project directory structure:
  - [x] `components/three/`
  - [x] `components/sections/`
  - [x] `components/ui/`
  - [x] `public/models/`
  - [x] `public/images/`
  - [x] `public/fonts/`

## 2. i18n Routing

- [x] Install `next-intl`
- [x] Configure proxy (middleware) for locale detection (ja default)
- [x] Set up routing: `/` → ja, `/en` → English
- [x] Create message files structure (`messages/ja.json`, `messages/en.json`)
- [x] Add placeholder translations for Navbar links:
  - [x] チャレンジ / Challenges
  - [x] 機能 / Features
  - [x] インパクト / Impact
  - [x] お問い合わせ / Contact
  - [x] ダウンロード / Download
- [x] Verify locale switching works in dev

## 3. Design System — CSS Variables

### 3a. Colors
- [x] Define primary gradient tokens:
  - [x] `--color-coral` → `#EC7A5C`
  - [x] `--color-amber` → `#F2BE5E`
  - [x] `--color-teal` → `#375E65`
- [x] Define background tokens:
  - [x] `--color-void` → `#0F1114`
  - [x] `--color-carbon` → `#181B21`
  - [x] `--color-slate` → `#1E2128`
- [x] Define text & UI tokens:
  - [x] `--color-ivory` → `#E8E2D6`
  - [x] `--color-stone` → `#A0998A`
  - [x] `--color-ash` → `#5A5550`
  - [x] `--color-border` → `#2A2E35`
- [x] Define gradient CSS: `--gradient-heroes: linear-gradient(135deg, #375E65 0%, #F2BE5E 50%, #EC7A5C 100%)`

### 3b. Spacing
- [x] Define spacing tokens in `globals.css`:
  - [x] `--space-xs: 4px`
  - [x] `--space-sm: 8px`
  - [x] `--space-md: 16px`
  - [x] `--space-lg: 32px`
  - [x] `--space-xl: 64px`
  - [x] `--space-2xl: 128px`
  - [x] `--space-3xl: 200px`

### 3c. Border & Radius
- [x] Define radius tokens:
  - [x] `--radius-sm: 8px` (minimum)
  - [x] `--radius-card: 20px`
  - [x] `--radius-pill: 999px`
  - [x] `--radius-phone-outer: 44px`
  - [x] `--radius-phone-inner: 34px`

### 3d. Easing
- [x] Define easing: `--ease-heroes: cubic-bezier(0.65, 0, 0.35, 1)`

### 3e. Tailwind Integration
- [x] Extend Tailwind config to use CSS variable tokens for colors
- [x] Extend Tailwind config to use spacing tokens
- [x] Verify Tailwind utilities resolve correctly in components

## 4. Typography & Font Loading

- [x] Define font stack CSS custom properties in `globals.css`:
  - [x] `--font-display` (system sans-serif stack)
  - [x] `--font-body` (`var(--font-display)`)
  - [x] `--font-mono` (system monospace stack)
- [x] Load Noto Sans JP from Google Fonts with `font-display: swap`
  - [x] Weights: 100, 300, 400, 500, 700, 900
- [x] Add Noto Sans JP via `next/font/google` (auto preconnect)
- [x] Define type scale classes or utilities:
  - [x] Hero title: clamp(45px, 8vw, 96px), weight 900, line-height 1.15, letter-spacing 0.02em
  - [x] Section title: clamp(32px, 4.5vw, 60px), weight 700, line-height 1.2
  - [x] Section label: 11px mono, weight 500, letter-spacing 0.25em, uppercase
  - [x] Body: 17px, weight 300, line-height 1.59
  - [x] Button text: 12px mono, weight 500, letter-spacing 0.1em
  - [x] Nav link: 13px, weight 400, letter-spacing 0.06em
  - [x] Stat number: clamp(45px, 5vw, 72px), weight 700
- [x] Set `<html lang="ja">` in root layout (dynamic via next-intl locale)
- [x] Verify font rendering on macOS (SF Pro) and test Noto fallback

## 5. Layout Components

### 5a. Root Layout (`app/[locale]/layout.tsx`)
- [x] Set metadata: title, description (Japanese), OG tags
- [x] Apply font stacks to `<body>`
- [x] Set background color `#0F1114`
- [x] Set primary text color `#E8E2D6`
- [x] Include Navbar and Footer in layout
- [x] Add GrainOverlay as global layer

### 5b. Navbar (`components/ui/Navbar.tsx`)
- [x] Fixed positioning with `backdrop-filter: blur`
- [x] Left: "Heroes" logo text (bold 700)
- [x] Center: scroll anchor links (チャレンジ / 機能 / インパクト / お問い合わせ)
- [x] Right: "ダウンロード" pill button with gradient border
- [x] On scroll past hero: background becomes `#1E2128` at 80% opacity
- [x] Mobile: hamburger menu with full-screen overlay
- [x] Touch targets: min 48px on mobile
- [x] i18n: all labels from translation files

### 5c. Footer (`components/ui/Footer.tsx`)
- [x] Links: プライバシー / 利用規約 / お問い合わせ
- [x] Social links: Twitter, Instagram
- [x] Copyright: © 2026 Heroes Inc.
- [x] Monospace font for footer text (11px, weight 400)
- [x] Hover: underline draws left to right (300ms)

### 5d. GrainOverlay (`components/ui/GrainOverlay.tsx`)
- [x] Full-viewport SVG noise overlay
- [x] Opacity: 4–6%
- [x] `mix-blend-mode: overlay`
- [x] `pointer-events: none`
- [x] Fixed position, z-index above content

### 5e. CustomCursor (`components/ui/CustomCursor.tsx`)
- [x] Desktop only (hide on `pointer: coarse`)
- [x] 6px dot: instant mouse tracking
- [x] 36px ring: lerped with 0.18 factor
- [x] Ring expands to 64px on interactive elements
- [x] Ring border color changes to coral on hover
- [x] Hide default cursor on desktop (`cursor: none` on body)

### 5f. ScrollProgress (`components/ui/ScrollProgress.tsx`)
- [x] Visual indicator of scroll position (0–1)
- [x] Gradient-colored progress bar or indicator
- [x] Fixed position, non-intrusive

## 6. Lenis Smooth Scroll

- [x] Install Lenis (`npm install lenis`)
- [x] Create scroll provider/wrapper component
- [x] Configure Lenis instance:
  - [x] `lerp: 0.1`
  - [x] `smoothWheel: true`
  - [x] `syncTouch: true`
  - [x] `touchMultiplier: 1.5`
  - [x] `infinite: false`
- [x] Install GSAP + ScrollTrigger (`npm install gsap`)
- [x] Hook GSAP ScrollTrigger into Lenis scroll events
- [x] Verify smooth scrolling works across Chrome, Safari, Firefox
- [x] Verify anchor link scrolling works (Navbar → sections)

## 7. Deploy Skeleton

- [ ] Push project to GitHub repository
- [ ] Connect repository to Vercel
- [ ] Configure Vercel project settings (framework: Next.js)
- [ ] Verify preview deploy works on commit
- [ ] Verify production domain is accessible
- [ ] Test that dark background + Navbar + grain overlay renders correctly in preview

---

## Validation Checklist (Phase 1 Complete)

- [ ] `npm run build` succeeds with zero errors
- [ ] `npm run lint` passes
- [ ] All CSS variables resolve correctly
- [ ] Fonts render: SF Pro on macOS, Noto Sans JP loaded for fallback
- [ ] Navbar fixed + blur works on scroll
- [ ] Mobile hamburger menu opens/closes
- [ ] GrainOverlay visible but non-interactive
- [ ] CustomCursor works on desktop, hidden on mobile
- [ ] Lenis smooth scroll active
- [ ] Scroll anchors navigate to correct positions
- [ ] i18n: `/` serves Japanese, `/en` serves English
- [ ] Vercel preview deploy is live and accessible
- [ ] Lighthouse: no critical issues on skeleton page
