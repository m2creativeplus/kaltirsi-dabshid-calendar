"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, MapPin, Leaf, Star, Sun, Droplets, AlertTriangle, ChevronRight } from "lucide-react"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { cn } from "@/lib/utils"

const REGIONS = [
  { id: "somaliland", label: "Somaliland", lat: 9.56, lon: 44.065 },
  { id: "puntland", label: "Puntland", lat: 9.05, lon: 49.37 },
  { id: "mogadishu", label: "S. Somalia", lat: 2.05, lon: 45.34 },
  { id: "djibouti", label: "Djibouti", lat: 11.58, lon: 43.14 },
  { id: "somali_eth", label: "Somali (ETH)", lat: 7.94, lon: 44.94 },
]

interface RegionClimate {
  region: string
  temp: number
  precip: number
  grazingIndex: number
  status: "Excellent" | "Good" | "Moderate" | "Critical"
  color: string
}

async function fetchRegion(lat: number, lon: number): Promise<{ temp: number; precip: number; humidity: number }> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=precipitation,relativehumidity_2m&timezone=auto&forecast_days=1`
  )
  const data = await res.json()
  const hourIdx = new Date().getHours()
  return {
    temp: data.current_weather.temperature,
    precip: data.hourly?.precipitation?.[hourIdx] ?? 0,
    humidity: data.hourly?.relativehumidity_2m?.[hourIdx] ?? 40,
  }
}

function grazingScore(temp: number, precip: number, humidity: number) {
  const tempStress = temp > 38 ? 0 : temp > 30 ? 0.5 : 1
  const rainfallNorm = Math.min(precip / 5, 1)
  const humidityNorm = Math.min(humidity / 80, 1)
  const raw = (humidityNorm * 0.25 + rainfallNorm * 0.35 + tempStress * 0.4) * 10
  const idx = Math.round(raw * 10) / 10
  if (idx >= 7) return { idx, status: "Excellent" as const, color: "bg-green-500" }
  if (idx >= 5) return { idx, status: "Good" as const, color: "bg-lime-500" }
  if (idx >= 3) return { idx, status: "Moderate" as const, color: "bg-yellow-500" }
  return { idx, status: "Critical" as const, color: "bg-red-500" }
}

export function EcologicalIntelligence() {
  const now = new Date()
  const kDate = KaltirsiEngine.gregorianToKaltirsi(now)
  const godka = KaltirsiEngine.getCurrentGodka(now)
  const goorsheegta = KaltirsiEngine.getCurrentGoorsheegta(now)
  const season = KaltirsiEngine.getSeasonFromKDate(kDate)
  const [regionData, setRegionData] = useState<RegionClimate[]>([])
  const [loadingRegions, setLoadingRegions] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          REGIONS.map(async (r) => {
            try {
              const d = await fetchRegion(r.lat, r.lon)
              const g = grazingScore(d.temp, d.precip, d.humidity)
              return {
                region: r.label,
                temp: d.temp,
                precip: d.precip,
                grazingIndex: g.idx,
                status: g.status,
                color: g.color,
              } as RegionClimate
            } catch {
              return { region: r.label, temp: 0, precip: 0, grazingIndex: 0, status: "Critical" as const, color: "bg-red-500" }
            }
          })
        )
        setRegionData(results)
      } finally {
        setLoadingRegions(false)
      }
    }
    fetchAll()
  }, [])

  const seasonColors: Record<string, string> = {
    "Xagaa": "from-yellow-900/40 to-orange-900/30",
    "Dayr": "from-blue-900/40 to-cyan-900/30",
    "Jiilaal": "from-slate-800/60 to-zinc-900/40",
    "Gu'": "from-green-900/40 to-emerald-900/30",
  }

  return (
    <div className="space-y-4">
      {/* Master Header Card */}
      <Card className={cn("overflow-hidden border-0 bg-gradient-to-br", seasonColors[season?.name ?? "Xagaa"] ?? "from-slate-900/50")}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Kaltirsi Intelligence</div>
              <h2 className="text-xl font-bold">{kDate.monthName}</h2>
              <div className="text-sm text-muted-foreground">Month {kDate.month} · Day {kDate.day} · {kDate.year} K.E.</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-orange-400">{season?.name}</div>
              <div className="text-xs text-muted-foreground">{season?.nameEnglish}</div>
            </div>
          </div>

          {/* Godka + Goorsheegta inline */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-black/20 border border-white/5 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Active Goddad</span>
              </div>
              <div className="font-bold text-yellow-300 text-sm">{godka?.nameSomali ?? "—"}</div>
              <div className="text-[10px] text-muted-foreground">{godka?.mainStar} · #{godka?.number ?? "—"}/28</div>
            </div>
            <div className="rounded-xl bg-black/20 border border-white/5 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Sun className="h-3.5 w-3.5 text-orange-400" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Goorsheegta</span>
              </div>
              <div className="font-bold text-orange-300 text-sm">{goorsheegta?.nameSomali ?? "—"}</div>
              <div className="text-[10px] text-muted-foreground">{goorsheegta?.timeRange}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Intelligence */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-orange-500" />
            <h3 className="font-semibold text-sm">5-Region Grazing Intelligence</h3>
            {loadingRegions && <span className="text-[10px] text-muted-foreground animate-pulse ml-auto">Loading…</span>}
          </div>

          <div className="space-y-2">
            {loadingRegions
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-9 bg-muted/40 rounded-lg animate-pulse" />
                ))
              : regionData.map((r) => (
                  <div key={r.region} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-24 text-xs font-medium shrink-0">{r.region}</div>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all", r.color)} style={{ width: `${r.grazingIndex * 10}%` }} />
                    </div>
                    <div className="flex items-center gap-1 text-[10px] shrink-0">
                      <Thermometer className="h-3 w-3 text-orange-400" />
                      {r.temp}°
                    </div>
                    <span className={cn(
                      "text-[10px] font-semibold shrink-0 w-14 text-right",
                      r.status === "Excellent" && "text-green-400",
                      r.status === "Good" && "text-lime-400",
                      r.status === "Moderate" && "text-yellow-400",
                      r.status === "Critical" && "text-red-400",
                    )}>
                      {r.status}
                    </span>
                  </div>
                ))
            }
          </div>
        </CardContent>
      </Card>

      {/* Pastoralist guidance */}
      {goorsheegta && (
        <Card className="border-amber-900/30 bg-amber-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Activity className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-amber-300 mb-1">Now Active: {goorsheegta.nameSomali}</div>
                <p className="text-xs text-muted-foreground">{goorsheegta.pastoralistGuidance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ← small re-export so Thermometer isn't missing
function Thermometer({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  )
}
