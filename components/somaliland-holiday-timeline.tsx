"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { getUpcomingHolidays, SOMALILAND_HOLIDAYS, type SomalilandHoliday } from "@/lib/kaltirsi-data"
import { cn } from "@/lib/utils"
import { Flag, Flame, Moon, Star, Calendar } from "lucide-react"

const HOLIDAY_ICONS: Record<string, React.ElementType> = {
  national: Flag,
  cultural: Flame,
  religious: Moon,
}

function daysUntil(holiday: SomalilandHoliday): number | null {
  if (holiday.month === 0) return null
  const now = new Date()
  const target = new Date(now.getFullYear(), holiday.month - 1, holiday.day)
  if (target < now) target.setFullYear(target.getFullYear() + 1)
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function HolidayCard({ holiday, index }: { holiday: SomalilandHoliday; index: number }) {
  const Icon = HOLIDAY_ICONS[holiday.type] || Star
  const days = daysUntil(holiday)
  const isImminent = days !== null && days <= 30

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 transition-all",
        isImminent 
          ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/5" 
          : "border-white/5 bg-white/[0.02] hover:bg-white/5"
      )}
    >
      {/* Glow effect for imminent holidays */}
      {isImminent && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
      )}

      <div className="relative z-10 flex items-start gap-3">
        {/* Icon */}
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10"
          style={{ backgroundColor: `${holiday.color}20` }}
        >
          <Icon className="h-5 w-5" style={{ color: holiday.color }} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-foreground truncate">{holiday.name}</h4>
            {holiday.significance === "critical" && (
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </div>
          
          {/* Somali Name */}
          <p className="text-xs text-muted-foreground/70 italic mb-2 truncate">{holiday.nameSomali}</p>

          {/* Date + Countdown */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-muted-foreground font-mono">{holiday.date}</span>
            {days !== null && (
              <span className={cn(
                "px-2 py-0.5 rounded-full font-bold",
                isImminent 
                  ? "bg-primary/20 text-primary" 
                  : "bg-white/5 text-muted-foreground"
              )}>
                {days} maalmood / days
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
            {holiday.description}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1 italic line-clamp-1">
            {holiday.descriptionSomali}
          </p>
        </div>
      </div>

      {/* Kaltirsi Month Tag */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50">Kaltirsi Month:</span>
        <span className="text-[10px] font-bold text-primary">{holiday.kaltirsiMonth}</span>
      </div>
    </motion.div>
  )
}

// 18 May Special Banner — uses the Somaliland imagery
function MayEighteenBanner() {
  const now = new Date()
  const may18 = new Date(now.getFullYear(), 4, 18)
  if (may18 < now) may18.setFullYear(may18.getFullYear() + 1)
  const daysLeft = Math.ceil((may18.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border-2 border-[#1EB53A]/30 p-5"
      style={{ background: "linear-gradient(135deg, rgba(30,181,58,0.15) 0%, rgba(206,17,38,0.08) 100%)" }}
    >
      {/* Firework particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#1EB53A] rounded-full"
          style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
          }}
        />
      ))}

      <div className="relative z-10 flex items-center gap-4">
        {/* The "18" Display */}
        <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#1EB53A] flex items-center justify-center shadow-lg shadow-[#1EB53A]/20">
          <div className="text-center">
            <div className="text-3xl font-black text-white leading-none">18</div>
            <div className="text-[10px] font-bold text-white/80 uppercase tracking-wider">May</div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-0.5">
            Maalinta Soo-celinta Madaxbannaanida
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Somaliland Independence Restoration Day — 35th Anniversary
          </p>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#1EB53A]/20 text-[#1EB53A] text-xs font-bold">
              {daysLeft} maalmood kadib
            </span>
            <span className="text-xs text-muted-foreground/60">
              Gu'soore · Month 11 · {new Date().getFullYear()}
            </span>
          </div>
        </div>

        {/* Somaliland Flag Colors */}
        <div className="flex-shrink-0 flex flex-col gap-0.5 w-4 h-16 rounded-full overflow-hidden">
          <div className="flex-1 bg-[#1EB53A]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#CE1126]" />
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MAIN EXPORT: Holiday Timeline Panel
// ═══════════════════════════════════════════════════════════════════
export function SomalilandHolidayTimeline() {
  const upcoming = useMemo(() => getUpcomingHolidays(new Date(), 5), [])

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Ciidaha Qaranka / National Holidays</h3>
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Republic of Somaliland</p>
        </div>
        <Calendar className="h-4 w-4 text-primary/50" />
      </div>

      {/* May 18 Special Banner */}
      <MayEighteenBanner />

      {/* Upcoming Holiday Cards */}
      <div className="space-y-2">
        {upcoming.map((holiday, i) => (
          <HolidayCard key={holiday.id} holiday={holiday} index={i} />
        ))}
      </div>
    </div>
  )
}
