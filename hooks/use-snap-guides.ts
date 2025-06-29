"use client"

import { useCallback, useState } from "react"

interface SnapResult {
  x: number
  y: number
  snapLines: Array<{
    type: "vertical" | "horizontal"
    position: number
    color: string
  }>
}

interface ResizeSnapResult {
  width: number
  height: number
  x: number
  y: number
  snapLines: Array<{
    type: "vertical" | "horizontal"
    position: number
    color: string
  }>
}

export function useSnapGuides(elements: any[], canvasWidth: number, canvasHeight: number, snapDistance = 10) {
  const [snapLines, setSnapLines] = useState<
    Array<{
      type: "vertical" | "horizontal"
      position: number
      color: string
    }>
  >([])

  const calculateSnap = useCallback(
    (elementId: string, newX: number, newY: number, elementWidth: number, elementHeight: number): SnapResult => {
      let snappedX = newX
      let snappedY = newY
      const currentSnapLines: Array<{
        type: "vertical" | "horizontal"
        position: number
        color: string
      }> = []

      // 캔버스 경계선 스냅
      const canvasSnapPoints = {
        // 좌측 경계
        left: 0,
        // 우측 경계
        right: canvasWidth - elementWidth,
        // 상단 경계
        top: 0,
        // 하단 경계
        bottom: canvasHeight - elementHeight,
        // 중앙
        centerX: (canvasWidth - elementWidth) / 2,
        centerY: (canvasHeight - elementHeight) / 2,
      }

      // X축 스냅 (수직선)
      if (Math.abs(newX - canvasSnapPoints.left) < snapDistance) {
        snappedX = canvasSnapPoints.left
        currentSnapLines.push({ type: "vertical", position: 0, color: "#ef4444" })
      } else if (Math.abs(newX - canvasSnapPoints.right) < snapDistance) {
        snappedX = canvasSnapPoints.right
        currentSnapLines.push({ type: "vertical", position: canvasWidth, color: "#ef4444" })
      } else if (Math.abs(newX - canvasSnapPoints.centerX) < snapDistance) {
        snappedX = canvasSnapPoints.centerX
        currentSnapLines.push({ type: "vertical", position: canvasWidth / 2, color: "#3b82f6" })
      }

      // Y축 스냅 (수평선)
      if (Math.abs(newY - canvasSnapPoints.top) < snapDistance) {
        snappedY = canvasSnapPoints.top
        currentSnapLines.push({ type: "horizontal", position: 0, color: "#ef4444" })
      } else if (Math.abs(newY - canvasSnapPoints.bottom) < snapDistance) {
        snappedY = canvasSnapPoints.bottom
        currentSnapLines.push({ type: "horizontal", position: canvasHeight, color: "#ef4444" })
      } else if (Math.abs(newY - canvasSnapPoints.centerY) < snapDistance) {
        snappedY = canvasSnapPoints.centerY
        currentSnapLines.push({ type: "horizontal", position: canvasHeight / 2, color: "#3b82f6" })
      }

      // 다른 요소들과의 스냅
      const otherElements = elements.filter((el) => el.id !== elementId)

      for (const otherElement of otherElements) {
        const otherLeft = otherElement.position.x
        const otherRight = otherElement.position.x + otherElement.size.width
        const otherTop = otherElement.position.y
        const otherBottom = otherElement.position.y + otherElement.size.height
        const otherCenterX = otherElement.position.x + otherElement.size.width / 2
        const otherCenterY = otherElement.position.y + otherElement.size.height / 2

        const currentLeft = snappedX
        const currentRight = snappedX + elementWidth
        const currentTop = snappedY
        const currentBottom = snappedY + elementHeight
        const currentCenterX = snappedX + elementWidth / 2
        const currentCenterY = snappedY + elementHeight / 2

        // X축 정렬 (수직선)
        if (Math.abs(currentLeft - otherLeft) < snapDistance) {
          snappedX = otherLeft
          currentSnapLines.push({ type: "vertical", position: otherLeft, color: "#10b981" })
        } else if (Math.abs(currentRight - otherRight) < snapDistance) {
          snappedX = otherRight - elementWidth
          currentSnapLines.push({ type: "vertical", position: otherRight, color: "#10b981" })
        } else if (Math.abs(currentCenterX - otherCenterX) < snapDistance) {
          snappedX = otherCenterX - elementWidth / 2
          currentSnapLines.push({ type: "vertical", position: otherCenterX, color: "#8b5cf6" })
        } else if (Math.abs(currentLeft - otherRight) < snapDistance) {
          snappedX = otherRight
          currentSnapLines.push({ type: "vertical", position: otherRight, color: "#f59e0b" })
        } else if (Math.abs(currentRight - otherLeft) < snapDistance) {
          snappedX = otherLeft - elementWidth
          currentSnapLines.push({ type: "vertical", position: otherLeft, color: "#f59e0b" })
        }

        // Y축 정렬 (수평선)
        if (Math.abs(currentTop - otherTop) < snapDistance) {
          snappedY = otherTop
          currentSnapLines.push({ type: "horizontal", position: otherTop, color: "#10b981" })
        } else if (Math.abs(currentBottom - otherBottom) < snapDistance) {
          snappedY = otherBottom - elementHeight
          currentSnapLines.push({ type: "horizontal", position: otherBottom, color: "#10b981" })
        } else if (Math.abs(currentCenterY - otherCenterY) < snapDistance) {
          snappedY = otherCenterY - elementHeight / 2
          currentSnapLines.push({ type: "horizontal", position: otherCenterY, color: "#8b5cf6" })
        } else if (Math.abs(currentTop - otherBottom) < snapDistance) {
          snappedY = otherBottom
          currentSnapLines.push({ type: "horizontal", position: otherBottom, color: "#f59e0b" })
        } else if (Math.abs(currentBottom - otherTop) < snapDistance) {
          snappedY = otherTop - elementHeight
          currentSnapLines.push({ type: "horizontal", position: otherTop, color: "#f59e0b" })
        }
      }

      return {
        x: Math.round(snappedX),
        y: Math.round(snappedY),
        snapLines: currentSnapLines,
      }
    },
    [elements, canvasWidth, canvasHeight, snapDistance],
  )

  // 리사이즈용 스냅 계산 함수 추가
  const calculateResizeSnap = useCallback(
    (
      elementId: string,
      direction: string,
      newX: number,
      newY: number,
      newWidth: number,
      newHeight: number,
    ): ResizeSnapResult => {
      let snappedX = newX
      let snappedY = newY
      let snappedWidth = newWidth
      let snappedHeight = newHeight
      const currentSnapLines: Array<{
        type: "vertical" | "horizontal"
        position: number
        color: string
      }> = []

      // 캔버스 경계 스냅
      const currentLeft = snappedX
      const currentRight = snappedX + snappedWidth
      const currentTop = snappedY
      const currentBottom = snappedY + snappedHeight

      // 우측 경계 스냅 (e, ne, se 방향)
      if (direction.includes("e") && Math.abs(currentRight - canvasWidth) < snapDistance) {
        snappedWidth = canvasWidth - snappedX
        currentSnapLines.push({ type: "vertical", position: canvasWidth, color: "#ef4444" })
      }

      // 좌측 경계 스냅 (w, nw, sw 방향)
      if (direction.includes("w") && Math.abs(currentLeft) < snapDistance) {
        const widthDiff = snappedX
        snappedX = 0
        snappedWidth = snappedWidth + widthDiff
        currentSnapLines.push({ type: "vertical", position: 0, color: "#ef4444" })
      }

      // 하단 경계 스냅 (s, se, sw 방향)
      if (direction.includes("s") && Math.abs(currentBottom - canvasHeight) < snapDistance) {
        snappedHeight = canvasHeight - snappedY
        currentSnapLines.push({ type: "horizontal", position: canvasHeight, color: "#ef4444" })
      }

      // 상단 경계 스냅 (n, ne, nw 방향)
      if (direction.includes("n") && Math.abs(currentTop) < snapDistance) {
        const heightDiff = snappedY
        snappedY = 0
        snappedHeight = snappedHeight + heightDiff
        currentSnapLines.push({ type: "horizontal", position: 0, color: "#ef4444" })
      }

      // 다른 요소들과의 스냅
      const otherElements = elements.filter((el) => el.id !== elementId)

      for (const otherElement of otherElements) {
        const otherLeft = otherElement.position.x
        const otherRight = otherElement.position.x + otherElement.size.width
        const otherTop = otherElement.position.y
        const otherBottom = otherElement.position.y + otherElement.size.height

        // 재계산된 현재 요소의 경계
        const updatedLeft = snappedX
        const updatedRight = snappedX + snappedWidth
        const updatedTop = snappedY
        const updatedBottom = snappedY + snappedHeight

        // 우측 스냅 (e, ne, se 방향)
        if (direction.includes("e")) {
          if (Math.abs(updatedRight - otherLeft) < snapDistance) {
            snappedWidth = otherLeft - snappedX
            currentSnapLines.push({ type: "vertical", position: otherLeft, color: "#10b981" })
          } else if (Math.abs(updatedRight - otherRight) < snapDistance) {
            snappedWidth = otherRight - snappedX
            currentSnapLines.push({ type: "vertical", position: otherRight, color: "#10b981" })
          }
        }

        // 좌측 스냅 (w, nw, sw 방향)
        if (direction.includes("w")) {
          if (Math.abs(updatedLeft - otherLeft) < snapDistance) {
            const widthDiff = snappedX - otherLeft
            snappedX = otherLeft
            snappedWidth = snappedWidth + widthDiff
            currentSnapLines.push({ type: "vertical", position: otherLeft, color: "#10b981" })
          } else if (Math.abs(updatedLeft - otherRight) < snapDistance) {
            const widthDiff = snappedX - otherRight
            snappedX = otherRight
            snappedWidth = snappedWidth + widthDiff
            currentSnapLines.push({ type: "vertical", position: otherRight, color: "#10b981" })
          }
        }

        // 하단 스냅 (s, se, sw 방향)
        if (direction.includes("s")) {
          if (Math.abs(updatedBottom - otherTop) < snapDistance) {
            snappedHeight = otherTop - snappedY
            currentSnapLines.push({ type: "horizontal", position: otherTop, color: "#10b981" })
          } else if (Math.abs(updatedBottom - otherBottom) < snapDistance) {
            snappedHeight = otherBottom - snappedY
            currentSnapLines.push({ type: "horizontal", position: otherBottom, color: "#10b981" })
          }
        }

        // 상단 스냅 (n, ne, nw 방향)
        if (direction.includes("n")) {
          if (Math.abs(updatedTop - otherTop) < snapDistance) {
            const heightDiff = snappedY - otherTop
            snappedY = otherTop
            snappedHeight = snappedHeight + heightDiff
            currentSnapLines.push({ type: "horizontal", position: otherTop, color: "#10b981" })
          } else if (Math.abs(updatedTop - otherBottom) < snapDistance) {
            const heightDiff = snappedY - otherBottom
            snappedY = otherBottom
            snappedHeight = snappedHeight + heightDiff
            currentSnapLines.push({ type: "horizontal", position: otherBottom, color: "#10b981" })
          }
        }
      }

      return {
        x: Math.round(snappedX),
        y: Math.round(snappedY),
        width: Math.round(Math.max(20, snappedWidth)),
        height: Math.round(Math.max(20, snappedHeight)),
        snapLines: currentSnapLines,
      }
    },
    [elements, canvasWidth, canvasHeight, snapDistance],
  )

  const clearSnapLines = useCallback(() => {
    setSnapLines([])
  }, [])

  const updateSnapLines = useCallback(
    (
      lines: Array<{
        type: "vertical" | "horizontal"
        position: number
        color: string
      }>,
    ) => {
      setSnapLines(lines)
    },
    [],
  )

  return {
    calculateSnap,
    calculateResizeSnap,
    snapLines,
    clearSnapLines,
    updateSnapLines,
  }
}
