"use client"

import type React from "react"
import { useCallback } from "react"

export function useImageSaving(
  canvasRef: React.RefObject<HTMLDivElement>,
  canvasBackgroundColor: string,
  imageFormat: "png" | "jpeg",
  imageQuality: number,
  fileName: string,
  setIsSaving: (saving: boolean) => void,
  setShowGuideLines: (show: boolean) => void,
  setShowImageSaveModal: (show: boolean) => void,
) {
  // 이미지로 저장하기 함수
  const saveAsImage = useCallback(async () => {
    if (!canvasRef.current) return

    try {
      setIsSaving(true)
      setShowGuideLines(false)

      await new Promise((resolve) => setTimeout(resolve, 100))

      const html2canvasModule = await import("html2canvas")
      const html2canvas = html2canvasModule.default

      const loadingToast = document.createElement("div")
      loadingToast.className = "fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50"
      loadingToast.textContent = "이미지 생성 중..."
      document.body.appendChild(loadingToast)

      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: canvasBackgroundColor,
        logging: false,
      })

      const imageData = canvas.toDataURL(`image/${imageFormat}`, imageFormat === "jpeg" ? imageQuality : undefined)

      const link = document.createElement("a")
      link.download = `${fileName}.${imageFormat}`
      link.href = imageData
      link.click()

      document.body.removeChild(loadingToast)

      const successToast = document.createElement("div")
      successToast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"
      successToast.textContent = "이미지가 성공적으로 저장되었습니다!"
      document.body.appendChild(successToast)

      setTimeout(() => {
        document.body.removeChild(successToast)
      }, 3000)

      setShowImageSaveModal(false)
    } catch (error) {
      console.error("이미지 저장 중 오류 발생:", error)
      alert("이미지 저장 중 오류가 발생했습니다.")
    } finally {
      setShowGuideLines(true)
      setIsSaving(false)
    }
  }, [
    canvasRef,
    canvasBackgroundColor,
    imageFormat,
    imageQuality,
    fileName,
    setIsSaving,
    setShowGuideLines,
    setShowImageSaveModal,
  ])

  return {
    saveAsImage,
  }
}
