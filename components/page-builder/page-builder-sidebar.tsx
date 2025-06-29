"use client"

import type React from "react"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhotosPanel } from "./panels/photos-panel"
import { UploadsPanel } from "./panels/uploads-panel"
import { ElementsPanel } from "./panels/elements-panel"
import { TextPanel } from "./panels/text-panel"
import { SidebarNavigation } from "./sidebar-navigation"

interface PageBuilderSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  showPanel: boolean
  setShowPanel: (show: boolean) => void
  onApplyTemplate: (templateElements: any[]) => void
  onAddImage: (imageUrl: string, fileName: string) => void
  onAddElement: (shapeType: string, shapeName: string) => void
  onAddText: (textStyle: string, styleName: string, defaultText: string) => void
  sidebarItems: Array<{
    id: string
    icon: React.ElementType
    label: string
  }>
}

export function PageBuilderSidebar({
  activeTab,
  setActiveTab,
  showPanel,
  setShowPanel,
  onApplyTemplate,
  onAddImage,
  onAddElement,
  onAddText,
  sidebarItems,
}: PageBuilderSidebarProps) {
  // sidebarItems prop을 받는 부분에서 템플릿 항목을 필터링
  const filteredSidebarItems = sidebarItems.filter((item) => item.id !== "templates")

  return (
    <>
      {/* Left sidebar */}
      <SidebarNavigation
        sidebarItems={filteredSidebarItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowPanel={setShowPanel}
      />

      {/* Side panel */}
      {showPanel && (
        <div className="w-64 bg-[#252525] border-r border-gray-800 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{sidebarItems.find((item) => item.id === activeTab)?.label}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-white"
                onClick={() => setShowPanel(false)}
              >
                <ArrowLeft size={14} />
              </Button>
            </div>

            {/* {activeTab === "templates" && <TemplatesPanel onApplyTemplate={onApplyTemplate} />} */}
            {activeTab === "photos" && <PhotosPanel />}
            {activeTab === "uploads" && <UploadsPanel onAddImage={onAddImage} />}
            {activeTab === "elements" && <ElementsPanel addElement={onAddElement} />}
            {activeTab === "text" && <TextPanel onAddText={onAddText} />}
          </div>
        </div>
      )}
    </>
  )
}
