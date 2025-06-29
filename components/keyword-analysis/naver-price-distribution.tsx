"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export function NaverPriceDistribution() {
  const priceData = [
    { range: "13,900원", percentage: 15 },
    { range: "18,000원", percentage: 15 },
    { range: "23,500원", percentage: 13 },
    { range: "32,900원", percentage: 15 },
    { range: "45,900원", percentage: 15 },
    { range: "157,000원", percentage: 11 },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-1">
          <CardTitle className="text-lg">판매가 분포</CardTitle>
          <HelpCircle className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">어떤 가격대의 상품이 가장 많이 팔릴까요?</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {priceData.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.range}</span>
                <span>{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-orange-400 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                  style={{ width: `${item.percentage * 6.67}%` }}
                >
                  {item.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
