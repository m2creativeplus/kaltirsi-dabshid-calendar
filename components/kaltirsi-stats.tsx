"use client"

import { motion } from "framer-motion"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { useState, useEffect } from "react"
import { Flame, Star, Calendar, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const STAT_ICONS = [Flame, Star, Calendar, Sparkles]
const STAT_COLORS = [
  "from-amber-400 to-orange-500",
  "from-yellow-300 to-amber-500",
  "from-amber-500 to-red-500",
  "from-orange-400 to-amber-600",
]

const getKaltirsiStats = (currentDate: Date) => {
  const kaltirsiDate = KaltirsiEngine.gregorianToKaltirsi(currentDate)
  const star = KaltirsiEngine.getStarSeason(currentDate)

  const dabshidDate = new Date(currentDate.getFullYear(), 6, 20)
  if (dabshidDate < currentDate) dabshidDate.setFullYear(dabshidDate.getFullYear() + 1)
  const daysToDabshid = Math.ceil((dabshidDate.getTime() - currentDate.getTime()) / (86400000))

  return [
    { value: String(daysToDabshid), label: "Days to Dabshid" },
    { value: star?.name || "Transition", label: "Active Star" },
    { value: String(kaltirsiDate.year), label: "Kaltirsi Year" },
    { value: kaltirsiDate.monthName, label: "Current Month" },
  ]
}

export function KaltirsiStats() {
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    setStats(getKaltirsiStats(new Date()))
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="px-6 py-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => {
          const Icon = STAT_ICONS[i]
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="glass rounded-xl p-3.5 group hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    {stat.label}
                  </span>
                  <div className={cn("w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity", STAT_COLORS[i])}>
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className={cn(
                  "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r",
                  STAT_COLORS[i]
                )}>
                  {stat.value}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
