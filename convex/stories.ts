import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all stories
export const getAllStories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("culturalStories").collect();
  },
});

// Get stories by category
export const getStoriesByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("culturalStories")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Get stories for a specific month
export const getStoriesByMonth = query({
  args: { monthNumber: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("culturalStories")
      .withIndex("by_month", (q) => q.eq("relatedMonth", args.monthNumber))
      .collect();
  },
});

// Admin: Add a new story
export const addStory = mutation({
  args: {
    title: v.string(),
    titleSomali: v.string(),
    description: v.string(),
    descriptionSomali: v.string(),
    content: v.string(),
    contentSomali: v.string(),
    category: v.string(),
    relatedMonth: v.optional(v.number()),
    relatedStarGroup: v.optional(v.number()),
    audioUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    elderName: v.optional(v.string()),
    region: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // In a real app, check for admin privileges here
    await ctx.db.insert("culturalStories", {
      ...args,
      isApproved: true, // Auto-approve for now
      createdAt: Date.now(),
    });
  },
});
