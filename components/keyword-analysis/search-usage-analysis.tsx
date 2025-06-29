"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SearchUsageAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">검색 사용량 분석</CardTitle>
        <p className="text-sm text-muted-foreground">검색자들은 어떤 사용자들이 많을까요?</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">성별 분포</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">여성 51%</span>
              <span className="text-sm">남성 49%</span>
            </div>
            <div className="flex">
              <div className="bg-orange-200 h-8 flex-1 rounded-l flex items-center justify-center text-sm font-medium">
                여성 51%
              </div>
              <div className="bg-blue-200 h-8 flex-1 rounded-r flex items-center justify-center text-sm font-medium">
                남성 49%
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">연령별 검색 비율</h4>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">40대 초반</div>
            <div className="grid grid-cols-6 gap-1 text-xs">
              <div className="text-center">1%</div>
              <div className="text-center">13%</div>
              <div className="text-center">29%</div>
              <div className="text-center">42%</div>
              <div className="text-center">13%</div>
              <div className="text-center">2%</div>
            </div>
            <div className="grid grid-cols-6 gap-1">
              <div className="bg-orange-200 h-12 rounded flex items-end justify-center pb-1">
                <div className="bg-orange-400 w-full h-1 rounded"></div>
              </div>
              <div className="bg-orange-200 h-12 rounded flex items-end justify-center pb-1">
                <div className="bg-orange-400 w-full h-3 rounded"></div>
              </div>
              <div className="bg-orange-200 h-12 rounded flex items-end justify-center pb-1">
                <div className="bg-orange-400 w-full h-7 rounded"></div>
              </div>
              <div className="bg-orange-200 h-12 rounded flex items-end justify-center pb-1">
                <div className="bg-orange-400 w-full h-10 rounded"></div>
              </div>
              <div className="bg-orange-200 h-12 rounded flex items-end justify-center pb-1">
                <div className="bg-orange-400 w-full h-3 rounded"></div>
              </div>
              <div className="bg-orange-200 h-12 rounded flex items-end justify-center pb-1">
                <div className="bg-orange-400 w-full h-1 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-1 text-xs">
              <div className="text-center">10대</div>
              <div className="text-center">20대</div>
              <div className="text-center">30대</div>
              <div className="text-center">40대</div>
              <div className="text-center">50대</div>
              <div className="text-center">60대</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            여성이 51%로 더 많이 검색하고, 40대가 가장 많이 검색합니다.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
