# 07 — 3D / WebGL Specifications

## 3D Scenes Overview

| Scene | Location | Type | Model Source | Interaction |
|-------|----------|------|-------------|-------------|
| Hero Orb | Hero section | Procedural (Three.js) | Code-generated geometry | Mouse parallax + auto-breathe |
| Medal | Medal section | glTF model | Custom 3D model or placeholder | Scroll-driven rotation |
| Fuji Landscape | Challenge card | glTF or heightmap | Placeholder terrain mesh | Gentle auto-rotate |
| Phone Float | Features section | CSS 3D + images | Screenshot images in CSS frame | Cursor tilt (gyroscope on mobile) |
| Globe | Optional hero alt | Procedural sphere | Mapbox-style texture | Drag to rotate |

## Hero Orb — Detailed Spec

The hero 3D scene is the centerpiece. It consists of four layers:

1. **Inner core**: `IcosahedronGeometry` (detail: 2, radius: 0.45). `MeshBasicMaterial` with color from gradient center (`#F2BE5E`). Opacity pulses between 0.7–1.0 on a 4s breathing cycle.

2. **Core glow**: `SphereGeometry` (radius: 0.7). Custom `ShaderMaterial` with Fresnel-based glow using gradient colors. `AdditiveBlending`, transparent, `BackSide` rendering.

3. **Wireframe shell**: `IcosahedronGeometry` (detail: 1, radius: 1.4). Wireframe `MeshBasicMaterial` in warm ivory (`#E8E2D6`) at 25% opacity. Rotates on X and Z axes independently.

4. **Outer shell**: `IcosahedronGeometry` (detail: 0, radius: 1.9). Wireframe at 8% opacity. Counter-rotates for depth parallax.

**Ambient particles**: 400 points distributed in a spherical shell (radius 3–8). `PointsMaterial` at 2% size, 50% opacity. Drift with sine/cosine oscillation.

**Lighting**:
- `AmbientLight` (`#E8E2D6`, 0.3 intensity)
- `PointLight` at (3, 2, 4) in coral (`#F0A07C`, 1.5 intensity)
- `PointLight` at (-4, -2, 2) in cool blue (`#8AB4D4`, 0.8 intensity)

## Medal Scene — Detailed Spec

A 3D medal model floats at the center. Procedural placeholder:

- `CylinderGeometry` (radius: 1.2, height: 0.15, segments: 64) for the disc
- `TorusGeometry` (radius: 1.2, tube: 0.04) for the rim edge
- `MeshStandardMaterial` with metalness: 0.85, roughness: 0.15, color: `#D4A84B` (warm gold)
- Environment map: Heroes gradient rendered as an equirectangular HDR for reflections
- **Scroll-driven**: At scroll entry, medal faces 80° profile. At scroll midpoint, faces 0° (front). Uses GSAP ScrollTrigger to interpolate `rotation.y`
- **Gentle float**: Y-axis oscillation (amplitude: 0.1, period: 3s) for hovering feel

## Performance Budgets

| Metric | Target | Fallback Strategy |
|--------|--------|-------------------|
| Total 3D model weight | < 1.5 MB (all scenes combined) | Use Draco compression; LOD for mobile |
| Texture resolution | Max 1024×1024 per texture | 512×512 on mobile |
| Draw calls per scene | < 50 | Merge geometries where possible |
| Target FPS | 60fps desktop, 30fps mobile | Reduce particle count on mobile (400 → 100) |
| WebGL context | 1 shared renderer for all scenes | Use portals (R3F) to share GL context |
| Fallback (no WebGL) | Static gradient background + CSS animations | Detect with Modernizr or manual check |
