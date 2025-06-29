"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  TrendingUp,
  ArrowRight,
  Copy,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Download,
} from "lucide-react"

// 키워드 타입 정의
type Keyword = {
  text: string
  score: number
  volume: number
  competition: number
  cpc: number
  trend: "up" | "down" | "stable"
}

export function KeywordRecommender() {
  const [productName, setProductName] = useState<string>("")
  const [productDescription, setProductDescription] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [copied, setCopied] = useState<boolean>(false)

  // 키워드 생성 함수
  const generateKeywords = () => {
    if (!productName.trim()) return

    setIsLoading(true)

    // 실제로는 API 호출이 필요하지만, 여기서는 시뮬레이션
    setTimeout(() => {
      // 기본 키워드 세트
      const baseKeywords = [
        "신선한",
        "유기농",
        "국내산",
        "제철",
        "산지직송",
        "무농약",
        "친환경",
        "프리미엄",
        "특가",
        "할인",
        "선물세트",
        "명절선물",
        "건강식품",
        "영양가",
        "맛있는",
        "당일배송",
        "무료배송",
        "품질보증",
        "인증",
        "추천",
      ]

      // 상품 이름에서 키워드 추출
      const nameKeywords = productName.split(" ")

      // 상품 설명에서 키워드 추출 (간단한 시뮬레이션)
      const descKeywords = productDescription
        ? productDescription
            .split(/[\s,.]+/)
            .filter((word) => word.length > 1)
            .slice(0, 10)
        : []

      // 모든 키워드 결합 및 중복 제거
      const allKeywords = [...new Set([...nameKeywords, ...descKeywords, ...baseKeywords])]

      // 키워드 객체 생성
      const generatedKeywords: Keyword[] = allKeywords.map((keyword) => {
        // 랜덤 점수 생성 (실제로는 API에서 제공)
        const score = Math.floor(Math.random() * 100)
        const volume = Math.floor(Math.random() * 10000)
        const competition = Math.random()
        const cpc = Math.random() * 5000
        const trend: "up" | "down" | "stable" = ["up", "down", "stable"][Math.floor(Math.random() * 3)] as any

        return {
          text: keyword,
          score,
          volume,
          competition,
          trend,
        }
      })

      // 점수 기준으로 정렬
      const sortedKeywords = generatedKeywords.sort((a, b) => b.score - a.score)

      setKeywords(sortedKeywords)
      setIsLoading(false)
    }, 1500)
  }

  // 키워드 선택/해제 토글
  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword))
    } else {
      setSelectedKeywords([...selectedKeywords, keyword])
    }
  }

  // 선택된 키워드 복사
  const copySelectedKeywords = () => {
    if (selectedKeywords.length === 0) return

    navigator.clipboard.writeText(selectedKeywords.join(", "))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 경쟁 수준에 따른 배지 색상
  const getCompetitionColor = (competition: number) => {
    if (competition < 0.3) return "bg-green-100 text-green-800 border-green-200"
    if (competition < 0.7) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  // 트렌드에 따른 아이콘
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-green-600" />
    if (trend === "down") return <TrendingUp className="h-3.5 w-3.5 text-red-600 rotate-180" />
    return <ArrowRight className="h-3.5 w-3.5 text-gray-600" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 키워드 추천기</h2>
        <p className="text-muted-foreground">상품 검색과 광고에 최적화된 키워드를 AI가 추천해드립니다.</p>
      </div>

      <Tabs defaultValue="generator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generator">키워드 생성</TabsTrigger>
          <TabsTrigger value="analysis">키워드 분석</TabsTrigger>
          <TabsTrigger value="recommendations">추천 조합</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>키워드 생성</CardTitle>
              <CardDescription>상품 정보를 입력하여 최적의 키워드를 생성하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="product-name" className="text-sm font-medium">
                    상품명 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="product-name"
                    placeholder="예: 제주 감귤 5kg 선물세트"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="product-description" className="text-sm font-medium">
                    상품 설명 (선택사항)
                  </label>
                  <Textarea
                    id="product-description"
                    placeholder="상품의 특징, 장점, 용도 등을 자세히 입력하면 더 정확한 키워드를 추천받을 수 있습니다."
                    rows={4}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>

                <Button className="w-full" onClick={generateKeywords} disabled={isLoading || !productName.trim()}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      키워드 생성 중...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" /> 키워드 생성하기
                    </>
                  )}
                </Button>
              </div>

              {keywords.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">추천 키워드</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{selectedKeywords.length}개 선택됨</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copySelectedKeywords}
                        disabled={selectedKeywords.length === 0}
                        className="flex items-center gap-1"
                      >
                        {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "복사됨" : "복사"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {keywords.slice(0, 30).map((keyword, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedKeywords.includes(keyword.text)
                            ? "border-teal-500 bg-teal-50"
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => toggleKeyword(keyword.text)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">{keyword.text}</div>
                          <Badge variant="outline" className={`text-xs ${getCompetitionColor(keyword.competition)}`}>
                            {keyword.competition < 0.3
                              ? "낮은 경쟁"
                              : keyword.competition < 0.7
                                ? "중간 경쟁"
                                : "높은 경쟁"}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>검색량: {keyword.volume.toLocaleString()}</span>
                          <span className="flex items-center gap-1">
                            {getTrendIcon(keyword.trend)}
                            {keyword.trend === "up" ? "상승" : keyword.trend === "down" ? "하락" : "안정"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedKeywords.length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                      <h4 className="font-medium mb-2">선택된 키워드</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedKeywords.map((keyword, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1 cursor-pointer"
                            onClick={() => toggleKeyword(keyword)}
                          >
                            {keyword} <XCircle className="ml-1 h-3 w-3" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>키워드 분석</CardTitle>
              <CardDescription>추천 키워드의 상세 분석 정보입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              {keywords.length > 0 ? (
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="p-3 border">키워드</th>
                          <th className="p-3 border">검색량</th>
                          <th className="p-3 border">경쟁 수준</th>
                          <th className="p-3 border">예상 CPC</th>
                          <th className="p-3 border">트렌드</th>
                          <th className="p-3 border">추천 점수</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keywords.slice(0, 15).map((keyword, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="p-3 border font-medium">{keyword.text}</td>
                            <td className="p-3 border">{keyword.volume.toLocaleString()}</td>
                            <td className="p-3 border">
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${
                                    keyword.competition < 0.3
                                      ? "bg-green-500"
                                      : keyword.competition < 0.7
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                />
                                <span>
                                  {keyword.competition < 0.3 ? "낮음" : keyword.competition < 0.7 ? "중간" : "높음"}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 border">₩{Math.round(keyword.cpc).toLocaleString()}</td>
                            <td className="p-3 border">
                              <div className="flex items-center gap-1">
                                {getTrendIcon(keyword.trend)}
                                <span>
                                  {keyword.trend === "up" ? "상승" : keyword.trend === "down" ? "하락" : "안정"}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 border">
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-teal-500" style={{ width: `${keyword.score}%` }} />
                                </div>
                                <span>{keyword.score}/100</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                        키워드 인사이트
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">상위 키워드</p>
                            <p className="text-sm text-gray-600">
                              "{keywords[0]?.text}", "{keywords[1]?.text}", "{keywords[2]?.text}"가 가장 효과적인
                              키워드입니다.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">경쟁이 높은 키워드</p>
                            <p className="text-sm text-gray-600">
                              {keywords
                                .filter((k) => k.competition > 0.7)
                                .slice(0, 3)
                                .map((k) => `"${k.text}"`)
                                .join(", ")}
                              는 경쟁이 높으므로 보조 키워드로 사용하는 것이 좋습니다.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">상승 트렌드 키워드</p>
                            <p className="text-sm text-gray-600">
                              {keywords
                                .filter((k) => k.trend === "up")
                                .slice(0, 3)
                                .map((k) => `"${k.text}"`)
                                .join(", ")}
                              는 검색 트렌드가 상승 중이므로 우선적으로 활용하세요.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">키워드 활용 전략</h3>
                      <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                            1
                          </div>
                          <p>
                            <span className="font-medium">상품명 최적화:</span> 상품명에 "{keywords[0]?.text}", "
                            {keywords[1]?.text}" 키워드를 포함하세요.
                          </p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                            2
                          </div>
                          <p>
                            <span className="font-medium">상품 설명:</span> 상품 설명에 상위 10개 키워드를 자연스럽게
                            포함시키세요.
                          </p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                            3
                          </div>
                          <p>
                            <span className="font-medium">검색 광고:</span> 경쟁이 낮은 "
                            {keywords.filter((k) => k.competition < 0.3)[0]?.text}", "
                            {keywords.filter((k) => k.competition < 0.3)[1]?.text}" 키워드로 광고 효율을 높이세요.
                          </p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                            4
                          </div>
                          <p>
                            <span className="font-medium">롱테일 키워드:</span> 주요 키워드와 "{keywords[10]?.text}", "
                            {keywords[11]?.text}"를 조합한 롱테일 키워드를 활용하세요.
                          </p>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                            5
                          </div>
                          <p>
                            <span className="font-medium">계절성 고려:</span> "
                            {keywords.filter((k) => k.trend === "up")[0]?.text}" 키워드는 현재 시즌에 맞춰 중점적으로
                            활용하세요.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">키워드를 생성하면 상세 분석 정보가 표시됩니다.</p>
                  <Button
                    className="mt-4"
                    onClick={() => document.querySelector('[data-state="inactive"][value="generator"]')?.click()}
                  >
                    키워드 생성하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>추천 키워드 조합</CardTitle>
              <CardDescription>다양한 마케팅 목적에 맞는 최적의 키워드 조합입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              {keywords.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">상품명 최적화</h3>
                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <p className="font-medium text-gray-800">
                          {[keywords[0]?.text, keywords[1]?.text, keywords[2]?.text, keywords[3]?.text]
                            .filter(Boolean)
                            .join(" ")}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        상품명에 이 키워드 ���합을 사용하면 검색 노출을 최대화할 수 있습니다.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          const text = [keywords[0]?.text, keywords[1]?.text, keywords[2]?.text, keywords[3]?.text]
                            .filter(Boolean)
                            .join(" ")
                          navigator.clipboard.writeText(text)
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" /> 복사하기
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">검색 광고 키워드</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {keywords.slice(0, 8).map((keyword, index) => (
                          <Badge key={index} variant="outline" className="px-2 py-1">
                            {keyword.text}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        검색 광고에 이 키워드들을 사용하여 효과적인 광고 캠페인을 구성하세요.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          const text = keywords
                            .slice(0, 8)
                            .map((k) => k.text)
                            .join(", ")
                          navigator.clipboard.writeText(text)
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" /> 복사하기
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">상품 설명 키워드</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {keywords.slice(0, 12).map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="px-2 py-1">
                            {keyword.text}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">상품 설명에 이 키워드들을 자연스럽게 포함시키세요.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          const text = keywords
                            .slice(0, 12)
                            .map((k) => k.text)
                            .join(", ")
                          navigator.clipboard.writeText(text)
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" /> 복사하기
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">해시태그</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {keywords.slice(0, 10).map((keyword, index) => (
                          <Badge
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200"
                          >
                            #{keyword.text.replace(/\s+/g, "")}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">SNS 마케팅에 이 해시태그를 활용하세요.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          const text = keywords
                            .slice(0, 10)
                            .map((k) => `#${k.text.replace(/\s+/g, "")}`)
                            .join(" ")
                          navigator.clipboard.writeText(text)
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" /> 복사하기
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">롱테일 키워드</h3>
                      <div className="space-y-2 mb-3">
                        {[
                          `${keywords[0]?.text || ""} ${keywords[5]?.text || ""} 추천`,
                          `${keywords[1]?.text || ""} ${keywords[6]?.text || ""} 가격`,
                          `${keywords[0]?.text || ""} ${keywords[7]?.text || ""} 후기`,
                          `${keywords[2]?.text || ""} ${keywords[8]?.text || ""} 비교`,
                          `${keywords[0]?.text || ""} ${keywords[9]?.text || ""} 할인`,
                        ].map((phrase, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                            {phrase}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        구체적인 검색어로 타겟팅하려면 이 롱테일 키워드를 활용하세요.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          const text = [
                            `${keywords[0]?.text || ""} ${keywords[5]?.text || ""} 추천`,
                            `${keywords[1]?.text || ""} ${keywords[6]?.text || ""} 가격`,
                            `${keywords[0]?.text || ""} ${keywords[7]?.text || ""} 후기`,
                            `${keywords[2]?.text || ""} ${keywords[8]?.text || ""} 비교`,
                            `${keywords[0]?.text || ""} ${keywords[9]?.text || ""} 할인`,
                          ].join("\n")
                          navigator.clipboard.writeText(text)
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" /> 복사하기
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3 flex items-center">
                      <Download className="h-5 w-5 mr-2 text-teal-600" />
                      키워드 마케팅 전략 가이드
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      이 키워드들을 활용한 효과적인 마케팅 전략 가이드입니다.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                        <h4 className="font-medium text-teal-800 mb-1">1. 검색 엔진 최적화 (SEO)</h4>
                        <p className="text-sm text-teal-700">
                          상품명과 설명에 "{keywords[0]?.text}", "{keywords[1]?.text}" 등 주요 키워드를 자연스럽게
                          포함시키고, 상품 이미지의 alt 태그에도 키워드를 활용하세요.
                        </p>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-1">2. 검색 광고 전략</h4>
                        <p className="text-sm text-blue-700">
                          경쟁이 낮은 "{keywords.filter((k) => k.competition < 0.3)[0]?.text}" 키워드로 시작하여 ROI를
                          최적화하고, 점진적으로 "{keywords[0]?.text}" 같은 주요 키워드로 확장하세요.
                        </p>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <h4 className="font-medium text-purple-800 mb-1">3. 콘텐츠 마케팅</h4>
                        <p className="text-sm text-purple-700">
                          "{keywords[0]?.text} 활용법", "{keywords[1]?.text} 선택 가이드" 등의 주제로 블로그 글이나 SNS
                          콘텐츠를 작성하여 자연스러운 유입을 유도하세요.
                        </p>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                        <h4 className="font-medium text-amber-800 mb-1">4. 시즌별 전략</h4>
                        <p className="text-sm text-amber-700">
                          "{keywords.filter((k) => k.trend === "up")[0]?.text}" 키워드는 현재 상승 중이므로 이 키워드를
                          중심으로 시즌 프로모션을 기획하세요.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">키워드를 생성하면 추천 키워드 조합이 표시됩니다.</p>
                  <Button
                    className="mt-4"
                    onClick={() => document.querySelector('[data-state="inactive"][value="generator"]')?.click()}
                  >
                    키워드 생성하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
