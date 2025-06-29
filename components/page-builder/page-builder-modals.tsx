"use client"

import type React from "react"
import { KeywordChatPopup } from "./keyword-chat-popup"
import { TemplateSelectionModal } from "./template-selection-modal"
import { LoadingOverlay } from "./loading-overlay"

interface PageBuilderModalsProps {
  showKeywordChat: boolean
  showTemplateChat: boolean
  currentKeyword: string
  isGenerating: boolean
  loadingStep: number
  onKeywordSubmit: (keyword: string) => void
  onKeywordClose: () => void
  onTemplateSelect: (template: string) => void
  onTemplateBack: () => void
  onTemplateClose: () => void
}

export const PageBuilderModals: React.FC<PageBuilderModalsProps> = ({
  showKeywordChat,
  showTemplateChat,
  currentKeyword,
  isGenerating,
  loadingStep,
  onKeywordSubmit,
  onKeywordClose,
  onTemplateSelect,
  onTemplateBack,
  onTemplateClose,
}) => {
  return (
    <>
      {/* 키워드 입력 모달 */}
      {showKeywordChat && (
        <div className="fixed top-28 right-6 z-50">
          <KeywordChatPopup onSubmit={onKeywordSubmit} onClose={onKeywordClose} />
        </div>
      )}

      {/* 템플릿 선택 모달 */}
      {showTemplateChat && (
        <div className="fixed top-28 right-6 z-50">
          <TemplateSelectionModal
            keyword={currentKeyword}
            onSelect={onTemplateSelect}
            onBack={onTemplateBack}
            onClose={onTemplateClose}
          />
        </div>
      )}

      {/* 로딩 오버레이는 전체 화면 중앙에 */}
      {isGenerating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <LoadingOverlay isGenerating={isGenerating} loadingStep={loadingStep} />
        </div>
      )}
    </>
  )
}

export default PageBuilderModals
