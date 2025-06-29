"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Loader2,
  Search,
  TrendingUp,
  ShoppingCart,
  CheckCircle,
  Brain,
  BarChart3,
  Zap,
  Target,
  ExternalLink,
  Star,
  Package,
  Truck,
} from "lucide-react"

interface AnalysisResult {
  coupang: {
    products: Array<{
      title: string
      price: string
      originalPrice?: string
      discount?: string
      rating?: string
      reviewCount?: string
      options?: Array<{ name: string; price: string }>
      seller?: string
      delivery?: string
      url: string
      imageUrl?: string
    }>
    summary: {
      averagePrice: number
      priceRange: { min: number; max: number }
      commonOptions: string[]
      marketInsights: string
    }
  }
  naver: {
    products: Array<{
      title: string
      price: string
      originalPrice?: string
      discount?: string
      rating?: string
      reviewCount?: string
      options?: Array<{ name: string; price: string }>
      seller?: string
      delivery?: string
      url: string
      imageUrl?: string
    }>
    summary: {
      averagePrice: number
      priceRange: { min: number; max: number }
      commonOptions: string[]
      marketInsights: string
    }
  }
  recommendation: {
    recommendedPrices: Array<{
      option: string
      recommendedPrice: number
      reasoning: string
      competitiveAdvantage: string
      profitMargin: string
    }>
    marketStrategy: string
    pricingTips: string[]
  }
}

type AnalysisStep = "idle" | "coupang" | "naver" | "analyzing" | "recommending" | "complete"

// 모의 데이터 생성 함수
const generateMockData = (productName: string): AnalysisResult => {
  return {
    coupang: {
      products: [
        {
          title: `${productName} 프리미엄 5kg`,
          price: "25,000원",
          originalPrice: "30,000원",
          discount: "17%",
          rating: "4.5",
          reviewCount: "1,234",
          options: [
            { name: "3kg", price: "18,000원" },
            { name: "5kg", price: "25,000원" },
            { name: "10kg", price: "45,000원" },
          ],
          seller: "쿠팡",
          delivery: "무료배송",
          url: "https://coupang.com/product/1",
        },
        {
          title: `국산 ${productName} 특품 3kg`,
          price: "18,500원",
          originalPrice: "22,000원",
          discount: "16%",
          rating: "4.3",
          reviewCount: "856",
          options: [
            { name: "3kg", price: "18,500원" },
            { name: "5kg", price: "28,000원" },
          ],
          seller: "쿠팡",
          delivery: "무료배송",
          url: "https://coupang.com/product/2",
        },
        {
          title: `${productName} 가정용 2kg`,
          price: "12,900원",
          rating: "4.1",
          reviewCount: "432",
          options: [
            { name: "2kg", price: "12,900원" },
            { name: "4kg", price: "23,800원" },
          ],
          seller: "쿠팡",
          delivery: "2,500원",
          url: "https://coupang.com/product/3",
        },
      ],
      summary: {
        averagePrice: 18800,
        priceRange: { min: 12900, max: 25000 },
        commonOptions: ["2kg", "3kg", "5kg", "10kg"],
        marketInsights: `쿠팡에서 ${productName} 상품의 평균 가격은 18,800원이며, 프리미엄 상품일수록 높은 평점을 받고 있습니다. 무료배송 상품이 대부분이며, 용량별 옵션이 다양하게 제공되고 있습니다.`,
      },
    },
    naver: {
      products: [
        {
          title: `${productName} 산지직송 5kg`,
          price: "23,000원",
          originalPrice: "28,000원",
          discount: "18%",
          rating: "4.6",
          reviewCount: "987",
          options: [
            { name: "3kg", price: "17,000원" },
            { name: "5kg", price: "23,000원" },
          ],
          seller: "네이버쇼핑",
          delivery: "무료배송",
          url: "https://shopping.naver.com/product/1",
        },
        {
          title: `신선한 ${productName} 3kg`,
          price: "16,800원",
          rating: "4.4",
          reviewCount: "654",
          options: [
            { name: "3kg", price: "16,800원" },
            { name: "6kg", price: "31,000원" },
          ],
          seller: "네이버쇼핑",
          delivery: "3,000원",
          url: "https://shopping.naver.com/product/2",
        },
        {
          title: `${productName} 대용량 10kg`,
          price: "42,000원",
          originalPrice: "48,000원",
          discount: "13%",
          rating: "4.2",
          reviewCount: "321",
          seller: "네이버쇼핑",
          delivery: "무료배송",
          url: "https://shopping.naver.com/product/3",
        },
      ],
      summary: {
        averagePrice: 27267,
        priceRange: { min: 16800, max: 42000 },
        commonOptions: ["3kg", "5kg", "6kg", "10kg"],
        marketInsights: `네이버쇼핑에서 ${productName} 상품의 평균 가격은 27,267원으로 쿠팡보다 다소 높은 편입니다. 산지직송 상품이 많으며, 대용량 상품의 비중이 높습니다.`,
      },
    },
    recommendation: {
      recommendedPrices: [
        {
          option: "3kg",
          recommendedPrice: 17500,
          reasoning: "경쟁사 평균 가격(17,400원)보다 약간 높게 설정하여 품질 프리미엄을 반영했습니다.",
          competitiveAdvantage: "무료배송과 신선도 보장으로 차별화",
          profitMargin: "약 25%",
        },
        {
          option: "5kg",
          recommendedPrice: 24000,
          reasoning: "가장 인기 있는 용량으로 경쟁력 있는 가격 설정이 중요합니다.",
          competitiveAdvantage: "대용량 할인 혜택으로 고객 만족도 향상",
          profitMargin: "약 22%",
        },
        {
          option: "10kg",
          recommendedPrice: 43500,
          reasoning: "대용량 구매 고객을 위한 할인 혜택을 반영한 가격입니다.",
          competitiveAdvantage: "업계 최저가로 대량 구매 고객 확보",
          profitMargin: "약 20%",
        },
      ],
      marketStrategy: `${productName} 시장에서 성공하기 위해서는 신선도와 품질을 강조하는 마케팅이 중요합니다. 산지직송, 당일배송 등의 서비스로 차별화하고, 용량별 할인 혜택을 통해 고객 충성도를 높이는 전략을 추천합니다.`,
      pricingTips: [
        "계절별 수급 상황을 고려한 동적 가격 조정",
        "경쟁사 대비 5-10% 할인된 가격으로 시장 진입",
        "대용량 구매 시 단가 할인 혜택 제공",
        "신규 고객 대상 첫 구매 할인 이벤트 진행",
        "정기 구독 서비스로 안정적인 매출 확보",
      ],
    },
  }
}

export function EnhancedPricingTool() {
  const [productName, setProductName] = useState("")
  const [currentStep, setCurrentStep] = useState<AnalysisStep>("idle")
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<AnalysisResult | null>(null)

  const steps = [
    { key: "coupang", label: "쿠팡 실시간 크롤링", icon: ShoppingCart, color: "text-orange-500" },
    { key: "naver", label: "네이버 실시간 크롤링", icon: ShoppingCart, color: "text-green-500" },
    { key: "analyzing", label: "AI 빅데이터 분석", icon: Brain, color: "text-blue-500" },
    { key: "recommending", label: "최적 가격 계산", icon: Target, color: "text-purple-500" },
  ]

  const handleAnalysis = async () => {
    if (!productName.trim()) {
      alert("상품명을 입력해주세요.")
      return
    }

    setCurrentStep("coupang")
    setProgress(0)
    setResults(null)

    // 진행률 애니메이션
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + 2
      })
    }, 100)

    // 단계별 애니메이션
    setTimeout(() => setCurrentStep("naver"), 2000)
    setTimeout(() => setCurrentStep("analyzing"), 4000)
    setTimeout(() => setCurrentStep("recommending"), 5500)

    // 모의 데이터 생성 및 결과 설정
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)
      setResults(generateMockData(productName))
      setCurrentStep("complete")
    }, 7000)
  }

  const resetAnalysis = () => {
    setCurrentStep("idle")
    setProgress(0)
    setResults(null)
  }

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          실시간 AI 가격 분석
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          쿠팡·네이버 실시간 크롤링으로 최적 가격을 자동 추천
        </p>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            실시간 데이터
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            AI 분석
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            자동 추천
          </div>
        </div>
      </div>

      {/* 입력 섹션 */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Search className="h-5 w-5" />
            실시간 시장 분석
          </CardTitle>
          <CardDescription>
            상품명을 입력하면 쿠팡과 네이버에서 실시간으로 데이터를 수집하여 최적 가격을 추천합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-base font-medium">
              상품명
            </Label>
            <Input
              id="product-name"
              placeholder="예: 참외, 수박, 사과, 배, 딸기"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="text-lg h-12"
              disabled={currentStep !== "idle"}
            />
          </div>

          <Button
            onClick={currentStep === "idle" ? handleAnalysis : resetAnalysis}
            disabled={currentStep !== "idle" && currentStep !== "complete"}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            {currentStep === "idle" ? (
              <>
                <Zap className="mr-2 h-5 w-5" />
                실시간 분석 시작
              </>
            ) : currentStep === "complete" ? (
              <>
                <Search className="mr-2 h-5 w-5" />
                새로운 분석 시작
              </>
            ) : (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                실시간 크롤링 중...
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* 분석 진행 상황 */}
      {currentStep !== "idle" && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              실시간 크롤링 진행 상황
            </CardTitle>
            <CardDescription>각 쇼핑몰에서 실시간으로 데이터를 수집하고 있습니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>전체 진행률</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const isActive = currentStep === step.key
                const isCompleted = steps.findIndex((s) => s.key === currentStep) > index || currentStep === "complete"
                const Icon = step.icon

                return (
                  <div
                    key={step.key}
                    className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                      isActive
                        ? "border-blue-500 bg-blue-50 scale-105 shadow-lg"
                        : isCompleted
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          isActive
                            ? "bg-blue-500 text-white"
                            : isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {isCompleted && !isActive ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : isActive ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`font-medium ${isActive ? "text-blue-700" : isCompleted ? "text-green-700" : "text-gray-600"}`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isActive ? "진행 중..." : isCompleted ? "완료" : "대기 중"}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 분석 결과 */}
      {results && currentStep === "complete" && (
        <div className="space-y-8 animate-in fade-in duration-1000">
          <Tabs defaultValue="recommendation" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recommendation">AI 가격 추천</TabsTrigger>
              <TabsTrigger value="coupang">쿠팡 분석</TabsTrigger>
              <TabsTrigger value="naver">네이버 분석</TabsTrigger>
              <TabsTrigger value="products">상품 목록</TabsTrigger>
            </TabsList>

            <TabsContent value="recommendation" className="space-y-6">
              {/* AI 가격 추천 */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Target className="h-6 w-6 text-purple-500" />
                    AI 최적 가격 추천
                  </CardTitle>
                  <CardDescription className="text-lg">실시간 시장 분석을 바탕으로 한 최적 가격 제안</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {results.recommendation.recommendedPrices.map((item, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-center mb-4">
                          <h4 className="font-bold text-lg text-gray-800">{item.option}</h4>
                          <div className="mt-2">
                            <p className="text-3xl font-bold text-purple-600">
                              {item.recommendedPrice.toLocaleString()}원
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {item.profitMargin}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="font-medium text-gray-700 mb-1">추천 이유</p>
                            <p className="text-gray-600 leading-relaxed">{item.reasoning}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700 mb-1">경쟁 우위</p>
                            <p className="text-gray-600 leading-relaxed">{item.competitiveAdvantage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 마케팅 전략 및 팁 */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-500" />
                      마케팅 전략
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{results.recommendation.marketStrategy}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      가격 설정 팁
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {results.recommendation.pricingTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="coupang">
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <ShoppingCart className="h-5 w-5" />
                    쿠팡 실시간 분석 결과
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">평균 가격</p>
                      <p className="text-xl font-bold text-orange-600">
                        {results.coupang.summary.averagePrice.toLocaleString()}원
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">가격 범위</p>
                      <p className="text-lg font-semibold text-orange-600">
                        {results.coupang.summary.priceRange.min.toLocaleString()} -{" "}
                        {results.coupang.summary.priceRange.max.toLocaleString()}원
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">공통 옵션</p>
                    <div className="flex flex-wrap gap-2">
                      {results.coupang.summary.commonOptions.map((option, index) => (
                        <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">시장 인사이트</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{results.coupang.summary.marketInsights}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="naver">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <ShoppingCart className="h-5 w-5" />
                    네이버 실시간 분석 결과
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">평균 가격</p>
                      <p className="text-xl font-bold text-green-600">
                        {results.naver.summary.averagePrice.toLocaleString()}원
                      </p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <p className="text-sm text-gray-600">가격 범위</p>
                      <p className="text-lg font-semibold text-green-600">
                        {results.naver.summary.priceRange.min.toLocaleString()} -{" "}
                        {results.naver.summary.priceRange.max.toLocaleString()}원
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">공통 옵션</p>
                    <div className="flex flex-wrap gap-2">
                      {results.naver.summary.commonOptions.map((option, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2">시장 인사이트</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{results.naver.summary.marketInsights}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <Package className="h-5 w-5" />
                      쿠팡 상품 목록
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {results.coupang.products.map((product, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm line-clamp-2">{product.title}</h4>
                            <a
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-600 hover:text-orange-700"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-lg font-bold text-orange-600">{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {product.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs">{product.rating}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Truck className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">{product.delivery}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Package className="h-5 w-5" />
                      네이버 상품 목록
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {results.naver.products.map((product, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm line-clamp-2">{product.title}</h4>
                            <a
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-700"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-lg font-bold text-green-600">{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {product.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs">{product.rating}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Truck className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">{product.delivery}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
