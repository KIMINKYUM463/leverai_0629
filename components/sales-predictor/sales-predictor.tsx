"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, TrendingUp, BarChart3, PieChartIcon } from "lucide-react"

export function SalesPredictor() {
  const [productName, setProductName] = useState<string>("제주 감귤")
  const [productCategory, setProductCategory] = useState<string>("과일")
  const [price, setPrice] = useState<number>(25000)
  const [historicalSales, setHistoricalSales] = useState<number>(1200)
  const [seasonality, setSeasonality] = useState<string>("high")
  const [marketTrend, setMarketTrend] = useState<string>("growing")
  const [competitionLevel, setCompetitionLevel] = useState<string>("medium")
  const [marketingBudget, setMarketingBudget] = useState<number>(500000)
  const [isMounted, setIsMounted] = useState(false)
  const [predictionData, setPredictionData] = useState<any>(null)

  // 예측 데이터 생성 함수
  const generatePrediction = () => {
    // 기본 판매량 (과거 판매량 기준)
    const baseSales = historicalSales

    // 가격 영향 (가격이 높을수록 판매량 감소)
    const priceEffect = 1 - (price / 100000) * 0.5 // 10만원일 때 50% 감소

    // 계절성 영향
    const seasonalityEffect = seasonality === "high" ? 1.3 : seasonality === "medium" ? 1 : 0.7

    // 시장 트렌드 영향
    const trendEffect = marketTrend === "growing" ? 1.2 : marketTrend === "stable" ? 1 : 0.8

    // 경쟁 수준 영향
    const competitionEffect = competitionLevel === "low" ? 1.2 : competitionLevel === "medium" ? 1 : 0.8

    // 마케팅 예산 영향 (로그 스케일로 적용)
    const marketingEffect = 1 + Math.log10(marketingBudget / 100000) * 0.2

    // 최종 예측 판매량
    const predictedSales = Math.round(
      baseSales * priceEffect * seasonalityEffect * trendEffect * competitionEffect * marketingEffect,
    )

    // 월별 예측 데이터 생성
    const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

    // 계절성 패턴 (과일 카테고리별로 다른 패턴 적용)
    let seasonalPattern
    if (productCategory === "과일") {
      seasonalPattern = [0.8, 0.7, 0.9, 1.0, 1.2, 1.3, 1.4, 1.3, 1.1, 1.0, 0.9, 1.1] // 여름 성수기
    } else if (productCategory === "채소") {
      seasonalPattern = [1.2, 1.1, 1.0, 0.9, 1.0, 1.1, 1.0, 0.9, 1.0, 1.1, 1.2, 1.3] // 겨울 성수기
    } else if (productCategory === "수산물") {
      seasonalPattern = [0.9, 0.8, 1.0, 1.1, 1.2, 1.0, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0] // 봄/가을 성수기
    } else {
      seasonalPattern = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0] // 일정한 패턴
    }

    // 월별 데이터 생성
    const monthlyData = months.map((month, index) => {
      const monthlySales = Math.round(predictedSales * seasonalPattern[index])
      const revenue = monthlySales * price
      const profit = Math.round(revenue * 0.3) // 30% 마진 가정

      return {
        name: month,
        판매량: monthlySales,
        매출: revenue,
        수익: profit,
      }
    })

    // 카테고리별 판매 비중
    const categoryData = [
      { name: "온라인 마켓", value: Math.round(predictedSales * 0.45) },
      { name: "오프라인 매장", value: Math.round(predictedSales * 0.25) },
      { name: "B2B 거래", value: Math.round(predictedSales * 0.2) },
      { name: "직거래", value: Math.round(predictedSales * 0.1) },
    ]

    // 예측 요약 데이터
    const summaryData = {
      totalSales: monthlyData.reduce((sum, item) => sum + item.판매량, 0),
      totalRevenue: monthlyData.reduce((sum, item) => sum + item.매출, 0),
      totalProfit: monthlyData.reduce((sum, item) => sum + item.수익, 0),
      peakMonth: months[seasonalPattern.indexOf(Math.max(...seasonalPattern))],
      lowMonth: months[seasonalPattern.indexOf(Math.min(...seasonalPattern))],
      averageMonthlySales: Math.round(monthlyData.reduce((sum, item) => sum + item.판매량, 0) / 12),
    }

    // 전체 예측 데이터 설정
    setPredictionData({
      monthlyData,
      categoryData,
      summaryData,
    })
  }

  // 컴포넌트 마운트 시 예측 데이터 생성
  useEffect(() => {
    if (isMounted) {
      generatePrediction()
    }
  }, [
    productName,
    productCategory,
    price,
    historicalSales,
    seasonality,
    marketTrend,
    competitionLevel,
    marketingBudget,
    isMounted,
  ])

  // 클라이언트 사이드 렌더링을 위한 마운트 체크
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 차트 색상
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  if (!isMounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 판매 예측기</h2>
        <p className="text-muted-foreground">AI가 상품의 미래 판매량과 수익을 예측합니다.</p>
      </div>

      <Tabs defaultValue="input" className="space-y-4">
        <TabsList>
          <TabsTrigger value="input">예측 설정</TabsTrigger>
          <TabsTrigger value="results">예측 결과</TabsTrigger>
          <TabsTrigger value="analysis">상세 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>판매 예측 설정</CardTitle>
              <CardDescription>상품 정보와 시장 조건을 입력하여 판매량을 예측하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">상품명</Label>
                    <Input
                      id="product-name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="예: 제주 감귤"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-category">상품 카테고리</Label>
                    <Select value={productCategory} onValueChange={setProductCategory}>
                      <SelectTrigger id="product-category">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="과일">과일</SelectItem>
                        <SelectItem value="채소">채소</SelectItem>
                        <SelectItem value="수산물">수산물</SelectItem>
                        <SelectItem value="곡물">곡물</SelectItem>
                        <SelectItem value="기타">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">판매 가격 (₩)</Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="historical-sales">과거 월 평균 판매량 (개)</Label>
                    <Input
                      id="historical-sales"
                      type="number"
                      value={historicalSales}
                      onChange={(e) => setHistoricalSales(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seasonality">계절성</Label>
                    <Select value={seasonality} onValueChange={setSeasonality}>
                      <SelectTrigger id="seasonality">
                        <SelectValue placeholder="계절성 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">높음 (계절 상품)</SelectItem>
                        <SelectItem value="medium">중간</SelectItem>
                        <SelectItem value="low">낮음 (연중 상품)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="market-trend">시장 트렌드</Label>
                    <Select value={marketTrend} onValueChange={setMarketTrend}>
                      <SelectTrigger id="market-trend">
                        <SelectValue placeholder="시장 트렌드 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="growing">성장 중</SelectItem>
                        <SelectItem value="stable">안정적</SelectItem>
                        <SelectItem value="declining">하락 중</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="competition-level">경쟁 수준</Label>
                    <Select value={competitionLevel} onValueChange={setCompetitionLevel}>
                      <SelectTrigger id="competition-level">
                        <SelectValue placeholder="경쟁 수준 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">낮음</SelectItem>
                        <SelectItem value="medium">중간</SelectItem>
                        <SelectItem value="high">높음</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marketing-budget">월 마케팅 예산 (₩)</Label>
                    <Input
                      id="marketing-budget"
                      type="number"
                      value={marketingBudget}
                      onChange={(e) => setMarketingBudget(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6" onClick={generatePrediction}>
                <TrendingUp className="mr-2 h-4 w-4" /> 판매량 예측하기
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {predictionData && (
            <>
              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle>판매 예측 결과</CardTitle>
                  <CardDescription>AI가 예측한 {productName}의 판매량과 수익입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3 mb-6">
                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <div className="text-sm text-teal-700 mb-1">연간 예상 판매량</div>
                      <div className="text-3xl font-bold text-teal-700">
                        {predictionData.summaryData.totalSales.toLocaleString()}개
                      </div>
                      <div className="text-sm text-teal-600 mt-1">
                        월 평균: {predictionData.summaryData.averageMonthlySales.toLocaleString()}개
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="text-sm text-blue-700 mb-1">연간 예상 매출</div>
                      <div className="text-3xl font-bold text-blue-700">
                        ₩{Math.round(predictionData.summaryData.totalRevenue / 10000).toLocaleString()}만
                      </div>
                      <div className="text-sm text-blue-600 mt-1">
                        월 평균: ₩{Math.round(predictionData.summaryData.totalRevenue / 12 / 10000).toLocaleString()}만
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="text-sm text-purple-700 mb-1">연간 예상 수익</div>
                      <div className="text-3xl font-bold text-purple-700">
                        ₩{Math.round(predictionData.summaryData.totalProfit / 10000).toLocaleString()}만
                      </div>
                      <div className="text-sm text-purple-600 mt-1">
                        수익률:{" "}
                        {Math.round(
                          (predictionData.summaryData.totalProfit / predictionData.summaryData.totalRevenue) * 100,
                        )}
                        %
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">월별 판매 예측</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={predictionData.monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="판매량" stroke="#0088FE" activeDot={{ r: 8 }} />
                          <Line yAxisId="right" type="monotone" dataKey="매출" stroke="#00C49F" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 mt-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-base font-medium mb-3">판매 피크 시즌</h3>
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-teal-600" />
                        <div>
                          <div className="font-medium">최고 판매 월: {predictionData.summaryData.peakMonth}</div>
                          <div className="text-sm text-gray-500">이 시기에 마케팅을 집중하세요</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-medium">최저 판매 월: {predictionData.summaryData.lowMonth}</div>
                          <div className="text-sm text-gray-500">이 시기에 프로모션을 고려하세요</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="text-base font-medium mb-3">판매 채널 분포</h3>
                      <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={predictionData.categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {predictionData.categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value.toLocaleString()}개`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {predictionData && (
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle>상세 분석</CardTitle>
                <CardDescription>AI가 분석한 판매 예측에 대한 상세 인사이트입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                        매출 vs 수익 분석
                      </h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={predictionData.monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `₩${(value / 10000).toFixed(0)}만`} />
                            <Tooltip formatter={(value) => `₩${value.toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="매출" fill="#0088FE" />
                            <Bar dataKey="수익" fill="#00C49F" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <PieChartIcon className="h-5 w-5 mr-2 text-purple-600" />
                        비용 구조 분석
                      </h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "원가", value: Math.round(predictionData.summaryData.totalRevenue * 0.5) },
                                { name: "마케팅", value: marketingBudget * 12 },
                                { name: "물류비용", value: Math.round(predictionData.summaryData.totalRevenue * 0.1) },
                                { name: "운영비용", value: Math.round(predictionData.summaryData.totalRevenue * 0.1) },
                                { name: "순이익", value: predictionData.summaryData.totalProfit },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {[...Array(5)].map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₩${value.toLocaleString()}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">AI 인사이트</h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">판매 트렌드 분석</h4>
                        <p className="text-blue-700">
                          {productName}의 판매량은{" "}
                          {marketTrend === "growing" ? "성장" : marketTrend === "stable" ? "안정적" : "하락"} 추세를
                          보이고 있으며,
                          {seasonality === "high"
                            ? " 계절성이 높아 특정 시즌에 판매가 집중됩니다."
                            : seasonality === "medium"
                              ? " 중간 정도의 계절성을 보입니다."
                              : " 연중 비교적 안정적인 판매 패턴을 보입니다."}
                        </p>
                        <div className="mt-2 text-sm text-blue-600">
                          {predictionData.summaryData.peakMonth}에 판매량이 최대가 될 것으로 예상되며, 이 시기에 재고
                          관리와 마케팅을 강화하는 것이 좋습니다.
                        </div>
                      </div>

                      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                        <h4 className="font-medium text-teal-800 mb-2">가격 최적화 제안</h4>
                        <p className="text-teal-700">
                          현재 가격(₩{price.toLocaleString()})은
                          {price > 30000
                            ? " 다소 높은 편으로, 판매량 증가를 위해 가격 인하를 고려해볼 수 있습니다."
                            : price < 15000
                              ? " 다소 낮은 편으로, 수익성 향상을 위해 점진적인 가격 인상을 고려해볼 수 있습니다."
                              : " 적정 수준으로 판단됩니다."}
                        </p>
                        <div className="mt-2 text-sm text-teal-600">
                          {competitionLevel === "high"
                            ? "경쟁이 치열하므로 가격보다는 품질과 서비스로 차별화하는 전략이 효과적일 수 있습니다."
                            : "경쟁이 심하지 않으므로 프리미엄 가격 전략을 고려해볼 수 있습니다."}
                        </div>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-medium text-purple-800 mb-2">마케팅 효율성 분석</h4>
                        <p className="text-purple-700">
                          현재 마케팅 예산(월 ₩{marketingBudget.toLocaleString()})은
                          {marketingBudget > 1000000
                            ? " 충분한 수준이며, 효율적인 채널 배분이 중요합니다."
                            : marketingBudget < 300000
                              ? " 다소 제한적이므로, 타겟 마케팅에 집중하는 것이 효과적입니다."
                              : " 적정 수준이나, 시즌에 따라 탄력적으로 운영하는 것이 좋습니다."}
                        </p>
                        <div className="mt-2 text-sm text-purple-600">
                          온라인 마켓을 통한 판매 비중이 45%로 가장 높으므로, 온라인 마케팅에 우선 투자하는 것이
                          효과적입니다.
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h4 className="font-medium text-amber-800 mb-2">수익성 개선 방안</h4>
                        <p className="text-amber-700">
                          현재 예상 수익률은{" "}
                          {Math.round(
                            (predictionData.summaryData.totalProfit / predictionData.summaryData.totalRevenue) * 100,
                          )}
                          %로,
                          {predictionData.summaryData.totalProfit / predictionData.summaryData.totalRevenue > 0.3
                            ? " 양호한 수준입니다."
                            : " 개선의 여지가 있습니다."}
                        </p>
                        <div className="mt-2 text-sm text-amber-600">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>물류 비용 최적화를 통해 수익성을 약 5% 개선할 수 있습니다.</li>
                            <li>대량 구매 고객을 위한 특별 프로그램을 도입하여 B2B 판매 비중을 높이세요.</li>
                            <li>비수기에 특별 프로모션을 통해 판매량을 유지하세요.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
