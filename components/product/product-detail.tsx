"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Minus, Plus, ShoppingCart, Truck, Heart, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// 상품 데이터 (실제로는 API에서 가져올 것입니다)
const productData = {
  "product-1": {
    id: "product-1",
    name: "금정농산 감자",
    price: 15900,
    originalPrice: 18000,
    discount: 12,
    rating: 4.8,
    reviewCount: 128,
    description: "신선하고 맛있는 금정농산 감자입니다. 국내산 최고급 품질로 제공됩니다.",
    images: [
      "/fresh-produce.png?height=600&width=600&query=fresh%20potato%20agricultural%20product%20high%20quality%20photo",
      "/fresh-produce.png?height=600&width=600&query=potato%20farm%20harvest%20close%20up",
      "/fresh-produce.png?height=600&width=600&query=potato%20varieties%20display",
    ],
    options: [
      { name: "크기", values: ["소(1kg)", "중(3kg)", "대(5kg)"] },
      { name: "등급", values: ["일반", "특품", "명품"] },
    ],
    seller: "금정농산",
    origin: "국내산",
    shipping: "무료배송",
    deliveryDate: "내일(수) 도착 예정",
    detailContent: `
      <h3>상품 상세 정보</h3>
      <p>금정농산 감자는 해발 400m 이상의 고랭지에서 재배되어 맛과 영양이 뛰어납니다.</p>
      <p>유기농 재배 방식으로 안전하고 건강한 먹거리를 제공합니다.</p>
      <h4>영양성분</h4>
      <ul>
        <li>탄수화물: 17g</li>
        <li>단백질: 2g</li>
        <li>지방: 0.1g</li>
        <li>비타민 C: 19.7mg</li>
      </ul>
    `,
  },
  "product-2": {
    id: "product-2",
    name: "화양농장 딸기",
    price: 36800,
    originalPrice: 42000,
    discount: 12,
    rating: 4.9,
    reviewCount: 256,
    description: "달콤하고 향긋한 화양농장 딸기입니다. 제철 맞아 가장 맛있는 상태로 제공됩니다.",
    images: [
      "/fresh-produce.png?height=600&width=600&query=fresh%20strawberry%20agricultural%20product%20high%20quality%20photo",
      "/fresh-produce.png?height=600&width=600&query=strawberry%20farm%20harvest%20close%20up",
      "/fresh-produce.png?height=600&width=600&query=strawberry%20varieties%20display",
    ],
    options: [
      { name: "크기", values: ["소(500g)", "중(1kg)", "대(2kg)"] },
      { name: "등급", values: ["일반", "특품", "명품"] },
    ],
    seller: "화양농장",
    origin: "국내산",
    shipping: "무료배송",
    deliveryDate: "내일(수) 도착 예정",
    detailContent: `
      <h3>상품 상세 정보</h3>
      <p>화양농장 딸기는 최적의 온도와 습도를 유지하는 스마트팜에서 재배됩니다.</p>
      <p>당도 높고 향이 풍부한 품종으로 선별하여 제공합니다.</p>
      <h4>영양성분</h4>
      <ul>
        <li>탄수화물: 7.7g</li>
        <li>단백질: 0.7g</li>
        <li>지방: 0.3g</li>
        <li>비타민 C: 58.8mg</li>
      </ul>
    `,
  },
  "product-3": {
    id: "product-3",
    name: "경북농장 부사",
    price: 52500,
    originalPrice: 58000,
    discount: 9,
    rating: 4.7,
    reviewCount: 189,
    description: "아삭하고 달콤한 경북농장 부사 사과입니다. 최고 품질의 사과만 엄선하여 제공합니다.",
    images: [
      "/fresh-produce.png?height=600&width=600&query=fresh%20fuji%20apple%20agricultural%20product%20high%20quality%20photo",
      "/fresh-produce.png?height=600&width=600&query=apple%20orchard%20harvest%20close%20up",
      "/fresh-produce.png?height=600&width=600&query=fuji%20apple%20varieties%20display",
    ],
    options: [
      { name: "크기", values: ["중소과(5kg)", "중과(7.5kg)", "대과(10kg)"] },
      { name: "등급", values: ["가정용", "선물용", "프리미엄"] },
    ],
    seller: "경북농장",
    origin: "국내산(경북)",
    shipping: "무료배송",
    deliveryDate: "내일(수) 도착 예정",
    detailContent: `
      <h3>상품 상세 정보</h3>
      <p>경북농장 부사 사과는 경북 지역의 최적의 기후에서 재배되어 당도와 식감이 뛰어납니다.</p>
      <p>친환경 재배 방식으로 안전하고 건강한 사과를 제공합니다.</p>
      <h4>영양성분</h4>
      <ul>
        <li>탄수화물: 14g</li>
        <li>단백질: 0.3g</li>
        <li>지방: 0.2g</li>
        <li>식이섬유: 2.4g</li>
      </ul>
    `,
  },
  "product-4": {
    id: "product-4",
    name: "도매B구장 참외",
    price: 51500,
    originalPrice: 60000,
    discount: 14,
    rating: 4.6,
    reviewCount: 142,
    description: "달콤하고 아삭한 도매B구장 참외입니다. 성주 지역에서 재배된 최고급 참외입니다.",
    images: [
      "/fresh-produce.png?height=600&width=600&query=fresh%20korean%20melon%20agricultural%20product%20high%20quality%20photo",
      "/fresh-produce.png?height=600&width=600&query=korean%20melon%20farm%20harvest%20close%20up",
      "/fresh-produce.png?height=600&width=600&query=korean%20melon%20varieties%20display",
    ],
    options: [
      { name: "크기", values: ["소과(3kg)", "중과(5kg)", "대과(8kg)"] },
      { name: "등급", values: ["일반", "특품", "명품"] },
    ],
    seller: "도매B구장",
    origin: "국내산(성주)",
    shipping: "무료배송",
    deliveryDate: "내일(수) 도착 예정",
    detailContent: `
      <h3>상품 상세 정보</h3>
      <p>도매B구장 참외는 성주 지역의 최적의 토양과 기후에서 재배되어 당도가 매우 높습니다.</p>
      <p>엄격한 품질 관리를 통해 선별된 최상품 참외만 제공합니다.</p>
      <h4>영양성분</h4>
      <ul>
        <li>탄수화물: 8g</li>
        <li>단백질: 0.8g</li>
        <li>지방: 0.1g</li>
        <li>비타민 A: 150IU</li>
      </ul>
    `,
  },
}

export function ProductDetail({ productId }: { productId: string }) {
  const [selectedTab, setSelectedTab] = useState("description")
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [mainImage, setMainImage] = useState(0)

  const [customOptions, setCustomOptions] = useState<Array<{ name: string; values: string[] }>>([])
  const [newOptionName, setNewOptionName] = useState("")
  const [newOptionValue, setNewOptionValue] = useState("")

  // 상품 데이터 가져오기 (실제로는 API 호출)
  const product = productData[productId as keyof typeof productData] || productData["product-3"]

  // 옵션 선택 핸들러
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }))
  }

  // 수량 변경 핸들러
  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  // 가격 계산
  const totalPrice = product.price * quantity

  // 옵션 추가 핸들러 함수를 별도로 정의
  const handleAddOption = () => {
    console.log("버튼 클릭됨!", { newOptionName, newOptionValue })

    if (!newOptionName.trim() || !newOptionValue.trim()) {
      alert("옵션명과 옵션값을 모두 입력해주세요.")
      return
    }

    // 새 옵션 추가
    const newOption = { name: newOptionName, values: [newOptionValue] }
    setCustomOptions((prev) => {
      const updated = [...prev, newOption]
      console.log("업데이트된 옵션들:", updated)
      return updated
    })

    // 입력 필드 초기화
    setNewOptionName("")
    setNewOptionValue("")
  }

  // customOptions 상태 변화 감지
  useEffect(() => {
    console.log("현재 커스텀 옵션들:", customOptions)
  }, [customOptions])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 상단 네비게이션 */}
      <div className="mb-6">
        <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>레버유통 홈으로 돌아가기</span>
        </Link>
      </div>

      {/* 상품 정보 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* 상품 이미지 */}
        <div>
          <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[mainImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer border-2 ${mainImage === index ? "border-blue-500" : "border-transparent"}`}
                onClick={() => setMainImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 상품 정보 및 구매 옵션 */}
        <div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 mr-2">
                {product.seller}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                {product.shipping}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-500 mr-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-500" : "fill-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {product.rating} ({product.reviewCount}개 리뷰)
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 line-through text-sm mr-2">
                  {product.originalPrice.toLocaleString()}원
                </span>
                <Badge className="bg-red-500 text-white">{product.discount}% 할인</Badge>
              </div>
              <div className="text-2xl font-bold text-blue-600">{product.price.toLocaleString()}원</div>
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-medium mb-3">상품구성</h3>
              <div className="space-y-3">
                {/* 테스트 버튼 추가 */}
                <div className="border rounded-md p-3 bg-yellow-50">
                  <Button
                    onClick={() => {
                      console.log("테스트 버튼 클릭됨!")
                      setCustomOptions((prev) => [...prev, { name: "테스트", values: ["5kg"] }])
                    }}
                    className="bg-green-600 hover:bg-green-700 w-full mb-2"
                  >
                    테스트 옵션 추가 (현재 {customOptions.length}개)
                  </Button>
                </div>

                <div className="border rounded-md p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">새 옵션 추가</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Input
                      placeholder="옵션명 (예: 크기)"
                      value={newOptionName}
                      onChange={(e) => {
                        console.log("옵션명 입력:", e.target.value)
                        setNewOptionName(e.target.value)
                      }}
                      className="text-sm"
                    />
                    <Input
                      placeholder="옵션값 (예: 5kg)"
                      value={newOptionValue}
                      onChange={(e) => {
                        console.log("옵션값 입력:", e.target.value)
                        setNewOptionValue(e.target.value)
                      }}
                      className="text-sm"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      console.log("실제 옵션추가 버튼 클릭됨!", { newOptionName, newOptionValue })
                      if (newOptionName.trim() && newOptionValue.trim()) {
                        const newOption = { name: newOptionName, values: [newOptionValue] }
                        setCustomOptions((prev) => {
                          const updated = [...prev, newOption]
                          console.log("옵션 추가됨:", updated)
                          return updated
                        })
                        setNewOptionName("")
                        setNewOptionValue("")
                      } else {
                        console.log("입력값이 비어있음")
                        alert("옵션명과 옵션값을 모두 입력해주세요!")
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    옵션추가 (현재 {customOptions.length}개)
                  </Button>
                </div>

                {/* 현재 상태 표시 */}
                <div className="text-xs text-gray-500 p-2 bg-gray-100 rounded">
                  현재 상태: 옵션명="{newOptionName}", 옵션값="{newOptionValue}", 총 옵션 수={customOptions.length}
                </div>

                {/* 추가된 옵션들 표시 */}
                {customOptions.map((option, index) => (
                  <div key={index} className="border rounded-md p-3 bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        {String(index + 1).padStart(2, "0")} {option.name}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          console.log("삭제 버튼 클릭됨, 인덱스:", index)
                          setCustomOptions((prev) => prev.filter((_, i) => i !== index))
                        }}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        삭제
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {option.values.map((value, valueIndex) => (
                        <Badge key={valueIndex} variant="outline" className="text-xs">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Truck className="h-4 w-4 mr-1" />
              <span>{product.deliveryDate}</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* 옵션 선택 */}
          <div className="space-y-4 mb-6">
            {/* 기본 옵션들 */}
            {product.options.map((option, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{option.name}</label>
                <div className="grid grid-cols-3 gap-2">
                  {option.values.map((value, i) => (
                    <Button
                      key={i}
                      variant={selectedOptions[option.name] === value ? "default" : "outline"}
                      className={selectedOptions[option.name] === value ? "bg-blue-600 text-white" : ""}
                      onClick={() => handleOptionChange(option.name, value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            {/* 커스텀 옵션들 */}
            {customOptions.map((option, index) => (
              <div key={`custom-${index}`}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{option.name}</label>
                <div className="grid grid-cols-3 gap-2">
                  {option.values.map((value, i) => (
                    <Button
                      key={i}
                      variant={selectedOptions[option.name] === value ? "default" : "outline"}
                      className={selectedOptions[option.name] === value ? "bg-blue-600 text-white" : ""}
                      onClick={() => handleOptionChange(option.name, value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            {/* 수량 선택 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">수량</label>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={increaseQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* 총 가격 */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-700">총 상품 금액</span>
            <span className="text-xl font-bold text-blue-600">{totalPrice.toLocaleString()}원</span>
          </div>

          {/* 구매 버튼 */}
          <div className="grid grid-cols-2 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">바로 구매하기</Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">
              <ShoppingCart className="h-4 w-4 mr-2" />
              장바구니
            </Button>
          </div>

          {/* 찜하기, 공유하기 */}
          <div className="flex justify-end mt-4">
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Heart className="h-4 w-4 mr-1" />
              찜하기
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Share2 className="h-4 w-4 mr-1" />
              공유하기
            </Button>
          </div>
        </div>
      </div>

      {/* 상세 정보 탭 */}
      <Card className="mb-10">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="description">상품 상세</TabsTrigger>
            <TabsTrigger value="reviews">상품 리뷰</TabsTrigger>
            <TabsTrigger value="shipping">배송/교환/반품</TabsTrigger>
          </TabsList>
          <CardContent className="pt-6">
            <TabsContent value="description">
              <div dangerouslySetInnerHTML={{ __html: product.detailContent }} />

              {/* 상품 상세 이미지 */}
              <div className="mt-6 space-y-4">
                <img src="/agricultural-product-infographic.png" alt="상품 상세 정보" className="w-full rounded-lg" />
                <img src="/placeholder.svg?height=800&width=1200" alt="수확 과정" className="w-full rounded-lg" />
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">상품 리뷰</h3>
                    <p className="text-gray-600">총 {product.reviewCount}개의 리뷰가 있습니다.</p>
                  </div>
                  <Button>리뷰 작성하기</Button>
                </div>

                {/* 리뷰 목록 */}
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex items-center text-yellow-500 mr-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < 5 - (index % 2) ? "fill-yellow-500" : "fill-gray-200"}`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">구매자{index + 1}</span>
                        </div>
                        <span className="text-gray-500 text-sm">2023.05.{10 + index}</span>
                      </div>
                      <p className="text-gray-700">
                        {index === 0 &&
                          "정말 맛있고 신선해요! 배송도 빠르고 포장도 꼼꼼하게 잘 되어있었습니다. 다음에도 구매할 예정입니다."}
                        {index === 1 &&
                          "품질이 좋고 신선합니다. 가족들이 모두 맛있게 먹었어요. 다만 배송이 하루 늦어서 아쉬웠습니다."}
                        {index === 2 &&
                          "가격 대비 품질이 좋습니다. 크기도 적당하고 맛도 좋아요. 다음에 또 구매하고 싶은 상품입니다."}
                      </p>
                      {index === 0 && (
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          <img
                            src="/placeholder.svg?height=100&width=100"
                            alt="리뷰 이미지 1"
                            className="w-full h-20 object-cover rounded"
                          />
                          <img
                            src="/placeholder.svg?height=100&width=100"
                            alt="리뷰 이미지 2"
                            className="w-full h-20 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold mb-2">배송 안내</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>배송 방법: 택배</li>
                    <li>배송 지역: 전국</li>
                    <li>배송 비용: 무료</li>
                    <li>배송 기간: 오후 2시 이전 주문 시 당일 출고, 익일 도착 예정</li>
                    <li>도서산간 지역은 배송이 1-2일 지연될 수 있습니다.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">교환 및 반품 안내</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>신선식품의 특성상 단순 변심에 의한 교환 및 반품은 불가합니다.</li>
                    <li>상품 하자 또는 오배송의 경우 수령 후 24시간 이내 고객센터로 연락 주시기 바랍니다.</li>
                    <li>상품 불량 사진을 첨부하여 고객센터로 접수해 주셔야 합니다.</li>
                    <li>고객 귀책사유로 인한 교환/반품 시 발생하는 배송비는 고객 부담입니다.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">품질 보증</h3>
                  <p className="text-gray-700">
                    레버유통은 엄격한 품질 관리를 통해 최상의 상품만을 제공합니다. 상품에 문제가 있을 경우 100% 보상
                    또는 환불해 드립니다.
                  </p>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* 추천 상품 */}
      <div>
        <h2 className="text-xl font-bold mb-4">함께 구매하면 좋은 상품</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.values(productData)
            .filter((p) => p.id !== productId)
            .map((relatedProduct) => (
              <Link href={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
                <Card className="overflow-hidden h-full">
                  <div className="aspect-square bg-white">
                    <img
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm">{relatedProduct.name}</h4>
                    <p className="text-gray-700 text-sm mt-1">{relatedProduct.price.toLocaleString()}원</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
