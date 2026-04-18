"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useCultural } from "@/components/cultural-provider"
import { cn } from "@/lib/utils"
import { KaltirsiEngine, MONTHS_SOLAR, getSeason } from "@/lib/kaltirsi-engine"
import { Flame } from "lucide-react"

interface CalendarWheelProps {
  onMonthSelect: (month: string) => void
}

// Maps canonical Kaltirsi months to their season visual styles
const SEASON_STYLES: Record<string, { gradient: string; ring: string }> = {
  "Xagaa":   { gradient: "from-amber-500 to-orange-600",  ring: "ring-amber-500/30" },
  "Dayr":    { gradient: "from-amber-700 to-stone-600",   ring: "ring-amber-700/30" },
  "Jiilaal": { gradient: "from-slate-500 to-blue-700",    ring: "ring-blue-500/30" },
  "Gu'":     { gradient: "from-emerald-500 to-green-600", ring: "ring-emerald-500/30" },
}

export function CalendarWheel({ onMonthSelect }: CalendarWheelProps) {
  const { t } = useCultural()
  const now = new Date()
  const currentKDate = KaltirsiEngine.gregorianToKaltirsi(now)

  // Build the 12 months with correct canonical data
  const months = MONTHS_SOLAR.map((name, i) => {
    const season = getSeason(i)
    const style = SEASON_STYLES[season.name] || SEASON_STYLES["Xagaa"]
    const isCurrent = currentKDate.month === i + 1
    const isDabshid = i === 0 // Samalaho = Dabshid month
    return { name, index: i, season, style, isCurrent, isDabshid }
  })

  return (
    <Card className="glass border-white/5">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-foreground/90 tracking-wide">Kaltirsi Solar Cycle</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">12 Months · Jul 20 Anchor</p>
          </div>
          <div className="text-[10px] text-muted-foreground glass-subtle px-2 py-1 rounded-md">
            {currentKDate.year} K.E.
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {months.map((m) => (
            <div
              key={m.name}
              className={cn(
                "relative p-3 rounded-xl cursor-pointer transition-all duration-200 group",
                `bg-gradient-to-br ${m.style.gradient}`,
                "text-white text-center",
                m.isCurrent && `ring-2 ${m.style.ring} shadow-lg scale-[1.03]`,
                !m.isCurrent && "opacity-80 hover:opacity-100 hover:scale-[1.02]",
              )}
              onClick={() => onMonthSelect(m.name.toLowerCase())}
            >
              {/* Dabshid flame icon */}
              {m.isDabshid && (
                <Flame className="absolute -top-1.5 -right-1.5 h-4 w-4 text-amber-300 animate-kaltirsi-pulse" />
              )}

              {/* Current month indicator */}
              {m.isCurrent && (
                <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-white shadow-md border-2 border-background animate-kaltirsi-pulse" />
              )}

              <div className="text-[9px] font-bold opacity-60 mb-0.5">{m.index + 1}</div>
              <div className="text-xs font-bold leading-tight truncate">{m.name}</div>
              <div className="text-[9px] opacity-70 mt-0.5">{m.season.name}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
