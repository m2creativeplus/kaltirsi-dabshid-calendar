import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Core user accounts for custom authentication
  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    role: v.string(), // "admin" | "user"
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  // Sessions for custom auth JWT-like tokens
  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  // User preferences for personalization
  userPreferences: defineTable({
    userId: v.string(),
    language: v.string(), // "so" | "en" | "ar"
    theme: v.string(), // "light" | "dark" | "system"
    region: v.string(), // Somali regions
    defaultCalendar: v.string(), // "kaltirsi" | "gregorian" | "hijri"
    notifications: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user_id", ["userId"]),

  // Core Events Table for Calendar (Persistent & Real-time)
  events: defineTable({
    userId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    startDate: v.string(), // YYYY-MM-DD
    endDate: v.optional(v.string()), // For multi-day events
    startTime: v.optional(v.string()), // HH:mm
    endTime: v.optional(v.string()), // HH:mm
    type: v.string(), // "national" | "custom"
    seasonalColor: v.string(), // "#1EB53A", "#E85D04", "#8B5A2B", "#4A5568"
    recurrenceRule: v.optional(v.string()), // "daily" | "weekly" | "monthly" | "yearly"
    timezone: v.string(), // Default UTC+3
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_date", ["startDate"]),

  // Cultural stories and elder recordings
  culturalStories: defineTable({
    title: v.string(),
    titleSomali: v.string(),
    description: v.string(),
    descriptionSomali: v.string(),
    content: v.string(),
    contentSomali: v.string(),
    category: v.string(), // "proverb" | "story" | "tradition" | "history"
    relatedMonth: v.optional(v.number()),
    relatedStarGroup: v.optional(v.number()),
    audioUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    elderName: v.optional(v.string()),
    region: v.optional(v.string()),
    isApproved: v.boolean(),
    createdAt: v.number(),
  }).index("by_category", ["category"])
    .index("by_month", ["relatedMonth"]),

  // 12 Kaltirsi calendar months
  kaltirsiMonths: defineTable({
    monthNumber: v.number(), // 1-12
    nameSomali: v.string(),
    nameEnglish: v.string(),
    nameArabic: v.optional(v.string()),
    meaning: v.string(),
    meaningSomali: v.string(),
    season: v.string(), // "Jilaal" | "Gu'" | "Xagaa" | "Dayr"
    seasonEnglish: v.string(),
    description: v.string(),
    descriptionSomali: v.string(),
    agriculturalActivities: v.array(v.string()),
    culturalEvents: v.array(v.string()),
    startStarGroup: v.number(), // Which Goddad it starts with
    approximateGregorianStart: v.string(),
    imageUrl: v.optional(v.string()),
  }).index("by_month_number", ["monthNumber"])
    .index("by_season", ["season"]),

  // 28 Goddad (Lunar Mansions / Star Groups)
  starGroups: defineTable({
    groupNumber: v.number(), // 1-28
    nameSomali: v.string(),
    nameArabic: v.string(),
    nameEnglish: v.string(),
    meaning: v.string(),
    meaningSomali: v.string(),
    constellation: v.string(),
    mainStar: v.string(),
    rightAscension: v.optional(v.string()),
    declination: v.optional(v.string()),
    magnitude: v.optional(v.number()),
    daysInGroup: v.number(), // Usually 13 days
    monthAssociation: v.number(), // Which Kaltirsi month
    weatherPattern: v.string(),
    weatherPatternSomali: v.string(),
    agriculturalSignificance: v.string(),
    agriculturalSignificanceSomali: v.string(),
    proverb: v.optional(v.string()),
    proverbEnglish: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("by_group_number", ["groupNumber"])
    .index("by_month", ["monthAssociation"]),

  // Agricultural/Crop calendar data
  cropCalendar: defineTable({
    cropName: v.string(),
    cropNameSomali: v.string(),
    category: v.string(), // "grain" | "vegetable" | "fruit" | "legume"
    plantingMonths: v.array(v.number()),
    harvestMonths: v.array(v.number()),
    waterRequirements: v.string(),
    soilType: v.string(),
    region: v.string(),
    traditionalPractices: v.string(),
    traditionalPracticesSomali: v.string(),
    yieldInfo: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("by_category", ["category"])
    .index("by_region", ["region"]),

  // Livestock/Pastoral calendar data
  livestockCalendar: defineTable({
    animalType: v.string(), // "camel" | "cattle" | "sheep" | "goat"
    animalTypeSomali: v.string(),
    activity: v.string(), // "breeding" | "migration" | "milking" | "shearing"
    activitySomali: v.string(),
    optimalMonths: v.array(v.number()),
    starGroupAssociations: v.array(v.number()),
    region: v.string(),
    traditionalPractices: v.string(),
    traditionalPracticesSomali: v.string(),
    weatherConsiderations: v.string(),
    imageUrl: v.optional(v.string()),
  }).index("by_animal", ["animalType"])
    .index("by_activity", ["activity"]),
});
