"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, ArrowRight, TrendingUp, AlertCircle } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export function MarginCalculator() {
  const [costPrice, setCostPrice] = useState<number>(10000)
  const [shippingCost, setShippingCost] = useState<number>(3000)
  const [packagingCost, setPackagingCost] = useState<number>(1000)
  const [marketingCost, setMarketingCost] = useState<number>(2000)
  const [marginRate, setMarginRate] = useState<number>(30)
  const [taxRate, setTaxRate] = useState<number>(10)
  const [sellingPrice, setSellingPrice] = useState<number>(0)
  const [profit, setProfit] = useState<number>(0)
  const [profitRate, setProfitRate] = useState<number>(0)
  const [competitorPrice, setCompetitorPrice] = useState<number>(20000)
  const [priceComparison, setPriceComparison] = useState<number>(100)
  const [isMounted, setIsMounted] = useState(false)

  // 판매가 계산 함수
  const calculateSellingPrice = () => {
    const totalCost = costPrice + shippingCost + packagingCost + marketingCost
    const marginAmount = totalCost * (marginRate / 100)
    const priceBeforeTax = totalCost + marginAmount
    const taxAmount = priceBeforeTax * (taxRate / 100)
    const calculatedSellingPrice = priceBeforeTax + taxAmount

    setSellingPrice(Math.round(calculatedSellingPrice))
    setProfit(Math.round(marginAmount))
    setProfitRate(Math.round((marginAmount / calculatedSellingPrice) * 100))
    setPriceComparison(Math.round((calculatedSellingPrice / competitorPrice) * 100))
  }

  // 입력값 변경 시 판매가 재계산
  useEffect(() => {
    calculateSellingPrice()
  }, [costPrice, shippingCost, packagingCost, marketingCost, marginRate, taxRate, competitorPrice])

  // 클라이언트 사이드 렌더링을 위한 마운트 체크
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 비용 구성 데이터
  const costData = [
    { name: "원가", value: costPrice },
    { name: "배송비", value: shippingCost },
    { name: "포장비", value: packagingCost },
    { name: "마케팅비", value: marketingCost },
    { name: "마진", value: profit },
    { name: "세금", value: sellingPrice - (costPrice + shippingCost + packagingCost + marketingCost + profit) },
  ]

  // 가격 비교 데이터
  const comparisonData = [
    { name: "내 상품", price: sellingPrice },
    { name: "경쟁사 A", price: competitorPrice },
    { name: "경쟁사 B", price: competitorPrice * 0.9 },
    { name: "경쟁사 C", price: competitorPrice * 1.1 },
  ]

  // 차트 색상
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  if (!isMounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 마진 계산기</h2>
        <p className="text-muted-foreground">최적의 판매 가격과 마진을 계산하여 수익을 극대화하세요.</p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculator">계산기</TabsTrigger>
          <TabsTrigger value="analysis">분석</TabsTrigger>
          <TabsTrigger value="recommendations">AI 추천</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-12">
            <Card className="md:col-span-5 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle>비용 및 마진 설정</CardTitle>
                <CardDescription>상품의 비용과 원하는 마진율을 입력하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cost-price">원가 (₩)</Label>
                    <Input
                      id="cost-price"
                      type="number"
                      value={costPrice}
                      onChange={(e) => setCostPrice(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping-cost">배송비 (₩)</Label>
                    <Input
                      id="shipping-cost"
                      type="number"
                      value={shippingCost}
                      onChange={(e) => setShippingCost(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="packaging-cost">포장비 (₩)</Label>
                    <Input
                      id="packaging-cost"
                      type="number"
                      value={packagingCost}
                      onChange={(e) => setPackagingCost(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketing-cost">마케팅 비용 (₩)</Label>
                    <Input
                      id="marketing-cost"
                      type="number"
                      value={marketingCost}
                      onChange={(e) => setMarketingCost(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>마진율 (%)</Label>
                      <span className="text-sm font-medium">{marginRate}%</span>
                    </div>
                    <Slider
                      value={[marginRate]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setMarginRate(value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>세금율 (%)</Label>
                      <span className="text-sm font-medium">{taxRate}%</span>
                    </div>
                    <Slider
                      value={[taxRate]}
                      min={0}
                      max={30}
                      step={1}
                      onValueChange={(value) => setTaxRate(value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="competitor-price">경쟁사 가격 (₩)</Label>
                    <Input
                      id="competitor-price"
                      type="number"
                      value={competitorPrice}
                      onChange={(e) => setCompetitorPrice(Number(e.target.value))}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault()
                      calculateSellingPrice()
                    }}
                  >
                    <Calculator className="mr-2 h-4 w-4" /> 계산하기
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="md:col-span-7 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle>계산 결과</CardTitle>
                <CardDescription>입력한 정보를 바탕으로 계산된 판매 가격과 수익입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">추천 판매가</div>
                      <div className="text-3xl font-bold text-teal-600">₩{sellingPrice.toLocaleString()}</div>
                      <div className="flex items-center mt-2 text-sm">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            priceComparison <= 100 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          경쟁사 대비 {priceComparison}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">예상 수익</div>
                      <div className="text-3xl font-bold text-blue-600">₩{profit.toLocaleString()}</div>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          수익률 {profitRate}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">총 비용</div>
                      <div className="text-2xl font-bold">
                        ₩{(costPrice + shippingCost + packagingCost + marketingCost).toLocaleString()}
                      </div>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="text-xs text-gray-500">원가 + 배송비 + 포장비 + 마케팅비</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-80">
                    <p className="text-sm font-medium mb-2 text-center">비용 구성</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {costData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₩${Number(value).toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>가격 분석</CardTitle>
              <CardDescription>경쟁사와의 가격 비교 및 마진 분석입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">경쟁사 가격 비교</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `₩${value / 1000}k`} />
                        <Tooltip formatter={(value) => `₩${Number(value).toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="price" fill="#0ea5e9" name="판매가" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-4">마진 분석</h3>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">손익분기점</span>
                      <span className="font-bold">
                        ₩{(costPrice + shippingCost + packagingCost + marketingCost).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">이 가격 이상으로 판매해야 손해를 보지 않습니다.</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">최적 마진율</span>
                      <span
                        className={`font-bold ${marginRate < 20 ? "text-red-500" : marginRate > 40 ? "text-yellow-500" : "text-green-500"}`}
                      >
                        {marginRate}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {marginRate < 20
                        ? "마진율이 낮습니다. 수익성 개선을 위해 마진율을 높이는 것을 고려하세요."
                        : marginRate > 40
                          ? "마진율이 높습니다. 경쟁력을 위해 가격 인하를 고려해보세요."
                          : "적정 수준의 마진율입니다."}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">경쟁사 대비 가격</span>
                      <span
                        className={`font-bold ${priceComparison < 90 ? "text-green-500" : priceComparison > 110 ? "text-red-500" : "text-yellow-500"}`}
                      >
                        {priceComparison}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {priceComparison < 90
                        ? "경쟁사보다 가격이 낮습니다. 마진을 높일 여지가 있습니다."
                        : priceComparison > 110
                          ? "경쟁사보다 가격이 높습니다. 판매량에 영향을 줄 수 있습니다."
                          : "경쟁사와 비슷한 수준의 가격입니다."}
                    </p>
                  </div>

                  <div
                    className={`border rounded-lg p-4 ${profitRate < 15 ? "bg-red-50 border-red-200" : profitRate > 30 ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}
                  >
                    <div className="flex items-start gap-2">
                      {profitRate < 15 ? (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      ) : profitRate > 30 ? (
                        <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium">수익성 분석</h4>
                        <p className="text-sm mt-1">
                          {profitRate < 15
                            ? "수익률이 낮습니다. 비용 절감이나 가격 인상을 고려하세요."
                            : profitRate > 30
                              ? "수익률이 좋습니다. 현재 가격 정책을 유지하세요."
                              : "수익률이 적정 수준입니다. 경쟁사 가격을 모니터링하세요."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>AI 가격 추천</CardTitle>
              <CardDescription>AI가 분석한 최적의 가격 전략입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-teal-800 mb-2 flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    AI 추천 판매가
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-teal-700">
                      ₩{Math.round(sellingPrice * 0.95).toLocaleString()}
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                    <div className="text-3xl font-bold text-teal-700">
                      ₩{Math.round(sellingPrice * 1.05).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-sm text-teal-700 mb-3">
                    현재 시장 상황과 경쟁사 가격을 분석한 결과, 위 범위 내의 가격이 최적입니다. 이 가격대는 경쟁력을
                    유지하면서 적정 수익을 확보할 수 있습니다.
                  </p>
                  <Button className="bg-teal-600 hover:bg-teal-700">이 가격으로 설정</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">가격 인하 전략</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        판매량 증가를 위해 가격을 5% 인하하는 전략입니다. 이 경우 판매량이 15% 증가할 것으로 예상됩니다.
                      </p>
                      <div className="font-medium">추천 가격: ₩{Math.round(sellingPrice * 0.95).toLocaleString()}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        예상 수익: ₩{Math.round(profit * 0.95 * 1.15).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">현상 유지 전략</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        현재 가격을 유지하는 전략입니다. 안정적인 판매량과 수익을 기대할 수 있습니다.
                      </p>
                      <div className="font-medium">추천 가격: ₩{sellingPrice.toLocaleString()}</div>
                      <div className="text-sm text-gray-500 mt-1">예상 수익: ₩{profit.toLocaleString()}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">프리미엄 전략</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        품질과 가치를 강조하며 가격을 5% 인상하는 전략입니다. 판매량은 10% 감소할 수 있으나 수익성이
                        향상됩니다.
                      </p>
                      <div className="font-medium">추천 가격: ₩{Math.round(sellingPrice * 1.05).toLocaleString()}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        예상 수익: ₩{Math.round(profit * 1.05 * 0.9).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">AI 분석 인사이트</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <p className="text-sm text-gray-700">
                        현재 설정된 마진율 {marginRate}%는{" "}
                        {marginRate < 25
                          ? "업계 평균보다 낮습니다."
                          : marginRate > 35
                            ? "업계 평균보다 높습니다."
                            : "업계 평균과 비슷한 수준입니다."}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <p className="text-sm text-gray-700">
                        배송비와 포장비가 총 비용의{" "}
                        {Math.round(
                          ((shippingCost + packagingCost) /
                            (costPrice + shippingCost + packagingCost + marketingCost)) *
                            100,
                        )}
                        %를 차지합니다.
                        {shippingCost + packagingCost > costPrice * 0.3
                          ? " 이 비용을 줄이면 수익성이 크게 향상될 수 있습니다."
                          : ""}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <p className="text-sm text-gray-700">
                        경쟁사 대비 가격이 {priceComparison < 95 ? "낮아" : priceComparison > 105 ? "높아" : "비슷해"}
                        {priceComparison < 95
                          ? " 품질을 강조하는 마케팅으로 가격 인상 여지가 있습니다."
                          : priceComparison > 105
                            ? " 차별화된 가치를 제공하지 않으면 판매에 어려움이 있을 수 있습니다."
                            : " 부가 서비스나 품질로 경쟁우위를 확보하는 것이 중요합니다."}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
