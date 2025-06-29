import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // 현재 사용자 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 })
    }

    console.log("🔍 프로필 초기화 요청:", user.id, user.email)

    // 기존 프로필 확인
    const { data: existingProfile, error: selectError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()

    if (selectError && selectError.code !== "PGRST116") {
      console.error("프로필 조회 오류:", selectError)
      return NextResponse.json({ error: "프로필 조회 실패" }, { status: 500 })
    }

    if (existingProfile) {
      console.log("✅ 기존 프로필 존재:", existingProfile)
      return NextResponse.json({
        message: "프로필이 이미 존재합니다.",
        profile: existingProfile,
      })
    }

    // 새 프로필 생성 (서버 측에서는 RLS 우회 가능)
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || "",
        phone: user.user_metadata?.phone || "",
        ai_generation_count: 120,
        is_admin: false,
        is_approved: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      console.error("프로필 생성 오류:", insertError)
      return NextResponse.json({ error: "프로필 생성 실패" }, { status: 500 })
    }

    console.log("✅ 새 프로필 생성 성공:", newProfile)

    return NextResponse.json({
      message: "프로필이 성공적으로 생성되었습니다.",
      profile: newProfile,
    })
  } catch (error) {
    console.error("프로필 초기화 오류:", error)
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
