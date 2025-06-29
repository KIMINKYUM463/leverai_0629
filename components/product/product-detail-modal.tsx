"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Heart, Minus, Plus, Share2, ShoppingCart, Truck } from "lucide-react"
import { CheckoutModal } from "./checkout-modal"

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
}

export function ProductDetailModal({ isOpen, onClose, productId }: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState("standard")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // 상품 데이터 (실제로는 API에서 가져올 수 있음)
  const productData = {
    "product-1": {
      name: "금정농산 감자",
      price: 15900,
      discountPrice: 12900,
      rating: 4.8,
      reviewCount: 128,
      seller: "금정농산",
      images: [
        "/fresh-produce.png?height=500&width=500&query=fresh%20potato%20agricultural%20product%20high%20quality%20photo",
        "/fresh-produce.png?height=500&width=500&query=fresh%20potato%20close%20up%20high%20quality%20photo",
        "/fresh-produce.png?height=500&width=500&query=potato%20farm%20harvest%20high%20quality%20photo",
      ],
      options: [
        { id: "standard", name: "일반", price: 0 },
        { id: "premium", name: "프리미엄", price: 3000 },
        { id: "organic", name: "유기농", price: 5000 },
      ],
      description:
        "금정농산에서 직접 재배한 신선한 감자입니다. 껍질이 얇고 식감이 부드러워 다양한 요리에 활용하기 좋습니다.",
    },
    "product-2": {
      name: "화양농장 딸기",
      price: 36800,
      discountPrice: 32800,
      rating: 4.9,
      reviewCount: 256,
      seller: "화양농장",
      images: [
        "/fresh-produce.png?height=500&width=500&query=fresh%20strawberry%20agricultural%20product%20high%20quality%20photo",
        "/fresh-produce.png?height=500&width=500&query=fresh%20strawberry%20close%20up%20high%20quality%20photo",
        "/fresh-produce.png?height=500&width=500&query=strawberry%20farm%20harvest%20high%20quality%20photo",
      ],
      options: [
        { id: "standard", name: "일반", price: 0 },
        { id: "premium", name: "프리미엄", price: 4000 },
        { id: "organic", name: "유기농", price: 7000 },
      ],
      description: "화양농장에서 정성껏 재배한 달콤한 딸기입니다. 과즙이 풍부하고 향이 좋아 생과일로 드시기 좋습니다.",
    },
    "product-3": {
      name: "경북농장 부사",
      price: 52500,
      discountPrice: 45000,
      rating: 4.7,
      reviewCount: 189,
      seller: "경북농장",
      images: [
        "/fresh-produce.png?height=500&width=500&query=fresh%20fuji%20apple%20agricultural%20product%20high%20quality%20photo",
        "/fresh-produce.png?height=500&width=500&query=fresh%20fuji%20apple%20close%20up%20high%20quality%20photo",
        "/fresh-produce.png?height=500&width=500&query=apple%20orchard%20harvest%20high%20quality%20photo",
      ],
      options: [
        { id: "standard", name: "일반", price: 0 },
        { id: "premium", name: "프리미엄", price: 5000 },
        { id: "gift", name: "선물용", price: 10000 },
      ],
      description: "경북 지역에서 재배된 최고급 부사 사과입니다. 아삭한 식감과 풍부한 과즙, 적당한 단맛이 특징입니다.",
    },
    "product-4": {
      name: "도매B구장 참외",
      price: 51500,
      discountPrice: 42000,
      rating: 4.6,
      reviewCount: 142,
      seller: "도매B구장",
      images: [
        "/fresh-produce.png?height=500&width=500&query=fresh%20korean%20melon%20agricultural%20product%20high%20quality%20photo",
        "/fresh-produce.png?height=500&width=500&query=fresh%20korean%20melon%20close%20up%20high%20quality%20photo",
        "/fresh-produce.png?height=500&width=500&query=korean%20melon%20farm%20harvest%20high%20quality%20photo",
      ],
      options: [
        { id: "standard", name: "일반", price: 0 },
        { id: "premium", name: "프리미엄", price: 4500 },
        { id: "organic", name: "유기농", price: 8000 },
      ],
      description: "성주 지역에서 재배된 달콤한 참외입니다. 당도가 높고 향이 좋아 여름철 간식으로 인기가 많습니다.",
    },
  }

  const product = productData[productId as keyof typeof productData]

  if (!product) {
    return null
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const selectedOptionData = product.options.find((option) => option.id === selectedOption)
  const totalPrice = (product.discountPrice + (selectedOptionData?.price || 0)) * quantity

  const handleBuyNow = () => {
    setIsCheckoutOpen(true)
  }

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false)
    onClose() // 결제 완료 후 상품 상세 모달도 닫기
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 상품 이미지 */}
              <div>
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.images.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 상품 정보 */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">{product.name}</h2>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-500">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">판매자: {product.seller}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <span className="text-lg text-gray-500 line-through">{product.price.toLocaleString()}원</span>
                    <span className="ml-2 text-2xl font-bold text-red-600">
                      {product.discountPrice.toLocaleString()}원
                    </span>
                    <span className="ml-2 text-sm text-red-600">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% 할인
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Truck className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600">무료배송</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">오늘 주문시 내일 도착</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">옵션 선택</h3>
                  <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-2">
                    {product.options.map((option) => (
                      <div key={option.id} className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="ml-2">
                            {option.name}
                          </Label>
                        </div>
                        <span className="font-medium">
                          {option.price > 0 ? `+${option.price.toLocaleString()}원` : "기본가"}
                        </span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">수량</h3>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                      className="w-16 mx-2 text-center"
                      min="1"
                    />
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">총 상품 금액</span>
                    <span className="text-xl font-bold">{totalPrice.toLocaleString()}원</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleBuyNow}>
                    바로 구매하기
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    장바구니
                  </Button>
                </div>

                <div className="flex items-center justify-center mt-4 space-x-4">
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

            {/* 상품 상세 정보 탭 */}
            <div className="mt-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="details">상품 상세정보</TabsTrigger>
                  <TabsTrigger value="reviews">상품평 ({product.reviewCount})</TabsTrigger>
                  <TabsTrigger value="shipping">배송/교환/반품 안내</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-4">상품 설명</h3>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src="/agricultural-product-infographic.png?height=800&width=1200&query=agricultural%20product%20infographic%20for%20${product.name}"
                        alt="상품 상세 정보"
                        className="w-full"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-4">상품평</h3>
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="border-b pb-4">
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < 4 + (index % 2) ? "text-yellow-400" : "text-gray-300"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="ml-2 text-sm font-medium">구매자{index + 1}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className="text-sm text-gray-500">2023.05.{10 + index}</span>
                          </div>
                          <p className="text-gray-700">
                            {index === 0
                              ? `상품이 정말 신선하고 맛있어요! 배송도 빠르고 포장도 꼼꼼하게 잘 되어있었습니다. 다음에도 구매할 예정입니다.`
                              : index === 1
                                ? `품질이 좋고 가격도 합리적이에요. 가족들이 모두 만족하고 있습니다. 다만 배송이 조금 지연된 점이 아쉬웠어요.`
                                : `신선도가 정말 좋습니다. 오래 보관해도 싱싱함이 유지되어서 좋아요. 다음에 또 구매할게요!`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="mt-4">
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-4">배송 안내</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>배송 방법: 택배</li>
                      <li>배송 지역: 전국</li>
                      <li>배송 비용: 무료</li>
                      <li>배송 기간: 오후 2시 이전 주문 시 당일 출고, 익일 도착 (주말, 공휴일 제외)</li>
                    </ul>

                    <h3 className="text-lg font-bold mt-6 mb-4">교환 및 반품 안내</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>신선식품의 특성상 단순 변심에 의한 교환 및 반품은 불가합니다.</li>
                      <li>상품 하자 또는 오배송의 경우 수령 후 24시간 이내 고객센터로 연락 주시기 바랍니다.</li>
                      <li>상품 이미지와 실제 상품의 색상이나 크기는 차이가 있을 수 있습니다.</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 결제 모달 */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={handleCheckoutClose}
          productName={product.name}
          totalPrice={totalPrice}
          quantity={quantity}
          selectedOption={product.options.find((option) => option.id === selectedOption)?.name || ""}
        />
      )}
    </>
  )
}
