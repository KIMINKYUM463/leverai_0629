"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle, MessageCircle } from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase-client"
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createSupabaseClient()

  // URL에서 메시지 가져오기 (회원가입 완료 메시지 등)
  const message = searchParams.get("message")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Supabase 로그인
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError("잘못된 이메일 또는 비밀번호입니다.")
        } else {
          setError(signInError.message)
        }
        setIsLoading(false)
        return
      }

      if (data.user) {
        // 사용자 승인 상태 확인
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("is_approved, is_admin, name")
          .eq("id", data.user.id)
          .single()

        if (profileError) {
          console.error("프로필 조회 오류:", profileError)
          setError("사용자 정보를 확인할 수 없습니다.")
          // 로그아웃 처리
          await supabase.auth.signOut()
          setIsLoading(false)
          return
        }

        // 승인 상태 확인
        if (!profile.is_approved) {
          setError("관리자 승인 대기 중입니다. 승인 후 이용 가능합니다.")
          // 로그아웃 처리
          await supabase.auth.signOut()
          setIsLoading(false)
          return
        }

        // 승인된 사용자만 로그인 성공
        setIsSuccess(true)
        setTimeout(() => {
          window.location.href = "/"
        }, 1000)
      }
    } catch (err) {
      console.error("로그인 오류:", err)
      setError("로그인 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {message && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <CheckCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSuccess ? (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>로그인 성공! 메인 페이지로 이동 중...</AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">비밀번호</Label>
              <button
                type="button"
                onClick={() => alert("아래 고객센터로 성함, 전화번호 알려주시면 안내드립니다")}
                className="text-xs text-teal-600 hover:underline"
              >
                비밀번호 찾기
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                로그인 중...
              </>
            ) : (
              "로그인"
            )}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">계정이 없으신가요? </span>
            <Link href="/signup" className="text-teal-600 hover:underline font-medium">
              회원가입
            </Link>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => window.open("http://pf.kakao.com/_Gpgfn/chat", "_blank")}
              className="w-full flex items-center justify-center py-2 px-4 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              고객센터 문의
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
