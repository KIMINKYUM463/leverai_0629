"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { getTemplates } from "@/lib/supabase"

interface TemplateSelectionModalProps {
  keyword: string
  onSelect: (templateData: any) => void // 변경됨
  onBack: () => void
  onClose: () => void
}

interface Template {
  id: number
  name: string
  description: string
  preview_image: string
  template_data: any
  created_at: string
}

export function TemplateSelectionModal({ keyword, onSelect, onBack, onClose }: TemplateSelectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true)

  // Supabase에서 템플릿 목록 가져오기
  useEffect(() => {
    async function fetchTemplates() {
      setIsLoadingTemplates(true)
      try {
        const templatesData = await getTemplates()
        setTemplates(templatesData)
        // 첫 번째 템플릿을 기본 선택
        if (templatesData.length > 0) {
          setSelectedTemplate(templatesData[0].id)
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error)
      } finally {
        setIsLoadingTemplates(false)
      }
    }

    fetchTemplates()
  }, [])

  const handleSelect = () => {
    if (selectedTemplate === null) return
    onSelect(selectedTemplate) // id 만 전달
  }

  if (isLoadingTemplates) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[800px] max-w-full max-h-[90vh] shadow-xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>템플릿을 불러오는 중...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-w-full max-h-[90vh] shadow-xl overflow-hidden flex flex-col">
        <h2 className="text-xl font-bold mb-2">템플릿 선택</h2>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">"{keyword}"</span> 키워드에 맞는 템플릿을 선택해주세요.
        </p>

        <div className="overflow-y-auto grid grid-cols-2 gap-4 mb-4 pr-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id ? "border-teal-500 bg-teal-50" : "border-gray-200"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div className="aspect-video mb-2 overflow-hidden rounded-md bg-gray-100">
                <img
                  src="/template1-new-mobile-preview.png"
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-gray-500">템플릿1</p>
            </div>
          ))}
        </div>

        {templates.length === 0 && <div className="text-center py-8 text-gray-500">등록된 템플릿이 없습니다.</div>}

        <div className="flex justify-between mt-auto pt-4 border-t">
          <Button variant="outline" onClick={onBack} className="text-black">
            이전
          </Button>
          <div className="flex gap-2">
            <Button className="text-black" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button
              onClick={handleSelect}
              disabled={selectedTemplate === null || isLoading || templates.length === 0}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
