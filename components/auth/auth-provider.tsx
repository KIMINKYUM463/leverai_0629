"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createSupabaseClient } from "@/lib/supabase-client"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createSupabaseClient()

  useEffect(() => {
    // 현재 세션 확인
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("세션 확인 오류:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)
      setUser(session?.user ?? null)
      setIsLoading(false)

      if (event === "SIGNED_OUT") {
        router.push("/login")
        router.refresh()
      }
      // SIGNED_IN 시 자동 리디렉션 제거
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  // 로그인되지 않은 사용자 리디렉션
  useEffect(() => {
    if (!isLoading) {
      const publicPaths = ["/login", "/signup", "/pricing", "/analytics", "/page-builder"] // "/page-builder" 추가
      const isPublicPath = publicPaths.includes(pathname)

      if (!user && !isPublicPath) {
        router.push("/login")
      }
    }
  }, [user, isLoading, pathname, router])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push("/login")
    } catch (error) {
      console.error("로그아웃 오류:", error)
    }
  }

  const value = {
    user,
    isLoading,
    signOut,
  }

  // 로딩 중일 때 로딩 화면 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
