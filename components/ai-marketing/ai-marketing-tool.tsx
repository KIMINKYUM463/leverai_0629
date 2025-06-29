"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Users,
  Megaphone,
  Calendar,
  CheckCircle2,
  Copy,
  Download,
  Sparkles,
  MessageSquare,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Loader2,
} from "lucide-react"

// 마케팅 캠페인 타입
type MarketingCampaign = {
  id: string
  title: string
  description: string
  platform: string
  audience: string
  budget: number
  duration: string
  status: "draft" | "active" | "completed"
  performance?: {
    impressions: number
    clicks: number
    conversions: number
    roi: number
  }
}

// 마케팅 콘텐츠 타입
type MarketingContent = {
  id: string
  type: "social" | "email" | "ad" | "blog"
  platform: string
  title: string
  content: string
  tags: string[]
  status: "draft" | "published"
}

// 실제 새조개 관련 키워드 리스트
const allSeashellKeywords = [
  "4윌나오는해산물",
  "국산새조개",
  "남당항 새조개축제기간",
  "남해안 노랑새조개",
  "냉동 새조개",
  "냉동 새조개살 2kg",
  "대구조개구이맛집",
  "독도 꽃새우 대 자연산1kg",
  "명주조개",
  "모시조개조개",
  "밑뮬조개",
  "배송조회",
  "북방조개",
  "산개구리 알",
  "산고둥",
  "산골 조개 구입",
  "산지 직송 조개류",
  "새조개",
  "새조개 1kg",
  "새조개 샤브샤브",
  "새조개 샤브샤브 밀키트",
  "새조개 샤브샤브용",
  "새조개 손질새조개",
  "새조개 코끼리조개",
  "새조개까는법",
  "새조개샤브샤브용",
  "새조개중국산",
  "생조개모듬",
  "샤브샤브 새조개",
  "샤브용조개모듬",
  "세조개살건조",
  "손질 새조개",
  "손질 새조개 1키로",
  "손질 새조개 2키로",
  "손질 새조개 생물",
  "손질 태양식품새조개 1키로",
  "손질된 새조개",
  "손질새조개",
  "손질새조개1키로",
  "수산물",
  "수입냉동 모시조개",
  "싱싱가든 새조개",
  "싱싱새조개",
  "여수 새조개",
  "여수 새조개 산지직송",
  "여수 새조개1kg",
  "여수 손질 새조개",
  "여수새조개",
  "여수해적 손질 전복",
  "외국게",
  "우럭조개",
  "일억수산 새조개",
  "자연산 손질 새조개",
  "자연산 손질 새조개12팩",
  "조개",
  "조개살가격",
  "코스트코 조개",
  "코키리조개가격",
  "통영 보람수산",
  "홍성 남당리 새조개 축제",
  "홍성 새조개",
]

// 랜덤 키워드 선택 및 데이터 생성 함수
const generateRandomKeywordData = () => {
  const shuffled = [...allSeashellKeywords].sort(() => 0.5 - Math.random())
  const selectedKeywords = shuffled.slice(0, 15) // 15개 키워드 선택

  return selectedKeywords.map((keyword) => {
    const competitions = ["높음", "중간", "낮음"]
    const competition = competitions[Math.floor(Math.random() * competitions.length)]

    // 키워드 길이와 특성에 따른 검색량 조정
    let baseVolume = 1000
    if (keyword.includes("새조개")) baseVolume = 3000
    if (keyword.includes("샤브샤브")) baseVolume = 2500
    if (keyword.includes("여수") || keyword.includes("홍성")) baseVolume = 1500
    if (keyword.includes("1kg") || keyword.includes("2kg")) baseVolume = 2000

    const searchVolume = Math.floor(Math.random() * baseVolume) + 500
    const cpc = Math.floor(Math.random() * 800) + 300
    const trendValue = Math.floor(Math.random() * 40) - 10 // -10% ~ +30%
    const trend = trendValue >= 0 ? `+${trendValue}%` : `${trendValue}%`

    return {
      keyword,
      searchVolume,
      competition,
      cpc,
      trend,
    }
  })
}

// 새조개 키워드 분석 데이터
const seashellKeywords = generateRandomKeywordData()

export function AIMarketingTool() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [product, setProduct] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [marketingGoal, setMarketingGoal] = useState("awareness")
  const [platform, setPlatform] = useState("all")
  const [budget, setBudget] = useState("10000")
  const [isGenerating, setIsGenerating] = useState(false)
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([])
  const [contents, setContents] = useState<MarketingContent[]>([])
  const [contentPrompt, setContentPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")

  // 캠페인 생성 함수
  const generateCampaign = () => {
    if (!product || !targetAudience) return

    setIsGenerating(true)

    // 실제로는 API 호출이 필요하지만, 여기서는 시뮬레이션
    setTimeout(() => {
      const newCampaign: MarketingCampaign = {
        id: `campaign-${Date.now()}`,
        title: `${product} ${getGoalText(marketingGoal)} 캠페인`,
        description: `${targetAudience}를 대상으로 ${product}의 ${getGoalText(marketingGoal)}를 높이기 위한 마케팅 캠페인입니다.`,
        platform: platform === "all" ? "통합 채널" : getPlatformName(platform),
        audience: targetAudience,
        budget: Number.parseInt(budget),
        duration: "4주",
        status: "draft",
        performance: {
          impressions: Math.floor(Math.random() * 10000) + 1000,
          clicks: Math.floor(Math.random() * 1000) + 100,
          conversions: Math.floor(Math.random() * 100) + 10,
          roi: Math.random() * 5 + 1,
        },
      }

      setCampaigns([newCampaign, ...campaigns])
      setIsGenerating(false)

      // 캠페인 생성 시 관련 콘텐츠도 자동 생성
      generateRelatedContent(newCampaign)
    }, 2000)
  }

  // 관련 콘텐츠 자동 생성
  const generateRelatedContent = (campaign: MarketingCampaign) => {
    const platformsToGenerate = platform === "all" ? ["instagram", "facebook", "email"] : [platform]

    const newContents: MarketingContent[] = platformsToGenerate.map((p) => {
      const contentType = p === "email" ? "email" : "social"

      return {
        id: `content-${Date.now()}-${p}`,
        type: contentType,
        platform: p,
        title: `${campaign.title} - ${getPlatformName(p)} 콘텐츠`,
        content: getDefaultContent(p, campaign.title, product, targetAudience),
        tags: [product, getGoalText(marketingGoal), targetAudience.split(" ")[0]],
        status: "draft",
      }
    })

    setContents([...newContents, ...contents])
  }

  // 콘텐츠 생성 함수
  const generateContent = () => {
    if (!contentPrompt) return

    setIsGenerating(true)

    // 실제로는 API 호출이 필요하지만, 여기서는 시뮬레이션
    setTimeout(() => {
      const contentTemplates = [
        `✨ 신선한 ${product}로 건강한 하루를 시작하세요!\n\n${targetAudience}를 위한 최고의 선택, 지금 바로 확인해보세요.\n\n#${product.replace(/\s+/g, "")} #신선식품 #건강한식단`,
        `🌟 ${product}의 새로운 기준을 만나보세요.\n\n${targetAudience}의 니즈를 완벽하게 충족시키는 프리미엄 품질!\n\n#품질보장 #${product.replace(/\s+/g, "")} #프리미엄`,
        `💯 ${targetAudience}가 선택한 ${product}!\n\n특별 할인 이벤트 진행 중, 놓치지 마세요.\n\n#할인 #${product.replace(/\s+/g, "")} #한정판매`,
      ]

      setGeneratedContent(contentTemplates[Math.floor(Math.random() * contentTemplates.length)])
      setIsGenerating(false)
    }, 1500)
  }

  // 마케팅 목표 텍스트 변환
  const getGoalText = (goal: string) => {
    switch (goal) {
      case "awareness":
        return "인지도 향상"
      case "consideration":
        return "고려도 증가"
      case "conversion":
        return "전환율 개선"
      default:
        return "인지도 향상"
    }
  }

  // 플랫폼 이름 변환
  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "인스타그램"
      case "facebook":
        return "페이스북"
      case "email":
        return "이메일"
      case "blog":
        return "블로그"
      default:
        return platform
    }
  }

  // 플랫폼별 기본 콘텐츠
  const getDefaultContent = (platform: string, title: string, product: string, audience: string) => {
    switch (platform) {
      case "instagram":
        return `✨ ${product}의 특별함을 소개합니다!\n\n${audience}를 위한 최고의 선택, 지금 바로 확인해보세요.\n\n#${product.replace(/\s+/g, "")} #신선식품 #건강한식단`
      case "facebook":
        return `🌟 ${title}\n\n${audience}를 위한 ${product}를 소개합니다. 최고의 품질과 합리적인 가격으로 제공됩니다.\n\n지금 바로 확인해보세요!`
      case "email":
        return `안녕하세요, 고객님\n\n${product}의 특별한 소식을 전해드립니다.\n\n${audience}를 위해 특별히 준비한 이번 제품은 최고의 품질을 자랑합니다.\n\n지금 바로 확인해보세요!`
      default:
        return `${product}에 대한 콘텐츠입니다. ${audience}를 위한 최고의 선택입니다.`
    }
  }

  // 플랫폼 아이콘 가져오기
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "blog":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Megaphone className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 마케팅</h2>
        <p className="text-muted-foreground">AI를 활용하여 효과적인 마케팅 전략과 콘텐츠를 생성하세요.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">캠페인 생성</TabsTrigger>
          <TabsTrigger value="content">콘텐츠 생성</TabsTrigger>
          <TabsTrigger value="analytics">성과 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>마케팅 캠페인 생성</CardTitle>
              <CardDescription>상품 정보와 목표를 입력하여 AI가 최적의 마케팅 캠페인을 생성합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="product" className="text-sm font-medium">
                      상품명 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="product"
                      placeholder="예: 제주 감귤 선물세트"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="target-audience" className="text-sm font-medium">
                      타겟 고객층 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="target-audience"
                      placeholder="예: 30-40대 주부"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="marketing-goal" className="text-sm font-medium">
                      마케팅 목표
                    </label>
                    <Select value={marketingGoal} onValueChange={setMarketingGoal}>
                      <SelectTrigger id="marketing-goal">
                        <SelectValue placeholder="마케팅 목표 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="awareness">인지도 향상 (Awareness)</SelectItem>
                        <SelectItem value="consideration">고려도 증가 (Consideration)</SelectItem>
                        <SelectItem value="conversion">전환율 개선 (Conversion)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="platform" className="text-sm font-medium">
                      마케팅 플랫폼
                    </label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger id="platform">
                        <SelectValue placeholder="플랫폼 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전 채널</SelectItem>
                        <SelectItem value="instagram">인스타그램</SelectItem>
                        <SelectItem value="facebook">페이스북</SelectItem>
                        <SelectItem value="email">이메일</SelectItem>
                        <SelectItem value="blog">블로그</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-medium">
                      예산 (원)
                    </label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="예: 100000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full mt-6"
                    onClick={generateCampaign}
                    disabled={isGenerating || !product || !targetAudience}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        캠페인 생성 중...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        AI 캠페인 생성하기
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {campaigns.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-medium">생성된 캠페인</h3>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <Card key={campaign.id} className="overflow-hidden">
                        <CardHeader className="bg-gray-50 pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{campaign.title}</CardTitle>
                              <CardDescription>{campaign.description}</CardDescription>
                            </div>
                            <Badge
                              variant={
                                campaign.status === "active"
                                  ? "default"
                                  : campaign.status === "completed"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {campaign.status === "active"
                                ? "진행 중"
                                : campaign.status === "completed"
                                  ? "완료됨"
                                  : "초안"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">타겟 고객층:</span>
                                <span className="text-sm">{campaign.audience}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <Megaphone className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">플랫폼:</span>
                                <span className="text-sm">{campaign.platform}</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">기간:</span>
                                <span className="text-sm">{campaign.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">예산:</span>
                                <span className="text-sm">₩{campaign.budget.toLocaleString()}</span>
                              </div>
                            </div>

                            {campaign.performance && (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="text-sm font-medium mb-2">예상 성과</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="bg-white p-2 rounded border">
                                    <div className="text-xs text-gray-500">노출수</div>
                                    <div className="font-medium">
                                      {campaign.performance.impressions.toLocaleString()}
                                    </div>
                                  </div>
                                  <div className="bg-white p-2 rounded border">
                                    <div className="text-xs text-gray-500">클릭수</div>
                                    <div className="font-medium">{campaign.performance.clicks.toLocaleString()}</div>
                                  </div>
                                  <div className="bg-white p-2 rounded border">
                                    <div className="text-xs text-gray-500">전환수</div>
                                    <div className="font-medium">
                                      {campaign.performance.conversions.toLocaleString()}
                                    </div>
                                  </div>
                                  <div className="bg-white p-2 rounded border">
                                    <div className="text-xs text-gray-500">ROI</div>
                                    <div className="font-medium">{campaign.performance.roi.toFixed(1)}x</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              수정하기
                            </Button>
                            <Button size="sm">활성화</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>마케팅 콘텐츠 생성</CardTitle>
              <CardDescription>AI를 활용하여 다양한 마케팅 콘텐츠를 생성하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="content-prompt" className="text-sm font-medium">
                        콘텐츠 요청사항
                      </label>
                      <Textarea
                        id="content-prompt"
                        placeholder="예: 제주 감귤의 신선함과 건강 효능을 강조하는 인스타그램 게시물을 작성해주세요."
                        rows={4}
                        value={contentPrompt}
                        onChange={(e) => setContentPrompt(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Select defaultValue="instagram">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="플랫폼 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">인스타그램</SelectItem>
                          <SelectItem value="facebook">페이스북</SelectItem>
                          <SelectItem value="email">이메일</SelectItem>
                          <SelectItem value="blog">블로그</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select defaultValue="post">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="콘텐츠 유형" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="post">게시물</SelectItem>
                          <SelectItem value="story">스토리</SelectItem>
                          <SelectItem value="ad">광고</SelectItem>
                          <SelectItem value="newsletter">뉴스레터</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full" onClick={generateContent} disabled={isGenerating || !contentPrompt}>
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          콘텐츠 생성 중...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          AI 콘텐츠 생성하기
                        </>
                      )}
                    </Button>
                  </div>

                  {generatedContent && (
                    <div className="mt-6 border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-sm font-medium">생성된 콘텐츠</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => navigator.clipboard.writeText(generatedContent)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="whitespace-pre-line text-sm">{generatedContent}</div>
                      <div className="flex justify-end mt-4">
                        <Button size="sm">저장하기</Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">콘텐츠 라이브러리</h3>
                  {contents.length > 0 ? (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {contents.map((content) => (
                        <div key={content.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(content.platform)}
                              <span className="font-medium text-sm">{content.title}</span>
                            </div>
                            <Badge variant={content.status === "published" ? "default" : "outline"} className="text-xs">
                              {content.status === "published" ? "게시됨" : "초안"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{content.content}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {content.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                #{tag.replace(/\s+/g, "")}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              수정
                            </Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              게시
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded-lg p-8 text-center">
                      <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">저장된 콘텐츠가 없습니다.</p>
                      <p className="text-sm text-gray-400 mt-1">
                        콘텐츠를 생성하거나 캠페인을 만들어 콘텐츠를 추가하세요.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>키워드 광고 분석</CardTitle>
              <CardDescription>새조개 관련 키워드의 광고 성과를 분석합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 키워드 성과 요약 */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">47,600</div>
                        <p className="text-sm text-gray-500">총 검색량/월</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">₩720</div>
                        <p className="text-sm text-gray-500">평균 CPC</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">중간</div>
                        <p className="text-sm text-gray-500">평균 경쟁도</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">+16.5%</div>
                        <p className="text-sm text-gray-500">평균 성장률</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 키워드 분석 테이블 */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="font-medium">상위 키워드 분석</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">키워드</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">월 검색량</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">경쟁도</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CPC</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">성장률</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {seashellKeywords.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium">{item.keyword}</td>
                            <td className="px-4 py-3 text-sm">{item.searchVolume.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge
                                variant={
                                  item.competition === "높음"
                                    ? "destructive"
                                    : item.competition === "중간"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {item.competition}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">₩{item.cpc}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="text-green-600 font-medium">{item.trend}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* AI 인사이트 */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">🤖 AI 광고 인사이트</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">핵심 키워드 집중</p>
                        <p className="text-sm text-gray-600 mt-1">
                          '새조개 샤브샤브' 키워드가 높은 성장률(+22%)과 적정 CPC를 보이고 있어 집중 투자를 권장합니다.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">지역 키워드 활용</p>
                        <p className="text-sm text-gray-600 mt-1">
                          '여수 새조개', '홍성 새조개' 등 지역 키워드는 경쟁도가 낮아 효율적인 광고 집행이 가능합니다.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">롱테일 키워드 기회</p>
                        <p className="text-sm text-gray-600 mt-1">
                          '새조개까는법' 같은 정보성 키워드는 낮은 CPC로 브랜드 인지도 향상에 효과적입니다.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">계절성 고려</p>
                        <p className="text-sm text-gray-600 mt-1">
                          새조개는 계절성이 강한 상품으로, 성수기(4-6월) 집중 광고 전략을 수립하는 것이 좋습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 추천 광고 전략 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-3">💡 추천 광고 전략</h3>
                  <div className="space-y-2 text-sm text-blue-700">
                    <p>
                      • <strong>1단계:</strong> '새조개 샤브샤브', '손질 새조개' 등 핵심 키워드로 브랜드 캠페인 시작
                    </p>
                    <p>
                      • <strong>2단계:</strong> '여수 새조개', '홍성 새조개' 등 지역 키워드로 타겟팅 확장
                    </p>
                    <p>
                      • <strong>3단계:</strong> '새조개까는법', '새조개 요리법' 등 정보성 키워드로 콘텐츠 마케팅
                    </p>
                    <p>
                      • <strong>예산 배분:</strong> 핵심 키워드 60%, 지역 키워드 25%, 롱테일 키워드 15%
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    키워드 분석 리포트 다운로드
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
