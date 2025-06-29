"use client"

import { useState } from "react"
import { Search, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ProductDetailModal } from "@/components/product/product-detail-modal"

export function LeverDistribution() {
  const [activeTab, setActiveTab] = useState("recommended")
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleProductClick = (productId: string) => {
    setSelectedProduct(productId)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="w-full">
      {/* 상품 상세 모달 */}
      {selectedProduct && (
        <ProductDetailModal isOpen={!!selectedProduct} onClose={handleCloseModal} productId={selectedProduct} />
      )}

      {/* 홈으로 돌아가기 버튼 */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white shadow-md hover:bg-gray-100 flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>홈으로</span>
          </Button>
        </Link>
      </div>

      {/* 상단 배너 및 검색 */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center rounded-md">
                  <span className="text-white font-bold text-lg">레버</span>
                </div>
                <h1 className="text-2xl font-bold text-blue-600 ml-2">레버유통</h1>
              </div>
              <p className="text-sm text-gray-500">탁월한 품질, 놀라운 가격</p>
            </div>
          </div>
          <div className="relative w-1/3">
            <Input type="text" placeholder="검색어를 입력해주세요" className="pl-10 pr-4 py-2 border rounded-full" />
            <Button className="absolute right-0 top-0 rounded-full bg-blue-500 hover:bg-blue-600">
              <Search className="h-4 w-4" />
              <span className="ml-1">검색</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Button variant="ghost" className="px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              카테고리
            </Button>
            <Button variant="ghost" className="px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              추천상품
            </Button>
            <Button variant="ghost" className="px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              신속배송
            </Button>
            <Button variant="ghost" className="px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              최저가
            </Button>
            <Button variant="ghost" className="px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              품질우수
            </Button>
            <Button variant="ghost" className="px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              가격분석
            </Button>
          </div>
        </div>
      </div>

      {/* 메인 히어로 섹션 */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="w-1/2 pr-8">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">최저가 농가 소개부터</h2>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                10분만에 끝나는 순쉬운 <span className="text-blue-500">발주·정산</span>
              </h2>
              <p className="text-gray-700 mb-4">
                3,000여곳의 협업농가상품을 최저가로 공급합니다.
                <br />
                믿을 수 있는 농산물을 한번에 해결하세요
              </p>
            </div>
            <div className="w-1/2">
              <div className="rounded-full overflow-hidden w-80 h-80 mx-auto">
                <img src="/placeholder-nr3ja.png" alt="신선한 농산물" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 추천 상품 섹션 */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">레버유통 추천 상품 이에요</h3>
            <Button variant="ghost" className="text-blue-600 flex items-center">
              더보기 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <p className="text-gray-500 mb-6">오늘 뜨는 상품</p>

          <div className="grid grid-cols-4 gap-6">
            {[
              {
                id: "product-1",
                name: "금정농산 감자",
                price: "5,300원 ~ 15,900원",
                image: "potato",
              },
              {
                id: "product-2",
                name: "화양농장 딸기",
                price: "14,700원 ~ 36,800원",
                image: "strawberry",
              },
              {
                id: "product-3",
                name: "경북농장 부사",
                price: "8,600원 ~ 52,500원",
                image: "peach",
              },
              {
                id: "product-4",
                name: "도매B구장 참외",
                price: "5,500원 ~ 51,500원",
                image: "melon",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="aspect-square bg-white">
                  <img
                    src={`/fresh-produce.png?height=240&width=240&query=fresh%20${product.image}%20agricultural%20product%20high%20quality%20photo`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-gray-700 mt-1">{product.price}</p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-full bg-blue-50 text-blue-600 border-blue-200"
                    >
                      품질우수
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-full bg-orange-50 text-orange-600 border-orange-200"
                    >
                      최저가
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-full bg-green-50 text-green-600 border-green-200"
                    >
                      신속배송
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 카테고리별 상품 섹션 */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-transparent border-b w-auto">
                <TabsTrigger
                  value="recommended"
                  className={`px-4 py-2 ${activeTab === "recommended" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                >
                  추천상품
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className={`px-4 py-2 ${activeTab === "new" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                >
                  신상품
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className={`px-4 py-2 ${activeTab === "popular" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                >
                  인기상품
                </TabsTrigger>
                <TabsTrigger
                  value="discount"
                  className={`px-4 py-2 ${activeTab === "discount" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                >
                  할인상품
                </TabsTrigger>
              </TabsList>
              <Button variant="ghost" className="text-blue-600 flex items-center">
                더보기 <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <TabsContent value="recommended" className="mt-0">
              <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleProductClick(`product-${(index % 4) + 1}`)}
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={`/premium-agricultural-product.png?height=180&width=180&query=premium%20agricultural%20product%20${index + 1}%20vegetables%20fruits%20farm%20fresh`}
                        alt={`추천상품 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm">추천 농산물 {index + 1}</h4>
                      <p className="text-gray-700 text-sm mt-1">
                        {(index + 1) * 5000}원 ~ {(index + 2) * 10000}원
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-0">
              <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleProductClick(`product-${(index % 4) + 1}`)}
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={`/seasonal-harvest.png?height=180&width=180&query=new%20seasonal%20agricultural%20product%20${index + 1}%20fresh%20harvest%20organic`}
                        alt={`신상품 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm">신상 농산물 {index + 1}</h4>
                      <p className="text-gray-700 text-sm mt-1">
                        {(index + 1) * 6000}원 ~ {(index + 2) * 12000}원
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleProductClick(`product-${(index % 4) + 1}`)}
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={`/bestselling-farm-product.png?height=180&width=180&query=bestselling%20farm%20product%20${index + 1}%20popular%20korean%20agricultural%20goods`}
                        alt={`인기상품 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm">인기 농산물 {index + 1}</h4>
                      <p className="text-gray-700 text-sm mt-1">
                        {(index + 1) * 7000}원 ~ {(index + 2) * 14000}원
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discount" className="mt-0">
              <div className="grid grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleProductClick(`product-${(index % 4) + 1}`)}
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={`/agricultural-sale-discount.png?height=180&width=180&query=sale%20discount%20agricultural%20product%20${index + 1}%20special%20offer%20farm%20goods`}
                        alt={`할인상품 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm">할인 농산물 {index + 1}</h4>
                      <p className="text-gray-700 text-sm mt-1">
                        <span className="line-through text-gray-400 mr-1">{(index + 2) * 10000}원</span>
                        <span className="text-red-500">{(index + 1) * 8000}원</span>
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 푸터 */}
      <div className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold text-xl mb-2">레버유통</h3>
              <p className="text-gray-400 text-sm">신선한 농수산물 직거래 플랫폼</p>
              <p className="text-gray-400 text-sm mt-4">
                주소: 서울특별시 강남구 테헤란로 123
                <br />
                사업자등록번호: 123-45-67890
                <br />
                전화: 02-1234-5678
                <br />
                이메일: info@lever-distribution.com
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">고객센터</h4>
              <p className="text-xl font-bold">1588-1234</p>
              <p className="text-gray-400 text-sm">
                평일 09:00 - 18:00
                <br />
                점심시간 12:00 - 13:00
                <br />
                토/일/공휴일 휴무
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">© 2025 레버유통. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
