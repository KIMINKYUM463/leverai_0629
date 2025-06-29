"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Plus } from "lucide-react"

interface UploadsProps {
  onAddImage: (imageUrl: string, fileName: string) => void
}

export function UploadsPanel({ onAddImage }: UploadsProps) {
  const [uploads, setUploads] = useState<Array<{ id: number; file: File; url: string }>>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadCounter, setUploadCounter] = useState(0)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    const newUploads = imageFiles.map((file) => {
      const id = uploadCounter + 1
      setUploadCounter((prev) => prev + 1)
      const url = URL.createObjectURL(file)
      return { id, file, url }
    })

    setUploads((prev) => [...newUploads, ...prev])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleAddToCanvas = (upload: { file: File; url: string }) => {
    console.log("+ 버튼 클릭됨:", upload.file.name)
    console.log("이미지 URL:", upload.url)

    // 부모 컴포넌트로 전달
    onAddImage(upload.url, upload.file.name)
  }

  const handleRemoveUpload = (id: number) => {
    setUploads((prev) => {
      const upload = prev.find((u) => u.id === id)
      if (upload) {
        URL.revokeObjectURL(upload.url)
      }
      return prev.filter((u) => u.id !== id)
    })
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging ? "border-teal-500 bg-teal-500/10" : "border-gray-700"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-10 w-10 text-gray-500 mb-2" />
        <p className="text-sm text-gray-400 mb-2">파일을 드래그하거나 클릭하여 업로드</p>
        <p className="text-xs text-gray-500">PNG, JPG, SVG, GIF (최대 5MB)</p>
        <Button
          className="mt-4 bg-gray-700 hover:bg-gray-600 text-white text-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          파일 선택
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
        />
      </div>

      <div className="pt-4 border-t border-gray-700">
        <h4 className="text-sm font-medium mb-3">업로드된 파일 ({uploads.length})</h4>
        {uploads.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            <p className="text-sm">업로드된 파일이 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {uploads.map((upload) => (
              <div key={upload.id} className="relative">
                <div className="bg-gray-800 rounded-t overflow-hidden aspect-square">
                  <img
                    src={upload.url || "/placeholder.svg"}
                    alt={upload.file.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between bg-gray-700 rounded-b px-2 py-1.5">
                  <p className="text-xs text-gray-300 truncate flex-1 pr-1">{upload.file.name}</p>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 rounded-full bg-teal-600 hover:bg-teal-500 text-white flex-shrink-0"
                      onClick={() => handleAddToCanvas(upload)}
                      title="캔버스에 추가"
                    >
                      <Plus size={12} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 rounded-full bg-gray-600 hover:bg-gray-500 text-white flex-shrink-0"
                      onClick={() => handleRemoveUpload(upload.id)}
                      title="삭제"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
