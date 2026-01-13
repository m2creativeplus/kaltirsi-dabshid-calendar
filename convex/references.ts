import { query } from "./_generated/server";
import { v } from "convex/values";

// --- MONTHS ---

export const getAllMonths = query({
  args: {},
  handler: async (ctx) => {
    // Sort by month number
    const months = await ctx.db.query("kaltirsiMonths").collect();
    return months.sort((a, b) => a.monthNumber - b.monthNumber);
  },
});

export const getMonthByNumber = query({
  args: { monthNumber: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("kaltirsiMonths")
      .withIndex("by_month_number", (q) => q.eq("monthNumber", args.monthNumber))
      .first();
  },
});

export const getMonthsBySeason = query({
  args: { season: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("kaltirsiMonths")
      .withIndex("by_season", (q) => q.eq("season", args.season))
      .collect();
  },
});

// --- STAR GROUPS (GODDAD) ---

export const getAllStarGroups = query({
  args: {},
  handler: async (ctx) => {
    const stars = await ctx.db.query("starGroups").collect();
    return stars.sort((a, b) => a.groupNumber - b.groupNumber);
  },
});

export const getStarGroup = query({
  args: { groupNumber: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("starGroups")
      .withIndex("by_group_number", (q) => q.eq("groupNumber", args.groupNumber))
      .first();
  },
});

// --- AGRICULTURAL & LIVESTOCK ---

export const getCropCalendar = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("cropCalendar")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    }
    return await ctx.db.query("cropCalendar").collect();
  },
});

export const getLivestockCalendar = query({
  args: { animalType: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.animalType) {
      return await ctx.db
        .query("livestockCalendar")
        .withIndex("by_animal", (q) => q.eq("animalType", args.animalType!))
        .collect();
    }
    return await ctx.db.query("livestockCalendar").collect();
  },
});
