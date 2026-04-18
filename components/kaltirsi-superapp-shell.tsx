"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

import { KaltirsiEcologicalDashboard } from "@/components/kaltirsi-ecological-dashboard"
import { KaltirsiTripleCalendar } from "@/components/kaltirsi-triple-calendar"
import { KaltirsiHexTemporalCanvas } from "@/components/kaltirsi-3d-astrolabe"
import { GoorsheegtaTimeline, StaggerReveal } from "@/components/kaltirsi-cinematic-system"
import { GoorsheegtaClock } from "@/components/goorsheegta-clock"
import { KaltirsiGrazingIndex } from "@/components/kaltirsi-grazing-index"
import { SomalilandHolidayTimeline } from "@/components/somaliland-holiday-timeline"
import { InteractiveRegionMap } from "@/components/interactive-region-map"

type AppView = "dashboard" | "calendar" | "sky" | "timeline" | "regions" | "holidays"

const NAV_ITEMS: { id: AppView; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "calendar",  label: "Calendar",  icon: "📅" },
  { id: "timeline",  label: "Timeline",  icon: "⏱" },
  { id: "sky",       label: "Sky",       icon: "🔭" },
  { id: "regions",   label: "Regions",   icon: "🗺" },
  { id: "holidays",  label: "Events",    icon: "⭐" },
]

export function KaltirsiSuperAppShell() {
  const [currentView, setCurrentView] = useState<AppView>("dashboard")

  return (
    <div className="min-h-screen flex flex-col relative z-10 w-full max-w-[1600px] mx-auto">
      
      {/* Top Header & Navigation (Glassmorphic) */}
      <header className="sticky top-0 z-50 px-4 md:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-3xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          
          <div className="flex items-center gap-3 pl-2">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center flex-shrink-0 animate-kaltirsi-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                <span className="text-white text-xs">🔥</span>
             </div>
             <div>
               <h1 className="text-base font-bold leading-none tracking-tight text-foreground">Kaltirsi Dabshid</h1>
               <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">Sovereign Intelligence</p>
             </div>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-xl whitespace-nowrap",
                  currentView === item.id 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground/80 hover:bg-white/5"
                )}
              >
                {currentView === item.id && (
                  <motion.layoutId
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-xs opacity-70">{item.icon}</span>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area with Entry Animations */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
             key={currentView}
             initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
             transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
             className="w-full"
          >
             {currentView === "dashboard" && (
                <div className="max-w-4xl mx-auto">
                   <KaltirsiEcologicalDashboard />
                </div>
             )}

             {currentView === "calendar" && (
               <div className="max-w-5xl mx-auto space-y-8">
                  <StaggerReveal delay={0}>
                    <KaltirsiTripleCalendar />
                  </StaggerReveal>
               </div>
             )}

             {currentView === "timeline" && (
               <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
                  <StaggerReveal delay={0}>
                    <GoorsheegtaTimeline />
                  </StaggerReveal>
                  <StaggerReveal delay={0.1}>
                    <GoorsheegtaClock />
                  </StaggerReveal>
               </div>
             )}

             {currentView === "sky" && (
               <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/5 h-[70vh] min-h-[600px] relative bg-black/40 backdrop-blur-md">
                 <KaltirsiHexTemporalCanvas />
               </div>
             )}

             {currentView === "regions" && (
                <div className="max-w-5xl mx-auto space-y-8">
                  <StaggerReveal delay={0}>
                    <InteractiveRegionMap />
                  </StaggerReveal>
                  <StaggerReveal delay={0.15}>
                    <KaltirsiGrazingIndex />
                  </StaggerReveal>
                </div>
             )}

             {currentView === "holidays" && (
                <div className="max-w-4xl mx-auto">
                   <StaggerReveal delay={0}>
                     <SomalilandHolidayTimeline />
                   </StaggerReveal>
                </div>
             )}
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  )
}
