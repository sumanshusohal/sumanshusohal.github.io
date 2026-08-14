# Sumanshu Sohal portfolio overview

Status: deployed to GitHub Pages.

Live site: [sumanshusohal.github.io](https://sumanshusohal.github.io/)

## Creative direction

The portfolio uses an isolated cryogenic vault rather than the earlier quantum-field concept. Its visual language combines almost-black industrial architecture, restrained ice-blue illumination, frosted glass, drifting vapor, suspended particles, and one muted red containment state.

The cinematic setting frames the cybersecurity content and does not represent a claim about the underlying work.

## Layered animation system

The hero combines a cinematic chamber plate, independently animated depth layers, and a WebGL scene built with Three.js and React Three Fiber:

1. A full-screen photoreal chamber plate establishes scale and industrial detail.
2. Volumetric beams, near and far fog, ice particles, scan light, and warning glow move independently.
3. Eleven modeled metal vault ribs create corridor perspective in the WebGL layer.
4. A scroll-controlled camera moves through the opening sequence.
5. The cryo pod uses physical transmission, thickness, refraction, and roughness.
6. Coolant, frost, and ice use independent particle systems.
7. Two shader-driven fog planes create atmosphere at separate depths.
8. Bloom, film noise, ACES tone mapping, and vignette shape the final image.
9. Foreground rails react independently to pointer movement.
10. Interface labels remain crisp HTML above the animated scene.

An HTML and CSS chamber sits beneath the WebGL layer as a progressive fallback. It appears while the 3D bundle loads and remains available on devices without WebGL. Reduced-motion users receive a stable camera and particle state.

The containment control briefly changes the chamber from nominal ice-blue to a contained red fault state.

## Reference boundaries

The supplied dark ambient video informed pacing, industrial scale, negative space, haze, and warning-light restraint. GetLayers informed the general method of separating foreground, subject, atmosphere, and background into independent planes.

No paid template, source code, artwork, character, branding, or layout was copied. The chamber design and interaction are original to this portfolio.

## Resume verification

The downloadable resume is a public-safe portfolio copy of the AWS CIRT Security Engineer resume dated August 14, 2026. It uses `sumanshu.95s@outlook.com` and omits the private phone number. The site reflects the following details:

- Trellix Cybersecurity Engineer: September 2023 through March 2026
- Executive PhD in Information Technology with an AI emphasis: March 2026 to present
- Six-plus years of cybersecurity experience
- Security operations support across 12 business units
- More than 15 production detections mapped to MITRE ATT&CK
- More than 15 onboarded sources
- HCL Tier 3 SOC Specialist and WithSecure Pentesting Intern experience
- The 2026 AI-powered mobile telemetry publication and DOI
- The 2025 SOC maturity publication and DOI

Trellix is presented as completed experience. AI-driven false-positive reduction is presented as a research direction. ORCID remains omitted until a verified profile URL is available.

## Higgsfield handoff

The optional video path is:

`public/media/higgsfield-cryo-chamber.mp4`

The portfolio does not depend on this video. The primary chamber renders live in Three.js, with an HTML and CSS fallback. Generation and export guidance are in `public/media/README.md`.

## Deployment

The production Vinext application is exported into `docs/` by `npm run export:pages`. GitHub Pages publishes that directory from the `main` branch.

The previous website is preserved on the remote branch `backup-before-cryo-20260814-133848`.
