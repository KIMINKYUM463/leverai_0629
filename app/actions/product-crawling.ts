"use server"

import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

// 크롤링 결과 스키마
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

// 모의 크롤링 데이터
const getMockCrawlingData = (productName: string, platform: "coupang" | "naver") => {
  const baseProducts = [
    {
      title: `${productName} 프리미엄 5kg`,
      price: "25,000원",
      originalPrice: "30,000원",
      discount: "17%",
      rating: "4.5",
      reviewCount: "1,234",
      options: [
        { name: "3kg", price: "18,000원" },
        { name: "5kg", price: "25,000원" },
        { name: "10kg", price: "45,000원" },
      ],
      seller: platform === "coupang" ? "쿠팡" : "네이버쇼핑",
      delivery: "무료배송",
      url: `https://${platform}.com/product/1`,
    },
    {
      title: `국산 ${productName} 특품 3kg`,
      price: "18,500원",
      originalPrice: "22,000원",
      discount: "16%",
      rating: "4.3",
      reviewCount: "856",
      options: [
        { name: "3kg", price: "18,500원" },
        { name: "5kg", price: "28,000원" },
      ],
      seller: platform === "coupang" ? "쿠팡" : "네이버쇼핑",
      delivery: "무료배송",
      url: `https://${platform}.com/product/2`,
    },
    {
      title: `${productName} 가정용 2kg`,
      price: "12,900원",
      rating: "4.1",
      reviewCount: "432",
      options: [
        { name: "2kg", price: "12,900원" },
        { name: "4kg", price: "23,800원" },
      ],
      seller: platform === "coupang" ? "쿠팡" : "네이버쇼핑",
      delivery: "2,500원",
      url: `https://${platform}.com/product/3`,
    },
  ]

  // 10개까지 확장
  const products = []
  for (let i = 0; i < 10; i++) {
    const baseProduct = baseProducts[i % baseProducts.length]
    products.push({
      ...baseProduct,
      title: `${baseProduct.title} ${i + 1}`,
      url: `https://${platform}.com/product/${i + 1}`,
    })
  }

  return products
}

// AI 가격 추천 스키마
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

export async function analyzeProductPricing(productName: string) {
  try {
    // 단계별 지연을 위한 함수
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    // 1단계: 쿠팡 크롤링 시뮬레이션
    await delay(2000)
    const coupangData = getMockCrawlingData(productName, "coupang")

    // 2단계: 네이버 크롤링 시뮬레이션
    await delay(2000)
    const naverData = getMockCrawlingData(productName, "naver")

    // 3단계: AI 데이터 분석
    await delay(1500)
    const { object: coupangResult } = await generateObject({
      model: openai("gpt-4o"),
      schema: CrawlingResultSchema,
      prompt: `
        다음 쿠팡에서 크롤링한 ${productName} 상품 데이터를 분석하고 정리해주세요:
        ${JSON.stringify(coupangData)}
        
        요구사항:
        1. 상품들의 평균 가격 계산
        2. 가격 범위 (최저가, 최고가) 분석
        3. 공통 옵션들 추출
        4. 시장 인사이트 제공
      `,
    })

    const { object: naverResult } = await generateObject({
      model: openai("gpt-4o"),
      schema: CrawlingResultSchema,
      prompt: `
        다음 네이버쇼핑에서 크롤링한 ${productName} 상품 데이터를 분석하고 정리해주세요:
        ${JSON.stringify(naverData)}
        
        요구사항:
        1. 상품들의 평균 가격 계산
        2. 가격 범위 (최저가, 최고가) 분석
        3. 공통 옵션들 추출
        4. 시장 인사이트 제공
      `,
    })

    // 4단계: AI 가격 추천
    await delay(2000)
    const { object: recommendation } = await generateObject({
      model: openai("gpt-4o"),
      schema: PriceRecommendationSchema,
      prompt: `
        ${productName} 상품의 가격을 추천해주세요.
        
        쿠팡 데이터: ${JSON.stringify(coupangResult)}
        네이버 데이터: ${JSON.stringify(naverResult)}
        
        요구사항:
        1. 각 옵션별로 최적의 가격 추천
        2. 가격 추천 이유 설명
        3. 경쟁 우위 전략 제시
        4. 예상 수익률 계산
        5. 전체적인 마케팅 전략 제안
        6. 가격 설정 팁 제공
        
        한국어로 답변해주세요.
      `,
    })

    return {
      success: true,
      data: {
        coupang: coupangResult,
        naver: naverResult,
        recommendation,
      },
    }
  } catch (error) {
    console.error("분석 오류:", error)
    return {
      success: false,
      error: "상품 분석을 완료하는데 실패했습니다.",
    }
  }
}
