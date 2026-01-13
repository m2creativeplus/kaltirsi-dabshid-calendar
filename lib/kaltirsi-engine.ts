import { DateTime } from 'luxon';

// --- Types ---
export type KaltirsiDate = {
  year: number;
  month: number;
  day: number;
  monthName: string;
};

export type Season = {
  name: string; // Gu', Xagaa, Dayr, Jiilaal
  color: string; // tailwind class suffix e.g. 'gu'
  icon: string; // e.g. 'cloud-rain'
};

export type StarSeason = {
  name: string; // Somali name e.g. Asher
  englishName: string; // Sirius
  meaning: string;
  startDay: number; // Day of year (approx)
  endDay: number;
};

// --- Constants ---
export const MONTHS_SOLAR = [
  "Samalaho", "Karan", "Diraac-good", "Dambasame", 
  "Xoomir", "Xays", "Toddob", "Adhi-caseeye", 
  "Daydo", "Seer-ma-weydo", "Cawl", "Sagaal"
];

// Based on verified data: Xagaa (Jul-Oct), Dayr (Oct-Jan), Jiilaal (Jan-Apr), Gu' (Apr-Jul)
// Simplified logic based on month index (0-11 where 0=Samalaho=July)
export function getSeason(kMonthIndex: number): Season {
  if (kMonthIndex >= 0 && kMonthIndex <= 2) return { name: "Xagaa", color: "xagaa", icon: "sun" };
  if (kMonthIndex >= 3 && kMonthIndex <= 5) return { name: "Dayr", color: "dayr", icon: "cloud-drizzle" };
  if (kMonthIndex >= 6 && kMonthIndex <= 8) return { name: "Jiilaal", color: "jiilaal", icon: "thermometer-sun" };
  return { name: "Gu'", color: "gu", icon: "cloud-rain" }; // 9-11
}

// 13 Star Seasons (Approximate Day of Year)
// Note: This logic simplifies to Day of Year for MVP. 
// A precise astronomical calculation would use RA/Dec, but day-of-year is sufficient for a calendar UI.
const STAR_SEASONS: StarSeason[] = [
  { name: "Asher", englishName: "Sirius", meaning: "Dabshid New Year", startDay: 201, endDay: 215 }, // July 20
  { name: "Budh", englishName: "Canopus", meaning: "Peak Heat", startDay: 216, endDay: 230 },
  { name: "Daraar", englishName: "Procyon", meaning: "Pre-Deyr Tension", startDay: 231, endDay: 244 },
  { name: "Sor", englishName: "Castor/Pollux", meaning: "Cooling Winds", startDay: 245, endDay: 259 },
  { name: "Suuban", englishName: "Aldebaran", meaning: "Peak Dayr Rains", startDay: 260, endDay: 274 },
  { name: "Luul", englishName: "Pleiades", meaning: "Pastoral Scouting", startDay: 275, endDay: 289 },
  { name: "Uuq", englishName: "Betelgeuse", meaning: "Heavy Rains", startDay: 290, endDay: 304 },
  { name: "Biriir", englishName: "Rigel", meaning: "Dryness Starts", startDay: 305, endDay: 319 },
  { name: "Jabaq", englishName: "Bellatrix", meaning: "Growing Dryness", startDay: 320, endDay: 334 },
  { name: "Araar", englishName: "Capella", meaning: "Jiilaal Starts", startDay: 335, endDay: 349 },
  { name: "Shugul", englishName: "Pollux Rising", meaning: "Deep Drought", startDay: 350, endDay: 364 },
  { name: "Atoor", englishName: "Regulus", meaning: "Mid-Jiilaal", startDay: 1, endDay: 15 }, // Rollover handling needed
  { name: "Hal-Dheere", englishName: "Spica", meaning: "End of Year", startDay: 16, endDay: 30 },
  // Gap fillers or extended periods would be needed for a perfect 365 mapping, strictly following the 13-part list provided.
  // For MVP, if date falls outside these, we map to closest or 'Transition'.
];

// --- Core Class ---
export class KaltirsiEngine {
  // Anchor: Dabshid = July 20 (Gregorian) = 1 Samalaho
  // We calculate offset from this anchor.
  
  static gregorianToKaltirsi(date: Date): KaltirsiDate {
    const anchorMonth = 6; // July (0-indexed)
    const anchorDay = 20;
    
    // Simple algorithm: Count days from closest July 20
    const currentYear = date.getFullYear();
    let anchorDate = new Date(currentYear, anchorMonth, anchorDay);
    
    // If date is before July 20, the Kaltirsi year started in previous Gregorian year
    if (date < anchorDate) {
      anchorDate = new Date(currentYear - 1, anchorMonth, anchorDay);
    }
    
    const diffTime = Math.abs(date.getTime() - anchorDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    // Average Kaltirsi month ~30.4 days
    const monthLength = 365.25 / 12;
    
    const monthIndex = Math.floor(diffDays / monthLength) % 12;
    const dayOfMonth = Math.floor(diffDays % monthLength) + 1;
    
    // Year logic: Kaltirsi era is ancient, strictly for MVP we can just use (GregYear + ~1100) or just GregYear
    // User data suggests just tracking 12 months cycle is key.
    const kYear = currentYear + 1097; // Placeholder offset based on documentation
    
    return {
      year: kYear,
      month: monthIndex + 1,
      day: dayOfMonth,
      monthName: MONTHS_SOLAR[monthIndex]
    };
  }
  
  static getStarSeason(date: Date): StarSeason | null {
    // Get Day of Year (1-366)
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Find matching star
    // Handle Atoor (Jan 1-15) specifically if dayOfYear is small
    const star = STAR_SEASONS.find(s => dayOfYear >= s.startDay && dayOfYear <= s.endDay);
    
    if (star) return star;
    
    // Fallback for gaps (simplified)
    return { name: "Transition", englishName: "-", meaning: "Seasonal Transition", startDay: 0, endDay: 0 };
  }

  static getHijriDate(date: Date): string {
    return new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }
  
  static getSomaliTime(date: Date): string {
    // 6-hour offset logic
    // 7:00 AM Greg -> 1:00 Somali
    // 13:00 (1 PM) Greg -> 7:00 Somali
    let hours = date.getHours();
    let somaliHours = (hours + 6) % 12;
    if (somaliHours === 0) somaliHours = 12; // 12-hour clock
    
    let suffix = "";
    if (hours >= 6 && hours < 12) suffix = "Subaxnimo"; // Morning (6am - 11:59am)
    else if (hours >= 12 && hours < 15) suffix = "Duhurnimo"; // Noon (12pm - 2:59pm)
    else if (hours >= 15 && hours < 18) suffix = "Casir"; // Afternoon (3pm - 5:59pm)
    else if (hours >= 18 && hours < 20) suffix = "Fiid"; // Twilight (6pm - 7:59pm)
    else if (hours >= 20 || hours < 1) suffix = "Habeennimo"; // Night (8pm - 4am - simplified)
    else suffix = "Subaxnimo"; // Default fallback
    
    return `${somaliHours}:${date.getMinutes().toString().padStart(2, '0')} ${suffix}`;
  }
}
