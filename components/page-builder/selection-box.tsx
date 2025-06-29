"use client"

interface SelectionBoxProps {
  selectionBox: {
    isSelecting: boolean
    startX: number
    startY: number
    currentX: number
    currentY: number
  }
}

export function SelectionBox({ selectionBox }: SelectionBoxProps) {
  if (!selectionBox.isSelecting) return null

  const { startX, startY, currentX, currentY } = selectionBox
  const left = Math.min(startX, currentX)
  const top = Math.min(startY, currentY)
  const width = Math.abs(currentX - startX)
  const height = Math.abs(currentY - startY)

  return (
    <div
      className="absolute pointer-events-none z-40"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        border: "2px dashed #3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderRadius: "2px",
      }}
    />
  )
}
