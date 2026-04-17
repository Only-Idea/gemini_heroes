# 12 — Asset Guidelines & Placeholders

## 3D Model Placeholders

| Model | Placeholder | Production Source | Format | Max Size |
|-------|-----------|------------------|--------|----------|
| Hero Orb | Procedural Three.js geometry (code-generated) | Keep procedural | N/A | 0 KB |
| Medal | CylinderGeometry + TorusGeometry (gold material) | Custom 3D scan or Blender model of real medal | glTF/GLB + Draco | 500 KB |
| Fuji Landscape | Simple heightmap plane with vertex displacement | Detailed Fuji terrain model from Sketchfab or custom | glTF/GLB | 400 KB |
| Phone Mockup | CSS border-radius + box-shadow (no 3D model needed) | Keep CSS-based for performance | N/A | 0 KB |

## Image Placeholders

| Image | Placeholder | Production Asset | Dimensions | Format |
|-------|-----------|-----------------|-----------|--------|
| App screenshots (x4) | Solid gradient rectangles in phone frames | Real app screenshots from Flutter builds | 1284×2778px (iPhone 14 Pro) | WebP |
| Challenge route photos | Gradient overlays with Japanese text labels | Licensed photos or original photography | 1920×1080px | WebP/AVIF |
| Medal photos | 3D render serves as placeholder AND production | 3D model render or product photography | 800×800px | WebP |
| Environmental impact | SVG illustrations (tree, ocean wave) | Custom illustrations matching brand style | SVG (scalable) | SVG |
| Activity type icons (x12) | Lucide React icons as placeholders | Custom icon set in brand style | 48×48px | SVG |
| App Store badges | Standard Apple/Google badge downloads | Official badge assets | Per guidelines | SVG/PNG |
| QR Code | Generated placeholder | Dynamic QR linking to app store | 200×200px | SVG |

## Video / Animation Placeholders

No video files are required. All animations are code-driven (Three.js, GSAP, CSS). However, a 10–15 second looping background video could enhance the challenges section if desired:
- Keep to 720p, H.264, < 3MB
- `autoplay muted loop playsinline` attributes required
