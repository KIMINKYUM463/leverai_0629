"use client"

import { Button } from "@/components/ui/button"
import { Type, Heading1, Heading2, Heading3, Quote, Bold } from "lucide-react"

export function TextPanel({ onAddText }) {
  // 텍스트 스타일 정의
  const textStyles = [
    {
      id: "heading1",
      name: "제목 1",
      icon: Heading1,
      className: "text-4xl font-bold",
      defaultText: "제목을 입력하세요",
    },
    {
      id: "heading2",
      name: "제목 2",
      icon: Heading2,
      className: "text-3xl font-bold",
      defaultText: "부제목을 입력하세요",
    },
    {
      id: "heading3",
      name: "제목 3",
      icon: Heading3,
      className: "text-2xl font-semibold",
      defaultText: "소제목을 입력하세요",
    },
    {
      id: "paragraph",
      name: "본문",
      icon: Type,
      className: "text-base",
      defaultText: "본문 텍스트를 입력하세요",
    },
    {
      id: "bold",
      name: "강조",
      icon: Bold,
      className: "text-base font-bold",
      defaultText: "강조 텍스트를 입력하세요",
    },
    {
      id: "quote",
      name: "인용구",
      icon: Quote,
      className: "text-lg italic border-l-4 border-gray-300 pl-4",
      defaultText: "인용구를 입력하세요",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        {textStyles.map((style) => (
          <Button
            key={style.id}
            variant="outline"
            className="justify-start h-auto py-2 px-3 bg-gray-800 border-gray-700 hover:bg-gray-700 text-left"
            onClick={() => onAddText(style.className, style.name, style.defaultText)}
          >
            <style.icon className="mr-2 h-4 w-4" />
            <div>
              <div className="font-medium text-sm">{style.name}</div>
              <div className={`text-xs text-gray-400 mt-1 ${style.className}`} style={{ fontSize: "0.7rem" }}>
                {style.defaultText}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
