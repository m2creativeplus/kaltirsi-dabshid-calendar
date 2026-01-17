// Helper to get Hijri parts from a Gregorian date
export function getHijriParts(date: Date) {
  // Use standard islamic calendar which is consistently supported
  const formatter = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const parts = formatter.formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) => 
    parseInt(parts.find(p => p.type === type)?.value || "0", 10);
  
  return {
    day: getPart("day"),
    month: getPart("month"),
    year: getPart("year")
  };
}

// Helper to format Hijri month/year
export function formatHijriMonthYear(date: Date) {
  return new Intl.DateTimeFormat("en-US-u-ca-islamic", {
    month: "long",
    year: "numeric",
  }).format(date);
}

// Helper to format Hijri full date
export function formatHijriFull(date: Date) {
    return new Intl.DateTimeFormat("en-US-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long"
    }).format(date);
  }

// Navigation helpers
// Since we store state as Gregorian, but we want to navigate by Hijri months:
// - Next Month: Add 29 days (safe minimum) then check if we are in next month. If not, add more.
// - Prev Month: Subtract 29 days...

export function addHijriMonth(date: Date, months: number): Date {
  const newDate = new Date(date);
  if (months === 0) return newDate;
  
  // Approximate jump: 29.5 days per month
  const daysToJump = Math.floor(months * 29.53); 
  // Add margin to land safely in target month usually
  // But exact calculation requires checking.
  
  newDate.setDate(newDate.getDate() + daysToJump);
  
  // Correction: Check if we landed in the correct month difference relative to start
  // This is complex because 'months' delta is relative to Hijri calendar
  // Simpler UI approach: The user wants to see "Next Month". 
  // We just need to find A date that falls in (CurrentHijriMonth + 1).
  
  const currentParts = getHijriParts(date);
  let targetMonth = currentParts.month + months;
  let targetYear = currentParts.year;

  // Handle wrap around
  while (targetMonth > 12) {
    targetMonth -= 12;
    targetYear++;
  }
  while (targetMonth < 1) {
    targetMonth += 12;
    targetYear--;
  }

  // Now find a gregorian date that matches targetMonth/targetYear
  // We'll search around the approximate newDate
  // Scan forward or backward day by day (usually very close)
  
  // Safety break
  let attempts = 0;
  while (attempts < 60) {
    const p = getHijriParts(newDate);
    if (p.year === targetYear && p.month === targetMonth) return newDate;
    
    // Naive adjust
    if (p.year < targetYear || (p.year === targetYear && p.month < targetMonth)) {
        newDate.setDate(newDate.getDate() + 1);
    } else {
        newDate.setDate(newDate.getDate() - 1);
    }
    attempts++;
  }
  
  return newDate; // Fallback
}

export function getHijriMonthGrid(centerDate: Date) {
    // 1. Determine the Hijri month of the centerDate
    const { month, year } = getHijriParts(centerDate);
    
    // 2. Find start of this Hijri month
    // Go back until month changes
    const startDate = new Date(centerDate);
    // limit back search to ~30 days
    for(let i=0; i<30; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() - 1);
        const p = getHijriParts(d);
        if (p.month !== month || p.year !== year) {
            break;
        }
        startDate.setDate(startDate.getDate() - 1);
    }

    // 3. Find end of this Hijri month
    const endDate = new Date(centerDate);
    for(let i=0; i<30; i++) {
        const d = new Date(endDate);
        d.setDate(d.getDate() + 1);
        const p = getHijriParts(d);
        if (p.month !== month) { // Year might change too, so checking month diff is enough usually
             break;
        }
        endDate.setDate(endDate.getDate() + 1);
    }

    // 4. Build Days
    const days = [];
    let current = new Date(startDate);
    while (current <= endDate) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    
    return {
        monthName: formatHijriMonthYear(centerDate),
        days,
        year,
        month
    };
}
