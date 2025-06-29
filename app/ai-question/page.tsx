import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AIQuestionTool } from "@/components/ai-question/ai-question-tool"

export default function AIQuestionPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <AIQuestionTool />
        </main>
      </div>
    </div>
  )
}
