"use client"

import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { getDayData } from "@/lib/calendar-utils"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Star, Sun } from "lucide-react"

interface DayViewProps {
  date: Date
}

export function DayView({ date }: DayViewProps) {
  const { t } = useLanguage()
  const dayData = getDayData(date)

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <div className="text-sm text-muted-foreground">
          {t(`weekday.${dayData.weekday.toLowerCase()}`)} / {t(`traditional.${dayData.weekday.toLowerCase()}`)}
        </div>
        <div className="text-3xl font-bold">{dayData.gregorianDay}</div>
        <div className="text-sm">
          {dayData.gregorianMonth} {dayData.year}
        </div>
        <div className="flex justify-center items-center gap-2 mt-1">
          <div className="text-xs px-2 py-1 rounded-full bg-muted">{dayData.hijriDate}</div>
          <div className="text-xs px-2 py-1 rounded-full bg-muted">
            {t(`somali.month.${dayData.somaliMonth.toLowerCase()}`)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <h3 className="text-sm font-medium">Season</h3>
            </div>
            <div
              className={cn(
                "px-2 py-1 text-xs rounded-full text-center",
                dayData.season === "Jiilaal" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                dayData.season === "Gu'" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                dayData.season === "Xagaa" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                dayData.season === "Dayr" && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
              )}
            >
              {t(`season.${dayData.season.toLowerCase()}`)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-medium">Astronomical</h3>
            </div>
            <div className="text-xs">
              {dayData.astronomicalEvents.length > 0 ? (
                dayData.astronomicalEvents.map((event, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-center"
                  >
                    {t(event.nameKey)}
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">No events</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Events</h3>
          </div>

          {dayData.events.length > 0 ? (
            <div className="space-y-2">
              {dayData.events.map((event, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-2 rounded-md text-sm",
                    event.type === "cultural" &&
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                    event.type === "astronomical" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                    event.type === "holiday" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                  )}
                >
                  <div className="font-medium">{t(event.nameKey)}</div>
                  <div className="text-xs mt-1">{event.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-4">No events today</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
