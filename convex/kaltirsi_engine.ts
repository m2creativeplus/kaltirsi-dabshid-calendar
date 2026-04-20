import { action, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * 🌍 KALTIRSI INTELLIGENCE ENGINE (CORE)
 * This engine fuses NDVI, Weather, and Godka (Star) data to output the exact 
 * Grazing Index and Risk scoring for Somaliland's pastoral tracking system.
 */

// 1. Core Logic Engine for Grazing Calculation
export const computeRegionState = (ndvi: number, rain_mm: number, temp: number, star: string, season: string) => {
  let grazing = ndvi * 5;

  if (rain_mm > 10) grazing += 1;
  if (temp > 38) grazing -= 2;

  // Clamp the grazing value between 0 and 5
  grazing = Math.max(0, Math.min(5, Math.round(grazing)));

  const risk =
    grazing <= 1 ? "HIGH" :
    grazing <= 2 ? "MEDIUM" :
    "LOW";

  return {
    grazing_index: grazing,
    season,
    star,
    risk
  };
};

// 2. Action to Fetch Live AgroData and Generate the GeoJSON
export const getLiveEcologicalGeoMap = action({
  args: { regionName: v.string(), lat: v.number(), lon: v.number() },
  handler: async (ctx, args) => {
    // Phase 1: Fetch External Data
    // We utilize Open-Meteo and AgroMonitoring (NDVI APIs).
    
    // Fetch simulated/real Open-Meteo Weather data (Free, no API key needed for exact coordinates)
    const meteoRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${args.lat}&longitude=${args.lon}&current_weather=true&precipitation_unit=mm`);
    const meteoData = await meteoRes.json();
    
    const currentTemp = meteoData.current_weather?.temperature || 35; 
    const currentRain = meteoData.current_weather?.precipitation || 0; // fallback

    // TODO: In production, Agromonitoring requires an API Key set in Convex Environment Variables.
    // NASA AppEEARS NDVI takes hours to process polygons, so we cache the latest valid satellite pass.
    const latestNDVI = 0.32; // Simulated live return from Agromonitoring / Copernicus

    // Current Star and Season (Will link to the schema Godka data)
    const activeStar = "Sirius"; // Hardcoded for demo/Xagaa
    const activeSeason = "Xagaa";

    // Phase 2: Run the Engine
    const state = computeRegionState(latestNDVI, currentRain, currentTemp, activeStar, activeSeason);

    // Phase 3: Construct the Kaltirsi GeoJSON Map Output Format
    const geoJsonFeature = {
      type: "Feature",
      properties: {
        name: args.regionName,
        kaltirsi: {
          grazing_index: state.grazing_index,
          season: state.season,
          godka: 1, // Godka Station 1
          star: state.star,
          risk: state.risk,
          real_time_metrics: {
            temp_c: currentTemp,
            rain_mm: currentRain,
            ndvi_val: latestNDVI
          }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [] // Replaced by QGIS coordinates in the frontend render
      }
    };

    return geoJsonFeature;
  }
});
