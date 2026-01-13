"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useCultural } from "@/components/cultural-provider"

export function StarMap() {
  const { t } = useCultural()

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3 text-sm">Current Stars</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-xs">{t("star.cirir")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-500" />
            <span className="text-xs">{t("star.laxaha")}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">Guiding the Gu' season</div>
        </div>
      </CardContent>
    </Card>
  )
}
