"use client"
import type React from "react"
import { ZoomIn, ZoomOut, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomStatusBarProps {
  isResizing: boolean
  editingTextId: string | null
  zoom: number
  changeZoomLevel: (newZoom: number) => void
  fitCanvasToScreen: () => void
  canvasHeight?: number
  onStartInspection?: () => void
  isInspecting?: boolean
}

const BottomStatusBar: React.FC<BottomStatusBarProps> = ({
  isResizing,
  editingTextId,
  zoom,
  changeZoomLevel,
  fitCanvasToScreen,
  canvasHeight,
  onStartInspection,
  isInspecting = false,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-1 border-t border-gray-800 text-xs text-gray-400">
      <div className="flex items-center gap-4">
        {/* Status messages */}
        {isResizing && <span>Resizing...</span>}
        {editingTextId && <span>Editing Text: {editingTextId}</span>}
        {isInspecting && <span className="text-teal-400 animate-pulse">AI 점검 중...</span>}
      </div>

      <div className="flex items-center gap-2">
        {/* AI 상세페이지 점검시스템 버튼 */}
        <Button
          onClick={onStartInspection}
          disabled={true}
          className={`flex items-center gap-2 px-3 py-1 text-xs ${
            isInspecting ? "bg-teal-600 text-white" : "bg-gray-700 hover:bg-teal-600 text-gray-300 hover:text-white"
          }`}
        >
          <Search className="h-3 w-3" />
          {isInspecting ? "점검 중..." : "AI 상세페이지 점검"}
        </Button>

        {/* Zoom controls */}
        <Button onClick={() => changeZoomLevel(zoom + 10)} disabled={zoom >= 200} className="p-1">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button onClick={() => changeZoomLevel(zoom - 10)} disabled={zoom <= 10} className="p-1">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button onClick={fitCanvasToScreen} className="px-2 py-1 text-xs">
          Fit to Screen
        </Button>
        <span>{Math.round(zoom)}%</span>
        {canvasHeight && <span className="ml-2">H: {Math.round(canvasHeight)}px</span>}
      </div>
    </div>
  )
}

export default BottomStatusBar
