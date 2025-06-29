"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Copy, ThumbsUp } from "lucide-react"

// 리뷰 타입 정의
interface Review {
  id: string
  title: string
  content: string
}

// 샘플 리뷰 데이터 (실제로는 AI가 생성)
const sampleReviews = {
  딸기: [
    {
      id: "1",
      title: "달콤한 봄의 맛",
      content:
        "정말 신선하고 달콤한 딸기였습니다. 크기도 균일하고 상태도 좋아서 가족 모두 만족했어요. 특히 아이들이 너무 좋아해서 다음에도 꼭 구매하려고 합니다.",
    },
    {
      id: "2",
      title: "향이 진한 프리미엄 딸기",
      content:
        "일반 마트에서 사는 딸기와는 확실히 달랐어요. 향이 진하고 당도가 높아서 그냥 먹어도 정말 맛있었습니다. 배송도 빠르고 포장도 꼼꼼해서 멍든 딸기 없이 잘 받았습니다.",
    },
    {
      id: "3",
      title: "신선함이 다른 유기농 딸기",
      content:
        "유기농으로 재배되었다고 해서 구매했는데, 정말 농약 냄새 없이 깨끗한 맛이었어요. 크기는 조금 작지만 맛과 향은 정말 뛰어났습니다. 건강하게 먹을 수 있어 좋았어요.",
    },
    {
      id: "4",
      title: "가성비 최고의 선택",
      content:
        "가격 대비 품질이 정말 좋았습니다. 이 가격에 이런 품질의 딸기를 먹을 수 있다니 놀랍네요. 신선도도 좋고 크기도 적당해서 디저트로 먹기 딱 좋았습니다.",
    },
    {
      id: "5",
      title: "아이들이 가장 좋아하는 간식",
      content:
        "아이들 간식용으로 구매했는데 정말 대만족입니다. 씻어서 바로 먹을 수 있을 정도로 깨끗하고, 당도도 높아서 아이들이 과자보다 이 딸기를 더 찾네요. 건강한 간식으로 추천합니다.",
    },
  ],
  사과: [
    {
      id: "1",
      title: "아삭한 식감이 일품",
      content:
        "정말 신선한 사과였습니다. 한 입 베어 물었을 때 아삭한 소리와 함께 달콤한 과즙이 입안에 퍼져서 너무 좋았어요. 크기도 적당하고 모양도 예뻐서 선물용으로도 좋을 것 같아요.",
    },
    {
      id: "2",
      title: "당도 높은 프리미엄 사과",
      content:
        "일반 마트 사과와는 확실히 다른 맛이었습니다. 당도가 높고 과즙이 풍부해서 그냥 먹어도 정말 맛있었어요. 가족 모두 만족하며 먹었습니다.",
    },
    {
      id: "3",
      title: "유기농의 깨끗한 맛",
      content:
        "유기농으로 재배된 사과라 안심하고 껍질째 먹을 수 있어서 좋았어요. 농약 걱정 없이 깨끗한 맛을 즐길 수 있었습니다. 다음에도 꼭 구매할 예정입니다.",
    },
    {
      id: "4",
      title: "가성비 좋은 제철 사과",
      content:
        "가격 대비 품질이 정말 좋았습니다. 제철 사과라 그런지 맛도 좋고 신선도도 뛰어났어요. 배송도 빠르고 포장도 꼼꼼해서 멍든 사과 없이 잘 받았습니다.",
    },
    {
      id: "5",
      title: "건강한 간식으로 perfect",
      content:
        "매일 하나씩 먹고 있는데 건강해지는 느낌이에요. 아침에 먹으면 하루가 상쾌하게 시작됩니다. 아이들 간식으로도 좋고, 어른들 디저트로도 좋은 만능 과일입니다.",
    },
  ],
  감자: [
    {
      id: "1",
      title: "고소한 맛이 일품인 감자",
      content:
        "정말 신선한 감자였습니다. 삶아서 먹었는데 고소한 맛이 정말 일품이었어요. 크기도 적당하고 상태도 좋아서 요리하기 편했습니다.",
    },
    {
      id: "2",
      title: "요리가 더 맛있어지는 감자",
      content:
        "이 감자로 감자전을 해먹었는데 정말 맛있었어요. 일반 마트 감자와는 확실히 달랐습니다. 신선도가 다르니 요리 맛이 확실히 올라갔어요.",
    },
    {
      id: "3",
      title: "유기농으로 안심하고 먹는 감자",
      content:
        "유기농으로 재배된 감자라 안심하고 먹을 수 있어서 좋았어요. 흙도 깨끗하게 제거되어 있어서 바로 요리에 사용할 수 있었습니다.",
    },
    {
      id: "4",
      title: "가성비 좋은 국내산 감자",
      content:
        "가격 대비 품질이 정말 좋았습니다. 국내산 감자라 그런지 맛도 좋고 신선도도 뛰어났어요. 배송도 빠르고 포장도 꼼꼼해서 상처 없이 잘 받았습니다.",
    },
    {
      id: "5",
      title: "다양한 요리에 활용 가능한 만능 감자",
      content:
        "감자조림, 감자전, 감자스프 등 다양한 요리에 사용했는데 모두 맛있게 완성되었어요. 크기가 균일해서 요리할 때 편리했고, 맛도 좋아서 가족 모두 만족했습니다.",
    },
  ],
  양파: [
    {
      id: "1",
      title: "요리의 풍미를 살려주는 양파",
      content:
        "정말 신선한 양파였습니다. 요리에 사용했더니 풍미가 확실히 살아났어요. 크기도 적당하고 상태도 좋아서 요리하기 편했습니다.",
    },
    {
      id: "2",
      title: "아삭한 식감의 신선한 양파",
      content:
        "샐러드에 넣어 먹었는데 아삭한 식감이 정말 좋았어요. 일반 마트 양파와는 확실히 달랐습니다. 신선도가 다르니 맛이 확실히 좋았어요.",
    },
    {
      id: "3",
      title: "유기농으로 안심하고 먹는 양파",
      content:
        "유기농으로 재배된 양파라 안심하고 먹을 수 있어서 좋았어요. 껍질도 깨끗해서 손질하기 편했고, 맛도 좋았습니다.",
    },
    {
      id: "4",
      title: "가성비 좋은 국내산 양파",
      content:
        "가격 대비 품질이 정말 좋았습니다. 국내산 양파라 그런지 맛도 좋고 신선도도 뛰어났어요. 배송도 빠르고 포장도 꼼꼼해서 상처 없이 잘 받았습니다.",
    },
    {
      id: "5",
      title: "오래 보관해도 싱싱한 양파",
      content:
        "구매한 지 2주가 지났는데도 싱싱함이 유지되고 있어요. 보관성이 좋아서 오래 두고 먹을 수 있어 좋습니다. 맛도 변함없이 좋아서 만족스럽습니다.",
    },
  ],
  고구마: [
    {
      id: "1",
      title: "달콤한 맛이 일품인 고구마",
      content:
        "정말 달콤한 고구마였습니다. 찐 고구마로 먹었는데 꿀고구마라는 말이 딱 맞는 맛이었어요. 크기도 적당하고 상태도 좋아서 요리하기 편했습니다.",
    },
    {
      id: "2",
      title: "건강한 간식으로 perfect",
      content:
        "다이어트 중에 간식으로 먹고 있는데 정말 만족스러워요. 달콤해서 디저트 대용으로도 좋고, 포만감도 있어서 식사 대용으로도 좋습니다.",
    },
    {
      id: "3",
      title: "유기농으로 안심하고 먹는 고구마",
      content:
        "유기농으로 재배된 고구마라 안심하고 먹을 수 있어서 좋았어요. 흙도 깨끗하게 제거되어 있어서 바로 요리에 사용할 수 있었습니다.",
    },
    {
      id: "4",
      title: "가성비 좋은 국내산 고구마",
      content:
        "가격 대비 품질이 정말 좋았습니다. 국내산 고구마라 그런지 맛도 좋고 신선도도 뛰어났어요. 배송도 빠르고 포장도 꼼꼼해서 상처 없이 잘 받았습니다.",
    },
    {
      id: "5",
      title: "아이들이 좋아하는 건강 간식",
      content:
        "아이들 간식용으로 구매했는데 정말 대만족입니다. 달콤한 맛에 아이들이 과자보다 이 고구마를 더 찾네요. 건강한 간식으로 추천합니다.",
    },
  ],
}

export function ReviewGeneratorTool() {
  const [keyword, setKeyword] = useState("")
  const [searchedKeyword, setSearchedKeyword] = useState("")
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  // 리뷰 생성 함수
  const generateReviews = async () => {
    if (!keyword.trim()) return

    setLoading(true)
    setSearchedKeyword(keyword)

    try {
      // 실제 구현에서는 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 샘플 데이터에서 키워드에 맞는 리뷰 가져오기
      const foundReviews = sampleReviews[keyword as keyof typeof sampleReviews] || []

      // 키워드에 맞는 리뷰가 없으면 기본 리뷰 생성
      if (foundReviews.length === 0) {
        const defaultReviews = Array(5)
          .fill(null)
          .map((_, i) => ({
            id: `default-${i + 1}`,
            title: `${keyword}에 대한 만족스러운 구매 후기 ${i + 1}`,
            content: `${keyword} 제품을 구매해서 사용해봤는데 정말 만족스러웠습니다. 품질도 좋고 가격도 합리적이어서 다음에도 구매하고 싶습니다. 배송도 빠르고 포장도 꼼꼼해서 좋았습니다.`,
          }))
        setReviews(defaultReviews)
      } else {
        setReviews(foundReviews)
      }
    } catch (error) {
      console.error("리뷰 생성 중 오류 발생:", error)
    } finally {
      setLoading(false)
    }
  }

  // 리뷰 복사 함수
  const copyReview = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI 리뷰 생성기</CardTitle>
        <CardDescription>상품 키워드를 입력하면 AI가 자동으로 5개의 리뷰를 생성해 드립니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="상품 키워드를 입력하세요 (예: 딸기, 사과, 감자, 양파, 고구마)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1"
            />
            <Button onClick={generateReviews} disabled={loading || !keyword.trim()}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? "생성 중..." : "리뷰 생성"}
            </Button>
          </div>

          {reviews.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">"{searchedKeyword}"에 대한 추천 리뷰</h3>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-6 mb-4">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="review1">리뷰 1</TabsTrigger>
                  <TabsTrigger value="review2">리뷰 2</TabsTrigger>
                  <TabsTrigger value="review3">리뷰 3</TabsTrigger>
                  <TabsTrigger value="review4">리뷰 4</TabsTrigger>
                  <TabsTrigger value="review5">리뷰 5</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className="overflow-hidden">
                        <CardHeader className="bg-gray-50 py-3">
                          <CardTitle className="text-base">{review.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-gray-700">{review.content}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 py-2 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyReview(review.id, `${review.title}\n\n${review.content}`)}
                          >
                            {copied === review.id ? (
                              <>
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                복사됨
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-1" />
                                복사하기
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {reviews.map((review, index) => (
                  <TabsContent key={review.id} value={`review${index + 1}`}>
                    <Card>
                      <CardHeader className="bg-gray-50">
                        <CardTitle>{review.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <p className="text-gray-700 whitespace-pre-line">{review.content}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2 border-t">
                        <Button
                          variant="outline"
                          onClick={() => copyReview(review.id, `${review.title}\n\n${review.content}`)}
                        >
                          {copied === review.id ? (
                            <>
                              <ThumbsUp className="h-4 w-4 mr-2" />
                              복사됨
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              복사하기
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
