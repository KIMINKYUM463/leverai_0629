import { ReviewGeneratorTool } from "@/components/review-generator/review-generator-tool"

export const metadata = {
  title: "AI 리뷰 생성기 | LeverAI",
  description: "키워드를 입력하면 상품에 맞는 리뷰를 자동으로 생성해주는 AI 리뷰 생성기입니다.",
}

export default function ReviewGeneratorPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI 리뷰 생성기</h2>
      </div>
      <div className="grid gap-4">
        <ReviewGeneratorTool />
      </div>
    </div>
  )
}
