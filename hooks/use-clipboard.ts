"use client"

import { useState, useCallback } from "react"

export function useClipboard(
  elements: any[],
  setElements: (elements: any[] | ((prev: any[]) => any[])) => void,
  selectedElementIds: string[],
  selectedElementId: string | null,
  canvasWidth: number,
  canvasHeight: number,
) {
  const [clipboardData, setClipboardData] = useState<any[]>([])
  const [justPasted, setJustPasted] = useState(false)

  const copyElements = useCallback(() => {
    if (!elements || !Array.isArray(elements)) return

    const elementsToCopy: any[] = []

    // 다중 선택된 요소들 복사
    if (selectedElementIds && selectedElementIds.length > 0) {
      selectedElementIds.forEach((id) => {
        const element = elements.find((el) => el.id === id)
        if (element) {
          elementsToCopy.push(element)
        }
      })
    }
    // 단일 선택된 요소 복사
    else if (selectedElementId) {
      const element = elements.find((el) => el.id === selectedElementId)
      if (element) {
        elementsToCopy.push(element)
      }
    }

    if (elementsToCopy.length > 0) {
      setClipboardData(elementsToCopy)
      console.log(`${elementsToCopy.length}개 요소가 클립보드에 복사되었습니다.`)
    }
  }, [elements, selectedElementIds, selectedElementId])

  const pasteElements = useCallback(() => {
    if (!clipboardData || clipboardData.length === 0) return
    if (!setElements) return

    const newElements = clipboardData.map((element) => ({
      ...element,
      id: `${element.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position: {
        x: Math.min(element.position.x + 20, canvasWidth - element.size.width),
        y: Math.min(element.position.y + 20, canvasHeight - element.size.height),
      },
    }))

    setElements((prev) => [...(prev || []), ...newElements])
    setJustPasted(true)
    setTimeout(() => setJustPasted(false), 2000)

    console.log(`${newElements.length}개 요소가 붙여넣기되었습니다.`)
  }, [clipboardData, setElements, canvasWidth, canvasHeight])

  const dismissClipboard = useCallback(() => {
    setJustPasted(false)
  }, [])

  const hasClipboardData = clipboardData && clipboardData.length > 0
  const clipboardCount = clipboardData ? clipboardData.length : 0

  return {
    copyElements,
    pasteElements,
    hasClipboardData,
    clipboardCount,
    dismissClipboard,
    justPasted,
  }
}
