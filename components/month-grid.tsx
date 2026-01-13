"use client"

import { useCultural } from "@/components/cultural-provider"
import { cn } from "@/lib/utils"
import { getCalendarEvents } from "@/lib/calendar-events"

interface MonthGridProps {
  currentDate: Date
  onDateClick: (date: Date) => void
}

export function MonthGrid({ currentDate, onDateClick }: MonthGridProps) {
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
          const events = getCalendarEvents(date)
          const isCurrentDay = isToday(date)

          return (
            <div
              key={index}
              className={cn(
                "border-r border-b border-gray-200 last:border-r-0 p-2 min-h-[120px] cursor-pointer hover:bg-gray-50",
                !isCurrentMonth && "bg-gray-50 text-gray-400",
              )}
              onClick={() => onDateClick(date)}
            >
              <div
                className={cn(
                  "text-sm font-medium mb-1",
                  isCurrentDay && "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center",
                )}
              >
                {date.getDate()}
              </div>

              {/* Events */}
              <div className="space-y-1">
                {events.slice(0, 3).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={cn(
                      "text-xs px-2 py-1 rounded text-white truncate",
                      event.type === "cultural" && "bg-orange-500",
                      event.type === "agricultural" && "bg-green-500",
                      event.type === "astronomical" && "bg-purple-500",
                      event.type === "holiday" && "bg-red-500",
                    )}
                  >
                    {t(event.titleKey)}
                  </div>
                ))}
                {events.length > 3 && <div className="text-xs text-gray-500">+{events.length - 3} more</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
