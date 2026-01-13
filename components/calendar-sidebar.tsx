"use client"

import { useState } from "react"
import { Plus, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCultural } from "@/components/cultural-provider"
import { MiniCalendar } from "@/components/mini-calendar"

interface CalendarSidebarProps {
  isOpen: boolean
  onToggle: () => void
  onDateSelect: (date: Date) => void
}

export function CalendarSidebar({ isOpen, onToggle, onDateSelect }: CalendarSidebarProps) {
  const { t, language, setLanguage } = useCultural()
  const [expandedSections, setExpandedSections] = useState({
    cultural: true,
    agricultural: true,
    astronomical: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  if (!isOpen) return null

  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
      {/* Create Button */}
      <div className="p-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Language Toggle */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 text-sm">
          <span>Language:</span>
          <Button variant="outline" size="sm" onClick={() => setLanguage(language === "so" ? "en" : "so")}>
            {language === "so" ? "Somali" : "English"}
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
              className="w-full justify-start p-0 h-auto font-medium text-gray-700"
              onClick={() => toggleSection("cultural")}
            >
              {expandedSections.cultural ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              Cultural Events
            </Button>

            {expandedSections.cultural && (
              <div className="ml-5 mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="dabshid" defaultChecked />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <label htmlFor="dabshid" className="text-sm">
                      {t("festival.dabshid")}
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="istunka" defaultChecked />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <label htmlFor="istunka" className="text-sm">
                      {t("festival.istunka")}
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Agricultural Events */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto font-medium text-gray-700"
              onClick={() => toggleSection("agricultural")}
            >
              {expandedSections.agricultural ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              Agricultural Calendar
            </Button>

            {expandedSections.agricultural && (
              <div className="ml-5 mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="planting" defaultChecked />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <label htmlFor="planting" className="text-sm">
                      Planting Season
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="harvest" defaultChecked />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <label htmlFor="harvest" className="text-sm">
                      Harvest Time
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="livestock" defaultChecked />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <label htmlFor="livestock" className="text-sm">
                      Livestock Migration
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Astronomical Events */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-start p-0 h-auto font-medium text-gray-700"
              onClick={() => toggleSection("astronomical")}
            >
              {expandedSections.astronomical ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              Star Calendar
            </Button>

            {expandedSections.astronomical && (
              <div className="ml-5 mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cirir" defaultChecked />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <label htmlFor="cirir" className="text-sm">
                      {t("star.cirir")}
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="laxaha" defaultChecked />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                    <label htmlFor="laxaha" className="text-sm">
                      {t("star.laxaha")}
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Season Indicator */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">{t("season.gu")}</span>
          </div>
          <p className="text-xs text-green-600">Spring rains season - ideal for planting</p>
        </div>
      </div>
    </div>
  )
}
