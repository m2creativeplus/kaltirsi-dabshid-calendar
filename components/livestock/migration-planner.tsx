"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, Droplets, CloudRain } from "lucide-react"

export function MigrationPlanner() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
               {/* Placeholder Map - In production use Mapbox/Leaflet */}
               <div className="absolute inset-0 bg-[url('/map-placeholder.png')] bg-cover opacity-50"></div>
               <div className="z-10 bg-white/90 p-3 rounded-lg shadow text-center">
                 <p className="font-bold text-lg">Haud Region</p>
                 <p className="text-sm text-gray-500">Coordinates: 8.5, 45.2</p>
               </div>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Droplets className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Water Sources</p>
                  <p className="text-xs text-gray-500">Nearest borehol: 12km SE</p>
                </div>
              </div>
              <Badge>Adequate</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CloudRain className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Pasture Quality</p>
                  <p className="text-xs text-gray-500">Recent rains in Galbeed</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Excellent</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
