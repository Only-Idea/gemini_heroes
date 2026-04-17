# 04 — Design System

## Color Palette

The Heroes gradient (top-right EC7A5C → center F2BE5E → bottom-left 375E65) is the brand's signature. It should appear as a diagonal gradient on key accent elements, CTAs, and as the glow source for the hero 3D scene. The background is deep charcoal, not pure black, to create warmth.

### Primary Gradient

| Color | Hex | Role |
|-------|-----|------|
| Coral Sunset | `#EC7A5C` | Top-right gradient anchor, CTA hover, accent highlights |
| Golden Amber | `#F2BE5E` | Center gradient anchor, achievement badges, warm accents |
| Deep Teal | `#375E65` | Bottom-left gradient anchor, section labels, subheadings |

**CSS**: `background: linear-gradient(135deg, #375E65 0%, #F2BE5E 50%, #EC7A5C 100%);`

### Backgrounds

| Color | Hex | Role |
|-------|-----|------|
| Void | `#0F1114` | Page background (primary) |
| Carbon | `#181B21` | Card backgrounds, elevated surfaces |
| Slate | `#1E2128` | Navbar background (with backdrop blur) |

### Text & UI

| Color | Hex | Role |
|-------|-----|------|
| Warm Ivory | `#E8E2D6` | Primary text on dark backgrounds |
| Stone | `#A0998A` | Secondary/dimmed text |
| Ash | `#5A5550` | Disabled text, faint labels |
| Border | `#2A2E35` | Card borders, divider lines |

## Gradient Usage Rules

- **Hero section**: Gradient used as the light source for the 3D orb/scene, creating a warm atmospheric glow across the dark background.
- **CTAs**: Primary buttons use the full gradient as background. On hover, shift gradient 20% brighter.
- **Section dividers**: Use a 1px gradient line (horizontal) between major sections.
- **Medal glow**: The 3D medal model uses the gradient as its environment reflection map.
- **Typography accent**: Use gradient as text fill only for the hero headline and section numbers (using `background-clip: text`).
- **Never**: Do not use the gradient as a full-page background. It is an accent, not a surface.

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Icon padding, tight gaps |
| `--space-sm` | 8px | Inline element spacing |
| `--space-md` | 16px | Component internal padding |
| `--space-lg` | 32px | Card padding, grid gaps |
| `--space-xl` | 64px | Section internal spacing |
| `--space-2xl` | 128px | Section vertical padding (desktop) |
| `--space-3xl` | 200px | Hero section vertical space |

## Border & Radius

- **Cards**: `border-radius: 20px` with 1px border in `#2A2E35`. On hover: border transitions to gradient (use `border-image`).
- **Buttons**: `border-radius: 999px` (pill shape). Primary: gradient background. Ghost: 1px border.
- **Phone frames**: `border-radius: 44px` (outer), `34px` (inner screen). Subtle inset shadow for realism.
- No sharp corners anywhere. Minimum radius: 8px for any UI element.

## Grain & Texture

A full-viewport SVG noise grain overlay at 4–6% opacity with `mix-blend-mode: overlay` sits on top of all content (`pointer-events: none`). This adds analog warmth to the digital interface and prevents the "flat digital" feel.
