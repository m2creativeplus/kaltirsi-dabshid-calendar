"use client"

import { KaltirsiSuperAppShell } from "@/components/kaltirsi-superapp-shell"
import { CulturalProvider } from "@/components/cultural-provider"

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-foreground relative">
      <CulturalProvider>
        <KaltirsiSuperAppShell />
      </CulturalProvider>
    </main>
  )
}
