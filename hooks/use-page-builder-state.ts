"use client"

import { useState, useRef } from "react"

/**
 * Centralised state container for the Page-Builder.
 * (Identical to the version that originally shipped with the project.)
 */
export function usePageBuilderState() {
  /* ───────────── Canvas & view ───────────── */
  const [zoom, setZoom] = useState(100)
  const [canvasHeight, setCanvasHeight] = useState(3000)
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("#FFFFFF")
  const [showGuideLines, setShowGuideLines] = useState(true)
  const [isCanvasSelected, setIsCanvasSelected] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  /* ───────────── Panels / tabs ───────────── */
  const [activeTab, setActiveTab] = useState("elements")
  const [showPanel, setShowPanel] = useState(true)

  /* ───────────── Elements ───────────── */
  const [elements, setElements] = useState<any[]>([])
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [isResizing, setIsResizing] = useState(false)

  /* ───────────── Text editing ───────────── */
  const [editingTextId, setEditingTextId] = useState<string | null>(null)
  const textEditRef = useRef<HTMLDivElement>(null)
  const [showTextEditor, setShowTextEditor] = useState(false)
  const [selectedTextElement, setSelectedTextElement] = useState<any>(null)

  /* ───────────── Shape / image-frame editing ───────────── */
  const [showElementEditor, setShowElementEditor] = useState(false)
  const [selectedShapeElement, setSelectedShapeElement] = useState<any>(null)

  const [showImageFrameEditor, setShowImageFrameEditor] = useState(false)
  const [selectedImageFrameElement, setSelectedImageFrameElement] = useState<any>(null)

  /* ───────────── File / template helpers ───────────── */
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSaving, setIsSaving] = useState(false)

  /* Image-export (⇢  ‘이미지로 저장’ 버튼) */
  const [showImageSaveModal, setShowImageSaveModal] = useState(false)
  const [imageFormat, setImageFormat] = useState<"png" | "jpeg">("png")
  const [imageQuality, setImageQuality] = useState(0.9)
  const [fileName, setFileName] = useState("page-design")

  /* ───────────── AI helpers ───────────── */
  const aiButtonRef = useRef<HTMLButtonElement>(null)
  const [showAIWritingPanel, setShowAIWritingPanel] = useState(false)
  const [loadingStep, setLoadingStep] = useState<"copywriting" | "image" | null>(null)

  const [showKeywordChat, setShowKeywordChat] = useState(false)
  const [showTemplateChat, setShowTemplateChat] = useState(false)
  const [currentKeyword, setCurrentKeyword] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  /* ───────────── Multi-selection / snap / interaction ───────────── */
  const [isPanning, setIsPanning] = useState(false)
  const [contextMenu, setContextMenu] = useState<{
    show: boolean
    position: { x: number; y: number }
    elementId: string | null
  }>({ show: false, position: { x: 0, y: 0 }, elementId: null })

  /* Snap settings */
  const [snapEnabled, setSnapEnabled] = useState(true)
  const [snapDistance, setSnapDistance] = useState(10)

  /* Keyboard-move helper */
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  /* ───────────── Expose everything the builder needs ───────────── */
  return {
    /* canvas */
    zoom,
    setZoom,
    canvasHeight,
    setCanvasHeight,
    canvasBackgroundColor,
    setCanvasBackgroundColor,
    showGuideLines,
    setShowGuideLines,
    isCanvasSelected,
    setIsCanvasSelected,
    canvasRef,
    canvasContainerRef,

    /* ui / panel */
    activeTab,
    setActiveTab,
    showPanel,
    setShowPanel,

    /* elements */
    elements,
    setElements,
    selectedElementId,
    setSelectedElementId,
    isResizing,
    setIsResizing,

    /* text editing */
    editingTextId,
    setEditingTextId,
    textEditRef,
    showTextEditor,
    setShowTextEditor,
    selectedTextElement,
    setSelectedTextElement,

    /* shape / image-frame editing */
    showElementEditor,
    setShowElementEditor,
    selectedShapeElement,
    setSelectedShapeElement,
    showImageFrameEditor,
    setShowImageFrameEditor,
    selectedImageFrameElement,
    setSelectedImageFrameElement,

    /* file / save */
    fileInputRef,
    isSaving,
    setIsSaving,
    showImageSaveModal,
    setShowImageSaveModal,
    imageFormat,
    setImageFormat,
    imageQuality,
    setImageQuality,
    fileName,
    setFileName,

    /* AI */
    aiButtonRef,
    showAIWritingPanel,
    setShowAIWritingPanel,
    loadingStep,
    setLoadingStep,
    showKeywordChat,
    setShowKeywordChat,
    showTemplateChat,
    setShowTemplateChat,
    currentKeyword,
    setCurrentKeyword,
    isGenerating,
    setIsGenerating,

    /* interaction helpers */
    isPanning,
    setIsPanning,
    contextMenu,
    setContextMenu,
    snapEnabled,
    setSnapEnabled,
    snapDistance,
    setSnapDistance,
    moveTimeoutRef,
  }
}
