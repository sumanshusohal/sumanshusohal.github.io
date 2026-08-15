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
  assert.match(html, /I turn security noise/i);
  assert.match(html, /into defensible signal/i);
  assert.match(html, /Sumanshu Sohal.*Cybersecurity Engineer.*AI Researcher/is);
  assert.match(html, /Career evidence console/i);
  assert.match(html, /hero-signal-art/i);
  assert.match(html, /signal-sieve-loop\.mp4/i);
  assert.match(html, /The artwork becomes.*inspectable evidence/is);
  assert.match(html, /2023 to 2026.*Trellix/is);
  assert.match(html, /2026 to Present.*University of the Cumberlands/is);
  assert.match(html, /Selected systems.*defensible evidence/is);
  assert.match(html, /Autonomous SOC Triage Agent/i);
  assert.match(html, /FEATURED ON KANZ AI/i);
  assert.match(html, /https:\/\/try\.ka\.nz\/ai\/sumanshusohal/i);
  assert.match(html, /Automated repetitive endpoint validation/i);
  assert.match(html, /RESEARCH PROTOTYPE/i);
  assert.match(html, /CONTROLLED LAB/i);
  assert.match(html, /ARCHITECTURE CASE STUDY/i);
  assert.match(html, /<dt>Result<\/dt>/i);
  assert.match(html, /mailto:sumanshu\.95s@outlook\.com/i);
  assert.match(html, /https:\/\/github\.com\/sumanshusohal/i);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/sumanshu-sohal-256981130\//i);
  assert.match(html, /og-signal-console\.png/i);
  assert.match(html, /\/resume\/Sumanshu_Sohal_Resume\.pdf/i);
  assert.doesNotMatch(html, /href=["']tel:/i);
  assert.match(html, /Operational depth/i);
  assert.match(html, /WORLDLINE 01 \/ PROVENANCE/i);
  assert.match(html, /alien interface cartographer/i);
  assert.match(html, /INTERWORLD TRANSIT/i);
  assert.match(html, /Correlating SOC Maturity Levels/i);
  assert.match(html, /<strong>12<\/strong><p>business units supported<\/p>/i);
  assert.match(html, /<strong>15\+<\/strong><p>production detections<\/p>/i);
  assert.doesNotMatch(html, /50\+ ATT&amp;CK-mapped detections|30% reduction in detection time/i);
  assert.match(html, /Skip to content/i);
  assert.doesNotMatch(html, /\u2014/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the evidence console, layered motion, tunnel background, reduced-motion support, and key assets", async () => {
  const [page, styles, tunnel, remotion] = await Promise.all([
    readFile(new URL("../app/ThreatPortfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/tunnel-background.html", import.meta.url), "utf8"),
    readFile(new URL("../remotion/index.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /prefers-reduced-motion/);
  assert.match(page, /aria-expanded=\{intelOpen\}/);
  assert.match(page, /careerRecords/);
  assert.match(page, /Career evidence console/);
  assert.match(page, /role="tablist"/);
  assert.match(page, /role="tabpanel"/);
  assert.match(page, /evidence-lattice/);
  assert.doesNotMatch(page, /CryoChamber|higgsfield-cryo-chamber|cryo-visual/);
  assert.match(page, /tunnel-background\.html/);
  assert.match(page, /tunnel-scroll/);
  assert.match(page, /tunnel-pointer/);
  assert.match(page, /signal-\$\{system\.visual\}/);
  assert.match(page, /system-card-proof/);
  assert.match(page, /hero-motion-film/);
  assert.match(page, /soc-triage-agent-demo\.vtt/);
  assert.match(page, /RESEARCH PROTOTYPE/);
  assert.match(page, /SystemInstrument/);
  assert.match(page, /motion-control/);
  assert.match(page, /Inspect system/);
  assert.match(page, /function WorldTransition/);
  assert.match(page, /beginWorldTransit/);
  assert.match(page, /data-world=\{activeSection\}/);
  assert.match(page, /world-transit-overlay/);
  assert.match(page, /inert=\{compactNavigation && !menuOpen\}/);
  assert.match(page, /const motionSuppressed = motionPaused \|\| systemReducedMotion/);
  assert.match(page, /active: !motionSuppressed && heroProgress > 0\.62/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /--hero-progress/);
  assert.match(styles, /\.hero-signal-scene/);
  assert.match(styles, /\.hero-signal-art/);
  assert.match(styles, /\.hero-motion-film/);
  assert.match(styles, /\.hero-analysis-aperture/);
  assert.match(styles, /\.hero-signal-rails/);
  assert.match(styles, /url\("\/og-signal-console\.png"\)/);
  assert.match(styles, /\.career-console-section/);
  assert.match(styles, /\.evidence-console/);
  assert.match(styles, /\.career-records/);
  assert.match(styles, /@keyframes evidence-pulse/);
  assert.match(styles, /\.motion-ready\.in-view/);
  assert.match(styles, /--tunnel-opacity/);
  assert.match(styles, /\.tunnel-background/);
  assert.match(styles, /\.signal-mapping/);
  assert.match(styles, /\.signal-trace/);
  assert.match(styles, /\.signal-cloud/);
  assert.match(styles, /\.signal-triage/);
  assert.match(styles, /\.system-card-featured/);
  assert.match(styles, /\.system-card-proof/);
  assert.match(styles, /\.system-instrument/);
  assert.match(styles, /\.motion-paused/);
  assert.match(styles, /\.world-atmosphere/);
  assert.match(styles, /\.world-transition/);
  assert.match(styles, /\.transit-iris/);
  assert.match(styles, /@keyframes world-gate-orbit/);
  assert.match(tunnel, /three@0\.143\.0\/build\/three\.module\.js/);
  assert.match(tunnel, /new THREE\.SphereGeometry\(4\.2, 200, 600\)/);
  assert.match(tunnel, /float snoise\(vec3 v\)/);
  assert.match(tunnel, /new UnrealBloomPass\(new THREE\.Vector2\(innerWidth, innerHeight\), 0\.7, 0\.6, 0\)/);
  assert.match(tunnel, /id="scroll-host"/);
  assert.match(tunnel, /tunnel-active/);
  assert.match(tunnel, /visibilitychange/);
  assert.match(remotion, /id="SignalSieve"/);
  assert.match(remotion, /useCurrentFrame/);
  assert.doesNotMatch(`${page}\n${styles}\n${tunnel}\n${remotion}`, /\u2014/);
  await access(new URL("../public/og-signal-console.png", import.meta.url));
  await access(new URL("../public/media/signal-sieve-loop.mp4", import.meta.url));
  await access(new URL("../public/media/signal-sieve-poster.png", import.meta.url));
  await access(new URL("../public/media/soc-triage-agent-demo.mp4", import.meta.url));
  await access(new URL("../public/media/soc-triage-agent-demo.vtt", import.meta.url));
  await access(new URL("../public/tunnel-background.html", import.meta.url));
  await access(new URL("../public/resume/Sumanshu_Sohal_Resume.pdf", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(projectRoot);
});
