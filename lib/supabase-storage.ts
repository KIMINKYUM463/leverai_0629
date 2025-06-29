import { supabase } from "./supabase"

// Storage에서 템플릿 JSON 파일 가져오기
export async function getTemplateFromStorage(filePath: string) {
  try {
    const { data, error } = await supabase.storage.from("templates").download(filePath)

    if (error) {
      console.error("Storage에서 템플릿 파일 다운로드 실패:", error)
      return null
    }

    // Blob을 텍스트로 변환
    const text = await data.text()
    return JSON.parse(text)
  } catch (error) {
    console.error("템플릿 파일 파싱 실패:", error)
    return null
  }
}

// Storage에 템플릿 JSON 파일 업로드
export async function uploadTemplateToStorage(fileName: string, templateData: any) {
  try {
    const jsonString = JSON.stringify(templateData, null, 2)
    const file = new Blob([jsonString], { type: "application/json" })

    const { data, error } = await supabase.storage.from("templates").upload(fileName, file, {
      cacheControl: "3600",
      upsert: true, // 기존 파일이 있으면 덮어쓰기
    })

    if (error) {
      console.error("Storage에 템플릿 파일 업로드 실패:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("템플릿 파일 업로드 중 오류:", error)
    return null
  }
}

// Storage에서 템플릿 파일 목록 가져오기
export async function listTemplateFiles() {
  try {
    const { data, error } = await supabase.storage.from("templates").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    })

    if (error) {
      console.error("Storage 파일 목록 가져오기 실패:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("파일 목록 조회 중 오류:", error)
    return []
  }
}
