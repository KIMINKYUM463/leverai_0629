"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, X } from "lucide-react"

interface TemplateChatPopupProps {
  keyword: string
  onSelect: (templateId: number, elements?: any[]) => void
  onBack: () => void
  onClose: () => void
}

// 템플릿 데이터를 직접 하드코딩 - 모든 템플릿 삭제하고 '템플릿1'만 추가
const templates = [
  {
    id: 1,
    name: "템플릿1",
    description: "기본 템플릿입니다",
    image: "/basic-template.png",
  },
]

export function TemplateChatPopup({ keyword, onSelect, onBack, onClose }: TemplateChatPopupProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1) // 기본값으로 템플릿1 선택
  const [isLoading, setIsLoading] = useState(false)

  const handleSelect = async () => {
    setIsLoading(true)

    try {
      // JSON 파일에서 템플릿 데이터 로드
      const response = await fetch(`/template${selectedTemplate}.json`)
      const templateData = await response.json()

      // 각 요소에 새로운 고유 ID 생성
      const elementsWithNewIds = templateData.elements.map((element: any) => ({
        ...element,
        id: `${element.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        // 그룹 관련 속성 제거
        groupId: undefined,
        isGrouped: false,
        parentId: undefined,
        children: undefined,
      }))

      // 템플릿 적용
      onSelect(selectedTemplate, elementsWithNewIds)
    } catch (error) {
      console.error("템플릿 로드 실패:", error)
      // 기존 방식으로 폴백
      onSelect(selectedTemplate)
    }

    setIsLoading(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-xl w-[500px] overflow-hidden">
      <div className="bg-teal-600 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">템플릿 선택</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4">
          <span className="font-semibold text-black">"{keyword}"</span> 키워드에 맞는 템플릿을 선택해주세요.
        </p>

        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 mb-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-2 cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id ? "border-teal-500 bg-teal-50" : "border-gray-200"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="aspect-video mb-2 overflow-hidden rounded-md bg-gray-100">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-sm">{template.name}</h3>
              <p className="text-xs text-gray-500">{template.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-3 border-t border-gray-200">
          <Button variant="outline" onClick={onBack} className="text-gray-600" size="sm">
            <ArrowLeft size={16} className="mr-1" />
            이전
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="text-gray-600" size="sm">
              취소
            </Button>
            <Button
              onClick={handleSelect}
              disabled={isLoading}
              className="bg-teal-600 hover:bg-teal-700 text-white"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  생성 중...
                </>
              ) : (
                "템플릿 선택"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
