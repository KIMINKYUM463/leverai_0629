"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { createClientComponentClient } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isLoading) {
        if (!user) {
          router.push("/login")
          return
        }

        try {
          const { data, error } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

          if (error || !data.is_admin) {
            router.push("/")
          }
        } catch (error) {
          console.error("관리자 권한 확인 오류:", error)
          router.push("/")
        }
      }
    }

    checkAdminStatus()
  }, [isLoading, user, router, supabase])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        <span className="ml-2">권한 확인 중...</span>
      </div>
    )
  }

  return <>{children}</>
}
