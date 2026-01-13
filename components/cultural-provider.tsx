"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Language = "so" | "en"

interface CulturalContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  so: {
    "festival.dabshid": "Dabshid",
    "festival.istunka": "Istunka",
    "star.cirir": "Cirir",
    "star.laxaha": "Laxaha",
    "star.faraci": "Faraci",
    "star.dirir": "Dirir",
    "season.gu": "Gu'",
    "season.xagaa": "Xagaa",
    "season.dayr": "Dayr",
    "season.jiilaal": "Jiilaal",
    "holiday.independence": "Maalinta Xorriyadda",
    "holiday.republic": "Maalinta Jamhuuriyadda",
    "holiday.unity": "Maalinta Midnimada",
    "agricultural.planting": "Beerista",
    "agricultural.harvest": "Goosashada",
    today: "Maanta",
  },
  en: {
    "festival.dabshid": "Dabshid Festival",
    "festival.istunka": "Istunka Ritual",
    "star.cirir": "Cirir (Spica)",
    "star.laxaha": "Laxaha (Pleiades)",
    "star.faraci": "Faraci (Southern Cross)",
    "star.dirir": "Dirir (Arcturus)",
    "season.gu": "Gu' (Spring Rains)",
    "season.xagaa": "Xagaa (Summer)",
    "season.dayr": "Dayr (Autumn Rains)",
    "season.jiilaal": "Jiilaal (Dry Season)",
    "holiday.independence": "Independence Day",
    "holiday.republic": "Republic Day",
    "holiday.unity": "Unity Day",
    "agricultural.planting": "Planting Season",
    "agricultural.harvest": "Harvest Time",
    today: "Today",
  },
}

const CulturalContext = createContext<CulturalContextType | undefined>(undefined)

export function CulturalProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <CulturalContext.Provider value={{ language, setLanguage, t }}>{children}</CulturalContext.Provider>
}

export function useCultural() {
  const context = useContext(CulturalContext)
  if (context === undefined) {
    throw new Error("useCultural must be used within a CulturalProvider")
  }
  return context
}
