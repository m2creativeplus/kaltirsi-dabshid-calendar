"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { MonthView } from "@/components/month-view"
import { WeekView } from "@/components/week-view"
import { DayView } from "@/components/day-view"
import { getCalendarData } from "@/lib/calendar-utils"

export default function CalendarView() {
  const { t } = useLanguage()
  const [date, setDate] = useState(new Date(2025, 0, 1))
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const calendarData = getCalendarData(date)

  const handlePrevious = () => {
    if (view === "month") {
      setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    } else if (view === "week") {
      const newDate = new Date(date)
      newDate.setDate(date.getDate() - 7)
      setDate(newDate)
    } else {
      const newDate = new Date(date)
      newDate.setDate(date.getDate() - 1)
      setDate(newDate)
    }
  }

  const handleNext = () => {
    if (view === "month") {
      setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    } else if (view === "week") {
      const newDate = new Date(date)
      newDate.setDate(date.getDate() + 7)
      setDate(newDate)
    } else {
      const newDate = new Date(date)
      newDate.setDate(date.getDate() + 1)
      setDate(newDate)
    }
  }

  const handleToday = () => {
    setDate(new Date())
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
        </div>
        <div className="text-lg font-semibold">
          {calendarData.gregorianMonth} {calendarData.year}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-muted/50">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">{calendarData.somaliMonth}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "px-2 py-1 text-xs rounded-full",
                calendarData.season === "Jiilaal" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                calendarData.season === "Gu'" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                calendarData.season === "Xagaa" &&
                  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                calendarData.season === "Dayr" &&
                  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
              )}
            >
              {t(`season.${calendarData.season.toLowerCase()}`)}
            </div>
            <div className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              {calendarData.somaliYear}
            </div>
          </div>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="month">{t("calendar.month")}</TabsTrigger>
            <TabsTrigger value="week">{t("calendar.week")}</TabsTrigger>
            <TabsTrigger value="day">{t("calendar.day")}</TabsTrigger>
          </TabsList>
          <TabsContent value="month">
            <MonthView date={date} />
          </TabsContent>
          <TabsContent value="week">
            <WeekView date={date} />
          </TabsContent>
          <TabsContent value="day">
            <DayView date={date} />
          </TabsContent>
        </Tabs>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Upcoming Events</h3>
          <div className="space-y-2">
            {calendarData.events.map((event, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <div className="flex items-center gap-2">
                  {event.type === "cultural" && <Sun className="h-4 w-4 text-yellow-500" />}
                  {event.type === "astronomical" && <Moon className="h-4 w-4 text-blue-500" />}
                  {event.type === "holiday" && <Calendar className="h-4 w-4 text-red-500" />}
                  <span>{t(event.nameKey)}</span>
                </div>
                <span className="text-sm text-muted-foreground">{event.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
