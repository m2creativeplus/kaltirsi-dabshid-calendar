"use client"

import { ChevronLeft, ChevronRight, Grid3X3, Calendar, Clock, Sun, CloudRain, ThermometerSun, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCultural } from "@/components/cultural-provider"
import { KaltirsiEngine } from "../lib/kaltirsi-engine"
import { getSeason } from "@/lib/calendar-utils"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CalendarHeaderProps {
  currentDate: Date
  viewType: "month" | "week" | "day"
  onNavigate: (direction: "prev" | "next") => void
  onToday: () => void
  onViewChange: (view: "month" | "week" | "day") => void
}

export function CalendarHeader({ currentDate, viewType, onNavigate, onToday, onViewChange }: CalendarHeaderProps) {
  const { t } = useCultural()

  // Calculate Kaltirsi Date and Season
  const kaltirsiDate = KaltirsiEngine.gregorianToKaltirsi(currentDate)
  const season = getSeason(currentDate)

  const getSeasonIcon = (seasonName: string) => {
    switch (seasonName) {
      case "Jiilaal": return <ThermometerSun className="h-4 w-4" />
      case "Gu'": return <CloudRain className="h-4 w-4" />
      case "Xagaa": return <Sun className="h-4 w-4" />
      case "Dayr": return <Leaf className="h-4 w-4" />
      default: return <Sun className="h-4 w-4" />
    }
  }

  const getSeasonColor = (seasonName: string) => {
    switch (seasonName) {
      case "Jiilaal": return "bg-orange-100 text-orange-800 border-orange-200"
      case "Gu'": return "bg-green-100 text-green-800 border-green-200"
      case "Xagaa": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Dayr": return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatHeaderDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    }

    if (viewType === "week") {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.getDate()} – ${endOfWeek.getDate()} ${startOfWeek.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`
      } else {
        return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      }
    }

    if (viewType === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    }

    return currentDate.toLocaleDateString("en-US", options)
  }

  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex flex-col gap-4">
        {/* Top Row: Navigation and Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onToday}
              className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
            >
              {t("today")}
            </Button>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => onNavigate("prev")}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onNavigate("next")}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col">
              <h2 className="text-xl font-normal text-gray-900">{formatHeaderDate()}</h2>
              {/* Kaltirsi Date Subtitle */}
              <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                <span>{kaltirsiDate.monthName} {kaltirsiDate.day}, {kaltirsiDate.year}</span>
                <Badge variant="outline" className={cn("gap-1 font-normal", getSeasonColor(season))}>
                  {getSeasonIcon(season)}
                  {season}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewType === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("month")}
              className={viewType === "month" ? "bg-white shadow-sm" : ""}
            >
              <Grid3X3 className="h-4 w-4 mr-1" />
              Month
            </Button>
            <Button
              variant={viewType === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("week")}
              className={viewType === "week" ? "bg-white shadow-sm" : ""}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Week
            </Button>
            <Button
              variant={viewType === "day" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("day")}
              className={viewType === "day" ? "bg-white shadow-sm" : ""}
            >
              <Clock className="h-4 w-4 mr-1" />
              Day
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
