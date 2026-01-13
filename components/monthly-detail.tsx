"use client"

import { ArrowLeft, Play, Camera, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCultural } from "@/components/cultural-provider"

interface MonthlyDetailProps {
  month: string
  onBack: () => void
}

export function MonthlyDetail({ month, onBack }: MonthlyDetailProps) {
  const { t } = useCultural()

  const monthData = {
    xays: {
      starGroup: "star.faraci",
      climate: "Dry season begins, cool mornings",
      proverb: "Xayska waa bilowga sanadka cusub",
      events: ["New Year Preparations", "Livestock Migration South"],
      gregorianStart: "Jul 20",
    },
    toddob: {
      starGroup: "star.cirir",
      climate: "Hot and dry, water sources scarce",
      proverb: "Toddobka biyaha way yaraadaan",
      events: ["Well Digging Season", "Camel Trading"],
      gregorianStart: "Aug 18",
    },
  }

  const data = monthData[month as keyof typeof monthData] || monthData.xays

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">{t(`month.${month}`)}</h1>
          <p className="text-sm text-muted-foreground">Month 1 | Dabshid Start ({data.gregorianStart})</p>
        </div>
      </div>

      {/* Star Group Banner */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-2">{t(data.starGroup)}</h2>
          <p className="text-indigo-100 text-sm">Guiding constellation for this month</p>
        </CardContent>
      </Card>

      {/* Climate & Rainfall */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Climate & Rainfall</h3>
          <p className="text-sm text-muted-foreground">{data.climate}</p>
          <div className="mt-3 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-500 rounded-full w-1/4"></div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">25% chance of rain</p>
        </CardContent>
      </Card>

      {/* Traditional Proverb */}
      <Card className="bg-amber-50 dark:bg-amber-950">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Traditional Wisdom</h3>
          <p className="text-sm italic">"{data.proverb}"</p>
        </CardContent>
      </Card>

      {/* Calendar Events */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">This Month's Events</h3>
          <div className="space-y-2">
            {data.events.map((event, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">{event}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="flex flex-col gap-1 h-auto py-3 bg-transparent">
          <Play className="h-4 w-4" />
          <span className="text-xs">{t("listen")}</span>
        </Button>
        <Button variant="outline" className="flex flex-col gap-1 h-auto py-3 bg-transparent">
          <Camera className="h-4 w-4" />
          <span className="text-xs">{t("gallery")}</span>
        </Button>
        <Button variant="outline" className="flex flex-col gap-1 h-auto py-3 bg-transparent">
          <Calendar className="h-4 w-4" />
          <span className="text-xs">{t("planner")}</span>
        </Button>
      </div>
    </div>
  )
}
