import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

// --- Utility: Calculate Somali Season ---
export function getSeasonalColor(dateString: string): string {
  const month = new Date(dateString).getMonth() + 1; // Jan=1
  if ([3, 4, 5].includes(month)) return "#1EB53A";  // Guʼ (Spring rains)
  if ([6, 7, 8].includes(month)) return "#E85D04";  // Xagaa (Summer)
  if ([9, 10, 11].includes(month)) return "#8B5A2B"; // Dayr (Autumn)
  return "#4A5568"; // Jiilaal (Winter dry)
}

// Ensure the caller is authenticated
async function requireAuth(ctx: any, token: string | undefined) {
  if (!token) throw new Error("Unauthorized: No token provided");
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q: any) => q.eq("token", token))
    .first();
  if (!session || session.expiresAt < Date.now()) {
    throw new Error("Unauthorized: Invalid or expired session");
  }
  return session.userId;
}

export const createEvent = mutation({
  args: {
    token: v.optional(v.string()), // Used for custom auth flow
    title: v.string(),
    description: v.optional(v.string()),
    startDate: v.string(), // YYYY-MM-DD
    endDate: v.optional(v.string()),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    type: v.optional(v.string()), // "national" | "custom"
    recurrenceRule: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Basic Auth Check
    let userId = "guest_user";
    if (args.token) {
      userId = await requireAuth(ctx, args.token);
    } else {
      // Fallback to Convex standard auth if checking native
      const identity = await ctx.auth.getUserIdentity();
      if (identity) userId = identity.subject;
    }

    const seasonalColor = getSeasonalColor(args.startDate);

    const eventId = await ctx.db.insert("events", {
      userId,
      title: args.title,
      description: args.description,
      startDate: args.startDate,
      endDate: args.endDate,
      startTime: args.startTime,
      endTime: args.endTime,
      type: args.type || "custom",
      seasonalColor,
      recurrenceRule: args.recurrenceRule,
      timezone: "UTC+3", // Defaults to Hargeisa
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { event_id: eventId };
  },
});

export const getEvents = query({
  args: {
    token: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let userId = "guest_user";
    if (args.token) {
      userId = await requireAuth(ctx, args.token);
    } else {
      const identity = await ctx.auth.getUserIdentity();
      if (identity) userId = identity.subject;
    }

    const allEvents = await ctx.db
      .query("events")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    // National events load for all users
    const nationalEvents = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("type"), "national"))
      .collect();

    let combined = [...allEvents, ...nationalEvents];

    // Deduplicate array based on _id
    combined = Array.from(new Map(combined.map(e => [e._id.toString(), e])).values());

    if (args.startDate && args.endDate) {
      return combined.filter(
        (e) => e.startDate >= args.startDate! && e.startDate <= args.endDate!
      );
    }
    
    return combined;
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("events"),
    token: v.optional(v.string()),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    startTime: v.optional(v.string()),
    endTime: v.optional(v.string()),
    type: v.optional(v.string()),
    recurrenceRule: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, token, ...updates } = args;

    if (token) {
      await requireAuth(ctx, token);
    }

    let finalUpdates: any = { ...updates, updatedAt: Date.now() };
    if (updates.startDate) {
      finalUpdates.seasonalColor = getSeasonalColor(updates.startDate);
    }

    await ctx.db.patch(id, finalUpdates);
    return { success: true };
  },
});

export const deleteEvent = mutation({
  args: { 
    id: v.id("events"),
    token: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    if (args.token) {
      await requireAuth(ctx, args.token);
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// CRON job handler for recurring events (to be triggered daily)
export const handleRecurrences = internalMutation({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split("T")[0];
    const events = await ctx.db
      .query("events")
      .filter((q) => q.neq(q.field("recurrenceRule"), undefined))
      .collect();

    for (const evt of events) {
      if (!evt.recurrenceRule || evt.recurrenceRule === "none") continue;

      let nextDate = new Date(evt.startDate);
      switch (evt.recurrenceRule) {
        case "daily": nextDate.setDate(nextDate.getDate() + 1); break;
        case "weekly": nextDate.setDate(nextDate.getDate() + 7); break;
        case "monthly": nextDate.setMonth(nextDate.getMonth() + 1); break;
        case "yearly": nextDate.setFullYear(nextDate.getFullYear() + 1); break;
      }
      
      const newStartDate = nextDate.toISOString().split("T")[0];
      
      // Prevent duplication (check if an event for the same original ID + new date exists)
      // For simplicity, we create a fresh event and disable recurrence on the old one,
      // or we just shift the date and keep repeating. Often repeating events are generated on the fly.
      
      // Let's just shift the existing event date forward to its next occurrence.
      await ctx.db.patch(evt._id, {
        startDate: newStartDate,
        seasonalColor: getSeasonalColor(newStartDate),
        updatedAt: Date.now()
      });
    }
  }
});
