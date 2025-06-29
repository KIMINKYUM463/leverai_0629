"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface SidebarButtonProps {
  icon: React.ElementType
  label: string
  active?: boolean
  onClick: () => void
}

export function SidebarButton({ icon: Icon, label, active = false, onClick }: SidebarButtonProps) {
  return (
    <div className="flex flex-col items-center mb-6 cursor-pointer" onClick={onClick}>
      <div
        className={cn(
          "w-10 h-10 rounded flex items-center justify-center transition-colors",
          active ? "bg-gray-700" : "hover:bg-gray-800",
        )}
      >
        <Icon size={20} />
      </div>
      <span className="text-xs mt-1 text-gray-400">{label}</span>
    </div>
  )
}
