import { getTemplateById } from "./template-data"

// 템플릿1 - 완전한 상품 상세페이지 템플릿 (새로운 JSON 데이터)
const template1Data = {
  canvasSize: {
    width: 860,
    height: 18804,
  },
  backgroundColor: "#FFFFFF",
  elements: [
    // ... (keep all existing elements but update Premium text zIndex)
  ],
}

// 템플릿 ID와 키워드를 기반으로 상세페이지 생성 (캔버스 설정 포함)
export async function generatePageContent(
  templateId: number,
  keyword: string,
  setLoadingStep?: (step: "copywriting" | "image" | null) => void,
) {
  // 템플릿 데이터 가져오기
  const templateData = getTemplateById(templateId)

  if (!templateData) {
    console.error(`템플릿 ID ${templateId}를 찾을 수 없습니다.`)
    throw new Error("템플릿을 찾을 수 없습니다.")
  }

  console.log(`'${templateData.name}' 템플릿으로 '${keyword}' 상세페이지 생성 중...`)

  // 1단계: AI 카피라이팅 생성 (2초)
  if (setLoadingStep) {
    setLoadingStep("copywriting")
  }
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 2단계: AI 사진 생성 (2초)
  if (setLoadingStep) {
    setLoadingStep("image")
  }
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // 템플릿별 설정과 요소
  let canvasSettings = {
    width: 860,
    height: 1200,
    backgroundColor: "#FFFFFF",
  }
  let elements = []

  switch (templateId) {
    case 1: // 완전한 상품 상세페이지 템플릿
      try {
        // JSON 파일에서 템플릿 데이터 로드
        const response = await fetch("/template-complete.json")
        const templateJson = await response.json()

        // 캔버스 설정 적용
        canvasSettings = {
          width: templateJson.canvasSize.width,
          height: templateJson.canvasSize.height,
          backgroundColor: templateJson.backgroundColor,
        }

        // 템플릿 데이터의 모든 요소를 그대로 복사
        elements = JSON.parse(JSON.stringify(templateJson.elements))

        // 고유 ID 생성을 위해 타임스탬프 추가
        const timestamp = Date.now()
        elements.forEach((element, index) => {
          // 기존 ID에 새로운 타임스탬프 추가
          element.id = `ai-${element.type}-${timestamp}-${index}-${Math.random().toString(36).substr(2, 9)}`

          // 선택 관련 속성 완전 제거
          delete element.selected
          delete element.isSelected
          delete element.groupId
          delete element.isGrouped
          delete element.parentId
          delete element.originalPosition

          // Premium 텍스트의 zIndex를 최대값으로 설정
          if (element.styleName === "Premium 텍스트" || element.content === "Premium") {
            element.zIndex = 10000
            console.log("Premium 텍스트를 맨 앞으로 이동:", element.id)
          } else if (!element.zIndex) {
            element.zIndex = 1 + index
          }
        })

        console.log("완전한 상품 상세페이지 템플릿의 모든 요소들을 적용합니다.")
        console.log("캔버스 크기:", canvasSettings.width, "x", canvasSettings.height)
        console.log("배경색:", canvasSettings.backgroundColor)
        console.log("요소 개수:", elements.length)
      } catch (error) {
        console.error("템플릿 로드 중 오류:", error)
        // 기본 템플릿으로 폴백
        canvasSettings = {
          width: 860,
          height: 1200,
          backgroundColor: "#FFFFFF",
        }
        elements = [
          {
            id: `text-header-${Date.now()}`,
            type: "text",
            textStyle: "text-3xl font-bold text-center",
            styleName: "헤더",
            content: `${keyword} 상품 소개`,
            position: { x: 230, y: 50 },
            size: { width: 400, height: 60 },
            rotation: 0,
            zIndex: 10,
            color: "#000000",
            backgroundColor: "transparent",
          },
        ]
      }
      break

    case 11: // 사과 프리미엄 템플릿
      canvasSettings = {
        width: 860,
        height: 400,
        backgroundColor: "#000000",
      }
      elements = [
        {
          id: `text-premium-${Date.now()}`,
          type: "text",
          textStyle: "text-2xl font-light text-center",
          styleName: "프리미엄 텍스트",
          content: "Premium",
          position: { x: 330, y: 30 },
          size: { width: 200, height: 40 },
          rotation: 0,
          zIndex: 10000, // Premium 텍스트를 맨 앞으로
          color: "#FFFFFF",
          backgroundColor: "transparent",
        },
        {
          id: `text-apple-title-${Date.now()}`,
          type: "text",
          textStyle: "text-5xl font-bold text-center",
          styleName: "상품명",
          content: keyword,
          position: { x: 330, y: 70 },
          size: { width: 200, height: 70 },
          rotation: 0,
          zIndex: 10,
          color: "#FF3B30",
          backgroundColor: "transparent",
        },
      ]
      break

    default:
      // 기본 템플릿
      canvasSettings = {
        width: 860,
        height: 1200,
        backgroundColor: "#FFFFFF",
      }
      elements = [
        {
          id: `text-header-${Date.now()}`,
          type: "text",
          textStyle: "text-3xl font-bold text-center",
          styleName: "헤더",
          content: `${keyword} 상품 소개`,
          position: { x: 230, y: 50 },
          size: { width: 400, height: 60 },
          rotation: 0,
          zIndex: 10,
          color: "#000000",
          backgroundColor: "transparent",
        },
      ]
  }

  // 캔버스 설정과 요소들을 함께 반환
  return {
    canvasSettings,
    elements,
  }
}

// 캔버스 크기 반환 함수 (호환성 유지)
export function getCanvasSize(templateId: number) {
  switch (templateId) {
    case 1:
      return template1Data.canvasSize
    default:
      return { width: 860, height: 1200 }
  }
}

// 배경색 반환 함수 (호환성 유지)
export function getBackgroundColor(templateId: number) {
  switch (templateId) {
    case 1:
      return template1Data.backgroundColor
    default:
      return "#FFFFFF"
  }
}
