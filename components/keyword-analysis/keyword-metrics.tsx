"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface KeywordMetricsProps {
  keyword: string
}

export function KeywordMetrics({ keyword }: KeywordMetricsProps) {
  const metrics = [
    {
      label: "네이버 월 검색량",
      value: "940회",
      tooltip: "네이버에서 해당 키워드의 월간 검색량입니다",
    },
    {
      label: "전체상품 수",
      value: "37,308개",
      tooltip: "해당 키워드로 검색되는 전체 상품 수입니다",
    },
    {
      label: "1페이지 상품 전체리뷰 개수",
      value: "0개",
      tooltip: "검색 결과 1페이지에 있는 상품들의 총 리뷰 개수입니다",
    },
    {
      label: "1페이지 혁신상품 전체리뷰 개수",
      value: "0개",
      tooltip: "1페이지 혁신상품들의 총 리뷰 개수입니다",
    },
    {
      label: "TOP10 상품 평균리뷰 개수",
      value: "81개",
      tooltip: "상위 10개 상품의 평균 리뷰 개수입니다",
    },
    {
      label: "1페이지 광고 비율",
      value: "25%",
      tooltip: "검색 결과 1페이지에서 광고 상품의 비율입니다",
    },
    {
      label: "판매자체(쇼핑몰) 비율",
      value: "34%",
      tooltip: "판매자 직접 판매 상품의 비율입니다",
    },
    {
      label: "로켓 비율",
      value: "47%",
      tooltip: "로켓배송 상품의 비율입니다",
    },
    {
      label: "판매자로켓(그로스) 비율",
      value: "19%",
      tooltip: "판매자 로켓배송 상품의 비율입니다",
    },
  ]

  return (
    <div className="space-y-4">
      {/* 중앙 키워드 표시 */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-3">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-orange-500" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">레버</h3>
      </div>

      {/* 지표 그리드 */}
      <div className="grid grid-cols-1 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{metric.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">{metric.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
