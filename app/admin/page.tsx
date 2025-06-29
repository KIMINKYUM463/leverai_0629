import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">관리자 페이지</h1>
            <p className="text-sm text-gray-500 mt-1">사용자 승인 및 관리</p>
          </div>
          <UserManagement />
        </main>
      </div>
    </div>
  )
}
