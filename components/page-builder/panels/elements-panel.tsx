"use client"

import { Card } from "@/components/ui/card"

// 도형 정의 (아이콘 추가)
const shapes = [
  { id: 1, name: "사각형", type: "rectangle" },
  { id: 2, name: "원", type: "circle" },
  { id: 3, name: "삼각형", type: "triangle" },
  { id: 4, name: "마름모", type: "diamond" },
  { id: 5, name: "오각형", type: "pentagon" },
  { id: 6, name: "육각형", type: "hexagon" },
  { id: 7, name: "별", type: "star" },
  { id: 8, name: "화살표", type: "arrow" },
  { id: 9, name: "말풍선", type: "speech" },
  { id: 10, name: "하트", type: "heart" },
  { id: 11, name: "체크", type: "check" },
  { id: 12, name: "그라데이션 사각형", type: "gradient-rectangle" },
  { id: 13, name: "그라데이션 원", type: "gradient-circle" },
  { id: 14, name: "수평선", type: "horizontal-line" },
  { id: 15, name: "수직선", type: "vertical-line" },
  { id: 16, name: "대각선", type: "diagonal-line" },
  { id: 17, name: "점선", type: "dashed-line" },
  { id: 18, name: "별 아이콘", type: "star-icon" },
  { id: 19, name: "배송 트럭", type: "delivery-truck-icon" },
  { id: 20, name: "반품 패키지", type: "return-package-icon" },
  { id: 21, name: "위협 아이콘", type: "threat-warning-icon" },
  { id: 22, name: "1/4 원형", type: "quarter-circle" },
  { id: 23, name: "둥근 모서리 사각형", type: "rounded-corner-square" },
]

// 이미지 프레임 정의
const imageFrames = [
  { id: 1, name: "원형 프레임", type: "circle-frame" },
  { id: 2, name: "사각형 프레임", type: "rectangle-frame" },
]

export function ElementsPanel({ addElement }) {
  // 도형 아이콘 렌더링 함수
  const renderShapeIcon = (type) => {
    switch (type) {
      case "rectangle":
        return <div className="w-8 h-8 border-2 border-gray-400 rounded"></div>
      case "circle":
        return <div className="w-8 h-8 border-2 border-gray-400 rounded-full"></div>
      case "triangle":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4L28 28H4L16 4Z" stroke="#9CA3AF" strokeWidth="2" fill="none" />
          </svg>
        )
      case "diamond":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="16"
              y="4"
              width="16"
              height="16"
              transform="rotate(45 16 16)"
              stroke="#9CA3AF"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )
      case "pentagon":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 4L27.7128 13.0557L23.4164 27.0557H8.58359L4.28719 13.0557L16 4Z"
              stroke="#9CA3AF"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )
      case "hexagon":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 16L20 27.7128H12L8 16L12 4.28719H20L24 16Z" stroke="#9CA3AF" strokeWidth="2" fill="none" />
          </svg>
        )
      case "star":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 4L19.2 13.6H29.2L21 19.6L24.2 29.2L16 23.2L7.8 29.2L11 19.6L2.8 13.6H12.8L16 4Z"
              stroke="#9CA3AF"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        )
      case "arrow":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 16H28M28 16L20 8M28 16L20 24"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      case "speech":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 4H28V20H16L8 28V20H4V4Z"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )
      case "heart":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 28C16 28 4 20 4 12C4 6.47715 8.47715 4 12 4C13.7101 4 15.3282 4.80151 16 6C16.6718 4.80151 18.2899 4 20 4C23.5228 4 28 6.47715 28 12C28 20 16 28 16 28Z"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )
      case "check":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 16L12 22L26 8" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "gradient-rectangle":
        return (
          <div
            className="w-8 h-8 border-2 border-gray-400 rounded"
            style={{
              background: "linear-gradient(to right, #000000, #ffffff)",
            }}
          ></div>
        )
      case "gradient-circle":
        return (
          <div
            className="w-8 h-8 border-2 border-gray-400 rounded-full"
            style={{
              background: "linear-gradient(to right, #000000, #ffffff)",
            }}
          ></div>
        )
      case "horizontal-line":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="16" x2="28" y2="16" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      case "vertical-line":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="16" y1="4" x2="16" y2="28" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      case "diagonal-line":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="4" x2="28" y2="28" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      case "dashed-line":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="4"
              y1="16"
              x2="28"
              y2="16"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </svg>
        )
      case "star-icon":
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/star-icon.png" alt="Star icon" className="w-6 h-6 object-contain" />
          </div>
        )
      case "delivery-truck-icon":
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/delivery-truck-icon.png" alt="Delivery truck icon" className="w-6 h-6 object-contain" />
          </div>
        )
      case "return-package-icon":
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/return-package-icon.png" alt="Return package icon" className="w-6 h-6 object-contain" />
          </div>
        )
      case "warning-icon":
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/warning-icon.png" alt="Warning icon" className="w-6 h-6 object-contain" />
          </div>
        )
      case "threat-warning-icon":
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/threat-warning-icon.png" alt="Threat warning icon" className="w-6 h-6 object-contain" />
          </div>
        )
      case "quarter-circle":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V28H28C28 15.8497 18.1503 4 4 4Z" fill="#F97316" stroke="#9CA3AF" strokeWidth="2" />
          </svg>
        )
      case "rounded-corner-square":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V28H28C28 15.8497 18.1503 4 4 4Z" fill="#F97316" stroke="#9CA3AF" strokeWidth="2" />
            <path d="M4 28C4 21.3726 9.37258 16 16 16H28V28H4Z" fill="#FFFFFF" stroke="none" />
          </svg>
        )
      default:
        return <div className="w-8 h-8 border-2 border-gray-400 rounded"></div>
    }
  }

  // 이미지 프레임 아이콘 렌더링 함수
  const renderImageFrameIcon = (type) => {
    const sampleImage = "/sample-landscape.png"

    switch (type) {
      case "circle-frame":
        return (
          <div className="w-8 h-8 relative">
            <img
              src={sampleImage || "/placeholder.svg"}
              alt="Sample"
              className="w-full h-full object-cover rounded-full border-2 border-gray-400"
            />
          </div>
        )
      case "rectangle-frame":
        return (
          <div className="w-8 h-8 relative">
            <img
              src={sampleImage || "/placeholder.svg"}
              alt="Sample"
              className="w-full h-full object-cover rounded border-2 border-gray-400"
            />
          </div>
        )
      default:
        return <div className="w-8 h-8 border-2 border-gray-400 rounded bg-gray-200"></div>
    }
  }

  return (
    <div className="space-y-4">
      {/* 이미지 프레임 섹션 */}
      <div>
        <div className="bg-gray-50 p-3 rounded-md mb-3 text-gray-800">
          <h3 className="font-medium text-sm mb-2">이미지 프레임</h3>
          <p className="text-xs text-gray-500 mb-1">클릭하여 이미지 프레임을 추가하세요</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {imageFrames.map((frame) => (
            <Card
              key={frame.id}
              className="p-3 cursor-pointer hover:bg-gray-700 bg-gray-800 transition-colors"
              onClick={() => {
                console.log("이미지 프레임 클릭됨:", frame.type, frame.name)
                addElement(frame.type, frame.name)
              }}
            >
              <div className="flex flex-col items-center">
                <div className="h-12 flex items-center justify-center mb-2">{renderImageFrameIcon(frame.type)}</div>
                <p className="text-xs text-center text-gray-400">{frame.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 기본 도형 섹션 */}
      <div>
        <div className="bg-gray-50 p-3 rounded-md mb-3 text-gray-800">
          <h3 className="font-medium text-sm mb-2">도형</h3>
          <p className="text-xs text-gray-500 mb-1">클릭하여 캔버스에 추가하세요</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {shapes.map((shape) => (
            <Card
              key={shape.id}
              className="p-3 cursor-pointer hover:bg-gray-700 bg-gray-800 transition-colors"
              onClick={() => {
                console.log("도형 클릭됨:", shape.type, shape.name)
                addElement(shape.type, shape.name)
              }}
            >
              <div className="flex flex-col items-center">
                <div className="h-12 flex items-center justify-center mb-2">{renderShapeIcon(shape.type)}</div>
                <p className="text-xs text-center text-gray-400">{shape.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
