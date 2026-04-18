"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { getDailyProverb } from "@/lib/proverbs"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ProverbCard() {
  const [proverb, setProverb] = useState<any>(null)

  useEffect(() => {
    setProverb(getDailyProverb())
  }, [])

  if (!proverb) return null

  return (
    <div className="glass-subtle rounded-xl p-3.5 border border-amber-500/10">
      <div className="flex gap-2 mb-2">
        <Quote className="h-4 w-4 text-amber-500/60 rotate-180 shrink-0 mt-0.5" />
        <p className="font-semibold text-sm text-foreground/90 italic leading-snug">"{proverb.somali}"</p>
      </div>
      <p className="text-xs text-muted-foreground mb-2 pl-6">{proverb.english}</p>
      {proverb.context && (
        <p className="text-[10px] text-amber-500/60 pl-6 border-l-2 border-amber-500/20 ml-1 leading-relaxed">
          {proverb.context}
        </p>
      )}
    </div>
  )
}
