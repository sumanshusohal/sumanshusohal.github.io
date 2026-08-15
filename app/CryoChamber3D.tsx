"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type CryoChamber3DProps = {
  purging: boolean;
};

type MotionProps = {
  reducedMotion: boolean;
};

function seededValue(index: number, salt: number) {
  const value = Math.sin(index * 91.731 + salt * 17.113) * 43758.5453;
  return value - Math.floor(value);
}

function CameraRig({ reducedMotion }: MotionProps) {
  const { camera, pointer } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3(0.65, -0.05, -1.3));

  useFrame((_state, delta) => {
    const heroProgress = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hero-progress"),
    ) || 0;
    const pointerScale = reducedMotion ? 0 : 1;
    targetPosition.current.set(
      pointer.x * 0.24 * pointerScale + heroProgress * 0.34,
      0.08 + pointer.y * 0.16 * pointerScale - heroProgress * 0.18,
      7.8 - heroProgress * 1.55,
    );
    const easing = 1 - Math.exp(-delta * 2.25);
    camera.position.lerp(targetPosition.current, easing);
    lookTarget.current.set(0.65 + heroProgress * 0.14, -0.05 - heroProgress * 0.08, -1.3);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function VaultStructure({ reducedMotion }: MotionProps) {
  const group = useRef<THREE.Group>(null);
  const ribs = useMemo(() => Array.from({ length: 11 }, (_, index) => 2.6 - index * 0.72), []);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.018;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.11) * 0.0025;
  });

  return (
    <group ref={group}>
      {ribs.map((z, index) => (
        <group key={z} position={[0.55, 0, z]}>
          <mesh position={[0, 2.25, 0]}>
            <boxGeometry args={[6.65, 0.13, 0.2]} />
            <meshStandardMaterial
              color={index % 2 ? "#121a1d" : "#182225"}
              emissive="#17343b"
              emissiveIntensity={0.13}
              metalness={0.92}
              roughness={0.34}
            />
          </mesh>
          <mesh position={[-3.25, 0, 0]} rotation={[0, 0, -0.045]}>
            <boxGeometry args={[0.15, 4.45, 0.22]} />
            <meshStandardMaterial color="#101719" metalness={0.94} roughness={0.31} />
          </mesh>
          <mesh position={[3.25, 0, 0]} rotation={[0, 0, 0.045]}>
            <boxGeometry args={[0.15, 4.45, 0.22]} />
            <meshStandardMaterial color="#101719" metalness={0.94} roughness={0.31} />
          </mesh>
          <mesh position={[0, -2.2, 0]}>
            <boxGeometry args={[6.6, 0.11, 0.2]} />
            <meshStandardMaterial color="#0b1113" metalness={0.9} roughness={0.38} />
          </mesh>
          {index % 2 === 0 && (
            <>
              <mesh position={[-2.35, 2.15, 0.13]}>
                <boxGeometry args={[0.72, 0.025, 0.04]} />
                <meshBasicMaterial color="#8fcbd3" transparent opacity={0.36 - index * 0.012} toneMapped={false} />
              </mesh>
              <mesh position={[2.35, 2.15, 0.13]}>
                <boxGeometry args={[0.72, 0.025, 0.04]} />
                <meshBasicMaterial color="#8fcbd3" transparent opacity={0.36 - index * 0.012} toneMapped={false} />
              </mesh>
            </>
          )}
        </group>
      ))}

      <mesh position={[0.55, -2.18, -1.7]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6.6, 11, 14, 20]} />
        <meshStandardMaterial color="#070c0e" metalness={0.72} roughness={0.48} />
      </mesh>
      <mesh position={[0.55, 0, -5.35]}>
        <planeGeometry args={[7, 4.7]} />
        <meshStandardMaterial color="#030607" metalness={0.55} roughness={0.72} />
      </mesh>
      {[-2.1, 3.2].map((x) => (
        <mesh key={x} position={[x, -2.08, -1.2]}>
          <boxGeometry args={[0.055, 0.055, 9.2]} />
          <meshBasicMaterial color="#5a929b" transparent opacity={0.28} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function DriftingIce({ reducedMotion }: MotionProps) {
  const points = useRef<THREE.Points>(null);
  const count = 360;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (seededValue(index, 1) - 0.5) * 7.2 + 0.45;
      values[index * 3 + 1] = (seededValue(index, 2) - 0.5) * 4.8;
      values[index * 3 + 2] = seededValue(index, 3) * 8 - 5;
    }
    return values;
  }, []);

  useFrame((_state, delta) => {
    if (!points.current || reducedMotion) return;
    const attribute = points.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let index = 0; index < count; index += 1) {
      const yIndex = index * 3 + 1;
      const xIndex = index * 3;
      attribute.array[yIndex] -= delta * (0.035 + seededValue(index, 4) * 0.08);
      attribute.array[xIndex] += Math.sin(index * 0.71) * delta * 0.003;
      if (attribute.array[yIndex] < -2.4) attribute.array[yIndex] = 2.4;
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#c7e6ea"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.54}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CoolantParticles({ reducedMotion }: MotionProps) {
  const points = useRef<THREE.Points>(null);
  const count = 74;
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (seededValue(index, 11) - 0.5) * 0.9;
      values[index * 3 + 1] = (seededValue(index, 12) - 0.5) * 2.45;
      values[index * 3 + 2] = (seededValue(index, 13) - 0.5) * 0.64;
    }
    return values;
  }, []);

  useFrame((_state, delta) => {
    if (!points.current || reducedMotion) return;
    const attribute = points.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let index = 0; index < count; index += 1) {
      const yIndex = index * 3 + 1;
      attribute.array[yIndex] += delta * (0.07 + seededValue(index, 14) * 0.13);
      if (attribute.array[yIndex] > 1.28) attribute.array[yIndex] = -1.28;
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={points} position={[0, 0, 0.03]} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#b9e4e9" size={0.025} transparent opacity={0.68} depthWrite={false} />
    </points>
  );
}

function ScannerBeam({ purging, reducedMotion }: MotionProps & { purging: boolean }) {
  const beam = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!beam.current || !material.current) return;
    const time = state.clock.elapsedTime;
    beam.current.position.y = reducedMotion ? 0.3 : Math.sin(time * 0.62) * 1.55;
    material.current.opacity = reducedMotion ? 0.11 : 0.11 + Math.sin(time * 1.24) * 0.045;
  });

  return (
    <mesh ref={beam} position={[0.82, 0.3, 0.45]}>
      <boxGeometry args={[4.85, 0.028, 0.025]} />
      <meshBasicMaterial
        ref={material}
        color={purging ? "#ff655d" : "#99dce5"}
        transparent
        opacity={0.14}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function AnimatedFog({ reducedMotion }: MotionProps) {
  const materialOne = useRef<THREE.ShaderMaterial>(null);
  const materialTwo = useRef<THREE.ShaderMaterial>(null);
  const uniformsOne = useMemo(() => ({ uTime: { value: 0 }, uOpacity: { value: 0.31 } }), []);
  const uniformsTwo = useMemo(() => ({ uTime: { value: 4.7 }, uOpacity: { value: 0.2 } }), []);
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const fragmentShader = `
    uniform float uTime;
    uniform float uOpacity;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
    }
    float fbm(vec2 p) {
      float value = 0.0;
      value += noise(p) * 0.5;
      p = p * 2.03 + 13.7;
      value += noise(p) * 0.28;
      p = p * 2.01 + 7.1;
      value += noise(p) * 0.14;
      return value;
    }
    void main() {
      vec2 uv = vUv;
      vec2 flow = vec2(uv.x * 2.1 + uTime * 0.025, uv.y * 3.2 - uTime * 0.015);
      float cloud = smoothstep(0.29, 0.82, fbm(flow));
      float edge = smoothstep(0.0, 0.24, uv.y) * (1.0 - smoothstep(0.7, 1.0, uv.y));
      vec3 color = mix(vec3(0.10, 0.17, 0.19), vec3(0.42, 0.66, 0.70), cloud);
      gl_FragColor = vec4(color, cloud * edge * uOpacity);
    }
  `;

  useFrame((_state, delta) => {
    if (reducedMotion) return;
    if (materialOne.current) materialOne.current.uniforms.uTime.value += delta;
    if (materialTwo.current) materialTwo.current.uniforms.uTime.value += delta * 0.66;
  });

  return (
    <>
      <mesh position={[0.55, -1.35, -0.2]} rotation={[-0.12, 0, 0]} renderOrder={7}>
        <planeGeometry args={[7.4, 2.4]} />
        <shaderMaterial ref={materialOne} uniforms={uniformsOne} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.2, -1.5, 1.65]} rotation={[-0.18, 0.05, 0]} renderOrder={8}>
        <planeGeometry args={[8.2, 2.1]} />
        <shaderMaterial ref={materialTwo} uniforms={uniformsTwo} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

function CryoPod({ purging, reducedMotion }: MotionProps & { purging: boolean }) {
  const group = useRef<THREE.Group>(null);
  const warningLight = useRef<THREE.PointLight>(null);
  const glassColor = purging ? "#ba7772" : "#75b0ba";

  useFrame((state) => {
    if (group.current && !reducedMotion) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.82) * 0.035 - 0.05;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.19) * 0.018;
    }
    if (warningLight.current) {
      const pulse = 0.5 + Math.sin(state.clock.elapsedTime * (purging ? 7.2 : 1.7)) * 0.5;
      warningLight.current.intensity = purging ? 3.2 + pulse * 2.8 : 0.16 + pulse * 0.16;
    }
  });

  return (
    <group ref={group} position={[0.95, -0.05, -0.75]}>
      <mesh position={[0, -1.83, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.05, 0.34, 1.48]} />
        <meshStandardMaterial color="#101719" metalness={0.94} roughness={0.29} />
      </mesh>
      <mesh position={[0, 1.82, 0]} castShadow>
        <cylinderGeometry args={[0.78, 1.02, 0.34, 20]} />
        <meshStandardMaterial color="#151f22" metalness={0.94} roughness={0.27} />
      </mesh>
      <mesh position={[-0.92, 0, 0.03]} castShadow>
        <boxGeometry args={[0.13, 3.45, 0.34]} />
        <meshStandardMaterial color="#172124" metalness={0.96} roughness={0.25} />
      </mesh>
      <mesh position={[0.92, 0, 0.03]} castShadow>
        <boxGeometry args={[0.13, 3.45, 0.34]} />
        <meshStandardMaterial color="#172124" metalness={0.96} roughness={0.25} />
      </mesh>

      <RoundedBox args={[1.68, 3.25, 1.18]} radius={0.68} smoothness={6} renderOrder={5}>
        <meshPhysicalMaterial
          color={glassColor}
          emissive={purging ? "#4d1715" : "#17363c"}
          emissiveIntensity={purging ? 0.42 : 0.18}
          transmission={0.72}
          thickness={1.15}
          ior={1.32}
          roughness={0.16}
          metalness={0.02}
          transparent
          opacity={0.63}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      <RoundedBox args={[1.37, 2.88, 0.83]} radius={0.55} smoothness={5} position={[0, 0, -0.06]}>
        <meshStandardMaterial color="#173137" emissive="#254e56" emissiveIntensity={purging ? 0.28 : 0.38} transparent opacity={0.26} roughness={0.38} />
      </RoundedBox>

      <group position={[0, -0.15, 0.02]}>
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.27, 24, 18]} />
          <meshStandardMaterial color="#263235" roughness={0.88} transparent opacity={0.76} />
        </mesh>
        <RoundedBox args={[0.63, 1.65, 0.39]} radius={0.28} smoothness={4} position={[0, -0.38, 0]}>
          <meshStandardMaterial color="#1b272a" roughness={0.9} transparent opacity={0.76} />
        </RoundedBox>
      </group>

      <CoolantParticles reducedMotion={reducedMotion} />
      <Sparkles count={46} scale={[1.15, 2.8, 0.75]} size={1.25} speed={reducedMotion ? 0 : 0.16} opacity={0.42} color="#d4f0f2" noise={0.6} />

      <mesh position={[0.67, -1.72, 0.76]}>
        <sphereGeometry args={[0.045, 12, 10]} />
        <meshBasicMaterial color={purging ? "#ff5a52" : "#bd514b"} toneMapped={false} />
      </mesh>
      <pointLight ref={warningLight} position={[0.67, -1.68, 0.86]} color="#ff554c" intensity={0.25} distance={2.8} decay={2} />

      {[-0.48, -0.16, 0.16, 0.48].map((x, index) => (
        <mesh key={x} position={[x, -1.83, 0.76]}>
          <boxGeometry args={[0.18, 0.035, 0.025]} />
          <meshBasicMaterial color={index === 3 && purging ? "#ff625a" : "#6da1a9"} transparent opacity={0.72} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function ForegroundFrame({ reducedMotion }: MotionProps) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_state, delta) => {
    if (!group.current || reducedMotion) return;
    const targetX = pointer.x * 0.12;
    const targetY = pointer.y * 0.07;
    const easing = 1 - Math.exp(-delta * 2.1);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, easing);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, easing);
  });

  return (
    <group ref={group} position={[0, 0, 3.25]}>
      <mesh position={[-3.1, 0, 0]} rotation={[0, 0, -0.07]}>
        <boxGeometry args={[0.24, 5.25, 0.34]} />
        <meshStandardMaterial color="#080d0f" metalness={0.96} roughness={0.26} />
      </mesh>
      <mesh position={[3.5, 0, 0]} rotation={[0, 0, 0.07]}>
        <boxGeometry args={[0.24, 5.25, 0.34]} />
        <meshStandardMaterial color="#080d0f" metalness={0.96} roughness={0.26} />
      </mesh>
    </group>
  );
}

function SceneLighting({ purging }: { purging: boolean }) {
  const coldLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!coldLight.current) return;
    coldLight.current.intensity = 2.4 + Math.sin(state.clock.elapsedTime * 0.74) * 0.35;
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#8fb6bd" />
      <hemisphereLight args={["#88b5bd", "#020405", 0.42]} />
      <directionalLight position={[-2.5, 4.2, 4.4]} intensity={1.9} color="#d8f2f3" castShadow />
      <pointLight ref={coldLight} position={[0.8, 1.45, 1.7]} color={purging ? "#f08076" : "#9edce4"} intensity={2.4} distance={7} decay={2} />
      <pointLight position={[-2.5, -1.2, -1]} color="#467982" intensity={1.4} distance={5} decay={2} />
      <spotLight position={[3.8, 3.3, 3.2]} color="#aacfd4" intensity={2.2} angle={0.48} penumbra={0.8} distance={12} />
    </>
  );
}

function CryoScene({ purging, reducedMotion }: MotionProps & { purging: boolean }) {
  return (
    <>
      <color attach="background" args={["#010304"]} />
      <fogExp2 attach="fog" args={["#061013", 0.105]} />
      <CameraRig reducedMotion={reducedMotion} />
      <SceneLighting purging={purging} />
      <VaultStructure reducedMotion={reducedMotion} />
      <CryoPod purging={purging} reducedMotion={reducedMotion} />
      <DriftingIce reducedMotion={reducedMotion} />
      <AnimatedFog reducedMotion={reducedMotion} />
      <ScannerBeam purging={purging} reducedMotion={reducedMotion} />
      <ForegroundFrame reducedMotion={reducedMotion} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.82} luminanceThreshold={0.34} luminanceSmoothing={0.42} mipmapBlur />
        <Noise opacity={0.018} />
        <Vignette offset={0.15} darkness={0.88} eskil={false} />
      </EffectComposer>
    </>
  );
}

export function CryoChamber3D({ purging }: CryoChamber3DProps) {
  const [webglReady, setWebglReady] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);

    const frame = window.requestAnimationFrame(() => {
      update();
      const testCanvas = document.createElement("canvas");
      const available = Boolean(testCanvas.getContext("webgl2") || testCanvas.getContext("webgl"));
      setWebglAvailable(available);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", update);
    };
  }, []);

  if (!webglAvailable) return null;

  return (
    <div className={`cryo-webgl-shell ${webglReady ? "is-webgl-ready" : ""}`}>
      <Canvas
        className="cryo-webgl-canvas"
        camera={{ position: [0, 0.08, 7.8], fov: 42, near: 0.1, far: 40 }}
        dpr={[1, 1.55]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        shadows
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.92;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.domElement.addEventListener("webglcontextlost", () => setWebglReady(false), { once: true });
          setWebglReady(true);
        }}
      >
        <Suspense fallback={null}>
          <CryoScene purging={purging} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
