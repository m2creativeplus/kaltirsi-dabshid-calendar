"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  KALTIRSI_MONTHS, KALTIRSI_LUNAR_MONTHS, GODKA_GROUPS,
  getCurrentKaltirsiMonth, type HexTemporalMonth
} from "@/lib/kaltirsi-data"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { cn } from "@/lib/utils"
import { Sun, Moon, Star, Flame, ChevronRight, Sparkles, Anchor, Wind } from "lucide-react"

type CalendarLayer = "qorraxeed" | "dayaxeed" | "xiddigeed"

const LAYER_CONFIG = {
  qorraxeed: {
    icon: Sun,
    label: "Kaltirsi Qorraxeed",
    labelEn: "Solar Calendar",
    description: "365-day agricultural cycle — farming, seasons, pastoral life",
    descriptionSo: "Wareegga 365-maalmood — beeraha, xiliyaalka, xoolo-dhaqashada",
    color: "#D9A441",
    gradient: "linear-gradient(135deg, #D9A441 0%, #E85D04 100%)",
  },
  dayaxeed: {
    icon: Moon,
    label: "Kaltirsi Dayaxeed",
    labelEn: "Lunar Calendar",
    description: "354-day cycle — religious festivals, legal contracts, night herding",
    descriptionSo: "Wareegga 354-maalmood — ciidaha diinta, heshiisyada, dhaqasho habeennimo",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A78BFA 100%)",
  },
  xiddigeed: {
    icon: Star,
    label: "Kaltirsi Xiddigeed",
    labelEn: "Stellar Calendar",
    description: "28 Godka lunar stations — navigation, weather prediction, star mapping",
    descriptionSo: "28 Godka xiddigaha — hagida, saadaalinta cimilada, khariidadda xiddigaha",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, #0E7490 0%, #06B6D4 50%, #22D3EE 100%)",
  },
}

// ── SOLAR VIEW ──────────────────────────────────────────────────
function QorraxeedView() {
  const now = new Date()
  const kDate = KaltirsiEngine.gregorianToKaltirsi(now)
  const currentMonth = getCurrentKaltirsiMonth(kDate.month)
  
  const [selectedMonthId, setSelectedMonthId] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {selectedMonthId === null ? (
          <motion.div 
            key="grid-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Current Month Highlight */}
            <div 
              className="rounded-2xl p-5 border border-[#D9A441]/20 cursor-pointer transition-transform hover:scale-[1.01]" 
              style={{ background: currentMonth.themeGradient }}
              onClick={() => setSelectedMonthId(currentMonth.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-white" />
                  <span className="text-white/70 text-xs uppercase tracking-widest font-mono">
                    Bisha Hadda / Current Month
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/50" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-white">{currentMonth.name}</h3>
              <p className="text-white/80 text-sm mt-1">{currentMonth.nameEnglish}</p>
              <p className="text-white/60 text-xs mt-1 italic">{currentMonth.ecologicalIndicatorSo}</p>
            </div>

            {/* Month Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {KALTIRSI_MONTHS.map((m) => {
                const isCurrent = m.id === kDate.month
                return (
                  <motion.div
                    key={m.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedMonthId(m.id)}
                    className={cn(
                      "rounded-xl p-3 border transition-all cursor-pointer relative overflow-hidden",
                      isCurrent
                        ? "bg-primary/15 border-primary/30 shadow-lg"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10"
                    )}
                  >
                    {isCurrent && (
                      <div 
                        className="absolute inset-0 opacity-20 pointer-events-none" 
                        style={{ background: m.themeGradient }} 
                      />
                    )}
                    <div className="flex items-center justify-between mb-1 relative z-10">
                      <span className={cn(
                        "text-[10px] font-mono uppercase tracking-wider",
                        isCurrent ? "text-primary" : "text-muted-foreground/50"
                      )}>
                        {m.id.toString().padStart(2, '0')}
                      </span>
                      <div
                        className="w-2 h-2 rounded-full shadow-sm"
                        style={{ backgroundColor: m.themeColor }}
                      />
                    </div>
                    <div className={cn(
                      "text-sm font-bold relative z-10",
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {m.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground/50 mt-0.5 relative z-10 truncate">
                      {m.exactMeaningSomali}
                    </div>
                    <div className={cn(
                      "text-[9px] mt-2 px-1.5 py-0.5 rounded-md inline-block relative z-10",
                      m.season === "Xagaa" ? "bg-orange-500/10 text-orange-400" :
                      m.season === "Dayr" ? "bg-amber-700/10 text-amber-600" :
                      m.season === "Jiilaal" ? "bg-blue-500/10 text-blue-400" :
                      "bg-emerald-500/10 text-emerald-400"
                    )}>
                      {m.season}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail-view"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {(() => {
              const activeMonth = KALTIRSI_MONTHS.find(m => m.id === selectedMonthId)!
              return (
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/40 backdrop-blur-xl">
                  {/* Detailed Banner */}
                  <div 
                    className="p-6 relative overflow-hidden"
                    style={{ background: activeMonth.themeGradient }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 flex flex-col gap-4">
                      <button 
                        onClick={() => setSelectedMonthId(null)}
                        className="self-start px-3 py-1.5 text-xs rounded-full bg-black/30 hover:bg-black/50 text-white/80 transition-colors flex items-center gap-2"
                      >
                        <ChevronRight className="h-3 w-3 rotate-180" />
                        Dib u noqo
                      </button>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white/60 font-mono text-sm tracking-widest uppercase">
                            Bil {activeMonth.id.toString().padStart(2, '0')} / {activeMonth.season}
                          </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                          {activeMonth.name}
                        </h2>
                        <h3 className="text-xl text-white/90 font-medium">
                          Macnaheedu waa <span className="font-bold text-white">"{activeMonth.exactMeaningSomali}"</span>
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Deep Meaning Content */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#D9A441]">Sharaxaadda Qoto-Dheer</h4>
                      <p className="text-foreground/90 text-sm leading-relaxed border-l-2 border-[#D9A441]/50 pl-4 py-1">
                        {activeMonth.detailedDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase text-muted-foreground tracking-widest">English Context</span>
                        <p className="text-xs text-foreground/80">{activeMonth.nameEnglish}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase text-muted-foreground tracking-widest">Gregorian Start</span>
                        <p className="text-xs text-foreground/80">{activeMonth.gregorianStart} (Approximate)</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase text-muted-foreground tracking-widest">Pastoral Activity</span>
                        <p className="text-xs text-foreground/80">{activeMonth.pastoralActivity}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase text-muted-foreground tracking-widest">Ecological State</span>
                        <p className="text-xs text-foreground/80">{activeMonth.ecologicalIndicator}</p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                      <p className="text-sm font-serif italic text-foreground/90 text-center mb-1">
                        "{activeMonth.proverb}"
                      </p>
                      <p className="text-xs text-muted-foreground text-center">
                        {activeMonth.proverbEnglish}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── LUNAR VIEW ──────────────────────────────────────────────────
function DayaxeedView() {
  const now = new Date()
  let hijriStr = ""
  try {
    hijriStr = KaltirsiEngine.getHijriDate(now)
  } catch { hijriStr = "—" }

  return (
    <div className="space-y-4">
      {/* Current Hijri Date */}
      <div className="rounded-2xl p-5 border border-purple-500/20"
        style={{ background: LAYER_CONFIG.dayaxeed.gradient }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Moon className="h-5 w-5 text-white" />
          <span className="text-white/70 text-xs uppercase tracking-widest font-mono">
            Taariikhda Dayaxeed / Lunar Date
          </span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-white">{hijriStr}</h3>
        <p className="text-white/60 text-xs mt-1">354.37-day cycle — synced to indigenous Somali naming</p>
        <p className="text-white/50 text-xs italic mt-0.5">Wareegga 354.37-maalmood — la xidhiidha magacyada asalka ah ee Soomaalida</p>
      </div>

      {/* Lunar Month Grid */}
      <div className="space-y-1.5">
        {KALTIRSI_LUNAR_MONTHS.map((lm, i) => (
          <motion.div
            key={lm.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 text-xs font-bold">{lm.id}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{lm.nameSomali}</span>
                <span className="text-[10px] text-muted-foreground/50">({lm.nameArabic})</span>
              </div>
              <div className="text-[10px] text-muted-foreground/60">
                {lm.significance}
              </div>
            </div>
            <ChevronRight className="h-3 w-3 text-muted-foreground/30 flex-shrink-0" />
          </motion.div>
        ))}
      </div>

      {/* Note about Afarta bila samman */}
      <div className="rounded-xl bg-purple-500/5 border border-purple-500/10 p-3">
        <p className="text-[10px] text-purple-300/70 uppercase tracking-wider mb-1">Afarta Bila Samman</p>
        <p className="text-xs text-muted-foreground">
          Months 3–6 (Mowliid, Maalmadoone, Rajalo Hore, Rajalo Dhexe) are collectively known as
          the <span className="text-purple-400 font-medium italic">"Afarta bila samman"</span> — the four unnamed months.
        </p>
      </div>
    </div>
  )
}

// ── STELLAR VIEW ────────────────────────────────────────────────
function XiddigeedView() {
  const now = new Date()
  const currentGodka = KaltirsiEngine.getCurrentGodka(now)

  return (
    <div className="space-y-4">
      {/* Current Godka Highlight */}
      <div className="rounded-2xl p-5 border border-cyan-500/20"
        style={{ background: LAYER_CONFIG.xiddigeed.gradient }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-white" />
          <span className="text-white/70 text-xs uppercase tracking-widest font-mono">
            Godka Hadda / Active Lunar Station
          </span>
        </div>
        {currentGodka && (
          <>
            <h3 className="text-2xl font-serif font-bold text-white">{currentGodka.nameSomali}</h3>
            <p className="text-white/80 text-sm mt-1">{currentGodka.mainStar} — {currentGodka.constellation}</p>
            <p className="text-white/60 text-xs mt-1">{currentGodka.weatherPattern}</p>
            <p className="text-white/50 text-xs italic mt-0.5">{currentGodka.agriculturalSignificance}</p>
          </>
        )}
      </div>

      {/* Four Seasonal Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GODKA_GROUPS.map((group, gi) => {
          const seasonColors = [
            "border-orange-500/20 bg-orange-500/5",
            "border-amber-700/20 bg-amber-700/5",
            "border-blue-500/20 bg-blue-500/5",
            "border-emerald-500/20 bg-emerald-500/5",
          ]
          const seasonTextColors = ["text-orange-400", "text-amber-600", "text-blue-400", "text-emerald-400"]

          return (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.1 }}
              className={cn("rounded-xl border p-4", seasonColors[gi])}
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className={cn("h-4 w-4", seasonTextColors[gi])} />
                <h4 className={cn("text-sm font-bold", seasonTextColors[gi])}>{group.nameSomali}</h4>
              </div>
              <p className="text-[10px] text-muted-foreground/50 mb-2">{group.season}</p>
              <div className="flex flex-wrap gap-1">
                {group.stars.map((star) => {
                  const isActive = currentGodka?.nameSomali === star
                  return (
                    <span
                      key={star}
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border",
                        isActive
                          ? "bg-primary/20 border-primary/30 text-primary font-bold"
                          : "bg-white/5 border-white/5 text-muted-foreground/60"
                      )}
                    >
                      {star}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Synchronization Note */}
      <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/10 p-3">
        <p className="text-[10px] text-cyan-300/70 uppercase tracking-wider mb-1">Is-waafajinta / Synchronization</p>
        <p className="text-xs text-muted-foreground">
          The occultation of <span className="text-cyan-400 font-medium">Dirir (Spica)</span> by the moon is the traditional
          mechanism to synchronize the 354-day lunar calendar with the 365-day solar calendar.
        </p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT: Triple Calendar Layer Navigator
// ═══════════════════════════════════════════════════════════════════
export function KaltirsiTripleCalendar() {
  const [activeLayer, setActiveLayer] = useState<CalendarLayer>("qorraxeed")
  const config = LAYER_CONFIG[activeLayer]

  return (
    <div className="space-y-4">
      {/* Layer Tabs */}
      <div className="flex gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/5">
        {(Object.entries(LAYER_CONFIG) as [CalendarLayer, typeof LAYER_CONFIG.qorraxeed][]).map(([key, cfg]) => {
          const Icon = cfg.icon
          const isActive = key === activeLayer
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveLayer(key)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all",
                isActive
                  ? "shadow-lg border"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
              style={isActive ? {
                background: `${cfg.color}15`,
                borderColor: `${cfg.color}30`,
                color: cfg.color,
              } : undefined}
            >
              <Icon className="h-4 w-4" />
              <div className="text-left hidden sm:block">
                <div className="font-bold text-[11px]">{cfg.label}</div>
                <div className="text-[9px] opacity-60">{cfg.labelEn}</div>
              </div>
              <div className="text-left sm:hidden">
                <div className="font-bold">{cfg.label.split(" ")[1]}</div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Layer Description */}
      <div className="flex items-center gap-3 px-1">
        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: config.color }} />
        <div>
          <p className="text-xs text-muted-foreground">{config.description}</p>
          <p className="text-[10px] text-muted-foreground/50 italic">{config.descriptionSo}</p>
        </div>
      </div>

      {/* Active Layer View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeLayer === "qorraxeed" && <QorraxeedView />}
          {activeLayer === "dayaxeed" && <DayaxeedView />}
          {activeLayer === "xiddigeed" && <XiddigeedView />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
