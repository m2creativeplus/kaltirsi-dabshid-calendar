"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { KaltirsiEngine, GODKA_28, getSeason } from "@/lib/kaltirsi-engine"
import { KALTIRSI_MONTHS } from "@/lib/kaltirsi-data"
import { cn } from "@/lib/utils"

export function KaltirsiCelestialDial() {
  const [now, setNow] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return <div className="h-96 w-full flex-center animate-pulse" />

  const kDate = KaltirsiEngine.gregorianToKaltirsi(now)
  const currentGodka = KaltirsiEngine.getCurrentGodka(now)
  const activeSeason = KaltirsiEngine.getSeasonFromKDate(kDate)

  // Calculate rotation for outer month ring (12 months = 30deg each)
  // Samalaho is at top (0deg). Month 1 = 0deg, Month 2 = -30deg, etc.
  const monthRotation = -(kDate.month - 1) * 30

  // Calculate rotation for godka ring (28 goddad = 12.85deg each)
  const godkaIndex = GODKA_28.findIndex((g) => g.number === currentGodka?.number)
  const godkaRotation = -(godkaIndex >= 0 ? godkaIndex : 0) * (360 / 28)

  return (
    <div className="relative w-full max-w-[600px] aspect-square mx-auto flex items-center justify-center p-8 overflow-hidden rounded-full">
      {/* Dynamic Ambient Glow behind the dial */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-[100px] opacity-20 pointer-events-none"
        animate={{ 
          background: activeSeason.name === "Xagaa" ? "radial-gradient(circle, rgba(234,88,12,0.8) 0%, transparent 70%)" :
                      activeSeason.name === "Dayr" ? "radial-gradient(circle, rgba(161,98,7,0.8) 0%, transparent 70%)" :
                      activeSeason.name === "Jiilaal" ? "radial-gradient(circle, rgba(30,58,138,0.8) 0%, transparent 70%)" :
                      "radial-gradient(circle, rgba(16,185,129,0.8) 0%, transparent 70%)"
        }}
        transition={{ duration: 2 }}
      />

      {/* Decorative Outer Bezel */}
      <div className="absolute inset-2 rounded-full border border-white/5 bg-background/40 backdrop-blur-3xl shadow-2xl glass-border" />

      {/* OUTER RING: 12 Months */}
      <motion.div
        className="absolute inset-8 rounded-full border border-white/10"
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: monthRotation, opacity: 1 }}
        transition={{ type: "spring", stiffness: 40, damping: 20, delay: 0.1 }}
      >
        {KALTIRSI_MONTHS.map((monthData, i) => {
          const month = monthData.name
          const rotation = i * 30
          const season = activeSeason
          const isCurrent = (i + 1) === kDate.month

          return (
            <div
              key={month}
              className="absolute top-0 left-1/2 -ml-[1px] h-full w-[2px] origin-center"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Tick */}
              <div className={cn(
                "h-4 w-full rounded-full transition-colors",
                isCurrent ? "bg-primary shadow-[0_0_10px_rgba(229,166,49,0.8)]" : "bg-white/20"
              )} />
              
              {/* Month Label */}
              <div 
                className={cn(
                  "absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-sm transition-all",
                  isCurrent ? "text-primary font-bold scale-110 drop-shadow-md" : "text-muted-foreground/60 scale-90 opacity-40 hover:opacity-100"
                )}
                // Counter-rotate the label so it stays readable when the whole ring rotates
                style={{ transform: `translateX(-50%) rotate(${-rotation}deg)` }}
              >
                {month}
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* MIDDLE RING: 28 Goddad (Star Constellations) */}
      <motion.div
        className="absolute inset-[110px] rounded-full border border-white/5 mix-blend-screen"
        initial={{ rotate: 90, opacity: 0 }}
        animate={{ rotate: godkaRotation, opacity: 1 }}
        transition={{ type: "spring", stiffness: 30, damping: 25, delay: 0.3 }}
      >
        {GODKA_28.map((godka, i) => {
          const rotation = i * (360 / 28)
          const isCurrent = godka.number === currentGodka?.number

          return (
            <div
              key={godka.nameSomali}
              className="absolute top-0 left-1/2 -ml-[0.5px] h-full w-[1px] origin-center"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {/* Tick */}
              <div className={cn(
                "h-2 w-full rounded-full",
                isCurrent ? "bg-amber-300" : "bg-white/10"
              )} />
              
              {/* Godka Label */}
              <div 
                className={cn(
                  "absolute top-3 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest font-mono transition-all opacity-30",
                  isCurrent ? "text-amber-200 opacity-100 font-bold drop-shadow-[0_0_5px_rgba(253,230,138,0.8)]" : ""
                )}
                style={{ transform: `translateX(-50%) rotate(${-rotation}deg)` }}
              >
                {godka.nameSomali}
              </div>
              
              {/* Star Indicator Dot */}
              {isCurrent && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.4)] animate-kaltirsi-pulse" />
              )}
            </div>
          )
        })}
      </motion.div>

      {/* INNER HUB: Crosshairs & Current Fix */}
      <div className="absolute inset-[180px] rounded-full border-2 border-primary/20 backdrop-blur-md bg-black/40 flex flex-col items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-10 pointer-events-none overflow-hidden">
        
        {/* Pastoral Watermark Motif (Somali Blackhead Sheep) */}
        <motion.div 
          className="absolute inset-0 opacity-10 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2 }}
        >
          <img src="/somali-sheep.svg" alt="Somali Pastoral Motif" className="w-[80%] h-[80%] object-contain" />
        </motion.div>

        {/* Core Date Focus */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center relative z-20"
        >
          <div className="text-[10px] text-primary/70 uppercase tracking-[0.3em] mb-1 font-mono">{activeSeason.name}</div>
          <div className="text-6xl font-serif text-white font-bold leading-none drop-shadow-lg">{kDate.day}</div>
          <div className="text-xl font-serif text-primary mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{kDate.monthName}</div>
          <div className="text-xs text-muted-foreground/80 mt-2 font-mono tracking-widest">{kDate.year} K.E.</div>
        </motion.div>

        {/* Center Plumb Line */}
        <div className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-[20px] bg-gradient-to-b from-primary to-transparent z-20" />
      </div>

    </div>
  )
}
