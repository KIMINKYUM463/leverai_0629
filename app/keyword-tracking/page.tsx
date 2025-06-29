import { KeywordTrackingTool } from "@/components/keyword-tracking/keyword-tracking-tool"

export const metadata = {
  title: "AI 키워드 순위 추적 | LeverAI",
  description: "쿠팡 상품의 키워드 순위를 추적하고 분석하는 AI 도구입니다.",
}

export default function KeywordTrackingPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI 키워드 순위 추적</h2>
      </div>
      <p className="text-muted-foreground">상품 검색과 광고에 최적화된 키워드를 AI가 추천해드립니다.</p>
      <div className="grid gap-4">
        <KeywordTrackingTool />
      </div>
    </div>
  )
}
