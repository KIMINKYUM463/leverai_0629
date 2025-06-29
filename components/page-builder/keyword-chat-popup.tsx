"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, X } from "lucide-react"

interface KeywordChatPopupProps {
  onSubmit: (keyword: string) => void
  onClose: () => void
}

export function KeywordChatPopup({ onSubmit, onClose }: KeywordChatPopupProps) {
  const [keyword, setKeyword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!keyword.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      onSubmit(keyword)
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="bg-white rounded-lg shadow-xl w-[400px] overflow-hidden">
      <div className="bg-teal-600 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">상세페이지 키워드 입력</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4">
          상세페이지를 생성할 상품의 키워드를 입력해주세요.
          <br />
          예: 유기농 딸기, 제주 감귤, 친환경 쌀, <span className="font-bold text-black">사과</span> 등
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="상품 키워드를 입력하세요"
            className="mb-4 border-gray-300 text-black"
            autoFocus
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} type="button" className="text-gray-600">
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
