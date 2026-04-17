# 11 — Responsive Design Strategy

## Breakpoints

| Name | Range | Target Devices | Key Changes |
|------|-------|---------------|-------------|
| Mobile S | 320–374px | iPhone SE, older Androids | Single column, reduced spacing, no 3D particles |
| Mobile | 375–767px | Standard phones | Single column, simplified 3D scenes, sticky download bar |
| Tablet | 768–1023px | iPad, tablets | 2-column grid, 3D scenes render at reduced quality |
| Desktop | 1024–1439px | Laptops | Full layout, custom cursor enabled, all 3D effects |
| Desktop L | 1440px+ | Monitors | Max-width container (1400px centered), full particle count |

## Mobile-Specific Adaptations

- **Custom cursor**: Hidden on touch devices (`pointer: coarse`). All `cursor: none` styles removed.
- **3D scenes**: Particle count reduced 400→100. Wireframe shells reduced to 1 (not 2). Draw calls halved. Target 30fps instead of 60.
- **Navigation**: Hamburger menu with full-screen overlay. Navigation links stacked vertically with large touch targets (min 48px).
- **Cards**: Stack vertically instead of horizontal grid. Remove horizontal scroll in challenges section.
- **Typography**: All `clamp()` values have mobile-safe minimums. Body text minimum 15px.
- **Spacing**: Section padding reduced from 200px to 80px vertical.
- **Images**: Use Next.js `Image` component with responsive `srcSet`. Serve WebP/AVIF with fallback.
- **Sticky download bar**: Visible on mobile only. 60px height, fixed bottom, z-index: 50.
- **Touch interactions**: Replace hover effects with active/focus states. Add `touch-action: manipulation` for buttons.

## Performance by Device

| Metric | Mobile Target | Desktop Target |
|--------|-------------|---------------|
| First Contentful Paint | < 1.5s | < 1.0s |
| Largest Contentful Paint | < 2.5s | < 2.0s |
| Total Bundle Size (JS) | < 300KB gzipped | < 500KB gzipped |
| 3D Scene Init Time | < 1s (deferred) | < 500ms |
| Cumulative Layout Shift | < 0.05 | < 0.05 |
| Lighthouse Score | 90+ | 95+ |
