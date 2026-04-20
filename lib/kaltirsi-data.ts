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
  exactMeaningSomali: string;     // Exact Somali linguistic meaning
  detailedDescription: string;    // Deep pastoral/ecological explanation
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
    altNames: ["Samalaho", "Habar-Karan"],
    exactMeaningSomali: "The Fire & Haze",
    detailedDescription: "Start of the solar year. Ritual fire (Dabshid). Expecting extra rains.",
    nameEnglish: "The Fire & Haze",
    gregorianStart: "July 20",
    season: "Xagaa",
    seasonEnglish: "Xagaa / Summer",
    ecologicalIndicator: "Start of the solar year. Ritual fire (Dabshid). Expecting extra rains.",
    ecologicalIndicatorSo: "Roobka hordhaca ah ee Xagaaga; xooluhu waxay dhuuxaan doogga galbeedka.",
    themeColor: "#E85D04",
    themeGradient: "linear-gradient(135deg, #E85D04 0%, #D9A441 50%, #F97316 100%)",
    icon: "flame",
    pastoralActivity: "Start of the solar year. Ritual fire (Dabshid). Expecting extra rains.",
    maritimeNote: "Xagaa Hot Winds",
    proverb: "Dabku waa bilowga, naftuna waa bilowga",
    proverbEnglish: "Fire is the beginning, and life is the beginning",
    daysInMonth: 31,
    lunarEquivalent: "Canopus",
    grazingIndex: 1,
    droughtRisk: "high",
  },
  {
    id: 2,
    name: "Habar-ari",
    altNames: ["Habar-adhi"],
    exactMeaningSomali: "The Meager Rains",
    detailedDescription: "Light, isolated showers. Old woman's sheep can survive.",
    nameEnglish: "The Meager Rains",
    gregorianStart: "Aug 20",
    season: "Xagaa",
    seasonEnglish: "Xagaa / Summer",
    ecologicalIndicator: "Light, isolated showers. Old woman's sheep can survive.",
    ecologicalIndicatorSo: "\"Roobka Habarta\"; waa dhibic yar oo kaliya ariga qoyn karta.",
    themeColor: "#DC5F00",
    themeGradient: "linear-gradient(135deg, #DC5F00 0%, #B45309 100%)",
    icon: "cloud-sun",
    pastoralActivity: "Light, isolated showers. Old woman's sheep can survive.",
    maritimeNote: "Light Breezes",
    proverb: "Idahu roob yaraan ku noolaan karaa",
    proverbEnglish: "Sheep can survive little rain",
    daysInMonth: 30,
    lunarEquivalent: "Procyon",
    grazingIndex: 2,
    droughtRisk: "high",
  },
  {
    id: 3,
    name: "Diraac-good",
    altNames: ["Diraac-peak"],
    exactMeaningSomali: "The Peak Heat",
    detailedDescription: "Absolute peak of summer heat. Land is at its harshest.",
    nameEnglish: "The Peak Heat",
    gregorianStart: "Sept 19",
    season: "Xagaa",
    seasonEnglish: "Xagaa / Summer",
    ecologicalIndicator: "Absolute peak of summer heat. Land is at its harshest.",
    ecologicalIndicatorSo: "Kulka ugu dambeeya ee Xagaaga ka hor intaan Dayrtu curan.",
    themeColor: "#B91C1C",
    themeGradient: "linear-gradient(135deg, #B91C1C 0%, #E85D04 50%, #F59E0B 100%)",
    icon: "thermometer",
    pastoralActivity: "Absolute peak of summer heat. Land is at its harshest.",
    maritimeNote: "Weak Variable",
    proverb: "Kulaylku waa imtixaan",
    proverbEnglish: "Heat is a test",
    daysInMonth: 30,
    lunarEquivalent: "Vega",
    grazingIndex: 1,
    droughtRisk: "critical",
  },
  {
    id: 4,
    name: "Dambasame",
    altNames: ["Dayrweyn", "Dalali"],
    exactMeaningSomali: "The Mating Moon",
    detailedDescription: "Rams released to mate. Timed for the Gu' rains (150 days).",
    nameEnglish: "The Mating Moon",
    gregorianStart: "Oct 19",
    season: "Dayr",
    seasonEnglish: "Dayr / Autumn",
    ecologicalIndicator: "Rams released to mate. Timed for the Gu' rains (150 days).",
    ecologicalIndicatorSo: "Curashada Dayrta; dhulku wuxuu noqdaa dambas la sifeeyay oo barwaaqo leh.",
    themeColor: "#1d4ed8",
    themeGradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)",
    icon: "moon",
    pastoralActivity: "Rams released to mate. Timed for the Gu' rains (150 days).",
    maritimeNote: "Easterly Breezes",
    proverb: "Dambasame waa dhalashada nolosha cusub",
    proverbEnglish: "Dambasame is the birth of new life",
    daysInMonth: 31,
    lunarEquivalent: "Urur (Pleiades)",
    grazingIndex: 3,
    droughtRisk: "low",
  },
  {
    id: 5,
    name: "Xoomir",
    altNames: ["Ximir", "Ururdha"],
    exactMeaningSomali: "The Transition",
    detailedDescription: "Late Dayr. Cold winds rise. Transition to the next season.",
    nameEnglish: "The Transition",
    gregorianStart: "Nov 19",
    season: "Dayr",
    seasonEnglish: "Dayr / Autumn",
    ecologicalIndicator: "Late Dayr. Cold winds rise. Transition to the next season.",
    ecologicalIndicatorSo: "Barwaaqada Dayrta oo fadhida; xooluhu aad bay u dhergaan.",
    themeColor: "#92400E",
    themeGradient: "linear-gradient(135deg, #b45309 0%, #92400E 100%)",
    icon: "wind",
    pastoralActivity: "Late Dayr. Cold winds rise. Transition to the next season.",
    maritimeNote: "Ancestor Wind",
    proverb: "Dabaysha qabow waa calaamad isbedel",
    proverbEnglish: "The cold wind is a sign of change",
    daysInMonth: 30,
    lunarEquivalent: "Arcturus",
    grazingIndex: 3,
    droughtRisk: "low",
  },
  {
    id: 6,
    name: "Xays",
    altNames: ["Xaysin", "Daradhaf"],
    exactMeaningSomali: "The Coastal Mist",
    detailedDescription: "Maritime mist season. Humidity rises before deep dry.",
    nameEnglish: "The Coastal Mist",
    gregorianStart: "Dec 19",
    season: "Dayr",
    seasonEnglish: "Dayr / Autumn",
    ecologicalIndicator: "Maritime mist season. Humidity rises before deep dry.",
    ecologicalIndicatorSo: "Roobabka qabow ee xilliga qaboobaha ee dhulka xeebta.",
    themeColor: "#64748b",
    themeGradient: "linear-gradient(135deg, #475569 0%, #64748b 50%, #94a3b8 100%)",
    icon: "cloud-fog",
    pastoralActivity: "Maritime mist season. Humidity rises before deep dry.",
    maritimeNote: "Moist Coastal",
    proverb: "Ceeryaantu waa biyaha badda oo safraya",
    proverbEnglish: "Mist is the sea water traveling",
    daysInMonth: 30,
    lunarEquivalent: "Capella",
    grazingIndex: 2,
    droughtRisk: "moderate",
  },
  {
    id: 7,
    name: "Lixkor",
    altNames: ["Lix-koore"],
    exactMeaningSomali: "The Deep Dry",
    detailedDescription: "Deep Jiilaal. Reliance on deep wells. Land at maximum test.",
    nameEnglish: "The Deep Dry",
    gregorianStart: "Jan 18",
    season: "Jiilaal",
    seasonEnglish: "Jiilaal / Winter",
    ecologicalIndicator: "Deep Jiilaal. Reliance on deep wells. Land at maximum test.",
    ecologicalIndicatorSo: "Marka dayaxu Dirir lix habeen kaga koro; waa digniinta jiilaalka adag.",
    themeColor: "#1f2937",
    themeGradient: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)",
    icon: "droplets",
    pastoralActivity: "Deep Jiilaal. Reliance on deep wells. Land at maximum test.",
    maritimeNote: "Dry Northeasterly",
    proverb: "Toddob waxaa ugu adag oonka",
    proverbEnglish: "Toddob is hardest for thirst",
    daysInMonth: 31,
    lunarEquivalent: "Aldebaran",
    grazingIndex: 1,
    droughtRisk: "critical",
  },
  {
    id: 8,
    name: "Toddob",
    altNames: ["Adhi-caseeye"],
    exactMeaningSomali: "The Red Soil Sun",
    detailedDescription: "Sun reddens the soil and sheep. Prepare for Gu'.",
    nameEnglish: "The Red Soil Sun",
    gregorianStart: "Feb 18",
    season: "Jiilaal",
    seasonEnglish: "Jiilaal / Winter",
    ecologicalIndicator: "Sun reddens the soil and sheep. Prepare for Gu'.",
    ecologicalIndicatorSo: "Abaarta ugu adag; xooluhu waxay tirsadaan biyaha ceelasha moolka ah.",
    themeColor: "#991b1b",
    themeGradient: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)",
    icon: "sun",
    pastoralActivity: "Sun reddens the soil and sheep. Prepare for Gu'.",
    maritimeNote: "Hot Xagaa",
    proverb: "Ciid cas iyo adhi cas waa xilliga xasaasiga",
    proverbEnglish: "Red soil and red sheep is the critical season",
    daysInMonth: 30,
    lunarEquivalent: "Antares",
    grazingIndex: 2,
    droughtRisk: "critical",
  },
  {
    id: 9,
    name: "Aminla'",
    altNames: ["Daydo", "Ma-hubto"],
    exactMeaningSomali: "The Lost Rains",
    detailedDescription: "Unreliable rains. High stress for herds and herders.",
    nameEnglish: "The Lost Rains",
    gregorianStart: "Mar 20",
    season: "Jiilaal",
    seasonEnglish: "Jiilaal / Transition",
    ecologicalIndicator: "Unreliable rains. High stress for herds and herders.",
    ecologicalIndicatorSo: "\"Waqtiga aan la isku halleyn karin\"; xilliga ugu dambeeya ee dhibka miyiga.",
    themeColor: "#71717a",
    themeGradient: "linear-gradient(135deg, #52525b 0%, #71717a 50%, #a1a1aa 100%)",
    icon: "cloud-lightning",
    pastoralActivity: "Unreliable rains. High stress for herds and herders.",
    maritimeNote: "Unreliable Gusts",
    proverb: "Aminla' waa waqti qatar ah",
    proverbEnglish: "Aminla' is a dangerous time",
    daysInMonth: 30,
    lunarEquivalent: "Altair",
    grazingIndex: 1,
    droughtRisk: "critical",
  },
  {
    id: 10,
    name: "Fushade",
    altNames: ["Ceelka-geeye", "Seer-ma-weydo"],
    exactMeaningSomali: "The Rain Onset",
    detailedDescription: "Moon occults Dirir. Gu' begins. No more going to the well.",
    nameEnglish: "The Rain Onset",
    gregorianStart: "Apr 19",
    season: "Gu'",
    seasonEnglish: "Gu' / Spring",
    ecologicalIndicator: "Moon occults Dirir. Gu' begins. No more going to the well.",
    ecologicalIndicatorSo: "\"Ceelka ka kici\"; curashada roobka Gu'ga iyo barwaaqada koowaad.",
    themeColor: "#059669",
    themeGradient: "linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)",
    icon: "cloud-rain",
    pastoralActivity: "Moon occults Dirir. Gu' begins. No more going to the well.",
    maritimeNote: "Moist Shift",
    proverb: "Fushade ceelku wuu nastaa",
    proverbEnglish: "In Fushade, the well rests",
    daysInMonth: 31,
    lunarEquivalent: "Dirir (Spica)",
    grazingIndex: 4,
    droughtRisk: "low",
  },
  {
    id: 11,
    name: "Gu'-soore",
    altNames: ["Badhayse", "Dhaseyne"],
    exactMeaningSomali: "The Peak Abundance",
    detailedDescription: "Peak vegetation, milk, and life. The wealth of the year.",
    nameEnglish: "The Peak Abundance",
    gregorianStart: "May 20",
    season: "Gu'",
    seasonEnglish: "Gu' / Spring",
    ecologicalIndicator: "Peak vegetation, milk, and life. The wealth of the year.",
    ecologicalIndicatorSo: "Barkadda barwaaqada; xooluhu waxay qabaan raaxo iyo dhalmo badan.",
    themeColor: "#15803d",
    themeGradient: "linear-gradient(135deg, #166534 0%, #15803d 50%, #22c55e 100%)",
    icon: "leaf",
    pastoralActivity: "Peak vegetation, milk, and life. The wealth of the year.",
    maritimeNote: "Rain-fed Breezes",
    proverb: "Gu'soore waa bil barwaaqo leh",
    proverbEnglish: "Gu'soore is the month of abundance",
    daysInMonth: 30,
    lunarEquivalent: "Canopus High",
    grazingIndex: 5,
    droughtRisk: "low",
  },
  {
    id: 12,
    name: "Samuulad",
    altNames: ["Lixadhaqo", "Adar"],
    exactMeaningSomali: "The Maritime Close",
    detailedDescription: "Bad-xiran. The sea closes. Season and cycle complete.",
    nameEnglish: "The Maritime Close",
    gregorianStart: "Jun 19",
    season: "Gu'",
    seasonEnglish: "Gu' / Spring",
    ecologicalIndicator: "Bad-xiran. The sea closes. Season and cycle complete.",
    ecologicalIndicatorSo: "Dhammaadka roobka iyo xilliga badda la xidho (Bad-xiran).",
    themeColor: "#0f766e",
    themeGradient: "linear-gradient(135deg, #115e59 0%, #0f766e 50%, #14b8a6 100%)",
    icon: "anchor",
    pastoralActivity: "Bad-xiran. The sea closes. Season and cycle complete.",
    maritimeNote: "Maritime Strong",
    proverb: "Samuulad badda lama galo",
    proverbEnglish: "In Samuulad, you do not enter the sea",
    daysInMonth: 30,
    lunarEquivalent: "Fomalhaut",
    grazingIndex: 3,
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
    name: "Samuulad",
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
