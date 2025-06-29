"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Plus,
  Eye,
  Star,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Filter,
  Loader2,
} from "lucide-react"

// 상품 데이터 타입
type ProductData = {
  id: string
  keyword: string
  type: "브랜드" | "언브랜드"
  brand: "있음" | "없음"
  trend: "up" | "down" | "stable"
  searchVolume30: number
  totalSearchVolume: number
  competitionLevel: number
  sellerCount: number
  months: number
  yearTrend: number[]
  conversionRate: number
  clickRate: number
  salesRate: number
  profitMargin: number
}

export function SourcingTool() {
  const [primaryCategory, setPrimaryCategory] = useState("")
  const [brandType, setBrandType] = useState("전체")
  const [searchType, setSearchType] = useState("전체")
  const [selectedMonths, setSelectedMonths] = useState<number[]>([])
  const [marketSize, setMarketSize] = useState([50])
  const [competitionLevel, setCompetitionLevel] = useState([45])
  const [salesChannels, setSalesChannels] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<ProductData[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  // 샘플 데이터
  const sampleResults: ProductData[] = [
    {
      id: "1",
      keyword: "농축액",
      type: "언브랜드",
      brand: "없음",
      trend: "down",
      searchVolume30: 130,
      totalSearchVolume: 169,
      competitionLevel: 8.3,
      sellerCount: 6,
      months: 2,
      yearTrend: [6, 8, 7, 9, 8, 6, 7, 8, 9, 7, 6, 8],
      conversionRate: 14,
      clickRate: 3,
      salesRate: 0,
      profitMargin: 0,
    },
    {
      id: "2",
      keyword: "토마토즙",
      type: "브랜드",
      brand: "있음",
      trend: "up",
      searchVolume30: 110,
      totalSearchVolume: 2779,
      competitionLevel: 83.18,
      sellerCount: 7,
      months: 6,
      yearTrend: [7, 9, 8, 10, 9, 7, 8, 9, 10, 8, 7, 9],
      conversionRate: 54,
      clickRate: 6,
      salesRate: 0,
      profitMargin: 56,
    },
    {
      id: "3",
      keyword: "홍삼진시",
      type: "언브랜드",
      brand: "없음",
      trend: "up",
      searchVolume30: 380,
      totalSearchVolume: 2801,
      competitionLevel: 407.47,
      sellerCount: 7,
      months: 6,
      yearTrend: [7, 8, 9, 10, 9, 8, 7, 8, 9, 10, 8, 7],
      conversionRate: 78,
      clickRate: 17,
      salesRate: 0,
      profitMargin: 61,
    },
    {
      id: "4",
      keyword: "잠다임즙",
      type: "브랜드",
      brand: "있음",
      trend: "up",
      searchVolume30: 300,
      totalSearchVolume: 9370,
      competitionLevel: 46.86,
      sellerCount: 6,
      months: 5,
      yearTrend: [6, 7, 8, 9, 8, 7, 6, 7, 8, 9, 7, 6],
      conversionRate: 43,
      clickRate: 18,
      salesRate: 0,
      profitMargin: 32,
    },
    {
      id: "5",
      keyword: "콘시 농축즙",
      type: "언브랜드",
      brand: "없음",
      trend: "up",
      searchVolume30: 170,
      totalSearchVolume: 1127,
      competitionLevel: 44.29,
      sellerCount: 7,
      months: 8,
      yearTrend: [7, 8, 9, 8, 7, 8, 9, 10, 8, 7, 8, 9],
      conversionRate: 72,
      clickRate: 39,
      salesRate: 0,
      profitMargin: 33,
    },
  ]

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      setSearchResults(sampleResults)
      setIsSearching(false)
    }, 1500)
  }

  const handleMonthSelect = (month: number) => {
    setSelectedMonths((prev) => (prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]))
  }

  const handleChannelSelect = (channel: string) => {
    setSalesChannels((prev) => (prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]))
  }

  const handleProductSelect = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getBrandIcon = (brand: string) => {
    return brand === "있음" ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-500" />
    )
  }

  const renderMiniChart = (data: number[]) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    return (
      <div className="flex items-end gap-0.5 h-8 w-16">
        {data.map((value, index) => (
          <div
            key={index}
            className="bg-orange-200 rounded-sm flex-1 min-w-[2px]"
            style={{
              height: `${((value - min) / range) * 100}%`,
              minHeight: "2px",
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 소싱</h2>
        <p className="text-muted-foreground">AI를 활용하여 최적의 상품을 찾고 소싱 전략을 수립하세요.</p>
      </div>

      {/* 분류 선택 */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">분류 선택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Select value={primaryCategory} onValueChange={setPrimaryCategory}>
              <SelectTrigger>
                <SelectValue placeholder="1차 분류" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">식품</SelectItem>
                <SelectItem value="health">건강식품</SelectItem>
                <SelectItem value="beauty">뷰티</SelectItem>
                <SelectItem value="home">생활용품</SelectItem>
                <SelectItem value="fashion">패션</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 검색 필터 */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            검색 필터
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* 브랜드 유형 */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm">브랜드 유형</h4>
                <p className="text-xs text-gray-500">브랜드 유형을 선택하세요</p>
              </div>
              <div className="space-y-2">
                {["전체", "브랜드", "언브랜드"].map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brandType"
                      value={type}
                      checked={brandType === type}
                      onChange={(e) => setBrandType(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 검색어 유형 */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm">검색어 유형</h4>
                <p className="text-xs text-gray-500">검색어 유형을 선택하세요</p>
              </div>
              <div className="space-y-2">
                {["전체", "소품사", "잡상사"].map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="searchType"
                      value={type}
                      checked={searchType === type}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 개월수 */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm">개월수</h4>
                <p className="text-xs text-gray-500">기간 범위 설정을 선택하세요</p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <button
                    key={month}
                    onClick={() => handleMonthSelect(month)}
                    className={`p-2 text-xs rounded border transition-colors ${
                      selectedMonths.includes(month)
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {month}월
                  </button>
                ))}
              </div>
            </div>

            {/* 시장 규모 */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm">시장 규모</h4>
                <p className="text-xs text-gray-500">최소 시장규모 최대 100억원 설정하세요</p>
              </div>
              <div className="space-y-2">
                <Slider value={marketSize} onValueChange={setMarketSize} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span className="font-medium">{marketSize[0]}억원</span>
                  <span>100억원</span>
                </div>
              </div>
            </div>

            {/* 경쟁 강도 */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm">경쟁 강도</h4>
                <p className="text-xs text-gray-500">최소 경쟁도 최대 100까지 설정하세요</p>
              </div>
              <div className="space-y-2">
                <Slider
                  value={competitionLevel}
                  onValueChange={setCompetitionLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span className="font-medium">{competitionLevel[0]}</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* 판매 채널 */}
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm">판매 채널</h4>
                <p className="text-xs text-gray-500">판매 500개 설정 선택하세요</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["500개", "1000개", "2000개", "1만개", "2만개", "10만개"].map((channel) => (
                  <button
                    key={channel}
                    onClick={() => handleChannelSelect(channel)}
                    className={`p-2 text-xs rounded border transition-colors ${
                      salesChannels.includes(channel)
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex justify-center gap-3 mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />더 많이 보기
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />초 새로 추가
            </Button>
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  검색중...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  검색하기
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">검색 결과</CardTitle>
                <CardDescription>2023년 6월 기준</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">검색결과: 500개</span>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  검색 결과표 저장
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 필터 탭 */}
              <div className="flex gap-2 border-b">
                <button className="px-4 py-2 text-sm font-medium border-b-2 border-orange-500 text-orange-600">
                  표 상세 저장
                </button>
                <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">표 상세 추가저장</button>
                <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">선택한 키워드 저장</button>
              </div>

              {/* 상품 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3 font-medium">순위</th>
                      <th className="text-left p-3 font-medium">키워드</th>
                      <th className="text-left p-3 font-medium">유형</th>
                      <th className="text-left p-3 font-medium">브랜드</th>
                      <th className="text-left p-3 font-medium">트렌드</th>
                      <th className="text-left p-3 font-medium">최근 30일 검색량</th>
                      <th className="text-left p-3 font-medium">직접 총 검색량</th>
                      <th className="text-left p-3 font-medium">경쟁강도</th>
                      <th className="text-left p-3 font-medium">불사자수</th>
                      <th className="text-left p-3 font-medium">개월수</th>
                      <th className="text-left p-3 font-medium">1년 평균 트렌드</th>
                      <th className="text-left p-3 font-medium">1p 기준 변화</th>
                      <th className="text-left p-3 font-medium">로그 + 관련자료 비율</th>
                      <th className="text-left p-3 font-medium">로그 상품 비율</th>
                      <th className="text-left p-3 font-medium">관련자료 비율</th>
                      <th className="text-left p-3 font-medium">더보기</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((product, index) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => handleProductSelect(product.id)}
                            />
                            <span>{index + 1}</span>
                          </div>
                        </td>
                        <td className="p-3 font-medium text-blue-600">{product.keyword}</td>
                        <td className="p-3">
                          <Badge variant={product.type === "브랜드" ? "default" : "secondary"}>{product.type}</Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            {getBrandIcon(product.brand)}
                            <span className="text-xs">{product.brand}</span>
                          </div>
                        </td>
                        <td className="p-3">{getTrendIcon(product.trend)}</td>
                        <td className="p-3">{product.searchVolume30.toLocaleString()}</td>
                        <td className="p-3 text-green-600 font-medium">{product.totalSearchVolume.toLocaleString()}</td>
                        <td className="p-3">{product.competitionLevel}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-orange-400 fill-current" />
                            <span>{product.sellerCount}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{product.months}개월</Badge>
                        </td>
                        <td className="p-3">{renderMiniChart(product.yearTrend)}</td>
                        <td className="p-3">
                          <div className="w-16 bg-gray-100 rounded p-1">
                            <div
                              className="bg-orange-400 h-4 rounded text-xs text-white flex items-center justify-center"
                              style={{ width: `${product.conversionRate}%` }}
                            >
                              {product.conversionRate}%
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="w-16 bg-gray-100 rounded p-1">
                            <div
                              className="bg-blue-400 h-4 rounded text-xs text-white flex items-center justify-center"
                              style={{ width: `${product.clickRate}%` }}
                            >
                              {product.clickRate}%
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="w-16 bg-gray-100 rounded p-1">
                            <div
                              className="bg-green-400 h-4 rounded text-xs text-white flex items-center justify-center"
                              style={{ width: `${product.salesRate || 5}%` }}
                            >
                              {product.salesRate}%
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="w-16 bg-gray-100 rounded p-1">
                            <div
                              className="bg-purple-400 h-4 rounded text-xs text-white flex items-center justify-center"
                              style={{ width: `${product.profitMargin}%` }}
                            >
                              {product.profitMargin}%
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Button size="sm" variant="ghost">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 하단 정보 */}
              <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
                <div className="flex items-center gap-4">
                  <span>※ 해당 스크랩이 완료되었습니다</span>
                  <span>※ 검색어 키워드로 분석되었습니다</span>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  검색 결과표 저장
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
