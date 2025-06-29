import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">비밀번호 찾기</h2>
          <p className="mt-2 text-center text-sm text-gray-600">가입 시 입력한 이름과 이메일을 입력해주세요.</p>
        </div>
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
}
