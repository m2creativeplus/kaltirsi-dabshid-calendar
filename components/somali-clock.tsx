"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"
import { cn } from "@/lib/utils"

export function SomaliClock() {
  const [timeStr, setTimeStr] = React.useState<string>("")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const tick = () => setTimeStr(KaltirsiEngine.getSomaliTime(new Date()))
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <div className="glass rounded-2xl p-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
          Saacadda Soomaaliga
        </span>
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <Clock className="h-3 w-3 text-white" />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold font-serif text-gradient-gold leading-tight">
          {timeStr}
        </div>
        <p className="text-[10px] text-muted-foreground capitalize mt-0.5">
          Waqtiga Dhaqanka
        </p>
      </div>
    </div>
  )
}
