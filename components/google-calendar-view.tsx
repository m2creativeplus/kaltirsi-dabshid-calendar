"use client"

import { useState, useEffect } from "react"
import { Search, Settings, Menu, Calendar, Flame, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCultural } from "@/components/cultural-provider"
import { CalendarHeader } from "@/components/calendar-header"
import { CalendarSidebar } from "@/components/calendar-sidebar"
import { MonthGrid } from "@/components/month-grid"
import { WeekGrid } from "@/components/week-grid"
import { DayGrid } from "@/components/day-grid"
import { EventModal } from "@/components/event-modal"
import { KaltirsiHexTemporalCanvas } from "@/components/kaltirsi-3d-astrolabe"
import { KaltirsiMonthStoryBanner } from "@/components/kaltirsi-month-story-banner"
import { SomalilandHolidayTimeline } from "@/components/somaliland-holiday-timeline"
import { KaltirsiWeekdayStrip } from "@/components/kaltirsi-weekday-strip"
import { KaltirsiTripleCalendar } from "@/components/kaltirsi-triple-calendar"
import { GoorsheegtaClock } from "@/components/goorsheegta-clock"
import { KaltirsiGrazingIndex } from "@/components/kaltirsi-grazing-index"
import { Id } from "@/convex/_generated/dataModel"
import { KaltirsiEngine, getSeason, MONTHS_SOLAR } from "@/lib/kaltirsi-engine"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, Sun, CloudRain, Cloud, Thermometer, Loader2 } from "lucide-react"
import { SomaliClock } from "@/components/somali-clock"
import { motion, AnimatePresence } from "framer-motion"
import { KaltirsiStats } from "@/components/kaltirsi-stats"
import { cn } from "@/lib/utils"

type ViewType = "month" | "week" | "day"

const SEASON_THEMES: Record<string, { gradient: string; accent: string; glow: string; icon: typeof Sun }> = {
  "Xagaa": {
    gradient: "from-amber-600/20 via-orange-700/15 to-red-900/10",
    accent: "text-amber-400",
    glow: "glow-orange",
    icon: Sun,
  },
  "Dayr": {
    gradient: "from-amber-800/20 via-stone-800/15 to-neutral-900/10",
    accent: "text-amber-600",
    glow: "glow-amber",
    icon: Cloud,
  },
  "Jiilaal": {
    gradient: "from-slate-700/20 via-blue-900/15 to-zinc-900/10",
    accent: "text-blue-400",
    glow: "glow-blue",
    icon: Thermometer,
  },
  "Gu'": {
    gradient: "from-emerald-700/20 via-green-900/15 to-teal-900/10",
    accent: "text-emerald-400",
    glow: "glow-green",
    icon: CloudRain,
  },
}

export default function GoogleCalendarView() {
  const { t } = useCultural()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<ViewType>("month")
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Kaltirsi Logic
  const kaltirsiDate = KaltirsiEngine.gregorianToKaltirsi(currentDate)
  const season = getSeason(kaltirsiDate.month - 1)
  const star = KaltirsiEngine.getStarSeason(currentDate)
  const theme = SEASON_THEMES[season.name] || SEASON_THEMES["Xagaa"]
  const SeasonIcon = theme.icon

  // Days until Dabshid
  const dabshidDate = new Date(currentDate.getFullYear(), 6, 20)
  if (dabshidDate < currentDate) dabshidDate.setFullYear(dabshidDate.getFullYear() + 1)
  const daysToDabshid = Math.ceil((dabshidDate.getTime() - currentDate.getTime()) / (86400000))

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (viewType === "month") {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    } else if (viewType === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => setCurrentDate(new Date())

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setShowEventModal(true)
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    const eventDate = new Date(event.gregorianDate)
    setSelectedDate(eventDate)
    setShowEventModal(true)
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Ambient Glow */}
      <div className={cn("fixed inset-0 pointer-events-none opacity-30 transition-all duration-1000", `bg-gradient-to-br ${theme.gradient}`)} />

      {/* Sidebar */}
      <CalendarSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onDateSelect={setCurrentDate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Header Bar */}
        <div className="border-b border-border/50 glass">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Flame className="h-5 w-5 text-white" />
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-background animate-kaltirsi-pulse" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gradient-gold leading-tight">Dabshid Calendar</h1>
                  <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Kaltirsi Ecological Intelligence</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 w-64 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/8 transition-all placeholder:text-muted-foreground/50"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-white/5">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Intelligence Strip */}
        <div className="px-6 pt-5 pb-3">
          <div className="grid gap-4 md:grid-cols-12">
            {/* Main Kaltirsi Date Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-5"
            >
              <div className={cn("glass rounded-2xl p-5 relative overflow-hidden h-full", theme.glow)}>
                {/* Decorative season orb */}
                <div className={cn("absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 blur-sm", `bg-gradient-to-br ${theme.gradient}`)} />
                <div className="absolute top-4 right-4 opacity-10">
                  <SeasonIcon className="h-20 w-20" />
                </div>

                <div className="relative z-10">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    Kaltirsi Date
                  </div>
                  <div className="text-4xl md:text-5xl font-serif font-bold text-gradient-gold mb-1">
                    {kaltirsiDate.day} {kaltirsiDate.monthName}
                  </div>
                  <div className="text-base text-muted-foreground font-medium mb-4">
                    {kaltirsiDate.year} K.E. — Cycle of {MONTHS_SOLAR[kaltirsiDate.month - 1]}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold glass-subtle", theme.accent)}>
                      <SeasonIcon className="h-3.5 w-3.5" />
                      {season.name} Season
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">
                      {season.nameEnglish}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Star Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-3"
            >
              <div className="glass rounded-2xl p-5 h-full relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  {/* Star field dots */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-amber-300 rounded-full animate-star-twinkle"
                      style={{
                        top: `${15 + (i * 7) % 70}%`,
                        left: `${10 + (i * 11) % 80}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Xiddigta</span>
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400/30" />
                  </div>
                  <div className="text-2xl font-bold text-amber-300 mb-1">{star?.name || "Transition"}</div>
                  <p className="text-xs text-muted-foreground mb-3">{star?.meaning}</p>
                  <div className="px-2 py-1 rounded-md glass-subtle text-[10px] font-mono text-muted-foreground inline-block">
                    ★ {star?.englishName}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Clock + Dabshid Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-4"
            >
              <div className="grid grid-rows-2 gap-3 h-full">
                <SomaliClock />
                {/* Dabshid Countdown */}
                <div className="glass rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Dabshid Festival</div>
                    <div className="text-2xl font-bold text-gradient-gold">{daysToDabshid}</div>
                    <div className="text-[10px] text-muted-foreground">days remaining</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center animate-kaltirsi-pulse">
                    <Flame className="h-6 w-6 text-amber-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats */}
        <KaltirsiStats />

        {/* Somali Weekday Strip */}
        <KaltirsiWeekdayStrip />

        {/* Calendar Header with View Switcher */}
        <CalendarHeader
          currentDate={currentDate}
          viewType={viewType}
          onNavigate={navigateDate}
          onToday={goToToday}
          onViewChange={setViewType}
        />

        {/* Content Area — View-Dependent */}
        <div className="flex-1 overflow-auto">
          {/* DAY VIEW: Maalin — Goorsheegta Clock + Day Grid + Triple Calendar */}
          {viewType === "day" && (
            <div className="px-6 py-4 space-y-6">
              <KaltirsiMonthStoryBanner />
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 space-y-6">
                  <GoorsheegtaClock />
                  <DayGrid currentDate={currentDate} onTimeClick={handleDateClick} />
                </div>
                <div className="lg:col-span-2 overflow-y-auto max-h-[900px] pr-2 space-y-6">
                  <KaltirsiTripleCalendar />
                  <SomalilandHolidayTimeline />
                </div>
              </div>
            </div>
          )}

          {/* MONTH VIEW: Bil */}
          {viewType === "month" && (
            <div className="px-6 py-4 space-y-6">
              <KaltirsiMonthStoryBanner />
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 space-y-6">
                  <MonthGrid
                    currentDate={currentDate}
                    onDateClick={handleDateClick}
                    onEventClick={handleEventClick}
                  />
                  <KaltirsiGrazingIndex />
                  <KaltirsiTripleCalendar />
                </div>
                <div className="lg:col-span-2 overflow-y-auto max-h-[1200px] pr-2 space-y-6">
                  <GoorsheegtaClock />
                  <SomalilandHolidayTimeline />
                </div>
              </div>
            </div>
          )}

          {/* YEAR VIEW: Sannad */}
          {viewType === "week" && (
            <div className="px-6 py-4 space-y-6">
              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <KaltirsiHexTemporalCanvas />
                </div>
                <div className="lg:col-span-2 overflow-y-auto max-h-[600px] pr-2">
                  <SomalilandHolidayTimeline />
                </div>
              </div>
              <KaltirsiGrazingIndex />
              <KaltirsiTripleCalendar />
              <KaltirsiMonthStoryBanner />
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && selectedDate && (
        <EventModal
          date={selectedDate}
          event={selectedEvent}
          onClose={() => {
            setShowEventModal(false)
            setSelectedEvent(null)
          }}
        />
      )}
    </div>
  )
}
