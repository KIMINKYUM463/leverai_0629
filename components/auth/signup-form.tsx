"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Loader2, CheckCircle } from "lucide-react"

export function SignupForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeMarketing, setAgreeMarketing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isAutoApproved, setIsAutoApproved] = useState(false)
  const router = useRouter()

  // 전화번호 형식 검증
  const validatePhone = (phone: string) => {
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/
    return phoneRegex.test(phone.replace(/[^0-9]/g, ""))
  }

  // 전화번호 자동 포맷팅
  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // ─── 클라이언트 유효성 검사 ──────────────────────────────
    if (!name.trim()) return setError("이름을 입력해주세요.")
    if (!email.includes("@")) return setError("유효한 이메일 주소를 입력해주세요.")
    if (!phone.trim()) return setError("전화번호를 입력해주세요.")
    if (!validatePhone(phone)) return setError("올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)")
    if (password.length < 6) return setError("비밀번호는 최소 6자 이상이어야 합니다.")
    if (password !== confirmPassword) return setError("비밀번호가 일치하지 않습니다.")
    if (!agreeTerms) return setError("이용약관에 동의해주세요.")
    if (!agreePrivacy) return setError("개인정보 처리방침에 동의해주세요.")

    // ─── 서버 요청 ──────────────────────────────────────────
    try {
      setIsLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, phone, agreeMarketing }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? "회원가입 실패")

      setIsSuccess(true)
      setSuccessMessage(data.message || "회원가입이 완료되었습니다.")
      setIsAutoApproved(data.isAutoApproved || false)

      setTimeout(() => {
        router.push("/login?message=" + encodeURIComponent(data.message || "회원가입이 완료되었습니다."))
      }, 3000)
    } catch (err: any) {
      console.error("회원가입 오류:", err)
      setError(err.message ?? "회원가입 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // ─── UI ───────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSuccess ? (
        <Alert
          className={`${isAutoApproved ? "bg-green-50 text-green-800 border-green-200" : "bg-blue-50 text-blue-800 border-blue-200"}`}
        >
          <CheckCircle className={`h-4 w-4 ${isAutoApproved ? "text-green-600" : "text-blue-600"}`} />
          <AlertDescription>
            <div className="font-medium">{successMessage}</div>
            {isAutoApproved ? (
              <div className="mt-2 space-y-1">
                <div className="text-sm text-green-700">🎉 자동 승인되었습니다!</div>
                <div className="text-sm text-green-600">바로 로그인하여 서비스를 이용하실 수 있습니다.</div>
              </div>
            ) : (
              <div className="mt-2 space-y-1">
                <div className="text-sm">관리자 승인 후 로그인하실 수 있습니다.</div>
                <div className="text-sm text-blue-600">승인 완료 시 별도 안내드리겠습니다.</div>
              </div>
            )}
            <div className="mt-2">
              <Loader2 className="inline mr-2 h-3 w-3 animate-spin" />
              로그인 페이지로 이동 중...
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이름 */}
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
          </div>
          {/* 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {/* 전화번호 */}
          <div className="space-y-2">
            <Label htmlFor="phone">전화번호</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="010-1234-5678"
              disabled={isLoading}
              maxLength={13}
            />
            <p className="text-xs text-gray-500">하이픈(-) 없이 입력하셔도 자동으로 형식이 맞춰집니다.</p>
          </div>
          {/* 비밀번호 */}
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              minLength={6}
            />
          </div>
          {/* 비밀번호 확인 */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              minLength={6}
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          {/* 약관 체크박스들 */}
          <div className="space-y-3 pt-2">
            <CheckRow
              id="agreeTerms"
              checked={agreeTerms}
              onChange={setAgreeTerms}
              required
              label="이용약관에 동의합니다"
            />
            <CheckRow
              id="agreePrivacy"
              checked={agreePrivacy}
              onChange={setAgreePrivacy}
              required
              label="개인정보 처리방침에 동의합니다"
            />
            <CheckRow
              id="agreeMarketing"
              checked={agreeMarketing}
              onChange={setAgreeMarketing}
              label="마케팅 정보 수신에 동의합니다 (선택)"
              sub="새로운 기능, 이벤트, 프로모션 정보를 이메일로 받아보실 수 있습니다."
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                회원가입 중...
              </>
            ) : (
              "회원가입"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

/* ─────────────── 재사용 체크박스 Row 컴포넌트 ─────────────── */
function CheckRow({
  id,
  checked,
  onChange,
  label,
  required,
  sub,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  required?: boolean
  sub?: string
}) {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(v as boolean)} />
      <div className="space-y-1 leading-none">
        <Label htmlFor={id} className="text-sm font-medium leading-none">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {sub && <p className="text-xs text-gray-500">{sub}</p>}
      </div>
    </div>
  )
}
