"use client"

import { motion } from "framer-motion"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"

const getKaltirsiStats = (currentDate: Date) => {
  const kaltirsiDate = KaltirsiEngine.gregorianToKaltirsi(currentDate)
  const star = KaltirsiEngine.getStarSeason(currentDate)
  
  // Calculate days to Dabshid (July 20)
  const dabshidDate = new Date(currentDate.getFullYear(), 6, 20) // July 20
  if (dabshidDate < currentDate) {
    dabshidDate.setFullYear(dabshidDate.getFullYear() + 1)
  }
  const daysToDabshid = Math.ceil((dabshidDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
  
  return [
    { value: String(daysToDabshid), label: "Days to Dabshid" },
    { value: star?.name || "Transition", label: "Current Star" },
    { value: String(kaltirsiDate.year), label: "Kaltirsi Year" },
    { value: kaltirsiDate.monthName, label: "Kaltirsi Month" },
  ]
}

export function KaltirsiStats() {
  const stats = getKaltirsiStats(new Date())
  
  return (
    <section className="py-6 border-y border-border/30 bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
