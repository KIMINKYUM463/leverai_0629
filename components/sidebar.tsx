"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Palette, DollarSign, BarChart3, Home, ChevronRight, ChevronLeft, Bell, Lock, Megaphone } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const menuItems = [
  {
    name: "대시보드",
    href: "/",
    icon: Home,
    requireAuth: true,
  },
  {
    name: "공지사항",
    href: "/notices",
    icon: Bell,
    requireAuth: true,
  },
  // {
  //   name: "AI CS",
  //   href: "/ai-cs",
  //   icon: HeadphonesIcon,
  //   requireAuth: true,
  // },
  {
    name: "AI 마케팅",
    href: "/ai-marketing-external",
    icon: Megaphone,
    requireAuth: true,
  },
  // {
  //   name: "AI 소싱",
  //   href: "/sourcing",
  //   icon: ShoppingBag,
  //   requireAuth: true,
  // },
  // {
  //   name: "AI 키워드 분석",
  //   href: "/keyword-analysis",
  //   icon: Search,
  //   requireAuth: true,
  // },
  {
    name: "AI 상세페이지",
    href: "/page-builder",
    icon: Palette,
    requireAuth: true,
  },
  {
    name: "AI 가격설정",
    href: "/pricing",
    icon: DollarSign,
    requireAuth: true,
    disabled: true,
  },
  {
    name: "AI 광고 분석",
    href: "/analytics",
    icon: BarChart3,
    requireAuth: true,
    disabled: true,
  },
  // {
  //   name: "AI 마진계산기",
  //   href: "/margin-calculator",
  //   icon: Calculator,
  //   requireAuth: true,
  // },
  // {
  //   name: "AI 상품명 생성기",
  //   href: "/keyword-recommender",
  //   icon: Search,
  //   requireAuth: true,
  // },
  // {
  //   name: "AI 리뷰 분석",
  //   href: "/review-analyzer",
  //   icon: BarChart3,
  // },
  // {
  //   name: "AI 상품 순위 조회",
  //   href: "/keyword-tracking",
  //   icon: BarChart3,
  //   requireAuth: true,
  // },
  // {
  //   name: "AI 경쟁사 분석",
  //   href: "/competitor-analysis",
  //   icon: PieChart,
  //   requireAuth: true,
  // },
  // {
  //   name: "AI 손익 계산기",
  //   href: "/profit-calculator",
  //   icon: Calculator,
  //   requireAuth: true,
  // },
  {
    name: "관리자",
    href: "/admin",
    icon: Lock,
    requireAuth: true,
    adminOnly: true,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const supabase = createClientComponentClient()
        const { data } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

        setIsAdmin(data?.is_admin || false)
      }
    }

    checkAdminStatus()
  }, [user])

  // 메뉴 필터링
  const filteredMenuItems = menuItems.filter((item) => {
    if (item.adminOnly && !isAdmin) return false
    return true
  })

  // 로컬 스토리지에서 사이드바 상태 불러오기
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setCollapsed(savedState === "true")
    }
  }, [])

  // 사이드바 상태 변경 시 로컬 스토리지에 저장
  const toggleSidebar = () => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem("sidebarCollapsed", String(newState))
  }

  // 메뉴 클릭 핸들러
  const handleMenuClick = (item: (typeof menuItems)[0], e: React.MouseEvent) => {
    // 인증이 필요한 메뉴이고 로그인하지 않은 경우 클릭 방지
    if (item.requireAuth && !user) {
      e.preventDefault()
      return false
    }
  }

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen flex-shrink-0 hidden md:flex flex-col shadow-sm transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className={cn("border-b border-gray-100 flex items-center", collapsed ? "justify-center p-4" : "p-6")}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
              L
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                LeverAI
              </h2>
              <p className="text-gray-500 text-xs">이머커스 AI 플랫폼</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
            L
          </div>
        )}

        {/* 헤더 내 토글 버튼 */}
        <button
          onClick={toggleSidebar}
          className={cn(
            "bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors",
            collapsed ? "ml-4 p-1.5" : "ml-auto p-1.5",
          )}
          aria-label={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul className={cn("space-y-1", collapsed ? "px-2" : "px-3")}>
          {filteredMenuItems.map((item) => {
            const isLocked = item.requireAuth && !user
            const isActive = pathname === item.href
            const isDisabled = item.disabled

            return (
              <li key={item.name} className="relative group">
                {isLocked ? (
                  // 로그인하지 않은 경우 - 클릭 불가능한 div
                  <div
                    className={cn(
                      "flex items-center py-2.5 rounded-lg transition-colors cursor-not-allowed pointer-events-none",
                      "text-gray-300 bg-gray-50/50",
                      collapsed ? "justify-center px-2" : "px-3",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 text-gray-300", !collapsed && "mr-3")} />

                    {!collapsed && (
                      <>
                        <span className="text-sm flex-1">{item.name}</span>
                        <Lock className="h-3 w-3 text-gray-300 ml-2" />
                      </>
                    )}

                    {/* 접힌 상태에서 툴팁 표시 */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap">
                        {item.name} (로그인 필요)
                      </div>
                    )}
                  </div>
                ) : isDisabled ? (
                  // 비활성화된 메뉴 - 표시되지만 클릭 불가능
                  <div
                    className={cn(
                      "flex items-center py-2.5 rounded-lg transition-colors cursor-not-allowed",
                      "text-gray-400 bg-gray-50/30",
                      collapsed ? "justify-center px-2" : "px-3",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 text-gray-400", !collapsed && "mr-3")} />

                    {!collapsed && (
                      <>
                        <span className="text-sm flex-1">{item.name}</span>
                        <span className="text-xs text-gray-400 ml-2">준비중</span>
                      </>
                    )}

                    {/* 접힌 상태에서 툴팁 표시 */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap">
                        {item.name} (준비중)
                      </div>
                    )}
                  </div>
                ) : (
                  // 로그인한 경우 - 클릭 가능한 Link
                  <Link
                    href={item.href}
                    onClick={(e) => handleMenuClick(item, e)}
                    className={cn(
                      "flex items-center py-2.5 rounded-lg transition-colors group",
                      isActive && "bg-emerald-50 text-emerald-700 font-medium",
                      "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700",
                      collapsed ? "justify-center px-2" : "px-3",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-emerald-600" : "text-gray-500 group-hover:text-emerald-600",
                        !collapsed && "mr-3",
                      )}
                    />

                    {!collapsed && (
                      <>
                        <span className="text-sm flex-1">{item.name}</span>
                        <ChevronRight
                          className={cn(
                            "ml-auto h-4 w-4 opacity-0 -translate-x-2 transition-all",
                            isActive
                              ? "opacity-100 translate-x-0 text-emerald-600"
                              : "group-hover:opacity-70 group-hover:translate-x-0",
                          )}
                        />
                      </>
                    )}

                    {/* 접힌 상태에서 툴팁 표시 */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 whitespace-nowrap">
                        {item.name}
                      </div>
                    )}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
            <h4 className="font-medium text-emerald-800 text-sm">새로운 AI 도구</h4>
            <p className="text-emerald-700 text-xs mt-1">최신 이커머스 AI 도구가 추가되었습니다. 지금 확인해보세요!</p>
          </div>
        </div>
      )}
    </aside>
  )
}
