import { NextResponse } from "next/server"
import { TelemetryEngine, SOMALILAND_REGIONS } from "@/lib/telemetry-engine"

// ═══════════════════════════════════════════════════════════════════
// LIVE DATA AGENT — KALTIRSI EXECUTION CORE
// Automatically sweeps telemetry and calculates Grazing Index.
// Designed for Vercel Cron or direct trigger via CLI.
// ═══════════════════════════════════════════════════════════════════

export async function GET() {
  try {
    const intelReport = []

    for (const [region, coords] of Object.entries(SOMALILAND_REGIONS)) {
      // 1. Fetch live meteorological telemetry
      const weatherData = await TelemetryEngine.getLiveEnvironment(region as keyof typeof SOMALILAND_REGIONS)
      
      // 2. Extract key metrics
      const currentTemp = weatherData.current.temp
      const precip = weatherData.current.precipitation
      const windSpeed = weatherData.current.windSpeed
      const weatherState = TelemetryEngine.getWeatherState(weatherData.current.weatherCode)

      // 3. Execution Core: Calculate Baseline Grazing Index (GI)
      // GI = (Precip * 0.4) - (Heat Penalty)
      let heatPenalty = 0
      if (currentTemp > 35) heatPenalty = 2
      else if (currentTemp > 30) heatPenalty = 1

      // Very rudimentary formula for live test execution
      const baseGI = (precip * 0.4) + (windSpeed < 15 ? 0.5 : 0) - heatPenalty
      
      let decision = "STAY"
      let trend = "STABLE"
      
      if (precip > 5) {
         decision = "GRAZE"
         trend = "IMPROVING"
      } else if (heatPenalty >= 2 && precip === 0) {
         decision = "MOVE"
         trend = "DETERIORATING"
      }

      intelReport.push({
        region: region,
        coordinates: coords,
        telemetry: {
          temp_celsius: currentTemp,
          precipitation_mm: precip,
          wind_kmh: windSpeed,
          condition: weatherState.somali,
        },
        intelligence: {
          grazing_index_score: parseFloat(baseGI.toFixed(2)),
          pastoral_decision: decision,
          trend: trend
        }
      })
    }

    return NextResponse.json({
      system: "M2_LIVE_DATA_AGENT",
      status: "SYNC_COMPLETE",
      timestamp_utc: new Date().toISOString(),
      data: intelReport
    }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ error: "Failed to sync live intelligence", details: error.message }, { status: 500 })
  }
}
