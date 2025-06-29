"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, FileText, Tag } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ReactMarkdown from "react-markdown"

interface MaterialDetailProps {
  material: {
    id: string
    title: string
    description: string
    date: string
    type: string
    size: string
    tags: string[]
    content: string
  }
  onClose: () => void
}

export function MaterialDetail({ material, onClose }: MaterialDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{material.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mt-2">
          {material.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="flex items-center">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>등록일: {formatDate(material.date)}</span>
          </div>
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>
              {material.type} ({material.size})
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown>{material.content}</ReactMarkdown>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" className="mr-2" onClick={onClose}>
            닫기
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            자료 다운로드
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
