"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Star, Flag, Calendar } from "lucide-react"

export function AssetsLibrary() {
  const iconSets = [
    {
      category: "Cultural Icons",
      items: [
        { name: "Camel Silhouette", format: "SVG", size: "24x24" },
        { name: "Dabshid Fire", format: "SVG", size: "32x32" },
        { name: "Traditional Hut", format: "SVG", size: "24x24" },
        { name: "Somali Flag", format: "SVG", size: "32x24" },
      ],
    },
    {
      category: "Star Maps",
      items: [
        { name: "Cirir (Spica)", format: "SVG", size: "64x64" },
        { name: "Laxaha (Pleiades)", format: "SVG", size: "64x64" },
        { name: "Faraci (Southern Cross)", format: "SVG", size: "64x64" },
        { name: "Dirir (Arcturus)", format: "SVG", size: "64x64" },
      ],
    },
    {
      category: "Seasonal Icons",
      items: [
        { name: "Jiilaal (Dry Season)", format: "SVG", size: "32x32" },
        { name: "Gu' (Spring Rains)", format: "SVG", size: "32x32" },
        { name: "Xagaa (Summer)", format: "SVG", size: "32x32" },
        { name: "Dayr (Autumn)", format: "SVG", size: "32x32" },
      ],
    },
  ]

  const screenshots = [
    { name: "App Store Screenshot 1", size: "1242x2688", description: "Home screen with calendar" },
    { name: "App Store Screenshot 2", size: "1242x2688", description: "Month view with events" },
    { name: "App Store Screenshot 3", size: "1242x2688", description: "Cultural events detail" },
    { name: "App Store Screenshot 4", size: "1242x2688", description: "Star chart view" },
    { name: "App Store Screenshot 5", size: "1242x2688", description: "Settings and preferences" },
  ]

  return (
    <div className="space-y-8">
      {/* Icon Sets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {iconSets.map((set, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-sm">{set.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {set.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        {set.category === "Cultural Icons" && <span className="text-sm">🐪</span>}
                        {set.category === "Star Maps" && <Star className="h-4 w-4" />}
                        {set.category === "Seasonal Icons" && <span className="text-sm">🌱</span>}
                      </div>
                      <div>
                        <div className="text-xs font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.format} • {item.size}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Somali Flag Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Somali Flag Variations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-16 bg-gradient-to-b from-blue-500 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
              <div className="text-xs text-center">
                <div className="font-medium">Standard Flag</div>
                <div className="text-gray-500">SVG • 32x24</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-full h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
              <div className="text-xs text-center">
                <div className="font-medium">Gradient Version</div>
                <div className="text-gray-500">SVG • 32x24</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-full h-16 border-2 border-blue-500 rounded flex items-center justify-center bg-white">
                <span className="text-blue-500 text-xl">⭐</span>
              </div>
              <div className="text-xs text-center">
                <div className="font-medium">Outline Version</div>
                <div className="text-gray-500">SVG • 32x24</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-full h-16 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400 text-xl">⭐</span>
              </div>
              <div className="text-xs text-center">
                <div className="font-medium">Monochrome</div>
                <div className="text-gray-500">SVG • 32x24</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Fonts */}
      <Card>
        <CardHeader>
          <CardTitle>🔤 Custom Fonts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">Primary Font Family</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold mb-1">Inter Regular</div>
                    <div className="text-sm text-gray-600">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                    <div className="text-sm text-gray-600">abcdefghijklmnopqrstuvwxyz</div>
                    <div className="text-xs text-gray-500 mt-2">
                      <Badge variant="secondary">WOFF2</Badge>
                      <Badge variant="secondary" className="ml-1">
                        TTF
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Somali Script Support</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold mb-1">Noto Sans Somali</div>
                    <div className="text-sm text-gray-600">Kalandarka Soomaaliyeed</div>
                    <div className="text-sm text-gray-600">Dhaqanka iyo Xiddigiska</div>
                    <div className="text-xs text-gray-500 mt-2">
                      <Badge variant="secondary">WOFF2</Badge>
                      <Badge variant="secondary" className="ml-1">
                        TTF
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Font Usage Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Headers & Titles</h4>
                  <p className="text-gray-600">Inter Bold, 18-32px</p>
                  <p className="text-gray-600">Line height: 1.2-1.4</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Body Text</h4>
                  <p className="text-gray-600">Inter Regular, 14-16px</p>
                  <p className="text-gray-600">Line height: 1.5-1.6</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Captions</h4>
                  <p className="text-gray-600">Inter Medium, 12-14px</p>
                  <p className="text-gray-600">Line height: 1.4-1.5</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Store Screenshots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            App Store Screenshots Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-[9/19.5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-4 bg-white rounded-lg shadow-sm flex flex-col">
                    <div className="h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-t-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Dabshid Calendar</span>
                    </div>
                    <div className="flex-1 p-2">
                      {index === 0 && (
                        <div className="grid grid-cols-7 gap-1 text-xs">
                          {Array.from({ length: 35 }, (_, i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                              {i > 6 && i < 28 ? i - 6 : ""}
                            </div>
                          ))}
                        </div>
                      )}
                      {index === 1 && (
                        <div className="space-y-1">
                          <div className="h-2 bg-orange-200 rounded"></div>
                          <div className="h-2 bg-green-200 rounded"></div>
                          <div className="h-2 bg-blue-200 rounded"></div>
                          <div className="h-2 bg-purple-200 rounded"></div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="space-y-2">
                          <div className="h-3 bg-orange-500 rounded"></div>
                          <div className="h-1 bg-gray-200 rounded"></div>
                          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      )}
                      {index === 3 && (
                        <div className="bg-gradient-to-b from-indigo-900 to-black rounded h-full flex items-center justify-center">
                          <div className="text-white text-xs">⭐</div>
                        </div>
                      )}
                      {index === 4 && (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="h-1 bg-gray-300 rounded w-1/3"></div>
                            <div className="w-3 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                            <div className="w-3 h-2 bg-green-500 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium">{screenshot.name}</div>
                  <div className="text-xs text-gray-500">{screenshot.size}</div>
                  <div className="text-xs text-gray-600 mt-1">{screenshot.description}</div>
                  <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>📤 Export Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">iOS Assets</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>App Icon</span>
                  <span className="text-gray-600">1024x1024 PNG</span>
                </div>
                <div className="flex justify-between">
                  <span>Launch Screen</span>
                  <span className="text-gray-600">1125x2436 PNG</span>
                </div>
                <div className="flex justify-between">
                  <span>Screenshots</span>
                  <span className="text-gray-600">1242x2688 PNG</span>
                </div>
                <div className="flex justify-between">
                  <span>Tab Bar Icons</span>
                  <span className="text-gray-600">25x25 PDF</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Android Assets</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>App Icon</span>
                  <span className="text-gray-600">512x512 PNG</span>
                </div>
                <div className="flex justify-between">
                  <span>Feature Graphic</span>
                  <span className="text-gray-600">1024x500 PNG</span>
                </div>
                <div className="flex justify-between">
                  <span>Screenshots</span>
                  <span className="text-gray-600">1080x1920 PNG</span>
                </div>
                <div className="flex justify-between">
                  <span>Notification Icons</span>
                  <span className="text-gray-600">24x24 PNG</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
