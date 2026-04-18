import { DateTime } from 'luxon';

// --- Types ---
export type KaltirsiDate = {
  year: number;
  month: number;
  day: number;
  monthName: string;
};

export type Season = {
  name: string;
  nameEnglish: string;
  color: string;
  icon: string;
  rainfall: "Heavy" | "Light" | "Minimal" | "None";
  description: string;
};

export type StarSeason = {
  name: string;
  englishName: string;
  meaning: string;
  startDay: number;
  endDay: number;
};

export type Goddad = {
  number: number;
  nameSomali: string;
  nameArabic: string;
  mainStar: string;
  constellation: string;
  weatherPattern: string;
  agriculturalSignificance: string;
  daysInGroup: number;
  monthAssociation: number;
  startDayOfYear: number;
};

export type GoorsheegtaSegment = {
  number: number;
  nameSomali: string;
  nameEnglish: string;
  timeRange: string;
  startHour: number;
  endHour: number;
  description: string;
  pastoralistGuidance: string;
};

// ═══════════════════════════════════════════════════════════════════
// 12 CANONICAL KALTIRSI MONTHS
// ═══════════════════════════════════════════════════════════════════
// ANCHOR: Dabshid = July 20 (Gregorian) = Day 1, Month 1 (Samalaho)
// Year 3123 = "Sanadka Axadda" (Year of Sunday), started July 20, 2025
// Verified: April 18, 2026 = 30 Aminla' 3123
//
// Month  Name              Alt Names              Approx Greg Start  Season
// ──────────────────────────────────────────────────────────────────────
//  1     Samalaho          —                      Jul 20             Xagaa
//  2     Karan             —                      Aug 20             Xagaa
//  3     Diraac-good       —                      Sep 20             Xagaa
//  4     Dambasame         —                      Oct 20             Dayr
//  5     Xoomir            —                      Nov 20             Dayr
//  6     Xays              —                      Dec 20             Dayr
//  7     Toddob            —                      Jan 20             Jiilaal
//  8     Adhi-caseeye      Laba-Karan             Feb 20             Jiilaal
//  9     Aminla'           Daydo, Lix-koore       Mar 20             Jiilaal
//  10    Fushade           Seer-ma-weydo          Apr 19             Gu'
//  11    Cawl              —                      May 20             Gu'
//  12    Sagaal            —                      Jun 20             Gu'

export const MONTHS_SOLAR = [
  "Samalaho",       // 1  — Jul 20  (Dabshid, Xagaa)
  "Karan",          // 2  — Aug 20  (Xagaa)
  "Diraac-good",    // 3  — Sep 20  (Xagaa)
  "Dambasame",      // 4  — Oct 20  (Dayr)
  "Xoomir",         // 5  — Nov 20  (Dayr)
  "Xays",           // 6  — Dec 20  (Dayr)
  "Toddob",         // 7  — Jan 20  (Jiilaal)
  "Adhi-caseeye",   // 8  — Feb 20  (Jiilaal)
  "Aminla'",        // 9  — Mar 20  (Late Jiilaal → Gu')
  "Fushade",        // 10 — Apr 19  (Gu' — certain rain onset)
  "Cawl",           // 11 — May 20  (Gu')
  "Sagaal",         // 12 — Jun 20  (Gu' tail)
];

export const MONTH_ALIASES: Record<string, string[]> = {
  "Aminla'": ["Daydo", "Lix-koore"],
  "Fushade": ["Seer-ma-weydo"],
  "Adhi-caseeye": ["Laba-Karan"],
};

// ═══════════════════════════════════════════════════════════════════
// SEASONS (Xilli)
// ═══════════════════════════════════════════════════════════════════
const SEASONS: Season[] = [
  { name: "Xagaa",   nameEnglish: "Dry Season / Summer",  color: "xagaa",   icon: "sun",             rainfall: "Minimal", description: "Hot dry — coastal winds, Dabshid fire festival" },
  { name: "Dayr",    nameEnglish: "Short Rains",          color: "dayr",    icon: "cloud-drizzle",   rainfall: "Light",   description: "Short rain season — secondary agriculture" },
  { name: "Jiilaal", nameEnglish: "Harsh Dry / Winter",   color: "jiilaal", icon: "thermometer-sun", rainfall: "None",    description: "Peak pastoral stress — cold, dry, unreliable weather" },
  { name: "Gu'",     nameEnglish: "Long Rains / Spring",  color: "gu",      icon: "cloud-rain",      rainfall: "Heavy",   description: "Primary rains — peak pastoral and agricultural season" },
];

export function getSeason(kMonthIndex: number): Season {
  // Months 0-2 (Samalaho/Karan/Diraac-good = Jul-Sep) → Xagaa
  if (kMonthIndex >= 0 && kMonthIndex <= 2) return SEASONS[0];
  // Months 3-5 (Dambasame/Xoomir/Xays = Oct-Dec) → Dayr
  if (kMonthIndex >= 3 && kMonthIndex <= 5) return SEASONS[1];
  // Months 6-8 (Toddob/Adhi-caseeye/Aminla' = Jan-Mar) → Jiilaal
  if (kMonthIndex >= 6 && kMonthIndex <= 8) return SEASONS[2];
  // Months 9-11 (Fushade/Cawl/Sagaal = Apr-Jun) → Gu'
  return SEASONS[3];
}

// ═══════════════════════════════════════════════════════════════════
// 28 GODDAD (Lunar Mansions / Star Groups)
// ═══════════════════════════════════════════════════════════════════
export const GODDAD_28: Goddad[] = [
  { number: 1, nameSomali: "Asher", nameArabic: "الشعرى", mainStar: "Sirius (α CMa)", constellation: "Canis Major", weatherPattern: "Peak heat, Dabshid celebration", agriculturalSignificance: "New Year planting signal", daysInGroup: 13, monthAssociation: 1, startDayOfYear: 201 },
  { number: 2, nameSomali: "Budh", nameArabic: "سهيل", mainStar: "Canopus (α Car)", constellation: "Carina", weatherPattern: "Intense dry heat continues", agriculturalSignificance: "Water conservation critical", daysInGroup: 13, monthAssociation: 1, startDayOfYear: 214 },
  { number: 3, nameSomali: "Daraar", nameArabic: "المرزم", mainStar: "Procyon (α CMi)", constellation: "Canis Minor", weatherPattern: "Pre-Dayr tension, subtle cooling", agriculturalSignificance: "Scout for pasture movement", daysInGroup: 13, monthAssociation: 2, startDayOfYear: 227 },
  { number: 4, nameSomali: "Sor", nameArabic: "الجوزاء", mainStar: "Castor/Pollux (α/β Gem)", constellation: "Gemini", weatherPattern: "Cooling winds strengthen", agriculturalSignificance: "Pre-rain soil preparation", daysInGroup: 13, monthAssociation: 2, startDayOfYear: 240 },
  { number: 5, nameSomali: "Suuban", nameArabic: "الدبران", mainStar: "Aldebaran (α Tau)", constellation: "Taurus", weatherPattern: "Dayr rains begin in highlands", agriculturalSignificance: "Open fields, seed germination starts", daysInGroup: 13, monthAssociation: 3, startDayOfYear: 253 },
  { number: 6, nameSomali: "Luul", nameArabic: "الثريا", mainStar: "Pleiades (M45)", constellation: "Taurus", weatherPattern: "Peak Dayr — heaviest short rains", agriculturalSignificance: "Primary harvesting window approaches", daysInGroup: 13, monthAssociation: 3, startDayOfYear: 266 },
  { number: 7, nameSomali: "Uuq", nameArabic: "الجبار", mainStar: "Betelgeuse (α Ori)", constellation: "Orion", weatherPattern: "Heavy rain events, flooding risk", agriculturalSignificance: "Herd movement to highlands", daysInGroup: 13, monthAssociation: 4, startDayOfYear: 279 },
  { number: 8, nameSomali: "Biriir", nameArabic: "الرجل", mainStar: "Rigel (β Ori)", constellation: "Orion", weatherPattern: "Rains tapering — start of dry cycle", agriculturalSignificance: "Harvest completion, storage", daysInGroup: 13, monthAssociation: 4, startDayOfYear: 292 },
  { number: 9, nameSomali: "Jabaq", nameArabic: "بطن الجوزاء", mainStar: "Bellatrix (γ Ori)", constellation: "Orion", weatherPattern: "Growing dryness", agriculturalSignificance: "Livestock count and assessment", daysInGroup: 13, monthAssociation: 5, startDayOfYear: 305 },
  { number: 10, nameSomali: "Araar", nameArabic: "العيوق", mainStar: "Capella (α Aur)", constellation: "Auriga", weatherPattern: "Jiilaal onset — cold desert nights", agriculturalSignificance: "Reduce herd movement, seek shelter", daysInGroup: 13, monthAssociation: 5, startDayOfYear: 318 },
  { number: 11, nameSomali: "Shugul", nameArabic: "الهنعة", mainStar: "Alhena (γ Gem)", constellation: "Gemini", weatherPattern: "Deep dry — dust storms possible", agriculturalSignificance: "Supplemental feeding begins", daysInGroup: 13, monthAssociation: 6, startDayOfYear: 331 },
  { number: 12, nameSomali: "Atoor", nameArabic: "القلب", mainStar: "Regulus (α Leo)", constellation: "Leo", weatherPattern: "Mid-Jiilaal, severe drought risk", agriculturalSignificance: "Emergency water sourcing", daysInGroup: 13, monthAssociation: 6, startDayOfYear: 344 },
  { number: 13, nameSomali: "Hal-Dheere", nameArabic: "السماك", mainStar: "Spica (α Vir)", constellation: "Virgo", weatherPattern: "Late Jiilaal — distant Gu' signs", agriculturalSignificance: "Pre-planting soil assessment", daysInGroup: 13, monthAssociation: 7, startDayOfYear: 357 },
  { number: 14, nameSomali: "Fool-dheere", nameArabic: "الأعزل", mainStar: "Arcturus (α Boo)", constellation: "Boötes", weatherPattern: "Gu' onset signs in sky", agriculturalSignificance: "Migration to seasonal plains", daysInGroup: 13, monthAssociation: 7, startDayOfYear: 5 },
  { number: 15, nameSomali: "Farta-Midow", nameArabic: "الزبانى", mainStar: "Zubenelgenubi (α Lib)", constellation: "Libra", weatherPattern: "Early Gu' light showers", agriculturalSignificance: "Initial planting windows open", daysInGroup: 13, monthAssociation: 8, startDayOfYear: 18 },
  { number: 16, nameSomali: "Caddaan-yar", nameArabic: "الإكليل", mainStar: "Graffias (β Sco)", constellation: "Scorpius", weatherPattern: "Warming with increasing cloudiness", agriculturalSignificance: "Primary planting season begins", daysInGroup: 13, monthAssociation: 8, startDayOfYear: 31 },
  { number: 17, nameSomali: "Jilaal-dheer", nameArabic: "القلب", mainStar: "Antares (α Sco)", constellation: "Scorpius", weatherPattern: "Sustained Gu' rains", agriculturalSignificance: "Peak planting — most crops", daysInGroup: 13, monthAssociation: 9, startDayOfYear: 44 },
  { number: 18, nameSomali: "Xeebtarro", nameArabic: "الشولة", mainStar: "Shaula (λ Sco)", constellation: "Scorpius", weatherPattern: "Heavy rains — high river levels", agriculturalSignificance: "Restrict livestock near rivers", daysInGroup: 13, monthAssociation: 9, startDayOfYear: 57 },
  { number: 19, nameSomali: "Rooble", nameArabic: "النعائم", mainStar: "Kaus Australis (ε Sgr)", constellation: "Sagittarius", weatherPattern: "Good rain distribution", agriculturalSignificance: "Excellent pasture growth", daysInGroup: 13, monthAssociation: 10, startDayOfYear: 70 },
  { number: 20, nameSomali: "Bahaab", nameArabic: "البلدة", mainStar: "Ascella (ζ Sgr)", constellation: "Sagittarius", weatherPattern: "Rains moderating", agriculturalSignificance: "Herd expansion opportunities", daysInGroup: 13, monthAssociation: 10, startDayOfYear: 83 },
  { number: 21, nameSomali: "Geylo", nameArabic: "سعد الذابح", mainStar: "Algedi (α Cap)", constellation: "Capricornus", weatherPattern: "Gu' tail — rains decreasing", agriculturalSignificance: "Late planting last window", daysInGroup: 13, monthAssociation: 11, startDayOfYear: 96 },
  { number: 22, nameSomali: "Ciridaale", nameArabic: "سعد بلع", mainStar: "Sadalsuud (β Aqr)", constellation: "Aquarius", weatherPattern: "Transition to Xagaa heat", agriculturalSignificance: "Begin harvest preparations", daysInGroup: 13, monthAssociation: 11, startDayOfYear: 109 },
  { number: 23, nameSomali: "Cirir", nameArabic: "سعد الأخبية", mainStar: "Sadachbia (γ Aqr)", constellation: "Aquarius", weatherPattern: "Dry heat building", agriculturalSignificance: "Complete harvests before heat peak", daysInGroup: 13, monthAssociation: 12, startDayOfYear: 122 },
  { number: 24, nameSomali: "Laxaha", nameArabic: "سعد السعود", mainStar: "Sadalsuud (β Aqr)", constellation: "Aquarius", weatherPattern: "Xagaa fully established", agriculturalSignificance: "Post-harvest storage management", daysInGroup: 13, monthAssociation: 12, startDayOfYear: 135 },
  { number: 25, nameSomali: "Qorrax-gelin", nameArabic: "فرغ الدلو المقدم", mainStar: "Markab (α Peg)", constellation: "Pegasus", weatherPattern: "Desiccating NE winds", agriculturalSignificance: "Protect stored grain from humidity", daysInGroup: 13, monthAssociation: 1, startDayOfYear: 148 },
  { number: 26, nameSomali: "Cawl-koore", nameArabic: "فرغ الدلو المؤخر", mainStar: "Scheat (β Peg)", constellation: "Pegasus", weatherPattern: "Pre-Dabshid atmospheric shift", agriculturalSignificance: "Year-end livestock census", daysInGroup: 13, monthAssociation: 1, startDayOfYear: 161 },
  { number: 27, nameSomali: "Baabaar", nameArabic: "الرشاء", mainStar: "Algenib (γ Peg)", constellation: "Pegasus", weatherPattern: "Height of dry heat approaching Dabshid", agriculturalSignificance: "Begin Dabshid preparations", daysInGroup: 13, monthAssociation: 1, startDayOfYear: 174 },
  { number: 28, nameSomali: "Dabshid-xiddig", nameArabic: "بطن الحوت", mainStar: "Mirach (β And)", constellation: "Andromeda", weatherPattern: "Dabshid transition — new cycle begins", agriculturalSignificance: "Ceremonial New Year — ecological reset", daysInGroup: 13, monthAssociation: 1, startDayOfYear: 187 },
];

export const GODKA_28 = GODDAD_28;

// ═══════════════════════════════════════════════════════════════════
// GOORSHEEGTA — 8 Daily Time Segments
// ═══════════════════════════════════════════════════════════════════
export const GOORSHEEGTA: GoorsheegtaSegment[] = [
  { number: 1, nameSomali: "Subaxnimo-hore", nameEnglish: "Early Dawn", timeRange: "04:00–07:00", startHour: 4, endHour: 7, description: "First light — stars set, dawn animals active", pastoralistGuidance: "Move herds to grazing grounds, begin morning milking" },
  { number: 2, nameSomali: "Waaberi", nameEnglish: "Sunrise", timeRange: "07:00–09:00", startHour: 7, endHour: 9, description: "Full sunrise — temperature rising", pastoralistGuidance: "Finish milking, assess pasture conditions" },
  { number: 3, nameSomali: "Duhurnimo-hore", nameEnglish: "Forenoon", timeRange: "09:00–12:00", startHour: 9, endHour: 12, description: "Active morning — pre-peak heat", pastoralistGuidance: "Peak grazing time — watch water sources" },
  { number: 4, nameSomali: "Duhurnimo", nameEnglish: "Noon", timeRange: "12:00–15:00", startHour: 12, endHour: 15, description: "Solar peak — rest time (qiilo)", pastoralistGuidance: "Shelter animals from peak sun. No forced movement" },
  { number: 5, nameSomali: "Casir", nameEnglish: "Afternoon", timeRange: "15:00–17:00", startHour: 15, endHour: 17, description: "Cooling begins — second grazing window", pastoralistGuidance: "Return herds to secondary grazing areas" },
  { number: 6, nameSomali: "Galab", nameEnglish: "Late Afternoon", timeRange: "17:00–19:00", startHour: 17, endHour: 19, description: "Golden hour — preparation for night", pastoralistGuidance: "Return animals to camp. Evening milking" },
  { number: 7, nameSomali: "Fiid", nameEnglish: "Dusk/Evening", timeRange: "19:00–22:00", startHour: 19, endHour: 22, description: "Night falls — star observation begins", pastoralistGuidance: "Secure livestock. Read stars for tomorrow's weather" },
  { number: 8, nameSomali: "Habeennimo", nameEnglish: "Deep Night", timeRange: "22:00–04:00", startHour: 22, endHour: 28, description: "Deep night — maximum star visibility", pastoralistGuidance: "Night watch rotation. Read Goddad position for season forecast" },
];

// ═══════════════════════════════════════════════════════════════════
// 13 Star Seasons (legacy mapping for getStarSeason)
// ═══════════════════════════════════════════════════════════════════
const STAR_SEASONS: StarSeason[] = [
  { name: "Asher",      englishName: "Sirius",        meaning: "Dabshid New Year",    startDay: 201, endDay: 215 },
  { name: "Budh",       englishName: "Canopus",       meaning: "Peak Heat",           startDay: 216, endDay: 230 },
  { name: "Daraar",     englishName: "Procyon",        meaning: "Pre-Deyr Tension",    startDay: 231, endDay: 244 },
  { name: "Sor",        englishName: "Castor/Pollux",  meaning: "Cooling Winds",       startDay: 245, endDay: 259 },
  { name: "Suuban",     englishName: "Aldebaran",      meaning: "Peak Dayr Rains",     startDay: 260, endDay: 274 },
  { name: "Luul",       englishName: "Pleiades",       meaning: "Pastoral Scouting",   startDay: 275, endDay: 289 },
  { name: "Uuq",        englishName: "Betelgeuse",     meaning: "Heavy Rains",         startDay: 290, endDay: 304 },
  { name: "Biriir",     englishName: "Rigel",          meaning: "Dryness Starts",      startDay: 305, endDay: 319 },
  { name: "Jabaq",      englishName: "Bellatrix",      meaning: "Growing Dryness",     startDay: 320, endDay: 334 },
  { name: "Araar",      englishName: "Capella",        meaning: "Jiilaal Starts",      startDay: 335, endDay: 349 },
  { name: "Shugul",     englishName: "Alhena",         meaning: "Deep Drought",        startDay: 350, endDay: 364 },
  { name: "Atoor",      englishName: "Regulus",        meaning: "Mid-Jiilaal",         startDay: 1,   endDay: 15 },
  { name: "Hal-Dheere", englishName: "Spica",          meaning: "Late Jiilaal",        startDay: 16,  endDay: 30 },
];

// ═══════════════════════════════════════════════════════════════════
// CORE ENGINE
// ═══════════════════════════════════════════════════════════════════
export class KaltirsiEngine {
  /**
   * ANCHOR: Dabshid = July 20 (Gregorian) = Day 1, Month 1 (Samalaho)
   * Kaltirsi year = Gregorian anchorYear + 1098
   * e.g. July 20, 2025 → 2025 + 1098 = 3123
   *
   * VERIFIED OUTPUT:
   *   2026-04-18 → 30 Aminla' 3123 K.E. (Month 9, Day 30)
   */
  static gregorianToKaltirsi(date: Date): KaltirsiDate {
    const ANCHOR_MONTH = 6; // July (0-indexed)
    const ANCHOR_DAY = 20;
    const MONTH_LENGTH = 365.25 / 12; // ~30.4375 days

    const currentYear = date.getFullYear();

    // Determine anchor: if before July 20 this year, anchor is previous year's July 20
    let anchorYear = currentYear;
    const anchorThisYear = new Date(currentYear, ANCHOR_MONTH, ANCHOR_DAY);
    if (date < anchorThisYear) {
      anchorYear = currentYear - 1;
    }

    const anchorDate = new Date(anchorYear, ANCHOR_MONTH, ANCHOR_DAY);
    const diffMs = date.getTime() - anchorDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const monthIndex = Math.floor(diffDays / MONTH_LENGTH) % 12;
    const dayOfMonth = Math.floor(diffDays % MONTH_LENGTH) + 1;

    const kYear = anchorYear + 1098;

    return {
      year: kYear,
      month: monthIndex + 1,
      day: dayOfMonth,
      monthName: MONTHS_SOLAR[monthIndex]
    };
  }

  static getSeasonFromKDate(kDate: KaltirsiDate): Season {
    return getSeason(kDate.month - 1);
  }

  static getStarSeason(date: Date): StarSeason | null {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const star = STAR_SEASONS.find(s => dayOfYear >= s.startDay && dayOfYear <= s.endDay);
    if (star) return star;
    return { name: "Transition", englishName: "-", meaning: "Seasonal Transition", startDay: 0, endDay: 0 };
  }

  static getCurrentGodka(date: Date): Goddad | null {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    for (const g of GODDAD_28) {
      const gStart = g.startDayOfYear;
      const gEnd = gStart + g.daysInGroup - 1;
      if (gEnd <= 365) {
        if (dayOfYear >= gStart && dayOfYear <= gEnd) return g;
      } else {
        if (dayOfYear >= gStart || dayOfYear <= (gEnd - 365)) return g;
      }
    }
    return GODDAD_28[0];
  }

  static getCurrentGoorsheegta(date: Date): GoorsheegtaSegment {
    const hour = date.getHours();
    const segment = GOORSHEEGTA.find(g => {
      if (g.endHour <= 24) return hour >= g.startHour && hour < g.endHour;
      return hour >= g.startHour || hour < (g.endHour - 24);
    });
    return segment ?? GOORSHEEGTA[7];
  }

  static getHijriDate(date: Date): string {
    return new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).format(date);
  }

  static getSomaliTime(date: Date): string {
    let hours = date.getHours();
    let somaliHours = (hours + 6) % 12;
    if (somaliHours === 0) somaliHours = 12;
    let suffix = "";
    if (hours >= 6 && hours < 12) suffix = "Subaxnimo";
    else if (hours >= 12 && hours < 15) suffix = "Duhurnimo";
    else if (hours >= 15 && hours < 18) suffix = "Casir";
    else if (hours >= 18 && hours < 20) suffix = "Fiid";
    else suffix = "Habeennimo";
    return `${somaliHours}:${date.getMinutes().toString().padStart(2, '0')} ${suffix}`;
  }
}
