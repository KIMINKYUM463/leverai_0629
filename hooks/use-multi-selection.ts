"use client"

import { useCallback, useState } from "react"

export function useMultiSelection(
  elements: any[],
  setElements: (elements: any[] | ((prev: any[]) => any[])) => void,
  zoom: number,
) {
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([])
  const [selectionBox, setSelectionBox] = useState<{
    isSelecting: boolean
    startX: number
    startY: number
    currentX: number
    currentY: number
  }>({
    isSelecting: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
  })

  // 선택 박스 시작
  const startSelection = useCallback((x: number, y: number) => {
    setSelectionBox({
      isSelecting: true,
      startX: x,
      startY: y,
      currentX: x,
      currentY: y,
    })
    setSelectedElementIds([])
  }, [])

  // 선택 박스 업데이트
  const updateSelection = useCallback((x: number, y: number) => {
    setSelectionBox((prev) => ({
      ...prev,
      currentX: x,
      currentY: y,
    }))
  }, [])

  // 선택 박스 완료
  const endSelection = useCallback(() => {
    if (!selectionBox.isSelecting) return

    const { startX, startY, currentX, currentY } = selectionBox
    const minX = Math.min(startX, currentX)
    const maxX = Math.max(startX, currentX)
    const minY = Math.min(startY, currentY)
    const maxY = Math.max(startY, currentY)

    // 선택 박스 내에 있는 요소들 찾기
    const selectedIds = elements
      .filter((element) => {
        const elementLeft = element.position.x
        const elementRight = element.position.x + element.size.width
        const elementTop = element.position.y
        const elementBottom = element.position.y + element.size.height

        // 요소가 선택 박스와 겹치는지 확인
        return elementLeft < maxX && elementRight > minX && elementTop < maxY && elementBottom > minY
      })
      .map((element) => element.id)

    setSelectedElementIds(selectedIds)
    setSelectionBox((prev) => ({ ...prev, isSelecting: false }))
  }, [selectionBox, elements])

  // 선택된 요소들 이동 (절대 위치로 설정)
  const moveSelectedElementsToPosition = useCallback(
    (startPositions: { id: string; startX: number; startY: number }[], deltaX: number, deltaY: number) => {
      setElements((prev) =>
        prev.map((element) => {
          const startPos = startPositions.find((pos) => pos.id === element.id)
          if (startPos) {
            return {
              ...element,
              position: {
                x: Math.max(0, startPos.startX + deltaX),
                y: Math.max(0, startPos.startY + deltaY),
              },
            }
          }
          return element
        }),
      )
    },
    [setElements],
  )

  // 단일 요소 선택 (Ctrl+클릭)
  const toggleElementSelection = useCallback((elementId: string, isCtrlPressed: boolean) => {
    console.log(`=== toggleElementSelection: ${elementId}, isCtrl: ${isCtrlPressed} ===`)

    if (isCtrlPressed) {
      setSelectedElementIds((prev) => {
        const newSelection = prev.includes(elementId) ? prev.filter((id) => id !== elementId) : [...prev, elementId]
        console.log("다중 선택 업데이트:", newSelection)
        return newSelection
      })
    } else {
      // 일반 클릭 시에는 다중 선택 배열을 완전히 비움
      console.log("일반 클릭으로 다중 선택 배열 강제 초기화")
      setSelectedElementIds([])
    }
  }, [])

  // 모든 선택 해제
  const clearSelection = useCallback(() => {
    console.log("=== clearSelection 강제 실행 ===")
    setSelectedElementIds([])
    setSelectionBox({
      isSelecting: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    })
    console.log("다중 선택 완전 해제 완료")
  }, [])

  // 선택된 요소들 삭제
  const deleteSelectedElements = useCallback(() => {
    if (selectedElementIds.length === 0) return

    setElements((prev) => prev.filter((element) => !selectedElementIds.includes(element.id)))
    setSelectedElementIds([])
  }, [selectedElementIds, setElements])

  return {
    selectedElementIds,
    selectionBox,
    startSelection,
    updateSelection,
    endSelection,
    moveSelectedElementsToPosition,
    toggleElementSelection,
    clearSelection,
    deleteSelectedElements,
  }
}
