"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "so" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  so: {
    "calendar.title": "Kalandarka Soomaaliyeed",
    "calendar.month": "Bisha",
    "calendar.week": "Toddobaadka",
    "calendar.day": "Maalinta",
    "weekday.monday": "Isniin",
    "weekday.tuesday": "Talaado",
    "weekday.wednesday": "Arbaco",
    "weekday.thursday": "Khamiis",
    "weekday.friday": "Jimce",
    "weekday.saturday": "Sabti",
    "weekday.sunday": "Axad",
    "traditional.monday": "Laamin",
    "traditional.tuesday": "Labtako",
    "traditional.wednesday": "Arbaco",
    "traditional.thursday": "Khamiis",
    "traditional.friday": "Jimce",
    "traditional.saturday": "Sabti",
    "traditional.sunday": "Axad",
    "season.jiilaal": "Jiilaal",
    "season.gu": "Gu'",
    "season.xagaa": "Xagaa",
    "season.dayr": "Dayr",
    "month.january": "Jannaayo",
    "month.february": "Febraayo",
    "month.march": "Maarso",
    "month.april": "Abriil",
    "month.may": "Maajo",
    "month.june": "Juun",
    "month.july": "Luuliyo",
    "month.august": "Agoosto",
    "month.september": "Sebteembar",
    "month.october": "Oktoobar",
    "month.november": "Nofeembar",
    "month.december": "Diseembar",
    "somali.month.xays": "Xays",
    "somali.month.toddob": "Toddob",
    "somali.month.karan": "Karan",
    "somali.month.laba-karan": "Laba-Karan",
    "somali.month.rajal": "Rajal",
    "somali.month.dabarasiis": "Dabarasiis",
    "somali.month.arafo": "Arafo",
    "somali.month.malabar": "Malabar",
    "somali.month.soon": "Soon",
    "somali.month.maqal-soon": "Maqal-Soon",
    "somali.month.wabar": "Wabar",
    "somali.month.rajab": "Rajab",
    "event.dabshid": "Dabshid",
    "event.dambasame": "Dambasame",
    "event.dirir": "Dirir (Spica)",
    "event.laxaha": "Laxaha (Pleiades)",
    "holiday.independence": "Maalinta Xorriyadda",
    "holiday.republic": "Maalinta Jamhuuriyadda",
    "holiday.unity": "Maalinta Midnimada",
    "nav.calendar": "Kalandar",
    "nav.events": "Dhacdooyinka",
    "nav.settings": "Dejinta",
  },
  en: {
    "calendar.title": "Somali Calendar",
    "calendar.month": "Month",
    "calendar.week": "Week",
    "calendar.day": "Day",
    "weekday.monday": "Monday",
    "weekday.tuesday": "Tuesday",
    "weekday.wednesday": "Wednesday",
    "weekday.thursday": "Thursday",
    "weekday.friday": "Friday",
    "weekday.saturday": "Saturday",
    "weekday.sunday": "Sunday",
    "traditional.monday": "Laamin",
    "traditional.tuesday": "Labtako",
    "traditional.wednesday": "Arbaco",
    "traditional.thursday": "Khamiis",
    "traditional.friday": "Jimce",
    "traditional.saturday": "Sabti",
    "traditional.sunday": "Axad",
    "season.jiilaal": "Jiilaal (Dry)",
    "season.gu": "Gu' (Spring)",
    "season.xagaa": "Xagaa (Summer)",
    "season.dayr": "Dayr (Fall)",
    "month.january": "January",
    "month.february": "February",
    "month.march": "March",
    "month.april": "April",
    "month.may": "May",
    "month.june": "June",
    "month.july": "July",
    "month.august": "August",
    "month.september": "September",
    "month.october": "October",
    "month.november": "November",
    "month.december": "December",
    "somali.month.xays": "Xays",
    "somali.month.toddob": "Toddob",
    "somali.month.karan": "Karan",
    "somali.month.laba-karan": "Laba-Karan",
    "somali.month.rajal": "Rajal",
    "somali.month.dabarasiis": "Dabarasiis",
    "somali.month.arafo": "Arafo",
    "somali.month.malabar": "Malabar",
    "somali.month.soon": "Soon",
    "somali.month.maqal-soon": "Maqal-Soon",
    "somali.month.wabar": "Wabar",
    "somali.month.rajab": "Rajab",
    "event.dabshid": "Dabshid Festival",
    "event.dambasame": "Dambasame Night",
    "event.dirir": "Dirir (Spica) Visibility",
    "event.laxaha": "Laxaha (Pleiades) Dominance",
    "holiday.independence": "Independence Day",
    "holiday.republic": "Republic Day",
    "holiday.unity": "Unity Day",
    "nav.calendar": "Calendar",
    "nav.events": "Events",
    "nav.settings": "Settings",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("so")

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
