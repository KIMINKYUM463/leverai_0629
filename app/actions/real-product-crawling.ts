"use server"
import { z } from "zod"
import { crawlingConfig } from "@/lib/crawling-config"

interface ProductData {
  title: string
  price: string
  originalPrice?: string
  discount?: string
  rating?: string
  reviewCount?: string
  seller?: string
  delivery?: string
  url: string
  imageUrl?: string
}

const ProductSchema = z.object({
  title: z.string(),
  price: z.string(),
  originalPrice: z.string().optional(),
  discount: z.string().optional(),
  rating: z.string().optional(),
  reviewCount: z.string().optional(),
  options: z
    .array(
      z.object({
        name: z.string(),
        price: z.string(),
      }),
    )
    .optional(),
  seller: z.string().optional(),
  delivery: z.string().optional(),
  url: z.string(),
  imageUrl: z.string().optional(),
})

const CrawlingResultSchema = z.object({
  products: z.array(ProductSchema),
  summary: z.object({
    averagePrice: z.number(),
    priceRange: z.object({
      min: z.number(),
      max: z.number(),
    }),
    commonOptions: z.array(z.string()),
    marketInsights: z.string(),
  }),
})

const PriceRecommendationSchema = z.object({
  recommendedPrices: z.array(
    z.object({
      option: z.string(),
      recommendedPrice: z.number(),
      reasoning: z.string(),
      competitiveAdvantage: z.string(),
      profitMargin: z.string(),
    }),
  ),
  marketStrategy: z.string(),
  pricingTips: z.array(z.string()),
})

async function crawlCoupang(productName: string): Promise<ProductData[]> {
  // 현재 환경에서는 모의 데이터 반환
  return [
    {
      title: `${productName} 프리미엄 5kg 산지직송`,
      price: "25,000원",
      originalPrice: "30,000원",
      discount: "17%",
      rating: "4.5",
      reviewCount: "1,234",
      seller: "쿠팡",
      delivery: "무료배송",
      url: "https://www.coupang.com/vp/products/1234567890",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      title: `국산 ${productName} 특품 3kg 당일배송`,
      price: "18,500원",
      originalPrice: "22,000원",
      discount: "16%",
      rating: "4.3",
      reviewCount: "856",
      seller: "쿠팡",
      delivery: "무료배송",
      url: "https://www.coupang.com/vp/products/1234567891",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      title: `${productName} 가정용 2kg 신선보장`,
      price: "12,900원",
      rating: "4.1",
      reviewCount: "432",
      seller: "쿠팡",
      delivery: "2,500원",
      url: "https://www.coupang.com/vp/products/1234567892",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      title: `유기농 ${productName} 4kg 친환경`,
      price: "32,000원",
      originalPrice: "38,000원",
      discount: "16%",
      rating: "4.7",
      reviewCount: "2,156",
      seller: "쿠팡",
      delivery: "무료배송",
      url: "https://www.coupang.com/vp/products/1234567893",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      title: `${productName} 선물세트 6kg 고급포장`,
      price: "45,000원",
      originalPrice: "55,000원",
      discount: "18%",
      rating: "4.6",
      reviewCount: "987",
      seller: "쿠팡",
      delivery: "무료배송",
      url: "https://www.coupang.com/vp/products/1234567894",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
  ]
}

async function crawlNaver(productName: string): Promise<ProductData[]> {
  // 현재 환경에서는 모의 데이터 반환
  return [
    {
      title: `${productName} 농장직송 5kg 햇과일`,
      price: "24,000원",
      originalPrice: "28,000원",
      discount: "14%",
      rating: "4.4",
      reviewCount: "1,567",
      seller: "네이버쇼핑",
      delivery: "무료배송",
      url: "https://shopping.naver.com/products/1234567890",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      title: `프리미엄 ${productName} 3kg 당도보장`,
      price: "19,800원",
      originalPrice: "23,000원",
      discount: "14%",
      rating: "4.2",
      reviewCount: "743",
      seller: "네이버쇼핑",
      delivery: "무료배송",
      url: "https://shopping.naver.com/products/1234567891",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      title: `${productName} 소포장 2kg 가정용`,
      price: "13,500원",
      rating: "4.0",
      reviewCount: "321",
      seller: "네이버쇼핑",
      delivery: "3,000원",
      url: "https://shopping.naver.com/products/1234567892",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      title: `무농약 ${productName} 4kg 안전먹거리`,
      price: "35,000원",
      originalPrice: "42,000원",
      discount: "17%",
      rating: "4.8",
      reviewCount: "1,890",
      seller: "네이버쇼핑",
      delivery: "무료배송",
      url: "https://shopping.naver.com/products/1234567893",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
    {
      title: `${productName} 대용량 10kg 업소용`,
      price: "78,000원",
      originalPrice: "95,000원",
      discount: "18%",
      rating: "4.5",
      reviewCount: "654",
      seller: "네이버쇼핑",
      delivery: "무료배송",
      url: "https://shopping.naver.com/products/1234567894",
      imageUrl: "/placeholder.svg?height=200&width=200",
    },
  ]
}

export async function realProductAnalysis(url: string) {
  try {
    // Simulate product crawling with the config
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock response based on URL analysis
    const mockData = {
      title: "샘플 상품명",
      price: "29,900원",
      rating: 4.5,
      reviewCount: 128,
      description: "고품질 농산물 상품입니다.",
      images: ["/placeholder.svg?height=300&width=300"],
      seller: "농장직송",
      category: "농산물",
      availability: "재고 있음",
    }

    return {
      success: true,
      data: mockData,
      config: crawlingConfig.selectors,
    }
  } catch (error) {
    console.error("Product crawling error:", error)
    return {
      success: false,
      error: "상품 정보를 가져오는데 실패했습니다.",
    }
  }
}
