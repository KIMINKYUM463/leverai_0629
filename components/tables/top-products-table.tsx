import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, TrendingUp, AlertCircle } from "lucide-react"

const products = [
  {
    id: 1,
    name: "무선 이어폰",
    category: "전자기기",
    price: 120000,
    stock: 120,
    status: "인기",
    sales: 4230,
  },
  {
    id: 2,
    name: "스마트워치",
    category: "액세서리",
    price: 250000,
    stock: 85,
    status: "인기",
    sales: 3850,
  },
  {
    id: 3,
    name: "노트북 스탠드",
    category: "컴퓨터",
    price: 30000,
    stock: 32,
    status: "품절 임박",
    sales: 3620,
  },
  {
    id: 4,
    name: "블루투스 스피커",
    category: "전자기기",
    price: 80000,
    stock: 75,
    status: "인기",
    sales: 3450,
  },
  {
    id: 5,
    name: "휴대폰 케이스",
    category: "액세서리",
    price: 20000,
    stock: 95,
    status: "인기",
    sales: 3280,
  },
]

export function TopProductsTable() {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>상품명</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead>가격</TableHead>
            <TableHead>재고</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="text-right">판매량</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {product.category}
                </span>
              </TableCell>
              <TableCell>₩{product.price.toLocaleString()}</TableCell>
              <TableCell>{product.stock}개</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`flex w-fit items-center gap-1 ${
                    product.status === "인기"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : product.status === "품절 임박"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {product.status === "인기" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : product.status === "품절 임박" ? (
                    <AlertCircle className="h-3 w-3" />
                  ) : null}
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium flex items-center justify-end gap-1">
                {product.sales.toLocaleString()}개
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
