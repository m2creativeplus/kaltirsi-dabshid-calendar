"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

type RegionId = "highlands" | "plains" | "coast" | "rivers"

interface RegionData {
  id: RegionId
  name: string
  somaliName: string
  color: string
  icon: string
  coordinates: { x: number; y: number }[] // Relative percentages for map pins
  description: string
  grazingImpact: "High" | "Moderate" | "Low"
}

const REGIONS: RegionData[] = [
  {
    id: "highlands",
    name: "Highlands",
    somaliName: "Oogo",
    color: "#22c55e", // emerald-500
    icon: "🏔",
    coordinates: [{ x: 35, y: 40 }, { x: 55, y: 35 }],
    description: "Elevated rocky terrain with stable grazing reserves during dry seasons.",
    grazingImpact: "Moderate",
  },
  {
    id: "plains",
    name: "Plains",
    somaliName: "Bannaan",
    color: "#eab308", // yellow-500
    icon: "🌾",
    coordinates: [{ x: 45, y: 65 }, { x: 65, y: 75 }],
    description: "Vast open pastures, heavily dependent on seasonal rains (Gu' and Dayr).",
    grazingImpact: "High",
  },
  {
    id: "coast",
    name: "Coast",
    somaliName: "Guban",
    color: "#3b82f6", // blue-500
    icon: "🌊",
    coordinates: [{ x: 20, y: 20 }, { x: 80, y: 30 }],
    description: "Hot, dry coastal strips characterized by maritime influence and trade ports.",
    grazingImpact: "Low",
  },
  {
    id: "rivers",
    name: "Rivers",
    somaliName: "Webiyada",
    color: "#06b6d4", // cyan-500
    icon: "〰",
    coordinates: [{ x: 30, y: 85 }],
    description: "Riverine agricultural zones with consistent water access.",
    grazingImpact: "Low",
  },
]

export function InteractiveRegionMap() {
  const [activeRegion, setActiveRegion] = useState<RegionId>("plains")
  
  const currentRegion = REGIONS.find((r) => r.id === activeRegion)!

  return (
    <div className="space-y-6">
      
      {/* Header / Tabs */}
      <div>
         <h2 className="text-xl font-bold font-serif mb-1">Dhulka Soomaalida</h2>
         <p className="text-sm text-muted-foreground mb-4">Interactive Region Map - Tap to explore Kaltirsi by area</p>
         
         <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
           {REGIONS.map((region) => (
             <button
               key={region.id}
               onClick={() => setActiveRegion(region.id)}
               className={cn(
                 "flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium transition-all shadow-sm",
                 activeRegion === region.id 
                    ? "bg-white/10 text-foreground" 
                    : "bg-transparent text-muted-foreground hover:bg-white/5"
               )}
               style={{ 
                  borderColor: activeRegion === region.id ? region.color : "rgba(255,255,255,0.1)" 
               }}
             >
               <span style={{ color: region.color }}>{region.icon}</span>
               {region.name}
             </button>
           ))}
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Map Area */}
        <div className="lg:col-span-2 relative h-[400px] border border-white/5 bg-white/[0.02] rounded-3xl overflow-hidden shadow-inner">
          {/* Subtle Grid Lines Pattern */}
          <div 
             className="absolute inset-0 opacity-20" 
             style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
             }}
          />

          {/* Nodes */}
          {REGIONS.map((region) => 
            region.coordinates.map((coord, idx) => {
              const isActive = activeRegion === region.id;
              
              return (
                <button
                  key={`${region.id}-${idx}`}
                  onClick={() => setActiveRegion(region.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out z-10"
                  style={{
                    left: `${coord.x}%`,
                    top: `${coord.y}%`,
                    zIndex: isActive ? 50 : 10
                  }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      opacity: isActive ? 1 : 0.6
                    }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 bg-background/80 backdrop-blur shadow-xl transition-colors",
                      isActive ? "border-solid" : "border-dashed"
                    )}
                    style={{ borderColor: region.color, color: region.color }}
                  >
                    {region.icon}
                    
                    {/* Ripple Effect for active node */}
                    {isActive && idx === 0 && (
                      <motion.div
                        className="absolute inset-0 rounded-full z-0"
                        style={{ border: `2px solid ${region.color}` }}
                        animate={{
                          scale: [1, 2],
                          opacity: [0.8, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </motion.div>
                </button>
              )
            })
          )}
        </div>

        {/* Info Panel side card */}
        <div className="border border-white/5 bg-white/[0.02] rounded-3xl p-6 flex flex-col justify-center">
            
           <AnimatePresence mode="wait">
             <motion.div
               key={currentRegion.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
               className="text-center"
             >
               <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4 bg-white/5 border border-white/10 shadow-inner">
                  <span style={{ color: currentRegion.color }}>{currentRegion.icon}</span>
               </div>
               
               <h3 className="text-xl font-bold font-serif">{currentRegion.somaliName}</h3>
               <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">{currentRegion.name}</p>
               
               <p className="text-sm text-foreground/80 mb-8 leading-relaxed">
                 {currentRegion.description}
               </p>
               
               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground">
                 <span className="opacity-70">Grazing Sensitvity:</span>
                 <span className="font-bold" style={{ color: currentRegion.color }}>{currentRegion.grazingImpact}</span>
               </div>
             </motion.div>
           </AnimatePresence>
           
        </div>
      </div>
    </div>
  )
}
