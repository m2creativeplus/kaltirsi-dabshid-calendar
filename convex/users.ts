import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create or update user preferences
export const updatePreferences = mutation({
  args: {
    language: v.optional(v.string()),
    theme: v.optional(v.string()),
    region: v.optional(v.string()),
    defaultCalendar: v.optional(v.string()),
    notifications: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called updatePreferences without authentication present");
    }

    const user = await ctx.db
      .query("userPreferences")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (user) {
      await ctx.db.patch(user._id, {
        ...args,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("userPreferences", {
        clerkId: identity.subject,
        language: args.language || "so",
        theme: args.theme || "system",
        region: args.region || "Somaliland",
        defaultCalendar: args.defaultCalendar || "kaltirsi",
        notifications: args.notifications ?? true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

// Get user preferences
export const getPreferences = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    return await ctx.db
      .query("userPreferences")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();
  },
});
