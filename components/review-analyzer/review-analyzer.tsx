"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Download,
  Copy,
  Sparkles,
  Globe,
  Target,
} from "lucide-react"
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// 리뷰 타입 정의
type Review = {
  id: string
  text: string
  rating: number
  date: string
  sentiment: "positive" | "negative" | "neutral"
  helpful: number
}

// 분석 결과 타입
type AnalysisResult = {
  productName: string
  totalReviews: number
  averageRating: number
  positiveReviews: Review[]
  negativeReviews: Review[]
  neutralReviews: Review[]
  keywordAnalysis: {
    positive: string[]
    negative: string[]
  }
  copywritingSuggestions: {
    strengths: string[]
    improvements: string[]
    differentiators: string[]
  }
  competitorInsights: {
    advantages: string[]
    weaknesses: string[]
  }
}

export function ReviewAnalyzer() {
  const [coupangUrl, setCoupangUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  // 쿠팡 리뷰 분석 함수
  const analyzeCoupangReviews = async () => {
    if (!coupangUrl.trim()) return

    setIsLoading(true)

    // 실제로는 백엔드 API 호출이 필요하지만, 여기서는 시뮬레이션
    setTimeout(() => {
      // 샘플 분석 결과 생성
      const sampleResult: AnalysisResult = {
        productName: "무선 블루투스 이어폰 Pro",
        totalReviews: 1247,
        averageRating: 4.3,
        positiveReviews: [
          {
            id: "1",
            text: "음질이 정말 좋아요! 노이즈 캔슬링도 훌륭하고 배터리도 오래 갑니다.",
            rating: 5,
            date: "2024-01-15",
            sentiment: "positive",
            helpful: 23,
          },
          {
            id: "2",
            text: "가격 대비 성능이 뛰어나네요. 애플 에어팟보다 훨씬 저렴한데 품질은 비슷해요.",
            rating: 5,
            date: "2024-01-14",
            sentiment: "positive",
            helpful: 18,
          },
          {
            id: "3",
            text: "디자인이 세련되고 착용감도 편안합니다. 운동할 때도 잘 빠지지 않아요.",
            rating: 4,
            date: "2024-01-13",
            sentiment: "positive",
            helpful: 15,
          },
        ],
        negativeReviews: [
          {
            id: "4",
            text: "배송이 너무 늦었어요. 일주일이나 걸렸습니다.",
            rating: 2,
            date: "2024-01-12",
            sentiment: "negative",
            helpful: 8,
          },
          {
            id: "5",
            text: "케이스가 생각보다 크고 무거워요. 휴대성이 떨어집니다.",
            rating: 2,
            date: "2024-01-11",
            sentiment: "negative",
            helpful: 12,
          },
        ],
        neutralReviews: [
          {
            id: "6",
            text: "평범한 제품이에요. 특별히 나쁘지도 좋지도 않습니다.",
            rating: 3,
            date: "2024-01-10",
            sentiment: "neutral",
            helpful: 5,
          },
        ],
        keywordAnalysis: {
          positive: ["음질", "가성비", "배터리", "노이즈캔슬링", "디자인", "착용감"],
          negative: ["배송", "케이스", "무게", "크기"],
        },
        copywritingSuggestions: {
          strengths: [
            "🎵 프리미엄 음질과 뛰어난 노이즈 캔슬링으로 몰입감 극대화",
            "💰 애플 에어팟 대비 50% 저렴한 가격으로 동급 성능 제공",
            "🔋 하루 종일 사용 가능한 장시간 배터리 지속력",
            "👂 편안한 착용감으로 운동 중에도 안정적인 착용",
          ],
          improvements: [
            "⚡ 빠른 배송 서비스로 고객 만족도 향상 필요",
            "📦 더 컴팩트하고 가벼운 케이스 디자인 개선 고려",
            "🎯 휴대성을 강조한 마케팅 포인트 재검토 필요",
          ],
          differentiators: [
            "🏆 동급 최고 가성비 무선 이어폰",
            "🎨 세련된 디자인과 프리미엄 마감",
            "🏃‍♂️ 운동 특화 안정적 착용감",
            "🔊 스튜디오급 음질 경험",
          ],
        },
        competitorInsights: {
          advantages: ["경쟁사 대비 30% 저렴한 가격대", "더 나은 배터리 지속시간", "우수한 노이즈 캔슬링 성능"],
          weaknesses: ["케이스 크기가 경쟁사보다 큼", "배송 속도 개선 필요", "브랜드 인지도 부족"],
        },
      }

      setAnalysisResult(sampleResult)
      setIsLoading(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // 실제로는 토스트 알림을 표시해야 함
  }

  const SENTIMENT_COLORS = {
    positive: "#4ade80",
    neutral: "#93c5fd",
    negative: "#f87171",
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 리뷰 분석기</h2>
        <p className="text-muted-foreground">쿠팡 상품 URL을 입력하면 리뷰를 분석하고 마케팅 카피를 제안합니다.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            쿠팡 상품 URL 분석
          </CardTitle>
          <CardDescription>
            분석하고 싶은 쿠팡 상품의 URL을 입력하세요. AI가 자동으로 리뷰를 수집하고 분석합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="https://www.coupang.com/vp/products/..."
                value={coupangUrl}
                onChange={(e) => setCoupangUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={analyzeCoupangReviews}
                disabled={isLoading || !coupangUrl.trim()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    분석 중...
                  </>
                ) : (
                  <>
                    <BarChart3 className="h-4 w-4" />
                    리뷰 분석하기
                  </>
                )}
              </Button>
            </div>

            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
                  <span className="font-medium text-blue-800">리뷰 데이터 수집 및 분석 중...</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-sm text-blue-600 mt-2">
                  상품 정보 확인 → 리뷰 수집 → AI 감성 분석 → 카피라이팅 생성
                </p>
              </div>
            )}

            <div className="bg-gray-50 border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">샘플 URL로 테스트</h3>
              <p className="text-xs text-gray-600 mb-2">실제 쿠팡 URL이 없다면 샘플로 테스트해보세요.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCoupangUrl("https://www.coupang.com/vp/products/sample-bluetooth-earphones")
                }}
              >
                샘플 URL 사용하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {analysisResult && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">분석 개요</TabsTrigger>
            <TabsTrigger value="reviews">리뷰 분석</TabsTrigger>
            <TabsTrigger value="copywriting">AI 카피라이팅</TabsTrigger>
            <TabsTrigger value="insights">경쟁 분석</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  {analysisResult.productName}
                </CardTitle>
                <CardDescription>총 {analysisResult.totalReviews.toLocaleString()}개 리뷰 분석 결과</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3 mb-6">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                    <div className="text-sm text-amber-700 mb-1">평균 평점</div>
                    <div className="text-3xl font-bold text-amber-600 flex items-center">
                      {analysisResult.averageRating}
                      <Star className="h-6 w-6 ml-1 fill-current" />
                    </div>
                    <div className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= Math.round(analysisResult.averageRating) ? "text-amber-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="text-sm text-green-700 mb-1">긍정 리뷰</div>
                    <div className="text-3xl font-bold text-green-600 flex items-center">
                      {analysisResult.positiveReviews.length}
                      <ThumbsUp className="h-6 w-6 ml-1" />
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      {((analysisResult.positiveReviews.length / analysisResult.totalReviews) * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-4 border border-red-200">
                    <div className="text-sm text-red-700 mb-1">부정 리뷰</div>
                    <div className="text-3xl font-bold text-red-600 flex items-center">
                      {analysisResult.negativeReviews.length}
                      <ThumbsDown className="h-6 w-6 ml-1" />
                    </div>
                    <div className="text-sm text-red-600 mt-1">
                      {((analysisResult.negativeReviews.length / analysisResult.totalReviews) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">감성 분포</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "긍정", value: analysisResult.positiveReviews.length },
                              { name: "중립", value: analysisResult.neutralReviews.length },
                              { name: "부정", value: analysisResult.negativeReviews.length },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill={SENTIMENT_COLORS.positive} />
                            <Cell fill={SENTIMENT_COLORS.neutral} />
                            <Cell fill={SENTIMENT_COLORS.negative} />
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">키워드 분석</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-700 mb-2">긍정 키워드</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.keywordAnalysis.positive.map((keyword, index) => (
                            <Badge key={index} className="bg-green-100 text-green-800 border-green-200">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-red-700 mb-2">부정 키워드</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.keywordAnalysis.negative.map((keyword, index) => (
                            <Badge key={index} className="bg-red-100 text-red-800 border-red-200">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <ThumbsUp className="h-5 w-5" />
                    긍정 리뷰 ({analysisResult.positiveReviews.length}개)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {analysisResult.positiveReviews.map((review) => (
                      <div key={review.id} className="border border-green-200 bg-green-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= review.rating ? "text-amber-500 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">👍 {review.helpful}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{review.text}</p>
                        <div className="text-xs text-gray-500 mt-2">{review.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <ThumbsDown className="h-5 w-5" />
                    부정 리뷰 ({analysisResult.negativeReviews.length}개)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {analysisResult.negativeReviews.map((review) => (
                      <div key={review.id} className="border border-red-200 bg-red-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= review.rating ? "text-amber-500 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">👍 {review.helpful}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{review.text}</p>
                        <div className="text-xs text-gray-500 mt-2">{review.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="copywriting" className="space-y-4">
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  AI 추천 카피라이팅
                </CardTitle>
                <CardDescription>리뷰 분석 결과를 바탕으로 생성된 마케팅 카피입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      강점 어필 카피
                    </h3>
                    <div className="space-y-3">
                      {analysisResult.copywritingSuggestions.strengths.map((copy, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3">
                          <div className="flex-1">
                            <p className="text-gray-800">{copy}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(copy)}
                            className="flex items-center gap-1"
                          >
                            <Copy className="h-3 w-3" />
                            복사
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      차별화 포인트 카피
                    </h3>
                    <div className="space-y-3">
                      {analysisResult.copywritingSuggestions.differentiators.map((copy, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3">
                          <div className="flex-1">
                            <p className="text-gray-800">{copy}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(copy)}
                            className="flex items-center gap-1"
                          >
                            <Copy className="h-3 w-3" />
                            복사
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h3 className="font-medium text-amber-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      개선 포인트 카피
                    </h3>
                    <div className="space-y-3">
                      {analysisResult.copywritingSuggestions.improvements.map((copy, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3">
                          <div className="flex-1">
                            <p className="text-gray-800">{copy}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(copy)}
                            className="flex items-center gap-1"
                          >
                            <Copy className="h-3 w-3" />
                            복사
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <TrendingUp className="h-5 w-5" />
                    경쟁 우위
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.competitorInsights.advantages.map((advantage, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{advantage}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="h-5 w-5" />
                    개선 필요 사항
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.competitorInsights.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{weakness}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>종합 분석 리포트</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    분석 리포트 다운로드
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
