"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Cloud, Sun, Moon, Droplets } from "lucide-react"

export function UIComponentsLibrary() {
  return (
    <div className="space-y-8">
      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>🔘 Button Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Primary Buttons</h3>
              <div className="space-y-3">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Dabshid Primary</Button>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Jiilaal Primary</Button>
                <Button className="w-full bg-green-500 hover:bg-green-600">Gu' Primary</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Secondary Buttons</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full border-orange-500 text-orange-500 bg-transparent">
                  Secondary
                </Button>
                <Button variant="ghost" className="w-full">
                  Ghost Button
                </Button>
                <Button variant="link" className="w-full">
                  Link Button
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Icon Buttons</h3>
              <div className="flex gap-3">
                <Button size="icon" className="bg-orange-500 hover:bg-orange-600">
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Star className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Sun className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Tiles */}
      <Card>
        <CardHeader>
          <CardTitle>📅 Date Tiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Default State</h3>
              <div className="w-16 h-16 border border-gray-200 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer">
                <span className="text-sm font-medium">15</span>
                <span className="text-xs text-gray-500">Xays</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Selected State</h3>
              <div className="w-16 h-16 bg-orange-500 text-white rounded-lg flex flex-col items-center justify-center cursor-pointer">
                <span className="text-sm font-medium">19</span>
                <span className="text-xs">Dabshid</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Range State</h3>
              <div className="w-16 h-16 bg-orange-100 border border-orange-300 rounded-lg flex flex-col items-center justify-center cursor-pointer">
                <span className="text-sm font-medium text-orange-700">20</span>
                <span className="text-xs text-orange-600">Range</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Disabled State</h3>
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-lg flex flex-col items-center justify-center cursor-not-allowed">
                <span className="text-sm font-medium">25</span>
                <span className="text-xs">Past</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Calendar Header</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">Xays 3122</h2>
                  <p className="text-orange-100 text-sm">January 2025 • Jiilaal Season</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    Today
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Week 3
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Hijri: 1446
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>📑 Calendar Tabs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className="flex-1 py-2 px-4 bg-white rounded-md shadow-sm text-sm font-medium">Gregorian</button>
              <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-600 hover:text-gray-900">Somali</button>
              <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-600 hover:text-gray-900">Hijri</button>
            </div>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-600 hover:text-gray-900">Month</button>
              <button className="flex-1 py-2 px-4 bg-white rounded-md shadow-sm text-sm font-medium">Week</button>
              <button className="flex-1 py-2 px-4 text-sm font-medium text-gray-600 hover:text-gray-900">Day</button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather & Star Icons */}
      <Card>
        <CardHeader>
          <CardTitle>🌟 Weather & Star Icons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Weather Icons</h3>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-blue-600" />
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Sun className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Cloud className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Star Icons</h3>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Moon className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600">✨</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Season Icons</h3>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">🌱</span>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600">☀️</span>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600">🍂</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Cultural Icons</h3>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600">🔥</span>
                </div>
                <div className="w-10 h-10 bg-brown-100 rounded-lg flex items-center justify-center">
                  <span className="text-brown-600">🐪</span>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600">🎉</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holiday Tags & Tooltips */}
      <Card>
        <CardHeader>
          <CardTitle>🏷️ Holiday Tags & Tooltips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Holiday Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-orange-500 hover:bg-orange-600">Dabshid Festival</Badge>
                <Badge className="bg-red-500 hover:bg-red-600">Independence Day</Badge>
                <Badge className="bg-green-500 hover:bg-green-600">Eid al-Fitr</Badge>
                <Badge className="bg-purple-500 hover:bg-purple-600">Istunka Ritual</Badge>
                <Badge className="bg-blue-500 hover:bg-blue-600">Republic Day</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Tooltip Example</h3>
              <div className="relative inline-block">
                <Badge className="bg-orange-500 cursor-help">Dabshid Festival</Badge>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  Traditional fire festival marking the Somali New Year
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
