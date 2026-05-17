import { mutation } from "./_generated/server";

export const populate = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Configure System
    const existingConfig = await ctx.db.query("systemConfig").collect();
    if (existingConfig.length === 0) {
      await ctx.db.insert("systemConfig", { configKey: "primaryBrandColor", configValue: "#E5A631", updatedAt: Date.now() });
      await ctx.db.insert("systemConfig", { configKey: "headingFont", configValue: "Playfair Display", updatedAt: Date.now() });
      await ctx.db.insert("systemConfig", { configKey: "eclipseMode", configValue: "ACTIVE", updatedAt: Date.now() });
    }

    // 2. Inject Telemetry Spikes for Analytics
    const dateStr = new Date().toISOString().split('T')[0];
    
    await ctx.db.insert("environmentTelemetry", {
      date: dateStr,
      region: "Oogo (Somaliland)",
      ndviScore: 0.65, // Dense greenery
      rainfallMm: 45,
      temperatureC: 22,
      grazingIndexCalculated: 95.5, // High Grazing Index
      kaltirsiMonthAssociation: 10, // Fushade
      source: "SOVEREIGN_SYSTEM_SYNC",
      recordedAt: Date.now(),
    });

    await ctx.db.insert("environmentTelemetry", {
      date: "2026-04-18",
      region: "Maroodi Jeex",
      ndviScore: 0.45,
      rainfallMm: 12,
      temperatureC: 32,
      grazingIndexCalculated: 38.5,
      kaltirsiMonthAssociation: 10,
      source: "SOVEREIGN_SYSTEM_SYNC",
      recordedAt: Date.now(),
    });

    // 3. NotebookLM AI Queries
    await ctx.db.insert("queryAnalytics", {
      queryText: "When does the Pleiades (Godka) rise in Gu'?",
      category: "godka",
      contextUsed: true,
      userRegionContext: "Ceerigaabo",
      timestamp: Date.now(),
    });

    return "All Systems Synchronized. Kaltirsi OS fully populated.";
  },
});
