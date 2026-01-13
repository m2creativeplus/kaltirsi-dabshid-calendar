"use client"

import { ArrowLeft, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCultural } from "@/components/cultural-provider"

interface CropPlannerProps {
  onBack: () => void
}

export function CropPlanner({ onBack }: CropPlannerProps) {
  const { t } = useCultural()

  const crops = [
    { name: "Maize", season: "Gu'", planting: "Apr-May", harvest: "Aug-Sep", color: "bg-yellow-500" },
    { name: "Sorghum", season: "Gu'", planting: "Apr-Jun", harvest: "Sep-Oct", color: "bg-orange-500" },
    { name: "Sesame", season: "Dayr", planting: "Oct-Nov", harvest: "Jan-Feb", color: "bg-green-500" },
    { name: "Cowpeas", season: "Gu'", planting: "May-Jun", harvest: "Aug-Sep", color: "bg-purple-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">{t("season.gu")} Crop Calendar</h1>
          <p className="text-sm text-muted-foreground">Spring planting season</p>
        </div>
      </div>

      {/* Region & Crop Selectors */}
      <div className="grid grid-cols-2 gap-4">
        <Select defaultValue="awdal">
          <SelectTrigger>
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="awdal">Awdal</SelectItem>
            <SelectItem value="bay">Bay</SelectItem>
            <SelectItem value="gedo">Gedo</SelectItem>
            <SelectItem value="bakool">Bakool</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Select Crop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crops</SelectItem>
            <SelectItem value="maize">Maize</SelectItem>
            <SelectItem value="sorghum">Sorghum</SelectItem>
            <SelectItem value="sesame">Sesame</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rainfall Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            Rainfall Forecast
          </h3>
          <div className="space-y-2">
            {["Apr", "May", "Jun", "Jul", "Aug"].map((month, i) => (
              <div key={month} className="flex items-center gap-3">
                <span className="text-xs w-8">{month}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${[80, 90, 70, 40, 20][i]}%` }}></div>
                </div>
                <span className="text-xs text-muted-foreground">{[80, 90, 70, 40, 20][i]}mm</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crop Timeline */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Planting → Harvest Timeline</h3>
          <div className="space-y-4">
            {crops.map((crop, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{crop.name}</span>
                  <span className="text-xs text-muted-foreground">{crop.season}</span>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full">
                  <div
                    className={`absolute h-3 rounded-full ${crop.color} opacity-80`}
                    style={{ left: "20%", width: "60%" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <span className="text-xs text-white font-medium">{crop.planting}</span>
                    <span className="text-xs text-white font-medium">{crop.harvest}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Livestock Migration Checklist */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Livestock Migration Checklist</h3>
          <div className="space-y-2">
            {[
              "Check water sources along migration routes",
              "Prepare veterinary supplies",
              "Coordinate with other herders",
              "Monitor weather conditions",
              "Plan grazing rotations",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
