"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Tag, Wand2 } from "lucide-react"

interface MetadataEditorProps {
  element: any
  onUpdateElement: (updates: any) => void
  onClose: () => void
}

export function MetadataEditor({ element, onUpdateElement, onClose }: MetadataEditorProps) {
  const [metadata, setMetadata] = useState(element.metadata || {})
  const [textMetadata, setTextMetadata] = useState(element.textMetadata || {})
  const [imageMetadata, setImageMetadata] = useState(element.imageMetadata || {})

  const handleSave = () => {
    onUpdateElement({
      metadata,
      textMetadata: element.type === "text" ? textMetadata : undefined,
      imageMetadata: element.type === "image" || element.type === "image-frame" ? imageMetadata : undefined,
    })
    onClose()
  }

  const roleOptions = [
    { value: "main-title", label: "메인 제목" },
    { value: "hook-title", label: "후킹 제목" },
    { value: "sub-title", label: "부제목" },
    { value: "description", label: "설명" },
    { value: "price", label: "가격" },
    { value: "benefit", label: "혜택" },
    { value: "review", label: "리뷰" },
    { value: "cta", label: "행동유도" },
    { value: "feature", label: "특징" },
    { value: "warning", label: "주의사항" },
    { value: "guarantee", label: "보장" },
  ]

  const categoryOptions = [
    { value: "product-info", label: "상품 정보" },
    { value: "marketing", label: "마케팅" },
    { value: "social-proof", label: "사회적 증명" },
    { value: "pricing", label: "가격" },
    { value: "features", label: "특징" },
    { value: "safety", label: "안전성" },
    { value: "ordering", label: "주문" },
  ]

  const imageTypeOptions = [
    { value: "product-main", label: "메인 상품 이미지" },
    { value: "product-detail", label: "상품 상세 이미지" },
    { value: "lifestyle", label: "라이프스타일 이미지" },
    { value: "comparison", label: "비교 이미지" },
    { value: "infographic", label: "인포그래픽" },
    { value: "testimonial", label: "후기 이미지" },
    { value: "background", label: "배경 이미지" },
  ]

  return (
    <div className="h-full bg-[#2A2A2A] border border-gray-700 rounded-lg shadow-2xl overflow-y-auto">
      <div className="p-4 border-b border-gray-700 bg-[#1E1E1E] rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 size={16} className="text-blue-400" />
            <h3 className="font-medium text-white">AI 메타태그 설정</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white" onClick={onClose}>
            <X size={14} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 기본 메타데이터 */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <Tag size={14} />
            기본 설정
          </h4>

          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">AI 태그</Label>
            <Input
              value={metadata.aiTag || ""}
              onChange={(e) => setMetadata({ ...metadata, aiTag: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="예: main-product-title"
            />
            <p className="text-xs text-gray-400 mt-1">AI가 이 요소를 찾기 위한 고유 식별자</p>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">역할</Label>
            <Select value={metadata.role || ""} onValueChange={(value) => setMetadata({ ...metadata, role: value })}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="역할 선택" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {roleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">카테고리</Label>
            <Select
              value={metadata.category || ""}
              onValueChange={(value) => setMetadata({ ...metadata, category: value })}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="aiReplaceable"
              checked={metadata.aiReplaceable || false}
              onCheckedChange={(checked) => setMetadata({ ...metadata, aiReplaceable: checked })}
            />
            <Label htmlFor="aiReplaceable" className="text-sm text-gray-300">
              AI 자동 대체 허용
            </Label>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">우선순위</Label>
            <Input
              type="number"
              value={metadata.priority || 1}
              onChange={(e) => setMetadata({ ...metadata, priority: Number.parseInt(e.target.value) })}
              className="bg-gray-800 border-gray-600 text-white"
              min="1"
              max="10"
            />
            <p className="text-xs text-gray-400 mt-1">낮을수록 먼저 처리됩니다 (1-10)</p>
          </div>
        </div>

        {/* 텍스트 전용 메타데이터 */}
        {element.type === "text" && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-300">텍스트 설정</h4>

            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">톤앤매너</Label>
              <Select
                value={textMetadata.tone || ""}
                onValueChange={(value) => setTextMetadata({ ...textMetadata, tone: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="톤 선택" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="professional" className="text-white hover:bg-gray-700">
                    전문적
                  </SelectItem>
                  <SelectItem value="friendly" className="text-white hover:bg-gray-700">
                    친근한
                  </SelectItem>
                  <SelectItem value="urgent" className="text-white hover:bg-gray-700">
                    긴급한
                  </SelectItem>
                  <SelectItem value="trustworthy" className="text-white hover:bg-gray-700">
                    신뢰할 수 있는
                  </SelectItem>
                  <SelectItem value="exciting" className="text-white hover:bg-gray-700">
                    흥미진진한
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">최대 글자 수</Label>
              <Input
                type="number"
                value={textMetadata.maxLength || ""}
                onChange={(e) => setTextMetadata({ ...textMetadata, maxLength: Number.parseInt(e.target.value) })}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="예: 50"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">키워드 (쉼표로 구분)</Label>
              <Textarea
                value={textMetadata.keywords?.join(", ") || ""}
                onChange={(e) =>
                  setTextMetadata({ ...textMetadata, keywords: e.target.value.split(",").map((k) => k.trim()) })
                }
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="예: 신선한, 유기농, 건강한"
                rows={2}
              />
            </div>
          </div>
        )}

        {/* 이미지 전용 메타데이터 */}
        {(element.type === "image" || element.type === "image-frame") && (
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-300">이미지 설정</h4>

            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">이미지 타입</Label>
              <Select
                value={imageMetadata.imageType || ""}
                onValueChange={(value) => setImageMetadata({ ...imageMetadata, imageType: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="이미지 타입 선택" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {imageTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">Alt 텍스트 템플릿</Label>
              <Input
                value={imageMetadata.altTextTemplate || ""}
                onChange={(e) => setImageMetadata({ ...imageMetadata, altTextTemplate: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="예: {상품명} 메인 이미지"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="generateAI"
                checked={imageMetadata.generateAI || false}
                onCheckedChange={(checked) => setImageMetadata({ ...imageMetadata, generateAI: checked })}
              />
              <Label htmlFor="generateAI" className="text-sm text-gray-300">
                AI 이미지 생성 허용
              </Label>
            </div>
          </div>
        )}

        {/* 현재 설정된 태그들 표시 */}
        <div className="border-t border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">설정된 태그</h4>
          <div className="flex flex-wrap gap-2">
            {metadata.aiTag && <Badge variant="secondary">AI: {metadata.aiTag}</Badge>}
            {metadata.role && (
              <Badge variant="outline">역할: {roleOptions.find((r) => r.value === metadata.role)?.label}</Badge>
            )}
            {metadata.category && (
              <Badge variant="outline">
                카테고리: {categoryOptions.find((c) => c.value === metadata.category)?.label}
              </Badge>
            )}
            {metadata.aiReplaceable && <Badge className="bg-green-600">AI 대체 가능</Badge>}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} className="flex-1">
            저장
          </Button>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </div>
  )
}
