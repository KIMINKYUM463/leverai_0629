import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex flex-1 items-center justify-center p-4 md:p-6">
          <div className="w-full max-w-md px-4 md:px-0">
            <div className="mb-6 md:mb-8 text-center">
              <h1 className="text-xl md:text-2xl font-bold">로그인</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-2">LeverAI 서비스를 이용하기 위해 로그인하세요</p>
            </div>
            <LoginForm />
          </div>
        </main>
      </div>
    </div>
  )
}
