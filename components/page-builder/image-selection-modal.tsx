"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, RefreshCw } from "lucide-react"
import { getStorageImages, getStorageFolderByKeyword } from "@/lib/supabase-image-utils"

interface ImageSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectImage: (imageUrl: string) => void
  keyword: string
  currentImageSrc?: string
}

export function ImageSelectionModal({
  isOpen,
  onClose,
  onSelectImage,
  keyword,
  currentImageSrc,
}: ImageSelectionModalProps) {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 이미지 목록 로드
  const loadImages = async () => {
    setLoading(true)
    try {
      const folderPath = getStorageFolderByKeyword(keyword)
      if (folderPath) {
        const imageUrls = await getStorageImages("image", folderPath)
        setImages(imageUrls)
        console.log(`[IMAGE_SELECTION] ${keyword}에 대한 이미지 ${imageUrls.length}개 로드됨`)
      } else {
        console.warn(`[IMAGE_SELECTION] 키워드 "${keyword}"는 이미지 선택 대상이 아닙니다`)
        setImages([])
      }
    } catch (error) {
      console.error("[IMAGE_SELECTION] 이미지 로드 실패:", error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  // 모달이 열릴 때 이미지 로드
  useEffect(() => {
    if (isOpen) {
      loadImages()
      setSelectedImage(currentImageSrc || null)
    }
  }, [isOpen, keyword, currentImageSrc])

  // 이미지 선택 핸들러
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  // 선택 확인 핸들러
  const handleConfirmSelection = () => {
    if (selectedImage) {
      onSelectImage(selectedImage)
      onClose()
    }
  }

  // 모달 닫기 핸들러
  const handleClose = () => {
    setSelectedImage(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">이미지 선택 - {keyword}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={loadImages}
                disabled={loading}
                className="text-gray-600 hover:text-gray-800"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                새로고침
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClose} className="text-gray-600 hover:text-gray-800">
                <X size={16} />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* 현재 선택된 이미지 표시 */}
          {currentImageSrc && (
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 mb-2">현재 이미지:</p>
              <div className="w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={currentImageSrc || "/placeholder.svg"}
                  alt="현재 이미지"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=128&width=128&text=이미지 로드 실패"
                  }}
                />
              </div>
            </div>
          )}

          {/* 로딩 상태 */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-gray-600">
                <RefreshCw size={20} className="animate-spin" />
                <span>이미지를 불러오는 중...</span>
              </div>
            </div>
          )}

          {/* 이미지 그리드 */}
          {!loading && images.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-600">사용 가능한 이미지 ({images.length}개) - 클릭하여 선택하세요:</p>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-96 overflow-y-auto">
                {images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === imageUrl
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleImageSelect(imageUrl)}
                  >
                    <div className="aspect-square">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={`이미지 ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=100&width=100&text=로드 실패"
                        }}
                      />
                    </div>
                    {selectedImage === imageUrl && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 이미지 없음 상태 */}
          {!loading && images.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium">사용 가능한 이미지가 없습니다</p>
              <p className="text-sm">"{keyword}" 키워드에 해당하는 이미지를 먼저 업로드해주세요.</p>
            </div>
          )}

          {/* 버튼 영역 */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button
              onClick={handleConfirmSelection}
              disabled={!selectedImage}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              선택 완료
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
