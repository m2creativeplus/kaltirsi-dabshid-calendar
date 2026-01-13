"use client"

import { useState } from "react"
import { BookOpen, Wheat, MilkIcon as Cow, Sparkles, Sun, Moon, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useCultural } from "@/components/cultural-provider"
import { CalendarWheel } from "@/components/calendar-wheel"
import { WeatherIndicator } from "@/components/weather-indicator"
import { StarMap } from "@/components/star-map"
import { MonthlyDetail } from "@/components/monthly-detail"
import { CulturalStories } from "@/components/cultural-stories"
import { CropPlanner } from "@/components/crop-planner"
import { AstronomyViewer } from "@/components/astronomy-viewer"

type ViewType = "dashboard" | "monthly" | "stories" | "crops" | "astronomy"

export default function DashboardView() {
  const { language, setLanguage, viewMode, setViewMode, t } = useCultural()
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const [selectedMonth, setSelectedMonth] = useState("xays")

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "monthly":
        return <MonthlyDetail month={selectedMonth} onBack={() => setCurrentView("dashboard")} />
      case "stories":
        return <CulturalStories onBack={() => setCurrentView("dashboard")} />
      case "crops":
        return <CropPlanner onBack={() => setCurrentView("dashboard")} />
      case "astronomy":
        return <AstronomyViewer onBack={() => setCurrentView("dashboard")} />
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 p-6 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{t("app.title")}</h1>
                    <p className="text-orange-100 text-sm">{t("app.subtitle")}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => setLanguage(language === "so" ? "en" : "so")}
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span className="text-sm">{t("view.solar")}</span>
                  </div>
                  <Switch
                    checked={viewMode === "lunar"}
                    onCheckedChange={(checked) => setViewMode(checked ? "lunar" : "solar")}
                  />
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    <span className="text-sm">{t("view.lunar")}</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -top-8 opacity-20">
                <div className="w-32 h-32 rounded-full border-4 border-white/30"></div>
              </div>
            </div>

            {/* Calendar Wheel */}
            <CalendarWheel
              onMonthSelect={(month) => {
                setSelectedMonth(month)
                setCurrentView("monthly")
              }}
            />

            {/* Weather & Star Map */}
            <div className="grid grid-cols-2 gap-4">
              <WeatherIndicator />
              <StarMap />
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setCurrentView("stories")}
              >
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h3 className="font-semibold text-sm">{t("nav.stories")}</h3>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setCurrentView("crops")}
              >
                <CardContent className="p-4 text-center">
                  <Wheat className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold text-sm">{t("nav.crops")}</h3>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <Cow className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold text-sm">{t("nav.livestock")}</h3>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setCurrentView("astronomy")}
              >
                <CardContent className="p-4 text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold text-sm">{t("nav.festivals")}</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return <div className="p-4 min-h-screen">{renderCurrentView()}</div>
}
