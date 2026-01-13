"use client"

import { useCultural } from "@/components/cultural-provider"
import { cn } from "@/lib/utils"
import { getCalendarEvents } from "@/lib/calendar-events"

interface WeekGridProps {
  currentDate: Date
  onDateClick: (date: Date) => void
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
    <div className="flex flex-col h-full">
      {/* Week header */}
      <div className="grid grid-cols-8 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="p-3 border-r border-gray-200"></div>
        {days.map((date, index) => {
          const isCurrentDay = isToday(date)
          return (
            <div key={index} className="p-3 text-center border-r border-gray-200 last:border-r-0">
              <div className="text-xs text-gray-500 mb-1">{weekDays[index]}</div>
              <div
                className={cn(
                  "text-lg font-medium",
                  isCurrentDay &&
                    "bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto",
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
        <div className="grid grid-cols-8">
          {/* Time column */}
          <div className="border-r border-gray-200">
            {hours.map((hour) => (
              <div key={hour} className="h-16 border-b border-gray-200 p-2 text-xs text-gray-500">
                {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((date, dayIndex) => (
            <div key={dayIndex} className="border-r border-gray-200 last:border-r-0">
              {hours.map((hour) => {
                const timeSlot = new Date(date)
                timeSlot.setHours(hour, 0, 0, 0)
                const events = getCalendarEvents(date).filter(
                  (event) => event.time && Number.parseInt(event.time.split(":")[0]) === hour,
                )

                return (
                  <div
                    key={hour}
                    className="h-16 border-b border-gray-200 p-1 cursor-pointer hover:bg-gray-50 relative"
                    onClick={() => onDateClick(timeSlot)}
                  >
                    {events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={cn(
                          "text-xs px-2 py-1 rounded text-white mb-1 truncate",
                          event.type === "cultural" && "bg-orange-500",
                          event.type === "agricultural" && "bg-green-500",
                          event.type === "astronomical" && "bg-purple-500",
                          event.type === "holiday" && "bg-red-500",
                        )}
                      >
                        {t(event.titleKey)}
                      </div>
                    ))}
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
