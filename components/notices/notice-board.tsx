"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Pin, Clock, Eye, MessageSquare } from "lucide-react"

// 공지사항 데이터 타입
type Notice = {
  id: number
  title: string
  content: string
  category: string
  isPinned: boolean
  date: string
  views: number
  comments: number
}

// 샘플 공지사항 데이터
const sampleNotices: Notice[] = []

export function NoticeBoard() {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // 카테고리별 공지사항 필터링
  const filteredNotices =
    activeTab === "all" ? sampleNotices : sampleNotices.filter((notice) => notice.category.toLowerCase() === activeTab)

  // 공지사항 정렬 (고정 공지 먼저, 그 다음 날짜순)
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">공지사항</h1>
          <p className="text-gray-500">중요 소식과 업데이트 정보를 확인하세요</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <PlusCircle className="mr-2 h-4 w-4" />새 공지 작성
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-md">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="업데이트">업데이트</TabsTrigger>
          <TabsTrigger value="세미나">세미나</TabsTrigger>
          <TabsTrigger value="가이드">가이드</TabsTrigger>
          <TabsTrigger value="공지">공지</TabsTrigger>
        </TabsList>
      </Tabs>

      {selectedNotice ? (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                    {selectedNotice.category}
                  </Badge>
                  {selectedNotice.isPinned && (
                    <Badge variant="secondary" className="bg-red-50 text-red-600 border-red-200">
                      <Pin className="h-3 w-3 mr-1" /> 고정 공지
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{selectedNotice.title}</CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <Clock className="h-4 w-4 mr-1" /> {selectedNotice.date}
                  <span className="mx-2">•</span>
                  <Eye className="h-4 w-4 mr-1" /> 조회 {selectedNotice.views}
                  <span className="mx-2">•</span>
                  <MessageSquare className="h-4 w-4 mr-1" /> 댓글 {selectedNotice.comments}
                </CardDescription>
              </div>
              <Button variant="ghost" onClick={() => setSelectedNotice(null)}>
                목록으로
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>{selectedNotice.content}</p>
              <p className="mt-4">
                자세한 내용은 첨부된 문서를 참고해주세요. 문의사항이 있으시면 댓글이나 AI CS를 통해 문의해주시기
                바랍니다.
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline">이전 글</Button>
              <Button variant="outline">다음 글</Button>
            </div>
            <Button variant="default" className="bg-teal-600 hover:bg-teal-700">
              댓글 작성
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          {sortedNotices.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">등록된 공지사항이 없습니다</h3>
                <p className="text-gray-500">새로운 공지사항을 작성해보세요.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {sortedNotices.map((notice) => (
                    <div
                      key={notice.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${notice.isPinned ? "bg-teal-50/30" : ""}`}
                      onClick={() => setSelectedNotice(notice)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                          {notice.category}
                        </Badge>
                        {notice.isPinned && (
                          <Badge variant="secondary" className="bg-red-50 text-red-600 border-red-200">
                            <Pin className="h-3 w-3 mr-1" /> 고정 공지
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{notice.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" /> {notice.date}
                        <span className="mx-2">•</span>
                        <Eye className="h-3 w-3 mr-1" /> 조회 {notice.views}
                        <span className="mx-2">•</span>
                        <MessageSquare className="h-3 w-3 mr-1" /> 댓글 {notice.comments}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4 flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    이전
                  </Button>
                  <Button variant="outline" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    다음
                  </Button>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <PlusCircle className="mr-2 h-4 w-4" />새 공지 작성
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
