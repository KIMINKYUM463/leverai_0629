"use client"
import { useEffect, useCallback, useRef } from "react"
import { ImageIcon, Upload, Grid, Type, LayoutIcon } from "lucide-react"
import { TopNavBar } from "./top-nav-bar"
import BottomStatusBar from "./bottom-status-bar"
import { AIGenerationButton } from "./ai-generation-button"
import { CanvasRenderer } from "./canvas-renderer"
import { ClipboardIndicator } from "./clipboard-indicator"
import { PageBuilderSidebar } from "./page-builder-sidebar"
import PageBuilderModals from "./page-builder-modals"
import { PageBuilderEditors } from "./page-builder-editors"
import { AIInspectionSystem } from "./ai-inspection-system"
import { ScanAnimationOverlay } from "./scan-animation-overlay"
import { usePageBuilderLogic } from "@/hooks/use-page-builder-logic"
import { useAIInspection } from "@/hooks/use-ai-inspection"
import { useAIGeneration } from "@/hooks/use-ai-generation"
import { CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "@/constants/page-builder-config"
import { ImageSaveModal } from "./image-save-modal"

const sidebarItems = [
  { id: "templates", icon: LayoutIcon, label: "템플릿" },
  { id: "photos", icon: ImageIcon, label: "사진" },
  { id: "uploads", icon: Upload, label: "업로드" },
  { id: "elements", icon: Grid, label: "요소" },
  { id: "text", icon: Type, label: "텍스트" },
]

export function PageBuilder() {
  const {
    state,
    saveToHistory,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
    changeZoomLevel,
    fitCanvasToScreen,
    elementManagement,
    selectedElementIds,
    selectionBox,
    startSelection,
    updateSelection,
    endSelection,
    moveSelectedElementsToPosition,
    toggleElementSelection,
    clearSelection,
    deleteSelectedElements,
    copyElements,
    pasteElements,
    hasClipboardData,
    clipboardCount,
    dismissClipboard,
    justPasted,
    canvasInteractions,
    templateManagement,
    elementRendering,
    elementSelection,
    textEditing,
    imageSaving,
    showImageSelectionModal,
    setShowImageSelectionModal,
    imageSelectionContext,
    setImageSelectionContext,
  } = usePageBuilderLogic()

  const {
    isInspecting,
    showInspectionResults,
    inspectionResults,
    scanProgress,
    startInspection,
    closeInspectionResults,
    applyAutoFix,
  } = useAIInspection(state.elements, state.setElements, state.canvasHeight)

  const aiButtonRef = useRef<HTMLButtonElement>(null)

  const updateTextElement = useCallback(
    (updates: any) => {
      if (state.selectedTextElement) {
        state.setElements((prev) =>
          prev.map((el) => (el.id === state.selectedTextElement.id ? { ...el, ...updates } : el)),
        )
        state.setSelectedTextElement((prev) => ({ ...prev, ...updates }))
      }
    },
    [state.selectedTextElement, state.setElements, state.setSelectedTextElement],
  )

  const updateShapeElement = useCallback(
    (updates: any) => {
      if (state.selectedShapeElement) {
        state.setElements((prev) =>
          prev.map((el) => (el.id === state.selectedShapeElement.id ? { ...el, ...updates } : el)),
        )
        state.setSelectedShapeElement((prev) => ({ ...prev, ...updates }))
      }
    },
    [state.selectedShapeElement, state.setElements, state.setSelectedShapeElement],
  )

  const updateImageFrameElement = useCallback(
    (updates: any) => {
      if (state.selectedImageFrameElement) {
        state.setElements((prev) =>
          prev.map((el) => (el.id === state.selectedImageFrameElement.id ? { ...el, ...updates } : el)),
        )
        state.setSelectedImageFrameElement((prev) => ({ ...prev, ...updates }))
      }
    },
    [state.selectedImageFrameElement, state.setElements, state.setSelectedImageFrameElement],
  )

  const applyAIGeneratedText = useCallback(
    (text: string) => {
      if (state.selectedTextElement) {
        textEditing.updateTextContent(state.selectedTextElement.id, text)
      }
    },
    [state.selectedTextElement, textEditing],
  )

  useEffect(() => {
    console.log("[PAGE_BUILDER] state.elements 업데이트됨:", `개수: ${state.elements?.length ?? "undefined"}`)
    if (state.elements && state.elements.length > 0) {
      console.log("[PAGE_BUILDER] 업데이트된 첫번째 요소:", JSON.stringify(state.elements[0], null, 2))
    } else if (state.elements) {
      console.log("[PAGE_BUILDER] 업데이트된 elements는 빈 배열입니다.")
    } else {
      console.log("[PAGE_BUILDER] 업데이트된 elements는 undefined입니다.")
    }
  }, [state.elements])

  const applyTemplate = useCallback(
    (templateObject: any, isFromAI = false) => {
      console.log("[PAGE_BUILDER] applyTemplate 시작. isFromAI:", isFromAI)
      console.log("[PAGE_BUILDER] 받은 templateObject:", JSON.stringify(templateObject, null, 2))

      if (!templateObject || typeof templateObject !== "object") {
        console.error("[PAGE_BUILDER] 오류: templateObject가 유효하지 않습니다. 적용 중단.", templateObject)
        state.setElements([]) // 확실하게 비우기
        return
      }
      if (!Array.isArray(templateObject.elements)) {
        console.error(
          "[PAGE_BUILDER] 오류: templateObject.elements가 배열이 아닙니다. 적용 중단.",
          templateObject.elements,
        )
        state.setElements([]) // 확실하게 비우기
        return
      }

      const templateElements: any[] = templateObject.elements
      const newCanvasHeight: number =
        templateObject.canvasHeight || templateObject.canvasSize?.height || DEFAULT_CANVAS_HEIGHT
      const newCanvasBackgroundColor: string = templateObject.backgroundColor || "#FFFFFF"

      console.log(`[PAGE_BUILDER] 추출된 요소 개수: ${templateElements.length}`)
      if (templateElements.length > 0) {
        console.log("[PAGE_BUILDER] 추출된 첫 번째 요소 (원본):", JSON.stringify(templateElements[0], null, 2))
      }
      console.log(`[PAGE_BUILDER] 적용할 캔버스 설정: 높이 ${newCanvasHeight}, 배경색 ${newCanvasBackgroundColor}`)

      clearSelection()
      state.setSelectedElementId(null)
      state.setSelectedTextElement(null)
      // ... (다른 선택 상태 초기화)
      console.log("[PAGE_BUILDER] 선택 상태 초기화 완료.")

      const cleanedElements = templateElements.map((element, index) => {
        const newId = `el-${element.type || "generic"}-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`
        return {
          ...element,
          id: newId,
          zIndex: element.zIndex || index + 1,
          // 불필요한 속성 제거
          selected: undefined,
          isSelected: undefined,
          groupId: undefined,
          isGrouped: undefined,
          parentId: undefined,
          originalPosition: undefined,
        }
      })

      console.log(`[PAGE_BUILDER] 정리된 요소 개수: ${cleanedElements.length}`)
      if (cleanedElements.length > 0) {
        console.log("[PAGE_BUILDER] 정리된 첫 번째 요소 (ID 변경 후):", JSON.stringify(cleanedElements[0], null, 2))
      }
      console.log(
        "[PAGE_BUILDER] state.setElements 호출 직전, cleanedElements:",
        JSON.stringify(cleanedElements, null, 2),
      )

      state.setElements(cleanedElements)
      state.setCanvasHeight(newCanvasHeight)
      if (state.setCanvasBackgroundColor) {
        state.setCanvasBackgroundColor(newCanvasBackgroundColor)
      }

      console.log("[PAGE_BUILDER] applyTemplate 종료. 상태 업데이트 함수 호출 완료.")
    },
    [state, clearSelection], // 의존성 배열 확인
  )

  const clearCanvas = useCallback(() => {
    clearSelection()
    state.setSelectedElementId(null)
    state.setSelectedTextElement(null)
    state.setSelectedShapeElement(null)
    state.setSelectedImageFrameElement(null)
    state.setElements([])
    // state.setCanvasHeight(DEFAULT_CANVAS_HEIGHT)
    if (state.setCanvasBackgroundColor) {
      state.setCanvasBackgroundColor("#FFFFFF")
    }
    console.log("[PAGE_BUILDER] 화면이 초기화되었습니다.")
  }, [state, clearSelection])

  // AI-generation hooks (provide the real applyTemplate)
  const {
    handleAIButtonClick,
    handleKeywordSubmit,
    handleCloseChat,
    handleTemplateSelect,
    handleTemplateBack,
    showKeywordChat,
    showTemplateChat,
    currentKeyword,
    isGenerating,
    loadingStep,
  } = useAIGeneration({ applyTemplate })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.elements && state.elements.length >= 0) {
        saveToHistory({
          elements: state.elements,
          canvasHeight: state.canvasHeight || DEFAULT_CANVAS_HEIGHT,
          canvasBackgroundColor: state.canvasBackgroundColor || "#ffffff",
        })
      }
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [state.elements, state.canvasHeight, state.canvasBackgroundColor, saveToHistory])

  useEffect(() => {
    elementSelection.handleElementSelectionChange()
  }, [state.selectedElementId, state.elements])

  return (
    <div className="flex flex-col h-screen bg-[#1E1E1E] text-white overflow-hidden">
      <input
        type="file"
        ref={state.fileInputRef}
        accept=".json"
        className="hidden"
        onChange={templateManagement.handleFileUpload}
        aria-label="템플릿 파일 업로드"
      />
      <TopNavBar
        selectedElementId={state.selectedElementId}
        showGuideLines={state.showGuideLines}
        deleteSelectedElement={elementManagement.deleteSelectedElement}
        fitCanvasToScreen={fitCanvasToScreen}
        saveTemplateAsJSON={templateManagement.saveTemplateAsJSON}
        handleLoadTemplateClick={templateManagement.handleLoadTemplateClick}
        setShowImageSaveModal={state.setShowImageSaveModal}
        setShowGuideLines={state.setShowGuideLines}
        isCanvasSelected={state.isCanvasSelected}
        canvasHeight={state.canvasHeight}
        undo={handleUndo}
        redo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        clearCanvas={clearCanvas}
      />
      <ClipboardIndicator
        hasClipboardData={hasClipboardData}
        clipboardCount={clipboardCount}
        onPaste={() => pasteElements()}
        onDismiss={dismissClipboard}
        justPasted={justPasted}
      />
      <div className="flex flex-1 overflow-hidden">
        <PageBuilderSidebar
          activeTab={state.activeTab}
          setActiveTab={state.setActiveTab}
          showPanel={state.showPanel}
          setShowPanel={state.setShowPanel}
          onApplyTemplate={applyTemplate}
          onAddImage={elementManagement.addImageToCanvas}
          onAddElement={elementManagement.addElementToCanvas}
          onAddText={elementManagement.addTextToCanvas}
          sidebarItems={sidebarItems}
        />
        <div
          ref={state.canvasContainerRef}
          className={`flex-1 bg-[#252525] overflow-auto flex items-start justify-center p-4 relative ${
            state.isPanning ? "cursor-grabbing" : ""
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              elementSelection.handleDeselectElement()
            }
          }}
        >
          <CanvasRenderer
            canvasRef={state.canvasRef}
            canvasWidth={CANVAS_WIDTH}
            canvasHeight={state.canvasHeight}
            zoom={state.zoom}
            canvasBackgroundColor={state.canvasBackgroundColor}
            showGuideLines={state.showGuideLines}
            isSaving={state.isSaving}
            elements={state.elements}
            selectedElementId={state.selectedElementId}
            editingTextId={state.editingTextId}
            isResizing={state.isResizing}
            setSelectedElementId={state.setSelectedElementId}
            setShowAIWritingPanel={state.setShowAIWritingPanel}
            finishEditingText={textEditing.finishEditingText}
            handleTextElementSelect={elementSelection.handleTextElementSelect}
            handleShapeElementSelect={elementSelection.handleShapeElementSelect}
            handleImageFrameElementSelect={elementSelection.handleImageFrameElementSelect}
            startEditingText={textEditing.startEditingText}
            moveElement={elementManagement.moveElement}
            setElements={state.setElements}
            setIsResizing={state.setIsResizing}
            renderShape={elementRendering.renderShape}
            renderImageFrame={elementRendering.renderImageFrame}
            renderText={elementRendering.renderText}
            setCanvasHeight={state.setCanvasHeight}
            isCanvasSelected={state.isCanvasSelected}
            setIsCanvasSelected={state.setIsCanvasSelected}
            handleDeselectElement={elementSelection.handleDeselectElement}
            handleResizeStart={canvasInteractions.handleResizeStart}
            handleRotateStart={canvasInteractions.handleRotateStart}
            contextMenu={state.contextMenu}
            setContextMenu={state.setContextMenu}
            bringElementToFront={elementManagement.bringElementToFront}
            sendElementToBack={elementManagement.sendElementToBack}
            deleteElement={elementManagement.deleteElement}
            selectedElementIds={selectedElementIds}
            selectionBox={selectionBox}
            startSelection={startSelection}
            updateSelection={updateSelection}
            endSelection={endSelection}
            moveSelectedElementsToPosition={moveSelectedElementsToPosition}
            toggleElementSelection={toggleElementSelection}
            clearSelection={clearSelection}
            deleteSelectedElements={deleteSelectedElements}
            addTextToShape={elementManagement.addTextToShape}
            createGroup={elementManagement.createGroup}
            ungroupElements={elementManagement.ungroupElements}
            showImageSelectionModal={showImageSelectionModal}
            setShowImageSelectionModal={setShowImageSelectionModal}
            imageSelectionContext={imageSelectionContext}
            setImageSelectionContext={setImageSelectionContext}
            currentKeyword={currentKeyword}
          />
          {isInspecting && (
            <ScanAnimationOverlay
              canvasWidth={CANVAS_WIDTH}
              canvasHeight={state.canvasHeight}
              progress={scanProgress}
            />
          )}
        </div>
        <PageBuilderEditors
          showTextEditor={state.showTextEditor}
          selectedTextElement={state.selectedTextElement}
          onUpdateTextElement={updateTextElement}
          onCloseTextEditor={() => {
            state.setShowTextEditor(false)
            state.setSelectedTextElement(null)
            state.setSelectedElementId(null)
          }}
          showElementEditor={state.showElementEditor}
          selectedShapeElement={state.selectedShapeElement}
          onUpdateShapeElement={updateShapeElement}
          onCloseElementEditor={() => {
            state.setShowElementEditor(false)
            state.setSelectedShapeElement(null)
            state.setSelectedElementId(null)
          }}
          showImageFrameEditor={state.showImageFrameEditor}
          selectedImageFrameElement={state.selectedImageFrameElement}
          onUpdateImageFrameElement={updateImageFrameElement}
          onCloseImageFrameEditor={() => {
            state.setShowImageFrameEditor(false)
            state.setSelectedImageFrameElement(null)
            state.setSelectedElementId(null)
          }}
        />
      </div>
      <BottomStatusBar
        isResizing={state.isResizing}
        editingTextId={state.editingTextId}
        zoom={state.zoom}
        changeZoomLevel={changeZoomLevel}
        fitCanvasToScreen={fitCanvasToScreen}
        canvasHeight={state.canvasHeight}
        onStartInspection={startInspection}
        isInspecting={isInspecting}
      />
      <AIGenerationButton
        handleAIButtonClick={handleAIButtonClick}
        showKeywordChat={showKeywordChat}
        showTemplateChat={showTemplateChat}
        aiButtonRef={aiButtonRef}
      />
      <PageBuilderModals
        showKeywordChat={showKeywordChat}
        onKeywordSubmit={handleKeywordSubmit}
        onKeywordClose={handleCloseChat}
        showTemplateChat={showTemplateChat}
        currentKeyword={currentKeyword}
        onTemplateSelect={handleTemplateSelect}
        onTemplateBack={handleTemplateBack}
        onTemplateClose={handleCloseChat}
        isGenerating={isGenerating}
        loadingStep={loadingStep}
      />
      {showInspectionResults && (
        <AIInspectionSystem
          inspectionResults={inspectionResults}
          onClose={closeInspectionResults}
          onApplyAutoFix={applyAutoFix}
        />
      )}
      {state.showImageSaveModal && (
        <ImageSaveModal
          imageFormat={state.imageFormat}
          imageQuality={state.imageQuality}
          fileName={state.fileName}
          setImageFormat={state.setImageFormat}
          setImageQuality={state.setImageQuality}
          setFileName={state.setFileName}
          saveAsImage={imageSaving.saveAsImage}
          setShowImageSaveModal={state.setShowImageSaveModal}
        />
      )}
    </div>
  )
}
