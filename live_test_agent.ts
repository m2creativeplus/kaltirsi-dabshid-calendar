import { TelemetryEngine, SOMALILAND_REGIONS } from "./lib/telemetry-engine";

async function liveTest() {
  console.log("\n[M2_SYSTEM] INITIATING LIVE DATA AGENT SWEEP...\n");
  
  const intelReport = [];

  for (const [region, coords] of Object.entries(SOMALILAND_REGIONS)) {
    try {
      const weatherData = await TelemetryEngine.fetchWeather(coords.lat, coords.lng);
      
      const currentTemp = weatherData.current.temperature_2m;
      const precip = weatherData.current.precipitation;
      const windSpeed = weatherData.current.wind_speed_10m;
      const weatherState = TelemetryEngine.getWeatherState(weatherData.current.weather_code);

      // Simple implementation of the formulas from the Execution Core Master Prompt
      let heatPenalty = 0;
      if (currentTemp > 35) heatPenalty = 2;
      else if (currentTemp > 30) heatPenalty = 1;

      const baseGI = (precip * 0.4) + (windSpeed < 15 ? 0.5 : 0) - heatPenalty;
      
      let decision = "STAY / SURVIVE";
      let trend = "STABLE";
      
      if (precip > 5) {
         decision = "GRAZE";
         trend = "IMPROVING";
      } else if (heatPenalty >= 2 && precip === 0) {
         decision = "MOVE";
         trend = "DETERIORATING";
      }

      intelReport.push({
        REGION: region,
        TELEMETRY: {
          temp_c: currentTemp,
          precip_mm: precip,
          wind_kmh: windSpeed,
          condition: weatherState.somali,
        },
        INTELLIGENCE: {
          grazing_score: parseFloat(baseGI.toFixed(2)),
          pastoral_decision: decision,
          trend: trend
        }
      });
      console.log(`✅ Synced node: ${region} [Temp: ${currentTemp}°C, Precip: ${precip}mm]`);
    } catch (e: any) {
      console.log(`❌ Failed to sync node: ${region} error: ${e.message}`);
    }
  }

  console.log("\n[EXECUTION OUTPUT: GRAZING DECISION MATRIX]");
  console.log(JSON.stringify(intelReport, null, 2));
}

liveTest();
