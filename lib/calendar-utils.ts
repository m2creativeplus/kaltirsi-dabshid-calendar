// Calendar utility functions for the Somali Calendar app
import { getSomalilandHolidays } from "./holidays/somaliland-holidays"

// Types
type EventType = "cultural" | "astronomical" | "holiday"
type Season = "Jiilaal" | "Gu'" | "Xagaa" | "Dayr"

interface Event {
  nameKey: string
  date: string
  type: EventType
  description?: string
}

interface CalendarDay {
  gregorianDay: number
  gregorianMonth: string
  hijriDate: string
  somaliMonth: string
  weekday: string
  isCurrentMonth: boolean
  isToday: boolean
  isHoliday: boolean
  events: Event[]
  year: number
  season: Season
}

interface CalendarData {
  year: number
  gregorianMonth: string
  somaliMonth: string
  somaliYear: number
  season: Season
  events: Event[]
}

// Helper functions to get Somali calendar data
export function getCalendarData(date: Date): CalendarData {
  const year = date.getFullYear()
  const month = date.getMonth()

  // Get Gregorian month name
  const gregorianMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const gregorianMonth = gregorianMonths[month]

  // Get Somali month based on Gregorian date
  // This is a simplified mapping - in reality the transitions are more complex
  const somaliMonths = [
    ["Xays", "Toddob"], // Jan: 1-17 Xays, 18-31 Toddob
    ["Toddob", "Karan"], // Feb
    ["Karan", "Laba-Karan"], // Mar
    ["Laba-Karan", "Rajal"], // Apr
    ["Rajal", "Dabarasiis"], // May
    ["Dabarasiis", "Arafo"], // Jun
    ["Arafo", "Malabar"], // Jul
    ["Malabar", "Soon"], // Aug
    ["Soon", "Maqal-Soon"], // Sep
    ["Maqal-Soon", "Wabar"], // Oct
    ["Wabar", "Rajab"], // Nov
    ["Rajab", "Xays"], // Dec
  ]

  // Determine which half of the month we're in
  const dayOfMonth = date.getDate()
  const isFirstHalf = dayOfMonth <= 15
  const somaliMonth = isFirstHalf ? somaliMonths[month][0] : somaliMonths[month][1]

  // Calculate Somali year (3122-3123 in 2025)
  const somaliYear = year + 1097

  // Determine season based on month
  let season: Season
  if (month >= 11 || month <= 2) {
    season = "Jiilaal" // Dec-Mar
  } else if (month >= 3 && month <= 4) {
    season = "Gu'" // Apr-May
  } else if (month >= 5 && month <= 8) {
    season = "Xagaa" // Jun-Sep
  } else {
    season = "Dayr" // Oct-Nov
  }

  // Get upcoming events
  const events: Event[] = []

  // Cultural events
  if (month <= 6) {
    // Show Dabshid if it's before July
    events.push({
      nameKey: "event.dabshid",
      date: "July 19, 2025",
      type: "cultural",
    })
  }

  if (month <= 9) {
    // Show Dambasame if it's before October
    events.push({
      nameKey: "event.dambasame",
      date: "October 19, 2025",
      type: "astronomical",
    })
  }

  // Astronomical events
  if (month >= 2 && month <= 7) {
    // Mar-Aug
    events.push({
      nameKey: "event.dirir",
      date: "March - August 2025",
      type: "astronomical",
    })
  } else {
    events.push({
      nameKey: "event.laxaha",
      date: "September - February 2025",
      type: "astronomical",
    })
  }

  // Holidays
  if (month <= 4) {
    // Show Independence Day if it's before May
    events.push({
      nameKey: "holiday.independence",
      date: "May 18, 2025",
      type: "holiday",
    })
  }

  if (month <= 5) {
    // Show Republic Day if it's before June
    events.push({
      nameKey: "holiday.republic",
      date: "June 26, 2025",
      type: "holiday",
    })
  }

  if (month <= 6) {
    // Show Unity Day if it's before July
    events.push({
      nameKey: "holiday.unity",
      date: "July 1, 2025",
      type: "holiday",
    })
  }

  return {
    year,
    gregorianMonth,
    somaliMonth,
    somaliYear,
    season,
    events,
  }
}

export function getMonthData(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()

  // Get first day of the month
  const firstDay = new Date(year, month, 1)
  const firstDayOfWeek = firstDay.getDay()

  // Get last day of the month
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()

  // Get days from previous month to fill the first week
  const daysFromPrevMonth = firstDayOfWeek

  // Get days from next month to fill the last week
  const daysInLastWeek = 7 - ((daysFromPrevMonth + daysInMonth) % 7)
  const daysFromNextMonth = daysInLastWeek === 7 ? 0 : daysInLastWeek

  // Generate days array
  const days: CalendarDay[] = []

  // Previous month days
  const prevMonth = month === 0 ? 11 : month - 1
  const prevMonthYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate()

  for (let i = 0; i < daysFromPrevMonth; i++) {
    const day = daysInPrevMonth - daysFromPrevMonth + i + 1
    days.push(createCalendarDay(new Date(prevMonthYear, prevMonth, day), false))
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(createCalendarDay(new Date(year, month, i), true))
  }

  // Next month days
  const nextMonth = month === 11 ? 0 : month + 1
  const nextMonthYear = month === 11 ? year + 1 : year

  for (let i = 1; i <= daysFromNextMonth; i++) {
    days.push(createCalendarDay(new Date(nextMonthYear, nextMonth, i), false))
  }

  return { days }
}

export function getWeekData(date: Date) {
  const currentDay = date.getDay()
  const diff = date.getDate() - currentDay
  const firstDayOfWeek = new Date(date)
  firstDayOfWeek.setDate(diff)

  const days: CalendarDay[] = []

  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek)
    day.setDate(firstDayOfWeek.getDate() + i)
    days.push(createCalendarDay(day, true))
  }

  return { days }
}

export function getDayData(date: Date) {
  return {
    ...createCalendarDay(date, true),
    astronomicalEvents: getAstronomicalEvents(date),
  }
}

function createCalendarDay(date: Date, isCurrentMonth: boolean): CalendarDay {
  const today = new Date()
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()

  const gregorianDay = date.getDate()
  const gregorianMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const gregorianMonth = gregorianMonths[date.getMonth()]

  // Simplified Hijri date calculation (this would need a proper converter in a real app)
  const hijriYear = date.getFullYear() - 579
  const hijriMonth = ((date.getMonth() + 9) % 12) + 1
  const hijriDay = ((date.getDate() + 15) % 30) + 1
  const hijriDate = `${hijriDay}/${hijriMonth}`

  // Get Somali month
  const somaliMonths = [
    ["Xays", "Toddob"], // Jan: 1-17 Xays, 18-31 Toddob
    ["Toddob", "Karan"], // Feb
    ["Karan", "Laba-Karan"], // Mar
    ["Laba-Karan", "Rajal"], // Apr
    ["Rajal", "Dabarasiis"], // May
    ["Dabarasiis", "Arafo"], // Jun
    ["Arafo", "Malabar"], // Jul
    ["Malabar", "Soon"], // Aug
    ["Soon", "Maqal-Soon"], // Sep
    ["Maqal-Soon", "Wabar"], // Oct
    ["Wabar", "Rajab"], // Nov
    ["Rajab", "Xays"], // Dec
  ]

  const dayOfMonth = date.getDate()
  const isFirstHalf = dayOfMonth <= 15
  const somaliMonth = isFirstHalf ? somaliMonths[date.getMonth()][0] : somaliMonths[date.getMonth()][1]

  // Get weekday
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const weekday = weekdays[date.getDay()]

  // Check if it's a holiday
  const holidays = getSomalilandHolidays(year)
  const dateStr = date.toISOString().split('T')[0]
  const todaysHolidays = holidays.filter(h => h.date === dateStr)
  
  const isHoliday = todaysHolidays.some(h => h.type === "public" || h.type === "religious")

  // Get events for this day
  const events: Event[] = []

  // Add holidays to events
  todaysHolidays.forEach(h => {
    events.push({
      nameKey: h.name,
      date: date.toLocaleDateString(),
      type: h.type === "public" || h.type === "religious" ? "holiday" : "cultural", // Map types
      description: h.name
    })
  })

  if (date.getMonth() === 6 && date.getDate() === 19) {
    // July 19 - Dabshid Festival
    events.push({
      nameKey: "event.dabshid",
      date: "July 19, " + year,
      type: "cultural",
      description: "Traditional fire festival marking the beginning of the Somali New Year",
    })
  }

  if (date.getMonth() === 9 && date.getDate() === 19) {
    // October 19 - Dambasame Night
    events.push({
      nameKey: "event.dambasame",
      date: "October 19, " + year,
      type: "astronomical",
      description: "Night when the Dambasame star is at its zenith",
    })
  }

  return {
    gregorianDay,
    gregorianMonth,
    hijriDate,
    somaliMonth,
    weekday,
    isCurrentMonth,
    isToday,
    isHoliday,
    events,
    year: date.getFullYear(),
    season: getSeason(date),
  }
}

export function getSeason(date: Date): Season {
  const month = date.getMonth()

  if (month >= 11 || month <= 2) {
    return "Jiilaal" // Dec-Mar
  } else if (month >= 3 && month <= 4) {
    return "Gu'" // Apr-May
  } else if (month >= 5 && month <= 8) {
    return "Xagaa" // Jun-Sep
  } else {
    return "Dayr" // Oct-Nov
  }
}

function getAstronomicalEvents(date: Date): Event[] {
  const events: Event[] = []
  const month = date.getMonth()

  // Dirir (Spica) visibility (March-August)
  if (month >= 2 && month <= 7) {
    events.push({
      nameKey: "event.dirir",
      date: "Visible in night sky",
      type: "astronomical",
      description: "Dirir (Spica) is visible in the night sky",
    })
  }

  // Laxaha (Pleiades) dominance (September-February)
  if (month >= 8 || month <= 1) {
    events.push({
      nameKey: "event.laxaha",
      date: "Dominant in night sky",
      type: "astronomical",
      description: "Laxaha (Pleiades) is dominant in the night sky",
    })
  }

  return events
}
