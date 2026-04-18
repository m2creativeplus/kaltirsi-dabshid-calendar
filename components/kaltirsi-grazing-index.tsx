"use client"

import { motion } from "framer-motion"
import { KALTIRSI_MONTHS } from "@/lib/kaltirsi-data"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { cn } from "@/lib/utils"
import { Leaf, AlertTriangle, Flame, Droplets } from "lucide-react"

const RISK_CONFIG = {
  low:      { label: "Daaqsi Wanaagsan", labelEn: "Good Grazing",   bar: "from-emerald-500 to-green-400",  text: "text-emerald-400", icon: Leaf },
  moderate: { label: "Xaaladda Dhexe",   labelEn: "Moderate",        bar: "from-amber-500 to-yellow-400",   text: "text-amber-400",   icon: Droplets },
  high:     { label: "Dhibaato Sare",    labelEn: "High Stress",     bar: "from-orange-500 to-red-400",     text: "text-orange-400",  icon: AlertTriangle },
  critical: { label: "Khatar Weyn",      labelEn: "Critical Stress", bar: "from-red-600 to-rose-500",       text: "text-red-400",     icon: Flame },
}

export function KaltirsiGrazingIndex() {
  const now = new Date()
  const kDate = KaltirsiEngine.gregorianToKaltirsi(now)
  const currentMonth = KALTIRSI_MONTHS.find(m => m.id === kDate.month) || KALTIRSI_MONTHS[0]
  const risk = RISK_CONFIG[currentMonth.droughtRisk]
  const RiskIcon = risk.icon

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <div>
          <div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 font-mono">Tilmaamaha Daaqsinta</div>
          <h3 className="text-sm font-bold text-foreground">Grazing Intelligence Index</h3>
        </div>
        <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border", risk.text,
          currentMonth.droughtRisk === "low" ? "bg-emerald-500/10 border-emerald-500/20" :
          currentMonth.droughtRisk === "moderate" ? "bg-amber-500/10 border-amber-500/20" :
          currentMonth.droughtRisk === "high" ? "bg-orange-500/10 border-orange-500/20" :
          "bg-red-500/10 border-red-500/20"
        )}>
          <RiskIcon className="h-3 w-3" />
          {risk.labelEn}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Current Month Hero */}
        <div className="flex items-end gap-4">
          <div>
            <div className="text-5xl font-black text-foreground leading-none">{currentMonth.grazingIndex}<span className="text-xl text-muted-foreground/40">/10</span></div>
            <div className="text-xs text-muted-foreground mt-1">{currentMonth.name} · {currentMonth.nameEnglish}</div>
          </div>
          <div className="flex-1">
            {/* Big current bar */}
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentMonth.grazingIndex * 10}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={cn("h-full rounded-full bg-gradient-to-r", risk.bar)}
              />
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground/30 mt-1">
              <span>Critical</span><span>Peak</span>
            </div>
          </div>
        </div>

        {/* 12-Month Sparkline Chart */}
        <div>
          <div className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-mono mb-2">Annual Grazing Cycle</div>
          <div className="flex items-end gap-0.5 h-14">
            {KALTIRSI_MONTHS.map((m, i) => {
              const isCurrent = m.id === kDate.month
              const r = RISK_CONFIG[m.droughtRisk]
              const pct = (m.grazingIndex / 10) * 100

              return (
                <motion.div
                  key={m.id}
                  className="flex-1 flex flex-col items-center gap-0.5 group"
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
                >
                  <div className="w-full relative" style={{ height: "48px" }}>
                    <div
                      className={cn(
                        "absolute bottom-0 w-full rounded-sm bg-gradient-to-t transition-all",
                        isCurrent ? r.bar : "from-white/10 to-white/5",
                        isCurrent ? "opacity-100" : "opacity-50 group-hover:opacity-80"
                      )}
                      style={{ height: `${pct}%` }}
                    />
                    {isCurrent && (
                      <motion.div
                        layoutId="grazing-cursor"
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      />
                    )}
                  </div>
                  <div className={cn(
                    "text-[7px] font-mono truncate w-full text-center",
                    isCurrent ? "text-primary font-bold" : "text-muted-foreground/30"
                  )}>
                    {m.name.substring(0, 3)}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Seasonal Summary */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { season: "Xagaa", months: [1,2,3], avg: 3.0, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
            { season: "Dayr",  months: [4,5,6], avg: 7.0, color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
            { season: "Jiilaal", months: [7,8,9], avg: 1.7, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
            { season: "Gu'",  months: [10,11,12], avg: 9.0, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          ].map((s) => (
            <div key={s.season} className={cn("rounded-xl p-2 border text-center", s.bg)}>
              <div className={cn("text-xs font-bold", s.color)}>{s.season}</div>
              <div className="text-base font-black text-foreground">{s.avg}</div>
              <div className="text-[8px] text-muted-foreground/40">avg / 10</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
