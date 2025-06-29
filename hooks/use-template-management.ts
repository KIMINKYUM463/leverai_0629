"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { loadTemplate, loadTemplateFromSupabase } from "@/lib/template-loader"

export function useTemplateManagement(
  elements: any[],
  setElements: (elements: any[] | ((prev: any[]) => any[])) => void,
  editingTextId: string | null,
  textEditRef: React.RefObject<HTMLDivElement>,
  canvasBackgroundColor: string,
  setCanvasBackgroundColor: (color: string) => void,
  canvasWidth: number,
  canvasHeight: number,
  fileInputRef: React.RefObject<HTMLInputElement>,
  setCanvasHeight?: (height: number) => void,
  /** optional – NOT required by old callers */
  setSelectedElementId?: (id: string | null) => void,
) {
  const [isLoading, setIsLoading] = useState(false)
  const safeElements = Array.isArray(elements) ? elements : [] // Declare safeElements here

  // 이미지를 Base64로 변환하는 함수
  const convertImageToBase64 = useCallback((imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // 이미 Base64인 경우 그대로 반환
      if (imageUrl.startsWith("data:")) {
        resolve(imageUrl)
        return
      }

      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d")

          if (!ctx) {
            reject(new Error("Canvas context not available"))
            return
          }

          canvas.width = img.width
          canvas.height = img.height

          ctx.drawImage(img, 0, 0)

          // JPEG 형식으로 압축 (품질 0.8)
          const base64 = canvas.toDataURL("image/jpeg", 0.8)
          resolve(base64)
        } catch (error) {
          console.error("이미지 변환 오류:", error)
          resolve(imageUrl) // 변환 실패 시 원본 URL 반환
        }
      }

      img.onerror = () => {
        console.error("이미지 로드 실패:", imageUrl)
        resolve(imageUrl) // 로드 실패 시 원본 URL 반환
      }

      img.src = imageUrl
    })
  }, [])

  // Base64를 Blob URL로 변환하는 함수
  const convertBase64ToBlob = useCallback((base64: string): string => {
    try {
      if (!base64.startsWith("data:")) {
        return base64 // Base64가 아닌 경우 그대로 반환
      }

      const arr = base64.split(",")
      const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg"
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      const blob = new Blob([u8arr], { type: mime })
      return URL.createObjectURL(blob)
    } catch (error) {
      console.error("Base64 변환 오류:", error)
      return base64 // 변환 실패 시 원본 반환
    }
  }, [])

  // 템플릿을 JSON으로 직렬화하는 함수 (이미지 Base64 변환 포함)
  const serializeTemplateToJSON = useCallback(async () => {
    console.log("템플릿 저장 시작 - 이미지 변환 중...")

    try {
      // 모든 이미지 요소를 Base64로 변환
      const processedElements = await Promise.all(
        safeElements.map(async (element) => {
          if (element.type === "image" && element.src && !element.src.startsWith("data:")) {
            console.log("이미지 변환 중:", element.fileName)
            const base64 = await convertImageToBase64(element.src)
            return {
              ...element,
              src: base64,
              originalSrc: element.src, // 원본 URL 백업
            }
          }
          return element
        }),
      )

      const template = {
        canvasSize: {
          width: canvasWidth || 860,
          height: canvasHeight || 3000,
        },
        backgroundColor: canvasBackgroundColor || "#FFFFFF",
        elements: processedElements,
        savedAt: new Date().toISOString(),
        version: "2.0", // 버전 정보 추가
      }

      console.log(
        "템플릿 저장 완료 - 처리된 이미지:",
        processedElements.filter((el) => el.type === "image").length,
        "개",
      )
      return JSON.stringify(template, null, 2)
    } catch (error) {
      console.error("템플릿 직렬화 오류:", error)
      // 오류 발생 시 기본 저장
      const template = {
        canvasSize: { width: canvasWidth || 860, height: canvasHeight || 3000 },
        backgroundColor: canvasBackgroundColor || "#FFFFFF",
        elements: safeElements,
        savedAt: new Date().toISOString(),
        version: "2.0",
      }
      return JSON.stringify(template, null, 2)
    }
  }, [elements, canvasBackgroundColor, canvasWidth, canvasHeight, convertImageToBase64])

  // 템플릿 저장 함수
  const saveTemplateAsJSON = useCallback(async () => {
    try {
      const now = new Date()
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "")
      const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "")
      const fileName = `template-${dateStr}-${timeStr}.json`

      console.log("템플릿 저장 중...")
      const jsonData = await serializeTemplateToJSON()

      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()

      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100)

      alert(
        `템플릿이 저장되었습니다!\n파일명: ${fileName}\n이미지 포함: ${safeElements.filter((el) => el.type === "image").length}개`,
      )
    } catch (error) {
      console.error("템플릿 저장 오류:", error)
      alert("템플릿 저장 중 오류가 발생했습니다.")
    }
  }, [serializeTemplateToJSON, safeElements])

  // 템플릿 불러오기 버튼 클릭 핸들러
  const handleLoadTemplateClick = useCallback(() => {
    if (fileInputRef?.current) {
      fileInputRef.current.click()
    }
  }, [fileInputRef])

  // 파일 업로드 핸들러
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const jsonContent = e.target?.result as string
        const templateData = JSON.parse(jsonContent)

        console.log("템플릿 불러오기 시작:", templateData)
        loadTemplateFromJSON(templateData)
      } catch (error) {
        console.error("템플릿 파일 파싱 오류:", error)
        alert("템플릿 파일을 불러오는 중 오류가 발생했습니다. 파일 형식을 확인해주세요.")
      }
    }
    reader.readAsText(file)

    if (event.target) {
      event.target.value = ""
    }
  }, [])

  // JSON 데이터로부터 템플릿 로드 함수
  const loadTemplateFromJSON = useCallback(
    (templateData: any) => {
      try {
        console.log("템플릿 로드 시작...")

        // 배경색 설정
        if (templateData.backgroundColor && setCanvasBackgroundColor) {
          setCanvasBackgroundColor(templateData.backgroundColor)
          console.log("배경색 설정:", templateData.backgroundColor)
        }

        // 캔버스 크기 설정
        if (templateData.canvasSize && typeof templateData.canvasSize.height === "number") {
          if (typeof setCanvasHeight === "function") {
            const height = templateData.canvasSize.height
            console.log("캔버스 높이 설정:", height)
            setCanvasHeight(height)
          }
        }

        // 요소 설정 (이미지 Base64 → Blob URL 변환)
        if (Array.isArray(templateData.elements)) {
          const processedElements = templateData.elements.map((element: any) => {
            if (element.type === "image" && element.src) {
              if (element.src.startsWith("data:")) {
                // Base64 이미지를 Blob URL로 변환
                const blobUrl = convertBase64ToBlob(element.src)
                console.log("이미지 복원:", element.fileName, "→", blobUrl.substring(0, 50) + "...")
                return {
                  ...element,
                  src: blobUrl,
                  base64Src: element.src, // Base64 백업
                }
              }
            }
            return element
          })

          setElements(processedElements)
          console.log("템플릿 로드 완료 - 요소:", processedElements.length, "개")
          console.log("이미지 요소:", processedElements.filter((el: any) => el.type === "image").length, "개")

          setTimeout(() => {
            alert(
              `템플릿 불러오기 완료!\n요소: ${processedElements.length}개\n이미지: ${processedElements.filter((el: any) => el.type === "image").length}개`,
            )
          }, 100)
        }
      } catch (error) {
        console.error("템플릿 로드 오류:", error)
        alert("템플릿을 불러오는 중 오류가 발생했습니다.")
      }
    },
    [setElements, setCanvasBackgroundColor, setCanvasHeight, convertBase64ToBlob],
  )

  // 템플릿 적용 함수 (originalId 보존)
  const applyTemplate = useCallback(
    async (templatePath: string) => {
      setIsLoading(true)
      try {
        console.log("🔄 템플릿 로딩 시작:", templatePath)

        let templateData

        // Supabase 템플릿인지 로컬 파일인지 구분
        if (templatePath.startsWith("/api/") || templatePath.includes("supabase")) {
          templateData = await loadTemplateFromSupabase(templatePath)
        } else {
          templateData = await loadTemplate(templatePath)
        }

        if (templateData.elements && templateData.elements.length > 0) {
          console.log("✅ 템플릿 로딩 완료. 요소 수:", templateData.elements.length)

          // 각 요소의 originalId 로깅
          templateData.elements.forEach((element: any, index: number) => {
            if (element.type === "image-frame") {
              console.log(`📷 이미지 프레임 ${index + 1}:`, {
                newId: element.id,
                originalId: element.originalId,
                shapeType: element.shapeType,
                name: element.name,
              })
            }
          })

          setElements(templateData.elements)
          setSelectedElementId?.(null)

          // 성공 메시지
          const imageFrameCount = templateData.elements.filter((el: any) => el.type === "image-frame").length
          console.log(`🎉 템플릿 적용 완료! 이미지 프레임 ${imageFrameCount}개의 originalId가 보존되었습니다.`)
        } else {
          console.error("❌ 템플릿 데이터가 비어있습니다")
        }
      } catch (error) {
        console.error("❌ 템플릿 적용 실패:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [setElements, setSelectedElementId],
  )

  // 빠른 템플릿 적용 (기존 요소 유지하면서 추가)
  const quickApplyTemplate = useCallback(
    async (templatePath: string) => {
      setIsLoading(true)
      try {
        let templateData

        if (templatePath.startsWith("/api/") || templatePath.includes("supabase")) {
          templateData = await loadTemplateFromSupabase(templatePath)
        } else {
          templateData = await loadTemplate(templatePath)
        }

        if (templateData.elements && templateData.elements.length > 0) {
          setElements((prevElements) => {
            // 기존 요소들의 zIndex 최대값 계산
            const maxZIndex = prevElements.length > 0 ? Math.max(...prevElements.map((el) => el.zIndex || 1)) : 0

            // 새 요소들의 zIndex 조정 및 위치 오프셋
            const newElements = templateData.elements.map((element: any, index: number) => ({
              ...element,
              zIndex: maxZIndex + index + 1,
              position: {
                x: element.position.x + 50, // 약간 오프셋
                y: element.position.y + 50,
              },
            }))

            console.log("🔄 빠른 템플릿 적용 - 새 요소들:", newElements)
            return [...prevElements, ...newElements]
          })
        }
      } catch (error) {
        console.error("빠른 템플릿 적용 실패:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [setElements],
  )

  return {
    applyTemplate,
    quickApplyTemplate,
    isLoading,
    serializeTemplateToJSON,
    saveTemplateAsJSON,
    handleLoadTemplateClick,
    handleFileUpload,
    loadTemplateFromJSON,
  }
}
