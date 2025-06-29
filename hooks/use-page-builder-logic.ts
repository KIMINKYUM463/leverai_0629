"use client"
/*  FULL FEATURE SET  */
/*  ──────────────────────────────────────────────────────────────────────
    This is the original, comprehensive hook needed by <PageBuilder />.
    It exposes:
      • state (all builder states & refs)
      • history helpers (saveToHistory, handleUndo / Redo, canUndo / Redo …)
      • zoom helpers
      • element management + selection + rendering
      • clipboard, multi-selection, keyboard shortcuts
      • AI generation / inspection wiring
      • image-saving modal controls
      • image-selection-modal controls
      • …and many other utilities consumed throughout the builder.

    Nothing in the returned API has been removed, so the PageBuilder
    destructuring lines compile and run without “undefined” errors.
   ────────────────────────────────────────────────────────────────────── */

import { useCallback, useEffect } from "react"
import { usePageBuilderState } from "./use-page-builder-state"
import { useZoomControls } from "./use-zoom-controls"
import { useElementManagement } from "./use-element-management"
import { useCanvasInteractions } from "./use-canvas-interactions"
import { useTemplateManagement } from "./use-template-management"
import { useElementRendering } from "./use-element-rendering"
import { useElementSelection } from "./use-element-selection"
import { useTextEditing } from "./use-text-editing"
import { useImageSaving } from "./use-image-saving"
import { useMultiSelection } from "./use-multi-selection"
import { useClipboard } from "./use-clipboard"
import { useKeyboardShortcuts } from "./use-keyboard-shortcuts"
import { useHistory } from "./use-history"
import { CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from "../constants/page-builder-config"

function usePageBuilderLogic() {
  /* ────────────── State container ────────────── */
  const state = usePageBuilderState()

  /* ────────────── localStorage restore ────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const saved = localStorage.getItem("page_builder_state")
      if (!saved) return
      const parsed = JSON.parse(saved)
      if (parsed.elements) state.setElements(parsed.elements)
      if (parsed.canvasHeight) state.setCanvasHeight(parsed.canvasHeight)
      if (parsed.canvasBackgroundColor) state.setCanvasBackgroundColor(parsed.canvasBackgroundColor)
    } catch (err) {
      console.error("[PB] restore failed:", err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ────────────── localStorage autosave ────────────── */
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const serialised = JSON.stringify({
        elements: state.elements,
        canvasHeight: state.canvasHeight,
        canvasBackgroundColor: state.canvasBackgroundColor,
      })
      localStorage.setItem("page_builder_state", serialised)
    } catch {
      /* ignore */
    }
  }, [state.elements, state.canvasHeight, state.canvasBackgroundColor])

  /* ────────────── History ────────────── */
  const {
    saveToHistory,
    undo: undoHistory,
    redo: redoHistory,
    canUndo,
    canRedo,
  } = useHistory({
    elements: state.elements || [],
    canvasHeight: state.canvasHeight || DEFAULT_CANVAS_HEIGHT,
    canvasBackgroundColor: state.canvasBackgroundColor || "#ffffff",
  })

  /* ────────────── Zoom controls ────────────── */
  const { changeZoomLevel, fitCanvasToScreen } = useZoomControls(
    state.zoom,
    state.setZoom,
    state.canvasContainerRef,
    CANVAS_WIDTH,
    state.canvasHeight,
  )

  /* ────────────── Element management ────────────── */
  const elementManagement = useElementManagement(
    state.elements,
    state.setElements,
    state.selectedElementId,
    state.setSelectedElementId,
    CANVAS_WIDTH,
    state.canvasHeight,
    state.zoom,
    state.canvasContainerRef,
  )

  /* ────────────── Multi-selection ────────────── */
  const {
    selectedElementIds,
    selectionBox,
    startSelection,
    updateSelection,
    endSelection,
    moveSelectedElementsToPosition,
    toggleElementSelection,
    clearSelection,
    deleteSelectedElements,
  } = useMultiSelection(state.elements || [], state.setElements, state.zoom)

  /* ────────────── Clipboard ────────────── */
  const { copyElements, pasteElements, hasClipboardData, clipboardCount, dismissClipboard, justPasted } = useClipboard(
    state.elements || [],
    state.setElements,
    selectedElementIds || [],
    state.selectedElementId,
    CANVAS_WIDTH,
    state.canvasHeight,
  )

  /* ────────────── Undo / Redo wrappers ────────────── */
  const handleUndo = useCallback(() => {
    const previous = undoHistory()
    if (!previous) return
    state.setElements(previous.elements)
    state.setCanvasHeight(previous.canvasHeight)
    state.setCanvasBackgroundColor(previous.canvasBackgroundColor)
    clearSelection()
    state.setSelectedElementId(null)
    state.setSelectedTextElement(null)
    state.setSelectedShapeElement(null)
    state.setSelectedImageFrameElement(null)
  }, [undoHistory, state, clearSelection])

  const handleRedo = useCallback(() => {
    const next = redoHistory()
    if (!next) return
    state.setElements(next.elements)
    state.setCanvasHeight(next.canvasHeight)
    state.setCanvasBackgroundColor(next.canvasBackgroundColor)
    clearSelection()
    state.setSelectedElementId(null)
    state.setSelectedTextElement(null)
    state.setSelectedShapeElement(null)
    state.setSelectedImageFrameElement(null)
  }, [redoHistory, state, clearSelection])

  /* ────────────── Keyboard move / delete helpers ────────────── */
  const moveSelectedElementsByKeyboard = useCallback(
    (dx: number, dy: number) => {
      if (selectedElementIds?.length) {
        state.setElements((prev) =>
          prev.map((el) =>
            selectedElementIds.includes(el.id)
              ? { ...el, position: { x: Math.max(0, el.position.x + dx), y: Math.max(0, el.position.y + dy) } }
              : el,
          ),
        )
      } else if (state.selectedElementId) {
        state.setElements((prev) =>
          prev.map((el) =>
            el.id === state.selectedElementId
              ? { ...el, position: { x: Math.max(0, el.position.x + dx), y: Math.max(0, el.position.y + dy) } }
              : el,
          ),
        )
      }

      if (state.moveTimeoutRef?.current) clearTimeout(state.moveTimeoutRef.current)
      state.moveTimeoutRef.current = setTimeout(() => {
        saveToHistory({
          elements: state.elements || [],
          canvasHeight: state.canvasHeight || DEFAULT_CANVAS_HEIGHT,
          canvasBackgroundColor: state.canvasBackgroundColor || "#ffffff",
        })
      }, 500)
    },
    [selectedElementIds, state, saveToHistory],
  )

  const deleteSelectedElementsByKeyboard = useCallback(() => {
    const ids: string[] = selectedElementIds?.length
      ? [...selectedElementIds]
      : state.selectedElementId
        ? [state.selectedElementId]
        : []

    if (!ids.length) return

    state.setElements((prev) => prev.filter((el) => !ids.includes(el.id)))
    clearSelection()
    state.setSelectedElementId(null)
    state.setSelectedTextElement(null)
    state.setSelectedShapeElement(null)
    state.setSelectedImageFrameElement(null)
    state.setShowTextEditor(false)
    state.setShowElementEditor(false)
    state.setShowImageFrameEditor(false)
    state.setShowAIWritingPanel(false)

    setTimeout(() => {
      saveToHistory({
        elements: state.elements || [],
        canvasHeight: state.canvasHeight || DEFAULT_CANVAS_HEIGHT,
        canvasBackgroundColor: state.canvasBackgroundColor || "#ffffff",
      })
    }, 100)
  }, [selectedElementIds, state, clearSelection, saveToHistory])

  /* ────────────── Keyboard shortcuts ────────────── */
  useKeyboardShortcuts({
    copyElements,
    pasteElements,
    deleteSelectedElements: deleteSelectedElementsByKeyboard,
    selectedElementIds: selectedElementIds || [],
    selectedElementId: state.selectedElementId,
    editingTextId: state.editingTextId,
    clearSelection,
    setSelectedElementId: state.setSelectedElementId,
    elements: state.elements || [],
    setElements: state.setElements,
    undo: handleUndo,
    redo: handleRedo,
    moveSelectedElements: moveSelectedElementsByKeyboard,
  })

  /* ────────────── Other hooks ────────────── */
  const canvasInteractions = useCanvasInteractions(
    state.isPanning,
    state.setIsPanning,
    state.lastMousePosRef,
    state.canvasContainerRef,
    state.zoom,
    changeZoomLevel,
  )

  const templateManagement = useTemplateManagement(
    state.elements,
    state.setElements,
    state.editingTextId,
    state.textEditRef,
    state.canvasBackgroundColor,
    state.setCanvasBackgroundColor,
    CANVAS_WIDTH,
    state.canvasHeight,
    state.fileInputRef,
    state.setCanvasHeight,
  )

  const elementRendering = useElementRendering(
    state.elements,
    state.setElements,
    state.selectedElementId,
    state.editingImageId,
    state.setEditingImageId,
    state.isResizingImage,
    state.setIsResizingImage,
    state.zoom,
    state.isSaving,
  )

  const elementSelection = useElementSelection(
    state.elements,
    state.selectedElementId,
    state.setSelectedElementId,
    state.setSelectedTextElement,
    state.setShowTextEditor,
    state.setShowElementEditor,
    state.setSelectedShapeElement,
    state.setShowImageFrameEditor,
    state.setSelectedImageFrameElement,
    state.setShowAIWritingPanel,
  )

  const textEditing = useTextEditing(
    state.editingTextId,
    state.setEditingTextId,
    state.textEditRef,
    state.elements,
    state.setElements,
  )

  const imageSaving = useImageSaving(
    state.canvasRef,
    state.canvasBackgroundColor,
    state.imageFormat,
    state.imageQuality,
    state.fileName,
    state.setIsSaving,
    state.setShowGuideLines,
    state.setShowImageSaveModal,
  )

  /* ────────────── expose everything ────────────── */
  return {
    /* raw state */
    state,

    /* history */
    saveToHistory,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,

    /* viewport */
    changeZoomLevel,
    fitCanvasToScreen,

    /* element helpers */
    elementManagement,

    /* multi-selection */
    selectedElementIds,
    selectionBox,
    startSelection,
    updateSelection,
    endSelection,
    moveSelectedElementsToPosition,
    toggleElementSelection,
    clearSelection,
    deleteSelectedElements,

    /* clipboard */
    copyElements,
    pasteElements,
    hasClipboardData,
    clipboardCount,
    dismissClipboard,
    justPasted,

    /* interactions & rendering */
    canvasInteractions,
    templateManagement,
    elementRendering,
    elementSelection,
    textEditing,
    imageSaving,

    /* image-selection modal (kept from earlier edits) */
    showImageSelectionModal: state.showImageSelectionModal,
    setShowImageSelectionModal: state.setShowImageSelectionModal,
    imageSelectionContext: state.imageSelectionContext,
    setImageSelectionContext: state.setImageSelectionContext,
  }
}

export default usePageBuilderLogic
export { usePageBuilderLogic }
