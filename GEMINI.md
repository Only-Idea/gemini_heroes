# Heroes Website — GEMINI.md

## Project Overview

Renovation of **medalhero.com** into a premium, single-page 3D scroll-interactive website.
Japanese-first (ja default, /en English). All content unified into one seamless scroll flow — no subpages.

**Source doc**: `Heroes-Website-Renovation-Documentation.docx` (full specification)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router), TypeScript |
| 3D Engine | React Three Fiber (R3F) + Drei |
| Scroll | Lenis + GSAP ScrollTrigger |
| Animation | GSAP + Framer Motion |
| Styling | Tailwind CSS 4.0 + CSS variables |
| i18n | next-intl (ja default, /en) |
| Deployment | Vercel or Cloudflare Pages |

## Project Structure

```
heroes-web/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main scroll page
│   └── globals.css         # CSS variables, Tailwind config
├── components/
│   ├── three/              # 3D scenes (HeroOrb, MedalScene, FujiScene, MapGlobe, PhoneFloat)
│   ├── sections/           # Page sections (Hero, Stats, Challenges, Features, Medal, Impact, PhoneShowcase, CTA, Contact)
│   └── ui/                 # Navbar, Footer, CustomCursor, GrainOverlay, ScrollProgress
├── public/
│   ├── models/             # .glb/.gltf 3D models
│   ├── images/             # Optimized images
│   └── fonts/              # Self-hosted font subsets (fallback)
└── docs/specs/             # Detailed specification files (参考)
```

## Key Architecture Decisions

- **Single-page scroll** — all content on one page, nav links are scroll anchors
- **Progressive 3D loading** — React.lazy + Suspense, placeholder first, then WebGL
- **Model optimization** — glTF + Draco compression, max 500KB/model, LOD for mobile
- **Scroll-driven state** — global scroll progress (0–1), IntersectionObserver + GSAP ScrollTrigger
- **System font stack** — Apple Japan style (-apple-system → Hiragino Sans → Noto Sans JP)

## Brand Colors (Quick Reference)

| Token | Hex | Role |
|-------|-----|------|
| Coral Sunset | `#EC7A5C` | CTA hover, accent |
| Golden Amber | `#F2BE5E` | Achievement badges, warm accent |
| Deep Teal | `#375E65` | Section labels, subheadings |
| Void | `#0F1114` | Page background |
| Carbon | `#181B21` | Card backgrounds |
| Warm Ivory | `#E8E2D6` | Primary text |
| Stone | `#A0998A` | Secondary text |

**Primary gradient**: `linear-gradient(135deg, #375E65 0%, #F2BE5E 50%, #EC7A5C 100%)`

## Performance Targets

| Metric | Mobile | Desktop |
|--------|--------|---------|
| FCP | < 1.5s | < 1.0s |
| LCP | < 2.5s | < 2.0s |
| JS Bundle | < 300KB gz | < 500KB gz |
| Lighthouse | 90+ | 95+ |
| CLS | < 0.05 | < 0.05 |
| 3D FPS | 30fps | 60fps |

## 10 Page Sections (Scroll Order)

1. **Navbar** (fixed) — backdrop blur, gradient download button
2. **Hero** (100vh+) — 3D breathing orb, gradient headline, CTA buttons
3. **Stats Bar** — 3 animated counters (3 routes / 12 activities / 32+ countries)
4. **Challenge Showcase** — 3 route cards (富士山 / 浪人 / 鉄道), horizontal scroll
5. **Medal Showcase** — 3D medal, scroll-driven rotation, conversion section
6. **App Features** — floating phone mockup, 6 feature cards with annotations
7. **Environmental Impact** — tree/ocean illustration, animated counter
8. **Activity Types** — horizontal infinite scroll ribbon, 12 icons
9. **Final CTA** — typewriter headline, App Store + Google Play buttons
10. **Contact & Footer** — form + links + social

## Brand Voice (Always Follow)

- **Empowering**: Celebrate the inner hero, never preach
- **Culturally respectful**: Japan depicted with accuracy and reverence
- **Warm and inclusive**: All fitness levels and abilities welcome
- **Premium but accessible**: Quality without exclusivity
- **Adventure-oriented**: 旅 (journey) and 冒険 (adventure), never トレーニング (training)
- **Purpose-driven**: Connect fitness to environmental/social impact

## 参考 — Detailed Specifications

Read these files **only when working on the relevant section** to avoid loading unnecessary context:

| File | Content | When to read |
|------|---------|-------------|
| `@docs/specs/01-executive-summary.md` | Project goals, scope of renovation | Project overview, onboarding |
| `@docs/specs/02-brand-content.md` | Brand overview, 6 messaging pillars, challenge routes, voice guidelines | Writing copy, understanding brand |
| `@docs/specs/03-technical-architecture.md` | Tech stack details, project structure, architecture decisions | Project setup, framework decisions |
| `@docs/specs/04-design-system.md` | Full color palette, spacing tokens, border/radius rules, grain overlay | Styling, CSS variables, component design |
| `@docs/specs/05-typography.md` | Apple Japan font stack, type scale, font loading strategy, CSS properties | Typography, font setup |
| `@docs/specs/06-page-sections.md` | Section-by-section content mapping with exact Japanese copy | Building any section component |
| `@docs/specs/07-3d-webgl.md` | Hero Orb layers, Medal scene, performance budgets, Three.js specs | 3D components, R3F scenes |
| `@docs/specs/08-scroll-effects.md` | Scroll timeline (vh ranges), Lenis config, scroll-linked 3D behaviors | Scroll animations, GSAP setup |
| `@docs/specs/09-animations.md` | Page load sequence, easing curve, custom cursor, hover effects, scroll reveal | Animations, micro-interactions |
| `@docs/specs/10-mobile-annotations.md` | Floating download bar, phone frame motif, QR code, app badges, "Try in Browser" | Mobile app emphasis features |
| `@docs/specs/11-responsive.md` | Breakpoints, mobile adaptations, performance by device | Responsive design, mobile optimization |
| `@docs/specs/12-assets.md` | 3D model placeholders, image specs, asset production plan | Asset management, placeholders |
| `@docs/specs/13-performance-seo.md` | Core Web Vitals strategy, SEO, accessibility, structured data | Performance, SEO, a11y |
| `@docs/specs/14-roadmap.md` | 6-phase implementation plan (11 weeks) | Project planning, prioritization |
