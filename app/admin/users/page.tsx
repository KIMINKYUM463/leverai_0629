import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { UserApprovalList } from "@/components/admin/user-approval-list"

export default function AdminUsersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">사용자 관리</h1>
            <p className="text-sm text-gray-500 mt-1">사용자 승인 및 권한 관리</p>
          </div>
          <UserApprovalList />
        </main>
      </div>
    </div>
  )
}
