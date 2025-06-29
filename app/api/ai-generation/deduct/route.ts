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

    console.log("🔥 AI 생성 횟수 차감 요청:", user.id)

    // 현재 프로필 조회
    const { data: profile, error: selectError } = await supabase
      .from("profiles")
      .select("ai_generation_count")
      .eq("id", user.id)
      .single()

    if (selectError) {
      console.error("프로필 조회 오류:", selectError)
      return NextResponse.json({ error: "프로필 조회 실패" }, { status: 500 })
    }

    if (!profile || profile.ai_generation_count <= 0) {
      return NextResponse.json({ error: "생성 횟수가 부족합니다." }, { status: 400 })
    }

    // 횟수 차감
    const { data: updatedProfile, error: updateError } = await supabase
      .from("profiles")
      .update({
        ai_generation_count: profile.ai_generation_count - 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select("ai_generation_count")
      .single()

    if (updateError) {
      console.error("횟수 차감 오류:", updateError)
      return NextResponse.json({ error: "횟수 차감 실패" }, { status: 500 })
    }

    console.log("✅ 횟수 차감 성공:", updatedProfile.ai_generation_count)

    return NextResponse.json({
      message: "횟수가 차감되었습니다.",
      remainingCount: updatedProfile.ai_generation_count,
    })
  } catch (error) {
    console.error("횟수 차감 오류:", error)
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
