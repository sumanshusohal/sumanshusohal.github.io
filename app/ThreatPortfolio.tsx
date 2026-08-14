"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CryoChamber } from "./CryoChamber";

const CryoChamber3D = dynamic(
  () => import("./CryoChamber3D").then((module) => module.CryoChamber3D),
  { ssr: false },
);

const navigation = [
  { href: "#experience", label: "Experience" },
  { href: "#systems", label: "Systems" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Uplink" },
];

const metrics = [
  { value: "6+", label: "years in cyber defense" },
  { value: "50+", label: "ATT&CK-mapped detections" },
  { value: "15+", label: "log sources onboarded" },
  { value: "30%", label: "reduction in detection time" },
];

const experience = [
  {
    period: "2023 to 2026",
    organization: "Trellix · Washington, DC",
    role: "Cybersecurity Engineer",
    summary:
      "Detection engineering and high-severity incident response across endpoint, cloud, and network telemetry for a large enterprise environment.",
    outcomes: [
      "Built and tuned 50+ behavioral detections mapped to MITRE ATT&CK.",
      "Expanded SIEM coverage with 15+ cloud and third-party data sources.",
      "Improved detection speed by 30% through tuning and automation.",
    ],
    code: "NX · HX · HELIX",
  },
  {
    period: "2022",
    organization: "WithSecure · New York, NY",
    role: "Pentesting Intern",
    summary:
      "Web and network security testing, client scoping, and practical remediation guidance across more than eight assessments.",
    outcomes: [
      "Tested authentication, application, and network attack surfaces.",
      "Identified critical and high-severity weaknesses.",
      "Translated findings into prioritized remediation plans.",
    ],
    code: "OFFENSIVE SECURITY",
  },
  {
    period: "2017 to 2021",
    organization: "HCL Technologies · Noida, India",
    role: "Tier 3 SOC Specialist",
    summary:
      "Multi-client SOC leadership spanning enterprise incident response, SIEM engineering, detection strategy, and SOAR automation.",
    outcomes: [
      "Reduced mean time to resolution by 40% with automated workflows.",
      "Integrated more than 50 sources into SIEM and reporting pipelines.",
      "Validated response playbooks through threat-based tabletop exercises.",
    ],
    code: "SIEM · SOAR · IR",
  },
];

const systems = [
  {
    number: "01",
    eyebrow: "Applied automation",
    title: "Endpoint health intelligence",
    copy: "A Python health-check system that replaced repetitive endpoint review, reduced manual effort by 90%, and made protection coverage easier to verify.",
    tags: ["Python", "Endpoint", "Automation"],
    action: { label: "Discuss the system", href: "mailto:sumanshu.95s@outlook.com?subject=Endpoint%20health%20system" },
  },
  {
    number: "02",
    eyebrow: "AI + regulatory engineering",
    title: "Compliance mapping agent",
    copy: "An agentic retrieval project exploring traceability across major security and privacy frameworks, designed to connect evidence, obligations, and controls.",
    tags: ["AI agents", "NIST", "Traceability"],
    action: { label: "View repository", href: "https://github.com/sumanshusohal/RAA-Compliance-Mapping" },
  },
  {
    number: "03",
    eyebrow: "Detection research",
    title: "EDR gap analysis",
    copy: "Controlled adversary simulation using Nim proof-of-concepts to study behavioral blind spots, including direct syscalls and in-memory execution.",
    tags: ["EDR", "Nim", "Adversary simulation"],
    action: { label: "Request research notes", href: "mailto:sumanshu.95s@outlook.com?subject=EDR%20gap%20research" },
  },
  {
    number: "04",
    eyebrow: "Cloud architecture",
    title: "AWS security migration",
    copy: "A defense-in-depth cloud migration plan centered on hardened identity, segmented networks, defensible logging, and a measurable security baseline.",
    tags: ["AWS", "IAM", "Cloud security"],
    action: { label: "Discuss the architecture", href: "mailto:sumanshu.95s@outlook.com?subject=AWS%20security%20architecture" },
  },
];

const capabilities = [
  "Helix",
  "Splunk",
  "QRadar",
  "Siemplify",
  "Trellix HX / NX",
  "AWS",
  "Azure",
  "Python",
  "KQL",
  "SQL",
  "MITRE ATT&CK",
  "Tenable",
  "Volatility",
  "Wireshark",
];

export function ThreatPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [videoReady, setVideoReady] = useState(false);
  const [intelOpen, setIntelOpen] = useState(false);
  const [containmentSignal, setContainmentSignal] = useState(0);
  const [containmentActive, setContainmentActive] = useState(false);

  const initiateContainment = () => {
    setContainmentSignal((signal) => signal + 1);
    setContainmentActive(true);
    window.setTimeout(() => setContainmentActive(false), 5200);
  };

  useEffect(() => {
    let frame = 0;

    const updateMotion = () => {
      const y = window.scrollY;
      const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(y / pageHeight, 1);
      const hero = document.getElementById("top");
      const heroTravel = Math.max((hero?.offsetHeight ?? window.innerHeight) - window.innerHeight, 1);
      const heroProgress = Math.min(Math.max(y / heroTravel, 0), 1);
      const root = document.documentElement;
      root.style.setProperty("--shift-slow", `${y * -0.045}px`);
      root.style.setProperty("--shift-mid", `${y * -0.09}px`);
      root.style.setProperty("--shift-fast", `${y * -0.15}px`);
      root.style.setProperty("--page-progress", `${progress}`);
      root.style.setProperty("--hero-progress", `${heroProgress}`);
      frame = 0;
    };

    const updatePointer = (event: PointerEvent) => {
      const root = document.documentElement;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      root.style.setProperty("--pointer-x", `${x * 22}px`);
      root.style.setProperty("--pointer-y", `${y * 16}px`);
    };

    const resetPointer = () => {
      const root = document.documentElement;
      root.style.setProperty("--pointer-x", "0px");
      root.style.setProperty("--pointer-y", "0px");
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMotion);
    };

    updateMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", resetPointer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", resetPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-intro, .timeline-entry, .system-card, .research-copy, .publication-card, .capability-band > *, .contact-section > *:not(.contact-orbit)",
      ),
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    revealNodes.forEach((node, index) => {
      node.classList.add("motion-ready");
      node.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
      if (reduceMotion) node.classList.add("in-view");
    });

    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ["top", "experience", "systems", "research", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <div className="ambient-stage" aria-hidden="true">
        <video
          className={`higgsfield-layer ${videoReady ? "is-ready" : ""}`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        >
          <source src="/media/higgsfield-cryo-chamber.mp4" type="video/mp4" />
        </video>
        <div className="dust-layer dust-layer-far" />
        <div className="dust-layer dust-layer-near" />
        <div className="cryo-haze" />
        <div className="corridor-lines" />
        <div className="scan-sweep" />
        <div className="edge-vignette" />
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Sohal Cyber Defense, back to top">
          <span aria-hidden="true">SOHAL // CYBER_DEFENSE</span><i aria-hidden="true" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-status" href="mailto:sumanshu.95s@outlook.com">
          <span aria-hidden="true" /> Available for collaboration
        </a>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-sticky">
            <div className="hero-copy">
              <p className="system-kicker"><span aria-hidden="true">CRYO VAULT / </span> CHAMBER 07: ISOLATED</p>
              <h1 id="hero-title">When systems go dark,<br /><em>I find the signal.</em></h1>
              <p className="hero-summary">
                I’m Sumanshu Sohal, a cybersecurity engineer and PhD researcher building resilient detection, response, and AI systems under pressure.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#systems">Explore systems <span aria-hidden="true">↘</span></a>
                <a className="button button-secondary" href="/resume/Sumanshu_Sohal_Resume.pdf" target="_blank" rel="noreferrer">Open résumé <span aria-hidden="true">↗</span></a>
              </div>
              <button className={`containment-trigger ${containmentActive ? "is-active" : ""}`} type="button" onClick={initiateContainment} disabled={containmentActive}>
                <span aria-hidden="true" />
                {containmentActive ? "Containment sequence active" : "Initiate containment sequence"}
                <b aria-hidden="true">{containmentActive ? "PURGING" : "↗"}</b>
              </button>
              <div className="hero-credentials" aria-label="Primary areas of expertise">
                <span>Detection engineering</span><span>Incident response</span><span>AI research</span>
              </div>
            </div>

            <div className={`cryo-visual ${containmentActive ? "is-purging" : ""}`} aria-hidden="true">
              <CryoChamber containmentSignal={containmentSignal} />
              <CryoChamber3D purging={containmentActive} />
              <div className="cryo-caption cryo-caption-top"><span>CRYO UNIT / CHAMBER 07</span><b>{containmentActive ? "SEALED" : "ISOLATED"}</b></div>
              <div className="cryo-caption cryo-caption-bottom"><span>{containmentActive ? "PURGE IN PROGRESS" : "LIFE SUPPORT NOMINAL"}</span><b>{containmentActive ? "BREACH / 00" : "CORE / −143°C"}</b></div>
            </div>

            <a className="scroll-cue" href="#metrics"><span>Descend into the archive</span><i aria-hidden="true" /></a>
          </div>
        </section>

        <section className="metric-strip" id="metrics" aria-label="Career impact metrics">
          {metrics.map((metric, index) => (
            <article key={metric.label}>
              <span className="metric-index">0{index + 1}</span>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </article>
          ))}
        </section>

        <section className="content-section experience-section" id="experience" aria-labelledby="experience-title">
          <div className="section-intro">
            <p className="section-code">01 / LIVE INTEL</p>
            <h2 id="experience-title">Operational depth,<br />measurable outcomes.</h2>
            <p>From Tier 3 SOC operations to enterprise detection engineering, the through-line is practical: clearer telemetry, faster decisions, stronger response.</p>
          </div>

          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline-entry" key={item.role}>
                <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="timeline-meta">
                  <p>{item.period}</p>
                  <span>{item.organization}</span>
                </div>
                <div className="timeline-body">
                  <div className="timeline-heading"><h3>{item.role}</h3><code>{item.code}</code></div>
                  <p>{item.summary}</p>
                  <ul>{item.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section systems-section" id="systems" aria-labelledby="systems-title">
          <div className="section-intro section-intro-wide">
            <div>
              <p className="section-code">02 / CORE SYSTEMS</p>
              <h2 id="systems-title">Research & deployments.</h2>
            </div>
            <p>Selected work at the intersection of defensive engineering, automation, adversary behavior, and regulatory intelligence.</p>
          </div>

          <div className="system-grid">
            {systems.map((system) => (
              <article className="system-card" key={system.number}>
                <div className="system-card-top"><span>{system.number}</span><p>{system.eyebrow}</p></div>
                <div className="signal-graphic" aria-hidden="true"><i /><i /><i /><i /><i /></div>
                <h3>{system.title}</h3>
                <p>{system.copy}</p>
                <ul aria-label="Technologies">{system.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <a href={system.action.href} target={system.action.href.startsWith("http") ? "_blank" : undefined} rel={system.action.href.startsWith("http") ? "noreferrer" : undefined}>
                  {system.action.label} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section research-section" id="research" aria-labelledby="research-title">
          <div className="research-copy">
            <p className="section-code">03 / SIGNAL / NOISE</p>
            <h2 id="research-title">Security research should change the way a SOC operates.</h2>
            <p className="research-lead">My doctoral work examines applied AI in cybersecurity: how intelligent systems can improve alert quality, preserve traceability, and reduce analyst fatigue without hiding the reasoning behind a decision.</p>
            <div className="education-list">
              <article><span>2026 to Present</span><h3>Executive PhD, Information Technology</h3><p>Artificial Intelligence emphasis · University of the Cumberlands</p></article>
              <article><span>2023</span><h3>Master of Engineering, Cybersecurity</h3><p>GPA 3.94 · University of Maryland</p></article>
            </div>
          </div>

          <aside className="publication-card" aria-label="Selected publication">
            <div className="publication-status"><span>PEER-REVIEWED</span><b>2025</b></div>
            <p className="publication-journal">International Journal of Applied Mathematics</p>
            <h3>Correlating SOC Maturity Levels with Incident Response Outcomes</h3>
            <p>An empirical study connecting MITRE ATT&CK adoption maturity with measurable incident-response performance.</p>
            <button
              className="decrypt-toggle"
              type="button"
              aria-expanded={intelOpen}
              aria-controls="research-dossier"
              onClick={() => setIntelOpen((open) => !open)}
            >
              <span><i aria-hidden="true" /> {intelOpen ? "Lock research dossier" : "Decrypt research dossier"}</span>
              <b aria-hidden="true">{intelOpen ? "−" : "+"}</b>
            </button>
            {intelOpen && (
              <div className="encrypted-dossier" id="research-dossier">
                <span>ACTIVE RESEARCH VECTORS</span>
                <ul>
                  <li>AI-assisted signal quality and false-positive reduction</li>
                  <li>Explainable regulatory traceability</li>
                  <li>ATT&CK-aligned SOC maturity modeling</li>
                </ul>
              </div>
            )}
            <a href="https://doi.org/10.12732/ijam.v38i10s.1056" target="_blank" rel="noreferrer">Read the publication <span aria-hidden="true">↗</span></a>
            <div className="publication-grid" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </aside>
        </section>

        <section className="capability-band" aria-labelledby="capabilities-title">
          <div><p className="section-code">04 / SYSTEM INVENTORY</p><h2 id="capabilities-title">Capabilities</h2></div>
          <ul>{capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
          <p className="section-code">05 / SECURE UPLINK</p>
          <h2 id="contact-title">Let’s build a stronger<br /><em>defense signal.</em></h2>
          <p>Open to security engineering roles, research collaborations, and technical partnerships.</p>
          <a className="button button-primary button-large" href="mailto:sumanshu.95s@outlook.com">Establish connection <span aria-hidden="true">↗</span></a>
          <div className="contact-links">
            <a href="https://github.com/sumanshusohal" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href="https://www.linkedin.com/in/sumanshu-sohal-256981130/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="/resume/Sumanshu_Sohal_Resume.pdf" target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#top" aria-label="Sohal Cyber Defense, back to top"><span aria-hidden="true">SOHAL // CYBER_DEFENSE</span></a>
        <p>Cybersecurity engineering · Applied AI · Incident response</p>
        <span>© {new Date().getFullYear()} Sumanshu Sohal</span>
      </footer>
    </>
  );
}
