import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Phone, CheckCircle } from "lucide-react"

const suppliers = [
  {
    id: 1,
    name: "푸른농장",
    location: "경기도 이천",
    products: "쌀, 잡곡, 채소",
    rating: 4.8,
    certification: ["친환경", "GAP"],
    status: "활성",
  },
  {
    id: 2,
    name: "제주감귤농원",
    location: "제주도 서귀포",
    products: "감귤, 한라봉, 천혜향",
    rating: 4.9,
    certification: ["무농약", "GAP"],
    status: "활성",
  },
  {
    id: 3,
    name: "강원청정농장",
    location: "강원도 평창",
    products: "감자, 옥수수, 산나물",
    rating: 4.7,
    certification: ["유기농", "GAP"],
    status: "활성",
  },
  {
    id: 4,
    name: "완도수산",
    location: "전남 완도",
    products: "전복, 해조류, 생선",
    rating: 4.6,
    certification: ["HACCP", "ASC"],
    status: "활성",
  },
  {
    id: 5,
    name: "경북과수원",
    location: "경북 상주",
    products: "사과, 배, 복숭아",
    rating: 4.5,
    certification: ["GAP"],
    status: "활성",
  },
]

export function SupplierList() {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>공급업체</TableHead>
            <TableHead>위치</TableHead>
            <TableHead>주요 상품</TableHead>
            <TableHead>평점</TableHead>
            <TableHead>인증</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="text-right">액션</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                    {supplier.name.charAt(0)}
                  </div>
                  {supplier.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin className="h-3.5 w-3.5" />
                  {supplier.location}
                </div>
              </TableCell>
              <TableCell>{supplier.products}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">{supplier.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {supplier.certification.map((cert) => (
                    <Badge
                      key={cert}
                      variant="outline"
                      className="text-xs bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-0.5"
                    >
                      <CheckCircle className="h-3 w-3" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                  {supplier.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  연락하기
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
