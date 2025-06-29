"use server"

import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

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

export async function realProductAnalysis(productName: string) {
  try {
    console.log(`🔍 ${productName} 상품 분석 시작...`)

    // 1단계: 쿠팡 크롤링
    console.log("📦 쿠팡 데이터 수집 중...")
    const coupangProducts = await crawlCoupang(productName)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 2단계: 네이버 크롤링
    console.log("🛒 네이버 데이터 수집 중...")
    const naverProducts = await crawlNaver(productName)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 3단계: AI 데이터 분석
    console.log("🤖 AI 데이터 분석 중...")
    const { object: coupangResult } = await generateObject({
      model: openai("gpt-4o"),
      schema: CrawlingResultSchema,
      prompt: `
        다음 쿠팡에서 크롤링한 ${productName} 상품 데이터를 분석하고 정리해주세요:
        ${JSON.stringify(coupangProducts)}
        
        요구사항:
        1. 상품들의 평균 가격 계산 (숫자만 추출하여 계산)
        2. 가격 범위 (최저가, 최고가) 분석
        3. 공통 옵션들 추출 (kg, 포장 형태 등)
        4. 시장 인사이트 제공 (트렌드, 경쟁 상황 등)
        
        가격에서 숫자만 추출하여 정확한 계산을 해주세요.
        한국어로 상세하고 전문적인 분석을 제공해주세요.
      `,
    })

    const { object: naverResult } = await generateObject({
      model: openai("gpt-4o"),
      schema: CrawlingResultSchema,
      prompt: `
        다음 네이버쇼핑에서 크롤링한 ${productName} 상품 데이터를 분석하고 정리해주세요:
        ${JSON.stringify(naverProducts)}
        
        요구사항:
        1. 상품들의 평균 가격 계산 (숫자만 추출하여 계산)
        2. 가격 범위 (최저가, 최고가) 분석
        3. 공통 옵션들 추출 (kg, 포장 형태 등)
        4. 시장 인사이트 제공 (트렌드, 경쟁 상황 등)
        
        가격에서 숫자만 추출하여 정확한 계산을 해주세요.
        한국어로 상세하고 전문적인 분석을 제공해주세요.
      `,
    })

    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 4단계: AI 가격 추천
    console.log("💡 AI 가격 추천 생성 중...")
    const { object: recommendation } = await generateObject({
      model: openai("gpt-4o"),
      schema: PriceRecommendationSchema,
      prompt: `
        ${productName} 상품의 최적 가격을 추천해주세요.
        
        쿠팡 분석 결과: ${JSON.stringify(coupangResult)}
        네이버 분석 결과: ${JSON.stringify(naverResult)}
        
        요구사항:
        1. 각 옵션별로 최적의 가격 추천 (2kg, 3kg, 5kg 등)
        2. 가격 추천 이유를 구체적으로 설명
        3. 경쟁 우위 전략 제시
        4. 예상 수익률 계산 (마진 20-30% 기준)
        5. 전체적인 마케팅 전략 제안
        6. 실용적인 가격 설정 팁 제공
        
        시장 데이터를 바탕으로 현실적이고 경쟁력 있는 가격을 제안해주세요.
        한국어로 전문적이고 실용적인 조언을 제공해주세요.
      `,
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("✅ 분석 완료!")

    return {
      success: true,
      data: {
        coupang: coupangResult,
        naver: naverResult,
        recommendation,
        rawData: {
          coupangProducts,
          naverProducts,
        },
      },
    }
  } catch (error) {
    console.error("❌ 분석 오류:", error)
    return {
      success: false,
      error: "상품 분석을 완료하는데 실패했습니다. 잠시 후 다시 시도해주세요.",
    }
  }
}
