"use client"

import type React from "react"
import { useCallback, useEffect, useRef } from "react"

export function useTextEditing(
  editingTextId: string | null,
  setEditingTextId: (id: string | null) => void,
  textEditRef?: React.RefObject<HTMLDivElement>,
  elements: any[],
  setElements: (elements: any[] | ((prev: any[]) => any[])) => void,
) {
  // ── Fallback ref when none is provided ───────────────────────
  const internalRef = useRef<HTMLDivElement>(null)
  const editorRef = textEditRef ?? internalRef

  // 텍스트 편집 시작 함수
  const startEditingText = useCallback(
    (id: string) => {
      setEditingTextId(id)

      // 다음 렌더링 사이클에서 포커스 설정
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus()

          // 커서를 텍스트 끝으로 이동
          const selection = window.getSelection()
          const range = document.createRange()

          if (selection && editorRef.current.childNodes.length > 0) {
            const lastNode = editorRef.current.childNodes[editorRef.current.childNodes.length - 1]
            range.setStart(lastNode, lastNode.textContent?.length || 0)
            range.collapse(true)
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
      }, 0)
    },
    [setEditingTextId],
  )

  // 텍스트 내용 업데이트 함수
  const updateTextContent = useCallback(
    (id: string, content: string) => {
      setElements((prev) =>
        prev.map((el) =>
          el.id === id
            ? {
                ...el,
                content: content,
              }
            : el,
        ),
      )
    },
    [setElements],
  )

  // 텍스트 편집 완료 함수
  const finishEditingText = useCallback(() => {
    if (editingTextId && editorRef.current) {
      // 편집 완료 시 현재 내용 저장
      const content = editorRef.current.textContent || editorRef.current.innerText || ""
      if (content.trim()) {
        updateTextContent(editingTextId, content)
      }
    }
    setEditingTextId(null)
  }, [editingTextId, editorRef, updateTextContent, setEditingTextId])

  // 이미지 편집 완료 함수
  const finishEditingImage = useCallback(() => {
    // 이미지 편집 관련 상태 초기화
  }, [])

  // 클릭 이벤트 핸들러 - 텍스트 편집 모드 종료
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingTextId && editorRef.current && !editorRef.current.contains(event.target as Node)) {
        finishEditingText()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [editingTextId, editorRef, finishEditingText])

  // Enter 키 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingTextId && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        finishEditingText()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [editingTextId, finishEditingText])

  // 텍스트 편집 중 실시간 업데이트 함수
  const handleTextInput = useCallback(
    (event: Event) => {
      if (editingTextId && editorRef.current) {
        const content = editorRef.current.textContent || ""
        updateTextContent(editingTextId, content)
      }
    },
    [editingTextId, editorRef, updateTextContent],
  )

  // 텍스트 편집 중 실시간 업데이트 이벤트 리스너 추가
  useEffect(() => {
    if (editingTextId && editorRef.current) {
      const element = editorRef.current
      element.addEventListener("input", handleTextInput)
      element.addEventListener("keyup", handleTextInput)

      return () => {
        element.removeEventListener("input", handleTextInput)
        element.removeEventListener("keyup", handleTextInput)
      }
    }
  }, [editingTextId, handleTextInput])

  return {
    startEditingText,
    updateTextContent,
    finishEditingText,
    finishEditingImage,
    handleTextInput,
  }
}
