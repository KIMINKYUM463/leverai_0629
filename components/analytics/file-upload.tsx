"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Upload, FileSpreadsheet } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileUpload: (file: File) => void
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0])
      }
      setDragActive(false)
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
      "text/csv": [".csv"],
    },
    maxFiles: 1,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
        isDragActive || dragActive
          ? "border-blue-400 bg-blue-50"
          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
      )}
    >
      <input {...getInputProps()} />

      <div className="space-y-4">
        <div
          className={cn(
            "mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors",
            isDragActive || dragActive ? "bg-blue-100" : "bg-gray-100",
          )}
        >
          <Upload
            className={cn("h-8 w-8 transition-colors", isDragActive || dragActive ? "text-blue-600" : "text-gray-500")}
          />
        </div>

        <div>
          <p className="text-lg font-medium text-gray-900">
            {isDragActive ? "파일을 여기에 놓아주세요" : "파일을 드래그하거나 클릭하여 업로드"}
          </p>
          <p className="text-sm text-gray-500 mt-1">Excel 파일 (.xlsx, .xls) 또는 CSV 파일 (.csv)</p>
        </div>

        <Button variant="outline" className="mt-4">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          파일 선택
        </Button>
      </div>
    </div>
  )
}
