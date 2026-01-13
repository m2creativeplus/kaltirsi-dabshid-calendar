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

type ViewType = "month" | "week" | "day"

export default function GoogleCalendarView() {
  const { t } = useCultural()
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1))
  const [viewType, setViewType] = useState<ViewType>("month")
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
          {viewType === "month" && <MonthGrid currentDate={currentDate} onDateClick={handleDateClick} />}
          {viewType === "week" && <WeekGrid currentDate={currentDate} onDateClick={handleDateClick} />}
          {viewType === "day" && <DayGrid currentDate={currentDate} onTimeClick={handleDateClick} />}
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && selectedDate && <EventModal date={selectedDate} onClose={() => setShowEventModal(false)} />}
    </div>
  )
}
