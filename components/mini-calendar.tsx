"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MiniCalendarProps {
  onDateSelect: (date: Date) => void
}

export function MiniCalendar({ onDateSelect }: MiniCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = new Date()

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const days = getDaysInMonth()
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"]

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigateMonth("prev")}>
          <ChevronLeft className="h-3 w-3" />
        </Button>

        <span className="text-sm font-medium">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>

        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigateMonth("next")}>
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs text-gray-500 font-medium p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <button
            key={index}
            className={cn(
              "h-6 w-6 text-xs rounded hover:bg-gray-100 flex items-center justify-center",
              date && isToday(date) && "bg-blue-600 text-white hover:bg-blue-700",
              !date && "cursor-default",
            )}
            onClick={() => date && onDateSelect(date)}
            disabled={!date}
          >
            {date?.getDate()}
          </button>
        ))}
      </div>
    </div>
  )
}
