"use client"

import { useState, useCallback, useRef } from "react"

interface HistoryState {
  elements: any[]
  canvasHeight: number
  canvasBackgroundColor: string
}

interface UseHistoryProps {
  elements: any[]
  canvasHeight: number
  canvasBackgroundColor: string
}

export function useHistory({ elements, canvasHeight, canvasBackgroundColor }: UseHistoryProps) {
  const [history, setHistory] = useState<HistoryState[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const lastSavedState = useRef<string>("")

  const saveToHistory = useCallback(
    (state: HistoryState) => {
      const stateString = JSON.stringify(state)

      // 같은 상태는 저장하지 않음
      if (stateString === lastSavedState.current) {
        return
      }

      lastSavedState.current = stateString

      setHistory((prev) => {
        // 현재 인덱스 이후의 히스토리 제거 (새로운 변경사항이 있을 때)
        const newHistory = prev.slice(0, currentIndex + 1)
        newHistory.push(state)

        // 최대 50개의 히스토리만 유지
        if (newHistory.length > 50) {
          newHistory.shift()
          return newHistory
        }

        return newHistory
      })

      setCurrentIndex((prev) => {
        const newIndex = Math.min(prev + 1, 49)
        return newIndex
      })
    },
    [currentIndex],
  )

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      return history[currentIndex - 1]
    }
    return null
  }, [currentIndex, history])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      return history[currentIndex + 1]
    }
    return null
  }, [currentIndex, history])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    saveToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
