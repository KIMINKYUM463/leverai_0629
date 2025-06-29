import { createClient } from "@supabase/supabase-js"
import {
  createClientComponentClient as _createClientComponentClient,
  createServerActionClient as _createServerActionClient,
} from "@supabase/auth-helpers-nextjs"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/** singleton supabase client (클라이언트 전용) */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/* ──────────────────────────────── Types ──────────────────────────────── */
export interface TemplateMeta {
  id: number
  name: string
  description: string | null
  category: string | null
  preview_image: string | null
  template_file_path: string | null
  is_active: boolean | null
  created_at: string | null
  updated_at: string | null
}

/* ───────────────────── Storage 에서 템플릿 JSON 가져오기 ───────────────────── */
async function getTemplateFromStorage(filePath: string) {
  try {
    // public URL 생성
    const { data, error } = supabase.storage.from("templates").getPublicUrl(filePath)
    if (error || !data?.publicUrl) {
      console.error("Storage public URL 생성 실패:", error)
      return null
    }

    // fetch 로 실제 JSON 다운로드
    const res = await fetch(data.publicUrl)
    if (!res.ok) {
      console.error("Storage JSON fetch 실패:", res.status, res.statusText)
      return null
    }

    const json = (await res.json()) as unknown
    return json
  } catch (err) {
    console.error("Storage JSON 파싱 실패:", err)
    return null
  }
}

/* ─────────────────────────── 템플릿 목록 가져오기 ─────────────────────────── */
export async function getTemplates(): Promise<TemplateMeta[]> {
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching templates:", error)
    return []
  }
  return (data as TemplateMeta[]) || []
}

/* ─────────────────────────── ID 로 템플릿 가져오기 ─────────────────────────── */
export async function getTemplateById(id: number) {
  // 1) 메타데이터
  const { data: meta, error } = await supabase.from("templates").select("*").eq("id", id).maybeSingle()

  if (error || !meta) {
    console.error("Error fetching template metadata:", error)
    return null
  }

  // 2) Storage JSON
  if (meta.template_file_path) {
    const templateData = await getTemplateFromStorage(meta.template_file_path)

    if (!templateData) {
      console.error("템플릿 파일 내용을 Storage에서 가져오지 못했습니다.")
      return null
    }

    // templateData (JSON 내용)를 최상위 객체로 사용하고, DB 메타데이터를 추가합니다.
    // 이렇게 하면 로컬 파일에서 읽은 JSON과 구조가 거의 동일해집니다.
    return {
      ...templateData, // { elements, canvasHeight, ... }
      db_meta: meta, // DB 정보는 db_meta 키 아래에 추가
    }
  }

  console.error("템플릿에 연결된 파일 경로가 없습니다.")
  return null
}

// ───────────────────────────── Helpers (auth-helpers-nextjs) ─────────────────────────────
export const createClientComponentClient = _createClientComponentClient
export const createServerActionClient = _createServerActionClient
