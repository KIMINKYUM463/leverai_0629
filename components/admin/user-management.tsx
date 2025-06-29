"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, Shield } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

type UserProfile = {
  id: string
  name: string | null
  email: string | null
  is_approved: boolean
  is_admin: boolean
  created_at: string
}

export function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()

  // 관리자 권한 확인
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!authLoading && user) {
        const { data, error } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

        if (error || !data?.is_admin) {
          router.push("/")
        }
      } else if (!authLoading && !user) {
        router.push("/login")
      }
    }

    checkAdminStatus()
  }, [authLoading, user, router, supabase])

  // 사용자 목록 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)

        // profiles 테이블에서 모든 사용자 정보 가져오기
        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select("id, name, email, is_approved, is_admin, created_at")
          .order("created_at", { ascending: false })

        if (profilesError) {
          console.error("Profiles 조회 오류:", profilesError)
          throw profilesError
        }

        console.log("가져온 사용자 데이터:", profiles)
        setUsers(profiles || [])
      } catch (error: any) {
        console.error("사용자 목록 가져오기 오류:", error)
        setError("사용자 목록을 가져오는 중 오류가 발생했습니다.")
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchUsers()
    }
  }, [user, supabase])

  // 사용자 승인 상태 변경
  const toggleApproval = async (userId: string, currentStatus: boolean) => {
    try {
      setActionLoading(userId)

      const { error } = await supabase.from("profiles").update({ is_approved: !currentStatus }).eq("id", userId)

      if (error) {
        throw error
      }

      // 상태 업데이트
      setUsers(users.map((user) => (user.id === userId ? { ...user, is_approved: !currentStatus } : user)))
    } catch (error: any) {
      console.error("사용자 승인 상태 변경 오류:", error)
      setError("사용자 승인 상태를 변경하는 중 오류가 발생했습니다.")
    } finally {
      setActionLoading(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <span className="ml-2">사용자 목록을 불러오는 중...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md">
        <p>{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-2" variant="outline" size="sm">
          다시 시도
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">사용자 관리</h2>
        <p className="text-sm text-gray-500 mt-1">총 {users.length}명의 사용자가 등록되어 있습니다.</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>가입일</TableHead>
            <TableHead>승인 상태</TableHead>
            <TableHead>권한</TableHead>
            <TableHead className="text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                등록된 사용자가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name || "이름 없음"}</TableCell>
                <TableCell>{user.email || "이메일 없음"}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  {user.is_approved ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      승인됨
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      <XCircle className="w-3 h-3 mr-1" />
                      대기 중
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {user.is_admin ? (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      <Shield className="w-3 h-3 mr-1" />
                      관리자
                    </Badge>
                  ) : (
                    <Badge variant="outline">일반 사용자</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={user.is_approved ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleApproval(user.id, user.is_approved)}
                    disabled={actionLoading === user.id}
                    className={
                      user.is_approved
                        ? "text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    }
                  >
                    {actionLoading === user.id ? (
                      <>
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        처리 중...
                      </>
                    ) : user.is_approved ? (
                      <>
                        <XCircle className="mr-1 h-4 w-4" />
                        승인 취소
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        승인
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
