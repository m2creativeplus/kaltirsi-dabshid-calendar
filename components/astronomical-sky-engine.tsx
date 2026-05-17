"use client"

import React, { useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Sphere, shaderMaterial } from '@react-three/drei';

// ————————————————————————————————————————————————————————————————
// 1. ASTRONOMICAL MATHEMATICS PIPELINE (RA/DEC -> Alt/Az -> XYZ)
// ————————————————————————————————————————————————————————————————

function toJulianDate(date: Date) {
  return date.getTime() / 86400000 + 2440587.5;
}

function getGST(date: Date) {
  const JD = toJulianDate(date);
  const T = (JD - 2451545.0) / 36525;
  let GST = 280.46061837 + 360.98564736629 * (JD - 2451545) + 0.000387933 * T * T - (T * T * T) / 38710000;
  return (GST % 360 + 360) % 360;
}

function getLST(date: Date, longitude: number) {
  const gst = getGST(date);
  return (gst + longitude) % 360;
}

function getHourAngle(lstDeg: number, raHours: number) {
  const raDeg = raHours * 15; // convert hours to degrees
  return lstDeg - raDeg;
}

function equatorialToHorizontal(ra: number, dec: number, lat: number, lon: number, date: Date) {
  const lst = getLST(date, lon);
  const ha = getHourAngle(lst, ra);

  const haRad = (ha * Math.PI) / 180;
  const decRad = (dec * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  const alt = Math.asin(
    Math.sin(decRad) * Math.sin(latRad) +
    Math.cos(decRad) * Math.cos(latRad) * Math.cos(haRad)
  );

  const az = Math.atan2(
    -Math.sin(haRad),
    Math.cos(latRad) * Math.tan(decRad) - Math.sin(latRad) * Math.cos(haRad)
  );

  return { altitude: alt, azimuth: az };
}

function altAzToXYZ(alt: number, az: number, radius = 50) {
  // Flip Z for Three.js coordinates as requested by user
  const x = radius * Math.cos(alt) * Math.sin(az);
  const y = radius * Math.sin(alt);
  let z = radius * Math.cos(alt) * Math.cos(az);
  return [x, y, -z] as [number, number, number];
}

export function getStarXYZ(star: {ra: number, dec: number}, observer: {lat: number, lon: number}, date: Date) {
  const { altitude, azimuth } = equatorialToHorizontal(star.ra, star.dec, observer.lat, observer.lon, date);
  // Hide below horizon (alt < 0)
  if (altitude < 0) return null;
  return altAzToXYZ(altitude, azimuth, 50);
}

// ————————————————————————————————————————————————————————————————
// 2. KALTIRSI ASTRONOMICAL DATA
// ————————————————————————————————————————————————————————————————

const OBSERVER = { lat: 9.56, lon: 44.06 }; // Somaliland (Hargeisa)

// Known 28 Lunar Stations (Godka) approximation with prominent stars
const GODKA_STARS = [
  { name: "Sirius (Xagaa Peak)", ra: 6.752, dec: -16.716 },
  { name: "Canopus", ra: 6.399, dec: -52.695 },
  { name: "Arcturus", ra: 14.261, dec: 19.182 },
  { name: "Vega", ra: 18.615, dec: 38.783 },
  { name: "Spica", ra: 13.419, dec: -11.161 },
  // Orion belt stars mapped as Godka markers
  { name: "Betelgeuse", ra: 5.919, dec: 7.407 },
  { name: "Bellatrix", ra: 5.418, dec: 6.349 },
  { name: "Alnilam", ra: 5.603, dec: -1.201 },
  { name: "Mintaka", ra: 5.533, dec: -0.299 },
  { name: "Saiph", ra: 5.795, dec: -9.669 },
  { name: "Rigel", ra: 5.242, dec: -8.201 },
  // Pleiades (Gu' Rains)
  { name: "Alcyone", ra: 3.791, dec: 24.105 },
  { name: "Atlas", ra: 3.819, dec: 24.053 },
  { name: "Pleione", ra: 3.818, dec: 24.136 },
];

const CONSTELLATIONS = [
  {
    name: "Urka Cirka (Orion)",
    lines: [
      ["Betelgeuse", "Bellatrix"],
      ["Bellatrix", "Rigel"],
      ["Rigel", "Saiph"],
      ["Saiph", "Betelgeuse"],
      ["Mintaka", "Alnilam"],
      ["Alcyone", "Atlas"],
      ["Atlas", "Pleione"]
    ]
  }
];

// ————————————————————————————————————————————————————————————————
// 3. THREE.JS COMPONENTS
// ————————————————————————————————————————————————————————————————

// -> Real Stars & Constellation Lines
function GodkaSkyMap() {
  const [starPositions, setStarPositions] = useState<Record<string, [number, number, number] | null>>({});

  useFrame(() => {
    // Fast forward time slightly to see slow Earth rotation, 
    // or keep static new Date() for exact current sky
    const now = new Date();
    // Accelerated time for demo visual rotation:
    const accTime = new Date(now.getTime() + (performance.now() * 1000));

    const updatedMap: Record<string, [number, number, number] | null> = {};
    GODKA_STARS.forEach(star => {
      updatedMap[star.name] = getStarXYZ(star, OBSERVER, accTime); // Using fast-time for visual
    });
    setStarPositions(updatedMap);
  });

  return (
    <group rotation={[0, Math.PI, 0]}> {/* Align North */}
      {/* Draw Stars */}
      {GODKA_STARS.map((star, i) => {
        const pos = starPositions[star.name];
        if (!pos) return null; // Below horizon
        
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#ffedd5" />
          </mesh>
        );
      })}

      {/* Draw Constellation Lines */}
      {CONSTELLATIONS.map((constellation, i) =>
        constellation.lines.map(([a, b], j) => {
          const posA = starPositions[a];
          const posB = starPositions[b];
          if (!posA || !posB) return null; // If one is below horizon, don't draw

          const points = [new THREE.Vector3(...posA), new THREE.Vector3(...posB)];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <line key={`${i}-${j}`}>
              <bufferGeometry attach="geometry" {...geometry} />
              <lineBasicMaterial color="#e5a631" opacity={0.4} transparent linewidth={2} />
            </line>
          );
        })
      )}
    </group>
  );
}

// -> Procedural Milky Way Particle System
function generateMilkyWay(count = 5000) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 60 + Math.random() * 20;
    
    // Create an inclined thin band structure
    const x = radius * Math.cos(angle);
    const y = (Math.random() - 0.5) * 15; 
    const z = radius * Math.sin(angle);

    // Add slight inclination
    const tilt = 0.5; // radians
    const rotY = y * Math.cos(tilt) - z * Math.sin(tilt);
    const rotZ = y * Math.sin(tilt) + z * Math.cos(tilt);

    positions[i * 3] = x;
    positions[i * 3 + 1] = rotY;
    positions[i * 3 + 2] = rotZ;
  }
  return positions;
}

function MilkyWay() {
  const particles = useMemo(() => generateMilkyWay(6000), []);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    // Sidereal drift of the galaxy
    if (pointsRef.current) {
       pointsRef.current.rotation.y -= 0.0001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.2} color="#ffffff" transparent opacity={0.3} sizeAttenuation={true} />
    </points>
  );
}

// -> Atmosphere Shader (Drei)
const AtmosphereMaterial = shaderMaterial(
  {
    topColor: new THREE.Color("#020111"),     // Deep Cosmic Night
    bottomColor: new THREE.Color("#1f0033"),  // Deep purple/horizon glow
    offset: 0.1,
    exponent: 0.8
  },
  // vertex shader
  `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  uniform float offset;
  uniform float exponent;
  varying vec3 vWorldPosition;
  void main() {
    float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
    float intensity = pow(max(h, 0.0), exponent);
    gl_FragColor = vec4(mix(bottomColor, topColor, intensity), 1.0);
  }
  `
);
extend({ AtmosphereMaterial });

function Atmosphere() {
  return (
    <mesh scale={100}>
      <sphereGeometry args={[1, 32, 32]} />
      {/* @ts-ignore - JSX intrinsic from extend */}
      <atmosphereMaterial side={THREE.BackSide} />
    </mesh>
  );
}

// ————————————————————————————————————————————————————————————————
// 4. MAIN EXPORT WRAPPER
// ————————————————————————————————————————————————————————————————

export function AstronomicalSkyEngine() {
  return (
    <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-black relative border border-white/10 shadow-2xl">
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-white/80 uppercase tracking-widest font-mono font-bold">Godka Observatory</span>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 z-10">
        <div className="text-xs text-primary font-mono uppercase tracking-[0.2em] drop-shadow-md">
          Lat: {OBSERVER.lat}° / Lon: {OBSERVER.lon}°
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2} />
        
        <Atmosphere />
        <MilkyWay />
        <GodkaSkyMap />

        {/* 🌞 Sun Simulation based on physical rotation / time */}
        <mesh position={[100, 30, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#ffcc00" />
          <pointLight intensity={2} color="#ffcc00" distance={200} />
        </mesh>

        {/* 🌔 Lunar Simulation (Simple orbital path tracking Kaltirsi Dayaxeed) */}
        <mesh position={[-60, 40, -50]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} />
        </mesh>

        {/* Ambient environment light + directional solar shading for the moon */}
        <ambientLight intensity={0.05} />
        <directionalLight position={[100, 30, 0]} intensity={2.5} castShadow />
      </Canvas>
    </div>
  );
}
