import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CompetitorAnalysisTool } from "@/components/competitor-analysis/competitor-analysis-tool"

export default function CompetitorAnalysisPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <CompetitorAnalysisTool />
        </main>
      </div>
    </div>
  )
}
