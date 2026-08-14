"use client";

import { useEffect, useState } from "react";

type CryoChamberProps = {
  containmentSignal: number;
};

export function CryoChamber({ containmentSignal }: CryoChamberProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!containmentSignal) return;
    setPulse(true);
    const timer = window.setTimeout(() => setPulse(false), 5200);
    return () => window.clearTimeout(timer);
  }, [containmentSignal]);

  return (
    <div className={`cryo-scene ${pulse ? "is-pulsing" : ""}`}>
      <div className="cryo-depth cryo-backplane">
        <div className="vault-light vault-light-left" />
        <div className="vault-light vault-light-right" />
        <div className="vault-vanishing-point" />
        <div className="corridor-strobe corridor-strobe-left" />
        <div className="corridor-strobe corridor-strobe-right" />
      </div>

      <div className="cryo-depth cryo-rib-plane">
        {Array.from({ length: 7 }, (_, index) => (
          <i key={index} className="vault-rib" style={{ "--rib-index": index } as React.CSSProperties} />
        ))}
      </div>

      <div className="cryo-depth cryo-fog-plane">
        <span className="fog-bank fog-bank-one" />
        <span className="fog-bank fog-bank-two" />
        <span className="ice-particle-field" />
        <span className="chamber-scan" />
      </div>

      <div className="cryo-depth cryo-pod-plane">
        <div className="cryo-pod-shadow" />
        <div className="cryo-pod">
          <div className="pod-crown"><i /><i /><i /></div>
          <div className="pod-rail pod-rail-left" />
          <div className="pod-rail pod-rail-right" />
          <div className="pod-glass">
            <div className="pod-coolant-glow" />
            <div className="frost frost-one" />
            <div className="frost frost-two" />
            <div className="sleeper">
              <span className="sleeper-head" />
              <span className="sleeper-body" />
            </div>
            <div className="breath-mark" />
            <div className="coolant-bubbles">
              {Array.from({ length: 8 }, (_, index) => <i key={index} />)}
            </div>
          </div>
          <div className="pod-base"><i /><i /><i /><i /></div>
          <span className="pod-status">07</span>
          <span className="pod-warning-light" />
        </div>
      </div>

      <div className="cryo-depth cryo-glass-plane">
        <span className="condensation condensation-one" />
        <span className="condensation condensation-two" />
        <span className="foreground-rail foreground-rail-left" />
        <span className="foreground-rail foreground-rail-right" />
        <span className="lens-bloom" />
      </div>
    </div>
  );
}
