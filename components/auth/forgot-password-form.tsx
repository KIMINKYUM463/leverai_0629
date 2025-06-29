"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, CheckCircle, Eye, EyeOff, Shield } from "lucide-react"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [foundPassword, setFoundPassword] = useState<string | null>(null)
  const [foundUser, setFoundUser] = useState<{ name: string; email: string } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFoundPassword(null)
    setFoundUser(null)

    // 유효성 검사
    if (!name.trim()) return setError("이름을 입력해주세요.")
    if (!email.includes("@")) return setError("유효한 이메일 주소를 입력해주세요.")

    try {
      setIsLoading(true)
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? "비밀번호 찾기 실패")

      // 성공 시 비밀번호 표시
      setFoundPassword(data.password)
      setFoundUser({ name: data.name, email: data.email })
    } catch (err: any) {
      console.error("비밀번호 찾기 오류:", err)
      setError(err.message ?? "비밀번호 찾기 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setName("")
    setEmail("")
    setError(null)
    setFoundPassword(null)
    setFoundUser(null)
    setShowPassword(false)
  }

  return (
    <div className="space-y-4">
      {/* 보안 경고 */}
      <Alert className="bg-red-50 text-red-800 border-red-200">
        <Shield className="h-4 w-4 text-red-600" />
        <AlertDescription>
          <strong>보안 경고:</strong> 비밀번호가 화면에 표시됩니다. 주변에 다른 사람이 없는지 확인하세요.
        </AlertDescription>
      </Alert>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {foundPassword && foundUser ? (
        <div className="space-y-4">
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>계정을 찾았습니다!</AlertDescription>
          </Alert>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div>
              <Label className="text-sm font-medium text-gray-700">이름</Label>
              <p className="text-gray-900">{foundUser.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">이메일</Label>
              <p className="text-gray-900">{foundUser.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">비밀번호</Label>
              <div className="flex items-center space-x-2">
                <p className="text-gray-900 font-mono bg-white px-3 py-2 rounded border flex-1">
                  {showPassword ? foundPassword : "••••••••"}
                </p>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={() => router.push("/login")} className="flex-1">
              로그인하러 가기
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              다시 찾기
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="가입 시 입력한 이름"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="가입 시 입력한 이메일"
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                찾는 중...
              </>
            ) : (
              "비밀번호 찾기"
            )}
          </Button>

          <div className="text-center text-sm">
            <Link href="/login" className="text-teal-600 hover:underline">
              로그인으로 돌아가기
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
