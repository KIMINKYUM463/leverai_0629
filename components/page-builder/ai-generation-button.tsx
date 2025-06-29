"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface AIGenerationButtonProps {
  handleAIButtonClick: () => void
  showKeywordChat: boolean
  showTemplateChat: boolean
  aiButtonRef: React.RefObject<HTMLButtonElement>
}

export function AIGenerationButton({
  handleAIButtonClick,
  showKeywordChat,
  showTemplateChat,
  aiButtonRef,
}: AIGenerationButtonProps) {
  return (
    <div className="fixed top-20 right-6 z-40">
      <Button
        ref={aiButtonRef}
        onClick={handleAIButtonClick}
        className={`rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          showKeywordChat || showTemplateChat ? "bg-teal-700" : "bg-teal-600 hover:bg-teal-700"
        } text-white px-4 py-2`}
      >
        <Sparkles className="h-5 w-5 mr-2" />
        <span className="text-white">AI 상세페이지 생성</span>
      </Button>
    </div>
  )
}

/* ──────────────────────────────────────────── */
/* NEW: add default export so either            */
/* `import AIGenerationButton from ...`         */
/* or `import { AIGenerationButton } from ...`  */
/* will both work.                              */
/* ──────────────────────────────────────────── */
export default AIGenerationButton
