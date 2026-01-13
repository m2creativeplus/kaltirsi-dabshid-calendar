export interface CalendarEvent {
  id: string
  titleKey: string
  type: "cultural" | "agricultural" | "astronomical" | "holiday"
  time?: string
  description?: string
}

export function getCalendarEvents(date: Date): CalendarEvent[] {
  const events: CalendarEvent[] = []
  const month = date.getMonth()
  const day = date.getDate()

  // Cultural Events
  if (month === 6 && day === 19) {
    // July 19
    events.push({
      id: "dabshid-2025",
      titleKey: "festival.dabshid",
      type: "cultural",
      time: "18:00",
      description: "Traditional fire festival marking the Somali New Year",
    })
  }

  if (month === 0 && day === 15) {
    // January 15
    events.push({
      id: "istunka-2025",
      titleKey: "festival.istunka",
      type: "cultural",
      time: "14:00",
      description: "Traditional stick fighting ceremony",
    })
  }

  // Agricultural Events
  if (month >= 3 && month <= 4) {
    // April-May (Gu' season)
    if (day === 1 || day === 15) {
      events.push({
        id: `planting-${month}-${day}`,
        titleKey: "agricultural.planting",
        type: "agricultural",
        time: "06:00",
        description: "Optimal planting time during Gu' rains",
      })
    }
  }

  if (month >= 7 && month <= 8) {
    // August-September (Harvest)
    if (day === 1 || day === 15) {
      events.push({
        id: `harvest-${month}-${day}`,
        titleKey: "agricultural.harvest",
        type: "agricultural",
        time: "05:00",
        description: "Harvest season activities",
      })
    }
  }

  // Astronomical Events
  if (month >= 2 && month <= 7) {
    // March-August (Cirir visibility)
    if (day === 1) {
      events.push({
        id: `cirir-${month}`,
        titleKey: "star.cirir",
        type: "astronomical",
        time: "04:00",
        description: "Cirir (Spica) visible before dawn",
      })
    }
  }

  if (month >= 8 || month <= 1) {
    // September-February (Laxaha dominance)
    if (day === 1) {
      events.push({
        id: `laxaha-${month}`,
        titleKey: "star.laxaha",
        type: "astronomical",
        time: "20:00",
        description: "Laxaha (Pleiades) dominant in night sky",
      })
    }
  }

  // Holidays
  if (month === 4 && day === 18) {
    // May 18
    events.push({
      id: "independence-day",
      titleKey: "holiday.independence",
      type: "holiday",
      description: "Somaliland Independence Day",
    })
  }

  if (month === 5 && day === 26) {
    // June 26
    events.push({
      id: "republic-day",
      titleKey: "holiday.republic",
      type: "holiday",
      description: "Somaliland Republic Day",
    })
  }

  if (month === 6 && day === 1) {
    // July 1
    events.push({
      id: "unity-day",
      titleKey: "holiday.unity",
      type: "holiday",
      description: "Somaliland Unity Day",
    })
  }

  return events
}
