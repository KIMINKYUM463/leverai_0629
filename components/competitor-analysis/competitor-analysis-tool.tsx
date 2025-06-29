"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Calendar, BarChart3 } from "lucide-react"

export function CompetitorAnalysisTool() {
  const [competitorUrl, setCompetitorUrl] = useState<string>("")
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false)

  // 테스트 URL 설정
  const setTestUrl = () => {
    setCompetitorUrl("https://www.coupang.com/vp/products/9876543210")
  }

  // 분석 실행 함���
  const runAnalysis = () => {
    if (!competitorUrl) return

    setIsAnalyzing(true)

    // 분석 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      setIsAnalyzing(false)
      setIsAnalyzed(true)
    }, 1500)
  }

  // 샘플 데이터 - 현재 매출
  const currentData = {
    dailySales: 42,
    monthlySales: 1260,
    averagePrice: 35000,
    totalRevenue: 44100000,
    growthRate: 8.5,
  }

  // 샘플 데이터 - 1개월 예상
  const oneMonthData = {
    dailySales: 48,
    monthlySales: 1440,
    averagePrice: 35500,
    totalRevenue: 51120000,
    growthRate: 15.9,
  }

  // 샘플 데이터 - 2개월 예상
  const twoMonthData = {
    dailySales: 55,
    monthlySales: 1650,
    averagePrice: 36000,
    totalRevenue: 59400000,
    growthRate: 16.2,
  }

  // 매출 차트 데이터 포인트
  const monthlyRevenuePoints = [
    { month: "1월", revenue: 38500000 },
    { month: "2월", revenue: 40200000 },
    { month: "3월", revenue: 41800000 },
    { month: "현재", revenue: 44100000 },
    { month: "1개월 후", revenue: 51120000 },
    { month: "2개월 후", revenue: 59400000 },
  ]

  // 차트 최대값 계산
  const maxRevenue = Math.max(...monthlyRevenuePoints.map((point) => point.revenue))

  // 차트 SVG 생성 함수
  const generateChartPath = () => {
    const points = monthlyRevenuePoints.map((point, index) => {
      const x = (index / (monthlyRevenuePoints.length - 1)) * 100
      const y = 100 - (point.revenue / maxRevenue) * 80
      return `${x},${y}`
    })

    return `M ${points.join(" L ")}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 경쟁사 매출 분석</h2>
        <p className="text-muted-foreground">경쟁사 URL을 입력하여 현재 매출과 미래 매출을 예측해보세요.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>경쟁사 URL 입력</CardTitle>
          <CardDescription>쿠팡, 11번가, G마켓 등의 상품 URL을 입력하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="grid gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="competitor-url">경쟁사 상품 URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="competitor-url"
                    placeholder="https://www.coupang.com/vp/products/..."
                    value={competitorUrl}
                    onChange={(e) => setCompetitorUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={setTestUrl}>
                    테스트
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={runAnalysis} disabled={!competitorUrl || isAnalyzing} className="w-full">
              {isAnalyzing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  분석 중...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" /> 매출 분석하기
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isAnalyzed && (
        <Tabs defaultValue="current" className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="current">
              <Calendar className="mr-2 h-4 w-4" /> 현재 매출
            </TabsTrigger>
            <TabsTrigger value="one-month">
              <TrendingUp className="mr-2 h-4 w-4" /> 1개월 예상
            </TabsTrigger>
            <TabsTrigger value="two-month">
              <BarChart3 className="mr-2 h-4 w-4" /> 2개월 예상
            </TabsTrigger>
          </TabsList>

          {/* 현재 매출 분석 */}
          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>현재 매출 분석</CardTitle>
                <CardDescription>경쟁사의 현재 매출 상황을 분석한 결과입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-sm text-blue-600 mb-1">일 평균 판매량</div>
                        <div className="text-2xl font-bold">{currentData.dailySales}개</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-sm text-blue-600 mb-1">월 판매량</div>
                        <div className="text-2xl font-bold">{currentData.monthlySales.toLocaleString()}개</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-sm text-blue-600 mb-1">평균 판매가</div>
                        <div className="text-2xl font-bold">₩{currentData.averagePrice.toLocaleString()}</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-sm text-blue-600 mb-1">월 매출액</div>
                        <div className="text-2xl font-bold">₩{currentData.totalRevenue.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-blue-700">전월 대비 성장률</div>
                        <div className="text-lg font-bold text-blue-700">+{currentData.growthRate}%</div>
                      </div>
                      <div className="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${Math.min(currentData.growthRate * 5, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm font-medium text-gray-500 mb-4">매출 추이</div>
                    <div className="aspect-[4/3] relative">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* 그리드 라인 */}
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="40" x2="100" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="1" />

                        {/* 데이터 라인 */}
                        <path d={generateChartPath()} fill="none" stroke="#3b82f6" strokeWidth="2" />

                        {/* 데이터 포인트 */}
                        {monthlyRevenuePoints.map((point, index) => {
                          const x = (index / (monthlyRevenuePoints.length - 1)) * 100
                          const y = 100 - (point.revenue / maxRevenue) * 80
                          return (
                            <circle key={index} cx={x} cy={y} r="1.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
                          )
                        })}

                        {/* 현재 지점 강조 */}
                        <circle
                          cx={(3 / (monthlyRevenuePoints.length - 1)) * 100}
                          cy={100 - (monthlyRevenuePoints[3].revenue / maxRevenue) * 80}
                          r="2.5"
                          fill="#3b82f6"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                      </svg>

                      {/* X축 레이블 */}
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        {monthlyRevenuePoints.map((point, index) => (
                          <div key={index} className={index === 3 ? "font-bold text-blue-600" : ""}>
                            {point.month}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">AI 분석 인사이트</h4>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>
                      경쟁사의 월 매출은 <span className="font-medium">₩44,100,000</span>으로 추정됩니다.
                    </li>
                    <li>
                      일 평균 <span className="font-medium">42개</span>의 상품이 판매되고 있습니다.
                    </li>
                    <li>
                      전월 대비 <span className="font-medium">8.5%</span>의 성장률을 보이고 있습니다.
                    </li>
                    <li>
                      주요 판매 채널은 <span className="font-medium">쿠팡</span>이며, 로켓배송을 활용하고 있습니다.
                    </li>
                    <li>
                      리뷰 평점은 <span className="font-medium">4.7점</span>으로 고객 만족도가 높습니다.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 1개월 예상 매출 */}
          <TabsContent value="one-month" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>1개월 후 예상 매출</CardTitle>
                <CardDescription>AI가 분석한 1개월 후 예상 매출 데이터입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <div className="text-sm text-indigo-600 mb-1">일 평균 판매량</div>
                        <div className="text-2xl font-bold">{oneMonthData.dailySales}개</div>
                        <div className="text-xs text-indigo-500 mt-1">
                          +{oneMonthData.dailySales - currentData.dailySales}개 증가
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <div className="text-sm text-indigo-600 mb-1">월 판매량</div>
                        <div className="text-2xl font-bold">{oneMonthData.monthlySales.toLocaleString()}개</div>
                        <div className="text-xs text-indigo-500 mt-1">
                          +{oneMonthData.monthlySales - currentData.monthlySales}개 증가
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <div className="text-sm text-indigo-600 mb-1">평균 판매가</div>
                        <div className="text-2xl font-bold">₩{oneMonthData.averagePrice.toLocaleString()}</div>
                        <div className="text-xs text-indigo-500 mt-1">
                          +₩{oneMonthData.averagePrice - currentData.averagePrice} 상승
                        </div>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <div className="text-sm text-indigo-600 mb-1">월 매출액</div>
                        <div className="text-2xl font-bold">₩{oneMonthData.totalRevenue.toLocaleString()}</div>
                        <div className="text-xs text-indigo-500 mt-1">
                          +₩{(oneMonthData.totalRevenue - currentData.totalRevenue).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-indigo-700">예상 성장률</div>
                        <div className="text-lg font-bold text-indigo-700">+{oneMonthData.growthRate}%</div>
                      </div>
                      <div className="mt-2 h-2 bg-indigo-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${Math.min(oneMonthData.growthRate * 3, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm font-medium text-gray-500 mb-4">매출 예측 그래프</div>
                    <div className="aspect-[4/3] relative">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* 그리드 라인 */}
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="40" x2="100" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="1" />

                        {/* 데이터 라인 */}
                        <path d={generateChartPath()} fill="none" stroke="#6366f1" strokeWidth="2" />

                        {/* 데이터 포인트 */}
                        {monthlyRevenuePoints.map((point, index) => {
                          const x = (index / (monthlyRevenuePoints.length - 1)) * 100
                          const y = 100 - (point.revenue / maxRevenue) * 80
                          return (
                            <circle
                              key={index}
                              cx={x}
                              cy={y}
                              r="1.5"
                              fill={index > 3 ? "#6366f1" : "#3b82f6"}
                              stroke="#ffffff"
                              strokeWidth="1"
                            />
                          )
                        })}

                        {/* 1개월 후 지점 강조 */}
                        <circle
                          cx={(4 / (monthlyRevenuePoints.length - 1)) * 100}
                          cy={100 - (monthlyRevenuePoints[4].revenue / maxRevenue) * 80}
                          r="2.5"
                          fill="#6366f1"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                      </svg>

                      {/* X축 레이블 */}
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        {monthlyRevenuePoints.map((point, index) => (
                          <div key={index} className={index === 4 ? "font-bold text-indigo-600" : ""}>
                            {point.month}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">1개월 예측 인사이트</h4>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>
                      1개월 후 예상 매출은 <span className="font-medium">₩51,120,000</span>으로 현재보다{" "}
                      <span className="font-medium">15.9%</span> 증가할 것으로 예측됩니다.
                    </li>
                    <li>
                      일 평균 판매량이 <span className="font-medium">48개</span>로 증가할 것으로 예상됩니다.
                    </li>
                    <li>여름 시즌 진입으로 인한 계절적 수요 증가가 예상됩니다.</li>
                    <li>경쟁사의 마케팅 캠페인이 판매량 증가에 기여할 것으로 분석됩니다.</li>
                    <li>
                      평균 판매가가 소폭 상승하여 <span className="font-medium">₩35,500</span>이 될 것으로 예상됩니다.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2개월 예상 매출 */}
          <TabsContent value="two-month" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>2개월 후 예상 매출</CardTitle>
                <CardDescription>AI가 분석한 2개월 후 예상 매출 데이터입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="text-sm text-purple-600 mb-1">일 평균 판매량</div>
                        <div className="text-2xl font-bold">{twoMonthData.dailySales}개</div>
                        <div className="text-xs text-purple-500 mt-1">
                          +{twoMonthData.dailySales - currentData.dailySales}개 증가
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="text-sm text-purple-600 mb-1">월 판매량</div>
                        <div className="text-2xl font-bold">{twoMonthData.monthlySales.toLocaleString()}개</div>
                        <div className="text-xs text-purple-500 mt-1">
                          +{twoMonthData.monthlySales - currentData.monthlySales}개 증가
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="text-sm text-purple-600 mb-1">평균 판매가</div>
                        <div className="text-2xl font-bold">₩{twoMonthData.averagePrice.toLocaleString()}</div>
                        <div className="text-xs text-purple-500 mt-1">
                          +₩{twoMonthData.averagePrice - currentData.averagePrice} 상승
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="text-sm text-purple-600 mb-1">월 매출액</div>
                        <div className="text-2xl font-bold">₩{twoMonthData.totalRevenue.toLocaleString()}</div>
                        <div className="text-xs text-purple-500 mt-1">
                          +₩{(twoMonthData.totalRevenue - currentData.totalRevenue).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-purple-700">예상 성장률</div>
                        <div className="text-lg font-bold text-purple-700">+{twoMonthData.growthRate}%</div>
                      </div>
                      <div className="mt-2 h-2 bg-purple-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${Math.min(twoMonthData.growthRate * 3, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm font-medium text-gray-500 mb-4">매출 예측 그래프</div>
                    <div className="aspect-[4/3] relative">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* 그리드 라인 */}
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="40" x2="100" y2="40" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="60" x2="100" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="1" />

                        {/* 데이터 라인 */}
                        <path d={generateChartPath()} fill="none" stroke="#a855f7" strokeWidth="2" />

                        {/* 데이터 포인트 */}
                        {monthlyRevenuePoints.map((point, index) => {
                          const x = (index / (monthlyRevenuePoints.length - 1)) * 100
                          const y = 100 - (point.revenue / maxRevenue) * 80
                          return (
                            <circle
                              key={index}
                              cx={x}
                              cy={y}
                              r="1.5"
                              fill={index > 4 ? "#a855f7" : index > 3 ? "#6366f1" : "#3b82f6"}
                              stroke="#ffffff"
                              strokeWidth="1"
                            />
                          )
                        })}

                        {/* 2개월 후 지점 강조 */}
                        <circle
                          cx={(5 / (monthlyRevenuePoints.length - 1)) * 100}
                          cy={100 - (monthlyRevenuePoints[5].revenue / maxRevenue) * 80}
                          r="2.5"
                          fill="#a855f7"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                      </svg>

                      {/* X축 레이블 */}
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        {monthlyRevenuePoints.map((point, index) => (
                          <div key={index} className={index === 5 ? "font-bold text-purple-600" : ""}>
                            {point.month}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">2개월 예측 인사이트</h4>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>
                      2개월 후 예상 매출은 <span className="font-medium">₩59,400,000</span>으로 현재보다{" "}
                      <span className="font-medium">34.7%</span> 증가할 것으로 예측됩니다.
                    </li>
                    <li>
                      일 평균 판매량이 <span className="font-medium">55개</span>로 증가할 것으로 예상됩니다.
                    </li>
                    <li>여름 성수기 효과가 최고조에 달하며 판매량이 크게 증가할 것으로 예상됩니다.</li>
                    <li>경쟁사의 신규 마케팅 캠페인과 프로모션이 예정되어 있습니다.</li>
                    <li>
                      평균 판매가가 <span className="font-medium">₩36,000</span>으로 상승할 것으로 예상됩니다.
                    </li>
                    <li>
                      시장 점유율이 약 <span className="font-medium">2.5%</span> 증가할 것으로 예측됩니다.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
