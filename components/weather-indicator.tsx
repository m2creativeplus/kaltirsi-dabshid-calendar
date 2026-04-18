"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CloudRain, Sun, Wind, Thermometer, Droplets, AlertTriangle, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

interface WeatherData {
  temperature: number
  windspeed: number
  winddirection: number
  precipitation: number
  weathercode: number
  humidity: number
}

interface GrazingState {
  index: number        // 0–10
  label: string
  labelSomali: string
  color: string
  alerts: string[]
}

// Hargeisa, Somaliland coords
const LAT = 9.56
const LON = 44.065

function computeGrazingIndex(temp: number, precip: number, humidity: number): GrazingState {
  // Normalized components (α=0.4, β=0.35, γ=0.25)
  const tempStress = temp > 38 ? 0 : temp > 30 ? 0.5 : 1
  const rainfallNorm = Math.min(precip / 5, 1)           // cap at 5mm/hr = 1.0
  const humidityNorm = Math.min(humidity / 80, 1)
  const raw = (humidityNorm * 0.25 + rainfallNorm * 0.35 + tempStress * 0.4) * 10
  const index = Math.round(raw * 10) / 10

  const alerts: string[] = []
  if (temp > 40) alerts.push("Extreme heat — water scarcity risk")
  if (precip === 0 && humidity < 30) alerts.push("Drought conditions active")
  if (index < 3) alerts.push("Critical grazing stress")

  if (index >= 7) return { index, label: "Excellent", labelSomali: "Aad u wanaagsan", color: "text-green-500", alerts }
  if (index >= 5) return { index, label: "Good", labelSomali: "Wanaagsan", color: "text-lime-500", alerts }
  if (index >= 3) return { index, label: "Moderate", labelSomali: "Dhexdhexaad", color: "text-yellow-500", alerts }
  return { index, label: "Critical", labelSomali: "Khatar", color: "text-red-500", alerts }
}

function windDirLabel(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  return dirs[Math.round(deg / 45) % 8]
}

export function WeatherIndicator() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [grazing, setGrazing] = useState<GrazingState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=precipitation,relativehumidity_2m&timezone=Africa%2FNairobi&forecast_days=1`
        )
        const data = await res.json()
        const cw = data.current_weather
        // Get current hour index for hourly data
        const now = new Date()
        const hourIdx = now.getHours()
        const precip = data.hourly?.precipitation?.[hourIdx] ?? 0
        const humidity = data.hourly?.relativehumidity_2m?.[hourIdx] ?? 40

        const w: WeatherData = {
          temperature: cw.temperature,
          windspeed: cw.windspeed,
          winddirection: cw.winddirection,
          precipitation: precip,
          weathercode: cw.weathercode,
          humidity,
        }
        setWeather(w)
        setGrazing(computeGrazingIndex(w.temperature, w.precipitation, w.humidity))
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
    // Refresh every 30 min
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Cimilada & Daaqsin</h3>
          <span className="text-[10px] text-muted-foreground">Hargeysa, Somaliland</span>
        </div>

        {loading && (
          <div className="text-xs text-muted-foreground animate-pulse">Fetching live data…</div>
        )}

        {error && (
          <div className="text-xs text-red-400 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Offline — check connection
          </div>
        )}

        {weather && grazing && (
          <>
            {/* Live metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <Thermometer className="h-4 w-4 text-orange-400 shrink-0" />
                <span className="text-xs font-medium">{weather.temperature}°C</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CloudRain className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="text-xs">{weather.precipitation} mm/hr</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-xs">{weather.windspeed} km/h {windDirLabel(weather.winddirection)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Droplets className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="text-xs">{weather.humidity}% humidity</span>
              </div>
            </div>

            {/* Grazing Index */}
            <div className="rounded-lg bg-muted/50 p-2.5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <Leaf className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  <span className="text-xs font-semibold">Grazing Index</span>
                </div>
                <span className={cn("text-xs font-bold", grazing.color)}>
                  {grazing.index}/10 — {grazing.label}
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all", 
                    grazing.index >= 7 ? "bg-green-500" :
                    grazing.index >= 5 ? "bg-lime-500" :
                    grazing.index >= 3 ? "bg-yellow-500" : "bg-red-500"
                  )}
                  style={{ width: `${grazing.index * 10}%` }}
                />
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">{grazing.labelSomali}</div>
            </div>

            {/* Alerts */}
            {grazing.alerts.length > 0 && (
              <div className="space-y-1">
                {grazing.alerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[10px] text-amber-500">
                    <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5" />
                    {alert}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
