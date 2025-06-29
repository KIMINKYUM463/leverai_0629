"use client"
import Link from "next/link"
import {
  ArrowLeft,
  Copy,
  Download,
  Undo,
  Redo,
  Share,
  FullscreenIcon as FitScreen,
  Save,
  FileUp,
  Camera,
  Grid,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopNavBarProps {
  selectedElementId: string | null
  showGuideLines: boolean
  deleteSelectedElement: () => void
  fitCanvasToScreen: () => void
  saveTemplateAsJSON: () => void
  handleLoadTemplateClick: () => void
  setShowImageSaveModal: (show: boolean) => void
  setShowGuideLines: (show: boolean) => void
  isCanvasSelected?: boolean
  canvasHeight?: number
  undo?: () => void
  redo?: () => void
  canUndo?: boolean
  canRedo?: boolean
  clearCanvas?: () => void
}

export function TopNavBar({
  selectedElementId,
  showGuideLines,
  deleteSelectedElement,
  fitCanvasToScreen,
  saveTemplateAsJSON,
  handleLoadTemplateClick,
  setShowImageSaveModal,
  setShowGuideLines,
  isCanvasSelected,
  canvasHeight,
  undo,
  redo,
  canUndo = false,
  canRedo = false,
  clearCanvas,
}: TopNavBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <ArrowLeft size={18} />
          </Button>
        </Link>
        <span className="text-sm font-medium">페이지 1</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={`${canUndo ? "text-gray-400 hover:text-white" : "text-gray-600 cursor-not-allowed"}`}
          onClick={undo}
          disabled={!canUndo}
          title="실행 취소 (Ctrl+Z)"
        >
          <Undo size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`${canRedo ? "text-gray-400 hover:text-white" : "text-gray-600 cursor-not-allowed"}`}
          onClick={redo}
          disabled={!canRedo}
          title="다시 실행 (Ctrl+Y)"
        >
          <Redo size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Copy size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Download size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Share size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          onClick={fitCanvasToScreen}
          title="화면에 맞추기"
        >
          <FitScreen size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-orange-500 hover:text-orange-400 flex items-center gap-1"
          onClick={clearCanvas}
          title="화면 초기화"
        >
          <Trash2 size={16} />
          <span>화면 초기화</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
          onClick={saveTemplateAsJSON}
          title="템플릿 저장"
        >
          <Save size={16} />
          <span>템플릿 저장</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-500 hover:text-blue-400 flex items-center gap-1"
          onClick={handleLoadTemplateClick}
          title="템플릿 불러오기"
        >
          <FileUp size={16} />
          <span>템플릿 불러오기</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-purple-500 hover:text-purple-400 flex items-center gap-1"
          onClick={() => setShowImageSaveModal(true)}
          title="이미지로 저장"
        >
          <Camera size={16} />
          <span>이미지로 저장</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${showGuideLines ? "text-green-500" : "text-gray-400"}`}
          onClick={() => setShowGuideLines(!showGuideLines)}
          title={showGuideLines ? "가이드라인 숨기기" : "가이드라인 표시"}
        >
          <Grid size={16} />
          <span>{showGuideLines ? "가이드라인 숨기기" : "가이드라인 표시"}</span>
        </Button>
        {selectedElementId && (
          <Button
            variant="ghost"
            size="icon"
            className="text-red-400 hover:text-red-300"
            onClick={deleteSelectedElement}
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}
