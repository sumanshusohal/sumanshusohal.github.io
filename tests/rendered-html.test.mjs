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

test("keeps the WebGL chamber, layered fallback, reduced-motion support, and key assets", async () => {
  const [page, cryoChamber, cryoChamber3D, styles] = await Promise.all([
    readFile(new URL("../app/ThreatPortfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CryoChamber.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CryoChamber3D.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /higgsfield-cryo-chamber\.mp4/);
  assert.match(page, /prefers-reduced-motion/);
  assert.match(page, /aria-expanded=\{intelOpen\}/);
  assert.match(page, /Initiate containment sequence/);
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
  await access(new URL("../public/og-cryo.png", import.meta.url));
  await access(new URL("../public/resume/Sumanshu_Sohal_Resume.pdf", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(projectRoot);
});
