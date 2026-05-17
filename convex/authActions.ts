import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Simple hasher for MVP without external crypto dependencies inside Convex (Edge environment)
// For true production, use `@convex-dev/auth` or the WebCrypto API.
// Secure SHA-256 hashing for Sovereign Identity compliance using WebCrypto (Edge compatible)
const hashPassword = async (pw: string) => {
  const msgUint8 = new TextEncoder().encode(pw + "m2creative_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

const generateToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return `m2_token_${Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("")}`;
};

export const signup = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("User with this email already exists");
    }

    const userId = await ctx.db.insert("users", {
      email: args.email,
      passwordHash: await hashPassword(args.password),
      name: args.name,
      role: "user",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const token = generateToken();
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days

    await ctx.db.insert("sessions", {
      userId,
      token,
      expiresAt,
    });

    return { token, user_id: userId };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (user.passwordHash !== (await hashPassword(args.password))) {
      throw new Error("Invalid password");
    }

    const token = generateToken();
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days

    await ctx.db.insert("sessions", {
      userId: user._id,
      token,
      expiresAt,
    });

    return { token, user_id: user._id, role: user.role };
  },
});

export const getSessionUser = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    const user = await ctx.db.get(session.userId);
    if (!user) return null;

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
});

// Admin ONLY action to seed national holidays
export const seedNationalHolidays = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
      
    if (!session) throw new Error("Invalid session");
    
    const user = await ctx.db.get(session.userId);
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized: Admin role required");
    }

    // Seed data
    const nationalHolidays = [
      { title: "Somaliland Independence Day", date: "2026-06-26", desc: "Independence from Britain (1960)" },
      { title: "Somaliland Reassertion of Independence", date: "2026-05-18", desc: "Reassertion of sovereignty (1991)" },
    ];

    for (const h of nationalHolidays) {
      await ctx.db.insert("events", {
        userId: user._id,
        title: h.title,
        description: h.desc,
        startDate: h.date,
        type: "national",
        seasonalColor: "#1EB53A", // Gu' implicitly or overridden
        timezone: "UTC+3",
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    }

    return { success: true };
  }
});
