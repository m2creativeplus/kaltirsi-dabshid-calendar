"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useCultural } from "@/components/cultural-provider"
import { cn } from "@/lib/utils"

interface CalendarWheelProps {
  onMonthSelect: (month: string) => void
}

export function CalendarWheel({ onMonthSelect }: CalendarWheelProps) {
  const { t } = useCultural()

  const months = [
    { key: "xays", season: "jiilaal", color: "from-blue-400 to-blue-600" },
    { key: "toddob", season: "jiilaal", color: "from-blue-400 to-blue-600" },
    { key: "karan", season: "jiilaal", color: "from-blue-400 to-blue-600" },
    { key: "laba-karan", season: "gu", color: "from-green-400 to-green-600" },
    { key: "rajal", season: "gu", color: "from-green-400 to-green-600" },
    { key: "dabarasiis", season: "xagaa", color: "from-yellow-400 to-yellow-600" },
    { key: "arafo", season: "xagaa", color: "from-yellow-400 to-yellow-600" },
    { key: "malabar", season: "xagaa", color: "from-yellow-400 to-yellow-600" },
    { key: "soon", season: "xagaa", color: "from-yellow-400 to-yellow-600" },
    { key: "maqal-soon", season: "dayr", color: "from-orange-400 to-orange-600" },
    { key: "wabar", season: "dayr", color: "from-orange-400 to-orange-600" },
    { key: "rajab", season: "jiilaal", color: "from-blue-400 to-blue-600" },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-center">Somali Calendar Wheel</h2>
        <div className="grid grid-cols-3 gap-3">
          {months.map((month, index) => (
            <div
              key={month.key}
              className={cn(
                "relative p-3 rounded-xl cursor-pointer transition-all hover:scale-105",
                `bg-gradient-to-br ${month.color}`,
                "text-white text-center",
              )}
              onClick={() => onMonthSelect(month.key)}
            >
              <div className="text-xs font-medium">{index + 1}</div>
              <div className="text-sm font-bold">{t(`month.${month.key}`)}</div>
              <div className="text-xs opacity-80">{t(`season.${month.season}`)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
