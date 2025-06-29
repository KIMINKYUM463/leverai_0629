import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowRight, Calendar } from "lucide-react"

const products = [
  {
    id: 1,
    name: "제철 딸기",
    description: "당도 높은 국내산 딸기, 최근 3개월 판매량 상위 10%",
    price: "15,000원~25,000원",
    season: "1월-5월",
    tags: ["제철", "인기", "선물용"],
    trend: "상승",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "유기농 감자",
    description: "무농약 인증 강원도 감자, 최근 주문량 20% 증가",
    price: "8,000원~15,000원",
    season: "연중",
    tags: ["유기농", "건강", "주식"],
    trend: "상승",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "제주 감귤",
    description: "제주 직송 노지 감귤, 명절 선물세트 인기 상품",
    price: "20,000원~35,000원",
    season: "11월-2월",
    tags: ["제철", "선물용", "인기"],
    trend: "상승",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "국내산 양파",
    description: "국내산 햇양파, B2B 대량 주문 증가 추세",
    price: "12,000원~18,000원",
    season: "연중",
    tags: ["필수", "대량구매", "저장성"],
    trend: "유지",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "완도 전복",
    description: "완도산 활전복, 프리미엄 선물세트로 인기",
    price: "45,000원~80,000원",
    season: "연중",
    tags: ["프리미엄", "선물용", "수산물"],
    trend: "상승",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "국내산 표고버섯",
    description: "국내산 생표고버섯, 건강식품 수요 증가",
    price: "10,000원~18,000원",
    season: "연중",
    tags: ["건강", "요리용", "인기"],
    trend: "상승",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function ProductSuggestions() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-card-hover transition-all">
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="h-16 w-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <Badge
                    variant="outline"
                    className={`mt-1 ${
                      product.trend === "상승"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.trend === "상승" ? <TrendingUp className="h-3 w-3 mr-1" /> : null}
                    {product.trend === "상승" ? "상승 추세" : "안정적"}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.tags.map((tag) => (
                <span key={tag} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between text-sm mb-4 text-gray-500">
              <span className="flex items-center gap-1">
                <span className="font-medium text-gray-700">가격:</span> {product.price}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {product.season}
              </span>
            </div>
            <Button variant="outline" size="sm" className="w-full group">
              상세 정보
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
