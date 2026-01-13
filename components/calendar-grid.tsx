"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KaltirsiEngine, MONTHS_SOLAR, getSeason } from "@/lib/kaltirsi-engine"
import { getHolidaysForDate } from "@/lib/holidays"
import { cn } from "@/lib/utils"

export function CalendarGrid() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [viewMode, setViewMode] = React.useState<"gregorian" | "kaltirsi" | "hijri">("gregorian")

  // Helper to change months
  const addMonths = (n: number) => {
    const d = new Date(currentDate)
    d.setMonth(d.getMonth() + n)
    setCurrentDate(d)
  }

  // Generate grid days
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay() // 0 = Sunday

  const days = []
  // Padding for empty start
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }

  const monthName = currentDate.toLocaleString('default', { month: 'long' })
  const season = getSeason(KaltirsiEngine.gregorianToKaltirsi(currentDate).month - 1)

  return (
    <Card className="w-full shadow-lg border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div className="flex items-center space-x-2">
          <CalendarIcon className={`h-5 w-5 text-${season.color}`} />
          <CardTitle className="text-xl font-serif">
            {monthName} {year}
          </CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => addMonths(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => addMonths(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <div className="flex justify-end px-6 mb-2">
         {/* Toggle Logic Placeholder - can be separate component */}
         <div className="text-xs space-x-2 text-muted-foreground">
            <span className={viewMode === 'gregorian' ? "text-primary font-bold" : "cursor-pointer"} onClick={() => setViewMode('gregorian')}>Gregorian</span>
            <span>|</span>
            <span className={viewMode === 'kaltirsi' ? "text-primary font-bold" : "cursor-pointer"} onClick={() => setViewMode('kaltirsi')}>Kaltirsi</span>
            <span>|</span>
            <span className={viewMode === 'hijri' ? "text-primary font-bold" : "cursor-pointer"} onClick={() => setViewMode('hijri')}>Hijri</span>
         </div>
      </div>

      <CardContent className="p-0">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-border bg-muted/30">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
             <div key={day} className="py-2 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
               <span className="md:hidden">{day.charAt(0)}</span>
               <span className="hidden md:inline">{day}</span>
             </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-fr">
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="h-24 md:h-32 border-b border-r border-border/50 bg-background/50" />
            
            const kaltirsi = KaltirsiEngine.gregorianToKaltirsi(date)
            const hijriStr = KaltirsiEngine.getHijriDate(date).split(' ')[0] // Just the day number roughly
            const holidays = getHolidaysForDate(date)
            const isToday = date.toDateString() === new Date().toDateString()
            
            // Season for this specific day (changes mid-Gregorian month sometimes, but strictly Kaltirsi months drive season)
            const daySeason = getSeason(kaltirsi.month - 1)

            return (
              <div 
                key={date.toISOString()} 
                className={cn(
                  "relative h-24 md:h-32 p-2 border-b border-r border-border/50 transition-colors hover:bg-muted/10 group",
                  isToday && "bg-accent/20"
                )}
              >
                {/* Visual Season Stripe */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-${daySeason.color}-DEFAULT opacity-50`} />

                {/* Gregorian (Primary) */}
                <span className={cn(
                  "block text-sm font-medium",
                  isToday ? "text-primary font-bold" : "text-foreground"
                )}>
                  {date.getDate()}
                </span>

                {/* Kaltirsi (Secondary) */}
                <span className="absolute top-2 right-2 text-[10px] text-muted-foreground font-semibold">
                   {kaltirsi.day} <span className="hidden sm:inline">{kaltirsi.monthName.slice(0,3)}</span>
                </span>
                
                {/* Hijri (Tertiary) */}
                <span className="absolute bottom-2 right-2 text-[9px] text-muted-foreground/60 italic">
                   {hijriStr}H
                </span>

                {/* Holiday Marker */}
                {holidays.length > 0 && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-destructive mx-auto mb-1" />
                    <span className="hidden md:block text-[9px] leading-tight truncate text-destructive font-medium text-center">
                      {holidays[0].name}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
