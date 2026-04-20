"use client"

import { ChevronLeft, ChevronRight, Grid3X3, Calendar, Clock, Sun, CloudRain, Thermometer, Leaf } from "lucide-react"
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

const SEASON_BADGE: Record<string, { icon: typeof Sun; bg: string; text: string }> = {
  "Jiilaal": { icon: Thermometer, bg: "bg-blue-500/15 border-blue-500/30", text: "text-blue-400" },
  "Gu'":     { icon: CloudRain,   bg: "bg-emerald-500/15 border-emerald-500/30", text: "text-emerald-400" },
  "Xagaa":   { icon: Sun,         bg: "bg-amber-500/15 border-amber-500/30", text: "text-amber-400" },
  "Dayr":    { icon: Leaf,        bg: "bg-stone-500/15 border-amber-700/30", text: "text-amber-600" },
}

export function CalendarHeader({ currentDate, viewType, onNavigate, onToday, onViewChange }: CalendarHeaderProps) {
  const { t } = useCultural()
  const kaltirsiDate = KaltirsiEngine.gregorianToKaltirsi(currentDate)
  const season = getSeason(currentDate)
  const badge = SEASON_BADGE[season] || SEASON_BADGE["Xagaa"]
  const SeasonIcon = badge.icon

  const formatHeaderDate = () => {
    const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" }

    if (viewType === "week") {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.getDate()} – ${endOfWeek.getDate()} ${startOfWeek.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`
      }
      return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
    }

    if (viewType === "day") {
      return currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    }

    return currentDate.toLocaleDateString("en-US", options)
  }

  return (
    <div className="border-b border-border/40 glass-subtle px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onToday}
            className="text-amber-400 border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300 bg-transparent text-xs font-semibold tracking-wide"
          >
            {t("today")}
          </Button>

          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" onClick={() => onNavigate("prev")} className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onNavigate("next")} className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-foreground leading-tight">{formatHeaderDate()}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground font-medium">
                {kaltirsiDate.monthName} {kaltirsiDate.day}, {kaltirsiDate.year}
              </span>
              <span className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                badge.bg, badge.text
              )}>
                <SeasonIcon className="h-3 w-3" />
                {season}
              </span>
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-0.5 glass-subtle rounded-lg p-1">
          {([
            { key: "day" as const, icon: Clock, label: "Maalin" },
            { key: "week" as const, icon: Calendar, label: "Toddobaad" },
            { key: "month" as const, icon: Grid3X3, label: "Bil" },
          ]).map(({ key, icon: Icon, label }) => (
            <Button
              key={key}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(key)}
              className={cn(
                "h-8 text-xs font-medium transition-all",
                viewType === key
                  ? "bg-primary/15 text-primary shadow-sm border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <Icon className="h-3.5 w-3.5 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
