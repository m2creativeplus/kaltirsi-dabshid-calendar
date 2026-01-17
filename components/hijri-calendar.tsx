"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addHijriMonth, formatHijriFull, getHijriMonthGrid, getHijriParts } from "@/lib/hijri";

export function HijriCalendar() {
  const [viewDate, setViewDate] = useState(new Date());
  
  const { monthName, days, month: currentHijriMonth } = getHijriMonthGrid(viewDate);
  const today = new Date();
  
  // Get grid padding (empty cells for start of week)
  // Simple approach: start days array with nulls based on first day's weekday
  // Hijri "weeks" still map to standard weekdays (Sun-Sat)
  const startDayOfWeek = days[0].getDay(); // 0 = Sunday
  const emptyStartDays = Array(startDayOfWeek).fill(null);

  const handlePrevMonth = () => {
    setViewDate(addHijriMonth(viewDate, -1));
  };

  const handleNextMonth = () => {
    setViewDate(addHijriMonth(viewDate, 1));
  };

  const jumpToToday = () => {
    setViewDate(new Date());
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-xl shadow-sm bg-card text-card-foreground">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{monthName}</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={jumpToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2 text-center text-sm text-muted-foreground font-medium">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {emptyStartDays.map((_, i) => (
          <div key={`empty-${i}`} className="h-10" />
        ))}
        
        {days.map((date) => {
            const isToday = 
                date.getDate() === today.getDate() && 
                date.getMonth() === today.getMonth() && 
                date.getFullYear() === today.getFullYear();
            
            const hijriParts = getHijriParts(date);
            const dayNum = hijriParts.day;
            
            return (
                <div 
                    key={date.toISOString()}
                    className={cn(
                        "h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors cursor-default hover:bg-accent/50",
                        isToday && "bg-primary text-primary-foreground hover:bg-primary/90 font-bold",
                    )}
                    title={date.toDateString()}
                >
                    {dayNum}
                </div>
            );
        })}
      </div>
      
      <div className="mt-4 text-center text-xs text-muted-foreground">
        Current Date: {formatHijriFull(today)}
      </div>
    </div>
  );
}
