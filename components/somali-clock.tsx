"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { KaltirsiEngine } from "@/lib/kaltirsi-engine"

export function SomaliClock() {
  const [timeStr, setTimeStr] = React.useState<string>("")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const tick = () => {
      setTimeStr(KaltirsiEngine.getSomaliTime(new Date()))
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <Card className="w-full bg-card/50 backdrop-blur border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Saacadda Soomaaliga
        </CardTitle>
        <Clock className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-serif text-primary">
          {timeStr}
        </div>
        <p className="text-xs text-muted-foreground capitalize mt-1">
          {/* Extract suffix for display if needed properly */}
          Waqtiga Dhaqanka
        </p>
      </CardContent>
    </Card>
  )
}
