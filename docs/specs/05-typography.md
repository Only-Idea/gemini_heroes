# 05 — Typography (Light Aesthetic)

## Font Stack

The project uses the "Hiragino Sans" system stack as the primary typeface for its clean, modern, and high-readability characteristics in Japanese.

- **Display & Body**: `-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif;`
- **Mono**: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Noto Sans JP", monospace;`

## Type Scale (Light Mode)

In light mode, we prioritize clear hierarchy and generous white space. Tracking is slightly tighter for large headlines to maintain "elegance."

| Level | Size | Weight | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `clamp(48px, 9vw, 112px)` | 700 | `-0.04em` | Main hero headline |
| **Section Title**| `clamp(36px, 5vw, 64px)` | 600 | `-0.02em` | Section headers |
| **Subhead** | `24px` | 500 | `0` | Card titles, labels |
| **Body (L)** | `20px` | 300 | `0` | Intro text, highlights |
| **Body** | `17px` | 300 | `0` | Primary reading text |
| **Small/Nav** | `13px` | 400 | `0.02em` | Navigation, footer links |
| **Label** | `11px` | 600 | `0.05em` | Caps labels, categories |

## Contrast & Legibility

- **Primary Text**: `oklch(0.25 0.02 260)` on Ivory. (Exceeds WCAG AAA).
- **Secondary Text**: `oklch(0.60 0.02 260)`. (Exceeds WCAG AA).
- **Line Height**: `1.6` for body text to ensure airy, breathable blocks.

## Animation Strategy

- **Hero Reveal**: Character-by-character "fade and lift" animation (SplitText).
- **Section Headers**: Underline "wipe" effect using the brand gradient.
- **Scroll Linked**: Text opacity shifts from `0.4` to `1.0` as it enters the focal point of the viewport.
