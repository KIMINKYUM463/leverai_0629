"use client"

import type React from "react"
import { useCallback } from "react"

export function useCanvasInteractions(
  isPanning: boolean,
  setIsPanning: (isPanning: boolean) => void,
  lastMousePosRef: React.MutableRefObject<{ x: number; y: number }>,
  canvasContainerRef: React.RefObject<HTMLDivElement>,
  zoom: number,
  changeZoomLevel: (newZoom: number) => void,
) {
  // 리사이즈 시작 함수 - 스냅 기능 포함
  const handleResizeStart = useCallback(
    (
      e: React.MouseEvent,
      elementId: string,
      direction: string,
      elements: any[],
      setElements: any,
      calculateResizeSnap?: any,
      updateSnapLines?: any,
      clearSnapLines?: any,
      snapEnabled = true,
    ) => {
      e.stopPropagation()
      e.preventDefault()

      const scale = zoom / 100
      const startMouseX = e.clientX
      const startMouseY = e.clientY

      // 현재 요소 찾기
      const element = elements.find((el) => el.id === elementId)
      if (!element) return

      const startWidth = element.size.width
      const startHeight = element.size.height
      const startX = element.position.x
      const startY = element.position.y

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = (moveEvent.clientX - startMouseX) / scale
        const deltaY = (moveEvent.clientY - startMouseY) / scale

        let newWidth = startWidth
        let newHeight = startHeight
        let newX = startX
        let newY = startY

        // 방향에 따른 리사이즈 계산
        switch (direction) {
          case "nw": // 북서쪽
            newWidth = Math.max(20, startWidth - deltaX)
            newHeight = Math.max(20, startHeight - deltaY)
            newX = startX + (startWidth - newWidth)
            newY = startY + (startHeight - newHeight)
            break
          case "n": // 북쪽
            newHeight = Math.max(20, startHeight - deltaY)
            newY = startY + (startHeight - newHeight)
            break
          case "ne": // 북동쪽
            newWidth = Math.max(20, startWidth + deltaX)
            newHeight = Math.max(20, startHeight - deltaY)
            newY = startY + (startHeight - newHeight)
            break
          case "w": // 서쪽
            newWidth = Math.max(20, startWidth - deltaX)
            newX = startX + (startWidth - newWidth)
            break
          case "e": // 동쪽
            newWidth = Math.max(20, startWidth + deltaX)
            break
          case "sw": // 남서쪽
            newWidth = Math.max(20, startWidth - deltaX)
            newHeight = Math.max(20, startHeight + deltaY)
            newX = startX + (startWidth - newWidth)
            break
          case "s": // 남쪽
            newHeight = Math.max(20, startHeight + deltaY)
            break
          case "se": // 남동쪽
            newWidth = Math.max(20, startWidth + deltaX)
            newHeight = Math.max(20, startHeight + deltaY)
            break
        }

        // Shift 키를 누르면 비율 유지
        if (moveEvent.shiftKey) {
          const aspectRatio = startWidth / startHeight
          if (direction.includes("e") || direction.includes("w")) {
            newHeight = newWidth / aspectRatio
          } else if (direction.includes("n") || direction.includes("s")) {
            newWidth = newHeight * aspectRatio
          }
        }

        // 스냅 기능 적용
        if (snapEnabled && calculateResizeSnap && updateSnapLines) {
          const snapResult = calculateResizeSnap(elementId, direction, newX, newY, newWidth, newHeight)
          newX = snapResult.x
          newY = snapResult.y
          newWidth = snapResult.width
          newHeight = snapResult.height
          updateSnapLines(snapResult.snapLines)
        }

        // 요소 업데이트
        setElements((prev: any[]) =>
          prev.map((el) =>
            el.id === elementId
              ? {
                  ...el,
                  size: { width: Math.round(newWidth), height: Math.round(newHeight) },
                  position: { x: Math.round(newX), y: Math.round(newY) },
                }
              : el,
          ),
        )
      }

      const handleMouseUp = () => {
        if (clearSnapLines) {
          clearSnapLines()
        }
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [zoom],
  )

  // 회전 시작 함수
  const handleRotateStart = useCallback(
    (e: React.MouseEvent, elementId: string, elements: any[], setElements: any) => {
      e.stopPropagation()
      e.preventDefault()

      const element = elements.find((el) => el.id === elementId)
      if (!element) return

      const elementCenterX = element.position.x + element.size.width / 2
      const elementCenterY = element.position.y + element.size.height / 2
      const scale = zoom / 100

      // 캔버스 컨테이너의 위치 계산
      const canvasRect = canvasContainerRef.current?.getBoundingClientRect()
      if (!canvasRect) return

      const getAngle = (clientX: number, clientY: number) => {
        const canvasX = (clientX - canvasRect.left) / scale
        const canvasY = (clientY - canvasRect.top) / scale
        return Math.atan2(canvasY - elementCenterY, canvasX - elementCenterX) * (180 / Math.PI)
      }

      const startAngle = getAngle(e.clientX, e.clientY)
      const startRotation = element.rotation || 0

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentAngle = getAngle(moveEvent.clientX, moveEvent.clientY)
        let newRotation = startRotation + (currentAngle - startAngle)

        // Shift 키를 누르면 15도 단위로 스냅
        if (moveEvent.shiftKey) {
          newRotation = Math.round(newRotation / 15) * 15
        }

        // -180 ~ 180 범위로 정규화
        while (newRotation > 180) newRotation -= 360
        while (newRotation < -180) newRotation += 360

        setElements((prev: any[]) =>
          prev.map((el) => (el.id === elementId ? { ...el, rotation: Math.round(newRotation) } : el)),
        )
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [zoom, canvasContainerRef],
  )

  return {
    handleResizeStart,
    handleRotateStart,
  }
}
