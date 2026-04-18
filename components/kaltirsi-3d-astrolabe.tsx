"use client"

import { useRef, useMemo, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Text, Float, Stars, OrbitControls, Sparkles, ContactShadows, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { KaltirsiEngine, MONTHS_SOLAR, GODKA_28, getSeason } from "@/lib/kaltirsi-engine"

// Golden Material for the Sovereign Astrolabe Rings
const GOLD_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: "#D4AF37", // Kaltirsi Desert Gold
  metalness: 1,
  roughness: 0.15,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
})

// Silver/Obsidian Material for inner gears
const OBSIDIAN_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: "#1a1a24",
  metalness: 0.8,
  roughness: 0.2,
  envMapIntensity: 2,
})

// Seasonal Ring Materials
const SEASON_MATERIALS = {
  Gu: new THREE.MeshPhysicalMaterial({ color: "#10b981", metalness: 0.6, roughness: 0.2, transmission: 0.5, thickness: 1 }), // Green
  Xagaa: new THREE.MeshPhysicalMaterial({ color: "#ea580c", metalness: 0.6, roughness: 0.2, transmission: 0.5, thickness: 1 }), // Orange
  Dayr: new THREE.MeshPhysicalMaterial({ color: "#a16207", metalness: 0.6, roughness: 0.2, transmission: 0.5, thickness: 1 }), // Brown
  Jiilaal: new THREE.MeshPhysicalMaterial({ color: "#1e3a8a", metalness: 0.6, roughness: 0.2, transmission: 0.5, thickness: 1 }), // Blue
}

function InnerLunarGear({ rotation }: { rotation: number }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Slow constant gear rotation combined with the specific lunar rotation target
      meshRef.current.rotation.z += 0.001
    }
  })

  // Create a geared ring
  const gearShape = useMemo(() => {
    const shape = new THREE.Shape()
    const outerRadius = 2.4
    const innerRadius = 2.0
    const teeth = 24
    
    for (let i = 0; i < teeth * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : outerRadius + 0.15
        const angle = (i / (teeth * 2)) * Math.PI * 2
        if (i === 0) shape.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
        else shape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius)
    }
    const holePath = new THREE.Path()
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, false)
    shape.holes.push(holePath)
    return shape
  }, [])

  return (
    <group ref={meshRef} rotation-z={rotation}>
      <mesh material={OBSIDIAN_MATERIAL}>
        <extrudeGeometry args={[gearShape, { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.02, bevelThickness: 0.02, curveSegments: 32 }]} />
      </mesh>
      {/* Decorative center glowing orb */}
      <mesh position={[0, 0, 0.1]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  )
}

function OuterSolarRing({ currentMonthIndex }: { currentMonthIndex: number }) {
  const groupRef = useRef<THREE.Group>(null)

  // Smooth rotation alignment towards current month
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetRotation = -(currentMonthIndex * (Math.PI * 2 / 12))
      // Simple lerp to target
      groupRef.current.rotation.z += (targetRotation - groupRef.current.rotation.z) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* The main golden torus */}
      <mesh material={GOLD_MATERIAL}>
        <torusGeometry args={[3.2, 0.1, 32, 100]} />
      </mesh>
      {/* Month Markers & Labels */}
      {MONTHS_SOLAR.map((month, i) => {
        const angle = i * (Math.PI * 2 / 12)
        const isCurrent = i === currentMonthIndex
        return (
          <group key={month} rotation-z={angle}>
            {/* Tick */}
            <mesh position={[0, 3.2, 0]} rotation-x={Math.PI / 2}>
              <cylinderGeometry args={[0.02, 0.02, 0.3]} />
              <meshStandardMaterial color={isCurrent ? "#FFD700" : "#FFFFFF"} emissive={isCurrent ? "#FFD700" : "#000000"} emissiveIntensity={isCurrent ? 1 : 0} />
            </mesh>
            {/* Label */}
            <Text 
              position={[0, 3.5, 0]} 
              fontSize={0.12} 
              color={isCurrent ? "#D4AF37" : "#888888"} 
              anchorX="center" 
              anchorY="middle"
              rotation-z={-angle} // Counter-rotate so text is readable
            >
              {month}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

function SeasonalInterlockingRings() {
  const ref1 = useRef<THREE.Mesh>(null)
  const ref2 = useRef<THREE.Mesh>(null)
  const ref3 = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ref1.current && ref2.current && ref3.current) {
      ref1.current.rotation.x += 0.002
      ref1.current.rotation.y += 0.001
      
      ref2.current.rotation.x -= 0.001
      ref2.current.rotation.y -= 0.002

      ref3.current.rotation.x += 0.0015
      ref3.current.rotation.z -= 0.001
    }
  })

  // Torus geometry for the intertwined rings (Reference image 4)
  const geom = useMemo(() => new THREE.TorusGeometry(3.6, 0.05, 16, 100), [])

  return (
    <group>
      <mesh ref={ref1} geometry={geom} material={SEASON_MATERIALS.Gu} rotation={[Math.PI / 6, 0, 0]} />
      <mesh ref={ref2} geometry={geom} material={SEASON_MATERIALS.Xagaa} rotation={[-Math.PI / 6, Math.PI / 4, 0]} />
      <mesh ref={ref3} geometry={geom} material={SEASON_MATERIALS.Jiilaal} rotation={[0, -Math.PI / 4, Math.PI / 6]} />
    </group>
  )
}

function GodkaConstellationNetwork({ currentGodkaIndex }: { currentGodkaIndex: number }) {
  // Generates 28 star nodes floating in a sphere
  const nodes = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / 28)
      const theta = Math.sqrt(28 * Math.PI) * phi
      const r = 4.5
      return new THREE.Vector3(r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi))
    })
  }, [])

  return (
    <group>
      {nodes.map((pos, i) => {
        const isCurrent = i === currentGodkaIndex
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[isCurrent ? 0.08 : 0.03, 16, 16]} />
            <meshStandardMaterial 
              color={isCurrent ? "#FFD700" : "#FFFFFF"} 
              emissive={isCurrent ? "#FFD700" : "#444444"} 
              emissiveIntensity={isCurrent ? 2 : 0.5} 
            />
          </mesh>
        )
      })}
      {/* Network Lines */}
      {/* (In a full implementation, we would use Line segments linking the nodes using Line2 from drei) */}
    </group>
  )
}

export function KaltirsiHexTemporalCanvas() {
  const [mounted, setMounted] = useState(false)
  const [kDate, setKDate] = useState<any>(null)
  
  useEffect(() => {
    setMounted(true)
    const now = new Date()
    setKDate(KaltirsiEngine.gregorianToKaltirsi(now))
  }, [])

  if (!mounted || !kDate) return <div className="h-full w-full bg-background rounded-2xl animate-pulse" />

  const godkaIndex = 0 // In real code: GODKA_28.findIndex(g => g.number === currentGodka?.number) || 0

  return (
    <div className="relative w-full h-[600px] bg-transparent rounded-2xl overflow-hidden glass shadow-2xl border border-white/5">
      {/* UI Overlay Context */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary/70 mb-1">Interactive WebGL Beta</div>
        <h2 className="text-2xl font-serif text-white drop-shadow-md">Hex-Temporal Matrix</h2>
        <p className="text-xs text-muted-foreground">3D Sovereign Astrolabe rendering</p>
      </div>

      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} gl={{ antialias: true, toneMappingExposure: 1 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ea580c" />
        
        <Suspense fallback={null}>
          {/* Realistic metallic reflections environment */}
          <Environment preset="city" />
          
          {/* Adds mágico star dust to the background */}
          <Stars radius={10} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.2} color="#D4AF37" />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group rotation={[Math.PI / 12, -Math.PI / 12, 0]}>
              <OuterSolarRing currentMonthIndex={kDate.month - 1} />
              <InnerLunarGear rotation={0} />
              <SeasonalInterlockingRings />
              <GodkaConstellationNetwork currentGodkaIndex={godkaIndex} />
            </group>
          </Float>
        </Suspense>

        <OrbitControls enablePan={false} maxDistance={12} minDistance={4} />
      </Canvas>
    </div>
  )
}
