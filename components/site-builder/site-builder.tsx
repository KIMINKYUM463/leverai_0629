import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SitePreview } from "./site-preview"

export function SiteBuilder() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI B2B 사이트 생성기</h2>
        <p className="text-muted-foreground">B2B 전용 판매 사이트를 자동으로 생성하세요.</p>
      </div>

      <Tabs defaultValue="design" className="space-y-4">
        <TabsList>
          <TabsTrigger value="design">디자인</TabsTrigger>
          <TabsTrigger value="products">상품 관리</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
          <TabsTrigger value="preview">미리보기</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-12">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>사이트 정보</CardTitle>
                <CardDescription>B2B 사이트의 기본 정보를 입력하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">사이트 이름</Label>
                    <Input id="site-name" placeholder="예: 농부네 직거래 장터" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-description">사이트 설명</Label>
                    <Textarea id="site-description" placeholder="사이트에 대한 간략한 설명을 입력하세요." rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-logo">로고 업로드</Label>
                    <Input id="site-logo" type="file" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-color">주 색상</Label>
                    <div className="flex gap-2">
                      <Input id="site-color" type="color" className="w-12 h-10" defaultValue="#0ea5e9" />
                      <Input defaultValue="#0ea5e9" className="flex-1" />
                    </div>
                  </div>
                  <Button className="w-full">저장</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="md:col-span-8">
              <CardHeader>
                <CardTitle>템플릿 선택</CardTitle>
                <CardDescription>사이트 템플릿을 선택하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="border rounded-md overflow-hidden cursor-pointer hover:border-teal-500 transition-colors"
                    >
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-500">템플릿 {i}</span>
                      </div>
                      <div className="p-2 text-center">템플릿 {i}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button>템플릿 적용</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>상품 관리</CardTitle>
              <CardDescription>B2B 사이트에 표시할 상품을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">상품 관리 기능 준비 중입니다.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>사이트 설정</CardTitle>
              <CardDescription>B2B 사이트의 세부 설정을 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">사이트 설정 기능 준비 중입니다.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>사이트 미리보기</CardTitle>
              <CardDescription>생성된 B2B 사이트를 미리 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <SitePreview />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
