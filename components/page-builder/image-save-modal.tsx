"use client"
import { Button } from "@/components/ui/button"

interface ImageSaveModalProps {
  imageFormat: "png" | "jpeg"
  imageQuality: number
  fileName: string
  setImageFormat: (format: "png" | "jpeg") => void
  setImageQuality: (quality: number) => void
  setFileName: (name: string) => void
  saveAsImage: () => void
  setShowImageSaveModal: (show: boolean) => void
}

export function ImageSaveModal({
  imageFormat,
  imageQuality,
  fileName,
  setImageFormat,
  setImageQuality,
  setFileName,
  saveAsImage,
  setShowImageSaveModal,
}: ImageSaveModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 rounded-lg p-6 w-96 shadow-xl">
        <h3 className="text-lg font-bold mb-4">이미지로 저장</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">파일 형식</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="format"
                checked={imageFormat === "png"}
                onChange={() => setImageFormat("png")}
                className="mr-2"
              />
              PNG (투명도 지원)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="format"
                checked={imageFormat === "jpeg"}
                onChange={() => setImageFormat("jpeg")}
                className="mr-2"
              />
              JPG (작은 용량)
            </label>
          </div>
        </div>

        {imageFormat === "jpeg" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">이미지 품질: {Math.round(imageQuality * 100)}%</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={imageQuality}
              onChange={(e) => setImageQuality(Number.parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">파일명</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="파일명 입력 (확장자 제외)"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setShowImageSaveModal(false)}>
            취소
          </Button>
          <Button onClick={saveAsImage} className="bg-blue-500 hover:bg-blue-600 text-white">
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}
