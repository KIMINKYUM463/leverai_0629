import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, ShoppingCart, Package, Palette, Globe, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    activity: "제주 감귤 상품 등록",
    user: "김농부",
    time: "오늘 14:32",
    icon: ShoppingCart,
  },
  {
    id: 2,
    activity: "강원도 감자 가격 업데이트",
    user: "이판매",
    time: "오늘 13:15",
    icon: FileText,
  },
  {
    id: 3,
    activity: "완도 전복 재고 업데이트",
    user: "박어부",
    time: "오늘 11:42",
    icon: Package,
  },
  {
    id: 4,
    activity: "경북 사과 상세페이지 생성",
    user: "최과수",
    time: "오늘 10:28",
    icon: Palette,
  },
  {
    id: 5,
    activity: "해남 고구마 B2B 사이트 생성",
    user: "정농장",
    time: "어제 16:45",
    icon: Globe,
  },
]

export function RecentActivities() {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>활동</TableHead>
            <TableHead>사용자</TableHead>
            <TableHead>시간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  {activity.activity}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">
                    {activity.user.charAt(0)}
                  </div>
                  {activity.user}
                </div>
              </TableCell>
              <TableCell className="text-gray-500 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {activity.time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
