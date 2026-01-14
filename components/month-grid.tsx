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

    // Previous month days
    const prevMonth = new Date(year, month - 1, 0)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonth.getDate() - i)
      days.push({ date, isCurrentMonth: false })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({ date, isCurrentMonth: true })
    }

    // Next month days to fill the grid
    const remainingCells = 42 - days.length // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day)
      days.push({ date, isCurrentMonth: false })
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

  const days = getDaysInMonth()
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  // Calculate range for query
  // We use the first and last visible day in the grid
  const startDate = days[0].date.toISOString().split('T')[0]
  const endDate = days[days.length - 1].date.toISOString().split('T')[0]

  const userEvents = useQuery(api.events.getEvents, { startDate, endDate }) || []

  return (
    <div className="flex flex-col h-full">
      {/* Week header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-gray-500 border-r border-gray-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-6">
        {days.map(({ date, isCurrentMonth }, index) => {
          const dateStr = date.toISOString().split('T')[0]
          
          // Kaltirsi Data
          const kaltirsi = KaltirsiEngine.gregorianToKaltirsi(date)
          const daySeason = getSeason(kaltirsi.month - 1)

          // Combine hardcoded cultural events with dynamic user events
          const culturalEvents = getCalendarEvents(date)
          const dailyUserEvents = userEvents
            .filter(e => e.gregorianDate === dateStr)
            .map(e => ({
              titleKey: e.title, // Treat title as key for rendering consistency or direct string
              type: e.eventType,
              isUserEvent: true,
              // Map user event types to standard types for color logic if needed
              ...e
            }))

          // Merge events - careful with typing. Simple view for now.
          const allEvents = [
            ...culturalEvents.map(e => ({ ...e, title: t(e.titleKey) })),
            ...dailyUserEvents.map(e => ({ ...e, title: e.titleKey }))
          ]

          const isCurrentDay = isToday(date)

          return (
            <div
              key={index}
              className={cn(
                "group relative border-r border-b border-gray-200 last:border-r-0 p-2 min-h-[120px] cursor-pointer hover:bg-gray-50 transition-colors",
                !isCurrentMonth && "bg-gray-50/50 text-gray-400",
                isCurrentDay && "bg-accent/10"
              )}
              onClick={() => onDateClick(date)}
            >
              {/* Seasonal Stripe */}
              <div className={`absolute top-0 left-0 w-1 h-full bg-${daySeason.color} opacity-40 group-hover:opacity-100 transition-opacity`} />

              {/* Header Row: Gregorian Left, Kaltirsi Right */}
              <div className="flex justify-between items-start mb-1">
                 <div
                    className={cn(
                      "text-sm font-medium transition-all",
                      isCurrentDay 
                        ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                        : "text-gray-700" 
                    )}
                  >
                    {date.getDate()}
                  </div>
                  
                  <div className="text-[10px] text-muted-foreground font-semibold opacity-70">
                    {kaltirsi.day} <span className="hidden sm:inline">{kaltirsi.monthName.slice(0,3)}</span>
                  </div>
              </div>

              {/* Events */}
              <div className="space-y-1 pl-2">
                {allEvents.slice(0, 4).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded text-white truncate shadow-sm cursor-pointer hover:opacity-90",
                      event.type === "cultural" && "bg-orange-500",
                      event.type === "agricultural" && "bg-green-600",
                      event.type === "astronomical" && "bg-purple-600",
                      event.type === "holiday" && "bg-red-500",
                      // User personal events if not typed
                      !["cultural", "agricultural", "astronomical", "holiday"].includes(event.type) && "bg-blue-500"
                    )}
                    title={event.title}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onEventClick && event.isUserEvent) {
                        onEventClick(event)
                      }
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                {allEvents.length > 4 && (
                  <div className="text-[10px] text-gray-500 font-medium pl-1">
                    +{allEvents.length - 4} more
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
