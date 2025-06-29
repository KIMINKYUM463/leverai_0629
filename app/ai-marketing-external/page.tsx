"use client"

import { useState } from "react"
import { RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"

export default function AIMarketingExternalPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleIframeLoad = () => {
    setIsLoading(false)
    setError(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setError(true)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setError(false)
    const iframe = document.getElementById("marketing-iframe") as HTMLIFrameElement
    if (iframe) {
      const currentSrc = iframe.src
      iframe.src = ""
      setTimeout(() => {
        iframe.src = currentSrc
      }, 100)
    }
  }

  const openInNewTab = () => {
    window.open("https://project-seven-omega-44.vercel.app/", "_blank")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI 마케팅</h1>
            <p className="text-gray-600 mt-1">마케팅 콘텐츠 생성 도구</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              새로고침
            </Button>
          </div>
        </div>

        {/* iframe 콘텐츠 영역 */}
        <div className="flex-1 relative">
          {/* 로딩 상태 */}
          {isLoading && (
            <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-gray-600">AI 마케팅 도구를 불러오는 중...</p>
              </div>
            </div>
          )}

          {/* 에러 상태 */}
          {error && (
            <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
              <div className="text-center max-w-md">
                <div className="text-red-500 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">페이지를 불러올 수 없습니다</h3>
                <p className="text-gray-600 mb-4">
                  외부 사이트에 연결하는 중 문제가 발생했습니다. 네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleRefresh} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    다시 시도
                  </Button>
                  <Button variant="outline" onClick={openInNewTab} className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />새 탭에서 열기
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* iframe */}
          <iframe
            id="marketing-iframe"
            src="https://project-seven-omega-44.vercel.app/"
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title="AI 마케팅 도구"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  )
}
