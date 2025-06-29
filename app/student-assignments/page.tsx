import type { Metadata } from "next"
import Link from "next/link"
import { AssignmentList } from "@/components/student-assignments/assignment-list"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export const metadata: Metadata = {
  title: "수강생 과제 | LeverAI",
  description: "1주차부터 4주차까지의 수강생 과제를 관리하고 제출합니다.",
}

export default function StudentAssignmentsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-1">
              <Home className="h-4 w-4" />
              메인화면
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">수강생 과제</h2>
        </div>
      </div>
      <div className="space-y-4">
        <AssignmentList />
      </div>
    </div>
  )
}
