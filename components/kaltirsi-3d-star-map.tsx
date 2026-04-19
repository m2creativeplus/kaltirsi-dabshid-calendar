"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, OrbitControls, Sphere, Html } from "@react-three/drei"
import * as THREE from "three"
import { GodkaEngine, CANONICAL_GODKA } from "@/lib/godka-engine"

// Utility to evenly distribute 28 points around a sphere's ecliptic path
function getEclipticCoordinates(index: number, total: number, radius: number = 4.5) {
  const phi = (index / total) * Math.PI * 2; // 360 degrees sliced
  const theta = Math.PI / 2; // Keep them largely on the equator/ecliptic
  
  const x = radius * Math.sin(theta) * Math.cos(phi);
  const y = radius * Math.cos(theta) + (Math.sin(phi) * 0.5); // slight wobble
  const z = radius * Math.sin(theta) * Math.sin(phi);

  return [x, y, z] as [number, number, number];
}

function GodkaOrbitalRing() {
  const groupRef = useRef<THREE.Group>(null);
  const currentGodka = GodkaEngine.getCurrentGodka(new Date());

  // Slow celestial rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Earth/Observer Reference */}
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial color="#0A1128" wireframe opacity={0.3} transparent />
      </Sphere>

      {/* The 28 Lunar Stations (Godka) Placed around the Ecliptic */}
      {CANONICAL_GODKA.map((godka, idx) => {
        const position = getEclipticCoordinates(idx, 28);
        const isActive = godka.id === currentGodka.id;
        const color = isActive ? "#10B981" : "#D9A441";

        return (
          <group key={godka.id} position={position}>
            {/* The Star Node */}
            <mesh>
              <sphereGeometry args={[isActive ? 0.12 : 0.05, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>
            {/* Soft Glow */}
            {isActive && (
              <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.4} />
              </mesh>
            )}
            
            {/* Label - visible on active or nearby */}
            {(isActive || idx % 4 === 0) && (
              <Html distanceFactor={15} center>
                <div className={`text-[10px] whitespace-nowrap font-mono tracking-widest px-2 py-1 rounded bg-black/60 backdrop-blur border ${isActive ? 'border-emerald-500/50 text-emerald-400 font-bold scale-110' : 'border-white/10 text-white/60'}`}>
                  {godka.name.toUpperCase()}
                  {isActive && <div className="text-[8px] text-emerald-200/50">{godka.iauStar}</div>}
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Ecliptic Path Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.48, 4.52, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function Kaltirsi3DStarMap() {
  const currentGodka = GodkaEngine.getCurrentGodka(new Date());

  return (
    <div className="w-full relative rounded-2xl border border-white/10 overflow-hidden bg-black h-[400px]">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-xl font-black text-white tracking-widest uppercase">Xiddigeed</h3>
        <p className="text-xs text-white/50 font-mono">LIVE ASTRONOMICAL ENGINE</p>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-right">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
            Synchronized: {currentGodka.name}
          </span>
        </div>
      </div>

      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <GodkaOrbitalRing />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
