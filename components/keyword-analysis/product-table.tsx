"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ProductTableProps {
  keyword: string
}

export function ProductTable({ keyword }: ProductTableProps) {
  const products = [
    {
      id: 1,
      name: "네오몰 강아지 파스칼 후리스, 엘로우",
      price: "21,900원",
      reviews: 407,
      shipping: "무료배송",
      isAd: false,
      delivery: "1일",
      coupangReview: true,
    },
    {
      id: 2,
      name: "애완용품 불당 의상 애완견 반려동물 패딩조끼 보아 패딩 강아지패딩, 녹색",
      price: "8,820원",
      reviews: 59,
      shipping: "무료배송",
      isAd: false,
      delivery: "6일",
      coupangReview: true,
    },
    {
      id: 3,
      name: "퍼피멀 골프 고프레 패딩 울아웃 반려동물 의류 OW441, #999 Black",
      price: "41,540원",
      reviews: 2,
      shipping: "로켓배송",
      isAd: true,
      delivery: "1일",
      coupangReview: true,
    },
  ]

  // 불사자 아이콘 SVG
  const FireIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-orange-500" fill="currentColor">
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.28 2.67-.2 3.73-.74 1.67-2.23 2.72-4.01 2.72z" />
    </svg>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>상품 분석 결과</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이미지</TableHead>
                <TableHead>순위</TableHead>
                <TableHead>상품명</TableHead>
                <TableHead>가격</TableHead>
                <TableHead>리뷰 수</TableHead>
                <TableHead>배송 유형</TableHead>
                <TableHead>광고 여부</TableHead>
                <TableHead>도착 예정일</TableHead>
                <TableHead>쿠팡 리뷰 ...</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                      <FireIcon />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{product.name}</div>
                  </TableCell>
                  <TableCell className="font-medium">{product.price}</TableCell>
                  <TableCell>{product.reviews.toLocaleString()}</TableCell>
                  <TableCell>
                    {product.shipping === "로켓배송" ? (
                      <Badge className="bg-blue-100 text-blue-800">🚀 로켓배송</Badge>
                    ) : (
                      <span>{product.shipping}</span>
                    )}
                  </TableCell>
                  <TableCell>{product.isAd ? <Badge variant="secondary">광고</Badge> : <span>-</span>}</TableCell>
                  <TableCell>{product.delivery}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="text-blue-500 border-blue-500">
                      리뷰 분석
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
