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
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

      {/* Monumental Centered Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col items-center justify-center pointer-events-none">
        <motion.div 
          key={`text-${activeMonth.name}`}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 flex flex-col items-center text-center pointer-events-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
             <div className="px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold uppercase tracking-[0.2em] text-primary shadow-lg shadow-black/50">
               Bil {activeMonth.id}
             </div>
             <div className="text-xs uppercase tracking-[0.2em] text-white/90 font-mono drop-shadow-md">
               Xilliga {activeMonth.season} · Season
             </div>
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            aria-expanded={isExpanded}
            aria-controls="lore-details"
            className="group outline-none block focus-visible:ring-4 focus-visible:ring-primary/50 rounded-2xl transition-all"
          >
            <div className="flex flex-col items-center">
              {kYear && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-7xl md:text-9xl font-black font-mono text-primary/90 drop-shadow-[0_0_30px_rgba(229,166,49,0.3)] tracking-tighter mix-blend-plus-lighter -mb-2 md:-mb-6 mt-2"
                >
                  {kYear} K.E.
                </motion.div>
              )}
              <h2 className="text-6xl md:text-[8rem] font-black font-serif text-white tracking-tighter drop-shadow-2xl inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60 group-hover:from-white group-hover:to-primary/80 transition-all duration-500 leading-none">
                {activeMonth.name}
              </h2>
            </div>
            <div className="text-xs text-white/50 uppercase tracking-[0.3em] font-medium mt-6 opacity-0 group-hover:opacity-100 transition-opacity">Click to Reveal Temporal Lore</div>
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id="lore-details"
                initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, height: "auto", filter: "blur(0px)", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, filter: "blur(10px)", marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden w-full max-w-2xl mx-auto"
              >
                <div className="p-6 md:p-8 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 text-left">
                  <div className="flex gap-3 items-center flex-wrap">
                    <span className="text-xs text-white/50 uppercase tracking-widest font-mono">Magacyada Kale:</span>
                    {activeMonth.altNames.length > 0 ? activeMonth.altNames.map((alt, idx) => (
                       <motion.span 
                         key={alt}
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: idx * 0.05 + 0.1 }}
                         className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-primary font-bold shadow-inner"
                       >
                         {alt}
                       </motion.span>
                    )) : (
                       <span className="text-sm text-white/30 italic">Lama hayo</span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-white/50 uppercase tracking-widest font-mono">Dhuuxa Macnaha & Xaaladda:</div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-base md:text-lg font-medium text-white/90 leading-relaxed border-l-2 border-primary/70 pl-4 py-1"
                    >
                      {/* @ts-ignore */}
                      {activeMonth.ecologicalIndicatorSo}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/80 mt-6">
            <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">{activeMonth.nameEnglish}</span>
            <span className="text-sm px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">Risk Index: <span className="font-mono text-primary font-bold ml-1">{activeMonth.grazingIndex}/10</span></span>
            <span className="text-sm text-white/50 hidden md:inline-block">— {activeMonth.ecologicalIndicator}</span>
          </div>
        </motion.div>
      </div>

      {/* Interactive Month Scrubber at absolute bottom */}
      <div className="absolute bottom-6 inset-x-6">
        <div className="w-full flex items-center justify-center gap-1.5 md:gap-2 overflow-x-auto pb-4 pt-2 hide-scrollbar snap-x snap-mandatory">
          {KALTIRSI_MONTHS.map((m, i) => (
            <button
              key={m.name}
              role="tab"
              aria-selected={activeMonthIdx === i}
              aria-controls="month-panel"
              tabIndex={0}
              onClick={() => setActiveMonthIdx(i)}
              className={cn(
                "h-14 md:h-16 flex-1 min-w-[55px] md:min-w-[70px] snap-center rounded-xl border transition-all duration-500 relative flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                activeMonthIdx === i 
                  ? "border-primary bg-primary/10 shadow-[0_4px_30px_rgba(229,166,49,0.3)] backdrop-blur-md" 
                  : "border-white/10 bg-black/60 hover:bg-white/20 backdrop-blur-sm hover:border-white/30"
              )}
            >
              {activeMonthIdx === i && (
                <motion.div layoutId="active-month-tab" className="absolute inset-0 bg-primary/20 border-b-2 border-primary rounded-xl" />
              )}
              <span className={cn(
                "text-[10px] md:text-xs font-bold uppercase z-10 transition-colors pointer-events-none",
                activeMonthIdx === i ? "text-primary tracking-widest drop-shadow-md" : "text-white/60"
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
