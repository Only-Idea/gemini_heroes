# 10 — Mobile App Service Annotations

Since Heroes is a mobile app, the website must constantly reinforce that this is an app experience.

## Floating Download Bar

A sticky bottom bar (only on mobile viewport) shows 「無料でダウンロード」 with Apple/Google icons. Appears after scrolling past the hero. Uses `backdrop-filter: blur`. Slides up on entry, can be dismissed with an X button.

## Phone Frame Motif

Throughout the site, UI elements are framed within phone-shaped containers (`border-radius: 44px`, `aspect-ratio: 9/19.5`). This subconsciously reinforces "this is a mobile app." Used for:
- App screenshots in the features section
- Map preview in the challenges section
- Achievement showcase cards

## QR Code (Desktop Only)

On desktop viewports, a small QR code appears in the final CTA section linking to the app store. Label: 「スマホでスキャン」. The QR code uses the Heroes gradient colors instead of standard black.

## App Store Badges

Official App Store and Google Play badges appear in three locations:
1. Hero CTA row
2. Medal section (below "earn your medal")
3. Final CTA section

Always show both platforms side by side.

## Haptic Hint Text

In the breathwork/features section, include a callout: 「手首で感じるリズム」 (Feel the rhythm on your wrist) with a smartwatch icon, emphasizing the physical connection between app and body.

## "Try in Your Browser" Mini-Experience

One interactive section lets the user simulate the app experience directly on the website. A phone-framed container shows a mini interactive map (Mapbox embed) with a simulated challenge route. The user can tap/click landmarks to see info popups. This bridges the gap between "browsing" and "downloading."
