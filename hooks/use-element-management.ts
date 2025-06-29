"use client"

import type React from "react"

import { useCallback } from "react"

export function useElementManagement(
  elements: any[],
  setElements: (elements: any[] | ((prev: any[]) => any[])) => void,
  selectedElementId: string | null,
  setSelectedElementId: (id: string | null) => void,
  canvasWidth: number,
  canvasHeight: number,
  zoom: number,
  canvasContainerRef: React.RefObject<HTMLDivElement>,
) {
  // 현재 보이는 영역의 중앙 위치를 캔버스 내 좌표로 계산
  const getVisibleCenter = useCallback(() => {
    if (!canvasContainerRef.current) {
      return { x: canvasWidth / 2, y: 200 }
    }

    const scrollTop = canvasContainerRef.current.scrollTop
    const containerHeight = canvasContainerRef.current.clientHeight
    const scale = zoom / 100
    const visibleCenterY = scrollTop / scale + containerHeight / (2 * scale)
    const boundedY = Math.min(Math.max(100, visibleCenterY), canvasHeight - 100)

    return {
      x: canvasWidth / 2,
      y: boundedY,
    }
  }, [canvasWidth, canvasHeight, zoom, canvasContainerRef])

  // 이미지 추가 함수
  const addImageToCanvas = useCallback(
    (imageUrl: string, fileName: string) => {
      const center = getVisibleCenter()
      const imageWidth = 300
      const imageHeight = 300

      const newElement = {
        id: `image-${Date.now()}`,
        type: "image",
        src: imageUrl,
        fileName: fileName,
        position: {
          x: center.x - imageWidth / 2,
          y: center.y - imageHeight / 2,
        },
        size: { width: imageWidth, height: imageHeight },
        rotation: 0,
        zIndex: elements.length + 1,
      }

      setElements((prev) => [...prev, newElement])
      setSelectedElementId(newElement.id)
    },
    [elements.length, getVisibleCenter, setElements, setSelectedElementId],
  )

  // 도형 추가 함수
  const addElementToCanvas = useCallback(
    (shapeType: string, shapeName: string) => {
      const center = getVisibleCenter()
      const isImageFrame = shapeType.includes("-frame")
      const isGradientShape = shapeType.includes("gradient-")
      const isLineShape = shapeType.includes("-line")

      // 선 요소의 경우 크기 조정
      let elementWidth = 150
      let elementHeight = 150

      if (isLineShape) {
        if (shapeType === "horizontal-line" || shapeType === "dashed-line") {
          elementWidth = 200
          elementHeight = 20 // 선 두께에 맞춰 높��� 조정
        } else if (shapeType === "vertical-line") {
          elementWidth = 20 // 선 두께에 맞춰 너비 조정
          elementHeight = 200
        } else if (shapeType === "diagonal-line") {
          elementWidth = 150
          elementHeight = 150
        }
      }

      const newElement = {
        id: `${isImageFrame ? "image-frame" : "shape"}-${Date.now()}`,
        type: isImageFrame ? "image-frame" : "shape",
        shapeType: shapeType,
        name: shapeName,
        position: {
          x: center.x - elementWidth / 2,
          y: center.y - elementHeight / 2,
        },
        size: { width: elementWidth, height: elementHeight },
        rotation: 0,
        zIndex: elements.length + 1,
        // 선 요소의 경우 배경을 투명하게, 다른 요소는 기본 설정
        backgroundColor: isLineShape ? "transparent" : isGradientShape ? "transparent" : "#FFFFFF",
        // 선 요소의 경우 검정색, 다른 요소는 기본 설정
        borderColor: isLineShape ? "#000000" : isImageFrame ? "#FFFFFF" : "#000000",
        // 선 요소의 경우 20px, 다른 요소는 2px
        borderWidth: isLineShape ? 20 : 2,
        borderStyle: "solid",
        borderRadius: 0,
        opacity: 1,
        ...(isGradientShape && {
          gradientEnabled: true,
          gradientDirection: "to right",
          gradientStartColor: "#000000",
          gradientEndColor: "#ffffff",
        }),
        ...(isImageFrame && {
          imageSrc: null,
          imageFileName: null,
          imageOpacity: 1,
          imageFit: "cover",
          imageScale: 1,
          imageOffsetX: 0,
          imageOffsetY: 0,
        }),
      }

      setElements((prev) => [...prev, newElement])
      setSelectedElementId(newElement.id)
    },
    [elements.length, getVisibleCenter, setElements, setSelectedElementId],
  )

  // 텍스트 추가 함수
  const addTextToCanvas = useCallback(
    (textStyle: string, styleName: string, defaultText: string) => {
      const center = getVisibleCenter()
      const textWidth = 300
      const textHeight = 50

      const newElement = {
        id: `text-${Date.now()}`,
        type: "text",
        textStyle: textStyle,
        styleName: styleName,
        content: defaultText,
        position: {
          x: center.x - textWidth / 2,
          y: center.y - textHeight / 2,
        },
        size: { width: textWidth, height: textHeight },
        rotation: 0,
        zIndex: elements.length + 1,
        color: "#000000",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "left",
          lineHeight: 1.5,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      }

      setElements((prev) => [...prev, newElement])
      setSelectedElementId(newElement.id)
    },
    [elements.length, getVisibleCenter, setElements, setSelectedElementId],
  )

  // 요소 삭제 함수
  const deleteSelectedElement = useCallback(() => {
    if (selectedElementId) {
      setElements((prev) => prev.filter((el) => el.id !== selectedElementId))
      setSelectedElementId(null)
    }
  }, [selectedElementId, setElements, setSelectedElementId])

  // 요소 이동 함수 (부드러운 이동을 위해 개선)
  const moveElementWithChildren = useCallback(
    (id: string, x: number, y: number) => {
      const element = elements.find((el) => el.id === id)
      if (!element) return

      const deltaX = x - element.position.x
      const deltaY = y - element.position.y

      setElements((prev) =>
        prev.map((el) => {
          if (el.id === id) {
            // 부모 요소 이동
            return { ...el, position: { x, y } }
          } else if (el.parentId === id) {
            // 자식 요소도 함께 이동
            return {
              ...el,
              position: {
                x: el.position.x + deltaX,
                y: el.position.y + deltaY,
              },
            }
          }
          return el
        }),
      )
    },
    [elements, setElements],
  )

  // 요소 크기 조절 함수
  const resizeElement = useCallback(
    (id: string, width: number, height: number, x: number, y: number) => {
      setElements((prev) =>
        prev.map((el) =>
          el.id === id
            ? {
                ...el,
                size: { width, height },
                position: { x, y },
              }
            : el,
        ),
      )
    },
    [setElements],
  )

  // 요소를 맨 앞으로 가져오기
  const bringElementToFront = useCallback(
    (elementId: string) => {
      const maxZIndex = Math.max(...elements.map((el) => el.zIndex || 1))
      setElements((prev) => prev.map((el) => (el.id === elementId ? { ...el, zIndex: maxZIndex + 1 } : el)))
    },
    [elements, setElements],
  )

  // 요소를 맨 뒤로 보내기
  const sendElementToBack = useCallback(
    (elementId: string) => {
      setElements((prev) => {
        return prev.map((el) => (el.id === elementId ? { ...el, zIndex: 1 } : { ...el, zIndex: (el.zIndex || 1) + 1 }))
      })
    },
    [setElements],
  )

  // 요소 삭제 함수
  const deleteElement = useCallback(
    (elementId: string) => {
      setElements((prev) => prev.filter((el) => el.id !== elementId))
      if (selectedElementId === elementId) {
        setSelectedElementId(null)
      }
    },
    [setElements, selectedElementId, setSelectedElementId],
  )

  // 기존 코드에서 그룹 관련 함수들을 추가합니다.

  // 그룹 생성 함수 추가
  const createGroup = useCallback(
    (elementIds: string[], groupName?: string) => {
      if (elementIds.length < 2) return null

      const selectedElements = elements.filter((el) => elementIds.includes(el.id))
      if (selectedElements.length === 0) return null

      // 그룹의 경계 계산
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

      const groupId = `group-${Date.now()}`
      const groupElement = {
        id: groupId,
        type: "group",
        name: groupName || "그룹",
        position: { x: bounds.minX, y: bounds.minY },
        size: {
          width: bounds.maxX - bounds.minX,
          height: bounds.maxY - bounds.minY,
        },
        rotation: 0,
        zIndex: Math.max(...selectedElements.map((el) => el.zIndex || 1)),
        children: elementIds,
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
      }

      // 자식 요소들의 상대 위치 계산
      const updatedChildren = selectedElements.map((el) => ({
        ...el,
        parentId: groupId,
        relativePosition: {
          x: el.position.x - bounds.minX,
          y: el.position.y - bounds.minY,
        },
      }))

      setElements((prev) => [...prev.filter((el) => !elementIds.includes(el.id)), groupElement, ...updatedChildren])

      setSelectedElementId(groupId)
      return groupId
    },
    [elements, setElements, setSelectedElementId],
  )

  // 그룹 해제 함수 추가
  const ungroupElements = useCallback(
    (groupId: string) => {
      const group = elements.find((el) => el.id === groupId && el.type === "group")
      if (!group) return

      const children = elements.filter((el) => el.parentId === groupId)

      // 자식 요소들을 절대 위치로 변환하고 부모 관계 제거
      const updatedChildren = children.map((child) => ({
        ...child,
        parentId: undefined,
        position: {
          x: group.position.x + (child.relativePosition?.x || 0),
          y: group.position.y + (child.relativePosition?.y || 0),
        },
        relativePosition: undefined,
      }))

      setElements((prev) => [...prev.filter((el) => el.id !== groupId), ...updatedChildren])

      setSelectedElementId(null)
    },
    [elements, setElements, setSelectedElementId],
  )

  // 텍스트를 도형 안에 추가하는 함수
  const addTextToShape = useCallback(
    (shapeId: string, textContent = "텍스트") => {
      const shape = elements.find((el) => el.id === shapeId)
      if (!shape) return

      const textElement = {
        id: `text-${Date.now()}`,
        type: "text",
        textStyle: "body",
        styleName: "본문",
        content: textContent,
        parentId: shapeId,
        relativePosition: {
          x: 10, // 도형 내부 여백
          y: 10,
        },
        position: {
          x: shape.position.x + 10,
          y: shape.position.y + 10,
        },
        size: {
          width: Math.max(50, shape.size.width - 20),
          height: 30,
        },
        rotation: 0,
        zIndex: (shape.zIndex || 1) + 1,
        color: "#000000",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "center",
          lineHeight: 1.5,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      }

      // 도형에 자식 요소 추가
      setElements((prev) =>
        prev
          .map((el) => (el.id === shapeId ? { ...el, children: [...(el.children || []), textElement.id] } : el))
          .concat(textElement),
      )

      setSelectedElementId(textElement.id)
    },
    [elements, setElements, setSelectedElementId],
  )

  // 반환값에 새 함수들 추가
  return {
    addImageToCanvas,
    addElementToCanvas,
    addTextToCanvas,
    deleteSelectedElement,
    moveElementWithChildren,
    resizeElement,
    bringElementToFront,
    sendElementToBack,
    deleteElement,
    getVisibleCenter,
    createGroup,
    ungroupElements,
    addTextToShape,
  }
}
