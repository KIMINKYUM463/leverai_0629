import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseClient } from "@/lib/supabase-client"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email } = body as {
    name: string
    email: string
  }

  if (!name || !email) {
    return NextResponse.json({ message: "이름과 이메일을 모두 입력해주세요." }, { status: 400 })
  }

  try {
    const supabase = createSupabaseClient()

    // profiles 테이블에서 이름과 이메일이 일치하는 사용자 조회
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("name, email, password")
      .eq("name", name.trim())
      .eq("email", email.trim().toLowerCase())
      .single()

    if (error || !profile) {
      return NextResponse.json(
        { message: "입력하신 이름과 이메일에 해당하는 계정을 찾을 수 없습니다." },
        { status: 404 },
      )
    }

    // 일치하는 계정이 있으면 비밀번호 반환
    return NextResponse.json({
      success: true,
      message: "계정을 찾았습니다.",
      password: profile.password,
      name: profile.name,
      email: profile.email,
    })
  } catch (err: any) {
    console.error("비밀번호 찾기 오류:", err)
    return NextResponse.json({ message: "비밀번호 찾기 중 오류가 발생했습니다." }, { status: 500 })
  }
}
