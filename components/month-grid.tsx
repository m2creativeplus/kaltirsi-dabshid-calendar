"use client"

import { useCultural } from "@/components/cultural-provider"
import { cn } from "@/lib/utils"
import { getCalendarEvents } from "@/lib/calendar-events"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { KaltirsiEngine, getSeason } from "@/lib/kaltirsi-engine"

interface MonthGridProps {
  currentDate: Date
  onDateClick: (date: Date) => void
  onEventClick?: (event: any) => void
}

const SEASON_STRIPE: Record<string, string> = {
  "Xagaa":   "bg-amber-500",
  "Dayr":    "bg-amber-700",
  "Jiilaal": "bg-blue-400",
  "Gu'":     "bg-emerald-400",
}

const EVENT_COLORS: Record<string, string> = {
  cultural:     "bg-gradient-to-r from-amber-500 to-orange-500",
  agricultural: "bg-gradient-to-r from-emerald-500 to-green-600",
  astronomical: "bg-gradient-to-r from-violet-500 to-purple-600",
  holiday:      "bg-gradient-to-r from-red-500 to-rose-600",
  national:     "bg-gradient-to-r from-emerald-500 to-green-500",
}

export function MonthGrid({ currentDate, onDateClick, onEventClick }: MonthGridProps) {
  const { t } = useCultural()
  const today = new Date()

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    const prevMonth = new Date(year, month - 1, 0)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonth.getDate() - i)
      days.push({ date, isCurrentMonth: false })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({ date, isCurrentMonth: true })
    }

    const remainingCells = 42 - days.length
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day)
      days.push({ date, isCurrentMonth: false })
    }

    return days
  }

  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  const days = getDaysInMonth()
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const startDate = days[0].date.toISOString().split("T")[0]
  const endDate = days[days.length - 1].date.toISOString().split("T")[0]
  const userEvents = useQuery(api.events.getEvents, { startDate, endDate }) || []

  return (
    <div className="flex flex-col h-full">
      {/* Week header */}
      <div className="grid grid-cols-7 border-b border-border/30">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2.5 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-r border-border/20 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {days.map(({ date, isCurrentMonth }, index) => {
          const dateStr = date.toISOString().split("T")[0]
          const kaltirsi = KaltirsiEngine.gregorianToKaltirsi(date)
          const daySeason = getSeason(kaltirsi.month - 1)
          const stripeColor = SEASON_STRIPE[daySeason.name] || "bg-amber-500"

          const culturalEvents = getCalendarEvents(date)
          const dailyUserEvents = userEvents
            .filter((e) => e.startDate === dateStr)
            .map((e) => ({ ...e, titleKey: e.title, isUserEvent: true }))

          const allEvents = [
            ...culturalEvents.map((e) => ({ ...e, title: t(e.titleKey) })),
            ...dailyUserEvents.map((e) => ({ ...e, title: e.titleKey })),
          ]

          const isCurrentDay = isToday(date)
          const isFriday = date.getDay() === 5

          return (
            <div
              key={index}
              className={cn(
                "group relative border-r border-b border-border/20 last:border-r-0 p-2 min-h-[110px] cursor-pointer transition-all duration-200",
                isCurrentMonth
                  ? "hover:bg-white/[0.03]"
                  : "opacity-30",
                isCurrentDay && "bg-primary/5 ring-1 ring-inset ring-primary/20",
                isFriday && isCurrentMonth && "bg-emerald-500/[0.03]"
              )}
              onClick={() => onDateClick(date)}
            >
              {/* Seasonal Stripe */}
              <div className={cn(
                "absolute top-0 left-0 w-[3px] h-full rounded-r-full opacity-20 group-hover:opacity-60 transition-opacity",
                stripeColor
              )} />

              {/* Header: Gregorian + Kaltirsi */}
              <div className="flex justify-between items-start mb-1.5 pl-1.5">
                <div
                  className={cn(
                    "text-sm transition-all",
                    isCurrentDay
                      ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-lg shadow-amber-500/20 text-xs"
                      : "text-foreground/80 font-medium"
                  )}
                >
                  {date.getDate()}
                </div>
                <div className="text-[9px] text-muted-foreground/60 font-mono tabular-nums">
                  {kaltirsi.day}
                  <span className="hidden sm:inline ml-0.5 text-muted-foreground/40">
                    {kaltirsi.monthName.slice(0, 3)}
                  </span>
                </div>
              </div>

              {/* Events */}
              <div className="space-y-0.5 pl-1.5">
                {allEvents.slice(0, 3).map((event: any, eventIndex) => {
                  const colorClass = EVENT_COLORS[event.type] || "bg-gradient-to-r from-sky-500 to-blue-500"
                  return (
                    <div
                      key={eventIndex}
                      className={cn(
                        "text-[9px] px-1.5 py-[3px] rounded-[4px] text-white truncate cursor-pointer transition-all hover:brightness-110 hover:shadow-sm",
                        colorClass
                      )}
                      style={event.seasonalColor ? { background: `linear-gradient(90deg, ${event.seasonalColor}, ${event.seasonalColor}dd)` } : {}}
                      title={event.title}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onEventClick && event.isUserEvent) onEventClick(event)
                      }}
                    >
                      {event.title}
                    </div>
                  )
                })}
                {allEvents.length > 3 && (
                  <div className="text-[9px] text-muted-foreground/50 font-medium pl-1">
                    +{allEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
