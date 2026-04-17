# 08 — Scroll-Interactive Effects

The entire page is a scroll-driven narrative. Each section responds to the user's scroll position with choreographed animations.

## Scroll Engine Setup

Use **Lenis** for smooth scrolling (lerp-based, ~0.1 lerp factor). Lenis normalizes scroll across browsers and enables smooth momentum. GSAP ScrollTrigger hooks into Lenis's scroll event for precise trigger points.

```js
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 1.5,
  infinite: false
});
```

## Scroll Timeline

| Scroll Range | Section | Effect |
|-------------|---------|--------|
| 0–100vh | Hero | 3D orb breathes and reacts to mouse. On scroll past 50vh, hero content fades out (opacity 1→0, translateY 0→-40px). Orb scales down slightly (1.0→0.85). |
| 100vh–130vh | Stats Bar | Three stat numbers count up from 0 to target. Each column staggers by 200ms. Gradient border fades in. |
| 130vh–280vh | Challenges | Cards enter from right (translateX: 100px→0) with stagger. Each card's 3D scene begins rendering on enter. Horizontal scroll on desktop. |
| 280vh–400vh | Medal | Medal model rotates from 80° to 0° (profile to front). Scale increases from 0.8→1.0. Surrounding text fades in at 320vh. |
| 400vh–520vh | Features | Phone mockup floats in from bottom. Feature cards fade in with 150ms stagger. Dotted annotation lines draw themselves (SVG stroke-dashoffset animation). |
| 520vh–620vh | Impact | Tree/ocean illustration animates (trees grow, waves move). Counter ticks up. Split layout slides in from opposing sides. |
| 620vh–700vh | Activities | Horizontal ribbon begins auto-scrolling. Activity icons scale up on enter. |
| 700vh–800vh | CTA | Final headline types itself (typewriter effect). Buttons pulse with gradient animation. |
| 800vh+ | Contact/Footer | Form fields fade in. Footer slides up. |

## Scroll-Linked 3D Behaviors

- **Hero orb**: As scroll progresses past the hero, the orb's wireframe opacity decreases and particles drift outward, creating a "dissolving" effect.
- **Medal**: Rotation is directly mapped to scroll progress within its section (`scrub: true` in GSAP terms). Dragging the scrollbar directly controls the medal angle.
- **Phone mockup**: Uses CSS perspective transform. As the user scrolls through the features section, the phone tilts from a slight angle (`rotateY: -15deg`) to face-forward (`0deg`).
- **Parallax layers**: Background elements in each section move at 50% of scroll speed. Foreground elements move at 100%. This creates depth without 3D.
