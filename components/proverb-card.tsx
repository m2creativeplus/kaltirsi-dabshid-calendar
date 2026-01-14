"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { getDailyProverb } from "@/lib/proverbs"
import { useEffect, useState } from "react"

export function ProverbCard() {
  const [proverb, setProverb] = useState<any>(null)

  useEffect(() => {
    setProverb(getDailyProverb())
  }, [])

  if (!proverb) return null

  return (
    <Card className="bg-orange-50 border-orange-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex gap-2 mb-2">
          <Quote className="h-5 w-5 text-orange-400 rotate-180" />
          <p className="font-semibold text-gray-900 italic">"{proverb.somali}"</p>
        </div>
        <p className="text-sm text-gray-600 mb-2 pl-7">{proverb.english}</p>
        {proverb.context && (
          <p className="text-xs text-orange-700 pl-7 border-l-2 border-orange-300 ml-1">
            {proverb.context}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
