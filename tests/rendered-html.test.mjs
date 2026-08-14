import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the completed cybersecurity portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sumanshu Sohal \| Cybersecurity Engineer &amp; AI Researcher<\/title>/i);
  assert.match(html, /When systems go dark/i);
  assert.match(html, /Operational depth/i);
  assert.match(html, /Correlating SOC Maturity Levels/i);
  assert.match(html, /<strong>12<\/strong><p>business units supported<\/p>/i);
  assert.match(html, /<strong>15\+<\/strong><p>production detections<\/p>/i);
  assert.doesNotMatch(html, /50\+ ATT&amp;CK-mapped detections|30% reduction in detection time/i);
  assert.match(html, /Skip to content/i);
  assert.doesNotMatch(html, /\u2014/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the WebGL chamber, tunnel background, reduced-motion support, and key assets", async () => {
  const [page, cryoChamber, cryoChamber3D, styles, tunnel] = await Promise.all([
    readFile(new URL("../app/ThreatPortfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CryoChamber.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CryoChamber3D.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/tunnel-background.html", import.meta.url), "utf8"),
  ]);

  assert.match(page, /higgsfield-cryo-chamber\.mp4/);
  assert.match(page, /hero-cinematic-plate/);
  assert.match(page, /hero-atmosphere-near/);
  assert.match(page, /prefers-reduced-motion/);
  assert.match(page, /aria-expanded=\{intelOpen\}/);
  assert.match(page, /Initiate containment sequence/);
  assert.match(page, /tunnel-background\.html/);
  assert.match(page, /tunnel-scroll/);
  assert.match(page, /tunnel-pointer/);
  assert.match(cryoChamber, /cryo-rib-plane/);
  assert.match(cryoChamber, /ice-particle-field/);
  assert.match(cryoChamber, /chamber-scan/);
  assert.match(cryoChamber, /coolant-bubbles/);
  assert.match(cryoChamber3D, /<Canvas/);
  assert.match(cryoChamber3D, /meshPhysicalMaterial/);
  assert.match(cryoChamber3D, /@react-three\/postprocessing/);
  assert.match(cryoChamber3D, /fragmentShader/);
  assert.match(cryoChamber3D, /CameraRig/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /--hero-progress/);
  assert.match(styles, /@keyframes chamber-scan/);
  assert.match(styles, /@keyframes bubble-rise/);
  assert.match(styles, /\.motion-ready\.in-view/);
  assert.match(styles, /--tunnel-opacity/);
  assert.match(styles, /\.tunnel-background/);
  assert.match(tunnel, /three@0\.143\.0\/build\/three\.module\.js/);
  assert.match(tunnel, /new THREE\.SphereGeometry\(4\.2, 200, 600\)/);
  assert.match(tunnel, /float snoise\(vec3 v\)/);
  assert.match(tunnel, /new UnrealBloomPass\(new THREE\.Vector2\(innerWidth, innerHeight\), 0\.7, 0\.6, 0\)/);
  assert.match(tunnel, /id="scroll-host"/);
  assert.doesNotMatch(`${page}\n${styles}\n${tunnel}`, /\u2014/);
  await access(new URL("../public/og-cryo.png", import.meta.url));
  await access(new URL("../public/hero-cryo-chamber.png", import.meta.url));
  await access(new URL("../public/tunnel-background.html", import.meta.url));
  await access(new URL("../public/resume/Sumanshu_Sohal_Resume.pdf", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(projectRoot);
});
