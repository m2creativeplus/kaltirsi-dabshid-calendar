"use client"

import { useState } from "react"
import { Search, Settings, Menu, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCultural } from "@/components/cultural-provider"
import { CalendarHeader } from "@/components/calendar-header"
import { CalendarSidebar } from "@/components/calendar-sidebar"
import { MonthGrid } from "@/components/month-grid"
import { WeekGrid } from "@/components/week-grid"
import { DayGrid } from "@/components/day-grid"
import { EventModal } from "@/components/event-modal"
import { Id } from "@/convex/_generated/dataModel"
import { KaltirsiEngine, getSeason, MONTHS_SOLAR } from "@/lib/kaltirsi-engine"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, Sun, CloudRain, Cloud, Thermometer } from "lucide-react"
import { SomaliClock } from "@/components/somali-clock"
import { motion } from "framer-motion"

type ViewType = "month" | "week" | "day"

export default function GoogleCalendarView() {
  const { t } = useCultural()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1))
  const [viewType, setViewType] = useState<ViewType>("month")
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<any>(null) // Typed as any for flexibility, ideally match Event interface
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // Kaltirsi Logic
  const kaltirsiDate = KaltirsiEngine.gregorianToKaltirsi(currentDate)
  const season = getSeason(kaltirsiDate.month - 1)
  const star = KaltirsiEngine.getStarSeason(currentDate)

  const SeasonIcon = {
    "Gu'": CloudRain,
    "Xagaa": Sun,
    "Dayr": Cloud,
    "Jiilaal": Thermometer
  }[season.name] || Sun

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

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedEvent(null) // Clear any selected event when creating new
    setShowEventModal(true)
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    // For editing, we use the event's date, or keep current/selected date. 
    // Usually editing doesn't change the calendar view date, but modal needs a date context.
    const eventDate = new Date(event.gregorianDate)
    setSelectedDate(eventDate) 
    setShowEventModal(true)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <CalendarSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onDateSelect={setCurrentDate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-normal text-gray-700">Dabshid Calendar</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search events" className="pl-10 w-64 border-gray-300" />
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-6 pt-6 pb-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-2"
          >
            <Card className={`h-full bg-${season.color}-light border-${season.color} relative overflow-hidden`}>
               <div className={`absolute top-0 right-0 p-4 opacity-10 text-${season.color}-dark`}>
                  <SeasonIcon className="h-32 w-32" />
               </div>
               <CardHeader>
                 <CardTitle className="text-3xl md:text-4xl font-serif">
                   {kaltirsiDate.day} {kaltirsiDate.monthName}
                 </CardTitle>
                 <CardDescription className="text-lg font-medium opacity-90">
                   {kaltirsiDate.year} Kaltirsi
                 </CardDescription>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${season.color} text-white`}>
                      {season.name} Season
                    </span>
                    <span className="text-sm opacity-80 italic">
                      Cycle of {MONTHS_SOLAR[kaltirsiDate.month - 1]}
                    </span>
                 </div>
               </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Xiddigta (Star)</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{star?.name || "Transition"}</div>
              <p className="text-xs text-muted-foreground">{star?.meaning}</p>
              <div className="mt-4 text-xs font-mono bg-muted p-1 rounded">
                 Aligned: {star?.englishName}
              </div>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SomaliClock />
          </motion.div>
        </div>

        {/* Calendar Header */}
        <CalendarHeader
          currentDate={currentDate}
          viewType={viewType}
          onNavigate={navigateDate}
          onToday={goToToday}
          onViewChange={setViewType}
        />

        {/* Calendar Content */}
        <div className="flex-1 overflow-auto">
          {viewType === "month" && (
            <MonthGrid 
              currentDate={currentDate} 
              onDateClick={handleDateClick} 
              onEventClick={handleEventClick}
            />
          )}
          {viewType === "week" && <WeekGrid currentDate={currentDate} onDateClick={handleDateClick} />}
          {viewType === "day" && <DayGrid currentDate={currentDate} onTimeClick={handleDateClick} />}
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
