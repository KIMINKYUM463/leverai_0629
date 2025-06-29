"use client"

import type React from "react"

import { useEffect } from "react"

export function useZoomControls(
  zoom: number,
  setZoom: (zoom: number) => void,
  canvasContainerRef: React.RefObject<HTMLDivElement>,
  canvasWidth: number,
  canvasHeight: number,
) {
  // 줌 레벨 변경 함수
  const changeZoomLevel = (newZoom: number) => {
    const clampedZoom = Math.min(Math.max(5, newZoom), 200)
    setZoom(clampedZoom)
  }

  // 화면에 맞게 줌 레벨 조정 함수
  const fitCanvasToScreen = () => {
    if (!canvasContainerRef.current) return

    const containerWidth = canvasContainerRef.current.clientWidth - 32
    const containerHeight = canvasContainerRef.current.clientHeight - 32

    const widthRatio = containerWidth / canvasWidth
    const heightRatio = containerHeight / canvasHeight

    const ratio = Math.min(widthRatio, heightRatio)
    let newZoom = Math.floor(ratio * 100)

    newZoom = Math.max(newZoom, 5)
    newZoom = Math.min(newZoom, 100)

    setZoom(newZoom)

    if (canvasContainerRef.current) {
      canvasContainerRef.current.scrollTop = 0
    }
  }

  // 컴포넌트 마운트 시 화면에 맞게 줌 레벨 조정
  useEffect(() => {
    const timer = setTimeout(() => {
      fitCanvasToScreen()
    }, 100)

    const secondTimer = setTimeout(() => {
      fitCanvasToScreen()
    }, 500)

    return () => {
      clearTimeout(timer)
      clearTimeout(secondTimer)
    }
  }, [])

  // 윈도우 리사이즈 시 화면에 맞게 줌 레벨 재조정
  useEffect(() => {
    const handleResize = () => {
      fitCanvasToScreen()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Ctrl + 마우스 휠로 확대/축소 기능
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const zoomDelta = e.deltaY > 0 ? -5 : 5
        const newZoom = zoom + zoomDelta
        changeZoomLevel(newZoom)
      }
    }

    const containerElement = canvasContainerRef.current
    if (containerElement) {
      containerElement.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener("wheel", handleWheel)
      }
    }
  }, [zoom])

  return {
    changeZoomLevel,
    fitCanvasToScreen,
  }
}
