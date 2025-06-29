"use client"

import { useCallback } from "react"

export function useElementSelection(
  elements: any[],
  selectedElementId: string | null,
  setSelectedElementId: (id: string | null) => void,
  setSelectedTextElement: (element: any) => void,
  setShowTextEditor: (show: boolean) => void,
  setShowElementEditor: (show: boolean) => void,
  setSelectedShapeElement: (element: any) => void,
  setShowImageFrameEditor: (show: boolean) => void,
  setSelectedImageFrameElement: (element: any) => void,
  setShowAIWritingPanel: (show: boolean) => void,
) {
  // 텍스트 요소 선택 시 처리 함수
  const handleTextElementSelect = useCallback(
    (element: any, event: any) => {
      if (element.type === "text") {
        setSelectedElementId(element.id) // 클릭한 요소만 선택
        setSelectedTextElement(element)
        setShowTextEditor(true)
        setShowElementEditor(false)
        setShowImageFrameEditor(false)
        setShowAIWritingPanel(false)
      }
    },
    [
      setSelectedElementId,
      setSelectedTextElement,
      setShowTextEditor,
      setShowElementEditor,
      setShowImageFrameEditor,
      setShowAIWritingPanel,
    ],
  )

  // 도형 요소 선택 시 처리 함수
  const handleShapeElementSelect = useCallback(
    (element: any, event: any) => {
      if (element.type === "shape") {
        // 기존 선택 해제
        setSelectedElementId(element.id) // 클릭한 요소만 선택
        setSelectedShapeElement(element)
        setShowElementEditor(true)
        setShowTextEditor(false)
        setShowImageFrameEditor(false)
        setShowAIWritingPanel(false)
      }
    },
    [
      setSelectedElementId,
      setSelectedShapeElement,
      setShowElementEditor,
      setShowTextEditor,
      setShowImageFrameEditor,
      setShowAIWritingPanel,
    ],
  )

  // 이미지 프레임 요소 선택 시 처리 함수
  const handleImageFrameElementSelect = useCallback(
    (element: any, event: any) => {
      if (element.type === "image-frame" || element.type === "imageFrame") {
        setSelectedElementId(element.id) // 클릭한 요소만 선택
        setSelectedImageFrameElement(element)
        setShowImageFrameEditor(true)
        setShowTextEditor(false)
        setShowElementEditor(false)
        setShowAIWritingPanel(false)
      }
    },
    [
      setSelectedElementId,
      setSelectedImageFrameElement,
      setShowImageFrameEditor,
      setShowTextEditor,
      setShowElementEditor,
      setShowAIWritingPanel,
    ],
  )

  // 선택 해제 함수
  const handleDeselectElement = useCallback(() => {
    setSelectedElementId(null)
    setShowTextEditor(false)
    setSelectedTextElement(null)
    setShowElementEditor(false)
    setSelectedShapeElement(null)
    setShowImageFrameEditor(false)
    setSelectedImageFrameElement(null)
    setShowAIWritingPanel(false)
  }, [
    setSelectedElementId,
    setShowTextEditor,
    setSelectedTextElement,
    setShowElementEditor,
    setSelectedShapeElement,
    setShowImageFrameEditor,
    setSelectedImageFrameElement,
    setShowAIWritingPanel,
  ])

  // selectedElementId가 변경될 때 사이드바 상태 관리
  const handleElementSelectionChange = useCallback(() => {
    if (!selectedElementId) {
      setShowTextEditor(false)
      setSelectedTextElement(null)
      setShowElementEditor(false)
      setSelectedShapeElement(null)
      setShowImageFrameEditor(false)
      setSelectedImageFrameElement(null)
    } else {
      const selectedElement = elements.find((el) => el.id === selectedElementId)
      if (selectedElement) {
        if (selectedElement.type === "text") {
          setShowTextEditor(true)
          setSelectedTextElement(selectedElement)
          setShowElementEditor(false)
          setSelectedShapeElement(null)
          setShowImageFrameEditor(false)
          setSelectedImageFrameElement(null)
        } else if (selectedElement.type === "shape") {
          setShowElementEditor(true)
          setSelectedShapeElement(selectedElement)
          setShowTextEditor(false)
          setSelectedTextElement(null)
          setShowImageFrameEditor(false)
          setSelectedImageFrameElement(null)
        } else if (selectedElement.type === "image-frame") {
          setShowImageFrameEditor(true)
          setSelectedImageFrameElement(selectedElement)
          setShowTextEditor(false)
          setSelectedTextElement(null)
          setShowElementEditor(false)
          setSelectedShapeElement(null)
        } else {
          setShowTextEditor(false)
          setSelectedTextElement(null)
          setShowElementEditor(false)
          setSelectedShapeElement(null)
          setShowImageFrameEditor(false)
          setSelectedImageFrameElement(null)
        }
      }
    }
  }, [
    selectedElementId,
    elements,
    setShowTextEditor,
    setSelectedTextElement,
    setShowElementEditor,
    setSelectedShapeElement,
    setShowImageFrameEditor,
    setSelectedImageFrameElement,
  ])

  return {
    handleTextElementSelect,
    handleShapeElementSelect,
    handleImageFrameElementSelect,
    handleDeselectElement,
    handleElementSelectionChange,
  }
}
