"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { KALTIRSI_MONTHS } from "@/lib/kaltirsi-data"
import { cn } from "@/lib/utils"

const MONTH_ASSETS: Record<string, string> = {
  "Samalaho": "/assets/months/karan.png", 
  "Karan": "/assets/months/karan.png",
  "Habar-ari": "/assets/months/habarari.png",
  "Diraacgood": "/assets/months/diraacgood.png",
  "Dambasame": "/assets/months/dambasame.png",
  "Xoomir": "/assets/months/xoomir.png",
  "Xays": "/assets/months/xays.png",
  "Toddob": "/assets/months/habarari.png",
  "Adhi-caseeye": "/assets/months/diraacgood.png",
  "Aminla'": "/assets/months/karan.png",
  "Fushade": "/assets/months/xays.png",
  "Cawl": "/assets/months/xoomir.png",
  "Sagaal": "/assets/months/dambasame.png",
}

export function CinematicMonthViewer() {
  const [activeMonthIdx, setActiveMonthIdx] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [kYear, setKYear] = useState<number | null>(null)
  
  // Reset expansion when month changes
  useEffect(() => {
    setIsExpanded(false)
  }, [activeMonthIdx])
  
  useEffect(() => {
    // Sync to current Kaltirsi Month on load
    const kDate = KaltirsiEngine.gregorianToKaltirsi(new Date())
    setActiveMonthIdx(kDate.month - 1)
    setKYear(kDate.year)
  }, [])
  
  const activeMonth = KALTIRSI_MONTHS[activeMonthIdx]
  const imagePath = MONTH_ASSETS[activeMonth.name] || "/assets/months/karan.png"

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden glass border border-white/5 group shadow-2xl">
      {/* Background Image Layer with Crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeMonth.name}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imagePath})` }}
        />
      </AnimatePresence>

      {/* Gradient Overlay for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

      {/* Content Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col justify-end">
        <motion.div 
          key={`text-${activeMonth.name}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
               Bil {activeMonth.id}
             </div>
             <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-mono">
               Xilliga {activeMonth.season} · Season
             </div>
          </div>
          
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-left group outline-none block">
            <div className="flex flex-col">
              {kYear && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-7xl md:text-9xl font-black font-mono text-primary/80 drop-shadow-2xl tracking-tighter mix-blend-plus-lighter -mb-4 mt-2"
                >
                  {kYear} K.E.
                </motion.div>
              )}
              <h2 className="text-6xl md:text-8xl font-black font-serif text-white tracking-tight drop-shadow-2xl inline-block bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60 group-hover:from-primary group-hover:to-primary/60 transition-all duration-300">
                {activeMonth.name}
              </h2>
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to Reveal Deep Lore</div>
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl space-y-4">
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Magacyada Kale:</span>
                    {activeMonth.altNames.length > 0 ? activeMonth.altNames.map((alt, idx) => (
                       <motion.span 
                         key={alt}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: idx * 0.1 + 0.2 }}
                         className="px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-mono text-primary font-bold shadow-inner drop-shadow-md"
                       >
                         {alt}
                       </motion.span>
                    )) : (
                       <span className="text-xs text-white/30 italic">Lama hayo</span>
                    )}
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Dhuuxa Macnaha & Xaaladda:</div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm font-medium text-white/90 leading-relaxed border-l-2 border-primary/70 pl-4 py-1"
                    >
                      {/* @ts-ignore */}
                      {activeMonth.ecologicalIndicatorSo}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex flex-wrap items-center gap-4 text-white/80 mt-4">
            <span className="text-sm border-l-2 border-primary pl-3">{activeMonth.nameEnglish}</span>
            <span className="text-sm">Risk Index: <span className="font-mono text-primary font-bold">{activeMonth.grazingIndex}/10</span></span>
            <span className="text-sm text-white/50 hidden md:inline-block">— {activeMonth.ecologicalIndicator}</span>
          </div>
        </motion.div>

        {/* Interactive Month Scrubber */}
        <div className="mt-10 flex items-center gap-1 overflow-x-auto pb-2 hide-scrollbar">
          {KALTIRSI_MONTHS.map((m, i) => (
            <button
              key={m.name}
              onClick={() => setActiveMonthIdx(i)}
              className={cn(
                "h-14 flex-1 min-w-[50px] rounded-lg border transition-all duration-500 relative flex items-center justify-center",
                activeMonthIdx === i 
                  ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(229,166,49,0.3)]" 
                  : "border-white/5 bg-black/40 hover:bg-white/10"
              )}
            >
              {activeMonthIdx === i && (
                <motion.div layoutId="active-month-tab" className="absolute inset-0 bg-primary/20 border-b-2 border-primary" />
              )}
              <span className={cn(
                "text-[9px] font-bold uppercase z-10 transition-colors",
                activeMonthIdx === i ? "text-primary tracking-widest drop-shadow-md" : "text-white/40"
              )}>
                {m.name.substring(0,3)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
