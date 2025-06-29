import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KeywordAnalysisTool } from "@/components/keyword-analysis/keyword-analysis-tool"

export const metadata = {
  title: "AI 키워드 분석 | WingsAI",
  description: "네이버, 쿠팡 키워드를 분석하고 상품 정보를 확인하는 AI 도구입니다.",
}

export default function KeywordAnalysisPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold tracking-tight">AI 키워드 분석</h2>
            </div>
            <p className="text-muted-foreground mb-6">네이버와 쿠팡에서 키워드를 분석하고 상품 정보를 확인해보세요.</p>
            <div className="grid gap-4">
              <KeywordAnalysisTool />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
