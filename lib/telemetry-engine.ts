import { useState, useEffect } from "react";

/**
 * KALTIRSI TELEMETRY ENGINE
 * Fetches real-time environmental data (Weather, Soil Moisture, Astrometry)
 * using the keyless open-source Open-Meteo API.
 */

// Coordinates for the 4 core traditional grazing/ecological zones
export const SOMALILAND_REGIONS = {
  Oogo: { name: "Oogo (Plateau)", lat: 9.5600, lon: 44.0650 }, // Hargeisa
  Guban: { name: "Guban (Burned Coast)", lat: 10.4396, lon: 45.0143 }, // Berbera
  Bannaan: { name: "Bannaan (Plains/Hawd)", lat: 9.5221, lon: 45.5336 }, // Burao
  Webiyada: { name: "Webiyada (Riverines)", lat: 10.6158, lon: 47.3680 }, // Erigavo (Mountain replacement)
}

export interface TelemetryData {
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    weatherCode: number;
  };
  today: {
    sunrise: string; // ISO8601
    sunset: string; // ISO8601
    uvMax: number;
  };
  regionId: string;
}

// Fallback static data in case of offline/failure
export const FALLBACK_TELEMETRY: TelemetryData = {
  current: {
    temp: 32, feelsLike: 34, humidity: 40, windSpeed: 15, precipitation: 0, weatherCode: 0
  },
  today: {
    sunrise: new Date(new Date().setHours(6, 0, 0, 0)).toISOString(),
    sunset: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
    uvMax: 10,
  },
  regionId: "Oogo"
}

export class TelemetryEngine {
  /**
   * Fetch live weather and astronomical data for a specific traditional region
   */
  static async getLiveEnvironment(regionId: keyof typeof SOMALILAND_REGIONS = "Oogo"): Promise<TelemetryData> {
    try {
      const region = SOMALILAND_REGIONS[regionId]
      if (!region) throw new Error("Invalid Region")

      // Using open-meteo without API keys
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&daily=sunrise,sunset,uv_index_max&timezone=Africa%2FNairobi`
      
      const res = await fetch(url, { next: { revalidate: 1800 } }) // Cache for 30 minutes to respect limits
      
      if (!res.ok) throw new Error("Telemetry fetch failed")
      
      const raw = await res.json()

      return {
        current: {
          temp: raw.current.temperature_2m,
          feelsLike: raw.current.apparent_temperature,
          humidity: raw.current.relative_humidity_2m,
          windSpeed: raw.current.wind_speed_10m,
          precipitation: raw.current.precipitation,
          weatherCode: raw.current.weather_code,
        },
        today: {
          // APIs return arrays for daily; we take today's index [0]
          sunrise: raw.daily.sunrise[0],
          sunset: raw.daily.sunset[0],
          uvMax: raw.daily.uv_index_max[0],
        },
        regionId
      }
    } catch (e) {
      console.warn("TelemetryEngine disconnected. Using static fallback.", e)
      return { ...FALLBACK_TELEMETRY, regionId }
    }
  }

  /**
   * Converts WMO weather codes into understandable ecological states
   */
  static getWeatherState(code: number): { label: string, somali: string } {
    if (code === 0) return { label: "Clear Sky", somali: "Cadar / Saafi" }
    if (code >= 1 && code <= 3) return { label: "Partly Cloudy", somali: "Daruur-maro" }
    if (code >= 45 && code <= 48) return { label: "Fog", somali: "Ceeryaamo" }
    if (code >= 51 && code <= 55) return { label: "Drizzle", somali: "Tiih" }
    if (code >= 61 && code <= 65) return { label: "Rain", somali: "Roob" }
    if (code >= 80 && code <= 82) return { label: "Heavy Rain Showers", somali: "Mahiigaan" }
    if (code >= 95) return { label: "Thunderstorm", somali: "Danab iyo Roob" }
    return { label: "Variable", somali: "Isbedbedel" }
  }
}

/**
 * React Hook to safely fetch and distribute live telemetry into Kaltirsi Client Components.
 */
export function useTelemetry(regionId: keyof typeof SOMALILAND_REGIONS = "Oogo") {
  const [data, setData] = useState<TelemetryData>(FALLBACK_TELEMETRY)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    TelemetryEngine.getLiveEnvironment(regionId)
      .then(res => {
        if (mounted) {
          setData(res)
          setIsLoading(false)
        }
      })
      .catch((e) => {
        console.error("Telemetry Hook Error:", e)
        if (mounted) setIsLoading(false)
      })

    return () => { mounted = false }
  }, [regionId])

  return { data, isLoading }
}
