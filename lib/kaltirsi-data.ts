// ═══════════════════════════════════════════════════════════════════
// KALTIRSI DABSHID — CANONICAL HEX-TEMPORAL SOURCE OF TRUTH
// ═══════════════════════════════════════════════════════════════════
// This file is the single authoritative data layer for ALL Kaltirsi
// temporal, ecological, astronomical, and cultural information.
// Every month, day, hour, and season carries deep meaning.
// ═══════════════════════════════════════════════════════════════════

// --- Rich Month Type ---
export interface HexTemporalMonth {
  id: number;
  name: string;                   // Af-Soomaali canonical name
  altNames: string[];             // Alternative/regional names
  nameEnglish: string;            // English translation / meaning
  gregorianStart: string;         // Approximate Gregorian start
  season: "Xagaa" | "Dayr" | "Jiilaal" | "Gu'";
  seasonEnglish: string;
  ecologicalIndicator: string;    // What nature does in this month
  ecologicalIndicatorSo: string;  // Af-Soomaali ecological note
  themeColor: string;             // Brand hex for this month
  themeGradient: string;          // CSS gradient for banner
  icon: string;                   // Lucide icon name
  pastoralActivity: string;       // What nomads do
  maritimeNote: string;           // Maritime/coastal relevance
  proverb: string;                // Somali proverb for this month
  proverbEnglish: string;         // English translation
  daysInMonth: number;            // Standard days (30 or 31)
  lunarEquivalent: string;        // Approximate Hijri month mapping
  grazingIndex: number;           // 1-10: ecological grazing potential (1=critical stress, 10=peak abundance)
  droughtRisk: "low" | "moderate" | "high" | "critical"; // Pastoral risk level
}

// --- Somaliland Public Holiday ---
export interface SomalilandHoliday {
  id: string;
  name: string;                   // Official name
  nameSomali: string;             // Af-Soomaali
  date: string;                   // Fixed Gregorian date (or "varies" for Hijri)
  month: number;                  // Gregorian month (1-12)
  day: number;                    // Gregorian day
  type: "national" | "religious" | "cultural";
  description: string;
  descriptionSomali: string;
  kaltirsiMonth: string;          // Which Kaltirsi month it falls in
  color: string;                  // Brand color for this holiday
  significance: "critical" | "major" | "observance";
}

// --- Kaltirsi Weekday ---
export interface KaltirsiWeekday {
  id: number;
  nameStandard: string;           // Standard Somali (Sabti, Axad...)
  nameIndigenous: string;         // Indigenous (Sooroga, Koowin...)
  nameEnglish: string;
  meaning: string;                // Cultural meaning
  meaningSomali: string;
  pastoralGuidance: string;       // What pastoralists do
}

// --- Lunar Month (Indigenous Hijri) ---
export interface KaltirsiLunarMonth {
  id: number;
  nameSomali: string;             // Indigenous Somali name
  nameArabic: string;             // Standard Hijri name
  nameEnglish: string;
  significance: string;
}

// --- Godka Seasonal Group ---
export interface GodkaGroup {
  name: string;
  nameSomali: string;
  season: string;
  stars: string[];
}

// ═══════════════════════════════════════════════════════════════════
// 12 CANONICAL KALTIRSI MONTHS — FULL HEX-TEMPORAL DATA
// ═══════════════════════════════════════════════════════════════════
export const KALTIRSI_MONTHS: HexTemporalMonth[] = [
  {
    id: 1,
    name: "Karan",
    altNames: ["Habar-ari"],
    nameEnglish: "Extra Rain — Northwest Harvests",
    gregorianStart: "July 20",
    season: "Xagaa",
    seasonEnglish: "Summer / Dry Season",
    ecologicalIndicator: "Extra rain essential for northwest harvests. The Dabshid fire festival marks the new year.",
    ecologicalIndicatorSo: "Roobka dheeraadka ah ee gobolladda waqooyi-galbeed. Dabshiddu waa bilowga sannadka cusub.",
    themeColor: "#E85D04",
    themeGradient: "linear-gradient(135deg, #E85D04 0%, #D9A441 50%, #F97316 100%)",
    icon: "flame",
    pastoralActivity: "Celebrate Dabshid. Begin new year livestock census. Mark camel births.",
    maritimeNote: "Bad-xiran (monsoon closure) still active. No major coastal trade.",
    proverb: "Dabku waa bilowga, naftuna waa bilowga",
    proverbEnglish: "Fire is the beginning, and life is the beginning",
    daysInMonth: 31,
    lunarEquivalent: "Safar (approx)",
    grazingIndex: 4,
    droughtRisk: "high",
  },
  {
    id: 2,
    name: "Habar-ari",
    altNames: [],
    nameEnglish: "Uncertain Rains — Sheep Survival",
    gregorianStart: "August 20",
    season: "Xagaa",
    seasonEnglish: "Summer / Dry Season",
    ecologicalIndicator: "Uncertain rains, sufficient only for sheep survival. Heat intensifies.",
    ecologicalIndicatorSo: "Roob aan la hubin, oo kaliya idaha ku filan. Kulaylku wuu sii kordhayaa.",
    themeColor: "#DC5F00",
    themeGradient: "linear-gradient(135deg, #DC5F00 0%, #B45309 100%)",
    icon: "cloud-sun",
    pastoralActivity: "Move sheep to remaining green patches. Conserve water reserves.",
    maritimeNote: "Coastal winds moderate. Fishermen begin cautious returns.",
    proverb: "Idahu roob yaraan ku noolaan karaa, geeluuna biyo badanaan",
    proverbEnglish: "Sheep can survive little rain, but camels need abundance",
    daysInMonth: 30,
    lunarEquivalent: "Rabi' al-Awwal (approx)",
    grazingIndex: 3,
    droughtRisk: "high",
  },
  {
    id: 3,
    name: "Diraacgood",
    altNames: ["Diraac-good"],
    nameEnglish: "Absolute Peak Heat",
    gregorianStart: "September 19",
    season: "Xagaa",
    seasonEnglish: "Summer / Dry Season",
    ecologicalIndicator: "Absolute peak of dry summer heat. Land is parched. Animals stressed.",
    ecologicalIndicatorSo: "Kulaylka ugu badan ee xilliga xagaaga. Dhulku wuu engegay. Xoolahu way dhibaataysan yihiin.",
    themeColor: "#B91C1C",
    themeGradient: "linear-gradient(135deg, #B91C1C 0%, #E85D04 50%, #F59E0B 100%)",
    icon: "thermometer",
    pastoralActivity: "Reduce herd movement. Seek permanent wells. Night-only grazing.",
    maritimeNote: "Peak heat. Coastal zones slightly cooler but trade still disrupted.",
    proverb: "Kulaylku waa imtixaan, adkaysiguna waa guul",
    proverbEnglish: "Heat is a test, and endurance is victory",
    daysInMonth: 30,
    lunarEquivalent: "Rabi' al-Thani (approx)",
    grazingIndex: 2,
    droughtRisk: "critical",
  },
  {
    id: 4,
    name: "Dayrweyn",
    altNames: ["Dambasame"],
    nameEnglish: "Heaviest Secondary Rains",
    gregorianStart: "October 19",
    season: "Dayr",
    seasonEnglish: "Autumn / Short Rains",
    ecologicalIndicator: "Heaviest secondary rains arrive. Ram mating night. Ecological renewal begins.",
    ecologicalIndicatorSo: "Roobka labaad ee ugu badan. Habeenkii wanka la isku daray. Dhulku wuu soo nooleynayaa.",
    themeColor: "#8B5A2B",
    themeGradient: "linear-gradient(135deg, #8B5A2B 0%, #A16207 50%, #D9A441 100%)",
    icon: "cloud-drizzle",
    pastoralActivity: "Ram mating ceremonies. Move herds to fresh seasonal pastures.",
    maritimeNote: "Coastal rains begin. Ships prepare for trade season.",
    proverb: "Dayrtu waa barwaaqo haddii loo diyaar garoobayo",
    proverbEnglish: "The Dayr is prosperity if one prepares",
    daysInMonth: 31,
    lunarEquivalent: "Jumada al-Awwal (approx)",
    grazingIndex: 7,
    droughtRisk: "low",
  },
  {
    id: 5,
    name: "Ximir",
    altNames: ["Xoomir"],
    nameEnglish: "Red Star Rising — Optimal Grazing",
    gregorianStart: "November 19",
    season: "Dayr",
    seasonEnglish: "Autumn / Short Rains",
    ecologicalIndicator: "Red star rising signals optimal grazing window. Secondary crop growth.",
    ecologicalIndicatorSo: "Xiddigta cas ee soo baxaysa ayaa ka sheegaysa daaqsinta ugu fiican. Beeraha labaad waa koraan.",
    themeColor: "#92400E",
    themeGradient: "linear-gradient(135deg, #92400E 0%, #78350F 100%)",
    icon: "star",
    pastoralActivity: "Maximize grazing while grass is green. Build fat reserves for Jiilaal.",
    maritimeNote: "Short rains nourish coastal mangroves. Good fishing conditions.",
    proverb: "Xiddigta casku waa calaamadda daaqsinta",
    proverbEnglish: "The red star is the sign of grazing",
    daysInMonth: 30,
    lunarEquivalent: "Jumada al-Thani (approx)",
    grazingIndex: 8,
    droughtRisk: "low",
  },
  {
    id: 6,
    name: "Xays",
    altNames: [],
    nameEnglish: "Monsoon Bloom — Maritime Trade Opens",
    gregorianStart: "December 19",
    season: "Dayr",
    seasonEnglish: "Autumn / Short Rains",
    ecologicalIndicator: "Monsoon bloom. Opening of maritime trade (Bad-furan). Last rains fade.",
    ecologicalIndicatorSo: "Ubaxeedka duufaanka. Furitaanka ganacsiga badda (Bad-furan). Roobkii ugu dambeeya wuu idlaanayaa.",
    themeColor: "#7C5E3C",
    themeGradient: "linear-gradient(135deg, #7C5E3C 0%, #A16207 50%, #D4AF37 100%)",
    icon: "ship",
    pastoralActivity: "Final grazing rotations. Prepare for dry season ahead.",
    maritimeNote: "BAD-FURAN: Maritime trade officially opens. Ships depart Berbera, Zeila.",
    proverb: "Baddu furantay, ganacsiguna bilaabmay",
    proverbEnglish: "The sea has opened, and trade has begun",
    daysInMonth: 30,
    lunarEquivalent: "Rajab (approx)",
    grazingIndex: 6,
    droughtRisk: "moderate",
  },
  {
    id: 7,
    name: "Lixkor",
    altNames: ["Toddob"],
    nameEnglish: "Height of Dry Season — Permanent Wells",
    gregorianStart: "January 18",
    season: "Jiilaal",
    seasonEnglish: "Winter / Harsh Dry",
    ecologicalIndicator: "Height of dry season. Herds move to permanent wells. Peak pastoral stress.",
    ecologicalIndicatorSo: "Jiilaalka ugu daran. Xoolahu waxay u guuraan ceelasha joogtada ah. Dhibaatada ugu badan ee xoolaha.",
    themeColor: "#4A5568",
    themeGradient: "linear-gradient(135deg, #1e3a5f 0%, #4A5568 50%, #2d3748 100%)",
    icon: "droplets",
    pastoralActivity: "Move all herds to permanent wells. Ration water. Supplemental feeding.",
    maritimeNote: "Dry coastal winds. Fishing continues but challenging.",
    proverb: "Jiilaalku waa imtixaanka xoolaha iyo dadka",
    proverbEnglish: "Jiilaal is the test of livestock and people",
    daysInMonth: 31,
    lunarEquivalent: "Sha'ban (approx)",
    grazingIndex: 2,
    droughtRisk: "critical",
  },
  {
    id: 8,
    name: "Toddob",
    altNames: ["Adhi-caseeye", "Laba-Karan"],
    nameEnglish: "Seven-Star Rising — Isolated Rain Chance",
    gregorianStart: "February 18",
    season: "Jiilaal",
    seasonEnglish: "Winter / Harsh Dry",
    ecologicalIndicator: "Rising of a 7-star asterism. Chance of isolated, unreliable rain.",
    ecologicalIndicatorSo: "Toddobadda xiddigood ayaa soo baxaysa. Fursad yar oo roob aan la hubin.",
    themeColor: "#374151",
    themeGradient: "linear-gradient(135deg, #374151 0%, #1F2937 50%, #4B5563 100%)",
    icon: "cloud-moon",
    pastoralActivity: "Watch for Toddob star group. Any rain is precious — redirect herds immediately.",
    maritimeNote: "Calm seas. Winter fishing provides scarce protein.",
    proverb: "Toddobadda xiddigood waa rajo, laakiinse maaha ballan",
    proverbEnglish: "The seven stars are hope, but not a promise",
    daysInMonth: 30,
    lunarEquivalent: "Ramadan (approx)",
    grazingIndex: 1,
    droughtRisk: "critical",
  },
  {
    id: 9,
    name: "Aminla'",
    altNames: ["Daydo", "Lix-koore"],
    nameEnglish: "Unreliable Transition — Lost Rains",
    gregorianStart: "March 20",
    season: "Jiilaal",
    seasonEnglish: "Late Winter → Spring Transition",
    ecologicalIndicator: "\"Unreliable\" transition period. Potential for 'lost' rains that tease but don't sustain.",
    ecologicalIndicatorSo: "\"Aan la ahayn\" — xilli kala guurka ah. Roob lumay oo meesha yimaada laakiin aan sii jirin.",
    themeColor: "#6B7280",
    themeGradient: "linear-gradient(135deg, #4A5568 0%, #1EB53A 30%, #6B7280 100%)",
    icon: "wind",
    pastoralActivity: "Maximum vigilance. Any rain may be false. Keep herds near wells.",
    maritimeNote: "Sea conditions improving. Pre-Gu' maritime preparations.",
    proverb: "Aminla' waa bil aan la aamini karin",
    proverbEnglish: "Aminla' is a month you cannot trust",
    daysInMonth: 30,
    lunarEquivalent: "Shawwal (approx)",
    grazingIndex: 2,
    droughtRisk: "critical",
  },
  {
    id: 10,
    name: "Fushade",
    altNames: ["Seer-ma-weydo"],
    nameEnglish: "Certain Rain — Herds Leave the Well",
    gregorianStart: "April 19",
    season: "Gu'",
    seasonEnglish: "Spring / Long Rains",
    ecologicalIndicator: "Certain rain onset. Herds no longer need the well. Ecological rebirth.",
    ecologicalIndicatorSo: "Roobka hubaal ah ayaa bilaabmay. Xoolahu ceelashii uma baahna. Dhulku wuu soo noolaanayaa.",
    themeColor: "#1EB53A",
    themeGradient: "linear-gradient(135deg, #059669 0%, #1EB53A 50%, #34D399 100%)",
    icon: "cloud-rain",
    pastoralActivity: "Release herds to rain-fed pastures. Begin primary planting cycle.",
    maritimeNote: "Spring tides. Coastal fishing excellent. Trade routes busy.",
    proverb: "Fushade waa farxad, waayo roobku waa yimid",
    proverbEnglish: "Fushade is joy, for the rain has come",
    daysInMonth: 31,
    lunarEquivalent: "Dhu al-Qi'dah (approx)",
    grazingIndex: 8,
    droughtRisk: "low",
  },
  {
    id: 11,
    name: "Gu'soore",
    altNames: ["Cawl"],
    nameEnglish: "Peak Abundance — Peak Camel Lactation",
    gregorianStart: "May 20",
    season: "Gu'",
    seasonEnglish: "Spring / Long Rains",
    ecologicalIndicator: "Peak ecological abundance. Peak camel lactation. Maximum food security.",
    ecologicalIndicatorSo: "Barwaaqada ugu badan. Geeluhu caanaha ugu badan ayay siiyaan. Amniiga cuntada ugu sarreeya.",
    themeColor: "#059669",
    themeGradient: "linear-gradient(135deg, #047857 0%, #059669 50%, #10B981 100%)",
    icon: "leaf",
    pastoralActivity: "Peak milking. Livestock fattening. Surplus trade in markets.",
    maritimeNote: "Abundant coastal resources. Peak maritime trade season.",
    proverb: "Gu'soore waa bil barwaaqo leh — wax walba waa badan yihiin",
    proverbEnglish: "Gu'soore is the month of abundance — everything is plentiful",
    daysInMonth: 30,
    lunarEquivalent: "Dhu al-Hijjah (approx)",
    grazingIndex: 10,
    droughtRisk: "low",
  },
  {
    id: 12,
    name: "Samuulad",
    altNames: ["Sagaal"],
    nameEnglish: "Prosperity — Maritime Trade Closes",
    gregorianStart: "June 19",
    season: "Gu'",
    seasonEnglish: "Spring / Long Rains",
    ecologicalIndicator: "Prosperity. Closing of maritime trade (Bad-xiran). Preparation for Dabshid.",
    ecologicalIndicatorSo: "Barwaaqo. Xiritaanka ganacsiga badda (Bad-xiran). Diyaarinta Dabshid.",
    themeColor: "#0D9488",
    themeGradient: "linear-gradient(135deg, #0D9488 0%, #14B8A6 50%, #D9A441 100%)",
    icon: "anchor",
    pastoralActivity: "Final surplus trade. Prepare stores for Xagaa. Dabshid preparations.",
    maritimeNote: "BAD-XIRAN: Maritime trade officially closes before monsoon season.",
    proverb: "Samuulad waa dhammaadka barwaaqada, bilowga diyaarinta",
    proverbEnglish: "Samuulad is the end of prosperity, the beginning of preparation",
    daysInMonth: 30,
    lunarEquivalent: "Muharram (approx)",
    grazingIndex: 9,
    droughtRisk: "low",
  },
];

// ═══════════════════════════════════════════════════════════════════
// SOMALILAND PUBLIC HOLIDAYS — SOVEREIGN NATIONAL CALENDAR
// ═══════════════════════════════════════════════════════════════════
export const SOMALILAND_HOLIDAYS: SomalilandHoliday[] = [
  {
    id: "may-18",
    name: "Somaliland Independence Restoration Day",
    nameSomali: "Maalinta Soo-celinta Madaxbannaanida Somaliland",
    date: "May 18",
    month: 5,
    day: 18,
    type: "national",
    description: "Commemorating the 35th anniversary of the restoration of Somaliland's sovereignty in 1991.",
    descriptionSomali: "Xusidda sannad-guuradii 35aad ee soo-celinta madaxbannaanida Somaliland sanadkii 1991.",
    kaltirsiMonth: "Gu'soore",
    color: "#1EB53A",
    significance: "critical",
  },
  {
    id: "jun-26",
    name: "Somaliland Independence Day",
    nameSomali: "Maalinta Xorriyadda Somaliland",
    date: "June 26",
    month: 6,
    day: 26,
    type: "national",
    description: "Original 1960 independence of Somaliland from British colonial rule.",
    descriptionSomali: "Madaxbannaanidii asalkii ahayd ee 1960 ee Somaliland ka xoreysay gumeysigii Ingiriiska.",
    kaltirsiMonth: "Samuulad",
    color: "#1EB53A",
    significance: "critical",
  },
  {
    id: "jul-1",
    name: "Kulmis Day (Day of Regret)",
    nameSomali: "Maalinta Kulmiska (Maalinta Qoomamada)",
    date: "July 1",
    month: 7,
    day: 1,
    type: "national",
    description: "Marks the ill-fated 1960 union with Somalia — a day of reflection and national resolve.",
    descriptionSomali: "Xusuusta midowgii 1960 ee Soomaaliya — maalin muraayad iyo go'aan qaran.",
    kaltirsiMonth: "Samuulad",
    color: "#B91C1C",
    significance: "major",
  },
  {
    id: "jul-20",
    name: "Dabshid — Kaltirsi New Year",
    nameSomali: "Dabshid — Sanadka Cusub ee Kaltirsi",
    date: "July 20",
    month: 7,
    day: 20,
    type: "cultural",
    description: "The Somali fire-lighting festival marking the start of the Kaltirsi solar year. A 3,000-year tradition.",
    descriptionSomali: "Ciidda dabka ee Soomaalida ee calaamadeynaysa bilowga sannadka qorraxda ee Kaltirsi. Dhaqan 3,000 sano jira.",
    kaltirsiMonth: "Karan",
    color: "#D9A441",
    significance: "critical",
  },
  {
    id: "eid-fitr",
    name: "Eid al-Fitr",
    nameSomali: "Ciidda Fitarka",
    date: "varies",
    month: 0,
    day: 0,
    type: "religious",
    description: "End of Ramadan. Celebrated with communal prayers, feasting, and charity.",
    descriptionSomali: "Dhamaadka Soonka. Lagu xusaa salaad, diyaafad, iyo sadaqo.",
    kaltirsiMonth: "varies",
    color: "#059669",
    significance: "critical",
  },
  {
    id: "eid-adha",
    name: "Eid al-Adha (Arafa)",
    nameSomali: "Ciidda Arafada",
    date: "varies",
    month: 0,
    day: 0,
    type: "religious",
    description: "Festival of Sacrifice. Peak livestock trade period across Somaliland.",
    descriptionSomali: "Ciidda Allaybari. Xilliga ugu badan ee ganacsiga xoolaha Somaliland oo dhan.",
    kaltirsiMonth: "varies",
    color: "#D9A441",
    significance: "critical",
  },
  {
    id: "mawlid",
    name: "Mawlid al-Nabi",
    nameSomali: "Mowliidka Nabiga (NNKH)",
    date: "varies",
    month: 0,
    day: 0,
    type: "religious",
    description: "Birthday of Prophet Muhammad (PBUH). Celebrated with recitations and community gatherings.",
    descriptionSomali: "Maalinta dhalashada Nabi Maxamed (NNKH). Lagu xusaa akhriskii iyo isu-imaatinka bulshada.",
    kaltirsiMonth: "varies",
    color: "#1EB53A",
    significance: "major",
  },
];

// ═══════════════════════════════════════════════════════════════════
// KALTIRSI WEEKDAYS — DUAL NAMING SYSTEM
// ═══════════════════════════════════════════════════════════════════
export const KALTIRSI_WEEKDAYS: KaltirsiWeekday[] = [
  { id: 1, nameStandard: "Sabti", nameIndigenous: "Sooroga", nameEnglish: "Saturday", meaning: "Rest / Reset", meaningSomali: "Nasti / Dib-u-bilow", pastoralGuidance: "Day of rest. Review previous week's herding outcomes." },
  { id: 2, nameStandard: "Axad", nameIndigenous: "Koowin", nameEnglish: "Sunday", meaning: "The First", meaningSomali: "Ka hore", pastoralGuidance: "First day of the cycle. Plan movement routes." },
  { id: 3, nameStandard: "Isniin", nameIndigenous: "Laamin", nameEnglish: "Monday", meaning: "Alignment", meaningSomali: "Is-waafajin", pastoralGuidance: "Align herds. Check water sources." },
  { id: 4, nameStandard: "Talaado", nameIndigenous: "Lamataka", nameEnglish: "Tuesday", meaning: "Coordination", meaningSomali: "Iskaashi", pastoralGuidance: "Coordinate with neighboring clans on pasture access." },
  { id: 5, nameStandard: "Arbaco", nameIndigenous: "Koodaar", nameEnglish: "Wednesday", meaning: "Midpoint", meaningSomali: "Bar", pastoralGuidance: "Midweek assessment. Adjust plans based on conditions." },
  { id: 6, nameStandard: "Khamiis", nameIndigenous: "Hakis", nameEnglish: "Thursday", meaning: "Preparation", meaningSomali: "Diyaargarow", pastoralGuidance: "Prepare livestock for market. Assess animal health." },
  { id: 7, nameStandard: "Jimce", nameIndigenous: "Hakis Bila", nameEnglish: "Friday", meaning: "Opening / Completion", meaningSomali: "Furid / Dhammeyn", pastoralGuidance: "Community prayers. Market day in many towns." },
];

// ═══════════════════════════════════════════════════════════════════
// INDIGENOUS LUNAR MONTHS (Kaltirsi Dayaxeed)
// ═══════════════════════════════════════════════════════════════════
export const KALTIRSI_LUNAR_MONTHS: KaltirsiLunarMonth[] = [
  { id: 1, nameSomali: "Dago", nameArabic: "Muharram", nameEnglish: "New Beginning", significance: "Islamic New Year" },
  { id: 2, nameSomali: "Safar", nameArabic: "Safar", nameEnglish: "Journey", significance: "Travel month" },
  { id: 3, nameSomali: "Mowliid", nameArabic: "Rabi' al-Awwal", nameEnglish: "Birth (Mawlid)", significance: "Prophet's Birthday" },
  { id: 4, nameSomali: "Maalmadoone", nameArabic: "Rabi' al-Thani", nameEnglish: "Continuation", significance: "Part of Afarta bila samman" },
  { id: 5, nameSomali: "Rajalo Hore", nameArabic: "Jumada al-Awwal", nameEnglish: "First Rajalo", significance: "Part of Afarta bila samman" },
  { id: 6, nameSomali: "Rajalo Dhexe", nameArabic: "Jumada al-Thani", nameEnglish: "Middle Rajalo", significance: "Part of Afarta bila samman" },
  { id: 7, nameSomali: "Rajalo Dambe", nameArabic: "Rajab", nameEnglish: "Last Rajalo", significance: "Sacred month" },
  { id: 8, nameSomali: "Soondheere", nameArabic: "Sha'ban", nameEnglish: "Pre-fast", significance: "Preparation for Ramadan" },
  { id: 9, nameSomali: "Soon", nameArabic: "Ramadan", nameEnglish: "The Fast", significance: "Month of fasting" },
  { id: 10, nameSomali: "Soonfur", nameArabic: "Shawwal", nameEnglish: "Post-fast", significance: "Eid al-Fitr" },
  { id: 11, nameSomali: "Sidataal", nameArabic: "Dhu al-Qi'dah", nameEnglish: "Truce", significance: "Sacred month of peace" },
  { id: 12, nameSomali: "Arrafo", nameArabic: "Dhu al-Hijjah", nameEnglish: "Pilgrimage", significance: "Hajj and Eid al-Adha" },
];

// ═══════════════════════════════════════════════════════════════════
// 28 GODKA — FOUR SEASONAL CONFIGURATION GROUPS
// ═══════════════════════════════════════════════════════════════════
export const GODKA_GROUPS: GodkaGroup[] = [
  {
    name: "Naaf",
    nameSomali: "Kooxda Naaf",
    season: "Xagaa (Summer)",
    stars: ["Naaf Cadde", "Naaf Madobe", "Afqoys", "Kuxdin Hore", "Kuxdin Dambe", "Dirir-day", "Dirir"],
  },
  {
    name: "Dalalle",
    nameSomali: "Kooxda Dalalle",
    season: "Dayr (Autumn)",
    stars: ["Garbo", "Gudban", "Lib Casse", "Hor Dameer", "Hor Cadde", "Mareega-Dheer", "Bah"],
  },
  {
    name: "Faraci",
    nameSomali: "Kooxda Faraci",
    season: "Jiilaal (Winter)",
    stars: ["Faraci", "Listaan", "Lixo (Pleiades)", "Cadcad", "Saco", "Nujusi", "Afa-gaal"],
  },
  {
    name: "Cirir",
    nameSomali: "Kooxda Cirir",
    season: "Gu' (Spring)",
    stars: ["Faruuryo", "Jid Gabarre", "Jid Gacanle", "Jid-Dhiriqle", "Rab Hore", "Gog Madobe", "Rab Dambe"],
  },
];

// ═══════════════════════════════════════════════════════════════════
// SOVEREIGN DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════
export const SOVEREIGNTY_TOKENS = {
  // Primary Identity
  sandCream: "#FFF8F1",
  camelBeige: "#F3E6D0",
  dabshidGold: "#D9A441",

  // Seasonal Accents
  springGreen: "#1EB53A",
  solarOrange: "#E85D04",
  deepEarth: "#8B5A2B",
  slateGray: "#4A5568",

  // Somaliland Flag
  flagGreen: "#1EB53A",
  flagWhite: "#FFFFFF",
  flagRed: "#CE1126",

  // Dark Mode
  obsidian: "#0e1117",
  darkCard: "#141820",
} as const;

// ═══════════════════════════════════════════════════════════════════
// HELPER: Get the current month's full data
// ═══════════════════════════════════════════════════════════════════
export function getCurrentKaltirsiMonth(kaltirsiMonthNumber: number): HexTemporalMonth {
  return KALTIRSI_MONTHS[(kaltirsiMonthNumber - 1) % 12] || KALTIRSI_MONTHS[0];
}

export function getUpcomingHolidays(today: Date, count = 3): SomalilandHoliday[] {
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // Fixed-date holidays sorted by proximity
  const fixed = SOMALILAND_HOLIDAYS
    .filter(h => h.month > 0) // Exclude "varies"
    .sort((a, b) => {
      const aDays = (a.month - currentMonth) * 30 + (a.day - currentDay);
      const bDays = (b.month - currentMonth) * 30 + (b.day - currentDay);
      const aAdjusted = aDays < 0 ? aDays + 365 : aDays;
      const bAdjusted = bDays < 0 ? bDays + 365 : bDays;
      return aAdjusted - bAdjusted;
    });

  return fixed.slice(0, count);
}
