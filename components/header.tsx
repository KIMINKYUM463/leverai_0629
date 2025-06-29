"use client"
import { Button } from "@/components/ui/button"
import { UserCircle, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "./auth/auth-provider"

export function Header() {
  const { user, isLoading, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  // 사용자 이름 가져오기 (메타데이터에서 또는 이메일에서)
  const getUserName = () => {
    if (!user) return ""
    return user.user_metadata?.name || user.email?.split("@")[0] || "사용자"
  }

  const getUserInitial = () => {
    const name = getUserName()
    return name.charAt(0).toUpperCase()
  }

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center md:w-72">
          <Link href="/" className="flex items-center">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                LeverAI
              </h1>
              <p className="text-xs text-gray-500 -mt-1">이머커스 AI 플랫폼</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-emerald-600">
            <Bell size={20} />
          </Button>

          {isLoading ? (
            <div className="h-9 w-24 bg-gray-100 rounded-md animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 font-medium bg-transparent">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">{getUserInitial()}</AvatarFallback>
                  </Avatar>
                  <span className="max-w-[100px] truncate">{getUserName()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              className="flex items-center gap-2 font-medium text-gray-700 hover:text-emerald-600 hover:border-emerald-600 transition-colors bg-transparent"
              asChild
            >
              <Link href="/login">
                <UserCircle size={18} />
                로그인
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
