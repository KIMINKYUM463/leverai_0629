"use client"
import { useState, useCallback } from "react"

interface InspectionIssue {
  id: string
  type: "overlap" | "overflow" | "spacing" | "size" | "alignment"
  severity: "low" | "medium" | "high"
  elementId: string
  description: string
  suggestion: string
  autoFixable: boolean
}

export function useAIInspection(elements: any[], setElements: (elements: any[]) => void, canvasHeight: number) {
  const [isInspecting, setIsInspecting] = useState(false)
  const [showInspectionResults, setShowInspectionResults] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [inspectionResults, setInspectionResults] = useState<InspectionIssue[]>([])

  // 템플릿보다 조금 더 크게 점검 영역 설정
  const INSPECTION_WIDTH = 420 // 기존 390px보다 30px 더 크게
  const EXTRA_HEIGHT_MARGIN = 100 // 하단 여백을 더 크게

  // 실제 상세페이지 콘텐츠 길이 계산 (여백을 더 크게)
  const getActualContentHeight = (elements: any[]): number => {
    if (!elements || elements.length === 0) return 0

    let maxY = 0
    elements.forEach((element) => {
      if (element.position && element.size) {
        const elementBottom = element.position.y + element.size.height
        maxY = Math.max(maxY, elementBottom)
      }
    })

    // 하단에 더 큰 여백 추가 (100px)
    return maxY + EXTRA_HEIGHT_MARGIN
  }

  const checkElementOverflow = (
    element: any,
    inspectionWidth: number,
    actualContentHeight: number,
  ): InspectionIssue[] => {
    const issues: InspectionIssue[] = []

    // 점검 영역 너비를 벗어나는지 확인 (더 큰 영역 기준)
    if (element.position.x + element.size.width > inspectionWidth) {
      issues.push({
        id: `overflow-x-${element.id}`,
        type: "overflow",
        severity: "high",
        elementId: element.id,
        description: `${element.type} 요소가 상세페이지 오른쪽 경계를 벗어났습니다.`,
        suggestion: "요소의 크기를 줄이거나 위치를 조정하세요.",
        autoFixable: true,
      })
    }

    // 실제 콘텐츠 영역을 벗어나는지 확인 (더 큰 여백 기준)
    if (element.position.y + element.size.height > actualContentHeight) {
      issues.push({
        id: `overflow-y-${element.id}`,
        type: "overflow",
        severity: "medium",
        elementId: element.id,
        description: `${element.type} 요소가 상세페이지 하단을 벗어났습니다.`,
        suggestion: "요소의 위치를 위로 이동하거나 상세페이지 길이를 늘리세요.",
        autoFixable: true,
      })
    }

    return issues
  }

  const checkElementOverlap = (elements: any[]): InspectionIssue[] => {
    const issues: InspectionIssue[] = []

    for (let i = 0; i < elements.length; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        const elem1 = elements[i]
        const elem2 = elements[j]

        // 겹침 감지 로직
        const overlap = !(
          elem1.position.x + elem1.size.width <= elem2.position.x ||
          elem2.position.x + elem2.size.width <= elem1.position.x ||
          elem1.position.y + elem1.size.height <= elem2.position.y ||
          elem2.position.y + elem2.size.height <= elem1.position.y
        )

        if (overlap) {
          // 텍스트와 다른 요소가 겹치는 경우 더 심각하게 처리
          const severity = elem1.type === "text" || elem2.type === "text" ? "high" : "medium"

          issues.push({
            id: `overlap-${elem1.id}-${elem2.id}`,
            type: "overlap",
            severity,
            elementId: elem1.id,
            description: `${elem1.type} 요소와 ${elem2.type} 요소가 겹쳐있습니다.`,
            suggestion: "요소들의 위치를 조정하여 겹치지 않도록 하세요.",
            autoFixable: true,
          })
        }
      }
    }

    return issues
  }

  const checkTextSize = (element: any): InspectionIssue[] => {
    const issues: InspectionIssue[] = []

    if (element.type === "text") {
      const fontSize = element.computedStyle?.fontSize || 16
      const textLength = element.content?.length || 0

      // 텍스트가 너무 크거나 작은 경우
      if (fontSize > 48) {
        issues.push({
          id: `text-size-large-${element.id}`,
          type: "size",
          severity: "medium",
          elementId: element.id,
          description: "텍스트 크기가 너무 큽니다.",
          suggestion: "가독성을 위해 텍스트 크기를 줄이는 것을 고려하세요.",
          autoFixable: true,
        })
      }

      if (fontSize < 12 && textLength > 10) {
        issues.push({
          id: `text-size-small-${element.id}`,
          type: "size",
          severity: "medium",
          elementId: element.id,
          description: "텍스트 크기가 너무 작습니다.",
          suggestion: "가독성을 위해 텍스트 크기를 키우세요.",
          autoFixable: true,
        })
      }
    }

    return issues
  }

  const checkSpacing = (elements: any[]): InspectionIssue[] => {
    const issues: InspectionIssue[] = []

    // 요소들 간의 간격이 너무 좁은지 확인
    for (let i = 0; i < elements.length; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        const elem1 = elements[i]
        const elem2 = elements[j]

        const distance = Math.sqrt(
          Math.pow(elem1.position.x - elem2.position.x, 2) + Math.pow(elem1.position.y - elem2.position.y, 2),
        )

        if (distance < 20 && distance > 0) {
          issues.push({
            id: `spacing-${elem1.id}-${elem2.id}`,
            type: "spacing",
            severity: "low",
            elementId: elem1.id,
            description: "요소들 간의 간격이 너무 좁습니다.",
            suggestion: "요소들 사이에 충분한 여백을 두세요.",
            autoFixable: true,
          })
        }
      }
    }

    return issues
  }

  const startInspection = useCallback(async () => {
    if (!elements || elements.length === 0) {
      console.log("점검할 요소가 없습니다.")
      return
    }

    setIsInspecting(true)
    setScanProgress(0)
    setInspectionResults([])

    // 실제 상세페이지 콘텐츠 길이 계산 (더 큰 여백 포함)
    const actualContentHeight = getActualContentHeight(elements)
    console.log(
      `상세페이지 점검 영역: ${INSPECTION_WIDTH}px × ${actualContentHeight}px (기본 캔버스: 390px × ${canvasHeight}px)`,
    )

    const allIssues: InspectionIssue[] = []
    const totalSteps = elements.length + 3 // 요소별 검사 + 전체 검사 3단계

    try {
      // 단계별 검사 시뮬레이션 (애니메이션 속도 조정)
      for (let step = 0; step < totalSteps; step++) {
        await new Promise((resolve) => setTimeout(resolve, 400)) // 조금 더 천천히

        if (step < elements.length) {
          // 개별 요소 검사 (더 큰 점검 영역 기준)
          const element = elements[step]
          if (element.position && element.size) {
            allIssues.push(...checkElementOverflow(element, INSPECTION_WIDTH, actualContentHeight))
            allIssues.push(...checkTextSize(element))
          }
        } else if (step === elements.length) {
          // 겹침 검사
          allIssues.push(...checkElementOverlap(elements))
        } else if (step === elements.length + 1) {
          // 간격 검사
          allIssues.push(...checkSpacing(elements))
        } else {
          // 최종 검토
          console.log(`상세페이지 점검 완료: ${allIssues.length}개 문제 발견`)
        }

        setScanProgress(((step + 1) / totalSteps) * 100)
      }

      setInspectionResults(allIssues)
      setIsInspecting(false)
      setShowInspectionResults(true)
    } catch (error) {
      console.error("점검 중 오류 발생:", error)
      setIsInspecting(false)
    }
  }, [elements, canvasHeight])

  const closeInspectionResults = useCallback(() => {
    setShowInspectionResults(false)
    setInspectionResults([])
    setScanProgress(0)
  }, [])

  const applyAutoFix = useCallback(
    (fixes: any[]) => {
      const updatedElements = elements.map((element) => {
        const fix = fixes.find((f) => f.elementId === element.id)
        if (!fix) return element

        const updatedElement = { ...element }

        switch (fix.action.type) {
          case "resize":
            updatedElement.size = {
              ...updatedElement.size,
              width: Math.min(fix.action.width, updatedElement.size.width),
            }
            break
          case "reposition":
            updatedElement.position = {
              ...updatedElement.position,
              y: updatedElement.position.y + fix.action.offsetY,
            }
            break
          case "adjustFontSize":
            if (updatedElement.computedStyle) {
              updatedElement.computedStyle = {
                ...updatedElement.computedStyle,
                fontSize: Math.max(12, (updatedElement.computedStyle.fontSize || 16) * fix.action.factor),
              }
            }
            break
          case "adjustSpacing":
            updatedElement.position = {
              ...updatedElement.position,
              y: updatedElement.position.y + fix.action.margin,
            }
            break
        }

        return updatedElement
      })

      setElements(updatedElements)
      setInspectionResults([]) // 수정 후 이슈 목록 초기화
      setShowInspectionResults(false)
    },
    [elements, setElements],
  )

  // 점검 영역 크기를 반환하는 함수들
  const getInspectionWidth = useCallback(() => INSPECTION_WIDTH, [])
  const getContentHeight = useCallback(() => getActualContentHeight(elements), [elements])

  return {
    isInspecting,
    showInspectionResults,
    inspectionResults,
    scanProgress,
    startInspection,
    closeInspectionResults,
    applyAutoFix,
    getInspectionWidth,
    getContentHeight,
  }
}
