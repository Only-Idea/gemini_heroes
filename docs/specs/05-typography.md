# 05 — Typography (Apple Japan Style)

The typography system follows Apple Japan's web design approach: a system-native sans-serif stack that renders SF Pro on Apple devices and Hiragino Sans / Noto Sans JP on other platforms.

## Design Philosophy

- Apple's Japanese website uses SF Pro JP as a web font loaded from their proprietary CDN, falling back to Hiragino Kaku Gothic Pro, Meiryo, and system sans-serif.
- Since SF Pro JP is proprietary, we replicate the same visual result using `-apple-system` (triggers SF Pro on macOS/iOS), `Hiragino Sans` (native Japanese on macOS), and `Noto Sans JP` (Google Fonts fallback for Windows/Android/Linux).
- All typography is **sans-serif**. No Mincho (serif) fonts anywhere.
- Headlines use extra-bold weights (700–900) for impact. Body text uses thin weight (300) for elegance.

## Font Stack

| Role | CSS Font Stack | Weight Range |
|------|---------------|-------------|
| Display / Headlines | `-apple-system, BlinkMacSystemFont, Hiragino Sans, Hiragino Kaku Gothic ProN, Noto Sans JP, Yu Gothic, Segoe UI, sans-serif` | 700–900 |
| Body / UI | (same stack as display) | 300–500 |
| Monospace / Labels | `ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Noto Sans JP, monospace` | 300–500 |

## Platform Resolution

| Platform | Resolved Font (Display) | Resolved Font (Body) |
|----------|------------------------|---------------------|
| macOS / iOS Safari | SF Pro (via -apple-system) | SF Pro (via -apple-system) |
| macOS / iOS Chrome | SF Pro (via BlinkMacSystemFont) | SF Pro (via BlinkMacSystemFont) |
| Windows 10/11 | Noto Sans JP (Google Fonts) | Noto Sans JP (Google Fonts) |
| Android | Noto Sans JP (Google Fonts) | Noto Sans JP (Google Fonts) |
| Linux | Noto Sans JP (Google Fonts) | Noto Sans JP (Google Fonts) |

## Type Scale

| Element | Desktop Size | Mobile Size | Weight | Line Height | Letter Spacing |
|---------|-------------|-------------|--------|-------------|---------------|
| Hero title | `clamp(45px, 8vw, 96px)` | 34px | 900 | 1.15 | 0.02em |
| Section title | `clamp(32px, 4.5vw, 60px)` | 26px | 700 | 1.2 | 0.01em |
| Challenge name | 28px | 22px | 700 | 1.2 | 0.08em |
| Section label | 11px | 10px | 500 (mono) | 1.0 | 0.25em |
| Body large | 17px | 16px | 300 | 1.59 | normal |
| Body | 17px | 15px | 300 | 1.59 | normal |
| Button text | 12px | 11px | 500 (mono) | 1.0 | 0.1em |
| Nav link | 13px | 14px | 400 | 1.0 | 0.06em |
| Footer | 11px | 10px | 400 (mono) | 1.4 | 0.08em |
| Stat number | `clamp(45px, 5vw, 72px)` | 34px | 700 | 1.0 | 0em |

## Font Loading Strategy

1. **Primary**: System fonts (`-apple-system`, `BlinkMacSystemFont`, `Hiragino Sans`) load instantly with zero network cost on Apple devices (majority of Japanese mobile market).
2. **Fallback**: Load Noto Sans JP from Google Fonts CDN with `font-display: swap` for Windows/Android/Linux. Use weights 100, 300, 400, 500, 700, 900.
3. **Preconnect** to `fonts.googleapis.com` and `fonts.gstatic.com` in the `<head>`.
4. **Monospace**: `ui-monospace` and `SFMono-Regular` are system-native on Apple devices. No external mono font needed.
5. **Performance advantage**: On Apple devices, the page loads with zero external font requests.

## CSS Custom Properties

```css
:root {
  --display: -apple-system, BlinkMacSystemFont,
    "Hiragino Sans", "Hiragino Kaku Gothic ProN",
    "Noto Sans JP", "Yu Gothic", "Segoe UI", sans-serif;
  --body: var(--display);
  --mono: ui-monospace, SFMono-Regular, "SF Mono",
    Menlo, Consolas, "Noto Sans JP", monospace;
}
```

Note: `--display` and `--body` use the same stack. The visual distinction comes entirely from `font-weight` (900 for display, 300 for body), not from different font families.
