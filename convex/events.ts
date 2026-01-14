import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    gregorianDate: v.string(), // ISO date string
    eventType: v.string(),
    kaltirsiDate: v.optional(v.object({
      day: v.number(),
      month: v.number(),
      year: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    // For MVP, we'll try to get user identity, otherwise default to "guest" if auth not strictly enforced
    // But ideally we should require auth. Let's try to be permissive for dev mode if needed.
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || "guest_user"; 

    // If Kaltirsi date not provided, we should probably calculate it. 
    // But for now, we'll store what's passed or empty defaults.
    // Ideally the frontend calculates it using KaltirsiEngine
    const kaltirsiDate = args.kaltirsiDate || { day: 1, month: 1, year: 3122 };

    const eventId = await ctx.db.insert("customEvents", {
      userId,
      title: args.title,
      description: args.description,
      gregorianDate: args.gregorianDate,
      eventType: args.eventType,
      kaltirsiDate,
      isRecurring: false,
      createdAt: Date.now(),
    });

    return eventId;
  },
});

export const getEvents = query({
  args: {
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    // Basic range query is hard on string dates without index. 
    // Schema has index("by_date", ["gregorianDate"]).
    // Range queries on strings work if ISO format used YYYY-MM-DD.
    
    // For MVP, fetch all and filter or use index range if Convex supports it on strings efficiently.
    // Better: Query by user.
    
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject || "guest_user";

    const events = await ctx.db
      .query("customEvents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // In-memory filter for simpler range logic right now
    return events.filter(e => 
      e.gregorianDate >= args.startDate && e.gregorianDate <= args.endDate
    );
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("customEvents"),
    title: v.string(),
    description: v.optional(v.string()),
    gregorianDate: v.string(),
    eventType: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteEvent = mutation({
  args: { id: v.id("customEvents") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
