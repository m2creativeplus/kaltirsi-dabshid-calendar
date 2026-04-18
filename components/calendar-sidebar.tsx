"use client"

import { useState } from "react"
import { Plus, ChevronDown, ChevronRight, PawPrint, Flame, Star, Leaf, Droplets, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCultural } from "@/components/cultural-provider"
import { MiniCalendar } from "@/components/mini-calendar"
import { ProverbCard } from "@/components/proverb-card"
import { KaltirsiEngine, getSeason } from "@/lib/kaltirsi-engine"
import { cn } from "@/lib/utils"

interface CalendarSidebarProps {
  isOpen: boolean
  onToggle: () => void
  onDateSelect: (date: Date) => void
}

const SEASON_SIDEBAR: Record<string, { bg: string; dot: string; text: string; border: string }> = {
  "Xagaa": { bg: "bg-amber-500/10", dot: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/20" },
  "Dayr":  { bg: "bg-stone-500/10", dot: "bg-amber-700", text: "text-amber-600", border: "border-amber-700/20" },
  "Jiilaal": { bg: "bg-slate-500/10", dot: "bg-blue-400", text: "text-blue-400", border: "border-blue-400/20" },
  "Gu'":   { bg: "bg-emerald-500/10", dot: "bg-emerald-400", text: "text-emerald-400", border: "border-emerald-400/20" },
}

export function CalendarSidebar({ isOpen, onToggle, onDateSelect }: CalendarSidebarProps) {
  const { t, language, setLanguage } = useCultural()
  const [expandedSections, setExpandedSections] = useState({
    cultural: true,
    agricultural: true,
    astronomical: false,
  })

  const now = new Date()
  const kDate = KaltirsiEngine.gregorianToKaltirsi(now)
  const season = getSeason(kDate.month - 1)
  const sTheme = SEASON_SIDEBAR[season.name] || SEASON_SIDEBAR["Xagaa"]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  if (!isOpen) return null

  return (
    <div className="w-80 border-r border-border/40 bg-card/50 backdrop-blur-xl flex flex-col">
      {/* Top: Brand + Actions */}
      <div className="p-4 space-y-3">
        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/20 border-0 font-medium">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
        <Button
          variant="outline"
          className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 bg-transparent"
          onClick={() => window.location.href = '/livestock'}
        >
          <PawPrint className="h-4 w-4 mr-2" />
          Livestock Manager
        </Button>
      </div>

      {/* Language Toggle */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="uppercase tracking-wider">Language</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "so" ? "en" : "so")}
            className="text-xs glass-subtle hover:bg-white/10 text-foreground h-7 px-3"
          >
            {language === "so" ? "🇸🇴 Somali" : "🇬🇧 English"}
          </Button>
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="px-4 pb-4">
        <MiniCalendar onDateSelect={onDateSelect} />
      </div>

      {/* Calendar Categories */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 space-y-4">
          {/* Cultural Events */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto font-medium text-foreground/80 hover:text-foreground text-sm"
              onClick={() => toggleSection("cultural")}
            >
              {expandedSections.cultural ? <ChevronDown className="h-3.5 w-3.5 mr-1.5" /> : <ChevronRight className="h-3.5 w-3.5 mr-1.5" />}
              Cultural Events
            </Button>

            {expandedSections.cultural && (
              <div className="ml-5 mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="dabshid" defaultChecked className="border-amber-500/50 data-[state=checked]:bg-amber-500" />
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-sm" />
                    <label htmlFor="dabshid" className="text-sm text-foreground/70">{t("festival.dabshid")}</label>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="istunka" defaultChecked className="border-red-500/50 data-[state=checked]:bg-red-500" />
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-red-400 to-rose-600 rounded-sm" />
                    <label htmlFor="istunka" className="text-sm text-foreground/70">{t("festival.istunka")}</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Agricultural Events */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto font-medium text-foreground/80 hover:text-foreground text-sm"
              onClick={() => toggleSection("agricultural")}
            >
              {expandedSections.agricultural ? <ChevronDown className="h-3.5 w-3.5 mr-1.5" /> : <ChevronRight className="h-3.5 w-3.5 mr-1.5" />}
              Agricultural Calendar
            </Button>

            {expandedSections.agricultural && (
              <div className="ml-5 mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="planting" defaultChecked className="border-emerald-500/50 data-[state=checked]:bg-emerald-500" />
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-emerald-400 to-green-600 rounded-sm" />
                    <label htmlFor="planting" className="text-sm text-foreground/70">Planting Season</label>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="harvest" defaultChecked className="border-yellow-500/50 data-[state=checked]:bg-yellow-500" />
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-sm" />
                    <label htmlFor="harvest" className="text-sm text-foreground/70">Harvest Time</label>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="livestock" defaultChecked className="border-sky-500/50 data-[state=checked]:bg-sky-500" />
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-sky-400 to-blue-500 rounded-sm" />
                    <label htmlFor="livestock" className="text-sm text-foreground/70">Livestock Migration</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Astronomical Events */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto font-medium text-foreground/80 hover:text-foreground text-sm"
              onClick={() => toggleSection("astronomical")}
            >
              {expandedSections.astronomical ? <ChevronDown className="h-3.5 w-3.5 mr-1.5" /> : <ChevronRight className="h-3.5 w-3.5 mr-1.5" />}
              Star Calendar
            </Button>

            {expandedSections.astronomical && (
              <div className="ml-5 mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cirir" defaultChecked className="border-violet-500/50 data-[state=checked]:bg-violet-500" />
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-violet-400 to-purple-600 rounded-sm" />
                    <label htmlFor="cirir" className="text-sm text-foreground/70">{t("star.cirir")}</label>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="laxaha" defaultChecked className="border-indigo-500/50 data-[state=checked]:bg-indigo-500" />
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-sm" />
                    <label htmlFor="laxaha" className="text-sm text-foreground/70">{t("star.laxaha")}</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Season Indicator — Bottom */}
      <div className="p-4 border-t border-border/30 space-y-3">
        <div className={cn("rounded-xl p-3", sTheme.bg, sTheme.border, "border")}>
          <div className="flex items-center gap-2 mb-1">
            <div className={cn("w-2.5 h-2.5 rounded-full animate-kaltirsi-pulse", sTheme.dot)} />
            <span className={cn("text-sm font-semibold", sTheme.text)}>{season.name}</span>
            <span className="text-[10px] text-muted-foreground ml-auto">{season.nameEnglish}</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {season.name === "Gu'" && "Spring rains — optimal planting window"}
            {season.name === "Xagaa" && "Dry heat — post-harvest storage period"}
            {season.name === "Dayr" && "Short rains — secondary growing season"}
            {season.name === "Jiilaal" && "Cold dry — livestock care & water conservation"}
          </p>
        </div>

        <ProverbCard />
      </div>
    </div>
  )
}
