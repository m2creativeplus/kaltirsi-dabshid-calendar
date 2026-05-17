import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ────────────────────────────────────────────────────────────
// ENVIRONMENTAL TELEMETRY ENGINE (Live Sensor Data)
// ────────────────────────────────────────────────────────────

// Insert live telemetry payload (from external API Cron or Manual push)
export const logTelemetry = mutation({
  args: {
    region: v.string(),
    ndviScore: v.number(),
    rainfallMm: v.number(),
    temperatureC: v.number(),
    source: v.string(), // "NASA", "OpenWeather", etc
  },
  handler: async (ctx, args) => {
    // Basic Grazing Index Formula: (NDVI*0.5) + (Rain*0.3) - (TempStress*0.2)
    const tempStress = args.temperatureC > 35 ? (args.temperatureC - 35) * 0.1 : 0;
    const grazingCalculated = (args.ndviScore * 0.5) + (args.rainfallMm * 0.3) - tempStress;
    
    // Extrapolate Kaltirsi Month (Simplified Mock: 1-12)
    const dateStr = new Date().toISOString().split('T')[0];
    const monthMock = new Date().getMonth() + 1; // 1-12

    await ctx.db.insert("environmentTelemetry", {
      date: dateStr,
      region: args.region,
      ndviScore: args.ndviScore,
      rainfallMm: args.rainfallMm,
      temperatureC: args.temperatureC,
      grazingIndexCalculated: Math.max(0, grazingCalculated), // Ensure no negative index
      kaltirsiMonthAssociation: monthMock,
      source: args.source,
      recordedAt: Date.now(),
    });
  },
});

// Fetch latest telemetry for the dashboard (Live grazing component)
export const getLatestRegionMetrics = query({
  args: { region: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("environmentTelemetry")
      .withIndex("by_region", (q) => q.eq("region", args.region))
      .order("desc")
      .first();
  },
});

// Fetch full year data for the analytics pages
export const getAnnualTelemetry = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("environmentTelemetry")
      .order("desc")
      .take(100);
  },
});
