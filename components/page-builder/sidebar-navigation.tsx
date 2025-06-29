"use client"

import type React from "react"
import { SidebarButton } from "./sidebar-button"

interface SidebarNavigationProps {
  sidebarItems: Array<{
    id: string
    icon: React.ComponentType<any>
    label: string
  }>
  activeTab: string
  setActiveTab: (tab: string) => void
  setShowPanel: (show: boolean) => void
}

export function SidebarNavigation({ sidebarItems, activeTab, setActiveTab, setShowPanel }: SidebarNavigationProps) {
  return (
    <div className="w-14 bg-[#1E1E1E] border-r border-gray-800 flex flex-col items-center py-4">
      {sidebarItems.map((item) => (
        <SidebarButton
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={activeTab === item.id}
          onClick={() => {
            setActiveTab(item.id)
            setShowPanel(true)
          }}
        />
      ))}
    </div>
  )
}
