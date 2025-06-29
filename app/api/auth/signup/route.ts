import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { isApprovedUser } from "@/lib/approved-users"

// Server-side Supabase client (service-role key)
const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string)

/**
 * POST /api/auth/signup
 * Creates a user WITHOUT sending a confirmation e-mail.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, agreeMarketing } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "이메일과 비밀번호는 필수입니다." }, { status: 400 })
    }

    // 자동 승인 여부 확인
    const isAutoApproved = isApprovedUser(name || "", phone || "")
    console.log(`🔍 자동 승인 확인: ${name}(${phone}) -> ${isAutoApproved ? "승인됨" : "대기"}`)

    /* ────── 1. 사용자 생성 (Admin API, email_confirm=true) ────── */
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ✅ 이메일 인증 건너뜀
      user_metadata: {
        name: name || "",
        phone: phone || "",
        agree_marketing: agreeMarketing || false,
      },
    })

    if (createError) {
      console.error("회원가입 오류:", createError)
      return NextResponse.json({ error: createError.message }, { status: 400 })
    }

    if (!userData.user) {
      return NextResponse.json({ error: "사용자 생성에 실패했습니다." }, { status: 400 })
    }

    console.log("✅ 사용자 생성 성공:", userData.user.id)

    /* ────── 2. profiles 테이블 확인 및 생성 ────── */
    // 먼저 기존 프로필이 있는지 확인
    const { data: existingProfile, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userData.user.id)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116은 "not found" 에러코드
      console.error("프로필 확인 오류:", checkError)
    }

    if (existingProfile) {
      console.log("✅ 프로필이 이미 존재함 (트리거로 생성됨):", existingProfile.id)

      // 기존 프로필 업데이트 (자동 승인 여부에 따라 처리)
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          email: userData.user.email,
          name: name || "",
          phone: phone || "",
          password: password, // 비밀번호 평문 저장
          agree_marketing: agreeMarketing || false,
          ai_generation_count: 120,
          is_approved: isAutoApproved, // 🎯 자동 승인 로직 적용
          updated_at: new Date().toISOString(),
        })
        .eq("id", userData.user.id)

      if (updateError) {
        console.error("프로필 업데이트 오류:", updateError)
      } else {
        console.log(`✅ 프로필 업데이트 성공 (승인상태: ${isAutoApproved})`)
      }
    } else {
      // 새 프로필 생성 (자동 승인 여부에 따라 처리)
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userData.user.id,
        email: userData.user.email,
        name: name || "",
        phone: phone || "",
        password: password, // 비밀번호 평문 저장
        agree_marketing: agreeMarketing || false,
        ai_generation_count: 120,
        is_admin: false,
        is_approved: isAutoApproved, // 🎯 자동 승인 로직 적용
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (profileError) {
        console.error("프로필 생성 오류:", profileError)
        return NextResponse.json({ error: "프로필 생성에 실패했습니다." }, { status: 500 })
      } else {
        console.log(`✅ 프로필 생성 성공 (승인상태: ${isAutoApproved})`)
      }
    }

    /* ────── 3. 최종 확인 ────── */
    const { data: finalProfile, error: finalError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single()

    if (finalError) {
      console.error("최종 프로필 확인 오류:", finalError)
    } else {
      console.log("✅ 최종 프로필 확인:", finalProfile)
    }

    /* ────── 4. 응답 메시지 결정 ────── */
    const responseMessage = isAutoApproved
      ? "회원가입이 완료되었습니다. 바로 로그인하실 수 있습니다."
      : "회원가입이 완료되었습니다. 관리자 승인 후 로그인하실 수 있습니다."

    return NextResponse.json(
      {
        message: responseMessage,
        user: userData.user,
        isAutoApproved,
      },
      { status: 200 },
    )
  } catch (err) {
    console.error("회원가입 처리 오류:", err)
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
