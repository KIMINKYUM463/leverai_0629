"use client"

import { useCallback, useEffect } from "react"
import { createElement } from "react"

export function useElementRendering(
  elements: any[],
  setElements: (elements: any[] | ((prev: any[]) => any[])) => void,
  selectedElementId: string | null,
  editingImageId: string | null,
  setEditingImageId: (id: string | null) => void,
  isResizingImage: boolean,
  setIsResizingImage: (isResizing: boolean) => void,
  zoom: number,
  isSaving: boolean,
) {
  // 리사이즈 이벤트 리스너 (기존과 동일)
  useEffect(() => {
    const handleResizeStart = (e: CustomEvent) => {
      const { elementId } = e.detail
      const element = elements.find((el) => el.id === elementId)
      if (!element) return

      const resizeData = {
        startWidth: element.size.width,
        startHeight: element.size.height,
        startX: element.position.x,
        startY: element.position.y,
      }

      setElements((prev) =>
        prev.map((el) =>
          el.id === elementId
            ? {
                ...el,
                _resizeData: resizeData,
              }
            : el,
        ),
      )
    }

    const handleResizeMove = (e: CustomEvent) => {
      const { elementId, direction, deltaX, deltaY, isShiftPressed } = e.detail
      const element = elements.find((el) => el.id === elementId)
      if (!element || !element._resizeData) return

      const { startWidth, startHeight, startX, startY } = element._resizeData

      let newWidth = startWidth
      let newHeight = startHeight
      let newX = startX
      let newY = startY

      if (isShiftPressed) {
        const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY))
        const signX = deltaX >= 0 ? 1 : -1
        const signY = deltaY >= 0 ? 1 : -1

        switch (direction) {
          case "nw":
            newWidth = Math.max(20, startWidth - maxDelta * signX)
            newHeight = Math.max(20, startHeight - maxDelta * signX)
            newX = startX + (startWidth - newWidth)
            newY = startY + (startHeight - newHeight)
            break
          case "ne":
            newWidth = Math.max(20, startWidth + maxDelta * signX)
            newHeight = Math.max(20, startHeight - maxDelta * signX)
            newY = startY + (startHeight - newHeight)
            break
          case "sw":
            newWidth = Math.max(20, startWidth - maxDelta * signX)
            newHeight = Math.max(20, startHeight + maxDelta * signX)
            newX = startX + (startWidth - newWidth)
            break
          case "se":
            newWidth = Math.max(20, startWidth + maxDelta * signX)
            newHeight = Math.max(20, startHeight + maxDelta * signX)
            break
          case "n":
            newHeight = Math.max(20, startHeight - maxDelta * signY)
            newWidth = newHeight
            newX = startX - (newWidth - startWidth) / 2
            newY = startY + (startHeight - newHeight)
            break
          case "s":
            newHeight = Math.max(20, startHeight + maxDelta * signY)
            newWidth = newHeight
            newX = startX - (newWidth - startWidth) / 2
            break
          case "w":
            newWidth = Math.max(20, startWidth - maxDelta * signX)
            newHeight = newWidth
            newX = startX + (startWidth - newWidth)
            newY = startY - (newHeight - startHeight) / 2
            break
          case "e":
            newWidth = Math.max(20, startWidth + maxDelta * signX)
            newHeight = newWidth
            newY = startY - (newHeight - startHeight) / 2
            break
        }
      } else {
        switch (direction) {
          case "nw":
            newWidth = Math.max(20, startWidth - deltaX)
            newHeight = Math.max(20, startHeight - deltaY)
            newX = startX + (startWidth - newWidth)
            newY = startY + (startHeight - newHeight)
            break
          case "n":
            newHeight = Math.max(20, startHeight - deltaY)
            newY = startY + (startHeight - newHeight)
            break
          case "ne":
            newWidth = Math.max(20, startWidth + deltaX)
            newHeight = Math.max(20, startHeight - deltaY)
            newY = startY + (startHeight - newHeight)
            break
          case "w":
            newWidth = Math.max(20, startWidth - deltaX)
            newX = startX + (startWidth - newWidth)
            break
          case "e":
            newWidth = Math.max(20, startWidth + deltaX)
            break
          case "sw":
            newWidth = Math.max(20, startWidth - deltaX)
            newHeight = Math.max(20, startHeight + deltaY)
            newX = startX + (startWidth - newWidth)
            break
          case "s":
            newHeight = Math.max(20, startHeight + deltaY)
            break
          case "se":
            newWidth = Math.max(20, startWidth + deltaX)
            newHeight = Math.max(20, startHeight + deltaY)
            break
        }
      }

      setElements((prev) =>
        prev.map((el) =>
          el.id === elementId
            ? {
                ...el,
                size: { width: newWidth, height: newHeight },
                position: { x: newX, y: newY },
              }
            : el,
        ),
      )
    }

    const handleResizeEnd = (e: CustomEvent) => {
      const { elementId } = e.detail

      setElements((prev) =>
        prev.map((el) => {
          if (el.id === elementId) {
            const { _resizeData, ...rest } = el
            return rest
          }
          return el
        }),
      )
    }

    document.addEventListener("element:resize:start", handleResizeStart as EventListener)
    document.addEventListener("element:resize:move", handleResizeMove as EventListener)
    document.addEventListener("element:resize:end", handleResizeEnd as EventListener)

    return () => {
      document.removeEventListener("element:resize:start", handleResizeStart as EventListener)
      document.removeEventListener("element:resize:move", handleResizeMove as EventListener)
      document.removeEventListener("element:resize:end", handleResizeEnd as EventListener)
    }
  }, [elements, setElements])

  // 회전 이벤트 리스너 (기존과 동일)
  useEffect(() => {
    const handleRotateStart = (e: CustomEvent) => {
      const { elementId, clientX, clientY } = e.detail
      const element = elements.find((el) => el.id === elementId)
      if (!element) return

      const canvasRect = document.getElementById(elementId)?.parentElement?.getBoundingClientRect()
      if (!canvasRect) return

      const scale = e.detail.scale
      const elementCenterX = element.position.x + element.size.width / 2
      const elementCenterY = element.position.y + element.size.height / 2

      const rotateData = {
        elementCenterX,
        elementCenterY,
        canvasRect,
        scale,
      }

      setElements((prev) =>
        prev.map((el) =>
          el.id === elementId
            ? {
                ...el,
                _rotateData: rotateData,
              }
            : el,
        ),
      )
    }

    const handleRotateMove = (e: CustomEvent) => {
      const { elementId, clientX, clientY } = e.detail
      const element = elements.find((el) => el.id === elementId)
      if (!element || !element._rotateData) return

      const { elementCenterX, elementCenterY, canvasRect, scale } = element._rotateData

      const mouseX = (clientX - canvasRect.left) / scale
      const mouseY = (clientY - canvasRect.top) / scale

      const deltaX = mouseX - elementCenterX
      const deltaY = mouseY - elementCenterY
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

      const normalizedAngle = (angle + 90 + 360) % 360

      setElements((prev) =>
        prev.map((el) =>
          el.id === elementId
            ? {
                ...el,
                rotation: normalizedAngle,
              }
            : el,
        ),
      )
    }

    const handleRotateEnd = (e: CustomEvent) => {
      const { elementId } = e.detail

      setElements((prev) =>
        prev.map((el) => {
          if (el.id === elementId) {
            const { _rotateData, ...rest } = el
            return rest
          }
          return el
        }),
      )
    }

    document.addEventListener("element:rotate:start", handleRotateStart as EventListener)
    document.addEventListener("element:rotate:move", handleRotateMove as EventListener)
    document.addEventListener("element:rotate:end", handleRotateEnd as EventListener)

    return () => {
      document.removeEventListener("element:rotate:start", handleRotateStart as EventListener)
      document.removeEventListener("element:rotate:move", handleRotateMove as EventListener)
      document.removeEventListener("element:rotate:end", handleRotateEnd as EventListener)
    }
  }, [elements, setElements])

  // JSX 대신 React.createElement를 사용한 렌더링 함수들
  const renderShape = useCallback((element: any) => {
    if (element.type !== "shape") return null

    const shapeStyle = {
      opacity: element.opacity || 1,
    }

    switch (element.shapeType) {
      case "rectangle":
        return createElement("div", {
          className: "w-full h-full",
          style: {
            ...shapeStyle,
            backgroundColor: element.backgroundColor,
            border: `${element.borderWidth}px ${element.borderStyle} ${element.borderColor}`,
            borderRadius: element.borderRadius || 0,
          },
        })

      case "circle":
        return createElement("div", {
          className: "w-full h-full rounded-full",
          style: {
            ...shapeStyle,
            backgroundColor: element.backgroundColor,
            border: `${element.borderWidth}px ${element.borderStyle} ${element.borderColor}`,
          },
        })

      case "triangle":
        return createElement(
          "div",
          {
            className: "w-full h-full relative",
            style: shapeStyle,
          },
          createElement(
            "svg",
            {
              width: "100%",
              height: "100%",
              viewBox: "0 0 100 100",
              preserveAspectRatio: "none",
            },
            createElement("polygon", {
              points: "50,0 0,100 100,100",
              fill: element.backgroundColor,
              stroke: element.borderColor,
              strokeWidth: element.borderWidth,
            }),
          ),
        )

      default:
        return createElement("div", {
          className: "w-full h-full",
          style: {
            ...shapeStyle,
            backgroundColor: element.backgroundColor,
            border: `${element.borderWidth}px ${element.borderStyle} ${element.borderColor}`,
          },
        })
    }
  }, [])

  const renderImageFrame = useCallback(
    (element: any) => {
      if (element.type !== "image-frame") return null

      const frameStyle = {
        opacity: element.opacity || 1,
      }

      const borderRadius = element.shapeType === "rectangle-frame" ? element.borderRadius || 0 : "50%"

      return createElement(
        "div",
        {
          className: "w-full h-full relative overflow-hidden",
          style: {
            ...frameStyle,
            border: `${element.borderWidth}px ${element.borderStyle} ${element.borderColor}`,
            borderRadius: borderRadius,
            backgroundColor: element.backgroundColor,
          },
        },
        element.imageSrc
          ? createElement(
              "div",
              {
                className: "w-full h-full relative overflow-hidden",
                "data-image-editing": editingImageId === element.id ? element.id : undefined,
              },
              createElement("img", {
                src: element.imageSrc || "/placeholder.svg",
                alt: element.imageFileName || "Frame image",
                className: `w-full h-full ${editingImageId === element.id ? "cursor-move" : "cursor-pointer"}`,
                style: {
                  objectFit: element.imageFit || "cover",
                  opacity: element.imageOpacity || 1,
                  transform: `scale(${element.imageScale || 1}) translate(${element.imageOffsetX || 0}px, ${
                    element.imageOffsetY || 0
                  }px)`,
                  transformOrigin: "center",
                },
                draggable: false,
              }),
            )
          : createElement(
              "div",
              {
                className: "w-full h-full flex items-center justify-center bg-gray-100 text-gray-400",
              },
              createElement(
                "div",
                { className: "text-center" },
                createElement("div", { className: "text-2xl mb-2" }, "📷"),
                createElement("div", { className: "text-xs" }, "이미지 추가"),
              ),
            ),
      )
    },
    [editingImageId],
  )

  const renderText = useCallback(
    (element: any) => {
      if (element.type !== "text") return null

      const computedStyle = element.computedStyle || {}

      return createElement(
        "div",
        {
          className: `w-full h-full ${element.textStyle || ""}`,
          style: {
            color: element.color,
            backgroundColor: element.backgroundColor,
            fontSize: `${computedStyle.fontSize || 16}px`,
            fontFamily: computedStyle.fontFamily || "Inter",
            fontWeight: computedStyle.fontWeight || "400",
            textAlign: computedStyle.textAlign || "left",
            lineHeight: computedStyle.lineHeight || 1.5,
            letterSpacing: computedStyle.letterSpacing || "0px",
            fontStyle: computedStyle.fontStyle || "normal",
            textDecoration: computedStyle.textDecoration || "none",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          },
        },
        element.content,
      )
    },
    [selectedElementId],
  )

  return {
    renderShape,
    renderImageFrame,
    renderText,
  }
}
