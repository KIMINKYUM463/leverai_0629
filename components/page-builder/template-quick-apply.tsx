"use client"

import { Button } from "@/components/ui/button"
import { generatePremiumTemplate } from "@/lib/template-generator"

interface TemplateQuickApplyProps {
  onApplyTemplate: (elements: any[]) => void
}

export function TemplateQuickApply({ onApplyTemplate }: TemplateQuickApplyProps) {
  const handleApplyPremiumTemplate = () => {
    const elements = generatePremiumTemplate()
    onApplyTemplate(elements)
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white font-medium mb-3">빠른 템플릿 적용</h3>
      <div className="space-y-2">
        <Button onClick={handleApplyPremiumTemplate} className="w-full bg-red-600 hover:bg-red-700 text-white">
          🎨 Premium 디자인 적용
        </Button>
        <p className="text-xs text-gray-400">제공해주신 이미지와 동일한 디자인을 자동으로 생성합니다</p>
      </div>
    </div>
  )
}
