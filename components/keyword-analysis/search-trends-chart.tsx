"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">검색 트렌드</CardTitle>
            <p className="text-sm text-muted-foreground">12월, 11월, 10월의 검색량이 많은 키워드에요</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="monthly">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">월간 보기</SelectItem>
                <SelectItem value="weekly">주간 보기</SelectItem>
                <SelectItem value="daily">일간 보기</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="1year">
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1year">지난 1년</SelectItem>
                <SelectItem value="6months">6개월</SelectItem>
                <SelectItem value="3months">3개월</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          {/* Y축 라벨 */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
            <span>714</span>
            <span>400</span>
            <span>200</span>
            <span>0</span>
          </div>

          {/* 차트 영역 */}
          <div className="ml-8 h-full relative">
            {/* 배경 그리드 */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-t border-gray-200"></div>
              ))}
            </div>

            {/* 영역 차트 */}
            <svg className="w-full h-full" viewBox="0 0 800 200">
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d="M 0 180 L 100 160 L 200 140 L 300 120 L 400 80 L 500 60 L 600 40 L 700 20 L 800 30 L 800 200 L 0 200 Z"
                fill="url(#areaGradient)"
                stroke="#fb923c"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* X축 라벨 */}
          <div className="ml-8 mt-2 flex justify-between text-xs text-muted-foreground">
            <span>23.4.6월</span>
            <span>최근 검색량: 649</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
