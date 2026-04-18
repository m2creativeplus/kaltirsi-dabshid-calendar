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

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

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
    <div className="glass-subtle rounded-xl p-3 shadow-inner shadow-white/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-white/10" onClick={() => navigateMonth("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-xs font-semibold tracking-wide text-foreground/90">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-white/10" onClick={() => navigateMonth("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 mb-1">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center text-[10px] uppercase text-muted-foreground font-semibold p-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((date, index) => (
          <button
            key={index}
            className={cn(
              "h-7 w-8 mx-auto text-xs rounded-md flex items-center justify-center transition-all duration-200",
              date && isToday(date) 
                ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold shadow-sm shadow-amber-500/20" 
                : date 
                  ? "hover:bg-white/10 text-foreground/80 hover:text-foreground" 
                  : "cursor-default text-transparent",
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
