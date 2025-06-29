"use client"

import { Type } from "lucide-react"

// 컨텍스트 메뉴에 그룹 관련 옵션 추가

// onAddText prop 추가하고 메뉴 아이템에 "텍스트 추가" 옵션 추가
interface ContextMenuProps {
  position: { x: number; y: number }
  onClose: () => void
  onBringToFront: () => void
  onSendToBack: () => void
  onDelete: () => void
  onAddText?: () => void // 새로 추가
  elementType: string
}

export function ContextMenu({
  position,
  onClose,
  onBringToFront,
  onSendToBack,
  onDelete,
  onAddText, // 새로 추가
  elementType,
}: ContextMenuProps) {
  return (
    <div
      className="fixed z-50 rounded bg-white shadow"
      style={{
        top: position.y,
        left: position.x,
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="py-2">
        <button
          className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100"
          onClick={() => {
            onBringToFront()
            onClose()
          }}
        >
          맨 앞으로
        </button>
        <button
          className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100"
          onClick={() => {
            onSendToBack()
            onClose()
          }}
        >
          맨 뒤로
        </button>
        <div className="border-t border-gray-200 my-1" />
        {elementType === "도형" && onAddText && (
          <>
            <button
              className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => {
                onAddText()
                onClose()
              }}
            >
              <Type size={14} />
              텍스트 추가
            </button>
            <div className="border-t border-gray-200 my-1" />
          </>
        )}
        <button
          className="w-full px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100"
          onClick={() => {
            onDelete()
            onClose()
          }}
        >
          삭제
        </button>
      </div>
    </div>
  )
}
