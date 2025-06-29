import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { NoticeBoard } from "@/components/notices/notice-board"

export default function NoticesPage() {
  return (
    <div className="flex h-screen bg-gray-50/50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <NoticeBoard />
        </main>
      </div>
    </div>
  )
}
