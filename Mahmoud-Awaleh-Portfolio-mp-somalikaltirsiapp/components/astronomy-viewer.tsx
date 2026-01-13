"use client"

import { ArrowLeft, Star, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCultural } from "@/components/cultural-provider"

interface AstronomyViewerProps {
  onBack: () => void
}

export function AstronomyViewer({ onBack }: AstronomyViewerProps) {
  const { t } = useCultural()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Star Group Viewer</h1>
      </div>

      {/* 3D Star Constellation Viewer */}
      <Card className="overflow-hidden">
        <div className="h-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-black relative">
          <div className="absolute inset-0">
            {/* Mock star constellation */}
            {[
              { x: "20%", y: "30%", size: "w-2 h-2" },
              { x: "40%", y: "25%", size: "w-3 h-3" },
              { x: "60%", y: "35%", size: "w-2 h-2" },
              { x: "80%", y: "40%", size: "w-1 h-1" },
              { x: "30%", y: "60%", size: "w-2 h-2" },
              { x: "70%", y: "65%", size: "w-3 h-3" },
            ].map((star, i) => (
              <div
                key={i}
                className={`absolute ${star.size} bg-white rounded-full animate-pulse`}
                style={{ left: star.x, top: star.y }}
              ></div>
            ))}

            {/* Constellation lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="20%" y1="30%" x2="40%" y2="25%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="40%" y1="25%" x2="60%" y2="35%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="60%" y1="35%" x2="80%" y2="40%" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </svg>
          </div>

          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-bold">{t("star.cirir")}</h2>
            <p className="text-sm opacity-90">Currently visible in the night sky</p>
          </div>
        </div>
      </Card>

      {/* Star Group Information */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            {t("star.cirir")} - Spica
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Cirir is one of the most important stars in Somali astronomy, marking the beginning of the Gu' (spring)
            season. When Cirir rises in the eastern sky before dawn, it signals the time for planting and the arrival of
            the spring rains.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Sun className="h-6 w-6 mx-auto mb-1 text-yellow-500" />
              <div className="text-xs font-medium">Best Viewing</div>
              <div className="text-xs text-muted-foreground">Pre-dawn</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Moon className="h-6 w-6 mx-auto mb-1 text-blue-500" />
              <div className="text-xs font-medium">Season</div>
              <div className="text-xs text-muted-foreground">Gu' (Spring)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Associated Stories */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Stories & Guidance</h3>
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
              <h4 className="font-medium text-sm mb-1">Agricultural Guidance</h4>
              <p className="text-xs text-muted-foreground">
                "When Cirir appears, prepare your fields for the coming rains. The ancestors say this star brings the
                blessing of fertile soil and abundant harvests."
              </p>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="font-medium text-sm mb-1">Navigation Wisdom</h4>
              <p className="text-xs text-muted-foreground">
                "Sailors and nomads have long used Cirir to find their way. Its steady light guides travelers across the
                vast landscapes of the Horn of Africa."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Control */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Seasonal Influence</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 rounded bg-green-100 dark:bg-green-900">
              <span className="text-sm font-medium">Gu' Season Control</span>
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Active</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Cirir governs the spring rains and planting season from March to June, bringing life-giving moisture to
              the land and signaling the time for agricultural activities.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
