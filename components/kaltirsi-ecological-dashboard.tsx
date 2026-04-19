"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import {
  KALTIRSI_MONTHS, KALTIRSI_WEEKDAYS, SOMALILAND_HOLIDAYS,
  getCurrentKaltirsiMonth, getUpcomingHolidays, GODKA_GROUPS
} from "@/lib/kaltirsi-data"
import { cn } from "@/lib/utils"
import {
  Sun, Moon, Star, Anchor, Leaf, Flame, Droplets, Wind,
  ChevronRight, Calendar, Clock, TrendingUp, AlertTriangle, CloudRain, ThermometerSun, Radio, Activity
} from "lucide-react"
import { useTelemetry, TelemetryEngine } from "@/lib/telemetry-engine"
import { GodkaEngine } from "@/lib/godka-engine"
import { Kaltirsi3DStarMap } from "@/components/kaltirsi-3d-star-map"

// ── HOOK: FETCH INTEL SYNC ─────────────────────────────────────────
function useIntelSync() {
  const [intel, setIntel] = useState<any>(null)
  useEffect(() => {
    fetch('/api/intel-sync').then(r => r.json()).then(data => {
      if (data && data.data) setIntel(data.data)
    }).catch(console.error)
  }, [])
  return intel
}

// ── COMPONENT: LIVE GRAZING INDEX LAYER ────────────────────────────
function LiveGrazingIndexLayer() {
  const intel = useIntelSync()
  if (!intel) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {intel.map((node: any) => (
        <div key={node.region} className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase tracking-widest text-white/50">{node.region}</span>
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-white font-mono mb-1">
            {node.intelligence.grazing_index_score.toFixed(1)} GI
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "text-[9px] font-bold px-2 py-1 rounded w-full text-center tracking-wider",
              node.intelligence.pastoral_decision === "GRAZE" ? "bg-emerald-500/20 text-emerald-400" :
                node.intelligence.pastoral_decision === "MOVE" ? "bg-red-500/20 text-red-400" :
                  "bg-orange-500/20 text-orange-400"
            )}>
              ACTION: {node.intelligence.pastoral_decision}
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center text-[10px] text-white/40 border-t border-white/5 pt-2">
            <span>{node.telemetry.precipitation_mm}mm Rain</span>
            <span>{node.telemetry.temp_celsius}°C</span>
          </div>
        </div>
      ))}
    </div>
  )
}


// ── LIVE CLOCK BAR ─────────────────────────────────────────────────
function LiveChronometer() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(iv)
  }, [])

  const kDate = useMemo(() => KaltirsiEngine.gregorianToKaltirsi(now), [now])
  const somaliTime = useMemo(() => KaltirsiEngine.getSomaliTime(now), [now])
  const weekday = KALTIRSI_WEEKDAYS[now.getDay() === 0 ? 1 : now.getDay() === 6 ? 0 : now.getDay() + 1] || KALTIRSI_WEEKDAYS[0]
  const month = getCurrentKaltirsiMonth(kDate.month)

  // Real-time environmental engine
  const { data: telemetry, isLoading: telLoading } = useTelemetry("Oogo")
  const weatherState = TelemetryEngine.getWeatherState(telemetry.current.weatherCode)

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/8 overflow-hidden"
      style={{ background: month.themeGradient }}
    >
      {/* Top: Full Kaltirsi datetime */}
      <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-mono mb-1">
            Taariikhda Kaltirsi · Kaltirsi Date
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-white leading-none">{kDate.day}</span>
            <span className="text-3xl font-bold text-white/80">{month.name}</span>
            <span className="text-lg text-white/50 font-mono">{kDate.year} K.E.</span>
          </div>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="text-sm text-white/70">{weekday.nameStandard} — <span className="text-white/90 font-medium">{weekday.nameIndigenous}</span></span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-sm text-white/60">{month.season} · {month.seasonEnglish}</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-sm text-white/60">{month.nameEnglish}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-4xl font-black text-white font-mono tabular-nums leading-none">
            {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
          </div>
          <div className="text-sm text-white/60 mt-1">{somaliTime} · Waqtiga Dhaqanka</div>
          <div className="text-[10px] text-white/40 mt-0.5">
            {now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* Bottom: Live Pastoral/Environmental Status Bar */}
      <div className="px-6 py-2.5 bg-black/20 backdrop-blur-sm flex items-center gap-6 flex-wrap relative">
        {telLoading && (
           <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-10">
             <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono animate-pulse">
               📡 Connecting to Atmospheric Nodes...
             </span>
           </div>
        )}
        {[
          { icon: ThermometerSun, label: "Caawa/Maanta", value: `${Math.round(telemetry.current.temp)}°C`, color: "text-orange-300" },
          { icon: CloudRain, label: "Cimilada Hadda", value: weatherState.somali, color: "text-cyan-300" },
          { icon: Wind, label: "Dabaylraac", value: `${telemetry.current.windSpeed} km/h`, color: "text-emerald-300" },
          { icon: Droplets, label: "Dhedo/Qoyaan", value: `${telemetry.current.precipitation} mm`, color: "text-blue-300" },
          { icon: Star, label: "Godka Hadda", value: "Qayd", color: "text-purple-300" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
            <span className="text-[10px] text-white/40">{stat.label}:</span>
            <span className={cn("text-[10px] font-bold", stat.color)}>{stat.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ── SIX-LAYER INTELLIGENCE HUD ─────────────────────────────────────
const LAYER_CARDS = [
  {
    key: "qorraxeed", icon: Sun, color: "#D9A441",
    title: "Kaltirsi Qorraxeed", sub: "Solar Calendar",
    getContent: (kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const m = getCurrentKaltirsiMonth(kDate.month)
      return { primary: m.name, secondary: `Bisha ${m.id}aad · ${m.daysInMonth} maalmood`, badge: m.season }
    }
  },
  {
    key: "dayaxeed", icon: Moon, color: "#8B5CF6",
    title: "Kaltirsi Dayaxeed", sub: "Lunar Calendar",
    getContent: (kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      try { return { primary: KaltirsiEngine.getHijriDate(new Date()), secondary: "354-day lunar cycle", badge: "Dayaxeed" } }
      catch { return { primary: "—", secondary: "Lunar sync", badge: "Dayaxeed" } }
    }
  },
  {
    key: "xiddigeed", icon: Star, color: "#06B6D4",
    title: "Kaltirsi Xiddigeed", sub: "Stellar / 28 Godka",
    getContent: (_kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const g = GodkaEngine.getCurrentGodka(new Date())
      return { primary: `${g.name} (${g.iauStar})`, secondary: g.significance, badge: `Active ${g.associatedSeason}` }
    }
  },
  {
    key: "hawd", icon: Leaf, color: "#1EB53A",
    title: "Kaltirsi Hawd", sub: "Pastoral Intelligence",
    getContent: (kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const m = getCurrentKaltirsiMonth(kDate.month)
      return { primary: `${m.grazingIndex}/10`, secondary: m.pastoralActivity.substring(0, 50) + "…", badge: m.droughtRisk }
    }
  },
  {
    key: "badda", icon: Anchor, color: "#0EA5E9",
    title: "Kaltirsi Badda", sub: "Maritime Intelligence",
    getContent: (kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const m = getCurrentKaltirsiMonth(kDate.month)
      const isBadFuran = m.id === 6
      const isBadXiran = m.id === 12
      return {
        primary: isBadFuran ? "BAD-FURAN" : isBadXiran ? "BAD-XIRAN" : "Open Water",
        secondary: m.maritimeNote.substring(0, 50) + "…",
        badge: isBadFuran || isBadXiran ? "Trade Gate" : "Active"
      }
    }
  },
  {
    key: "diimeed", icon: Flame, color: "#F59E0B",
    title: "Kaltirsi Diimeed", sub: "Religious / Hijri",
    getContent: (_kDate: ReturnType<typeof KaltirsiEngine.gregorianToKaltirsi>) => {
      const upcoming = getUpcomingHolidays(new Date(), 1)
      const h = upcoming[0]
      return {
        primary: h?.nameSomali || "Ciidaha Qaranka",
        secondary: h ? `${h.date} — ${h.kaltirsiMonth}` : "No upcoming holiday",
        badge: h?.type || "religious"
      }
    }
  }
]

function SixLayerHUD() {
  const kDate = useMemo(() => KaltirsiEngine.gregorianToKaltirsi(new Date()), [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {LAYER_CARDS.map((card, i) => {
        const Icon = card.icon
        const content = card.getContent(kDate)
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group rounded-2xl border border-white/5 bg-white/[0.02] p-4 cursor-pointer transition-all hover:border-white/10 hover:bg-white/[0.04]"
            style={{ boxShadow: `0 0 0 0 ${card.color}` }}
          >
            {/* Icon + Layer name */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/8"
                style={{ backgroundColor: `${card.color}18` }}>
                <Icon className="h-4.5 w-4.5" style={{ color: card.color }} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-foreground leading-none">{card.title.split(" ")[1]}</div>
                <div className="text-[9px] text-muted-foreground/50 mt-0.5">{card.sub}</div>
              </div>
            </div>

            {/* Primary metric */}
            <div className="text-xl font-black text-foreground leading-none mb-1 truncate">
              {content.primary}
            </div>
            <div className="text-[10px] text-muted-foreground/50 leading-snug line-clamp-2 mb-2">
              {content.secondary}
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider"
              style={{ color: card.color, borderColor: `${card.color}30`, backgroundColor: `${card.color}10` }}>
              {content.badge}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── UPCOMING HOLIDAYS STRIP ─────────────────────────────────────────
function HolidayStrip() {
  const upcoming = useMemo(() => getUpcomingHolidays(new Date(), 3), [])

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
      {upcoming.map((h, i) => {
        const daysLeft = (() => {
          const now = new Date()
          const target = new Date(now.getFullYear(), h.month - 1, h.day)
          if (target < now) target.setFullYear(target.getFullYear() + 1)
          return Math.ceil((target.getTime() - now.getTime()) / 86400000)
        })()
        return (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] min-w-[220px]"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-sm"
              style={{ backgroundColor: h.color + "25" }}>
              {h.day === 0 ? "☪" : h.day}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-foreground truncate">{h.nameSomali}</div>
              <div className="text-[10px] text-muted-foreground/50">{h.date} · {h.kaltirsiMonth}</div>
            </div>
            <div className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ color: h.color, backgroundColor: h.color + "15" }}>
              {daysLeft}d
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── ANNUAL GRAZING SPARKLINE (mini) ────────────────────────────────
function AnnualSparkline() {
  const kDate = useMemo(() => KaltirsiEngine.gregorianToKaltirsi(new Date()), [])

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-mono">Tilmaamaha Daaqsinta Sannadlaha</div>
          <div className="text-sm font-bold text-foreground">Annual Grazing Cycle</div>
        </div>
        <div className="text-xs text-muted-foreground/50">Kaltirsi {kDate.year} K.E.</div>
      </div>
      <div className="flex items-end gap-0.5 h-12">
        {KALTIRSI_MONTHS.map((m) => {
          const isCurrent = m.id === kDate.month
          const pct = (m.grazingIndex / 10) * 100
          const color = m.grazingIndex >= 8 ? "#1EB53A" : m.grazingIndex >= 5 ? "#D9A441" : m.grazingIndex >= 3 ? "#F97316" : "#DC2626"
          return (
            <div key={m.id} className="flex-1 flex flex-col items-center gap-0.5 group relative">
              <div className="w-full relative" style={{ height: "40px" }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ delay: m.id * 0.04, type: "spring" }}
                  className="absolute bottom-0 w-full rounded-sm"
                  style={{ backgroundColor: isCurrent ? color : color + "55" }}
                />
                {isCurrent && <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />}
              </div>
              <div className={cn("text-[7px] font-mono text-center w-full truncate",
                isCurrent ? "text-primary font-bold" : "text-muted-foreground/25")}>
                {m.name.substring(0, 3)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT: Kaltirsi Ecological Intelligence Dashboard
// ═══════════════════════════════════════════════════════════════════
export function KaltirsiEcologicalDashboard() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* 🔴 NEW LIVE INTELLIGENCE LAYER (GRAZING INDEX) */}
      <LiveGrazingIndexLayer />

      <LiveChronometer />
      <SixLayerHUD />

      {/* 🔴 NEW 3D ASTRONOMICAL MAP LAYER */}
      <Kaltirsi3DStarMap />

      {/* TIER 2: Section labels */}
      <div className="flex items-center justify-between px-0.5">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Liiska Xogta · Six-Layer Intelligence
        </div>
        <div className="text-[10px] text-muted-foreground/40 font-mono">
          Hex-Temporal Matrix v3123
        </div>
      </div>

      {/* TIER 3: 6-Layer HUD */}
      <SixLayerHUD />

      {/* TIER 4: Annual sparkline */}
      <AnnualSparkline />

      {/* TIER 5: Upcoming Holidays strip */}
      <div>
        <div className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-mono mb-2">
          Ciidaha Soo Socda · Upcoming Sovereignty Events
        </div>
        <HolidayStrip />
      </div>
    </div>
  )
}
