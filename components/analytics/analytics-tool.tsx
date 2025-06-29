import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PerformanceChart } from "./performance-chart"
import { ChannelPerformance } from "./channel-performance"
import { AudienceInsights } from "./audience-insights"

export function AnalyticsTool() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 광고 성과 분석기</h2>
        <p className="text-muted-foreground">광고 성과를 분석하고 최적화 방안을 제시합니다.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="channels">채널별 성과</TabsTrigger>
          <TabsTrigger value="audience">고객 인사이트</TabsTrigger>
          <TabsTrigger value="recommendations">AI 추천</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">광고 지출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₩1,245,000</div>
                <p className="text-xs text-muted-foreground">+12.5% 전월 대비</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">광고 수익</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₩3,850,000</div>
                <p className="text-xs text-muted-foreground">+18.2% 전월 대비</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROAS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">309%</div>
                <p className="text-xs text-muted-foreground">+5.7% 전월 대비</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">전환율</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2%</div>
                <p className="text-xs text-muted-foreground">+0.8% 전월 대비</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>광고 성과 추이</CardTitle>
              <CardDescription>최근 6개월간의 광고 성과 추이입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>채널별 성과</CardTitle>
                <CardDescription>광고 채널별 성과 비교입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChannelPerformance />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI 최적화 제안</CardTitle>
                <CardDescription>AI가 분석한 광고 최적화 방안입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <h3 className="font-medium">네이버 검색 광고 키워드 ���장</h3>
                    <p className="text-sm text-gray-600">'제철 과일', '산지 직송' 키워드 추가 시 15% 성과 향상 예상</p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <h3 className="font-medium">페이스북 타겟팅 최적화</h3>
                    <p className="text-sm text-gray-600">35-45세 여성 타겟으로 변경 시 CPA 20% 감소 예상</p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-2">
                    <h3 className="font-medium">구글 광고 예산 재분배</h3>
                    <p className="text-sm text-gray-600">주말 시간대 예산 30% 증액 시 ROAS 25% 향상 예상</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button>AI 최적화 적용</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels">
          <Card>
            <CardHeader>
              <CardTitle>채널별 상세 분석</CardTitle>
              <CardDescription>각 광고 채널의 상세 성과를 분석합니다.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">채널별 상세 분석 준비 중입니다.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience">
          <Card>
            <CardHeader>
              <CardTitle>고객 인사이트</CardTitle>
              <CardDescription>광고를 통해 유입된 고객의 특성을 분석합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <AudienceInsights />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>AI 추천 최적화</CardTitle>
              <CardDescription>AI가 분석한 광고 최적화 방안을 제시합니다.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">AI 추천 최적화 준비 중입니다.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
