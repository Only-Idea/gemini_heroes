# 04 — Design System (Light Aesthetic)

## Color Palette (OKLCH Modern)

The Heroes aesthetic for 2025 is "Tactile Minimalism"—a warm, airy light mode that uses high-end glassmorphism and organic neutrals. The signature brand gradient remains as a refined accent.

### Base Palette

| Element | OKLCH Value | Hex Equiv | Role |
| :--- | :--- | :--- | :--- |
| **Background** | `oklch(0.96 0.01 60)` | `#F7F4F0` | Main page background (Warm Ivory) |
| **Foreground** | `oklch(0.25 0.02 260)`| `#1A1C1E` | Primary text and headlines |
| **Muted** | `oklch(0.60 0.02 260)` | `#707478` | Secondary/body text |
| **Surface** | `oklch(1 0 0 / 0.4)` | `rgba(255,255,255,0.4)` | Glass cards background |
| **Border** | `oklch(1 0 0 / 0.7)` | `rgba(255,255,255,0.7)` | Crystalline crystalline borders |

### Primary Gradient (Accents)

| Color | OKLCH | Role |
|-------|-------|------|
| Coral Sunset | `oklch(0.70 0.15 40)` | Active states, primary CTA |
| Golden Amber | `oklch(0.85 0.15 80)` | Achievement accents |
| Deep Teal | `oklch(0.45 0.10 200)`| Semantic labels |

**CSS Gradient**: `linear-gradient(135deg, oklch(0.45 0.10 200) 0%, oklch(0.85 0.15 80) 50%, oklch(0.70 0.15 40) 100%);`

## Glassmorphism & Depth

- **Crystalline Glass**: Use `backdrop-filter: blur(12px)` with a high-transparency white background. Borders should be slightly more opaque than the surface to create a "beveled" edge feel.
- **Soft Shadows**: Avoid dark shadows. Use `box-shadow: 0 10px 40px -10px oklch(0.25 0.02 260 / 0.05)`.
- **Bento Grid**: Organize information into modular "compartments" with rounded corners (`24px`).

## Spacing System (Modular)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight elements |
| `--space-md` | 16px | Internal padding |
| `--space-lg` | 40px | Bento card padding |
| `--space-xl` | 80px | Section gaps |
| `--space-2xl`| 160px | Vertical section spacing |

## Border & Radius

- **Radius (L)**: `24px` for Bento cards.
- **Radius (M)**: `12px` for buttons.
- **Radius (Pill)**: `999px` for chips and main CTAs.
- All cards use a `1px` crystalline border.

## Grain & Texture

A subtle grain overlay (`2%` opacity) is used to add "paper" texture to the Ivory background.
- **Blend Mode**: `multiply` or `overlay`.
- **Color**: `oklch(0.25 0.02 260 / 0.02)`.
