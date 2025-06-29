"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { getTemplateById } from "@/lib/supabase"
import { DEFAULT_CANVAS_HEIGHT } from "@/constants/page-builder-config"

// 실제 OpenAI API를 사용하는 generateAIPageFromTemplate 함수
async function generateAIPageFromTemplate(baseTemplate: any, keyword: string, templateName?: string): Promise<any> {
  console.log(
    `[AI_GEN_HOOK] generateAIPageFromTemplate 호출. 키워드: "${keyword}", 템플릿: "${templateName || "이름 없음"}"`,
  )

  if (!baseTemplate || !baseTemplate.elements || !Array.isArray(baseTemplate.elements)) {
    console.warn("[AI_GEN_HOOK] baseTemplate.elements가 유효하지 않음. 원본 반환 시도.")
    return {
      elements: baseTemplate?.elements || [],
      canvasHeight: baseTemplate?.canvasHeight || baseTemplate?.canvasSize?.height || DEFAULT_CANVAS_HEIGHT,
      backgroundColor: baseTemplate?.backgroundColor || "#FFFFFF",
      ...baseTemplate,
    }
  }

  try {
    // OpenAI API 호출 - 서버 액션에서 이미 모든 처리를 완료함
    const { generatePageWithAI } = await import("@/app/actions/openai")
    const updatedTemplate = await generatePageWithAI(baseTemplate, keyword)

    console.log("[AI_GEN_HOOK] 서버 액션에서 반환된 업데이트된 템플릿:", updatedTemplate)

    // 서버 액션에서 이미 키워드와 AI 카피가 모두 적용된 템플릿을 반환하므로 그대로 사용
    return updatedTemplate
  } catch (error) {
    console.error("[AI_GEN_HOOK] OpenAI API 호출 중 오류:", error)
    // 오류 발생 시 기본 키워드만 메인제목에 적용
    const newElements = baseTemplate.elements.map((el: any) => {
      if (typeof el.content === "string" && el.content === "메인제목") {
        return { ...el, content: keyword }
      }
      return el
    })

    return {
      ...baseTemplate,
      elements: newElements,
    }
  }
}

interface UseAIGenerationParams {
  applyTemplate: (templateObject: any, isFromAI: boolean) => void
}

export function useAIGeneration({ applyTemplate }: UseAIGenerationParams) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingStep, setLoadingStep] = useState<"copywriting" | "image" | null>(null)
  const [showKeywordChat, setShowKeywordChat] = useState(false)
  const [showTemplateChat, setShowTemplateChat] = useState(false)
  const [currentKeyword, setCurrentKeyword] = useState<string>("")
  const [aiButtonRef, setAiButtonRef] = useState<React.RefObject<HTMLButtonElement> | null>(null)

  const handleAIButtonClick = useCallback(() => {
    console.log("[AI_GEN_HOOK] handleAIButtonClick 호출")
    setShowKeywordChat(true)
    setShowTemplateChat(false)
  }, [])

  const handleKeywordSubmit = useCallback((keyword: string) => {
    console.log("[AI_GEN_HOOK] handleKeywordSubmit 호출. 키워드:", keyword)

    // 키워드를 localStorage에 저장
    localStorage.setItem("aiGenerationKeyword", keyword)
    localStorage.setItem("currentKeyword", keyword)
    localStorage.setItem("lastSearchKeyword", keyword)

    setCurrentKeyword(keyword)
    setShowKeywordChat(false)
    setShowTemplateChat(true)
  }, [])

  const handleCloseChat = useCallback(() => {
    console.log("[AI_GEN_HOOK] handleCloseChat 호출")
    setShowKeywordChat(false)
    setShowTemplateChat(false)
  }, [])

  const handleTemplateBack = useCallback(() => {
    console.log("[AI_GEN_HOOK] handleTemplateBack 호출")
    setShowTemplateChat(false)
    setShowKeywordChat(true)
  }, [])

  const handleTemplateSelect = useCallback(
    async (templateId: number) => {
      console.log(`[AI_GEN_HOOK] handleTemplateSelect 함수 호출 시작됨. templateId: ${templateId}`)
      if (!currentKeyword) {
        console.warn("[AI_GEN_HOOK] 키워드 없음. 경고창 표시.")
        alert("키워드를 먼저 입력해주세요.")
        return
      }

      // 키워드를 다시 한번 저장
      localStorage.setItem("aiGenerationKeyword", currentKeyword)
      localStorage.setItem("currentKeyword", currentKeyword)

      setIsGenerating(true)
      setLoadingStep("copywriting")
      setShowTemplateChat(false)

      try {
        console.log(`[AI_GEN_HOOK] getTemplateById(${templateId}) 호출`)
        const baseTemplateObject = await getTemplateById(templateId)
        console.log("[AI_GEN_HOOK] getTemplateById 반환 값:", JSON.stringify(baseTemplateObject, null, 2))

        if (!baseTemplateObject) {
          throw new Error("템플릿 데이터를 불러오는데 실패했습니다.")
        }

        // AI 생성 시작 전에 image 단계로 변경
        setLoadingStep("image")

        const generatedPageObject = await generateAIPageFromTemplate(
          baseTemplateObject,
          currentKeyword,
          baseTemplateObject.name,
        )
        console.log(
          "[AI_GEN_HOOK] generateAIPageFromTemplate 에서 반환된 최종 객체:",
          JSON.stringify(generatedPageObject, null, 2),
        )

        if (!generatedPageObject || !Array.isArray(generatedPageObject.elements)) {
          throw new Error("페이지 생성에 실패했거나 결과 데이터 형식이 올바르지 않습니다.")
        }

        console.log("[AI_GEN_HOOK] applyTemplate 호출 직전, 전달할 객체:", JSON.stringify(generatedPageObject, null, 2))
        console.log("[AI_GEN_HOOK] 호출하려는 applyTemplate 함수:", applyTemplate)

        if (typeof applyTemplate === "function") {
          applyTemplate(generatedPageObject, true)
          console.log("[AI_GEN_HOOK] 페이지 적용 완료 (applyTemplate 호출됨)")
        } else {
          console.error("[AI_GEN_HOOK] 오류: applyTemplate이 함수가 아닙니다!", applyTemplate)
          throw new Error("템플릿 적용 함수(applyTemplate)가 유효하지 않습니다.")
        }
      } catch (error) {
        console.error("[AI_GEN_HOOK] 페이지 생성 과정 중 오류 발생:", error)
        alert(`오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`)
      } finally {
        setIsGenerating(false)
        setLoadingStep(null)
      }
    },
    [currentKeyword, applyTemplate],
  )

  return {
    isGenerating,
    loadingStep,
    showKeywordChat,
    setShowKeywordChat,
    showTemplateChat,
    setShowTemplateChat,
    currentKeyword,
    setCurrentKeyword,
    aiButtonRef,
    setAiButtonRef,
    handleAIButtonClick,
    handleKeywordSubmit,
    handleCloseChat,
    handleTemplateSelect,
    handleTemplateBack,
  }
}

export default useAIGeneration
