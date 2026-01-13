"use client"

import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { getMonthData } from "@/lib/calendar-utils"

interface MonthViewProps {
  date: Date
}

export function MonthView({ date }: MonthViewProps) {
  const { t, language } = useLanguage()
  const monthData = getMonthData(date)

  const weekdays = [
    { modern: "weekday.sunday", traditional: "traditional.sunday" },
    { modern: "weekday.monday", traditional: "traditional.monday" },
    { modern: "weekday.tuesday", traditional: "traditional.tuesday" },
    { modern: "weekday.wednesday", traditional: "traditional.wednesday" },
    { modern: "weekday.thursday", traditional: "traditional.thursday" },
    { modern: "weekday.friday", traditional: "traditional.friday" },
    { modern: "weekday.saturday", traditional: "traditional.saturday" },
  ]

  return (
    <div className="p-2">
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((day, i) => (
          <div key={i} className="text-center">
            <div className="text-xs font-medium">{t(day.modern).charAt(0)}</div>
            <div className="text-[10px] text-muted-foreground">{t(day.traditional).charAt(0)}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {monthData.days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square p-1 text-center relative rounded-md",
              day.isCurrentMonth ? "bg-background" : "bg-muted/50 text-muted-foreground",
              day.isToday && "border border-primary",
              day.events.length > 0 && "ring-1 ring-inset ring-primary/20",
            )}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start text-xs">
                <span>{day.gregorianDay}</span>
                <span className="text-[10px] text-muted-foreground">{day.hijriDate}</span>
              </div>

              <div className="text-[10px] text-muted-foreground mt-auto">
                {day.somaliMonth && (
                  <div className="truncate">{t(`somali.month.${day.somaliMonth.toLowerCase()}`)}</div>
                )}
              </div>

              {day.events.length > 0 && (
                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-primary"></div>
              )}

              {day.isHoliday && <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-red-500"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
