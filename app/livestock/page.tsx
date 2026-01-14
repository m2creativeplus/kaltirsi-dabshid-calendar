import { LivestockDashboard } from "@/components/livestock/livestock-dashboard"
import { CulturalProvider } from "@/components/cultural-provider"

export default function LivestockPage() {
  return (
    <CulturalProvider>
      <LivestockDashboard />
    </CulturalProvider>
  )
}
