"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

// Tunnel sits behind the hero from the first frame and deepens on scroll.
// Base is held low enough that hero copy keeps its contrast over the motion.
const TUNNEL_BASE_OPACITY = 0.72;
const TUNNEL_MAX_OPACITY = 0.72;

const navigation = [
  { href: "#experience", label: "Experience" },
  { href: "#systems", label: "Systems" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

const worldLabels: Record<string, string> = {
  "#top": "OVERVIEW",
  "#metrics": "OPERATING PICTURE",
  "#experience": "EXPERIENCE",
  "#systems": "SYSTEMS",
  "#research": "RESEARCH",
  "#contact": "CONTACT",
};

const worldTransitions = [
  {
    code: "01 / EXPERIENCE",
    statement: "The signal has a history.",
    trail: "Tier 3 SOC response / penetration testing / malware-execution research / enterprise detection engineering",
    destination: "EXPERIENCE / 01",
  },
  {
    code: "02 / SYSTEMS",
    statement: "Experience compiled into working systems.",
    trail: "Automation / regulatory traceability / EDR visibility / cloud defense",
    destination: "SYSTEMS / 02",
  },
  {
    code: "03 / RESEARCH",
    statement: "Observed gaps become testable questions.",
    trail: "Explainable AI / ATT&CK maturity / measurable SOC outcomes",
    destination: "RESEARCH / 03",
  },
  {
    code: "04 / CONTACT",
    statement: "The next signal starts with a conversation.",
    trail: "Security engineering / incident response / cloud security / applied AI",
    destination: "CONTACT / 05",
  },
];

const metrics = [
  { value: "6+", label: "years in cyber defense" },
  { value: "12", label: "business units supported" },
  { value: "15+", label: "production detections" },
  { value: "15+", label: "log sources onboarded" },
];

const experience = [
  {
    period: "2023 to 2026",
    organization: "Trellix · Washington, DC",
    role: "Cybersecurity Engineer",
    summary:
      "Trellix Helix, HX, and NX incident response and detection engineering across a North American client's 12 business units.",
    outcomes: [
      "Led technical investigations, determined scope, and guided customer teams through remediation.",
      "Implemented and tuned 15+ production detections mapped to MITRE ATT&CK.",
      "Onboarded and validated 15+ application, endpoint, cloud, and infrastructure log sources.",
    ],
    code: "NX · HX · HELIX",
  },
  {
    period: "2022",
    organization: "WithSecure · New York, NY",
    role: "Pentesting Intern",
    summary:
      "Contributed to eight team-delivered penetration tests and researched Windows malware execution techniques.",
    outcomes: [
      "Worked under manager guidance alongside other penetration testers.",
      "Studied malware execution behavior and endpoint telemetry.",
      "Identified opportunities for endpoint detection coverage.",
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
      "Coordinated Tier 3 response during priority incidents in a 24/7 managed SOC.",
      "Built Siemplify SOAR playbooks for enrichment, phishing response, and containment.",
      "Authored SPL investigations and briefed client CISOs during significant incidents.",
    ],
    code: "SIEM · SOAR · IR",
  },
];

const systems = [
  {
    number: "01",
    eyebrow: "Agentic AI security",
    title: "Autonomous SOC Triage Agent",
    copy: "A bounded, auditable AI agent that triages EDR and SIEM alerts, selects threat-intelligence tools, resists prompt injection in attacker-controlled content, and submits every decision to a deterministic policy engine.",
    // Stated as recall rather than "0% false negatives", which reads as naive
    // or overclaimed to detection engineers (trivially achievable by alerting
    // on everything). TODO: pair this with the false-positive count or precision
    // from the same run before deploying, so the tradeoff is visible.
    outcome: "100% recall on the labeled evaluation set",
    signal: "7 stages / 6-call budget / 4 policy constraints",
    status: "FEATURED ON KANZ AI",
    visual: "triage",
    tags: ["Agentic AI", "SOC", "EDR", "Policy engine"],
    action: { label: "View on Kanz AI", href: "https://try.ka.nz/ai/sumanshusohal" },
    media: "/media/soc-triage-agent-demo.mp4",
  },
  {
    number: "02",
    eyebrow: "Applied automation",
    title: "Endpoint health intelligence",
    copy: "Python automation that streamlined endpoint validation, automated repetitive checklist steps, and reduced manual analyst effort.",
    outcome: "Automated repetitive endpoint validation",
    signal: "Python / endpoint telemetry / analyst workflow",
    status: "PRODUCTION",
    visual: "endpoint",
    tags: ["Python", "Endpoint", "Automation"],
    action: { label: "Discuss the system", href: "mailto:sumanshu.95s@outlook.com?subject=Endpoint%20health%20system" },
  },
  {
    number: "03",
    eyebrow: "AI + regulatory engineering",
    title: "Compliance mapping agent",
    copy: "An agentic retrieval project exploring traceability across major security and privacy frameworks, designed to connect evidence, obligations, and controls.",
    outcome: "Connects evidence to control obligations",
    signal: "NIST / retrieval / agentic traceability",
    status: "RESEARCH PROTOTYPE",
    visual: "mapping",
    tags: ["AI agents", "NIST", "Traceability"],
    action: { label: "View repository", href: "https://github.com/sumanshusohal/RAA-Compliance-Mapping" },
  },
  {
    number: "04",
    eyebrow: "Detection research",
    title: "EDR gap analysis",
    copy: "Controlled adversary simulation using Nim proof-of-concepts to study behavioral blind spots, including direct syscalls and in-memory execution.",
    outcome: "Turns blind spots into observable test cases",
    signal: "Nim / direct syscalls / EDR telemetry",
    status: "CONTROLLED LAB",
    visual: "trace",
    tags: ["EDR", "Nim", "Adversary simulation"],
    action: { label: "Request research notes", href: "mailto:sumanshu.95s@outlook.com?subject=EDR%20gap%20research" },
  },
  {
    number: "05",
    eyebrow: "Cloud architecture",
    title: "AWS security migration",
    copy: "A defense-in-depth cloud migration plan centered on hardened identity, segmented networks, defensible logging, and a measurable security baseline.",
    outcome: "Defines an identity-first, logged cloud baseline",
    signal: "AWS / IAM / segmentation / observability",
    status: "ARCHITECTURE CASE STUDY",
    visual: "cloud",
    tags: ["AWS", "IAM", "Cloud security"],
    action: { label: "Discuss the architecture", href: "mailto:sumanshu.95s@outlook.com?subject=AWS%20security%20architecture" },
  },
];

const capabilities = [
  { group: "SIEM & SOAR", items: ["Helix", "Splunk", "QRadar", "Siemplify"] },
  { group: "Endpoint & Network", items: ["Trellix HX / NX", "Volatility", "Wireshark"] },
  { group: "Cloud", items: ["AWS", "Azure"] },
  { group: "Query & Automation", items: ["Python", "KQL", "SQL"] },
  { group: "Frameworks & Assessment", items: ["MITRE ATT&CK", "Tenable"] },
];

const careerRecords = {
  trellix: {
    period: "2023 to 2026",
    organization: "Trellix",
    role: "Cybersecurity Engineer",
    summary: "Incident response and detection engineering across a North American client's 12 business units.",
    proof: [
      ["15+", "Production detections"],
      ["15+", "Log sources onboarded"],
      ["12", "Business units supported"],
      ["ATT&CK", "Detection mapping"],
    ],
  },
  withsecure: {
    period: "2022",
    organization: "WithSecure",
    role: "Pentesting Intern",
    summary: "Contributed to eight team-delivered penetration tests and studied Windows malware execution and endpoint telemetry.",
    proof: [
      ["8", "Team-delivered tests"],
      ["Windows", "Execution research"],
      ["Endpoint", "Telemetry analysis"],
      ["Team", "Guided delivery"],
    ],
  },
  hcl: {
    period: "2017 to 2021",
    organization: "HCL Technologies",
    role: "Tier 3 SOC Specialist",
    summary: "Coordinated Tier 3 response, SIEM investigations, and SOAR automation in a 24/7 managed SOC.",
    proof: [
      ["Tier 3", "Incident response"],
      ["Siemplify", "SOAR playbooks"],
      ["SPL", "Investigations"],
      ["24/7", "Managed SOC"],
    ],
  },
  phd: {
    period: "2026 to Present",
    organization: "University of the Cumberlands",
    role: "Executive PhD, Information Technology",
    summary: "Doctoral research with an Artificial Intelligence emphasis, focused on traceable and operationally useful cybersecurity systems.",
    proof: [
      ["Applied AI", "Cybersecurity"],
      ["Evidence", "Traceability"],
      ["Human", "Validation"],
      ["SOC", "Operational value"],
    ],
  },
};

type CareerRecord = keyof typeof careerRecords;

const instrumentLibrary = {
  triage: {
    label: "Bounded SOC decision pipeline",
    options: [
      { key: "ingest", label: "Ingest", detail: "The agent isolates attacker-controlled alert text from trusted control instructions before any tool is selected.", readout: ["Alert isolated", "Prompt boundary", "Context parsed", "Queue ready"] },
      { key: "enrich", label: "Enrich", detail: "Threat-intelligence calls execute inside a six-call hard budget and every observation is attached to the audit trail.", readout: ["Alert isolated", "Tool budget", "Intel evidence", "Trace logged"] },
      { key: "decide", label: "Decide", detail: "The model proposes a disposition, then four deterministic policy constraints approve, veto, or escalate it.", readout: ["Evidence scored", "Proposal", "Policy veto", "Disposition"] },
      { key: "audit", label: "Audit", detail: "The final decision remains explainable because the evidence, tool calls, policy checks, and outcome are preserved together.", readout: ["Evidence", "Tool calls", "Policy checks", "Audit complete"] },
    ],
  },
  endpoint: {
    label: "Endpoint triage simulation",
    options: [
      { key: "detect", label: "Detect", detail: "A stale or missing endpoint signal enters the validation queue.", readout: ["Telemetry gap", "Endpoint state", "Last check-in", "Queue created"] },
      { key: "validate", label: "Validate", detail: "Automated checks confirm service health, agent state, and connectivity before analyst review.", readout: ["Telemetry gap", "Service check", "Agent state", "Validated"] },
      { key: "enrich", label: "Enrich", detail: "Context is attached so the analyst receives a decision-ready record instead of a raw failure.", readout: ["Asset context", "Owner", "Risk tier", "Enriched"] },
      { key: "route", label: "Route", detail: "The validated result follows the correct remediation path with repetitive checks already completed.", readout: ["Decision", "Owner", "Priority", "Routed"] },
    ],
  },
  mapping: {
    label: "Evidence traceability field",
    options: [
      { key: "policy", label: "Policy", detail: "A policy statement is retrieved, interpreted, and connected to its control obligation.", readout: ["Policy source", "Retrieval path", "Control family", "Trace verified"] },
      { key: "telemetry", label: "Telemetry", detail: "Operational evidence is linked to the control it supports while preserving the reasoning path.", readout: ["Log evidence", "Reasoning", "Mapped control", "Trace verified"] },
      { key: "exception", label: "Exception", detail: "An exception is classified as an unresolved condition and routed for human validation.", readout: ["Exception", "Obligation", "Control owner", "Review required"] },
    ],
  },
  trace: {
    label: "EDR visibility test bench",
    options: [
      { key: "standard", label: "Standard path", detail: "The controlled sequence produces a familiar trail across process, image, and behavioral telemetry.", readout: ["Process create", "Image load", "Memory event", "Behavior visible"] },
      { key: "reduced", label: "Reduced telemetry", detail: "The same objective is tested through a lower-visibility path, exposing where compensating signals are needed.", readout: ["Process create", "Signal reduced", "Memory gap", "Compensate"] },
    ],
  },
  cloud: {
    label: "AWS defense-layer simulator",
    options: [
      { key: "baseline", label: "Baseline", detail: "The starting architecture exposes where identity, segmentation, logging, and detection are incomplete.", readout: ["Identity", "Network", "Logging", "Detection"] },
      { key: "hardened", label: "Hardened", detail: "The target state reconnects each layer into an identity-first, observable security baseline.", readout: ["Least privilege", "Segmentation", "Central logs", "Detection ready"] },
    ],
  },
};

type InstrumentName = keyof typeof instrumentLibrary;

/**
 * Card schematics. Each one draws the structure that system's own `signal`
 * field already claims, so nothing here asserts a number the copy doesn't.
 * Replaces the previous decorative <i/> stack, which encoded nothing.
 */
function SystemSchematic({ visual }: { visual: InstrumentName }) {
  const line = "#74a6b1";
  const dim = "#2c6571";
  const cyan = "#8ce8ef";
  const amber = "#f1a15b";
  const violet = "#8f7cff";

  if (visual === "triage") {
    // 7 stages, 6-call budget, 4 policy constraints.
    const xs = [30, 100, 170, 240, 310, 380, 450];
    return (
      <svg viewBox="0 0 480 100" role="img" aria-label="Seven bounded stages with a six-call tool budget and four policy constraints">
        <line x1="30" y1="34" x2="450" y2="34" stroke={dim} strokeWidth="1" />
        {xs.map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy="34"
            r={i === 4 || i === 5 ? 7 : 5}
            fill={i === 4 ? amber : i === 5 ? violet : "#010305"}
            stroke={i === 4 ? amber : i === 5 ? violet : line}
            strokeWidth="1.5"
          />
        ))}
        <text x="30" y="62" fill="#7d8a8f" fontSize="10" letterSpacing="1">INGEST</text>
        <text x="288" y="62" fill={amber} fontSize="10" letterSpacing="1">INJECTION</text>
        <text x="358" y="62" fill={violet} fontSize="10" letterSpacing="1">POLICY</text>
        <g transform="translate(30,78)">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <rect key={i} x={i * 16} y="0" width="10" height="4" fill={i < 3 ? amber : "#3a2b1a"} />
          ))}
          <text x="112" y="5" fill="#7d8a8f" fontSize="10" letterSpacing="1">6-CALL BUDGET</text>
        </g>
      </svg>
    );
  }

  if (visual === "mapping") {
    // Evidence -> obligation -> control traceability.
    const cols = [60, 240, 420];
    return (
      <svg viewBox="0 0 480 100" role="img" aria-label="Evidence mapped through obligations to controls">
        {[0, 1, 2].map(c =>
          [22, 50, 78].map(y => (
            <circle key={`${c}-${y}`} cx={cols[c]} cy={y} r="5" fill="#010305" stroke={c === 1 ? cyan : line} strokeWidth="1.5" />
          )),
        )}
        {[22, 50, 78].map(y1 =>
          [22, 50, 78].map(y2 => (
            <line key={`a${y1}-${y2}`} x1="65" y1={y1} x2="235" y2={y2} stroke={dim} strokeWidth="0.6" opacity="0.55" />
          )),
        )}
        {[22, 50, 78].map(y1 =>
          [22, 50, 78].map(y2 => (
            <line key={`b${y1}-${y2}`} x1="245" y1={y1} x2="415" y2={y2} stroke={dim} strokeWidth="0.6" opacity="0.55" />
          )),
        )}
        <text x="34" y="98" fill="#7d8a8f" fontSize="10" letterSpacing="1">EVIDENCE</text>
        <text x="206" y="98" fill={cyan} fontSize="10" letterSpacing="1">OBLIGATION</text>
        <text x="392" y="98" fill="#7d8a8f" fontSize="10" letterSpacing="1">CONTROL</text>
      </svg>
    );
  }

  if (visual === "cloud") {
    // Defence in depth: the four layers the signal names.
    const layers = ["IDENTITY", "NETWORK", "LOGGING", "BASELINE"];
    return (
      <svg viewBox="0 0 480 100" role="img" aria-label="Four defence-in-depth layers: identity, network, logging, baseline">
        {layers.map((label, i) => (
          <g key={label}>
            <rect x={20 + i * 12} y={14 + i * 19} width={440 - i * 24} height="15" fill="none" stroke={i === 0 ? cyan : line} strokeWidth="1.2" opacity={1 - i * 0.16} />
            <text x={30 + i * 12} y={25 + i * 19} fill={i === 0 ? cyan : "#7d8a8f"} fontSize="10" letterSpacing="1.4">{label}</text>
          </g>
        ))}
      </svg>
    );
  }

  if (visual === "endpoint") {
    // Repetitive manual checks collapsing into one automated pass.
    return (
      <svg viewBox="0 0 480 100" role="img" aria-label="Repetitive manual endpoint checks collapsed into one automated pass">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <g key={i}>
            <rect x="24" y={10 + i * 14} width="150" height="8" fill="none" stroke={line} strokeWidth="1" opacity="0.75" />
            <line x1="180" y1={14 + i * 14} x2="250" y2="50" stroke={dim} strokeWidth="0.7" />
          </g>
        ))}
        <rect x="258" y="40" width="196" height="20" fill="none" stroke={cyan} strokeWidth="1.5" />
        <text x="270" y="54" fill={cyan} fontSize="10" letterSpacing="1.4">AUTOMATED PASS</text>
        <text x="24" y="96" fill="#7d8a8f" fontSize="10" letterSpacing="1">MANUAL CHECKLIST STEPS</text>
      </svg>
    );
  }

  // trace: behavioural blind spots turned into observable test cases.
  const observed = [0, 1, 3, 4, 6, 7, 9, 11, 12, 14];
  return (
    <svg viewBox="0 0 480 100" role="img" aria-label="Behavioural blind spots converted into observable test cases">
      {Array.from({ length: 15 }).map((_, i) => {
        const seen = observed.includes(i);
        return (
          <rect
            key={i}
            x={24 + i * 30}
            y="22"
            width="22"
            height="30"
            fill={seen ? "#12414d" : "none"}
            stroke={seen ? cyan : line}
            strokeDasharray={seen ? undefined : "2 2"}
            strokeWidth="1.2"
          />
        );
      })}
      {/* Legend carries its own swatches so the encoding is self-explanatory. */}
      <rect x="24" y="70" width="12" height="12" fill="#12414d" stroke={cyan} strokeWidth="1.2" />
      <text x="42" y="80" fill={cyan} fontSize="10" letterSpacing="1">OBSERVABLE</text>
      <rect x="150" y="70" width="12" height="12" fill="none" stroke={line} strokeDasharray="2 2" strokeWidth="1.2" />
      <text x="168" y="80" fill="#7d8a8f" fontSize="10" letterSpacing="1">BLIND SPOT UNDER TEST</text>
    </svg>
  );
}

function WorldTransition({
  code,
  statement,
  trail,
  destination,
}: {
  code: string;
  statement: string;
  trail: string;
  destination: string;
}) {
  return (
    <div className="world-transition">
      <div className="world-transition-copy">
        <span className="world-transition-code">{code}</span>
        <strong>{statement}</strong>
        <small>{trail}</small>
      </div>
      <div className="world-gate" aria-hidden="true">
        <i /><i /><i /><b />
      </div>
      <span className="world-transition-target">{destination}</span>
    </div>
  );
}

function SystemInstrument({
  visual,
  selection,
  onSelect,
}: {
  visual: InstrumentName;
  selection: string;
  onSelect: (selection: string) => void;
}) {
  const instrument = instrumentLibrary[visual];
  const selectedIndex = Math.max(instrument.options.findIndex((option) => option.key === selection), 0);
  const selected = instrument.options[selectedIndex];

  return (
    <div className={`system-instrument instrument-${visual}`}>
      <div className="instrument-heading">
        <span>Interactive instrument</span>
        <strong>{instrument.label}</strong>
      </div>
      <div className="instrument-controls" role="group" aria-label={instrument.label}>
        {instrument.options.map((option) => (
          <button
            className={option.key === selected.key ? "is-selected" : ""}
            type="button"
            key={option.key}
            aria-pressed={option.key === selected.key}
            onClick={() => onSelect(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="instrument-stage" data-mode={selected.key} aria-hidden="true">
        {selected.readout.map((item, index) => (
          <span className={index <= selectedIndex || visual === "trace" || visual === "cloud" ? "is-active" : ""} key={item}>
            <i />{item}
          </span>
        ))}
      </div>
      <p className="instrument-description" aria-live="polite">{selected.detail}</p>
    </div>
  );
}

export function ThreatPortfolio() {
  const tunnelFrameRef = useRef<HTMLIFrameElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const transitTimersRef = useRef<number[]>([]);
  const transitFrameRef = useRef<number>(0);
  const transitTokenRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [intelOpen, setIntelOpen] = useState(false);
  const [careerRecord, setCareerRecord] = useState<CareerRecord>("trellix");
  const [motionPaused, setMotionPaused] = useState(false);
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const [compactNavigation, setCompactNavigation] = useState(false);
  const [transitActive, setTransitActive] = useState(false);
  const [transitArriving, setTransitArriving] = useState(false);
  const [transitLabel, setTransitLabel] = useState("SIGNAL OBSERVATORY");
  const [transitMessage, setTransitMessage] = useState("");
  const [activeInstrument, setActiveInstrument] = useState<string | null>(null);
  const [instrumentSelections, setInstrumentSelections] = useState<Record<string, string>>({
    triage: "ingest",
    endpoint: "detect",
    mapping: "policy",
    trace: "standard",
    cloud: "baseline",
  });
  const motionSuppressed = motionPaused || systemReducedMotion;

  const updateCardTilt = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || motionSuppressed) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--card-rx", `${(0.5 - y) * 6}deg`);
    event.currentTarget.style.setProperty("--card-ry", `${(x - 0.5) * 7}deg`);
    event.currentTarget.style.setProperty("--card-glow-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--card-glow-y", `${y * 100}%`);
  };

  const resetCardTilt = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--card-rx", "0deg");
    event.currentTarget.style.setProperty("--card-ry", "0deg");
    event.currentTarget.style.setProperty("--card-glow-x", "50%");
    event.currentTarget.style.setProperty("--card-glow-y", "50%");
  };

  const beginWorldTransit = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    destinationLabel?: string,
  ) => {
    const href = event.currentTarget.getAttribute("href");
    setMenuOpen(false);
    if (
      !href?.startsWith("#") ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    const label = destinationLabel ?? worldLabels[href] ?? "NEXT SECTION";
    const keyboardActivation = event.detail === 0;
    const shouldFocusTarget = keyboardActivation || (compactNavigation && Boolean(event.currentTarget.closest("#primary-navigation")));
    const reducedMotion = motionSuppressed;

    transitTokenRef.current += 1;
    const token = transitTokenRef.current;
    transitTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    transitTimersRef.current = [];
    if (transitFrameRef.current) window.cancelAnimationFrame(transitFrameRef.current);

    setTransitLabel(label);
    setTransitMessage("");
    setTransitActive(false);
    setTransitArriving(false);

    transitTimersRef.current.push(window.setTimeout(() => {
      if (token === transitTokenRef.current) setTransitMessage(`Navigating to ${label}.`);
    }, 0));

    if (!reducedMotion) {
      transitFrameRef.current = window.requestAnimationFrame(() => {
        if (token !== transitTokenRef.current) return;
        setTransitActive(true);
        transitFrameRef.current = 0;
      });
      transitTimersRef.current.push(window.setTimeout(() => {
        if (token === transitTokenRef.current) setTransitArriving(true);
      }, 430));
      transitTimersRef.current.push(window.setTimeout(() => {
        if (token !== transitTokenRef.current) return;
        setTransitActive(false);
        setTransitArriving(false);
      }, 760));
    }

    if (shouldFocusTarget) {
      transitTimersRef.current.push(window.setTimeout(() => {
        target.focus({ preventScroll: true });
      }, 0));
    }
  };

  useEffect(() => () => {
    transitTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    if (transitFrameRef.current) window.cancelAnimationFrame(transitFrameRef.current);
  }, []);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactNavigationQuery = window.matchMedia("(max-width: 820px)");
    const updatePreferences = () => {
      setSystemReducedMotion(reducedMotionQuery.matches);
      setCompactNavigation(compactNavigationQuery.matches);
    };

    updatePreferences();
    reducedMotionQuery.addEventListener("change", updatePreferences);
    compactNavigationQuery.addEventListener("change", updatePreferences);
    return () => {
      reducedMotionQuery.removeEventListener("change", updatePreferences);
      compactNavigationQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    if (!motionSuppressed) return;
    transitTokenRef.current += 1;
    transitTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    transitTimersRef.current = [];
    if (transitFrameRef.current) window.cancelAnimationFrame(transitFrameRef.current);
    transitFrameRef.current = 0;
    const cleanupFrame = window.requestAnimationFrame(() => {
      setTransitActive(false);
      setTransitArriving(false);
    });
    return () => window.cancelAnimationFrame(cleanupFrame);
  }, [motionSuppressed]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", motionPaused);
    tunnelFrameRef.current?.contentWindow?.postMessage(
      { type: "tunnel-active", active: !motionSuppressed && activeSection !== "top" },
      window.location.origin,
    );
    return () => document.documentElement.classList.remove("motion-paused");
  }, [motionPaused, motionSuppressed, activeSection]);

  useEffect(() => {
    let frame = 0;
    let pointerFrame = 0;
    let latestPointer: PointerEvent | null = null;

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
      // The tunnel is the hero backdrop, so it is visible from the first frame
      // and deepens as you scroll rather than switching on partway down.
      root.style.setProperty("--tunnel-opacity", `${(TUNNEL_BASE_OPACITY + heroProgress * (TUNNEL_MAX_OPACITY - TUNNEL_BASE_OPACITY)).toFixed(3)}`);
      tunnelFrameRef.current?.contentWindow?.postMessage(
        { type: "tunnel-scroll", progress },
        window.location.origin,
      );
      tunnelFrameRef.current?.contentWindow?.postMessage(
        { type: "tunnel-active", active: !motionSuppressed },
        window.location.origin,
      );
      frame = 0;
    };

    const updatePointerFrame = () => {
      if (!latestPointer) return;
      const event = latestPointer;
      const root = document.documentElement;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      root.style.setProperty("--pointer-x", `${x * 22}px`);
      root.style.setProperty("--pointer-y", `${y * 16}px`);
      root.style.setProperty("--pointer-rx", `${y * -3}deg`);
      root.style.setProperty("--pointer-ry", `${x * 5}deg`);
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.classList.add("observer-active");
      tunnelFrameRef.current?.contentWindow?.postMessage(
        { type: "tunnel-pointer", x: x * 2, y: y * -2, active: true },
        window.location.origin,
      );
      pointerFrame = 0;
    };

    const updatePointer = (event: PointerEvent) => {
      latestPointer = event;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointerFrame);
    };

    const resetPointer = () => {
      const root = document.documentElement;
      root.style.setProperty("--pointer-x", "0px");
      root.style.setProperty("--pointer-y", "0px");
      root.style.setProperty("--pointer-rx", "0deg");
      root.style.setProperty("--pointer-ry", "0deg");
      root.classList.remove("observer-active");
      tunnelFrameRef.current?.contentWindow?.postMessage(
        { type: "tunnel-pointer", x: 0, y: 0, active: false },
        window.location.origin,
      );
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
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, [motionSuppressed]);

  useEffect(() => {
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".world-transition, .section-intro, .timeline-entry, .system-card, .research-copy, .publication-card, .capability-band > *, .contact-section > *:not(.contact-orbit)",
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
          if (entry.target.classList.contains("world-transition")) {
            entry.target.classList.toggle("in-view", entry.isIntersecting);
            return;
          }
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

  const selectedCareer = careerRecords[careerRecord];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="world-atmosphere" data-world={activeSection} aria-hidden="true">
        <span className="world-atmosphere-top" />
        <span className="world-atmosphere-experience" />
        <span className="world-atmosphere-systems" />
        <span className="world-atmosphere-research" />
        <span className="world-atmosphere-contact" />
      </div>
      <div
        className={`world-transit-overlay ${transitActive ? "is-active" : ""} ${transitArriving ? "is-arriving" : ""}`}
        aria-hidden="true"
      >
        <div className="transit-iris"><i /><i /><i /><b /></div>
        <p><span>NAVIGATING TO</span><strong>{transitLabel}</strong></p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{transitMessage}</p>
      <div className="scroll-progress" aria-hidden="true"><span /></div>
      <button
        className="motion-control"
        type="button"
        aria-pressed={motionSuppressed}
        disabled={systemReducedMotion}
        onClick={() => setMotionPaused((paused) => !paused)}
      >
        <span aria-hidden="true" /> Motion {systemReducedMotion ? "reduced by system" : motionPaused ? "paused" : "active"}
      </button>

      <div className="ambient-stage" aria-hidden="true">
        <iframe
          ref={tunnelFrameRef}
          className="tunnel-background"
          src="/tunnel-background.html"
          title="Procedural tunnel background"
          tabIndex={-1}
          loading="eager"
          onLoad={event => {
            const pageHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            const hero = document.getElementById("top");
            const heroTravel = Math.max((hero?.offsetHeight ?? window.innerHeight) - window.innerHeight, 1);
            const heroProgress = Math.min(Math.max(window.scrollY / heroTravel, 0), 1);
            document.documentElement.style.setProperty(
              "--tunnel-opacity",
              `${(TUNNEL_BASE_OPACITY + heroProgress * (TUNNEL_MAX_OPACITY - TUNNEL_BASE_OPACITY)).toFixed(3)}`,
            );
            event.currentTarget.contentWindow?.postMessage(
              { type: "tunnel-scroll", progress: Math.min(window.scrollY / pageHeight, 1) },
              window.location.origin,
            );
            event.currentTarget.contentWindow?.postMessage(
              { type: "tunnel-active", active: !motionSuppressed },
              window.location.origin,
            );
          }}
        />
        <div className="dust-layer dust-layer-far" />
        <div className="dust-layer dust-layer-near" />
        <div className="cryo-haze" />
        <div className="corridor-lines" />
        <div className="scan-sweep" />
        <div className="edge-vignette" />
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Sohal Cyber Defense, back to top" onClick={(event) => beginWorldTransit(event, "SIGNAL OBSERVATORY")}>
          <span aria-hidden="true">SOHAL // CYBER_DEFENSE</span><i aria-hidden="true" />
        </a>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav
          id="primary-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label="Primary navigation"
          inert={compactNavigation && !menuOpen}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
              onClick={(event) => beginWorldTransit(event, worldLabels[item.href])}
            >
              {item.label}
            </a>
          ))}
          <div className="mobile-network-links" aria-label="Professional profiles">
            <a href="https://github.com/sumanshusohal" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href="https://www.linkedin.com/in/sumanshu-sohal-256981130/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://try.ka.nz/ai/sumanshusohal" target="_blank" rel="noreferrer">Kanz AI <span aria-hidden="true">↗</span></a>
          </div>
        </nav>
        <div className="header-actions">
          <a className="header-network" href="https://github.com/sumanshusohal" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a className="header-network" href="https://www.linkedin.com/in/sumanshu-sohal-256981130/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a className="header-network" href="https://try.ka.nz/ai/sumanshusohal" target="_blank" rel="noreferrer">Kanz <span aria-hidden="true">↗</span></a>
          <a className="header-status" href="mailto:sumanshu.95s@outlook.com">
            <span aria-hidden="true" /> Available
          </a>
        </div>
      </header>

      <main id="main-content" data-world={activeSection}>
        <section className="hero" id="top" aria-labelledby="hero-title" tabIndex={-1}>
          <div className="hero-sticky">
            {/* The tunnel itself is the hero art now. This is only the scrim
                that keeps type legible over it. */}
            <div className="hero-veil" aria-hidden="true" />

            <div className="hero-copy">
              <p className="system-kicker"><span aria-hidden="true">SUMANSHU SOHAL /</span><span>SECURITY ENGINEERING + APPLIED AI</span></p>
              <h1 id="hero-title">I turn security noise<br /><em>into defensible signal.</em></h1>
              <p className="hero-summary">
                Six-plus years across Tier 3 SOC operations, enterprise incident response, detection engineering, penetration testing, and applied AI research.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#systems" onClick={(event) => beginWorldTransit(event, "EVIDENCE SYSTEMS")}>Inspect selected systems <span aria-hidden="true">↘</span></a>
                <a className="button button-secondary" href="/resume/Sumanshu_Sohal_Resume.pdf" target="_blank" rel="noreferrer">Open résumé <span aria-hidden="true">↗</span></a>
              </div>
            </div>

            <dl className="hero-proof" aria-label="Career impact metrics">
              {metrics.map(metric => (
                <div key={metric.label}>
                  <dt>{metric.value}</dt>
                  <dd>{metric.label}</dd>
                </div>
              ))}
            </dl>

            <a className="scroll-cue" href="#metrics"><span>Start with the operating picture</span><i aria-hidden="true" /></a>
          </div>
        </section>

        <section className="career-console-section" aria-labelledby="career-console-title">
          <div className="career-console-intro">
            <p className="section-code">00 / CAREER PROVENANCE</p>
            <h2 id="career-console-title">The artwork becomes<br />inspectable evidence.</h2>
            <p>Select a career record to trace the dates, responsibilities, and verified outcomes behind the signal archive.</p>
          </div>

          <div className="evidence-console" data-record={careerRecord}>
            <div className="evidence-console-header">
              <div><span>OPERATING PICTURE / 00</span><strong>Career evidence console</strong></div>
              <p><i aria-hidden="true" /> Verified record</p>
            </div>

            <div className="evidence-console-body">
              <div className="career-records" role="tablist" aria-label="Career records">
                {(Object.keys(careerRecords) as CareerRecord[]).map((key) => (
                  <button
                    className={careerRecord === key ? "is-selected" : ""}
                    type="button"
                    role="tab"
                    aria-selected={careerRecord === key}
                    aria-controls="career-evidence-panel"
                    onClick={() => setCareerRecord(key)}
                    key={key}
                  >
                    <span>{careerRecords[key].period}</span>
                    <strong>{careerRecords[key].organization}</strong>
                  </button>
                ))}
              </div>

              <div className="career-evidence" id="career-evidence-panel" role="tabpanel" aria-live="polite">
                <div className="evidence-lattice" data-record={careerRecord} aria-hidden="true">
                  <i /><i /><i /><i /><i /><i /><span /><b />
                </div>
                <p className="career-evidence-period">{selectedCareer.period}</p>
                <h2>{selectedCareer.organization} <span>/ {selectedCareer.role}</span></h2>
                <p className="career-evidence-summary">{selectedCareer.summary}</p>
                <dl className="career-proof-grid">
                  {selectedCareer.proof.map(([value, label]) => (
                    <div key={label}><dt>{value}</dt><dd>{label}</dd></div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="evidence-console-footer">
              <span>Evidence before ornament</span><b>FIELD / {careerRecord.toUpperCase()}</b>
            </div>
          </div>
        </section>

        <section className="metric-strip" id="metrics" aria-label="Career impact metrics" tabIndex={-1}>
          {metrics.map((metric, index) => (
            <article key={metric.label}>
              <span className="metric-index">0{index + 1}</span>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </article>
          ))}
        </section>

        <WorldTransition {...worldTransitions[0]} />

        <section className="content-section experience-section" id="experience" aria-labelledby="experience-title" tabIndex={-1}>
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

        <WorldTransition {...worldTransitions[1]} />

        <section className="content-section systems-section" id="systems" aria-labelledby="systems-title" tabIndex={-1}>
          <div className="section-intro section-intro-wide">
            <div>
              <p className="section-code">02 / CORE SYSTEMS</p>
              <h2 id="systems-title">Selected systems,<br />defensible evidence.</h2>
            </div>
            <p>Each system connects an operational problem to a concrete security decision, a measurable signal, and a path to inspect the work.</p>
          </div>

          <div className="system-grid">
            {systems.map((system) => {
              const expanded = activeInstrument === system.number;
              const visual = system.visual as InstrumentName;
              return (
              <article
                className={`system-card ${system.media ? "system-card-featured" : ""} ${expanded ? "is-expanded" : ""}`}
                key={system.number}
                onPointerMove={updateCardTilt}
                onPointerLeave={resetCardTilt}
              >
                <div className="system-card-content">
                  <div className="system-card-top">
                    <span className="system-number">{system.number}</span>
                    <p>{system.eyebrow}</p>
                    <span className="system-status">{system.status}</span>
                  </div>
                  <div className={`signal-graphic signal-${system.visual}`}>
                    <SystemSchematic visual={visual} />
                  </div>
                  {system.media && (
                    <div className="system-card-media">
                      <video controls preload="metadata" playsInline poster="/og-signal-console.png">
                        <source src={system.media} type="video/mp4" />
                        <track kind="captions" src="/media/soc-triage-agent-demo.vtt" srcLang="en" label="English" default />
                        Your browser does not support embedded video.
                      </video>
                      <span>Recorded system walkthrough / select play to inspect</span>
                    </div>
                  )}
                  <h3>{system.title}</h3>
                  <p>{system.copy}</p>
                  <dl className="system-card-proof">
                    <div><dt>Result</dt><dd>{system.outcome}</dd></div>
                    <div><dt>Signal</dt><dd>{system.signal}</dd></div>
                  </dl>
                  <ul aria-label="Technologies">{system.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <div className="system-card-actions">
                    <button
                      className="instrument-toggle"
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`instrument-${system.number}`}
                      onClick={() => setActiveInstrument((active) => active === system.number ? null : system.number)}
                    >
                      {expanded ? "Close instrument" : "Inspect system"} <span aria-hidden="true">{expanded ? "−" : "+"}</span>
                    </button>
                    <a href={system.action.href} target={system.action.href.startsWith("http") ? "_blank" : undefined} rel={system.action.href.startsWith("http") ? "noreferrer" : undefined}>
                      {system.action.label} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  {expanded && (
                    <div id={`instrument-${system.number}`}>
                      <SystemInstrument
                        visual={visual}
                        selection={instrumentSelections[visual]}
                        onSelect={(selection) => setInstrumentSelections((current) => ({ ...current, [visual]: selection }))}
                      />
                    </div>
                  )}
                </div>
              </article>
              );
            })}
          </div>
        </section>

        <WorldTransition {...worldTransitions[2]} />

        <section className="content-section research-section" id="research" aria-labelledby="research-title" tabIndex={-1}>
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
              <span><i aria-hidden="true" /> {intelOpen ? "Hide research detail" : "Show research detail"}</span>
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
          <div><p className="section-code">04 / CAPABILITIES</p><h2 id="capabilities-title">Capabilities</h2></div>
          <div className="capability-groups">
            {capabilities.map(({ group, items }) => (
              <div className="capability-group" key={group}>
                <h3>{group}</h3>
                <ul>{items.map((capability) => <li key={capability}>{capability}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <WorldTransition {...worldTransitions[3]} />

        <section className="contact-section" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
          <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
          <p className="section-code">05 / CONTACT</p>
          <h2 id="contact-title">Need a clearer<br /><em>defense signal?</em></h2>
          <p>For security engineering, detection, incident response, cloud security, and applied AI conversations.</p>
          <a className="button button-primary button-large" href="mailto:sumanshu.95s@outlook.com">Start an email <span aria-hidden="true">↗</span></a>
          <div className="contact-links">
            <a href="https://github.com/sumanshusohal" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href="https://www.linkedin.com/in/sumanshu-sohal-256981130/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="/resume/Sumanshu_Sohal_Resume.pdf" target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#top" aria-label="Sohal Cyber Defense, back to top" onClick={(event) => beginWorldTransit(event, "SIGNAL OBSERVATORY")}><span aria-hidden="true">SOHAL // CYBER_DEFENSE</span></a>
        <p>Cybersecurity engineering · Applied AI · Incident response</p>
        <span>© {new Date().getFullYear()} Sumanshu Sohal</span>
      </footer>
    </>
  );
}
