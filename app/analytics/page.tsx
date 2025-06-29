import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { EnhancedAnalyticsTool } from "@/components/analytics/enhanced-analytics-tool"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <EnhancedAnalyticsTool />
        </main>
      </div>
    </div>
  )
}
