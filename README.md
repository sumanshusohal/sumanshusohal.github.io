# Sumanshu Sohal | Cybersecurity Portfolio

A cinematic cybersecurity portfolio for Sumanshu Sohal, a cybersecurity engineer and AI researcher focused on security operations, detection engineering, endpoint defense, and applied AI security research.

Live site: [sumanshusohal.github.io](https://sumanshusohal.github.io/)

## Experience

The content and downloadable PDF are based on the AWS CIRT Security Engineer resume dated August 14, 2026. Featured experience includes:

- Cybersecurity Engineer at Trellix
- Tier 3 SOC Specialist at HCL Technologies
- Pentesting Intern at WithSecure
- Executive PhD research in Information Technology with an AI emphasis
- Six-plus years of cybersecurity experience
- Trellix security operations support across 12 business units
- More than 15 production detections and 15 onboarded log sources
- Detection engineering, EDR, SIEM, threat hunting, incident response, and MITRE ATT&CK mapping

## Visual Direction

The site opens inside a dark isolated cryogenic chamber. The animation is rendered as a layered scene with:

- A Three.js and React Three Fiber WebGL environment
- A full-screen cinematic chamber plate with independent depth layers
- Industrial vault ribs and near-camera foreground rails
- A physically shaded glass cryo pod
- Coolant, frost, suspended ice, fog, and scanner layers
- Slow camera breathing, volumetric beams, parallax fog, ice drift, and containment lighting
- Scroll and pointer-responsive camera movement
- Bloom, film noise, vignette, and cinematic tone mapping
- An interactive containment sequence
- An immediate HTML and CSS fallback for unsupported devices
- Reduced-motion behavior for accessibility

The chamber is an original visual system. External references informed atmosphere and layered composition, but no template code, artwork, branding, or layout was copied.

## Technology

- React 19
- TypeScript
- Vinext and Vite
- Three.js
- React Three Fiber
- React Three Drei
- React Three Postprocessing
- CSS animations and responsive layouts

## Local Development

Prerequisites:

- Node.js 22.13.0 or newer

Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000/`.

## Verification and Export

```bash
npm test
npm run build
npm run export:pages
```

- `npm test` builds the application and verifies the rendered portfolio and animation assets.
- `npm run build` creates the production Vinext output.
- `npm run export:pages` creates the static deployment in `docs/`.

GitHub Pages publishes from the `docs` directory on the `main` branch.

## Project Structure

```text
app/                      Portfolio interface and animation components
public/                   Images, resume, icons, and optional media
scripts/export-pages.mjs  GitHub Pages export script
tests/                    Render and asset verification
docs/                     Generated GitHub Pages deployment
```

## Optional Higgsfield Media

The live Three.js chamber does not require a generated video. An optional Higgsfield background clip can be placed at:

```text
public/media/higgsfield-cryo-chamber.mp4
```

Generation guidance is available in `public/media/README.md`.

## Contact

- [LinkedIn](https://www.linkedin.com/in/sumanshu-sohal-256981130/)
- [GitHub](https://github.com/sumanshusohal)
- [Email](mailto:sumanshu.95s@outlook.com)
