"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface KeywordInputModalProps {
  onSubmit: (keyword: string) => void
  onClose: () => void
}

export function KeywordInputModal({ onSubmit, onClose }: KeywordInputModalProps) {
  const [keyword, setKeyword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyword.trim()) return

    setIsLoading(true)
    // 실제 구현에서는 여기서 API 호출 등이 있을 수 있음
    setTimeout(() => {
      onSubmit(keyword)
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-w-full shadow-xl">
        <h2 className="text-xl font-bold mb-4">상세페이지 키워드 입력</h2>
        <p className="text-gray-600 mb-4">
          상세페이지를 생성할 상품의 키워드를 입력해주세요.
          <br />
          예: 유기농 딸기, 제주 감귤, 친환경 쌀 등
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="상품 키워드를 입력하세요"
            className="mb-4"
            autoFocus
          />

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose} type="button">
              취소
            </Button>
            <Button
              type="submit"
              disabled={!keyword.trim() || isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  처리 중...
                </>
              ) : (
                "다음"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
