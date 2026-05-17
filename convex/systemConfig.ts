import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ────────────────────────────────────────────────────────────
// SYSTEM CONFIGURATION ENGINE (Sovereign CMS Backend)
// ────────────────────────────────────────────────────────────

// Initialize Default Brand Values if empty
export const initializeDefaults = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("systemConfig").collect();
    if (existing.length === 0) {
      await ctx.db.insert("systemConfig", { configKey: "primaryBrandColor", configValue: "#E5A631", updatedAt: Date.now() });
      await ctx.db.insert("systemConfig", { configKey: "headingFont", configValue: "Playfair Display", updatedAt: Date.now() });
      await ctx.db.insert("systemConfig", { configKey: "heroMode", configValue: "Godka Observatory", updatedAt: Date.now() });
    }
    return "Initialized";
  },
});

// Fetch complete system config (Public Read)
export const getSystemConfig = query({
  args: {},
  handler: async (ctx) => {
    const configRecords = await ctx.db.query("systemConfig").collect();
    const configObj: Record<string, string> = {};
    configRecords.forEach((record) => {
      configObj[record.configKey] = record.configValue;
    });
    return configObj;
  },
});

// Admin Mutation to Update Config Values
export const updateConfig = mutation({
  args: {
    key: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("systemConfig")
      .withIndex("by_key", (q) => q.eq("configKey", args.key))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        configValue: args.value,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("systemConfig", {
        configKey: args.key,
        configValue: args.value,
        updatedAt: Date.now(),
      });
    }
  },
});
