"use client"

import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { getWeekData } from "@/lib/calendar-utils"

interface WeekViewProps {
  date: Date
}

export function WeekView({ date }: WeekViewProps) {
  const { t } = useLanguage()
  const weekData = getWeekData(date)

  return (
    <div className="p-2">
      <div className="grid grid-cols-7 gap-1">
        {weekData.days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "p-2 rounded-md",
              day.isToday && "bg-primary/10 border border-primary",
              !day.isToday && "bg-muted/50",
            )}
          >
            <div className="text-center mb-1">
              <div className="text-xs font-medium">{t(`weekday.${day.weekday.toLowerCase()}`)}</div>
              <div className="text-[10px] text-muted-foreground">{t(`traditional.${day.weekday.toLowerCase()}`)}</div>
              <div className="text-lg font-semibold">{day.gregorianDay}</div>
            </div>

            <div className="space-y-1">
              {day.events.map((event, j) => (
                <div
                  key={j}
                  className={cn(
                    "text-xs p-1 rounded truncate",
                    event.type === "cultural" &&
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                    event.type === "astronomical" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                    event.type === "holiday" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                  )}
                >
                  {t(event.nameKey)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
