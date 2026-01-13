"use client"

import { useCultural } from "@/components/cultural-provider"
import { cn } from "@/lib/utils"
import { getCalendarEvents } from "@/lib/calendar-events"

interface DayGridProps {
  currentDate: Date
  onTimeClick: (date: Date) => void
}

export function DayGrid({ currentDate, onTimeClick }: DayGridProps) {
  const { t } = useCultural()
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const events = getCalendarEvents(currentDate)

  return (
    <div className="flex flex-col h-full">
      {/* Day header */}
      <div className="border-b border-gray-200 bg-white p-4">
        <h2 className="text-2xl font-normal">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h2>
        <div className="mt-2 text-sm text-gray-600">{events.length} events scheduled</div>
      </div>

      {/* Time slots */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-12 gap-4 p-4">
          {/* Time column */}
          <div className="col-span-2">
            {hours.map((hour) => (
              <div key={hour} className="h-16 flex items-start pt-2">
                <span className="text-xs text-gray-500">
                  {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                </span>
              </div>
            ))}
          </div>

          {/* Events column */}
          <div className="col-span-10">
            {hours.map((hour) => {
              const timeSlot = new Date(currentDate)
              timeSlot.setHours(hour, 0, 0, 0)
              const hourEvents = events.filter(
                (event) => event.time && Number.parseInt(event.time.split(":")[0]) === hour,
              )

              return (
                <div
                  key={hour}
                  className="h-16 border-b border-gray-100 cursor-pointer hover:bg-gray-50 p-2 relative"
                  onClick={() => onTimeClick(timeSlot)}
                >
                  {hourEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={cn(
                        "p-2 rounded mb-1 text-white text-sm",
                        event.type === "cultural" && "bg-orange-500",
                        event.type === "agricultural" && "bg-green-500",
                        event.type === "astronomical" && "bg-purple-500",
                        event.type === "holiday" && "bg-red-500",
                      )}
                    >
                      <div className="font-medium">{t(event.titleKey)}</div>
                      {event.time && <div className="text-xs opacity-90">{event.time}</div>}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
