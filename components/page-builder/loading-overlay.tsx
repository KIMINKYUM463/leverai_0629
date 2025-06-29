interface LoadingOverlayProps {
  isGenerating: boolean
  loadingStep?: "copywriting" | "image" | null
}

export function LoadingOverlay({ isGenerating, loadingStep }: LoadingOverlayProps) {
  if (!isGenerating) return null

  const getLoadingMessage = () => {
    switch (loadingStep) {
      case "copywriting":
        return {
          title: "AI 카피라이팅 생성 중",
          subtitle: "상품에 맞는 카피를 생성하고 있습니다...",
        }
      case "image":
        return {
          title: "AI 사진 생성 중",
          subtitle: "고품질 상품 이미지를 생성하고 있습니다...",
        }
      default:
        return {
          title: "AI가 상세페이지를 생성하고 있습니다...",
          subtitle: "잠시만 기다려주세요.",
        }
    }
  }

  const message = getLoadingMessage()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center max-w-md mx-4 relative overflow-hidden">
        {/* 배경 애니메이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50 via-blue-50 to-purple-50 animate-pulse"></div>

        {/* 메인 스피너 */}
        <div className="relative z-10 mb-6">
          <div className="relative">
            {/* 외부 회전 링 */}
            <div className="w-20 h-20 border-4 border-teal-200 rounded-full animate-spin border-t-teal-500"></div>
            {/* 내부 회전 링 (반대 방향) */}
            <div className="absolute top-2 left-2 w-16 h-16 border-4 border-blue-200 rounded-full animate-spin-reverse border-t-blue-500"></div>
            {/* 중앙 점 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* 텍스트 애니메이션 */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center relative z-10 animate-fade-in-up">
          {message.title}
        </h3>
        <p className="text-sm text-gray-600 text-center relative z-10 animate-fade-in-up animation-delay-200">
          {message.subtitle}
        </p>

        {/* 진행 단계 표시 */}
        <div className="flex items-center mt-6 space-x-2 relative z-10">
          <div
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              loadingStep === "copywriting"
                ? "bg-teal-500 animate-bounce"
                : loadingStep === "image"
                  ? "bg-green-500 scale-110"
                  : "bg-gray-300"
            }`}
          ></div>
          <div className="w-8 h-0.5 bg-gray-300 relative overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-1000 ${
                loadingStep === "image" ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
          <div
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              loadingStep === "image" ? "bg-teal-500 animate-bounce" : "bg-gray-300"
            }`}
          ></div>
        </div>

        <div className="flex justify-between w-full mt-2 text-xs text-gray-500 relative z-10">
          <span
            className={`transition-colors duration-300 ${
              loadingStep === "copywriting" ? "text-teal-600 font-semibold" : ""
            }`}
          >
            카피라이팅
          </span>
          <span
            className={`transition-colors duration-300 ${loadingStep === "image" ? "text-teal-600 font-semibold" : ""}`}
          >
            사진 생성
          </span>
        </div>

        {/* 하단 파티클 애니메이션 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 animate-shimmer"></div>

        {/* 떠다니는 점들 */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-teal-400 rounded-full animate-float"></div>
        <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float animation-delay-500"></div>
        <div className="absolute bottom-12 left-8 w-1 h-1 bg-purple-400 rounded-full animate-float animation-delay-1000"></div>
      </div>
    </div>
  )
}
