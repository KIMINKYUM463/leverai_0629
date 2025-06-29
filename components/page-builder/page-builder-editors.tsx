"use client"

import { TextEditorSidebar } from "./text-editor-sidebar"
import { ElementEditorSidebar } from "./element-editor-sidebar"
import { ImageFrameEditorSidebar } from "./image-frame-editor-sidebar"

interface PageBuilderEditorsProps {
  // 텍스트 에디터
  showTextEditor: boolean
  selectedTextElement: any
  onUpdateTextElement: (updates: any) => void
  onCloseTextEditor: () => void

  // 요소 에디터
  showElementEditor: boolean
  selectedShapeElement: any
  onUpdateShapeElement: (updates: any) => void
  onCloseElementEditor: () => void

  // 이미지 프레임 에디터
  showImageFrameEditor: boolean
  selectedImageFrameElement: any
  onUpdateImageFrameElement: (updates: any) => void
  onCloseImageFrameEditor: () => void
}

export function PageBuilderEditors({
  showTextEditor,
  selectedTextElement,
  onUpdateTextElement,
  onCloseTextEditor,
  showElementEditor,
  selectedShapeElement,
  onUpdateShapeElement,
  onCloseElementEditor,
  showImageFrameEditor,
  selectedImageFrameElement,
  onUpdateImageFrameElement,
  onCloseImageFrameEditor,
}: PageBuilderEditorsProps) {
  return (
    <>
      {/* Text Editor Sidebar */}
      {showTextEditor && selectedTextElement && (
        <div className="fixed right-4 top-20 bottom-20 w-80 z-40">
          <TextEditorSidebar
            selectedElement={selectedTextElement}
            onUpdateElement={onUpdateTextElement}
            onClose={onCloseTextEditor}
          />
        </div>
      )}

      {/* Element Editor Sidebar */}
      {showElementEditor && selectedShapeElement && (
        <div className="fixed right-4 top-20 bottom-20 w-80 z-40">
          <ElementEditorSidebar
            selectedElement={selectedShapeElement}
            onUpdateElement={onUpdateShapeElement}
            onClose={onCloseElementEditor}
          />
        </div>
      )}

      {/* Image Frame Editor Sidebar */}
      {showImageFrameEditor && selectedImageFrameElement && (
        <div className="fixed right-4 top-20 bottom-20 w-80 z-40">
          <ImageFrameEditorSidebar
            selectedElement={selectedImageFrameElement}
            onUpdateElement={onUpdateImageFrameElement}
            onClose={onCloseImageFrameEditor}
          />
        </div>
      )}
    </>
  )
}
