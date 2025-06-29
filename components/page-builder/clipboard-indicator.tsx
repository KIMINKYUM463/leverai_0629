"use client"

import { CheckCircle, Copy } from "lucide-react"
import { useEffect } from "react"

interface ClipboardIndicatorProps {
  hasClipboardData: boolean
  clipboardCount: number
  onPaste: () => void
  onDismiss: () => void
  justPasted: boolean
}

export function ClipboardIndicator({
  hasClipboardData,
  clipboardCount,
  onPaste,
  onDismiss,
  justPasted,
}: ClipboardIndicatorProps) {
  // 붙여넣기 후 알림 자동 숨김
  useEffect(() => {
    if (justPasted) {
      const timer = setTimeout(() => {
        onDismiss()
      }, 300) // 붙여넣기 후 0.3초 후에 사라짐

      return () => clearTimeout(timer)
    }
  }, [justPasted, onDismiss])

  if (!hasClipboardData) return null

  return (
    <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm animate-fade-in">
      <CheckCircle size={16} />
      <span>{clipboardCount}개 요소 복사됨</span>
      <button
        onClick={() => {
          onPaste()
        }}
        className="ml-2 bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs flex items-center gap-1"
        title="붙여넣기 (Ctrl+V)"
      >
        <Copy size={12} />
        붙여넣기
      </button>
    </div>
  )
}
