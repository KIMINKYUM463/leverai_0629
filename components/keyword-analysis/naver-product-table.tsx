"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function NaverProductTable({ keyword }: { keyword: string }) {
  const products = [
    {
      rank: 1,
      image: "/fire-icon.png",
      title: "농업용 레버 도구",
      category: "농업 기계 레버 핸들 조작 장치",
      price: "139,900원",
      reviews: 159,
      store: "농기계몰",
    },
    {
      rank: 2,
      image: "/fire-icon.png",
      title: "프리미엄 레버 시스템",
      category: "고급 레버 제어 장치",
      price: "89,900원",
      reviews: 234,
      store: "기계부품",
    },
    {
      rank: 3,
      image: "/fire-icon.png",
      title: "다기능 레버 핸들",
      category: "다목적 레버 조작기",
      price: "59,900원",
      reviews: 456,
      store: "도구마트",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          네이버 쇼핑 검색 결과
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">이미지</TableHead>
              <TableHead className="w-16">순위</TableHead>
              <TableHead>키워드</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>리뷰 수</TableHead>
              <TableHead>스토어명</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.rank}>
                <TableCell>
                  <img src={product.image || "/placeholder.svg"} alt="상품" className="w-8 h-8" />
                </TableCell>
                <TableCell className="font-medium">{product.rank}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{keyword}</Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{product.title}</div>
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.price}</TableCell>
                <TableCell>{product.reviews}</TableCell>
                <TableCell>{product.store}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
