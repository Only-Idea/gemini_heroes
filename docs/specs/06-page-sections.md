# 06 — Page Sections & Content Mapping

The website is a single continuous scroll experience divided into 10 distinct sections. Each section occupies at least 100vh and has its own scroll-triggered entrance animation and optional 3D scene.

## Section 1: Navigation Bar (Fixed)

Fixed top navigation with backdrop blur. Left: "Heroes" logo text (system sans-serif, bold 700). Center: anchor links (チャレンジ / 機能 / インパクト / お問い合わせ). Right: "ダウンロード" pill button with gradient border. On scroll past hero: background becomes solid `#1E2128` with 80% opacity.

## Section 2: Hero (100vh+)

Full-viewport hero with a breathing 3D orb/sphere at center. The orb uses the Heroes gradient as its light source and environment map, creating warm coral/gold/teal reflections.

Overlaid content (centered, pointer-events through to 3D):
- **Top label**: 「バーチャルチャレンジ · 2026」 in monospace (`ui-monospace`), uppercase, 11px
- **Main headline**: 「すべての一歩が、冒険になる。」 (system sans-serif, weight 900, clamp 45–96px, gradient text fill)
- **Subtitle**: 「富士山、四十七士、日本の鉄道。歩くほど、世界が変わる。」 (Noto Sans JP, 18px, dimmed ivory)
- **CTA buttons**: 「App Storeでダウンロード」 (gradient primary) + 「もっと知る」 (ghost)
- **Scroll hint**: 「Scroll」 with animated line, monospace

3D interaction: The orb parallax-tilts toward the cursor position. On mobile, it gently auto-rotates. Breathing cycle: 4 seconds.

## Section 3: Stats Bar

Horizontal strip with 1px gradient border top and bottom. Three animated counters that count up when scrolled into view:
- 「3」+ チャレンジルート (Challenge routes)
- 「12」 アクティビティタイプ (Activity types, including 車いす)
- 「32」+ 対応国 (Countries supported)

## Section 4: Challenge Showcase

Three horizontal cards, each representing a challenge route:
- A placeholder 3D scene or parallax image (Fuji mountain, samurai path, railway track)
- Challenge name in bold sans-serif weight 700 (富士山 / 浪人 / 鉄道)
- Brief description from brand knowledge
- A CTA to explore the challenge

Scroll behavior: Cards slide in from the right. Desktop: horizontally scrollable within the section. Mobile: stack vertically with staggered entrance.

## Section 5: Medal Showcase

The conversion section. A 3D model of the premium physical medal rotates in the center of the viewport. The model uses the Heroes gradient as its environment reflection.

- **Label**: 「本物を手に入れる」 (monospace, uppercase)
- **Headline**: 「デジタルバッジではない。本物のメダルを。」
- **Copy**: Each challenge unlocks a unique, premium medal shipped worldwide in original packaging
- **3D placeholder**: A gold/bronze disc with embossed design, ~400×400px viewport space

As the user scrolls, the medal rotates from profile view to front-facing.

## Section 6: App Feature Showcase

A floating phone mockup (3D or CSS-perspective) displaying app screenshots. The phone tilts toward the cursor. Feature cards fade in with scroll:

1. インタラクティブマップ (Interactive Map — Mapbox, 3 styles)
2. リアルタイム参加者トラッキング (Real-time participant tracking)
3. チーム機能 (Team features with live chat)
4. アチーブメント (10 categories, 5 rarities)
5. ストリーク (Streak tracking)
6. コミュニティフィード (Social feed)

Each feature has a small phone-icon badge and a dotted line connecting to the phone mockup, emphasizing this is a mobile app experience.

## Section 7: Environmental Impact

Split layout. Left: animated tree/ocean illustration (or 3D scene of trees growing). Right: text about Tree Care and Clean Ocean initiatives. Animated counter: number of trees planted (placeholder value).

## Section 8: Activity Types

A scrolling horizontal ribbon of 12 activity type icons with labels: ステップ / ランニング / ウォーキング / サイクリング / 水泳 / ローイング / エリプティカル / スキー / 車いす. Infinite horizontal scroll animation. Below: 「自分のペースで動く」 message.

## Section 9: Final CTA

Large, centered call-to-action. Headline: 「あなたの冒険を始めよう。」 App Store and Google Play buttons with gradient backgrounds. Below: mockup of both iOS and Android devices side by side.

## Section 10: Contact & Footer

Contact form (お名前 / メール / メッセージ) with minimal styling against dark background. Footer with links: プライバシー / 利用規約 / お問い合わせ. Social links: Twitter, Instagram. Copyright: © 2026 Heroes Inc.
