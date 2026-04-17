# 03 — Technical Architecture

## Recommended Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO, image optimization, i18n routing |
| 3D Engine | React Three Fiber (R3F) + Drei | Declarative Three.js in React; Drei provides camera, scroll, etc. |
| 3D Scenes | Spline (spline.design) or Blender + glTF | Visual design tool with direct React export |
| Scroll Engine | @react-three/drei ScrollControls + Lenis | Smooth scroll with 3D scene integration |
| Animation | GSAP + ScrollTrigger + Framer Motion | Timeline-based scroll animations + React transitions |
| Styling | Tailwind CSS 4.0 + CSS variables | Utility-first, responsive, with custom design tokens |
| Font Loading | Google Fonts (Japanese subsets) | Optimized CJK font delivery via Google CDN |
| Deployment | Vercel or Cloudflare Pages | Edge CDN, automatic preview deploys, analytics |
| Analytics | Vercel Analytics or Plausible | Privacy-first, GDPR-compliant |

## Project Structure

```
heroes-web/
├── app/
│   ├── layout.tsx           ← Root layout, font imports, metadata
│   ├── page.tsx            ← Main scroll page
│   └── globals.css         ← CSS variables, Tailwind config
├── components/
│   ├── three/
│   │   ├── HeroOrb.tsx       ← Main 3D hero scene
│   │   ├── MedalScene.tsx     ← 3D rotating medal
│   │   ├── FujiScene.tsx      ← Mt. Fuji landscape scene
│   │   ├── MapGlobe.tsx       ← Interactive 3D globe
│   │   └── PhoneFloat.tsx     ← Floating phone mockup
│   ├── sections/
│   │   ├── Hero.tsx           ← Hero with 3D orb + headline
│   │   ├── Stats.tsx          ← Animated counters
│   │   ├── Challenges.tsx     ← 3 route cards
│   │   ├── Features.tsx       ← Feature showcase
│   │   ├── Medal.tsx          ← Medal section with 3D model
│   │   ├── Impact.tsx         ← Environmental impact
│   │   ├── PhoneShowcase.tsx  ← App screenshots in phone frame
│   │   ├── CTA.tsx            ← Final download CTA
│   │   └── Contact.tsx        ← Contact form
│   └── ui/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── CustomCursor.tsx
│       ├── GrainOverlay.tsx
│       └── ScrollProgress.tsx
├── public/
│   ├── models/              ← .glb/.gltf 3D models
│   ├── images/              ← Optimized images
│   └── fonts/               ← Self-hosted font subsets (fallback)
```

## Key Architecture Decisions

- **Single-page scroll architecture**: All content lives on one page with smooth scroll sections. No navigation to subpages. Navigation links are scroll anchors.
- **Progressive 3D loading**: Use React.lazy + Suspense for 3D components. Load lightweight placeholder first, then hydrate with full WebGL scene after initial paint.
- **Model optimization**: All glTF models compressed with Draco. Max 500KB per model. LOD (Level of Detail) for mobile vs desktop.
- **Scroll-driven state**: Global scroll progress (0–1) drives all animations. Each section has entry/exit thresholds. Uses IntersectionObserver + GSAP ScrollTrigger.
- **i18n**: next-intl for Japanese/English routing. Default locale: ja. URL pattern: `/` (ja) and `/en` (English).
