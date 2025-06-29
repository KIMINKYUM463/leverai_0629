"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeliveryChart } from "./delivery-chart"
import { PriceDistributionChart } from "./price-distribution-chart"
import { KeywordMetrics } from "./keyword-metrics"
import { SearchUsageAnalysis } from "./search-usage-analysis"
import { AgeGroupAnalysis } from "./age-group-analysis"
import { NaverKeywordMetrics } from "./naver-keyword-metrics"
import { NaverPriceDistribution } from "./naver-price-distribution"
import { SearchTrendsChart } from "./search-trends-chart"
import { NaverProductTable } from "./naver-product-table"
import { ProductTable } from "./product-table"
import { Badge } from "@/components/ui/badge"

export function KeywordAnalysisTool() {
  const [keyword, setKeyword] = useState("레버")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("naver")
  const [hasResults, setHasResults] = useState(true)

  const handleAnalysis = async () => {
    if (!keyword.trim()) return

    setIsAnalyzing(true)
    // 실제 분석 로직 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
    setHasResults(true)
  }

  return (
    <div className="space-y-6">
      {/* 검색 영역 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="분석할 키워드를 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAnalysis()}
                className="text-lg"
              />
            </div>
            <Button
              onClick={handleAnalysis}
              disabled={isAnalyzing || !keyword.trim()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            >
              {isAnalyzing ? "분석중..." : "분석"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {hasResults && (
        <>
          {/* 탭 메뉴 */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="naver">네이버 분석</TabsTrigger>
              <TabsTrigger value="coupang">쿠팡 분석</TabsTrigger>
              <TabsTrigger value="related">연관 키워드</TabsTrigger>
            </TabsList>

            <TabsContent value="naver" className="space-y-6">
              <NaverAnalysisContent keyword={keyword} />
            </TabsContent>

            <TabsContent value="coupang" className="space-y-6">
              <CoupangAnalysisContent keyword={keyword} />
            </TabsContent>

            <TabsContent value="related" className="space-y-6">
              <RelatedKeywordsContent keyword={keyword} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

function NaverAnalysisContent({ keyword }: { keyword: string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 왼쪽 사이드바 - 검색 사용량 분석 */}
        <div className="space-y-6">
          <SearchUsageAnalysis />
          <AgeGroupAnalysis />
        </div>

        {/* 중앙 키워드 지표 */}
        <div className="lg:col-span-2">
          <NaverKeywordMetrics keyword={keyword} />
        </div>

        {/* 오른쪽 판매가 분포 */}
        <div>
          <NaverPriceDistribution />
        </div>
      </div>

      {/* 검색 트렌드 */}
      <SearchTrendsChart />

      {/* 상품 테이블 */}
      <NaverProductTable keyword={keyword} />
    </div>
  )
}

function CoupangAnalysisContent({ keyword }: { keyword: string }) {
  return (
    <div className="space-y-6">
      {/* 상단 차트 및 지표 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 배송방식 비율 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">배송방식 비율</CardTitle>
            <p className="text-sm text-muted-foreground">어떤 배송방식이 잘 팔리는지 확인해보세요</p>
          </CardHeader>
          <CardContent>
            <DeliveryChart />
            <div className="mt-4 text-center">
              <p className="text-sm font-medium">로켓배송이 47%로 가장 높아요</p>
              <p className="text-xs text-muted-foreground">쿠팡 1페이지의 상품 배송 정보 결과입니다</p>
            </div>
          </CardContent>
        </Card>

        {/* 키워드 지표 */}
        <div className="lg:col-span-1">
          <KeywordMetrics keyword={keyword} />
        </div>

        {/* 판매가 분포 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">판매가 분포</CardTitle>
            <p className="text-sm text-muted-foreground">어떤 가격대의 상품이 가장 많이 팔릴까요?</p>
          </CardHeader>
          <CardContent>
            <PriceDistributionChart />
            <div className="mt-4">
              <p className="text-sm font-medium">많이 팔리는 가격대는 5,600원 ~ 12,200원 이에요 📈</p>
              <p className="text-xs text-muted-foreground">쿠팡에서 판매량 대비 적정 판매 가격은 20,100원 이에요</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 상품 테이블 */}
      <ProductTable keyword={keyword} />
    </div>
  )
}

function RelatedKeywordsContent({ keyword }: { keyword: string }) {
  const relatedKeywords = [
    "레버 농업 도구",
    "레버 기계",
    "레버 핸들",
    "레버 장치",
    "레버 부품",
    "레버 시스템",
    "레버 조작",
    "레버 제어",
    "레버 스위치",
    "레버 브랜드",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>연관 키워드</CardTitle>
          <p className="text-sm text-muted-foreground">'{keyword}'와 관련된 키워드들입니다</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {relatedKeywords.map((relatedKeyword, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                {relatedKeyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
