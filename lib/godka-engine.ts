/**
 * KALTIRSI GODKA ENGINE — THE 28 LUNAR MANSIONS
 * 
 * Maps precisely to IAU Constellations as established in the 
 * Kaltirsi Intelligence Engine Execution Package.
 */

export interface GodkaNode {
  id: number;
  name: string;
  seasonGroup: "Faraci" | "Cirir" | "Naaf" | "Dalalle";
  associatedSeason: "Jiilaal" | "Gu'" | "Xagaa" | "Dayr";
  iauStar: string;
  constellation: string;
  significance: string;
}

export const CANONICAL_GODKA: GodkaNode[] = [
  // WINTER (JIILAAL)
  { id: 1, name: "Faraci", seasonGroup: "Faraci", associatedSeason: "Jiilaal", iauStar: "γ Arietis", constellation: "Aries", significance: "Observation block begins" },
  { id: 2, name: "Listaan", seasonGroup: "Faraci", associatedSeason: "Jiilaal", iauStar: "α Arietis", constellation: "Aries", significance: "Indicator of wind shifts" },
  { id: 3, name: "Lixo", seasonGroup: "Faraci", associatedSeason: "Jiilaal", iauStar: "Pleiades (M45)", constellation: "Taurus", significance: "MASTER TRIGGER: Dambasame (Sheep Copulation)" },
  { id: 4, name: "Cadcad", seasonGroup: "Faraci", associatedSeason: "Jiilaal", iauStar: "Aldebaran", constellation: "Taurus", significance: "Bright follower of Pleiades" },
  { id: 5, name: "Saco", seasonGroup: "Faraci", associatedSeason: "Jiilaal", iauStar: "λ Orionis", constellation: "Orion", significance: "Warns of peak Jiilaal frost" },
  { id: 6, name: "Nujusi", seasonGroup: "Faraci", associatedSeason: "Jiilaal", iauStar: "Alhena", constellation: "Gemini", significance: "Dry conditions tightening" },
  { id: 7, name: "Afa-gaal", seasonGroup: "Faraci", associatedSeason: "Jiilaal", iauStar: "Castor & Pollux", constellation: "Gemini", significance: "Severe dryness" },

  // SPRING (GU')
  { id: 8, name: "Faruuryo", seasonGroup: "Cirir", associatedSeason: "Gu'", iauStar: "Beehive Cluster", constellation: "Cancer", significance: "Lips of the rain-bearing clouds" },
  { id: 9, name: "Jid Gabarre", seasonGroup: "Cirir", associatedSeason: "Gu'", iauStar: "Al Jabbah", constellation: "Leo", significance: "Early signs of humidity" },
  { id: 10, name: "Jid Gacanle", seasonGroup: "Cirir", associatedSeason: "Gu'", iauStar: "Regulus", constellation: "Leo", significance: "Strong arm of the rain front" },
  { id: 11, name: "Jid-Dhiriqle", seasonGroup: "Cirir", associatedSeason: "Gu'", iauStar: "Zosma", constellation: "Leo", significance: "The Muddy Path - heavy soaking Gu' rains" },
  { id: 12, name: "Rab Hore", seasonGroup: "Cirir", associatedSeason: "Gu'", iauStar: "Denebola", constellation: "Leo", significance: "First phase of pastoral abundance" },
  { id: 13, name: "Gog Madobe", seasonGroup: "Cirir", associatedSeason: "Gu'", iauStar: "Zavijava", constellation: "Virgo", significance: "Dark raining clouds dropping" },
  { id: 14, name: "Rab Dambe", seasonGroup: "Cirir", associatedSeason: "Gu'", iauStar: "Porrima", constellation: "Virgo", significance: "Milk yields peak" },

  // SUMMER (XAGAA)
  { id: 15, name: "Naaf Cadde", seasonGroup: "Naaf", associatedSeason: "Xagaa", iauStar: "Delta Virginis", constellation: "Virgo", significance: "Cloudless, hot, windy skies" },
  { id: 16, name: "Naaf Madobe", seasonGroup: "Naaf", associatedSeason: "Xagaa", iauStar: "Vindemiatrix", constellation: "Virgo", significance: "Wind-blown dust storms" },
  { id: 17, name: "Afqoys", seasonGroup: "Naaf", associatedSeason: "Xagaa", iauStar: "Zubenelgenubi", constellation: "Libra", significance: "Sporadic localized showers" },
  { id: 18, name: "Kuxdin Hore", seasonGroup: "Naaf", associatedSeason: "Xagaa", iauStar: "Dschubba", constellation: "Scorpius", significance: "Onset of intense dry heat" },
  { id: 19, name: "Kuxdin Dambe", seasonGroup: "Naaf", associatedSeason: "Xagaa", iauStar: "Pi Scorpii", constellation: "Scorpius", significance: "Peak Xagaa heatwave" },
  { id: 20, name: "Dirir-day", seasonGroup: "Naaf", associatedSeason: "Xagaa", iauStar: "Sigma Scorpii", constellation: "Scorpius", significance: "Precursor of the Dirir star" },
  { id: 21, name: "Dirir", seasonGroup: "Naaf", associatedSeason: "Xagaa", iauStar: "Spica", constellation: "Virgo", significance: "MASTER TRIGGER: Specific time to harvest/plant" },

  // AUTUMN (DAYR)
  { id: 22, name: "Garbo", seasonGroup: "Dalalle", associatedSeason: "Dayr", iauStar: "Antares", constellation: "Scorpius", significance: "Shifting burden of the climate" },
  { id: 23, name: "Gudban", seasonGroup: "Dalalle", associatedSeason: "Dayr", iauStar: "Shaula", constellation: "Scorpius", significance: "Transitional weather crossing" },
  { id: 24, name: "Lib Casse", seasonGroup: "Dalalle", associatedSeason: "Dayr", iauStar: "Kaus Media", constellation: "Sagittarius", significance: "Sudden onset of Dayr storms" },
  { id: 25, name: "Hor Dameer", seasonGroup: "Dalalle", associatedSeason: "Dayr", iauStar: "Nunki", constellation: "Sagittarius", significance: "Steady rains" },
  { id: 26, name: "Hor Cadde", seasonGroup: "Dalalle", associatedSeason: "Dayr", iauStar: "Capricornus", constellation: "Capricornus", significance: "Clear, rain-washed skies" },
  { id: 27, name: "Mareega-Dheer", seasonGroup: "Dalalle", associatedSeason: "Dayr", iauStar: "Pegasus Markab", constellation: "Pegasus", significance: "Drawing of deep well water" },
  { id: 28, name: "Bah", seasonGroup: "Dalalle", associatedSeason: "Dayr", iauStar: "Alpha Andromedae", constellation: "Andromeda", significance: "Cycle reset" },
];

export class GodkaEngine {
  /**
   * Retrieves the current Godka based on the exact day of the year calculating the lunar path.
   */
  static getCurrentGodka(date: Date): GodkaNode {
    // There are 365.25 days and 28 Godka. Each Godka lasts exactly 13 days.
    // Base standard anchoring offset. (simplified for live representation)
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = (date.getTime() - startOfYear.getTime()) + ((startOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    let index = Math.floor(dayOfYear / 13) % 28;
    return CANONICAL_GODKA[index];
  }
}
