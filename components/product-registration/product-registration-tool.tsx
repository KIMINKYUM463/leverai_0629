"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Plus,
  Trash2,
  Edit,
  Save,
  Eye,
  Download,
} from "lucide-react"

// 상품 타입 정의
type Product = {
  id: string
  name: string
  category: string
  price: number
  description: string
  specifications: { key: string; value: string }[]
  images: string[]
  status: "draft" | "published"
}

export function ProductRegistrationTool() {
  const [productName, setProductName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([
    { key: "원산지", value: "" },
    { key: "중량/용량", value: "" },
    { key: "보관방법", value: "" },
  ])
  const [activeTab, setActiveTab] = useState("register")

  // 상품 설명 생성 함수
  const generateDescription = () => {
    if (!productName) return

    setIsGenerating(true)

    // 실제로는 API 호출이 필요하지만, 여기서는 시뮬레이션
    setTimeout(() => {
      const descriptions = [
        `${productName}은(는) 최고의 품질로 엄선된 제품입니다. 신선함과 맛을 그대로 담아 고객님께 제공합니다. 특별히 선별된 ${productCategory}로, 건강과 맛을 동시에 챙길 수 있습니다. 

산지에서 직접 공수하여 신선도가 뛰어나며, 엄격한 품질 관리를 통해 최상의 상태로 배송됩니다. 

특별한 날에 선물용으로도 좋으며, 일상에서 즐기기에도 완벽한 선택입니다.`,

        `신선함이 가득한 ${productName}을(를) 소개합니다. 엄선된 ${productCategory} 중에서도 최고 품질만을 골라 제공합니다.

자연의 맛과 영양을 그대로 담아낸 이 제품은 건강을 생각하는 분들께 특히 추천드립니다. 

산지 직송으로 더욱 신선하게 배송되며, 철저한 품질 관리로 안심하고 드실 수 있습니다.`,

        `프리미엄 ${productCategory}, ${productName}을(를) 만나보세요. 엄격한 기준으로 선별된 최고급 품질의 제품입니다.

신선함과 맛이 살아있는 이 제품은 특별한 날 선물로도, 일상의 건강한 식탁을 위해서도 완벽한 선택입니다.

100% 국내산으로 안전하게 재배되었으며, 최적의 조건에서 수확하여 영양소와 맛이 풍부합니다.`,
      ]

      setGeneratedDescription(descriptions[Math.floor(Math.random() * descriptions.length)])
      setIsGenerating(false)
    }, 1500)
  }

  // 상품 등록 함수
  const registerProduct = () => {
    if (!productName || !productCategory || !productPrice) return

    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: productName,
      category: productCategory,
      price: Number.parseInt(productPrice),
      description: productDescription || generatedDescription,
      specifications: specifications.filter((spec) => spec.value),
      images: ["/diverse-products-still-life.png"],
      status: "draft",
    }

    setProducts([newProduct, ...products])

    // 폼 초기화
    setProductName("")
    setProductCategory("")
    setProductPrice("")
    setProductDescription("")
    setGeneratedDescription("")
    setSpecifications([
      { key: "원산지", value: "" },
      { key: "중량/용량", value: "" },
      { key: "보관방법", value: "" },
    ])
  }

  // 스펙 업데이트 함수
  const updateSpecification = (index: number, key: string, value: string) => {
    const newSpecs = [...specifications]
    newSpecs[index] = { key, value }
    setSpecifications(newSpecs)
  }

  // 스펙 추가 함수
  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }])
  }

  // 스펙 삭제 함수
  const removeSpecification = (index: number) => {
    const newSpecs = [...specifications]
    newSpecs.splice(index, 1)
    setSpecifications(newSpecs)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 상품등록 도우미</h2>
        <p className="text-muted-foreground">AI를 활용하여 상품 정보를 빠르고 효과적으로 등록하세요.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="register">상품 등록</TabsTrigger>
          <TabsTrigger value="list">상품 목록</TabsTrigger>
          <TabsTrigger value="bulk">대량 등록</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>상품 정보 입력</CardTitle>
              <CardDescription>상품의 기본 정보를 입력하세요. AI가 상세 정보 작성을 도와드립니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="product-name" className="text-sm font-medium">
                      상품명 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="product-name"
                      placeholder="예: 제주 감귤 5kg 선물세트"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="product-category" className="text-sm font-medium">
                      카테고리 <span className="text-red-500">*</span>
                    </label>
                    <Select value={productCategory} onValueChange={setProductCategory}>
                      <SelectTrigger id="product-category">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="과일">과일</SelectItem>
                        <SelectItem value="채소">채소</SelectItem>
                        <SelectItem value="수산물">수산물</SelectItem>
                        <SelectItem value="곡물">곡물</SelectItem>
                        <SelectItem value="가공식품">가공식품</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="product-price" className="text-sm font-medium">
                      판매가격 (원) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="product-price"
                      type="number"
                      placeholder="예: 25000"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="product-images" className="text-sm font-medium">
                        상품 이미지
                      </label>
                      <span className="text-xs text-gray-500">최대 5개</span>
                    </div>
                    <div className="border border-dashed rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">이미지를 드래그하거나 클릭하여 업로드</p>
                      <Button variant="outline" size="sm">
                        파일 선택
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="product-description" className="text-sm font-medium">
                        상품 설명
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateDescription}
                        disabled={isGenerating || !productName}
                        className="h-7 text-xs"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            생성 중...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI로 작성하기
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea
                      id="product-description"
                      placeholder="상품에 대한 상세 설명을 입력하세요. AI 작성 버튼을 클릭하면 자동으로 생성됩니다."
                      rows={6}
                      value={productDescription || generatedDescription}
                      onChange={(e) => {
                        setProductDescription(e.target.value)
                        setGeneratedDescription("")
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">상품 스펙</label>
                    <div className="space-y-2">
                      {specifications.map((spec, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="항목명"
                            value={spec.key}
                            onChange={(e) => updateSpecification(index, e.target.value, spec.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder="내용"
                            value={spec.value}
                            onChange={(e) => updateSpecification(index, spec.key, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSpecification(index)}
                            className="h-10 w-10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={addSpecification} className="w-full">
                        <Plus className="h-4 w-4 mr-1" />
                        항목 추가
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-2">
                <Button variant="outline">임시 저장</Button>
                <Button onClick={registerProduct} disabled={!productName || !productCategory || !productPrice}>
                  상품 등록
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>등록된 상품 목록</CardTitle>
              <CardDescription>등록된 상품을 관리하고 수정할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              {products.length > 0 ? (
                <div className="space-y-4">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="flex">
                        <div className="w-32 h-32 bg-gray-100 flex-shrink-0">
                          {product.images.length > 0 && (
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                            <Badge variant={product.status === "published" ? "default" : "outline"}>
                              {product.status === "published" ? "판매중" : "임시저장"}
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">₩{product.price.toLocaleString()}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              수정
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              미리보기
                            </Button>
                            <Button size="sm">
                              <Save className="h-4 w-4 mr-1" />
                              판매 시작
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">등록된 상품이 없습니다.</p>
                  <p className="text-sm text-gray-400 mt-1">상품을 등록하면 이곳에 표시됩니다.</p>
                  <Button className="mt-4" onClick={() => setActiveTab("register")}>
                    상품 등록하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>대량 상품 등록</CardTitle>
              <CardDescription>엑셀 파일을 업로드하여 여러 상품을 한 번에 등록하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border border-dashed rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">엑셀 파일을 드래그하거나 클릭하여 업로드</p>
                  <p className="text-sm text-gray-500 mb-4">지원 형식: .xlsx, .csv</p>
                  <Button>파일 선택</Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h3 className="font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                    대량 등록 가이드
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <a href="#" className="text-blue-600 hover:underline">
                          템플릿 파일
                        </a>
                        을 다운로드하여 형식에 맞게 작성하세요.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>필수 항목: 상품명, 카테고리, 가격, 재고 수량</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>이미지는 URL 형식으로 입력하거나, 별도 압축 파일로 업로드하세요.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>상품 설명은 AI가 자동으로 생성할 수 있습니다. 설명 열을 비워두세요.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="ai-description" className="rounded" />
                  <label htmlFor="ai-description" className="text-sm">
                    AI를 사용하여 상품 설명 자동 생성
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    템플릿 다운로드
                  </Button>
                  <Button disabled>
                    <Upload className="h-4 w-4 mr-1" />
                    대량 등록하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
