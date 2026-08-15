import {
  AbsoluteFill,
  Composition,
  Easing,
  Img,
  Interactive,
  interpolate,
  registerRoot,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const particleSeeds = Array.from({ length: 72 }, (_, index) => ({
  x: (index * 173 + 91) % 1920,
  y: (index * 97 + 43) % 1080,
  size: 2 + (index % 4),
  delay: (index * 19) % 120,
  violet: index % 5 === 0,
}));

const SignalSieve = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Signal sieve background"
      style={{
        overflow: "hidden",
        backgroundColor: "#010305",
      }}
    >
      <Interactive.Div
        name="Graphite base artwork"
        style={{
          position: "absolute",
          inset: -60,
          opacity: 0.62,
          scale: interpolate(frame, [0, durationInFrames / 2, durationInFrames], [1.04, 1.085, 1.04], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.45, 0, 0.55, 1), Easing.bezier(0.45, 0, 0.55, 1)],
            output: "perceptual-scale",
          }),
          translate: interpolate(frame, [0, durationInFrames / 2, durationInFrames], ["0px 0px", "-26px 12px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.45, 0, 0.55, 1), Easing.bezier(0.45, 0, 0.55, 1)],
          }),
        }}
      >
        <Img
          name="Signal console artwork"
          src={staticFile("og-signal-console.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.7) contrast(1.14) brightness(0.58)",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Separated signal plane"
        style={{
          position: "absolute",
          inset: -45,
          clipPath: "polygon(72% 0, 100% 0, 100% 100%, 60% 100%)",
          opacity: interpolate(frame, [0, durationInFrames / 2, durationInFrames], [0.26, 0.52, 0.26], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.45, 0, 0.55, 1), Easing.bezier(0.45, 0, 0.55, 1)],
          }),
          translate: interpolate(frame, [0, durationInFrames / 2, durationInFrames], ["22px -10px", "-16px 18px", "22px -10px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.45, 0, 0.55, 1), Easing.bezier(0.45, 0, 0.55, 1)],
          }),
          mixBlendMode: "screen",
        }}
      >
        <Img
          name="Signal plane artwork"
          src={staticFile("og-signal-console.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(1.25) hue-rotate(8deg) contrast(1.18) brightness(0.8)",
          }}
        />
      </Interactive.Div>

      <Interactive.Div
        name="Alien field grade"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 76% 50%, rgba(1,3,5,0.98) 0 9%, rgba(18,43,55,0.38) 19%, transparent 40%), radial-gradient(circle at 87% 16%, rgba(143,124,255,0.18), transparent 28%), radial-gradient(circle at 64% 82%, rgba(140,232,239,0.13), transparent 30%), linear-gradient(90deg, #010305 0%, rgba(1,3,5,0.96) 31%, rgba(1,3,5,0.38) 68%, rgba(1,3,5,0.82) 100%)",
        }}
      />

      <AbsoluteFill name="Drifting evidence particles">
        {particleSeeds.map((particle, index) => {
          const cycle = (frame + particle.delay) % 120;
          return (
            <span
              key={`${particle.x}-${particle.y}`}
              style={{
                position: "absolute",
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                borderRadius: "50%",
                backgroundColor: particle.violet ? "#8f7cff" : "#8ce8ef",
                boxShadow: particle.violet ? "0 0 14px rgba(143,124,255,0.72)" : "0 0 14px rgba(140,232,239,0.7)",
                opacity: interpolate(cycle, [0, 50, 119], [0.08, 0.8, 0.08], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: [Easing.bezier(0.45, 0, 0.55, 1), Easing.bezier(0.45, 0, 0.55, 1)],
                }),
                translate: `${interpolate(cycle, [0, 119], [0, -44], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}px ${interpolate(cycle, [0, 119], [0, index % 2 === 0 ? -18 : 18], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}px`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      <svg
        aria-hidden="true"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="cyanRail" x1="0" x2="1">
            <stop offset="0" stopColor="#8f7cff" stopOpacity="0" />
            <stop offset="0.45" stopColor="#8f7cff" stopOpacity="0.62" />
            <stop offset="0.72" stopColor="#8ce8ef" stopOpacity="0.92" />
            <stop offset="1" stopColor="#8ce8ef" stopOpacity="0" />
          </linearGradient>
          <filter id="railGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {[
          "M 720 250 C 1010 170, 1190 470, 1810 330",
          "M 680 430 C 1040 560, 1260 260, 1860 520",
          "M 700 650 C 990 530, 1320 830, 1840 700",
          "M 760 850 C 1100 920, 1370 620, 1880 880",
        ].map((path, index) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="url(#cyanRail)"
            strokeWidth={index === 1 ? 3 : 2}
            strokeDasharray="18 30"
            filter="url(#railGlow)"
            style={{
              opacity: interpolate(frame, [0, durationInFrames / 2, durationInFrames], [0.28, 0.82 - index * 0.08, 0.28], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: [Easing.bezier(0.45, 0, 0.55, 1), Easing.bezier(0.45, 0, 0.55, 1)],
              }),
              strokeDashoffset: interpolate(frame, [0, durationInFrames], [index * 26, index * 26 - 240], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        ))}
      </svg>

      <Interactive.Div
        name="Analysis aperture outer ring"
        style={{
          position: "absolute",
          top: 540,
          left: 1460,
          width: 520,
          height: 520,
          marginTop: -260,
          marginLeft: -260,
          border: "1px solid rgba(140,232,239,0.38)",
          borderLeftColor: "transparent",
          borderRadius: "50%",
          rotate: interpolate(frame, [0, durationInFrames], ["0deg", "360deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          boxShadow: "0 0 90px rgba(140,232,239,0.09), inset 0 0 80px rgba(143,124,255,0.05)",
        }}
      />

      <Interactive.Div
        name="Analysis aperture inner ring"
        style={{
          position: "absolute",
          top: 540,
          left: 1460,
          width: 330,
          height: 330,
          marginTop: -165,
          marginLeft: -165,
          border: "1px solid rgba(143,124,255,0.46)",
          borderTopColor: "#f1a15b",
          borderRightColor: "transparent",
          borderRadius: "50%",
          rotate: interpolate(frame, [0, durationInFrames], ["360deg", "0deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, durationInFrames / 2, durationInFrames], [0.96, 1.04, 0.96], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: [Easing.bezier(0.45, 0, 0.55, 1), Easing.bezier(0.45, 0, 0.55, 1)],
            output: "perceptual-scale",
          }),
          boxShadow: "0 0 42px rgba(143,124,255,0.14)",
        }}
      />

      <Interactive.Div
        name="Slow scanning light"
        style={{
          position: "absolute",
          top: interpolate(frame, [0, durationInFrames], [-260, 1340], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          left: 560,
          width: 1360,
          height: 220,
          background: "linear-gradient(180deg, transparent, rgba(140,232,239,0.055), transparent)",
          opacity: 0.8,
          rotate: "-5deg",
        }}
      />

      <Interactive.Div
        name="Film grade"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(1,3,5,0.58), transparent 23%, transparent 72%, rgba(1,3,5,0.86)), radial-gradient(circle at center, transparent 48%, rgba(1,3,5,0.74) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const RemotionRoot = () => (
  <Composition
    id="SignalSieve"
    component={SignalSieve}
    durationInFrames={300}
    fps={30}
    width={1920}
    height={1080}
  />
);

registerRoot(RemotionRoot);
