import { SignupForm } from "@/components/auth/signup-form"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold">회원가입</h1>
              <p className="text-sm text-gray-500 mt-2">LeverAI 서비스를 이용하기 위한 계정을 만드세요</p>
            </div>
            <SignupForm />
            <div className="mt-6 text-center text-sm text-gray-500">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="font-medium text-teal-600 hover:text-teal-500">
                로그인
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
