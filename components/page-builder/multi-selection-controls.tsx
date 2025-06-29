"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface MultiSelectionControlsProps {
  selectedCount: number
  onDelete: () => void
  position: { x: number; y: number }
}

export function MultiSelectionControls({ selectedCount, onDelete, position }: MultiSelectionControlsProps) {
  return (
    <div
      className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex items-center gap-2"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 50}px`,
        transform: "translateX(-50%)",
      }}
    >
      <span className="text-sm text-gray-600 font-medium">{selectedCount}개 선택됨</span>
      <Button
        size="sm"
        variant="outline"
        onClick={onDelete}
        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
