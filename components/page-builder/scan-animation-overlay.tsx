"use client"
import { useEffect, useState } from "react"

interface ScanAnimationOverlayProps {
  canvasWidth: number
  canvasHeight: number
  inspectionWidth?: number // 점검 영역 너비
  actualContentHeight?: number // 실제 콘텐츠 높이
  progress: number
}

export function ScanAnimationOverlay({
  canvasWidth,
  canvasHeight,
  inspectionWidth = 420,
  actualContentHeight,
  progress,
}: ScanAnimationOverlayProps) {
  const [scanPosition, setScanPosition] = useState(0)
  const [pulseIntensity, setPulseIntensity] = useState(0)

  // 실제 스캔할 높이 (실제 콘텐츠 높이 또는 캔버스 높이 중 작은 값)
  const scanHeight = actualContentHeight ? Math.min(actualContentHeight, canvasHeight) : canvasHeight

  useEffect(() => {
    // progress에 따라 스캔 위치 업데이트
    setScanPosition((progress / 100) * scanHeight)

    // 펄스 효과를 위한 강도 계산
    setPulseIntensity(Math.sin((progress / 100) * Math.PI * 4) * 0.5 + 0.5)
  }, [progress, scanHeight])

  return (
    <div
      className="absolute inset-0 pointer-events-none z-50"
      style={{
        width: inspectionWidth, // 더 큰 점검 영역
        height: scanHeight,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* 점검 영역 경계선 (더 큰 영역 표시) */}
      <div
        className="absolute inset-0 border-2 border-cyan-400/60 rounded-lg"
        style={{
          boxShadow: `0 0 20px rgba(34, 211, 238, ${0.3 + pulseIntensity * 0.4})`,
          animation: "pulse 2s ease-in-out infinite",
        }}
      />

      {/* 스캔 라인 (메인) */}
      <div
        className="absolute left-0 right-0 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-2xl transition-all duration-500 ease-out"
        style={{
          top: scanPosition - 1,
          boxShadow: `
            0 0 30px rgba(34, 211, 238, ${0.8 + pulseIntensity * 0.4}),
            0 0 60px rgba(34, 211, 238, ${0.4 + pulseIntensity * 0.3}),
            0 0 90px rgba(34, 211, 238, ${0.2 + pulseIntensity * 0.2})
          `,
        }}
      >
        {/* 스캔 라인 코어 */}
        <div className="absolute inset-0 bg-white/80 blur-sm" />

        {/* 스캔 라인 파티클 효과 */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-ping"
            style={{
              left: `${12.5 * (i + 1)}%`,
              top: "50%",
              transform: "translateY(-50%)",
              animationDelay: `${i * 0.1}s`,
              animationDuration: "0.8s",
            }}
          />
        ))}
      </div>

      {/* 스캔 라인 글로우 효과 (확장) */}
      <div
        className="absolute left-0 right-0 h-12 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transition-all duration-500 ease-out"
        style={{
          top: scanPosition - 24,
          filter: `blur(${4 + pulseIntensity * 2}px)`,
        }}
      />

      {/* 스캔된 영역 오버레이 (그라데이션) */}
      <div
        className="absolute left-0 right-0 transition-all duration-500 ease-out"
        style={{
          top: 0,
          height: scanPosition,
          background: `linear-gradient(to bottom, 
            rgba(34, 211, 238, 0.1), 
            rgba(34, 211, 238, 0.05), 
            rgba(34, 211, 238, 0.02)
          )`,
          borderLeft: "2px solid rgba(34, 211, 238, 0.3)",
          borderRight: "2px solid rgba(34, 211, 238, 0.3)",
        }}
      />

      {/* 진행률 표시 (개선된 UI) */}
      <div className="absolute top-4 left-4 bg-gradient-to-r from-black/80 to-gray-900/80 text-white px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm border border-cyan-400/30">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
            style={{
              boxShadow: `0 0 10px rgba(34, 211, 238, ${0.6 + pulseIntensity * 0.4})`,
            }}
          />
          <span>AI 상세페이지 점검 중...</span>
          <span className="text-cyan-400 font-bold">{Math.round(progress)}%</span>
        </div>

        {/* 진행률 바 */}
        <div className="w-32 h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 점검 영역 정보 */}
      <div className="absolute bottom-4 right-4 bg-gradient-to-r from-black/80 to-gray-900/80 text-white px-4 py-2 rounded-xl text-xs backdrop-blur-sm border border-cyan-400/30">
        <div className="text-cyan-400 font-medium">점검 영역</div>
        <div>
          {inspectionWidth}px × {scanHeight}px
        </div>
        <div className="text-gray-300 text-xs mt-1">확장된 영역으로 점검</div>
      </div>

      {/* 코너 스캐너 효과 */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
      <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400 animate-pulse" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400 animate-pulse" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400 animate-pulse" />

      {/* 추가 시각적 효과 - 스캔 그리드 */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: Math.floor(scanHeight / 40) }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            style={{
              top: `${i * 40}px`,
              animation: `fadeInOut 2s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* 스캔 완료 효과 */}
      {progress >= 100 && (
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent animate-pulse">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-400 font-bold text-lg">
            ✓ 점검 완료
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
