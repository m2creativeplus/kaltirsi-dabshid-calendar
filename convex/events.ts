import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new event
export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    kaltirsiDate: v.object({
      day: v.number(),
      month: v.number(),
      year: v.number(),
    }),
    gregorianDate: v.string(),
    eventType: v.string(),
    isRecurring: v.boolean(),
    recurrencePattern: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const eventId = await ctx.db.insert("customEvents", {
      userId: identity.subject,
      ...args,
      reminders: [],
      createdAt: Date.now(),
    });

    return eventId;
  },
});

// Get user's events
export const getMyEvents = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return await ctx.db
      .query("customEvents")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

// Delete an event
export const deleteEvent = mutation({
  args: { id: v.id("customEvents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const event = await ctx.db.get(args.id);
    if (!event || event.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});
