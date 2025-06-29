"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  DollarSign,
  Search,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Target,
  RefreshCw,
  Download,
  Zap,
} from "lucide-react"
import type { AnalysisData } from "./enhanced-analytics-tool"
import { KeywordChart } from "./keyword-chart"
import { PerformanceChart } from "./performance-chart"

interface AnalysisResultsProps {
  data: AnalysisData
  onReset: () => void
}

export function AnalysisResults({ data, onReset }: AnalysisResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num)
  }

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">분석 결과</h3>
          <p className="text-muted-foreground">AI가 분석한 광고 성과 인사이트입니다.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />새 분석
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            리포트 다운로드
          </Button>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="animate-in slide-in-from-left-5 duration-300">
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{formatCurrency(data.summary.totalSpend)}</div>
              <p className="text-sm text-muted-foreground">총 광고비</p>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-in slide-in-from-left-5 duration-300 delay-75">
          <CardContent className="pt-6">
            <div className="text-center">
              <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{formatNumber(data.summary.totalImpressions)}</div>
              <p className="text-sm text-muted-foreground">총 노출수</p>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-in slide-in-from-left-5 duration-300 delay-150">
          <CardContent className="pt-6">
            <div className="text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{formatNumber(data.summary.totalClicks)}</div>
              <p className="text-sm text-muted-foreground">총 클릭수</p>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-in slide-in-from-left-5 duration-300 delay-225">
          <CardContent className="pt-6">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{formatCurrency(data.summary.averageCPC)}</div>
              <p className="text-sm text-muted-foreground">평균 CPC</p>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-in slide-in-from-left-5 duration-300 delay-300">
          <CardContent className="pt-6">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{data.summary.averageCTR.toFixed(2)}%</div>
              <p className="text-sm text-muted-foreground">평균 CTR</p>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-in slide-in-from-left-5 duration-300 delay-375">
          <CardContent className="pt-6">
            <div className="text-center">
              <Search className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{formatNumber(data.summary.totalKeywords)}</div>
              <p className="text-sm text-muted-foreground">총 키워드</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 탭 컨텐츠 */}
      <Tabs defaultValue="high-cpc" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="high-cpc">높은 CPC</TabsTrigger>
          <TabsTrigger value="low-impression">낮은 노출</TabsTrigger>
          <TabsTrigger value="insights">AI 인사이트</TabsTrigger>
          <TabsTrigger value="performance">성과 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="high-cpc" className="space-y-4">
          <Card className="animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                높은 CPC 키워드
              </CardTitle>
              <CardDescription>
                비용 대비 효율이 낮을 수 있는 키워드들입니다. 입찰가 조정을 고려해보세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.highCPCKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors animate-in slide-in-from-right-5 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{keyword.keyword}</h4>
                        {getTrendIcon(keyword.trend)}
                        <Badge variant="destructive">높은 CPC</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>CPC: {formatCurrency(keyword.cpc)}</div>
                        <div>클릭: {formatNumber(keyword.clicks)}</div>
                        <div>노출: {formatNumber(keyword.impressions)}</div>
                        <div>CTR: {keyword.ctr.toFixed(2)}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <KeywordChart searchVolume={keyword.searchVolume} trend={keyword.trend} />
                      <p className="text-xs text-muted-foreground mt-1">검색량: {formatNumber(keyword.searchVolume)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-impression" className="space-y-4">
          <Card className="animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-orange-600" />
                낮은 노출 키워드
              </CardTitle>
              <CardDescription>
                노출이 부족한 키워드들입니다. 입찰가 상향 조정이나 키워드 확장을 고려해보세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.lowImpressionKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors animate-in slide-in-from-left-5 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{keyword.keyword}</h4>
                        {getTrendIcon(keyword.trend)}
                        <Badge variant="secondary">낮은 노출</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>노출: {formatNumber(keyword.impressions)}</div>
                        <div>CPC: {formatCurrency(keyword.cpc)}</div>
                        <div>클릭: {formatNumber(keyword.clicks)}</div>
                        <div>CTR: {keyword.ctr.toFixed(2)}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <KeywordChart searchVolume={keyword.searchVolume} trend={keyword.trend} />
                      <p className="text-xs text-muted-foreground mt-1">검색량: {formatNumber(keyword.searchVolume)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                AI 인사이트 & 추천
              </CardTitle>
              <CardDescription>AI가 분석한 개선점과 최적화 방안을 제안합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.keywordInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg animate-in slide-in-from-bottom-5 duration-300"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{insight.keyword}</h4>
                        <Badge variant={getPriorityColor(insight.priority)}>
                          {insight.priority === "high" ? "높음" : insight.priority === "medium" ? "보통" : "낮음"}
                        </Badge>
                      </div>
                      {(insight.potentialSavings || insight.potentialIncrease) && (
                        <div className="text-right text-sm">
                          {insight.potentialSavings && (
                            <p className="text-green-600 font-medium">
                              절약 가능: {formatCurrency(insight.potentialSavings)}
                            </p>
                          )}
                          {insight.potentialIncrease && (
                            <p className="text-blue-600 font-medium">
                              증가 예상: {formatCurrency(insight.potentialIncrease)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{insight.issue}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="animate-in slide-in-from-left-5 duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  상위 성과 키워드
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.performanceMetrics.topPerformers.map((performer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg animate-in slide-in-from-left-5 duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div>
                        <p className="font-medium">{performer.keyword}</p>
                        <p className="text-sm text-muted-foreground">{performer.metric}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{formatNumber(performer.value)}</p>
                        <p className="text-xs text-green-500">+{performer.change}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-in slide-in-from-right-5 duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  개선 필요 키워드
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.performanceMetrics.underPerformers.map((performer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-red-50 rounded-lg animate-in slide-in-from-right-5 duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div>
                        <p className="font-medium">{performer.keyword}</p>
                        <p className="text-sm text-muted-foreground">{performer.metric}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">{formatNumber(performer.value)}</p>
                        <p className="text-xs text-red-500">{performer.change}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-in fade-in-50 duration-500 delay-300">
            <CardHeader>
              <CardTitle>성과 트렌드</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
