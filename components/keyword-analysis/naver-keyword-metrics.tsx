"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export function NaverKeywordMetrics({ keyword }: { keyword: string }) {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          </div>
          <CardTitle className="text-2xl font-bold">{keyword}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">AI 어려움도 측정 (100%)</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-sm text-muted-foreground">레버</span>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold text-red-500">8,888</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-sm text-muted-foreground">최근 한 달 검색량</span>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">940회</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-sm text-muted-foreground">작년 총 검색량</span>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">0점</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-sm text-muted-foreground">6개월 시장규모</span>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">1억원</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-sm text-muted-foreground">난이도</span>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">335.87</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-sm text-muted-foreground">TOP10 상품 평균가</span>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">52,800원</div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm">
            <span className="font-medium">상품이 가장 많이 팔리는 가격대는 23,500원 ~ 32,900원 이에요</span> 📈
          </p>
          <p className="text-xs text-muted-foreground mt-1">네이버에서 판매량 대비 적정 판매 가격은 29,900원 이에요</p>
        </div>
      </CardContent>
    </Card>
  )
}
