"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CloudRain, Sun, Wind } from "lucide-react"

export function WeatherIndicator() {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 text-sm">Weather & Climate</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CloudRain className="h-4 w-4 text-blue-500" />
            <span className="text-xs">Gu' Rains Expected</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <span className="text-xs">28°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <span className="text-xs">NE Winds</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
