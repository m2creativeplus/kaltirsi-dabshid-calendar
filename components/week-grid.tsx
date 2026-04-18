"use client"

import { useCultural } from "@/components/cultural-provider"
import { cn } from "@/lib/utils"
import { getCalendarEvents } from "@/lib/calendar-events"

interface WeekGridProps {
  currentDate: Date
  onDateClick: (date: Date) => void
}

const EVENT_COLORS: Record<string, string> = {
  cultural:     "bg-gradient-to-r from-amber-500 to-orange-500",
  agricultural: "bg-gradient-to-r from-emerald-500 to-green-600",
  astronomical: "bg-gradient-to-r from-violet-500 to-purple-600",
  holiday:      "bg-gradient-to-r from-red-500 to-rose-600",
}

export function WeekGrid({ currentDate, onDateClick }: WeekGridProps) {
  const { t } = useCultural()
  const today = new Date()

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push(date)
    }
    return days
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const days = getWeekDays()
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="flex flex-col h-full bg-card/30">
      {/* Week header */}
      <div className="grid grid-cols-8 border-b border-border/30 glass-subtle sticky top-0 z-10 shadow-sm shadow-black/20">
        <div className="p-3 border-r border-border/20"></div>
        {days.map((date, index) => {
          const isCurrentDay = isToday(date)
          return (
            <div key={index} className={cn("p-2 text-center border-r border-border/20 last:border-r-0 transition-colors", isCurrentDay && "bg-primary/5")}>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">{weekDays[index]}</div>
              <div
                className={cn(
                  "text-base font-medium transition-all w-8 h-8 flex items-center justify-center mx-auto",
                  isCurrentDay 
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-full font-bold shadow-md shadow-amber-500/20" 
                    : "text-foreground/80"
                )}
              >
                {date.getDate()}
              </div>
            </div>
          )
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8 relative">
          {/* Time column */}
          <div className="border-r border-border/20">
            {hours.map((hour) => (
              <div key={hour} className="h-16 border-b border-border/10 p-2 text-[10px] text-muted-foreground/60 font-medium text-right pr-3 flex items-start justify-end">
                {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((date, dayIndex) => (
            <div key={dayIndex} className={cn("border-r border-border/10 last:border-r-0", isToday(date) && "bg-primary/5")}>
              {hours.map((hour) => {
                const timeSlot = new Date(date)
                timeSlot.setHours(hour, 0, 0, 0)
                const events = getCalendarEvents(date).filter(
                  (event) => event.time && Number.parseInt(event.time.split(":")[0]) === hour,
                )

                return (
                  <div
                    key={hour}
                    className="h-16 border-b border-border/10 p-1 cursor-pointer hover:bg-white/[0.03] transition-colors relative group"
                    onClick={() => onDateClick(timeSlot)}
                  >
                    {events.map((event, eventIndex) => {
                      const colorClass = EVENT_COLORS[event.type] || "bg-blue-500"
                      return (
                        <div
                          key={eventIndex}
                          className={cn(
                            "text-[10px] px-2 py-1 rounded-[4px] text-white/90 mb-1 truncate shadow-sm transition-transform group-hover:scale-[1.02]",
                            colorClass
                          )}
                        >
                          {t(event.titleKey)}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
