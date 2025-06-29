"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AssignmentSubmission } from "./assignment-submission"
import { FileText, Calendar, Upload, CheckCircle, MessageSquare } from "lucide-react"

// 샘플 데이터
const assignmentData = {
  week1: [
    {
      id: "w1-1",
      title: "농산물 시장 조사 보고서",
      description: "국내 농산물 시장의 현황과 트렌드를 조사하여 보고서로 작성해주세요.",
      dueDate: "2023-05-10",
      materials: [
        { name: "시장조사_가이드라인.pdf", size: "1.2MB" },
        { name: "참고자료_농산물시장동향.pptx", size: "3.5MB" },
      ],
      status: "submitted",
      submittedDate: "2023-05-08",
      feedback: {
        content:
          "시장 조사가 매우 체계적으로 잘 되었습니다. 특히 소비자 트렌드 분석 부분이 ��상적이었습니다. 다만, 지역별 특성에 대한 분석이 조금 더 필요해 보입니다.",
        rating: 4,
        date: "2023-05-12",
      },
    },
    {
      id: "w1-2",
      title: "농산물 유통 체계 분석",
      description: "농산물의 생산자부터 소비자까지 이어지는 유통 체계를 분석하고 개선점을 제안해주세요.",
      dueDate: "2023-05-15",
      materials: [{ name: "유통체계_분석_템플릿.docx", size: "0.8MB" }],
      status: "pending",
      submittedDate: null,
      feedback: null,
    },
  ],
  week2: [
    {
      id: "w2-1",
      title: "농산물 마케팅 전략 수립",
      description: "특정 농산물을 선택하여 온라인 마케팅 전략을 수립해주세요.",
      dueDate: "2023-05-22",
      materials: [{ name: "마케팅_전략_템플릿.pptx", size: "2.1MB" }],
      status: "submitted",
      submittedDate: "2023-05-20",
      feedback: {
        content:
          "창의적인 마케팅 전략이 돋보입니다. SNS 활용 방안이 특히 실용적이었습니다. 예산 계획이 조금 더 구체적이면 좋겠습니다.",
        rating: 5,
        date: "2023-05-24",
      },
    },
  ],
  week3: [
    {
      id: "w3-1",
      title: "농산물 브랜딩 프로젝트",
      description: "지역 특산물을 위한 브랜드 아이덴티티를 개발하고 브랜딩 전략을 수립해주세요.",
      dueDate: "2023-05-29",
      materials: [
        { name: "브랜딩_가이드라인.pdf", size: "1.5MB" },
        { name: "성공사례_분석.pptx", size: "2.8MB" },
      ],
      status: "pending",
      submittedDate: null,
      feedback: null,
    },
  ],
  week4: [
    {
      id: "w4-1",
      title: "농산물 온라인 판매 전략",
      description: "농산물의 온라인 판매를 위한 플랫폼 선정 및 판매 전략을 수립해주세요.",
      dueDate: "2023-06-05",
      materials: [{ name: "온라인_판매_가이드.pdf", size: "1.7MB" }],
      status: "pending",
      submittedDate: null,
      feedback: null,
    },
    {
      id: "w4-2",
      title: "최종 프로젝트: 농산물 판매 사업 계획서",
      description: "특정 농산물을 선택하여 온라인 판매 사업 계획서를 작성해주세요.",
      dueDate: "2023-06-10",
      materials: [
        { name: "사업계획서_템플릿.docx", size: "1.2MB" },
        { name: "재무계획_템플릿.xlsx", size: "0.9MB" },
      ],
      status: "pending",
      submittedDate: null,
      feedback: null,
    },
  ],
}

export function AssignmentList() {
  const [activeTab, setActiveTab] = useState("week1")
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)

  const handleSubmit = (assignment: any) => {
    setSelectedAssignment(assignment)
  }

  const closeSubmissionModal = () => {
    setSelectedAssignment(null)
  }

  return (
    <>
      <Tabs defaultValue="week1" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="week1">1주차</TabsTrigger>
          <TabsTrigger value="week2">2주차</TabsTrigger>
          <TabsTrigger value="week3">3주차</TabsTrigger>
          <TabsTrigger value="week4">4주차</TabsTrigger>
        </TabsList>

        {Object.entries(assignmentData).map(([week, assignments]) => (
          <TabsContent key={week} value={week} className="space-y-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription className="mt-2">{assignment.description}</CardDescription>
                    </div>
                    <Badge variant={assignment.status === "submitted" ? "success" : "outline"}>
                      {assignment.status === "submitted" ? "제출완료" : "미제출"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>마감일: {assignment.dueDate}</span>
                    {assignment.submittedDate && (
                      <span className="ml-4 flex items-center text-green-600">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        제출일: {assignment.submittedDate}
                      </span>
                    )}
                  </div>

                  {assignment.materials.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">첨부자료</h4>
                      <div className="grid gap-2">
                        {assignment.materials.map((material, idx) => (
                          <div key={idx} className="flex items-center justify-between rounded-md border p-2 text-sm">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{material.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{material.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 피드백 섹션 추가 */}
                  {assignment.feedback && (
                    <div className="mt-4 space-y-2">
                      <h4 className="flex items-center text-sm font-medium">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        강사 피드백
                        <span className="ml-2 text-xs text-muted-foreground">({assignment.feedback.date})</span>
                      </h4>
                      <div className="rounded-md bg-muted p-3 text-sm">
                        <div className="mb-2 flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < assignment.feedback.rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p>{assignment.feedback.content}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleSubmit(assignment)}
                    variant={assignment.status === "submitted" ? "outline" : "default"}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {assignment.status === "submitted" ? "다시 제출하기" : "과제 제출하기"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {selectedAssignment && <AssignmentSubmission assignment={selectedAssignment} onClose={closeSubmissionModal} />}
    </>
  )
}
