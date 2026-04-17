# 09 — Animations & Micro-Interactions

## Page Load Sequence

| Time | Element | Effect |
|------|---------|--------|
| 0ms | Dark background | Renders immediately. Grain overlay appears. |
| 200ms | Navigation bar | Fades in (opacity 0→1, duration 600ms). |
| 400ms | Hero label | Slides up (translateY: 20px→0, opacity 0→1). |
| 600ms | Hero title line 1 | Slides up from below (mask-based reveal). |
| 750ms | Hero title line 2 | Slides up (italic, gradient color). |
| 1000ms | Hero subtitle | Fades up. |
| 1200ms | CTA buttons | Fade up with slight scale (0.95→1.0). |
| 1400ms | 3D orb | Fades in (opacity 0→1 over 800ms). Breathing begins. |
| 1600ms | Scroll hint | Fades in at bottom. |

## Easing Curve

Primary easing: `cubic-bezier(0.65, 0, 0.35, 1)` — a smooth deceleration curve used for all entrance animations, scroll reveals, and UI transitions. This is the "Heroes ease" and should be defined as a CSS custom property and a GSAP ease.

## Custom Cursor (Desktop Only)

Two-element cursor: a 6px dot (instant tracking) and a 36px ring (lerped with 0.18 factor). The ring expands to 64px on interactive elements (buttons, links, cards) and changes border color to coral. Hidden on touch devices via media query (`pointer: coarse`).

## Hover Effects

| Element | Hover Effect | Duration |
|---------|-------------|----------|
| Nav links | Opacity 0.7 → 1.0 | 300ms |
| Primary button | Gradient shifts 20% brighter, translateY: -2px, subtle shadow | 400ms |
| Ghost button | Border color transitions to ivory | 300ms |
| Challenge cards | Border color transitions to gradient, translateY: -6px, card glows | 500ms |
| Feature cards | Border transitions to coral, subtle scale(1.02) | 400ms |
| Footer links | Underline draws from left to right (width 0% → 100%) | 300ms |

## Scroll Reveal Pattern

All text blocks and cards use the same reveal pattern when entering the viewport (via IntersectionObserver at 15% threshold):

```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s var(--ease), transform 1s var(--ease);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

## Mobile App Annotations (Unique to this site)

Feature cards in the app showcase section include a "mobile annotation" system:
- Each feature has a small pill badge labeled 「アプリ機能」 (App Feature) with a phone icon.
- On desktop: a dotted SVG line draws itself from the badge to the phone mockup (stroke-dashoffset animation triggered on scroll).
- On mobile: the badge sits inline within the card, and a subtle phone-frame border appears around the card.
- App Store / Google Play badges appear near every section where app features are mentioned, not just the final CTA.
