"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, X, FileText, Check, MessageSquare } from "lucide-react"

interface AssignmentSubmissionProps {
  assignment: {
    id: string
    title: string
    description: string
    feedback?: {
      content: string
      rating: number
      date: string
    } | null
  }
  onClose: () => void
}

export function AssignmentSubmission({ assignment, onClose }: AssignmentSubmissionProps) {
  const [files, setFiles] = useState<File[]>([])
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // 실제 구현에서는 여기서 API 호출을 통해 과제를 제출합니다
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // 제출 완료 후 3초 후에 창을 닫습니다
      setTimeout(() => {
        onClose()
      }, 3000)
    }, 2000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>과제 제출: {assignment.title}</DialogTitle>
          <DialogDescription>과제 파일과 함께 제출 코멘트를 작성해주세요.</DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <>
            {assignment.feedback && (
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFeedback(!showFeedback)}
                  className="gap-1 mb-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  {showFeedback ? "피드백 숨기기" : "이전 피드백 보기"}
                </Button>

                {showFeedback && (
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
                      <span className="ml-2 text-xs text-muted-foreground">({assignment.feedback.date})</span>
                    </div>
                    <p>{assignment.feedback.content}</p>
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="files">과제 파일</Label>
                <div className="flex items-center gap-2">
                  <Input id="files" type="file" multiple onChange={handleFileChange} className="flex-1" />
                </div>

                {files.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-6 w-6">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">코멘트 (선택사항)</Label>
                <Textarea
                  id="comment"
                  placeholder="과제에 대한 추가 설명이나 질문이 있으면 작성해주세요."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button onClick={handleSubmit} disabled={files.length === 0 || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    제출 중...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    과제 제출
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">과제가 성공적으로 제출되었습니다!</h3>
            <p className="text-muted-foreground mb-4">제출한 과제는 담당 강사가 검토 후 피드백을 드릴 예정입니다.</p>
            <Button onClick={onClose}>확인</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
