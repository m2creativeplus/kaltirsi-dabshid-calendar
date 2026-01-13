"use client"

import { ArrowLeft, Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useCultural } from "@/components/cultural-provider"
import { useState } from "react"

interface CulturalStoriesProps {
  onBack: () => void
}

export function CulturalStories({ onBack }: CulturalStoriesProps) {
  const { t } = useCultural()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState([25])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{t("festival.dabshid")}</h1>
      </div>

      {/* Cover Image */}
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-orange-400 to-red-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-lg font-bold">{t("festival.istunka")}</h2>
            <p className="text-sm opacity-90">Traditional Ritual Celebration</p>
          </div>
        </div>
      </Card>

      {/* Audio Player */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <Button size="icon" variant={isPlaying ? "default" : "outline"} onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <div className="flex-1">
              <Slider value={progress} onValueChange={setProgress} max={100} step={1} className="w-full" />
            </div>
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>2:30</span>
            <span>10:45</span>
          </div>
        </CardContent>
      </Card>

      {/* Story Sections */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Origin of Dabshid</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Dabshid festival marks the beginning of the Somali New Year, celebrated with the lighting of fires
              that symbolize the renewal of life and the guidance of ancestors. This ancient tradition connects our
              people to the rhythms of nature and the wisdom of our forefathers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Celebration in Afgooye</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In the historic town of Afgooye, families gather at sunset to light the sacred fires. Children dance
              around the flames while elders recite ancient poems that have been passed down through generations. The
              celebration continues through the night with traditional songs and storytelling.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Traditional Proverbs</h3>
            <div className="space-y-2">
              <p className="text-sm italic">"Dabshidku waa iftiinka mustaqbalka"</p>
              <p className="text-xs text-muted-foreground">The Dabshid fire is the light of the future</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Photo Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-orange-200 to-red-300 rounded-lg"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
