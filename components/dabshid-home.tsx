"use client"

import * as React from "react"
import { CalendarGrid } from "@/components/calendar-grid"
import { SomaliClock } from "@/components/somali-clock"
import { KaltirsiEngine, getSeason, MONTHS_SOLAR } from "@/lib/kaltirsi-engine"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, Sun, CloudRain, Cloud, Thermometer } from "lucide-react"

export function DabshidHome() {
  const [today, setToday] = React.useState<Date | null>(null)

  React.useEffect(() => {
    setToday(new Date())
  }, [])

  if (!today) return null

  const kaltirsiDate = KaltirsiEngine.gregorianToKaltirsi(today)
  const season = getSeason(kaltirsiDate.month - 1)
  const star = KaltirsiEngine.getStarSeason(today)

  const SeasonIcon = {
    "Gu'": CloudRain,
    "Xagaa": Sun,
    "Dayr": Cloud,
    "Jiilaal": Thermometer
  }[season.name] || Sun

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-5xl">
      {/* Header / Hero */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Kaltirsi Date Card */}
        <Card className={`col-span-2 bg-${season.color}-light border-${season.color} relative overflow-hidden`}>
           <div className={`absolute top-0 right-0 p-4 opacity-10 text-${season.color}-dark`}>
              <SeasonIcon className="h-32 w-32" />
           </div>
           <CardHeader>
             <CardTitle className="text-3xl md:text-4xl font-serif text-primary-dark">
               {kaltirsiDate.day} {kaltirsiDate.monthName}
             </CardTitle>
             <CardDescription className="text-lg font-medium text-muted-foreground">
               {kaltirsiDate.year} Kaltirsi
             </CardDescription>
           </CardHeader>
           <CardContent>
             <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${season.color} text-white`}>
                  {season.name} Season
                </span>
                <span className="text-sm text-muted-foreground italic">
                  Cycle of {MONTHS_SOLAR[kaltirsiDate.month - 1]}
                </span>
             </div>
           </CardContent>
        </Card>

        {/* Star Season Card */}
        <Card>
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

        {/* Somali Clock Widget */}
        <SomaliClock />
      </div>

      {/* Main Calendar Grid */}
      <CalendarGrid />
      
      {/* Footer / Quote */}
      <div className="text-center text-sm text-muted-foreground mt-8 p-4 bg-muted/20 rounded-xl">
        <p className="italic font-serif">"Nin aan dhulkiisa aqoon, dhaqankiisa ma yaqaan."</p>
        <p className="text-xs mt-1">(He who doesn't know his land, doesn't know his culture)</p>
      </div>
    </div>
  )
}
