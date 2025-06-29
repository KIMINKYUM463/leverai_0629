"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { ContextMenu } from "./context-menu"
import { SelectionBox } from "./selection-box"
import { MultiSelectionControls } from "./multi-selection-controls"
import { useSnapGuides } from "../../hooks/use-snap-guides"
import { useMultiSelection } from "../../hooks/use-multi-selection"
import { ImageSelectionModal } from "./image-selection-modal"

interface CanvasRendererProps {
  canvasRef: React.RefObject<HTMLDivElement>
  canvasWidth: number
  canvasHeight: number
  setCanvasHeight: (height: number) => void
  isCanvasSelected: boolean
  setIsCanvasSelected: (selected: boolean) => void
  zoom: number
  canvasBackgroundColor: string
  showGuideLines: boolean
  isSaving: boolean
  elements: any[]
  selectedElementId: string | null
  editingTextId: string | null
  isResizing: boolean
  setSelectedElementId: (id: string | null) => void
  setShowAIWritingPanel: (show: boolean) => void
  finishEditingText: () => void
  handleTextElementSelect: (element: any, event: React.MouseEvent) => void
  handleImageFrameElementSelect: (element: any, event: React.MouseEvent) => void
  startEditingText: (id: string) => void
  moveElement: (id: string, x: number, y: number) => void
  setElements: React.Dispatch<React.SetStateAction<any[]>>
  setIsResizing: (isResizing: boolean) => void
  renderShape: (element: any) => React.ReactNode
  renderImageFrame: (element: any) => React.ReactNode
  renderText: (element: any) => React.ReactNode
  handleShapeElementSelect: (element: any, event: React.MouseEvent) => void
  handleResizeStart: (
    e: React.MouseEvent,
    elementId: string,
    direction: string,
    elements: any[],
    setElements: React.Dispatch<React.SetStateAction<any[]>>,
    calculateResizeSnap: (
      elementId: string,
      width: number,
      height: number,
    ) => { width: number; height: number; snapLines: any[] },
    updateSnapLines: (snapLines: any[]) => void,
    clearSnapLines: () => void,
    snapEnabled: boolean,
  ) => void
  handleRotateStart: (
    e: React.MouseEvent,
    elementId: string,
    elements: any[],
    setElements: React.Dispatch<React.SetStateAction<any[]>>,
  ) => void
  contextMenu: {
    show: boolean
    position: { x: number; y: number }
    elementId: string | null
  }
  setContextMenu: (menu: { show: boolean; position: { x: number; y: number }; elementId: string | null }) => void
  bringElementToFront: (elementId: string) => void
  sendElementToBack: (elementId: string) => void
  deleteElement: (elementId: string) => void
  handleDeselectElement: () => void
  snapEnabled?: boolean
  snapDistance?: number
  addTextToShape?: (shapeId: string, textContent?: string) => void
  createGroup?: (elementIds: string[], groupName?: string) => string | null
  ungroupElements?: (groupId: string) => void
  selectedElementIds: string[]
  selectionBox: any
  startSelection: (x: number, y: number) => void
  updateSelection: (x: number, y: number) => void
  endSelection: () => void
  moveSelectedElementsToPosition: (startPositions: any[], dx: number, dy: number) => void
  toggleElementSelection: (elementId: string, add?: boolean) => void
  clearSelection: () => void
  deleteSelectedElements: () => void
  showImageSelectionModal?: boolean
  setShowImageSelectionModal?: (show: boolean) => void
  imageSelectionContext?: {
    elementId: string
    keyword: string
    currentImageSrc?: string
  } | null
  setImageSelectionContext?: (context: any) => void
  currentKeyword?: string
}

export function CanvasRenderer({
  canvasRef,
  canvasWidth,
  canvasHeight,
  setCanvasHeight,
  isCanvasSelected,
  setIsCanvasSelected,
  zoom,
  canvasBackgroundColor,
  showGuideLines,
  isSaving,
  elements,
  selectedElementId,
  editingTextId,
  isResizing,
  setSelectedElementId,
  setShowAIWritingPanel,
  finishEditingText,
  handleTextElementSelect,
  handleImageFrameElementSelect,
  startEditingText,
  moveElement,
  setElements,
  setIsResizing,
  renderShape,
  renderImageFrame,
  renderText,
  handleShapeElementSelect,
  handleResizeStart,
  handleRotateStart,
  contextMenu,
  setContextMenu,
  bringElementToFront,
  sendElementToBack,
  deleteElement,
  handleDeselectElement,
  snapEnabled = true,
  snapDistance = 10,
  addTextToShape,
  createGroup,
  ungroupElements,
  selectedElementIds,
  selectionBox,
  startSelection,
  updateSelection,
  endSelection,
  moveSelectedElementsToPosition,
  toggleElementSelection,
  clearSelection,
  deleteSelectedElements,
  showImageSelectionModal,
  setShowImageSelectionModal,
  imageSelectionContext,
  setImageSelectionContext,
  currentKeyword,
}: CanvasRendererProps) {
  const textEditRef = useRef<HTMLDivElement>(null)
  const [isComposing, setIsComposing] = useState(false)

  useEffect(() => {
    console.log("CanvasRenderer elements:", elements)
  }, [elements])

  // 안전한 elements 체크 추가
  const safeElements = Array.isArray(elements) ? elements : []

  // 스냅 가이드 훅 사용
  const { calculateSnap, calculateResizeSnap, snapLines, clearSnapLines, updateSnapLines } = useSnapGuides(
    safeElements,
    canvasWidth,
    canvasHeight,
    snapDistance,
  )

  // 다중 선택 훅 사용
  const {
    selectedElementIds: multiSelectedElementIds,
    selectionBox: multiSelectionBox,
    startSelection: startMultiSelection,
    updateSelection: updateMultiSelection,
    endSelection: endMultiSelection,
    moveSelectedElementsToPosition: moveMultiSelectedElementsToPosition,
    toggleElementSelection: toggleMultiElementSelection,
    clearSelection: clearMultiSelection,
    deleteSelectedElements: deleteMultiSelectedElements,
  } = useMultiSelection(safeElements, setElements, zoom)

  // 스냅 기능이 적용된 moveElement 함수
  const moveElementWithSnap = (id: string, x: number, y: number) => {
    if (!snapEnabled) {
      setElements((prev) =>
        Array.isArray(prev)
          ? prev.map((el) => {
              if (el.id === id) {
                const newElement = {
                  ...el,
                  position: { x, y },
                }
                return newElement
              }
              return el
            })
          : [],
      )
      return
    }

    const element = safeElements.find((el) => el.id === id)
    if (!element) return

    const snapResult = calculateSnap(id, x, y, element.size.width, element.size.height)
    updateSnapLines(snapResult.snapLines)

    setElements((prev) =>
      Array.isArray(prev)
        ? prev.map((el) => {
            if (el.id === id) {
              return {
                ...el,
                position: { x: snapResult.x, y: snapResult.y },
              }
            }
            return el
          })
        : [],
    )

    setTimeout(() => {
      clearSnapLines()
    }, 1000)
  }

  // 요소의 타입에 따른 표시명 반환
  const getElementTypeName = (element: any) => {
    if (!element) return "요소"

    switch (element.type) {
      case "text":
        return "텍스트"
      case "image":
        return "이미지"
      case "shape":
        return "도형"
      case "image":
        return "이미지 프레임"
      default:
        return "요소"
    }
  }

  // 텍스트 편집 모드일 때 텍스트 요소 렌더링
  const renderEditingText = (element: any) => {
    const computedStyle = element.computedStyle || {}

    return (
      <textarea
        ref={textEditRef}
        className={`w-full h-full border-none outline-none bg-transparent resize-none ${element.textStyle || ""}`}
        value={element.content || ""}
        onChange={(e) => {
          const newContent = e.target.value
          setElements((prev) =>
            Array.isArray(prev)
              ? prev.map((el) =>
                  el.id === element.id
                    ? {
                        ...el,
                        content: newContent,
                      }
                    : el,
                )
              : [],
          )
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (e.shiftKey) {
              return
            } else {
              e.preventDefault()
              finishEditingText()
            }
          }
        }}
        style={{
          color: element.color,
          backgroundColor: element.backgroundColor,
          fontSize: `${computedStyle.fontSize || 16}px`,
          fontFamily: computedStyle.fontFamily || "Inter",
          fontWeight: computedStyle.fontWeight || "400",
          textAlign: "left",
          lineHeight: computedStyle.lineHeight || 1.5,
          letterSpacing: computedStyle.letterSpacing || "0px",
          fontStyle: computedStyle.fontStyle || "normal",
          textDecoration: computedStyle.textDecoration || "none",
          direction: "ltr",
          overflow: "hidden",
        }}
        autoFocus
      />
    )
  }

  // 텍스트 편집 모드일 때 포커스 설정
  useEffect(() => {
    if (editingTextId && textEditRef.current) {
      textEditRef.current.focus()

      setTimeout(() => {
        if (textEditRef.current) {
          const selection = window.getSelection()
          const range = document.createRange()

          if (selection) {
            range.selectNodeContents(textEditRef.current)
            range.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
      }, 0)
    }
  }, [editingTextId])

  // 다중 선택된 요소들의 중심점 계산
  const getMultiSelectionCenter = () => {
    if (selectedElementIds.length === 0) return { x: 0, y: 0 }

    const selectedElements = safeElements.filter((el) => selectedElementIds.includes(el.id))
    const bounds = selectedElements.reduce(
      (acc, el) => ({
        minX: Math.min(acc.minX, el.position.x),
        maxX: Math.max(acc.maxX, el.position.x + el.size.width),
        minY: Math.min(acc.minY, el.position.y),
        maxY: Math.max(acc.maxY, el.position.y + el.size.height),
      }),
      {
        minX: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        minY: Number.POSITIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY,
      },
    )

    return {
      x: (bounds.minX + bounds.maxX) / 2,
      y: bounds.minY,
    }
  }

  // 그룹 렌더링 함수
  const renderGroup = (element: any) => {
    return (
      <div
        className="w-full h-full border-2 border-dashed border-gray-300 bg-transparent"
        style={{
          borderColor: selectedElementId === element.id ? "#3b82f6" : "#d1d5db",
        }}
      >
        <div className="absolute -top-6 left-0 text-xs text-gray-500 bg-white px-1 rounded">
          {element.name || "그룹"}
        </div>
      </div>
    )
  }

  // 이미지 선택 완료 핸들러
  const handleImageSelection = (imageUrl: string) => {
    if (imageSelectionContext) {
      setElements((prev) =>
        prev.map((el) =>
          el.id === imageSelectionContext.elementId
            ? {
                ...el,
                imageSrc: imageUrl,
                hasImage: true,
              }
            : el,
        ),
      )
    }
  }

  // 이미지 프레임 클릭 핸들러 수정:
  const handleImageFrameClick = (element: any, e: React.MouseEvent) => {
    e.stopPropagation()

    // 기존 선택 로직
    handleImageFrameElementSelect(element, e)

    // 이미지 선택 모달 열기 (currentKeyword가 '사과'일 때만)
    if (currentKeyword === "사과" && setShowImageSelectionModal && setImageSelectionContext) {
      setImageSelectionContext({
        elementId: element.id,
        keyword: currentKeyword,
        currentImageSrc: element.imageSrc,
      })
      setShowImageSelectionModal(true)
    }
  }

  return (
    <div
      ref={canvasRef}
      className="bg-white shadow-lg relative mx-auto"
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        transform: `scale(${zoom / 100})`,
        transformOrigin: "top center",
        backgroundColor: canvasBackgroundColor,
      }}
      onMouseDown={(e) => {
        if (editingTextId) {
          finishEditingText()
        }

        if (e.target === e.currentTarget) {
          const rect = canvasRef.current?.getBoundingClientRect()
          if (rect) {
            const scale = zoom / 100
            const x = (e.clientX - rect.left) / scale
            const y = (e.clientY - rect.top) / scale

            if (!e.ctrlKey && !e.metaKey) {
              clearSelection()
              setSelectedElementId(null)
            }

            startSelection(x, y)
            setShowAIWritingPanel(false)
            if (editingTextId) finishEditingText()
            setIsCanvasSelected(true)
            setContextMenu({ show: false, position: { x: 0, y: 0 }, elementId: null })
            clearSnapLines()
          }
        }
      }}
      onMouseMove={(e) => {
        if (selectionBox.isSelecting) {
          const rect = canvasRef.current?.getBoundingClientRect()
          if (rect) {
            const scale = zoom / 100
            const x = (e.clientX - rect.left) / scale
            const y = (e.clientY - rect.top) / scale
            updateSelection(x, y)
          }
        }
      }}
      onMouseUp={() => {
        if (selectionBox.isSelecting) {
          endSelection()
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu({ show: false, position: { x: 0, y: 0 }, elementId: null })
      }}
    >
      {/* Canvas guide lines */}
      {showGuideLines && !isSaving && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="border border-dashed border-gray-200 w-full h-full"></div>
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-gray-200"></div>
          <div className="absolute top-1/4 left-0 right-0 border-t border-dashed border-gray-200"></div>
          <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-200"></div>
          <div className="absolute top-3/4 left-0 right-0 border-t border-dashed border-gray-200"></div>
        </div>
      )}

      {/* 스냅 가이드라인 */}
      {/* snapEnabled &&
        !isSaving &&
        snapLines.map((line, index) => (
          <div
            key={index}
            className="absolute pointer-events-none z-50"
            style={{
              ...(line.type === "vertical"
                ? {
                    left: `${line.position}px`,
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    borderLeft: `2px solid ${line.color}`,
                  }
                : {
                    top: `${line.position}px`,
                    left: 0,
                    right: 0,
                    height: "1px",
                    borderTop: `2px solid ${line.color}`,
                  }),
              boxShadow: `0 0 4px ${line.color}`,
            }}
          />
        )) */}

      {/* 선택 박스 */}
      <SelectionBox selectionBox={selectionBox} />

      {/* Canvas elements */}
      {safeElements
        .filter((element) => !element.parentId)
        .map((element) => {
          // 각 요소의 선택 상태를 정확히 확인
          const isIndividuallySelected = selectedElementId === element.id
          const isInMultiSelection = selectedElementIds.includes(element.id) && selectedElementIds.length > 1
          const isSelected = isIndividuallySelected && !isInMultiSelection
          const children = safeElements.filter((child) => child.parentId === element.id)

          return (
            <div
              id={element.id}
              key={element.id}
              className={`absolute ${!isResizing && editingTextId !== element.id ? "cursor-move" : ""} ${
                (isIndividuallySelected || isInMultiSelection) && editingTextId !== element.id && !isSaving
                  ? isInMultiSelection
                    ? "outline outline-2 outline-green-500"
                    : "outline outline-2 outline-blue-500"
                  : ""
              }`}
              style={{
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
                transform: `rotate(${element.rotation || 0}deg)`,
                zIndex: element.zIndex || 1,
              }}
              onClick={(e) => {
                e.stopPropagation()
              }}
              onDoubleClick={(e) => {
                e.stopPropagation()
                if (element.type === "text") {
                  startEditingText(element.id)
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()

                // 개별 요소만 선택
                setSelectedElementId(element.id)
                clearSelection()
                setIsCanvasSelected(false)

                const canvasRect = canvasRef.current?.getBoundingClientRect()
                if (canvasRect) {
                  const scale = zoom / 100
                  const canvasX = (e.clientX - canvasRect.left) / scale
                  const canvasY = (e.clientY - canvasRect.top) / scale

                  setContextMenu({
                    show: true,
                    position: { x: canvasX, y: canvasY },
                    elementId: element.id,
                  })
                }
              }}
              onMouseDown={(e) => {
                e.stopPropagation()

                console.log(`=== 요소 클릭: ${element.id} ===`)
                console.log("현재 selectedElementId:", selectedElementId)
                console.log("현재 selectedElementIds:", selectedElementIds)
                console.log("요소 zIndex:", element.zIndex)
                console.log("요소 위치:", element.position)

                if (editingTextId && editingTextId !== element.id) {
                  finishEditingText()
                }

                setIsCanvasSelected(false)
                setContextMenu({ show: false, position: { x: 0, y: 0 }, elementId: null })
                clearSnapLines()

                if (editingTextId !== element.id) {
                  const isCtrlPressed = e.ctrlKey || e.metaKey

                  // 강제로 모든 선택 상태 초기화
                  if (!isCtrlPressed) {
                    console.log("일반 클릭: 모든 선택 초기화")
                    clearSelection()
                    setSelectedElementId(null)

                    // 약간의 지연 후 새로운 선택 적용
                    setTimeout(() => {
                      setSelectedElementId(element.id)
                      console.log("새로운 선택 적용:", element.id)
                    }, 10)
                  } else {
                    console.log("Ctrl+클릭: 다중 선택 모드")
                    setSelectedElementId(null)
                    toggleElementSelection(element.id, true)
                  }

                  setShowAIWritingPanel(false)

                  // 타입별 처리
                  if (element.type === "text") {
                    handleTextElementSelect(element, e)
                  } else if (element.type === "shape") {
                    handleShapeElementSelect(element, e)
                  } else if (element.type === "imageFrame" || element.type === "image-frame") {
                    handleImageFrameElementSelect(element, e)
                  }

                  // 드래그 로직
                  const scale = zoom / 100
                  const startX = e.clientX
                  const startY = e.clientY

                  const currentSelectedIds =
                    isCtrlPressed && selectedElementIds.includes(element.id) ? selectedElementIds : [element.id]

                  const startPositions = currentSelectedIds
                    .map((id) => {
                      const el = safeElements.find((elem) => elem.id === id)
                      return el ? { id: id, startX: el.position.x, startY: el.position.y } : null
                    })
                    .filter(Boolean)

                  const handleMouseMove = (moveEvent: MouseEvent) => {
                    const dxViewport = moveEvent.clientX - startX
                    const dyViewport = moveEvent.clientY - startY
                    const dxCanvas = dxViewport / scale
                    const dyCanvas = dyViewport / scale

                    if (currentSelectedIds.length > 1) {
                      moveSelectedElementsToPosition(startPositions, dxCanvas, dyCanvas)
                    } else {
                      moveElementWithSnap(element.id, element.position.x + dxCanvas, element.position.y + dyCanvas)
                    }
                  }

                  const handleMouseUp = () => {
                    clearSnapLines()
                    document.removeEventListener("mousemove", handleMouseMove)
                    document.removeEventListener("mouseup", handleMouseUp)
                  }

                  document.addEventListener("mousemove", handleMouseMove)
                  document.addEventListener("mouseup", handleMouseUp)
                }
              }}
            >
              {/* 요소 렌더링 */}
              {element.type === "image" && (
                <img
                  src={element.src || "/placeholder.svg"}
                  alt={element.fileName || "Uploaded image"}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              )}

              {element.type === "shape" && renderShape(element)}
              {element.type === "group" && renderGroup(element)}

              {(element.type === "imageFrame" || element.type === "image-frame") && (
                <div
                  className="w-full h-full relative cursor-pointer"
                  onClick={(e) => handleImageFrameClick(element, e)}
                >
                  {renderImageFrame(element)}
                  {element.imageSrc && (
                    <div
                      className="absolute inset-0 z-10 hover:bg-blue-500 hover:bg-opacity-10 transition-colors"
                      title="클릭하여 이미지 변경"
                    />
                  )}
                </div>
              )}

              {element.type === "text" &&
                (editingTextId === element.id ? renderEditingText(element) : renderText(element))}

              {/* 자식 요소들 렌더링 */}
              {children.map((child) => (
                <div
                  key={child.id}
                  className={`absolute ${editingTextId !== child.id ? "cursor-text" : ""} ${
                    selectedElementId === child.id && editingTextId !== child.id && !isSaving
                      ? "outline outline-1 outline-orange-400"
                      : ""
                  }`}
                  style={{
                    left: `${child.relativePosition?.x || 0}px`,
                    top: `${child.relativePosition?.y || 0}px`,
                    width: `${child.size.width}px`,
                    height: `${child.size.height}px`,
                    transform: `rotate(${child.rotation || 0}deg)`,
                    zIndex: (child.zIndex || 1) - (element.zIndex || 1) + 1,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (child.type === "text") {
                      handleTextElementSelect(child, e)
                    }
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    if (child.type === "text") {
                      startEditingText(child.id)
                    }
                  }}
                >
                  {child.type === "text" && (editingTextId === child.id ? renderEditingText(child) : renderText(child))}
                  {child.type === "shape" && renderShape(child)}
                  {child.type === "image" && (
                    <img
                      src={child.src || "/placeholder.svg"}
                      alt={child.fileName || "Uploaded image"}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  )}
                </div>
              ))}

              {/* 리사이즈 핸들 - 개별 선택된 요소에만 표시 */}
              {selectedElementId === element.id &&
                !isSaving &&
                editingTextId !== element.id &&
                selectedElementIds.length === 0 && (
                  <>
                    <div
                      className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-nw-resize"
                      style={{ top: "-6px", left: "-6px" }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleResizeStart(
                          e,
                          element.id,
                          "nw",
                          safeElements,
                          setElements,
                          calculateResizeSnap,
                          updateSnapLines,
                          clearSnapLines,
                          snapEnabled,
                        )
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-n-resize"
                      style={{ top: "-6px", left: "50%", transform: "translateX(-50%)" }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleResizeStart(
                          e,
                          element.id,
                          "n",
                          safeElements,
                          setElements,
                          calculateResizeSnap,
                          updateSnapLines,
                          clearSnapLines,
                          snapEnabled,
                        )
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-ne-resize"
                      style={{ top: "-6px", right: "-6px" }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleResizeStart(
                          e,
                          element.id,
                          "ne",
                          safeElements,
                          setElements,
                          calculateResizeSnap,
                          updateSnapLines,
                          clearSnapLines,
                          snapEnabled,
                        )
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-w-resize"
                      style={{ top: "50%", left: "-6px", transform: "translateY(-50%)" }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleResizeStart(
                          e,
                          element.id,
                          "w",
                          safeElements,
                          setElements,
                          calculateResizeSnap,
                          updateSnapLines,
                          clearSnapLines,
                          snapEnabled,
                        )
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-e-resize"
                      style={{ top: "50%", right: "-6px", transform: "translateY(-50%)" }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleResizeStart(
                          e,
                          element.id,
                          "e",
                          safeElements,
                          setElements,
                          calculateResizeSnap,
                          updateSnapLines,
                          clearSnapLines,
                          snapEnabled,
                        )
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-sw-resize"
                      style={{ bottom: "-6px", left: "-6px" }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleResizeStart(
                          e,
                          element.id,
                          "sw",
                          safeElements,
                          setElements,
                          calculateResizeSnap,
                          updateSnapLines,
                          clearSnapLines,
                          snapEnabled,
                        )
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-s-resize"
                      style={{ bottom: "-6px", left: "50%", transform: "translateX(-50%)" }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleResizeStart(
                          e,
                          element.id,
                          "s",
                          safeElements,
                          setElements,
                          calculateResizeSnap,
                          updateSnapLines,
                          clearSnapLines,
                          snapEnabled,
                        )
                      }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-se-resize"
                      style={{ bottom: "-6px", right: "-6px" }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleResizeStart(
                          e,
                          element.id,
                          "se",
                          safeElements,
                          setElements,
                          calculateResizeSnap,
                          updateSnapLines,
                          clearSnapLines,
                          snapEnabled,
                        )
                      }}
                    />

                    {/* 회전 핸들 */}
                    <div
                      className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full cursor-grab hover:cursor-grabbing flex items-center justify-center"
                      style={{
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleRotateStart(e, element.id, safeElements, setElements)
                      }}
                      title="회전"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                      </svg>
                    </div>

                    <div
                      className="absolute border-l border-green-500 border-dashed"
                      style={{
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        height: "19px",
                        width: "1px",
                      }}
                    />
                  </>
                )}
            </div>
          )
        })}

      {/* 다중 선택 컨트롤 */}
      {selectedElementIds.length > 0 && (
        <MultiSelectionControls
          selectedCount={selectedElementIds.length}
          onDelete={deleteSelectedElements}
          position={getMultiSelectionCenter()}
        />
      )}

      {/* Canvas height resize handle */}
      {isCanvasSelected && !isSaving && (
        <div
          className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-ns-resize shadow-md hover:bg-blue-600"
          onMouseDown={(e) => {
            e.stopPropagation()
            const startY = e.clientY
            const initialHeight = canvasHeight
            const scale = zoom / 100

            const handleMouseMove = (moveEvent: MouseEvent) => {
              const deltaY = (moveEvent.clientY - startY) / scale
              let newHeight = initialHeight + deltaY
              newHeight = Math.max(500, Math.min(50000, newHeight))
              setCanvasHeight(Math.round(newHeight))
            }

            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove)
              document.removeEventListener("mouseup", handleMouseUp)
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
          }}
          title="캔버스 세로 길이 조절"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      )}

      {/* Placeholder text */}
      {safeElements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          <div className="text-center">
            <p className="text-lg">상세페이지 편집 영역</p>
            <p className="text-sm">좌측 메뉴에서 요소를 선택하여 드래그하세요</p>
            <p className="text-xs mt-2 text-gray-400">{`860 x ${Math.round(canvasHeight)} px`}</p>
          </div>
        </div>
      )}

      {/* 컨텍스트 메뉴 */}
      {contextMenu.show && contextMenu.elementId && (
        <ContextMenu
          position={contextMenu.position}
          onClose={() => setContextMenu({ show: false, position: { x: 0, y: 0 }, elementId: null })}
          onBringToFront={() => bringElementToFront(contextMenu.elementId!)}
          onSendToBack={() => sendElementToBack(contextMenu.elementId!)}
          onDelete={() => deleteElement(contextMenu.elementId!)}
          onAddText={() => {
            const element = safeElements.find((el) => el.id === contextMenu.elementId)
            if (element && element.type === "shape" && addTextToShape) {
              addTextToShape(element.id, "텍스트")
            }
          }}
          elementType={getElementTypeName(safeElements.find((el) => el.id === contextMenu.elementId))}
        />
      )}

      {/* 이미지 선택 모달 */}
      {showImageSelectionModal && imageSelectionContext && (
        <ImageSelectionModal
          isOpen={showImageSelectionModal}
          onClose={() => setShowImageSelectionModal?.(false)}
          onSelectImage={handleImageSelection}
          keyword={imageSelectionContext.keyword}
          currentImageSrc={imageSelectionContext.currentImageSrc}
        />
      )}
    </div>
  )
}
