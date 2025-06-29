"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadExistingTemplates } from "@/lib/template-storage-manager"
import { listTemplateFiles } from "@/lib/supabase-storage"
import { Loader2, Upload, FileText } from "lucide-react"

export function TemplateStorageManager() {
  const [isUploading, setIsUploading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleUploadTemplates = async () => {
    setIsUploading(true)
    try {
      await uploadExistingTemplates()
      alert("모든 템플릿이 Storage에 업로드되었습니다!")
      await loadFiles()
    } catch (error) {
      console.error("업로드 실패:", error)
      alert("업로드 중 오류가 발생했습니다.")
    } finally {
      setIsUploading(false)
    }
  }

  const loadFiles = async () => {
    setIsLoading(true)
    try {
      const fileList = await listTemplateFiles()
      setFiles(fileList)
    } catch (error) {
      console.error("파일 목록 로드 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          템플릿 Storage 관리
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleUploadTemplates} disabled={isUploading} className="flex items-center gap-2">
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            기존 템플릿 업로드
          </Button>

          <Button variant="outline" onClick={loadFiles} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "파일 목록 새로고침"}
          </Button>
        </div>

        {files.length > 0 && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Storage 파일 목록:</h3>
            <ul className="space-y-1">
              {files.map((file, index) => (
                <li key={index} className="text-sm text-gray-600">
                  📄 {file.name} ({Math.round(file.metadata?.size / 1024)}KB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
