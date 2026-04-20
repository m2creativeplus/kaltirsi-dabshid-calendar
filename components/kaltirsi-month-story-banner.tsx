"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { getCurrentKaltirsiMonth, KALTIRSI_MONTHS, type HexTemporalMonth } from "@/lib/kaltirsi-data"
import { cn } from "@/lib/utils"
import {
  Flame, CloudSun, Thermometer, CloudDrizzle, Star, Ship,
  Droplets, CloudMoon, Wind, CloudRain, Leaf, Anchor, ChevronLeft, ChevronRight
} from "lucide-react"

const MONTH_ICONS: Record<string, React.ElementType> = {
  flame: Flame, "cloud-sun": CloudSun, thermometer: Thermometer,
  "cloud-drizzle": CloudDrizzle, star: Star, ship: Ship,
  droplets: Droplets, "cloud-moon": CloudMoon, wind: Wind,
  "cloud-rain": CloudRain, leaf: Leaf, anchor: Anchor,
}

// Animated particles that react to season context
function SeasonalParticles({ season }: { season: string }) {
  const particles = useMemo(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
    })), [])

  const particleColor = season === "Xagaa" ? "bg-orange-400/30" :
    season === "Dayr" ? "bg-amber-600/30" :
    season === "Jiilaal" ? "bg-blue-400/20" :
    "bg-emerald-400/30"

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className={cn("absolute rounded-full", particleColor)}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Single Month Story Card — rich data visualization
function MonthStoryCard({ month, isCurrent }: { month: HexTemporalMonth; isCurrent: boolean }) {
  const Icon = (MONTH_ICONS[month.icon] || Star) as any

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative w-full overflow-hidden rounded-3xl border border-white/10"
      style={{ background: month.themeGradient }}
    >
      {/* Atmospheric Particles */}
      <SeasonalParticles season={month.season} />

      <div className="relative z-10 p-8 md:p-10">
        {/* Top Row: Month number + Season Badge */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-mono">
                Bisha {month.id}aad / Month {month.id}
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-none drop-shadow-lg">
                {month.name}
              </h2>
            </div>
          </div>

          {/* Season Pill */}
          <div className="flex flex-col items-end gap-1">
            <span className="px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-bold tracking-wide border border-white/10">
              {month.season} — {month.seasonEnglish}
            </span>
            {isCurrent && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest"
              >
                ● Maanta / Today
              </motion.span>
            )}
          </div>
        </div>

        {/* Meaning & Ecological Intelligence */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* English Meaning */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
              Ecological Intelligence
            </div>
            <p className="text-lg text-white/90 font-medium leading-relaxed">
              {month.ecologicalIndicator}
            </p>
          </div>
          {/* Af-Soomaali Meaning */}
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
              Macnaha Deegaanka (Af-Soomaali)
            </div>
            <p className="text-lg text-white/90 font-medium leading-relaxed italic">
              {month.ecologicalIndicatorSo}
            </p>
          </div>
        </div>

        {/* Data Visualization Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {/* Gregorian Start */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono mb-1">Gregorian Start</div>
            <div className="text-white font-bold text-sm">{month.gregorianStart}</div>
          </div>
          {/* Days */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono mb-1">Maalmaha / Days</div>
            <div className="text-white font-bold text-sm">{month.daysInMonth}</div>
          </div>
          {/* Pastoral Activity */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono mb-1">Pastoral Activity</div>
            <div className="text-white/80 text-xs leading-snug">{month.pastoralActivity.substring(0, 60)}...</div>
          </div>
          {/* Maritime */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono mb-1">Badda / Maritime</div>
            <div className="text-white/80 text-xs leading-snug">{month.maritimeNote.substring(0, 60)}...</div>
          </div>
        </div>

        {/* Proverb — Maahmaah */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="text-[9px] uppercase tracking-wider text-white/40 font-mono mb-2">Maahmaah / Proverb</div>
          <p className="text-white font-serif text-lg italic">"{month.proverb}"</p>
          <p className="text-white/60 text-sm mt-1">— {month.proverbEnglish}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Horizontal Month Navigator — Scrollable timeline
function MonthTimeline({ activeMonth, onSelect }: { activeMonth: number; onSelect: (id: number) => void }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto py-2 px-1 scrollbar-hide">
      {KALTIRSI_MONTHS.map((m) => {
        const isActive = m.id === activeMonth
        return (
          <motion.button
            key={m.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(m.id)}
            className={cn(
              "flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all border",
              isActive
                ? "bg-primary/20 text-primary border-primary/30 shadow-lg shadow-primary/10"
                : "bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10 hover:text-foreground"
            )}
          >
            <div className="text-[9px] uppercase tracking-wider opacity-60">{m.id}</div>
            <div className="font-bold">{m.name}</div>
          </motion.button>
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT: Month Story Banner
// ═══════════════════════════════════════════════════════════════════
export function KaltirsiMonthStoryBanner() {
  const now = new Date()
  const kDate = KaltirsiEngine.gregorianToKaltirsi(now)
  const [activeMonthId, setActiveMonthId] = useState(kDate.month)
  const activeMonth = getCurrentKaltirsiMonth(activeMonthId)

  const goNext = () => setActiveMonthId(prev => (prev % 12) + 1)
  const goPrev = () => setActiveMonthId(prev => prev === 1 ? 12 : prev - 1)

  return (
    <div className="space-y-3">
      {/* Navigation Strip */}
      <div className="flex items-center gap-2">
        <button onClick={goPrev} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <MonthTimeline activeMonth={activeMonthId} onSelect={setActiveMonthId} />
        <button onClick={goNext} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Story Banner */}
      <AnimatePresence mode="wait">
        <MonthStoryCard
          key={activeMonth.id}
          month={activeMonth}
          isCurrent={activeMonth.id === kDate.month}
        />
      </AnimatePresence>
    </div>
  )
}
