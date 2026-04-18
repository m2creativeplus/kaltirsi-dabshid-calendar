"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { cn } from "@/lib/utils"
import { Sun, Moon, Sunrise, Sunset, Coffee, Eye, Tent, Star } from "lucide-react"

// ═══════════════════════════════════════════════════════════════════
// GOORSHEEGTA — The Somali Environmental Clock
// 8 segments dividing the 24-hour cycle by ecological rhythm
// ═══════════════════════════════════════════════════════════════════

interface GoorsheegtaSegment {
  id: number
  nameSomali: string
  nameEnglish: string
  timeRange: string
  startHour: number
  endHour: number
  description: string
  descriptionSomali: string
  pastoralGuidance: string
  pastoralGuidanceSomali: string
  icon: React.ElementType
  color: string
  gradient: string
  ambientOpacity: number // How dark/light the segment is (0=night, 1=bright)
}

const GOORSHEEGTA_SEGMENTS: GoorsheegtaSegment[] = [
  {
    id: 1, nameSomali: "Mirkac", nameEnglish: "Deep Night",
    timeRange: "02:00 – 05:00", startHour: 2, endHour: 5,
    description: "The darkest hours. Stars at maximum visibility. Night watch rotation.",
    descriptionSomali: "Saacadaha ugu mugdiga badan. Xiddigahu si buuxda ayay u muuqdaan. Wareegga ilaalinta habeenkii.",
    pastoralGuidance: "Read Goddad positions for season forecast. Protect livestock from predators.",
    pastoralGuidanceSomali: "Akhri meelaha Goddadku ku yaalliin si aad u saadaashid xilliga. Xoolaha ka ilaali ugaadhsadayaasha.",
    icon: Star, color: "#1e1b4b", gradient: "linear-gradient(135deg, #0f0a2e 0%, #1e1b4b 100%)", ambientOpacity: 0.1,
  },
  {
    id: 2, nameSomali: "Waaberi", nameEnglish: "Dawn",
    timeRange: "05:00 – 06:30", startHour: 5, endHour: 6.5,
    description: "First light breaks the horizon. The Fajr prayer. Stars begin to set.",
    descriptionSomali: "Iftiinka ugu horreeya ayaa cirka ka soo muuqda. Salaadda Fajrka. Xiddigahu way dhacayaan.",
    pastoralGuidance: "Begin morning milking. Assess overnight herd conditions.",
    pastoralGuidanceSomali: "Bilow lisidda subaxda. Eeg xaaladdii xoolaha habeenkii.",
    icon: Sunrise, color: "#f59e0b", gradient: "linear-gradient(135deg, #1e1b4b 0%, #f59e0b 50%, #fbbf24 100%)", ambientOpacity: 0.4,
  },
  {
    id: 3, nameSomali: "Aroortii", nameEnglish: "Early Morning",
    timeRange: "06:30 – 10:00", startHour: 6.5, endHour: 10,
    description: "Full sunrise. Temperature rising. The active morning work period.",
    descriptionSomali: "Qorraxda oo dhan ayaa soo baxday. Kulaylku wuu sii kordhayaa. Waqtiga shaqada subaxda.",
    pastoralGuidance: "Move herds to grazing grounds. Peak grazing window begins.",
    pastoralGuidanceSomali: "Xoolaha u guur dhulka daaqsinta. Waqtiga daaqsinta ugu fiican ayaa bilaabmaya.",
    icon: Sun, color: "#f97316", gradient: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)", ambientOpacity: 0.7,
  },
  {
    id: 4, nameSomali: "Barqo", nameEnglish: "Forenoon",
    timeRange: "10:00 – 12:00", startHour: 10, endHour: 12,
    description: "Heat building towards peak. Last productive outdoor hours before shelter.",
    descriptionSomali: "Kulaylku wuu sii kordhayaa. Saacadaha ugu dambeeya ee shaqada dibadda ka hor hoyga.",
    pastoralGuidance: "Complete field tasks. Ensure water access for livestock before midday heat.",
    pastoralGuidanceSomali: "Dhammeystir hawlaha beerta. Hubi in xoolahu biyo helaan ka hor kulaylka hadhka.",
    icon: Sun, color: "#ea580c", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", ambientOpacity: 0.9,
  },
  {
    id: 5, nameSomali: "Hadh-gal", nameEnglish: "Noon / Qiilo",
    timeRange: "12:00 – 15:00", startHour: 12, endHour: 15,
    description: "Solar peak. The Qiilo rest period. No forced animal movement. Shelter mandatory.",
    descriptionSomali: "Qorraxdu waa meesha ugu sarreysa. Waqtiga nasashada Qiilada. Ma jiro dhaqaaqa xoolaha. Hoy waa waajib.",
    pastoralGuidance: "Absolute rest. Shelter all animals. No travel or labor. Conserve water.",
    pastoralGuidanceSomali: "Nasti buuxda. Xoolo walba hooy. Ma socdo, ma shaqeeyso. Biyo u kaydi.",
    icon: Coffee, color: "#dc2626", gradient: "linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #b91c1c 100%)", ambientOpacity: 1.0,
  },
  {
    id: 6, nameSomali: "Galab", nameEnglish: "Afternoon",
    timeRange: "15:00 – 18:00", startHour: 15, endHour: 18,
    description: "Cooling begins. Second grazing window opens. Evening preparations.",
    descriptionSomali: "Qaboojintu waa bilaabatay. Daaqsinta labaad ayaa furmaysa. Diyaarinta fiidkii.",
    pastoralGuidance: "Return herds to secondary grazing. Evening milking preparations.",
    pastoralGuidanceSomali: "Xoolaha ku celi daaqsinta labaad. Diyaari lisidda fiidkii.",
    icon: Sunset, color: "#d97706", gradient: "linear-gradient(135deg, #ea580c 0%, #d97706 50%, #f59e0b 100%)", ambientOpacity: 0.7,
  },
  {
    id: 7, nameSomali: "Maqrib", nameEnglish: "Sunset / Dusk",
    timeRange: "18:00 – 19:30", startHour: 18, endHour: 19.5,
    description: "The sun sets. Maghrib prayer. Golden hour transitions to twilight.",
    descriptionSomali: "Qorraxdu way dhacday. Salaadda Maqribka. Saacadda dahabiga ah waxay u beddelantaa huruudka.",
    pastoralGuidance: "Secure livestock in enclosures. Complete evening milking. Count animals.",
    pastoralGuidanceSomali: "Xoolaha ku xidh xeradaha. Dhammeystir lisidda fiidkii. Tiri xoolaha.",
    icon: Sunset, color: "#7c3aed", gradient: "linear-gradient(135deg, #d97706 0%, #7c3aed 100%)", ambientOpacity: 0.4,
  },
  {
    id: 8, nameSomali: "Fiid", nameEnglish: "Evening / Night",
    timeRange: "19:30 – 02:00", startHour: 19.5, endHour: 26, // 26 = 2:00 next day
    description: "Night falls. Star observation begins. Stories around the fire.",
    descriptionSomali: "Habeenku wuu dhacay. Daawashada xiddigaha ayaa bilaabmaysa. Sheekooyin dabka agtiisa.",
    pastoralGuidance: "Night watch begins. Read stars for tomorrow's weather. Tell stories to youth.",
    pastoralGuidanceSomali: "Ilaalinta habeenkii ayaa bilaabmaysa. Xiddigaha akhri cimilada berrito. Dhallinyarada u sheekee.",
    icon: Moon, color: "#312e81", gradient: "linear-gradient(135deg, #7c3aed 0%, #312e81 50%, #1e1b4b 100%)", ambientOpacity: 0.15,
  },
]

function getCurrentSegment(): GoorsheegtaSegment {
  const hour = new Date().getHours() + new Date().getMinutes() / 60
  for (const seg of GOORSHEEGTA_SEGMENTS) {
    const end = seg.endHour > 24 ? seg.endHour - 24 : seg.endHour
    if (seg.endHour > 24) {
      // Wraps midnight
      if (hour >= seg.startHour || hour < end) return seg
    } else {
      if (hour >= seg.startHour && hour < seg.endHour) return seg
    }
  }
  return GOORSHEEGTA_SEGMENTS[7] // fallback: Fiid
}

// ── SVG CIRCULAR CLOCK ──────────────────────────────────────
function ClockFace({ currentSegment }: { currentSegment: GoorsheegtaSegment }) {
  const size = 280
  const center = size / 2
  const radius = 120
  const innerRadius = 85

  // Current time hand angle
  const now = new Date()
  const hourAngle = ((now.getHours() + now.getMinutes() / 60) / 24) * 360 - 90 // -90 for top start

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-2xl">
      {/* Outer glow */}
      <defs>
        <radialGradient id="clockGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={currentSegment.color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={currentSegment.color} stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx={center} cy={center} r={radius + 15} fill="url(#clockGlow)" />

      {/* Segment arcs */}
      {GOORSHEEGTA_SEGMENTS.map((seg, i) => {
        const startAngle = (seg.startHour / 24) * 360 - 90
        const endHourNorm = seg.endHour > 24 ? seg.endHour - 24 + 24 : seg.endHour
        const sweepAngle = ((endHourNorm - seg.startHour) / 24) * 360

        const startRad = (startAngle * Math.PI) / 180
        const endRad = ((startAngle + sweepAngle) * Math.PI) / 180
        const largeArc = sweepAngle > 180 ? 1 : 0

        const x1 = center + radius * Math.cos(startRad)
        const y1 = center + radius * Math.sin(startRad)
        const x2 = center + radius * Math.cos(endRad)
        const y2 = center + radius * Math.sin(endRad)
        const ix1 = center + innerRadius * Math.cos(startRad)
        const iy1 = center + innerRadius * Math.sin(startRad)
        const ix2 = center + innerRadius * Math.cos(endRad)
        const iy2 = center + innerRadius * Math.sin(endRad)

        const isCurrent = seg.id === currentSegment.id
        const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`

        // Label position
        const midAngle = startRad + (endRad - startRad) / 2
        const labelR = (radius + innerRadius) / 2
        const lx = center + labelR * Math.cos(midAngle)
        const ly = center + labelR * Math.sin(midAngle)

        return (
          <g key={seg.id}>
            <motion.path
              d={path}
              fill={isCurrent ? seg.color : `${seg.color}40`}
              stroke={isCurrent ? "#D9A441" : "rgba(255,255,255,0.08)"}
              strokeWidth={isCurrent ? 2 : 0.5}
              initial={false}
              animate={{ opacity: isCurrent ? 1 : 0.5 }}
              filter={isCurrent ? "url(#glow)" : undefined}
              className="cursor-pointer transition-all"
            />
            <text
              x={lx} y={ly}
              textAnchor="middle" dominantBaseline="central"
              fill={isCurrent ? "#FFF" : "rgba(255,255,255,0.35)"}
              fontSize={isCurrent ? 8 : 6}
              fontWeight={isCurrent ? "bold" : "normal"}
              className="pointer-events-none select-none"
            >
              {seg.nameSomali.length > 7 ? seg.nameSomali.substring(0, 6) + "." : seg.nameSomali}
            </text>
          </g>
        )
      })}

      {/* Center circle */}
      <circle cx={center} cy={center} r={innerRadius - 5} fill="#0e1117" stroke="rgba(217,164,65,0.2)" strokeWidth="1" />

      {/* Center text */}
      <text x={center} y={center - 14} textAnchor="middle" fill="#D9A441" fontSize="9" fontWeight="bold" className="select-none">
        GOORSHEEGTA
      </text>
      <text x={center} y={center + 2} textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold" className="select-none">
        {currentSegment.nameSomali}
      </text>
      <text x={center} y={center + 16} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" className="select-none">
        {currentSegment.nameEnglish}
      </text>
      <text x={center} y={center + 30} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" className="select-none">
        {currentSegment.timeRange}
      </text>

      {/* Clock hand */}
      {(() => {
        const handRad = (hourAngle * Math.PI) / 180
        const hx = center + (radius - 8) * Math.cos(handRad)
        const hy = center + (radius - 8) * Math.sin(handRad)
        return (
          <>
            <line x1={center} y1={center} x2={hx} y2={hy} stroke="#D9A441" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            <circle cx={center} cy={center} r="4" fill="#D9A441" />
          </>
        )
      })()}

      {/* Hour markers (24h) */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = ((i / 24) * 360 - 90) * Math.PI / 180
        const majorTick = i % 6 === 0
        const r1 = radius + 2
        const r2 = radius + (majorTick ? 10 : 5)
        return (
          <line
            key={i}
            x1={center + r1 * Math.cos(angle)}
            y1={center + r1 * Math.sin(angle)}
            x2={center + r2 * Math.cos(angle)}
            y2={center + r2 * Math.sin(angle)}
            stroke={majorTick ? "rgba(217,164,65,0.5)" : "rgba(255,255,255,0.1)"}
            strokeWidth={majorTick ? 1.5 : 0.5}
          />
        )
      })}

      {/* Hour labels (0, 6, 12, 18) */}
      {[0, 6, 12, 18].map((h) => {
        const angle = ((h / 24) * 360 - 90) * Math.PI / 180
        const lr = radius + 18
        return (
          <text
            key={h}
            x={center + lr * Math.cos(angle)}
            y={center + lr * Math.sin(angle)}
            textAnchor="middle" dominantBaseline="central"
            fill="rgba(217,164,65,0.6)" fontSize="9" fontWeight="bold"
            className="select-none"
          >
            {h.toString().padStart(2, "0")}
          </text>
        )
      })}
    </svg>
  )
}

// ── SEGMENT DETAIL CARD ─────────────────────────────────────
function SegmentDetail({ segment }: { segment: GoorsheegtaSegment }) {
  const Icon = segment.icon
  return (
    <motion.div
      key={segment.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Segment Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
          style={{ backgroundColor: `${segment.color}30` }}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-foreground">{segment.nameSomali}</h4>
          <p className="text-xs text-muted-foreground">{segment.nameEnglish} · {segment.timeRange}</p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <p className="text-sm text-foreground/80 leading-relaxed">{segment.description}</p>
        <p className="text-xs text-muted-foreground/60 italic leading-relaxed">{segment.descriptionSomali}</p>
      </div>

      {/* Pastoral Guidance */}
      <div className="rounded-xl p-3 border border-primary/10 bg-primary/5">
        <div className="text-[9px] uppercase tracking-widest text-primary/60 font-mono mb-1">
          Hagida Xoolo-dhaqatada / Pastoral Guidance
        </div>
        <p className="text-xs text-foreground/80">{segment.pastoralGuidance}</p>
        <p className="text-[10px] text-muted-foreground/50 italic mt-1">{segment.pastoralGuidanceSomali}</p>
      </div>
    </motion.div>
  )
}

// ── ALL 8 SEGMENTS TIMELINE ─────────────────────────────────
function SegmentTimeline({ currentId }: { currentId: number }) {
  return (
    <div className="flex gap-0.5 mt-3">
      {GOORSHEEGTA_SEGMENTS.map((seg) => {
        const isCurrent = seg.id === currentId
        return (
          <motion.div
            key={seg.id}
            className={cn(
              "flex-1 h-1.5 rounded-full transition-all",
              isCurrent ? "shadow-lg" : ""
            )}
            style={{
              backgroundColor: isCurrent ? seg.color : `${seg.color}30`,
              boxShadow: isCurrent ? `0 0 8px ${seg.color}60` : "none",
            }}
            whileHover={{ scaleY: 2 }}
          />
        )
      })}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT: Goorsheegta Environmental Clock
// ═══════════════════════════════════════════════════════════════════
export function GoorsheegtaClock() {
  const [currentSegment, setCurrentSegment] = useState<GoorsheegtaSegment>(GOORSHEEGTA_SEGMENTS[0])
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setCurrentSegment(getCurrentSegment())
    const interval = setInterval(() => {
      setTime(new Date())
      setCurrentSegment(getCurrentSegment())
    }, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const somaliTime = useMemo(() => KaltirsiEngine.getSomaliTime(time), [time])

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
      {/* Ambient gradient header */}
      <div
        className="px-5 py-3 border-b border-white/5"
        style={{ background: currentSegment.gradient }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-mono">
              Saacadda Deegaanka
            </div>
            <h3 className="text-sm font-bold text-white">Goorsheegta — Environmental Clock</h3>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white font-mono">
              {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
            </div>
            <div className="text-[10px] text-white/60">{somaliTime}</div>
          </div>
        </div>
      </div>

      {/* Clock + Detail */}
      <div className="p-5">
        <div className="flex flex-col items-center gap-5">
          {/* SVG Clock */}
          <ClockFace currentSegment={currentSegment} />

          {/* Progress bar */}
          <SegmentTimeline currentId={currentSegment.id} />

          {/* Active Segment Details */}
          <AnimatePresence mode="wait">
            <SegmentDetail segment={currentSegment} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
