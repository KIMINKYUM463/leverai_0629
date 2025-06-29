import { uploadTemplateToStorage } from "./supabase-storage"

// 기존 JSON 파일들을 Storage에 업로드하는 헬퍼 함수
export async function uploadExistingTemplates() {
  // 1. template-complete.json 업로드
  try {
    const response1 = await fetch("/template-complete.json")
    const templateComplete = await response1.json()
    await uploadTemplateToStorage("template-complete.json", templateComplete)
    console.log("template-complete.json 업로드 완료")
  } catch (error) {
    console.error("template-complete.json 업로드 실패:", error)
  }

  // 2. template1.json 업로드 (기본 템플릿으로)
  try {
    const response2 = await fetch("/template1.json")
    const template1 = await response2.json()
    await uploadTemplateToStorage("template-basic.json", template1)
    console.log("template-basic.json 업로드 완료")
  } catch (error) {
    console.error("template-basic.json 업로드 실패:", error)
  }

  // 3. AI 템플릿 생성 및 업로드
  const aiTemplate = {
    canvasSize: { width: 860, height: 1200 },
    backgroundColor: "#FFFFFF",
    elements: [
      {
        id: "ai-title",
        type: "text",
        content: "AI 생성 상품",
        position: { x: 100, y: 50 },
        size: { width: 300, height: 50 },
        zIndex: 1,
      },
    ],
  }

  try {
    await uploadTemplateToStorage("template-ai-generated.json", aiTemplate)
    console.log("template-ai-generated.json 업로드 완료")
  } catch (error) {
    console.error("AI 템플릿 업로드 실패:", error)
  }
}
