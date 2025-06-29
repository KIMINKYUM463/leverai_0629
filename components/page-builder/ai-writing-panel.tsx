"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, X, RefreshCw, ArrowRight, Lightbulb, Wand2 } from "lucide-react"

interface AIWritingPanelProps {
  onClose: () => void
  onApplyText: (text: string) => void
  initialText: string
  elementType: string
  position?: { top: number; left: number }
}

export function AIWritingPanel({ onClose, onApplyText, initialText, elementType, position }: AIWritingPanelProps) {
  const [prompt, setPrompt] = useState("")
  const [generatedText, setGeneratedText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // 프롬프트 템플릿
  const promptTemplates = [
    { icon: <Lightbulb className="h-3 w-3" />, text: "제품 장점 설명" },
    { icon: <Wand2 className="h-3 w-3" />, text: "사용 방법 안내" },
    { icon: <Sparkles className="h-3 w-3" />, text: "매력적인 제목" },
  ]

  // AI 글쓰기 생성 함수
  const generateText = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    try {
      // 실제 API 연동 시 여기에 AI 서비스 호출 코드 추가
      // 현재는 시뮬레이션을 위해 타임아웃 사용
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 예시 텍스트 생성 (실제로는 AI API 응답으로 대체)
      let result = ""

      if (elementType === "heading1" || elementType === "heading2" || elementType === "heading3") {
        result = `${prompt}에 대한 매력적인 제목`
      } else if (prompt.includes("장점")) {
        result = `이 제품의 주요 장점:\n\n1. 뛰어난 내구성으로 오랜 사용 가능\n2. 인체공학적 디자인으로 편안한 사용감\n3. 에너지 효율성이 높아 경제적\n4. 세련된 디자인으로 어디에나 잘 어울림\n5. 스마트 기능으로 편리한 사용성 제공`
      } else if (prompt.includes("설명")) {
        result = `이 제품은 최신 기술과 세련된 디자인이 조화롭게 어우러진 혁신적인 솔루션입니다. 사용자의 니즈를 완벽하게 충족시키기 위해 개발된 이 제품은 일상생활에 편리함과 효율성을 더해줍니다. 고품질 소재로 제작되어 내구성이 뛰어나며, 직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.`
      } else {
        result = `${prompt}에 대한 AI 생성 텍스트입니다. 이 텍스트는 사용자의 요청에 맞게 생성되었으며, 상세페이지에 적합한 내용을 담고 있습니다. 실제 서비스에서는 더 정교한 AI 모델을 통해 맞춤형 콘텐츠가 제공될 것입니다.`
      }

      setGeneratedText(result)
    } catch (error) {
      console.error("텍스트 생성 오류:", error)
      alert("텍스트 생성 중 오류가 발생했습니다.")
    } finally {
      setIsGenerating(false)
    }
  }

  // 생성된 텍스트 적용
  const applyGeneratedText = () => {
    if (generatedText) {
      onApplyText(generatedText)
    }
  }

  // 프롬프트 템플릿 적용
  const applyPromptTemplate = (template: string) => {
    setPrompt(template)
  }

  return (
    <div
      className="w-72 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
      style={{
        position: "absolute",
        top: position?.top || 0,
        left: position?.left || 0,
      }}
    >
      <div className="flex items-center justify-between bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 mr-2" />
          <h3 className="font-medium">AI 글쓰기</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-teal-700/30" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm text-gray-700 mb-1 font-medium">어떤 내용의 텍스트가 필요하신가요?</p>
          <Textarea
            placeholder="예: 제품의 주요 장점을 설명해주세요"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-16 text-black resize-none border-teal-100 focus:border-teal-300 text-sm"
          />
        </div>

        {/* 프롬프트 템플릿 */}
        <div className="flex flex-wrap gap-1">
          {promptTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => applyPromptTemplate(template.text)}
              className="inline-flex items-center text-xs bg-teal-50 hover:bg-teal-100 text-teal-700 px-2 py-1 rounded"
            >
              {template.icon}
              <span className="ml-1">{template.text}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={generateText}
            disabled={isGenerating || !prompt.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm h-8"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                생성 중...
              </>
            ) : (
              <>
                <Sparkles className="h-3 w-3 mr-2" />
                텍스트 생성
              </>
            )}
          </Button>
        </div>

        {generatedText && (
          <div className="mt-3">
            <p className="text-sm text-gray-700 mb-1 font-medium">생성된 텍스트:</p>
            <div className="border border-gray-200 rounded p-3 bg-gray-50 text-sm text-gray-800 max-h-40 overflow-y-auto whitespace-pre-wrap">
              {generatedText}
            </div>

            <div className="flex justify-end mt-3">
              <Button onClick={applyGeneratedText} className="bg-blue-600 hover:bg-blue-700 text-white text-sm h-8">
                적용하기
                <ArrowRight className="h-3 w-3 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
