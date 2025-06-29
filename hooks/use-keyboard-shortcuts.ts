"use client"

import { useEffect } from "react"

interface UseKeyboardShortcutsProps {
  copyElements?: () => void
  pasteElements?: () => void
  deleteSelectedElements?: () => void
  selectedElementIds?: string[]
  selectedElementId?: string | null
  editingTextId?: string | null
  clearSelection?: () => void
  setSelectedElementId?: (id: string | null) => void
  elements?: any[]
  setElements?: (elements: any[] | ((prev: any[]) => any[])) => void
  undo?: () => void
  redo?: () => void
  moveSelectedElements?: (dx: number, dy: number) => void
}

export function useKeyboardShortcuts({
  copyElements,
  pasteElements,
  deleteSelectedElements,
  selectedElementIds = [],
  selectedElementId,
  editingTextId,
  clearSelection,
  setSelectedElementId,
  elements = [],
  setElements,
  undo,
  redo,
  moveSelectedElements,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 텍스트 편집 중일 때는 단축키 비활성화
      if (editingTextId) {
        return
      }

      // 입력 필드에서는 단축키 비활성화
      const target = event.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true") {
        return
      }

      const isCtrlOrCmd = event.ctrlKey || event.metaKey
      const isShiftPressed = event.shiftKey

      // 화살표 키로 요소 이동
      if (
        (selectedElementIds.length > 0 || selectedElementId) &&
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key) &&
        moveSelectedElements
      ) {
        event.preventDefault()

        // 이동 거리 설정 (Shift 키를 누르면 미세 조정)
        const moveDistance = isShiftPressed ? 1 : 10

        switch (event.key) {
          case "ArrowUp":
            moveSelectedElements(0, -moveDistance)
            break
          case "ArrowDown":
            moveSelectedElements(0, moveDistance)
            break
          case "ArrowLeft":
            moveSelectedElements(-moveDistance, 0)
            break
          case "ArrowRight":
            moveSelectedElements(moveDistance, 0)
            break
        }
        return
      }

      if (isCtrlOrCmd) {
        switch (event.key.toLowerCase()) {
          case "c":
            event.preventDefault()
            if (copyElements && (selectedElementIds.length > 0 || selectedElementId)) {
              copyElements()
              console.log("복사 완료!")
            }
            break

          case "v":
            event.preventDefault()
            if (pasteElements) {
              pasteElements()
              console.log("붙여넣기 완료!")
            }
            break

          case "z":
            event.preventDefault()
            if (event.shiftKey) {
              // Ctrl+Shift+Z = Redo
              if (redo) {
                redo()
                console.log("다시 실행")
              }
            } else {
              // Ctrl+Z = Undo
              if (undo) {
                undo()
                console.log("실행 취소")
              }
            }
            break

          case "y":
            event.preventDefault()
            // Ctrl+Y = Redo
            if (redo) {
              redo()
              console.log("다시 실행")
            }
            break

          case "a":
            event.preventDefault()
            // Ctrl+A = Select All (구현 예정)
            console.log("전체 선택 (구현 예정)")
            break

          case "d":
            event.preventDefault()
            // Ctrl+D = Duplicate (구현 예정)
            console.log("복제 (구현 예정)")
            break
        }
      } else {
        switch (event.key) {
          case "Delete":
          case "Backspace":
            // 선택된 요소가 있는지 확인
            const hasSelectedElements = selectedElementIds.length > 0 || selectedElementId

            if (hasSelectedElements && setElements) {
              event.preventDefault()

              // 삭제할 요소 ID 목록 생성
              const idsToDelete = []

              if (selectedElementIds.length > 0) {
                idsToDelete.push(...selectedElementIds)
              } else if (selectedElementId) {
                idsToDelete.push(selectedElementId)
              }

              if (idsToDelete.length > 0) {
                // 요소 삭제
                setElements((prevElements) => prevElements.filter((element) => !idsToDelete.includes(element.id)))

                // 선택 상태 초기화
                if (clearSelection) {
                  clearSelection()
                }
                if (setSelectedElementId) {
                  setSelectedElementId(null)
                }

                console.log(`${idsToDelete.length}개 요소가 삭제되었습니다.`)
              }
            }
            break

          case "Escape":
            event.preventDefault()
            if (clearSelection) {
              clearSelection()
            }
            if (setSelectedElementId) {
              setSelectedElementId(null)
            }
            console.log("선택 해제")
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [
    copyElements,
    pasteElements,
    deleteSelectedElements,
    selectedElementIds,
    selectedElementId,
    editingTextId,
    clearSelection,
    setSelectedElementId,
    elements,
    setElements,
    undo,
    redo,
    moveSelectedElements,
  ])
}
