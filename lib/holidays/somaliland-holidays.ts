import { gregorianToHijri } from "./hijri-calculator";

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  type: "public" | "religious" | "observance";
}

export function getSomalilandHolidays(year: number): Holiday[] {
  const holidays: Holiday[] = [];

  // Fixed Date Holidays
  holidays.push({ date: `${year}-01-01`, name: "New Year's Day", type: "public" });
  holidays.push({ date: `${year}-05-01`, name: "Labour Day", type: "public" });
  holidays.push({ date: `${year}-05-18`, name: "Somaliland Independence Day", type: "public" });
  holidays.push({ date: `${year}-06-26`, name: "Independence from Britain", type: "public" });

  // Religious Holidays (Hijri based estimate)
  // We scan the year to find matching Hijri dates
  // Major Islamic Dates:
  // 1 Ramadan (Fasting)
  // 1 Shawwal (Eid al-Fitr)
  // 10 Dhul-Hijjah (Eid al-Adha)
  // 1 Muharram (Islamic New Year)
  // 12 Rabi' al-Awwal (Mawlid)

  // This is a naive scan, but effective for client-side valid range
  // Iterate through each day of the year
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const hDate = gregorianToHijri(d);
    const dateStr = d.toISOString().split('T')[0];

    // Ramadan Start
    if (hDate.month === 8 && hDate.day === 1) {
      holidays.push({ date: dateStr, name: "First Day of Ramadan", type: "religious" });
    }
    
    // Eid al-Fitr
    if (hDate.month === 9 && hDate.day === 1) {
      holidays.push({ date: dateStr, name: "Eid al-Fitr", type: "public" });
      // Usually multiple days, adding day 1 for now
    }

    // Eid al-Adha
    if (hDate.month === 11 && hDate.day === 10) {
      holidays.push({ date: dateStr, name: "Eid al-Adha", type: "public" });
    }

    // Islamic New Year
    if (hDate.month === 0 && hDate.day === 1) {
      holidays.push({ date: dateStr, name: "Islamic New Year", type: "observance" });
    }

    // Mawlid
    if (hDate.month === 2 && hDate.day === 12) {
      holidays.push({ date: dateStr, name: "Mawlid al-Nabi", type: "observance" });
    }
  }

  return holidays;
}
