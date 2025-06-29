"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AgeGroupAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">연령별 검색 비율</CardTitle>
        <p className="text-sm text-muted-foreground">12월, 11월, 10월의 검색량이 많은 키워드에요</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-6 gap-1 text-xs text-center">
            <div>1%</div>
            <div>13%</div>
            <div>29%</div>
            <div>42%</div>
            <div>13%</div>
            <div>2%</div>
          </div>
          <div className="grid grid-cols-6 gap-1">
            <div className="bg-orange-200 h-16 rounded flex items-end justify-center pb-1">
              <div className="bg-orange-400 w-full h-2 rounded"></div>
            </div>
            <div className="bg-orange-200 h-16 rounded flex items-end justify-center pb-1">
              <div className="bg-orange-400 w-full h-4 rounded"></div>
            </div>
            <div className="bg-orange-200 h-16 rounded flex items-end justify-center pb-1">
              <div className="bg-orange-400 w-full h-8 rounded"></div>
            </div>
            <div className="bg-orange-200 h-16 rounded flex items-end justify-center pb-1">
              <div className="bg-orange-400 w-full h-12 rounded"></div>
            </div>
            <div className="bg-orange-200 h-16 rounded flex items-end justify-center pb-1">
              <div className="bg-orange-400 w-full h-4 rounded"></div>
            </div>
            <div className="bg-orange-200 h-16 rounded flex items-end justify-center pb-1">
              <div className="bg-orange-400 w-full h-2 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-1 text-xs text-center">
            <div>10대</div>
            <div>20대</div>
            <div>30대</div>
            <div>40대</div>
            <div>50대</div>
            <div>60대</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
