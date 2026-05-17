import { PublicAnalyticsDashboard } from "@/components/kaltirsi-public-analytics";
import { NotebookLMBot } from "@/components/notebook-bot";

export const metadata = {
  title: "Kaltirsi Sovereign Analytics | Public Data",
  description: "Live ecological intelligence and telemetry data for the Somaliland Kaltirsi calendar system.",
};

export default function AnalyticsPage() {
  return (
    <main>
      <PublicAnalyticsDashboard />
      <NotebookLMBot />
    </main>
  );
}
