"use client"

/**
 * 템플릿을 로드하고 각 요소에 originalId를 보존하는 유틸리티
 */
export function loadTemplateWithOriginalIds(templateData: any) {
  if (!templateData || !Array.isArray(templateData.elements)) {
    return { elements: [] }
  }

  console.log("🔄 템플릿 로드 시작 - 원본 데이터:", templateData)

  const elementsWithOriginalIds = templateData.elements.map((element: any, index: number) => {
    // 새로운 런타임 ID 생성
    const newId = `${element.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    console.log(`📋 요소 ${index + 1} 처리:`, {
      originalId: element.id,
      newId: newId,
      type: element.type,
      name: element.name,
    })

    return {
      ...element,
      id: newId, // 새로운 런타임 ID
      originalId: element.id, // 원본 템플릿 ID 보존
      // 이미지 프레임의 경우 추가 메타데이터
      ...(element.type === "image-frame" && {
        frameType: element.shapeType,
        templateSource: "template1", // 어떤 템플릿에서 왔는지
      }),
    }
  })

  console.log("✅ 템플릿 로드 완료 - 처리된 요소들:", elementsWithOriginalIds)

  return {
    ...templateData,
    elements: elementsWithOriginalIds,
  }
}

/**
 * JSON 파일에서 템플릿을 로드하는 함수
 */
export async function loadTemplate(templatePath: string) {
  try {
    console.log("📥 템플릿 파일 로드 시작:", templatePath)
    const response = await fetch(templatePath)
    const templateData = await response.json()

    console.log("📄 원본 템플릿 데이터:", templateData)

    // originalId를 보존하면서 로드
    const processedTemplate = loadTemplateWithOriginalIds(templateData)

    console.log("🎯 처리된 템플릿 데이터:", processedTemplate)

    return processedTemplate
  } catch (error) {
    console.error("❌ Template loading error:", error)
    return { elements: [] }
  }
}

/**
 * Supabase에서 템플릿을 로드하는 함수
 */
export async function loadTemplateFromSupabase(templateId: string) {
  try {
    console.log("📥 Supabase 템플릿 로드 시작:", templateId)

    // Supabase에서 템플릿 데이터 가져오기
    const response = await fetch(`/api/templates/${templateId}`)
    const templateData = await response.json()

    console.log("📄 Supabase 원본 템플릿 데이터:", templateData)

    if (!templateData || !templateData.elements) {
      throw new Error("Invalid template data from Supabase")
    }

    // originalId를 보존하면서 로드
    const processedTemplate = loadTemplateWithOriginalIds(templateData)

    console.log("🎯 Supabase 처리된 템플릿 데이터:", processedTemplate)

    return processedTemplate
  } catch (error) {
    console.error("❌ Supabase template loading error:", error)
    return { elements: [] }
  }
}
