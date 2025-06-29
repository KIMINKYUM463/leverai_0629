import { createClient } from "@supabase/supabase-js"

// 관리자 권한으로 Supabase 클라이언트 생성 (서버 사이드에서만 사용)
export const createAdminClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL 환경 변수가 설정되지 않았습니다.")
  }

  if (!supabaseServiceKey) {
    console.warn("SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다. 일부 관리자 기능이 제한될 수 있습니다.")
    // 서비스 키가 없으면 일반 anon 키 사용
    const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    return createClient(supabaseUrl, anonKey!)
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

export const supabaseAdmin = createAdminClient()

export default supabaseAdmin
