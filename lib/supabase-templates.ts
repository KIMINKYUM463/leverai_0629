import { supabase } from "./supabase"
import { getTemplateFromStorage, uploadTemplateToStorage } from "./supabase-storage"

// 템플릿 목록 가져오기 (파일 경로 포함)
export async function getTemplatesWithStorage() {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching templates:", error)
    return []
  }

  return data || []
}

// ID로 템플릿 가져오기 (Storage에서 실제 데이터 로드)
export async function getTemplateByIdWithStorage(id: number) {
  // 1. 데이터베이스에서 템플릿 메타데이터 가져오기
  const { data: templateMeta, error } = await supabase.from("templates").select("*").eq("id", id).single()

  if (error || !templateMeta) {
    console.error("Error fetching template metadata:", error)
    return null
  }

  // 2. Storage에서 실제 템플릿 데이터 가져오기
  if (templateMeta.template_file_path) {
    const templateData = await getTemplateFromStorage(templateMeta.template_file_path)

    return {
      ...templateMeta,
      template_data: templateData,
    }
  }

  return templateMeta
}

// 새 템플릿 생성 (Storage 파일 경로와 함께)
export async function createTemplateWithStorage(
  name: string,
  description: string,
  templateData: any,
  previewImage: string,
  category: string,
) {
  // 1. Storage에 템플릿 데이터 업로드
  const fileName = `template-${Date.now()}.json`
  const uploadResult = await uploadTemplateToStorage(fileName, templateData)

  if (!uploadResult) {
    throw new Error("템플릿 파일 업로드 실패")
  }

  // 2. 데이터베이스에 메타데이터 저장
  const { data, error } = await supabase
    .from("templates")
    .insert({
      name,
      description,
      template_file_path: fileName,
      preview_image: previewImage,
      category,
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating template:", error)
    throw error
  }

  return data
}
