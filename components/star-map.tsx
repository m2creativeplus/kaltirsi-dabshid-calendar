"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Clock } from "lucide-react"
import { KaltirsiEngine, GODKA_28, GOORSHEEGTA } from "@/lib/kaltirsi-engine"

export function StarMap() {
  const now = new Date()
  const starSeason = KaltirsiEngine.getStarSeason(now)
  const kDate = KaltirsiEngine.gregorianToKaltirsi(now)
  const godka = KaltirsiEngine.getCurrentGodka(now)
  const goorsheegta = KaltirsiEngine.getCurrentGoorsheegta(now)
  const somaliTime = KaltirsiEngine.getSomaliTime(now)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Xiddigaha & Wakhtiga</h3>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {somaliTime}
          </div>
        </div>

        {/* Active Star / Goddad */}
        <div className="rounded-lg bg-indigo-950/60 p-2.5 border border-indigo-800/40">
          <div className="flex items-start gap-2">
            <div className="mt-0.5">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-yellow-300">
                {godka ? `Goddad ${godka.number}: ${godka.nameSomali}` : starSeason?.name ?? "—"}
              </div>
              <div className="text-[10px] text-indigo-300">
                {godka?.mainStar ?? starSeason?.englishName} · {godka?.weatherPattern ?? starSeason?.meaning}
              </div>
              {godka?.agriculturalSignificance && (
                <div className="text-[10px] text-muted-foreground mt-1 italic">
                  "{godka.agriculturalSignificance}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Goorsheegta segment */}
        {goorsheegta && (
          <div className="rounded-lg bg-muted/40 p-2.5">
            <div className="text-[10px] text-muted-foreground mb-0.5">Goorsheegta (Now)</div>
            <div className="text-xs font-semibold text-orange-400">{goorsheegta.nameSomali}</div>
            <div className="text-[10px] text-muted-foreground">{goorsheegta.timeRange} · {goorsheegta.description}</div>
            <div className="text-[10px] text-amber-400 mt-1">
              📊 Livestock: {goorsheegta.pastoralistGuidance}
            </div>
          </div>
        )}

        {/* Current Kaltirsi Month context */}
        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-border pt-2">
          <span>Kaltirsi: {kDate.monthName} {kDate.day}</span>
          <span className="text-indigo-400">{kDate.year} K.E.</span>
        </div>
      </CardContent>
    </Card>
  )
}
