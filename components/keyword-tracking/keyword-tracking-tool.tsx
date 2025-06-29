"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowDown, ArrowUp, Minus, RefreshCw, Search } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// 샘플 데이터 - 실제 구현에서는 API 호출로 대체
const sampleKeywordData = [
  { keyword: "유기농 쌀", rank: 3, volume: 5200, competition: "높음", change: 2, trending: "up" },
  { keyword: "국내산 쌀", rank: 7, volume: 4800, competition: "중간", change: -1, trending: "down" },
  { keyword: "친환경 쌀", rank: 12, volume: 3600, competition: "중간", change: 0, trending: "stable" },
  { keyword: "백미 10kg", rank: 5, volume: 7200, competition: "높음", change: 3, trending: "up" },
  { keyword: "신동진 쌀", rank: 18, volume: 2900, competition: "낮음", change: -2, trending: "down" },
  { keyword: "쌀 선물세트", rank: 9, volume: 3100, competition: "중간", change: 1, trending: "up" },
  { keyword: "햅쌀", rank: 2, volume: 8500, competition: "매우 높음", change: 0, trending: "stable" },
  { keyword: "현미", rank: 15, volume: 4200, competition: "중간", change: -3, trending: "down" },
]

// 샘플 트렌드 데이터
const trendData = [
  { date: "1월", "유기농 쌀": 8, "국내산 쌀": 12, "친환경 쌀": 15 },
  { date: "2월", "유기농 쌀": 7, "국내산 쌀": 10, "친환경 쌀": 13 },
  { date: "3월", "유기농 쌀": 5, "국내산 쌀": 8, "친환경 쌀": 14 },
  { date: "4월", "유기농 쌀": 6, "국내산 쌀": 9, "친환경 쌀": 11 },
  { date: "5월", "유기농 쌀": 4, "국내산 쌀": 7, "친환경 쌀": 12 },
  { date: "6월", "유기농 쌀": 3, "국내산 쌀": 8, "친환경 쌀": 10 },
]

export function KeywordTrackingTool() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [productInfo, setProductInfo] = useState({
    title: "유기농 햅쌀 10kg 친환경 인증 국내산 백미",
    category: "식품 > 쌀/잡곡 > 백미",
    price: "35,900원",
    rating: 4.8,
    reviewCount: 1243,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)

    // 실제 구현에서는 API 호출을 통해 데이터를 가져옵니다
    setTimeout(() => {
      setIsLoading(false)
      setHasResults(true)
    }, 1500)
  }

  const renderTrendingIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>쿠팡 상품 키워드 순위 추적</CardTitle>
          <CardDescription>쿠팡 상품 URL을 입력하여 해당 상품의 키워드 순위를 분석하고 추적하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="쿠팡 상품 URL을 입력하세요 (예: https://www.coupang.com/vp/products/...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  분석 중...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  분석하기
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setUrl("https://www.coupang.com/vp/products/7234567890")}
              className="ml-2"
            >
              테스트
            </Button>
          </form>

          {!hasResults && !isLoading && (
            <div className="mt-8 text-center p-8">
              <Search className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">상품 URL을 입력하여 키워드 순위를 확인하세요</h3>
              <p className="text-gray-500 mt-2">
                쿠팡 상품 페이지의 URL을 입력하면 해당 상품의 키워드 순위와 트렌드를 분석해 드립니다.
              </p>
            </div>
          )}

          {hasResults && (
            <div className="mt-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">분석 상품 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">상품명</p>
                    <p className="font-medium">{productInfo.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">카테고리</p>
                    <p>{productInfo.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">가격</p>
                    <p>{productInfo.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">평점 / 리뷰</p>
                    <p>
                      ★ {productInfo.rating} ({productInfo.reviewCount}개)
                    </p>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>키워드 순위 분석 완료</AlertTitle>
                <AlertDescription>
                  총 8개의 관련 키워드가 발견되었습니다. 상위 3개 키워드에 집중하는 것이 좋습니다.
                </AlertDescription>
              </Alert>

              <Tabs defaultValue="keywords">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="keywords">키워드 순위</TabsTrigger>
                  <TabsTrigger value="trends">순위 트렌드</TabsTrigger>
                </TabsList>
                <TabsContent value="keywords" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>키워드</TableHead>
                        <TableHead className="text-right">순위</TableHead>
                        <TableHead className="text-right">검색량</TableHead>
                        <TableHead>경쟁강도</TableHead>
                        <TableHead className="text-right">변동</TableHead>
                        <TableHead>추세</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleKeywordData.map((item) => (
                        <TableRow key={item.keyword}>
                          <TableCell className="font-medium">{item.keyword}</TableCell>
                          <TableCell className="text-right">{item.rank}</TableCell>
                          <TableCell className="text-right">{item.volume.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                item.competition === "높음" || item.competition === "매우 높음"
                                  ? "border-red-200 bg-red-50 text-red-700"
                                  : item.competition === "중간"
                                    ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                                    : "border-green-200 bg-green-50 text-green-700"
                              }
                            >
                              {item.competition}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                item.change > 0 ? "text-green-600" : item.change < 0 ? "text-red-600" : "text-gray-600"
                              }
                            >
                              {item.change > 0 ? "+" : ""}
                              {item.change}
                            </span>
                          </TableCell>
                          <TableCell>{renderTrendingIcon(item.trending)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="trends">
                  <div className="h-[400px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 20]} label={{ value: "순위", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="유기농 쌀"
                          stroke="#10b981"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                        <Line type="monotone" dataKey="국내산 쌀" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="친환경 쌀" stroke="#8b5cf6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      * 그래프의 낮은 값이 더 높은 순위를 의미합니다 (1위가 가장 좋음)
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                <h3 className="font-medium text-teal-800 mb-2">AI 추천 최적화 방안</h3>
                <ul className="list-disc pl-5 space-y-1 text-teal-700">
                  <li>상위 3개 키워드("햅쌀", "유기농 쌀", "백미 10kg")를 상품명과 상세설명에 강조하세요.</li>
                  <li>"유기농 쌀" 키워드의 순위가 상승 중이므로 이 키워드에 집중하는 것이 효과적입니다.</li>
                  <li>"현미" 키워드의 순위가 하락 중이므로 이 키워드 대신 다른 키워드를 활용하세요.</li>
                  <li>경쟁이 낮은 "신동진 쌀" 키워드를 활용하여 틈새시장을 공략해보세요.</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
