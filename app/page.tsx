"use client"

import GoogleCalendarView from "@/components/google-calendar-view"
import { CulturalProvider } from "@/components/cultural-provider"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CulturalProvider>
        <GoogleCalendarView />
      </CulturalProvider>
    </main>
  )
}
