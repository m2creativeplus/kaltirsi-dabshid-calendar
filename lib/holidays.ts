export type Holiday = {
  date: string; // MM-DD format (Gregorian) to match easily
  name: string;
  isReligious: boolean;
};

export const SOMALILAND_HOLIDAYS: Holiday[] = [
  { date: "01-01", name: "New Year's Day", isReligious: false },
  { date: "05-01", name: "Labour Day", isReligious: false },
  { date: "05-18", name: "Somaliland Restoration of Sovereignty", isReligious: false },
  { date: "06-26", name: "Independence Day", isReligious: false },
  // Religious holidays vary by year, so hardcoding specific 2026/2025 dates or calculating them is needed.
  // For MVP, we'll list the key fixed ones and perhaps current year's religious ones.
  { date: "07-20", name: "Dabshid (Somali New Year)", isReligious: false },
];

export function getHolidaysForDate(date: Date): Holiday[] {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dateStr = `${month}-${day}`;
  
  return SOMALILAND_HOLIDAYS.filter(h => h.date === dateStr);
}
