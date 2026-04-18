"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { KALTIRSI_MONTHS, getCurrentKaltirsiMonth } from "@/lib/kaltirsi-data"
import { cn } from "@/lib/utils"

// ═══════════════════════════════════════════════════════════════════
// CINEMATIC AMBIENT BACKGROUND SYSTEM
// Season-reactive gradient that breathes and shifts.
// Applies as a full-page background layer behind all content.
// ═══════════════════════════════════════════════════════════════════

type SeasonId = "Xagaa" | "Dayr" | "Jiilaal" | "Gu'"

const SEASON_GRADIENTS: Record<SeasonId, string[]> = {
  "Xagaa": [
    "radial-gradient(ellipse 120% 60% at 50% -10%, #7c2d0e44 0%, #0e111700 70%)",
    "radial-gradient(ellipse 80% 40% at 80% 20%, #d9734122 0%, transparent 60%)",
  ],
  "Dayr": [
    "radial-gradient(ellipse 120% 60% at 50% -10%, #78350f33 0%, #0e111700 70%)",
    "radial-gradient(ellipse 80% 40% at 20% 20%, #b4530022 0%, transparent 60%)",
  ],
  "Jiilaal": [
    "radial-gradient(ellipse 120% 60% at 50% -10%, #1e3a5f22 0%, #0e111700 70%)",
    "radial-gradient(ellipse 80% 40% at 70% 10%, #37415133 0%, transparent 60%)",
  ],
  "Gu'": [
    "radial-gradient(ellipse 120% 60% at 50% -10%, #05966933 0%, #0e111700 70%)",
    "radial-gradient(ellipse 80% 40% at 30% 20%, #1eb53a22 0%, transparent 60%)",
  ],
}

const SEASON_NOISE: Record<SeasonId, string> = {
  "Xagaa":   "hsl(20, 60%, 8%)",   // Warm desert
  "Dayr":    "hsl(30, 40%, 7%)",   // Earthy autumn
  "Jiilaal": "hsl(215, 30%, 6%)",  // Cold blue
  "Gu'":     "hsl(140, 35%, 6%)",  // Spring green-tint
}

function useCurrentSeason(): SeasonId {
  const kDate = useMemo(() => KaltirsiEngine.gregorianToKaltirsi(new Date()), [])
  const month = getCurrentKaltirsiMonth(kDate.month)
  return month.season as SeasonId
}

export function CinematicAmbientBackground() {
  const shouldReduceMotion = useReducedMotion()
  const season = useCurrentSeason()
  const [tick, setTick] = useState(0)

  // Slow breathing tick every 8s
  useEffect(() => {
    if (shouldReduceMotion) return
    const iv = setInterval(() => setTick(t => (t + 1) % 3), 8000)
    return () => clearInterval(iv)
  }, [shouldReduceMotion])

  const gradient = SEASON_GRADIENTS[season]
  const noise = SEASON_NOISE[season]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {/* Base noise floor */}
      <div className="absolute inset-0" style={{ backgroundColor: noise }} />

      {/* Primary seasonal radial */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ background: gradient[0] }}
      />

      {/* Secondary accent radial */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          x: [0, 20, 0],
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{ background: gradient[1] }}
      />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// STAGGER REVEAL WRAPPER — Apple-feel section entry
// ═══════════════════════════════════════════════════════════════════
interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function StaggerReveal({ children, className, delay = 0 }: StaggerRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.4, 0, 0.2, 1], // Apple cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// GOORSHEEGTA TIMELINE — Vertical circular-node timeline
// Shows all 8 daily segments with current one highlighted.
// Pattern taken from reference app's Timeline tab.
// ═══════════════════════════════════════════════════════════════════

interface GoorsheegtaNode {
  id: number
  nameSomali: string
  nameEnglish: string
  timeRange: string
  startHour: number
  endHour: number
  category: "rest" | "activity" | "observation" | "prayer"
  color: string
}

const TIMELINE_NODES: GoorsheegtaNode[] = [
  // Maalin: The 12 Hours of the Sun
  { id: 6,  nameSomali: "Waaberi / Oog",          nameEnglish: "The True Dawn",         timeRange: "06:00–07:00", startHour: 6,  endHour: 7,  category: "prayer",      color: "#f59e0b" },
  { id: 7,  nameSomali: "Aroor / Dheelmado",      nameEnglish: "The Dewy Morning",      timeRange: "07:00–08:00", startHour: 7,  endHour: 8,  category: "activity",    color: "#f97316" },
  { id: 8,  nameSomali: "Barqa-Yar / Jarmaado",   nameEnglish: "Strategic Early Travel",timeRange: "08:00–09:00", startHour: 8,  endHour: 9,  category: "activity",    color: "#ea580c" },
  { id: 9,  nameSomali: "Siraad / Xigsin",        nameEnglish: "Mid-Morning Pause",     timeRange: "09:00–10:00", startHour: 9,  endHour: 10, category: "rest",        color: "#fcd34d" },
  { id: 10, nameSomali: "Barqo",                  nameEnglish: "Core Grazing Hour",     timeRange: "10:00–11:00", startHour: 10, endHour: 11, category: "activity",    color: "#eab308" },
  { id: 11, nameSomali: "Barqo-Dheer",            nameEnglish: "Long Late-Morning",     timeRange: "11:00–12:00", startHour: 11, endHour: 12, category: "activity",    color: "#d97706" },
  { id: 12, nameSomali: "Hadh / Duhur",           nameEnglish: "The Zenith",            timeRange: "12:00–13:00", startHour: 12, endHour: 13, category: "prayer",      color: "#ef4444" },
  { id: 13, nameSomali: "Hadh-Gal / Kulaal",      nameEnglish: "Entering the Shade",    timeRange: "13:00–14:00", startHour: 13, endHour: 14, category: "rest",        color: "#dc2626" },
  { id: 14, nameSomali: "Hadh-ac / Kulleyl",      nameEnglish: "Peak Heat",             timeRange: "14:00–15:00", startHour: 14, endHour: 15, category: "rest",        color: "#b91c1c" },
  { id: 15, nameSomali: "Casar / Kulaal-Jebis",   nameEnglish: "Breaking of the Heat",  timeRange: "15:00–16:00", startHour: 15, endHour: 16, category: "prayer",      color: "#d97706" },
  { id: 16, nameSomali: "Casar-Liiq / Tiraab",    nameEnglish: "Leaning Sun",           timeRange: "16:00–17:00", startHour: 16, endHour: 17, category: "activity",    color: "#f59e0b" },
  { id: 17, nameSomali: "Galab / Carraabo",       nameEnglish: "Coordinated Return",    timeRange: "17:00–18:00", startHour: 17, endHour: 18, category: "activity",    color: "#fcd34d" },

  // Habeen: The 12 Hours of the Night
  { id: 18, nameSomali: "Gabbal-Dhac / Maqrib",   nameEnglish: "Day Dies",              timeRange: "18:00–19:00", startHour: 18, endHour: 19, category: "prayer",      color: "#7c3aed" },
  { id: 19, nameSomali: "Fiid / Xoolo-Xereyn",    nameEnglish: "Twilight & Corralling", timeRange: "19:00–20:00", startHour: 19, endHour: 20, category: "activity",    color: "#5b21b6" },
  { id: 20, nameSomali: "Cisho / Caweys-Hore",    nameEnglish: "Nightfall",             timeRange: "20:00–21:00", startHour: 20, endHour: 21, category: "prayer",      color: "#4c1d95" },
  { id: 21, nameSomali: "Caweys / Sheeko-Xariir", nameEnglish: "The Social Hour",       timeRange: "21:00–22:00", startHour: 21, endHour: 22, category: "activity",    color: "#312e81" },
  { id: 22, nameSomali: "Saq-Hore / Xasillooni",  nameEnglish: "First Deep Night",      timeRange: "22:00–23:00", startHour: 22, endHour: 23, category: "rest",        color: "#1e1b4b" },
  { id: 23, nameSomali: "Hurdada-Hore / Lulmo",   nameEnglish: "Uninterrupted Slumber", timeRange: "23:00–00:00", startHour: 23, endHour: 24, category: "rest",        color: "#0f172a" },
  { id: 0,  nameSomali: "Saqdhexe / Habeen-Badh", nameEnglish: "Exact Midnight",        timeRange: "00:00–01:00", startHour: 0,  endHour: 1,  category: "observation", color: "#020617" },
  { id: 1,  nameSomali: "Mirkac / Guure",         nameEnglish: "Secret Night Travel",   timeRange: "01:00–02:00", startHour: 1,  endHour: 2,  category: "activity",    color: "#1e1b4b" },
  { id: 2,  nameSomali: "Cidladhexe",             nameEnglish: "Desolate Middle",       timeRange: "02:00–03:00", startHour: 2,  endHour: 3,  category: "rest",        color: "#0f172a" },
  { id: 3,  nameSomali: "Saq-Dambe",              nameEnglish: "Star Reading",          timeRange: "03:00–04:00", startHour: 3,  endHour: 4,  category: "observation", color: "#312e81" },
  { id: 4,  nameSomali: "Hiraab",                 nameEnglish: "The False Dawn",        timeRange: "04:00–05:00", startHour: 4,  endHour: 5,  category: "observation", color: "#4338ca" },
  { id: 5,  nameSomali: "Oogta-Hore / Waabariis", nameEnglish: "Break of Day",          timeRange: "05:00–06:00", startHour: 5,  endHour: 6,  category: "observation", color: "#4f46e5" },
]

const CATEGORY_LABELS: Record<GoorsheegtaNode["category"], string> = {
  activity:    "Hawl",
  rest:        "Nasti",
  observation: "Daawasho",
  prayer:      "Salaad",
}

function getCurrentNodeId(): number {
  const h = new Date().getHours()
  for (const n of TIMELINE_NODES) {
    if (h >= n.startHour && h < n.endHour) return n.id
  }
  return 0
}

export function GoorsheegtaTimeline() {
  const [currentId, setCurrentId] = useState(getCurrentNodeId)

  useEffect(() => {
    const iv = setInterval(() => setCurrentId(getCurrentNodeId()), 60000)
    return () => clearInterval(iv)
  }, [])

  const total = TIMELINE_NODES.length
  const completed = TIMELINE_NODES.filter(n => n.id < currentId).length

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <div>
          <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/40 font-mono">Jadwalka Maalinta</div>
          <h3 className="text-sm font-bold text-foreground">Goorsheegta Timeline</h3>
        </div>
        <div className="text-[10px] text-muted-foreground/40 bg-white/5 px-2 py-1 rounded-full font-mono">
          {completed}/{total} completed
        </div>
      </div>

      {/* Category filters */}
      <div className="px-5 pt-3 flex gap-2 flex-wrap">
        {(["activity", "rest", "prayer", "observation"] as const).map((cat) => (
          <div key={cat} className="text-[9px] px-2.5 py-1 rounded-full bg-white/5 text-muted-foreground/50 font-medium border border-white/5">
            {CATEGORY_LABELS[cat]}
          </div>
        ))}
      </div>

      {/* Timeline nodes */}
      <div className="px-5 py-4 space-y-0">
        {TIMELINE_NODES.map((node, i) => {
          const isCurrent = node.id === currentId
          const isPast = node.id < currentId
          const isLast = i === TIMELINE_NODES.length - 1

          return (
            <div key={node.id} className="flex gap-4">
              {/* Node + connector line */}
              <div className="flex flex-col items-center" style={{ minWidth: "24px" }}>
                {/* Circle node */}
                <motion.div
                  animate={isCurrent ? {
                    scale: [1, 1.15, 1],
                    boxShadow: [`0 0 0 0 ${node.color}40`, `0 0 0 8px ${node.color}00`, `0 0 0 0 ${node.color}40`],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1",
                    isCurrent ? "border-primary" : isPast ? "border-white/20" : "border-white/10"
                  )}
                  style={{
                    backgroundColor: isCurrent ? node.color : isPast ? `${node.color}30` : "transparent",
                  }}
                >
                  {isPast && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  )}
                  {isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </motion.div>

                {/* Connector */}
                {!isLast && (
                  <div
                    className={cn("w-px flex-1 my-0.5 min-h-[28px]", isPast ? "bg-white/15" : "bg-white/5")}
                  />
                )}
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className={cn(
                  "pb-4 flex-1",
                  isCurrent ? "opacity-100" : isPast ? "opacity-40" : "opacity-50"
                )}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={cn("text-sm font-bold", isCurrent ? "text-foreground" : "text-muted-foreground")}>
                    {node.nameSomali}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-white/10 text-muted-foreground/40">
                    {CATEGORY_LABELS[node.category]}
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-bold">
                      NOW
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-muted-foreground/40">{node.nameEnglish}</div>
                <div className="text-[9px] font-mono text-muted-foreground/25 mt-0.5">{node.timeRange}</div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
