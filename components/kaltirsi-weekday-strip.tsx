"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { KALTIRSI_WEEKDAYS, type KaltirsiWeekday } from "@/lib/kaltirsi-data"
import { cn } from "@/lib/utils"

function getToday(): KaltirsiWeekday {
  const jsDay = new Date().getDay() // 0=Sun, 1=Mon... 6=Sat
  // Map JS day to Kaltirsi: Sabti=Sat(6), Axad=Sun(0), Isniin=Mon(1)...
  const kaltirsiIndex = jsDay === 0 ? 1 : jsDay === 6 ? 0 : jsDay + 1
  return KALTIRSI_WEEKDAYS[kaltirsiIndex] || KALTIRSI_WEEKDAYS[0]
}

export function KaltirsiWeekdayStrip() {
  const today = useMemo(() => getToday(), [])
  const jsDay = new Date().getDay()

  return (
    <div className="px-6 py-3 border-b border-border/20">
      {/* Today's Weekday Feature */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">{today.nameStandard.charAt(0)}</span>
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">
              {today.nameStandard} — <span className="text-primary">{today.nameIndigenous}</span>
            </div>
            <div className="text-[10px] text-muted-foreground">
              {today.nameEnglish} · {today.meaning} · <span className="italic">{today.meaningSomali}</span>
            </div>
          </div>
        </div>
        <div className="flex-1" />
        <div className="text-[10px] text-muted-foreground/50 max-w-xs text-right italic">
          {today.pastoralGuidance}
        </div>
      </div>

      {/* Full Week Strip */}
      <div className="flex gap-1">
        {KALTIRSI_WEEKDAYS.map((day, i) => {
          // Map kaltirsi index to JS day: Sabti(0)→6, Axad(1)→0, Isniin(2)→1...
          const mappedJsDay = i === 0 ? 6 : i - 1
          const isToday = mappedJsDay === jsDay

          return (
            <motion.div
              key={day.id}
              whileHover={{ scale: 1.03 }}
              className={cn(
                "flex-1 rounded-xl p-2 text-center transition-all border cursor-default",
                isToday
                  ? "bg-primary/15 border-primary/30 shadow-lg shadow-primary/5"
                  : "bg-white/[0.02] border-white/5 hover:bg-white/5"
              )}
            >
              <div className={cn(
                "text-[10px] font-bold uppercase tracking-wider mb-0.5",
                isToday ? "text-primary" : "text-muted-foreground/60"
              )}>
                {day.nameStandard}
              </div>
              <div className={cn(
                "text-xs font-medium",
                isToday ? "text-foreground" : "text-muted-foreground/40"
              )}>
                {day.nameIndigenous}
              </div>
              {isToday && (
                <motion.div
                  layoutId="weekday-dot"
                  className="w-1.5 h-1.5 rounded-full bg-primary mx-auto mt-1"
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
