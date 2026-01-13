"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CoverBrandGuidelines() {
  const colorPalette = [
    { name: "Jiilaal Blue", hex: "#0EA5E9", rgb: "14, 165, 233", description: "Dry season - cool, serene" },
    { name: "Gu' Green", hex: "#22C55E", rgb: "34, 197, 94", description: "Spring rains - growth, fertility" },
    { name: "Xagaa Yellow", hex: "#EAB308", rgb: "234, 179, 8", description: "Summer - warmth, abundance" },
    { name: "Dayr Brown", hex: "#A16207", rgb: "161, 98, 7", description: "Autumn - harvest, earth" },
    { name: "Flame Orange", hex: "#F97316", rgb: "249, 115, 22", description: "Dabshid fire - celebration" },
    { name: "Deep Indigo", hex: "#4338CA", rgb: "67, 56, 202", description: "Night sky - astronomy" },
    { name: "Sand Beige", hex: "#F5F5DC", rgb: "245, 245, 220", description: "Desert - foundation" },
    { name: "Monsoon Gray", hex: "#6B7280", rgb: "107, 114, 128", description: "Clouds - balance" },
  ]

  return (
    <div className="space-y-8">
      {/* App Icon Design */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📱 App Icon Design
            <Badge variant="secondary">1024x1024</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main App Icon */}
            <div className="space-y-4">
              <h3 className="font-semibold">Primary Icon</h3>
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-3xl shadow-lg flex items-center justify-center">
                  <div className="text-white">
                    {/* Camel silhouette */}
                    <svg width="64" height="48" viewBox="0 0 64 48" fill="currentColor">
                      <path d="M8 32c0-4 2-6 4-6s4 2 4 6v8h-8v-8zM20 28c0-2 1-4 3-4s3 2 3 4v12h-6v-12zM32 24c0-8 4-12 8-12s8 4 8 12v16h-16v-16zM48 28c0-2 1-4 3-4s3 2 3 4v12h-6v-12z" />
                      {/* Stars */}
                      <circle cx="16" cy="8" r="2" />
                      <circle cx="32" cy="4" r="1.5" />
                      <circle cx="48" cy="6" r="1" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs">⭐</span>
                </div>
              </div>
            </div>

            {/* Alternative Versions */}
            <div className="space-y-4">
              <h3 className="font-semibold">Alternative Versions</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white">
                  🐪
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white">
                  🌟
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white">
                  📅
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white">
                  🌙
                </div>
              </div>
            </div>

            {/* Usage Guidelines */}
            <div className="space-y-4">
              <h3 className="font-semibold">Usage Guidelines</h3>
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Minimum size: 16x16px</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Clear space: 8px minimum</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Don't stretch or distort</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Don't change colors</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Launch Splash Screen */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Launch Splash Screen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-lg p-8 text-white text-center">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-white/20 rounded-full mx-auto flex items-center justify-center backdrop-blur-sm">
                <span className="text-4xl">🐪</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Dabshid Calendar</h1>
                <p className="text-orange-100">Traditional Somali Calendar 2025</p>
              </div>
              <div className="text-sm opacity-80">
                <p>Xarunta Dhitaynta Dhaqanka & Xiddigiska</p>
                <p>ODAY-KA-SHEEKEE</p>
              </div>
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>🎨 Seasonal Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {colorPalette.map((color, index) => (
              <div key={index} className="space-y-3">
                <div className="w-full h-24 rounded-lg shadow-sm" style={{ backgroundColor: color.hex }}></div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm">{color.name}</h3>
                  <p className="text-xs text-gray-600">{color.description}</p>
                  <div className="space-y-1 text-xs">
                    <div className="font-mono">{color.hex}</div>
                    <div className="font-mono text-gray-500">rgb({color.rgb})</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Typography System */}
      <Card>
        <CardHeader>
          <CardTitle>📝 Typography System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Bilingual Font Pairing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-600">English Typography</h4>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">Dabshid Calendar</div>
                    <div className="text-xl font-semibold">Traditional Somali Calendar</div>
                    <div className="text-base">Body text for descriptions and content</div>
                    <div className="text-sm text-gray-600">Caption and helper text</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-600">Somali Typography</h4>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">Kalandarka Dabshid</div>
                    <div className="text-xl font-semibold">Kalandarka Dhaqameedka Soomaaliyeed</div>
                    <div className="text-base">Qoraalka guud ee sharaxaadda iyo waxyaabaha</div>
                    <div className="text-sm text-gray-600">Qoraalka yar ee caawinta</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Font Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Primary Font</h4>
                  <p>Inter (Latin script)</p>
                  <p className="text-gray-600">Modern, clean, highly legible</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Secondary Font</h4>
                  <p>Noto Sans (Somali support)</p>
                  <p className="text-gray-600">Comprehensive language support</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Display Font</h4>
                  <p>Custom Serif (Headers)</p>
                  <p className="text-gray-600">Cultural, warm, traditional</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
