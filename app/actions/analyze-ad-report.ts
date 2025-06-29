"use server"

import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

// 분석 결과 스키마
const AnalysisResultSchema = z.object({
  summary: z.object({
    totalSpend: z.number(),
    totalImpressions: z.number(),
    totalClicks: z.number(),
    averageCPC: z.number(),
    averageCTR: z.number(),
    totalKeywords: z.number(),
  }),
  highCPCKeywords: z.array(
    z.object({
      keyword: z.string(),
      cpc: z.number(),
      spend: z.number(),
      clicks: z.number(),
      impressions: z.number(),
      ctr: z.number(),
      searchVolume: z.number(),
      trend: z.enum(["up", "down", "stable"]),
    }),
  ),
  lowImpressionKeywords: z.array(
    z.object({
      keyword: z.string(),
      impressions: z.number(),
      cpc: z.number(),
      spend: z.number(),
      clicks: z.number(),
      ctr: z.number(),
      searchVolume: z.number(),
      trend: z.enum(["up", "down", "stable"]),
    }),
  ),
  keywordInsights: z.array(
    z.object({
      keyword: z.string(),
      issue: z.string(),
      recommendation: z.string(),
      priority: z.enum(["high", "medium", "low"]),
      potentialSavings: z.number().optional(),
      potentialIncrease: z.number().optional(),
    }),
  ),
  performanceMetrics: z.object({
    topPerformers: z.array(
      z.object({
        keyword: z.string(),
        metric: z.string(),
        value: z.number(),
        change: z.number(),
      }),
    ),
    underPerformers: z.array(
      z.object({
        keyword: z.string(),
        metric: z.string(),
        value: z.number(),
        change: z.number(),
      }),
    ),
  }),
})

// 모의 엑셀 데이터 파싱 함수
function parseExcelData(file: File) {
  // 실제 환경에서는 xlsx 라이브러리를 사용하여 파싱
  // 현재는 모의 데이터 반환
  return {
    keywords: [
      {
        keyword: "무선이어폰",
        impressions: 15420,
        clicks: 234,
        spend: 45600,
        cpc: 195,
        ctr: 1.52,
      },
      {
        keyword: "블루투스 이어폰",
        impressions: 8930,
        clicks: 156,
        spend: 62400,
        cpc: 400,
        ctr: 1.75,
      },
      {
        keyword: "노이즈캔슬링 이어폰",
        impressions: 3240,
        clicks: 89,
        spend: 71200,
        cpc: 800,
        ctr: 2.75,
      },
      {
        keyword: "애플 에어팟",
        impressions: 25600,
        clicks: 445,
        spend: 89000,
        cpc: 200,
        ctr: 1.74,
      },
      {
        keyword: "삼성 갤럭시 버즈",
        impressions: 1200,
        clicks: 23,
        spend: 18400,
        cpc: 800,
        ctr: 1.92,
      },
      {
        keyword: "소니 이어폰",
        impressions: 890,
        clicks: 12,
        spend: 9600,
        cpc: 800,
        ctr: 1.35,
      },
      {
        keyword: "보스 이어폰",
        impressions: 2340,
        clicks: 67,
        spend: 53600,
        cpc: 800,
        ctr: 2.86,
      },
      {
        keyword: "젠하이저 이어폰",
        impressions: 560,
        clicks: 8,
        spend: 6400,
        cpc: 800,
        ctr: 1.43,
      },
    ],
  }
}

// 검색량 데이터 모의 생성
function getSearchVolumeData(keyword: string) {
  const baseVolumes: Record<string, number> = {
    무선이어폰: 45000,
    "블루투스 이어폰": 32000,
    "노이즈캔슬링 이어폰": 18000,
    "애플 에어팟": 67000,
    "삼성 갤럭시 버즈": 25000,
    "소니 이어폰": 12000,
    "보스 이어폰": 8500,
    "젠하이저 이어폰": 3200,
  }

  return baseVolumes[keyword] || Math.floor(Math.random() * 20000) + 1000
}

// 트렌드 데이터 모의 생성
function getTrendData(keyword: string): "up" | "down" | "stable" {
  const trends: Record<string, "up" | "down" | "stable"> = {
    무선이어폰: "up",
    "블루투스 이어폰": "stable",
    "노이즈캔슬링 이어폰": "up",
    "애플 에어팟": "down",
    "삼성 갤럭시 버즈": "up",
    "소니 이어폰": "stable",
    "보스 이어폰": "down",
    "젠하이저 이어폰": "stable",
  }

  return trends[keyword] || "stable"
}

export async function analyzeAdReport(file: File) {
  try {
    console.log("📊 광고 보고서 분석 시작...")

    // 1. 파일 데이터 파싱
    const parsedData = parseExcelData(file)
    console.log("✅ 파일 파싱 완료")

    // 2. 기본 통계 계산
    const totalSpend = parsedData.keywords.reduce((sum, k) => sum + k.spend, 0)
    const totalImpressions = parsedData.keywords.reduce((sum, k) => sum + k.impressions, 0)
    const totalClicks = parsedData.keywords.reduce((sum, k) => sum + k.clicks, 0)
    const averageCPC = totalSpend / totalClicks
    const averageCTR = (totalClicks / totalImpressions) * 100

    // 3. AI 분석 실행
    console.log("🤖 AI 분석 실행 중...")

    const { object: analysisResult } = await generateObject({
      model: openai("gpt-4o"),
      schema: AnalysisResultSchema,
      prompt: `
        다음 쿠팡 광고 데이터를 분석하여 상세한 인사이트를 제공해주세요:
        
        원본 데이터: ${JSON.stringify(parsedData.keywords)}
        
        각 키워드에 대해 다음을 분석해주세요:
        1. 높은 CPC 키워드 식별 (평균 CPC: ${averageCPC.toFixed(0)}원 기준)
        2. 낮은 노출 키워드 식별 (평균 노출: ${(totalImpressions / parsedData.keywords.length).toFixed(0)} 기준)
        3. 각 키워드별 구체적인 문제점과 개선 방안
        4. 우선순위별 최적화 제안
        5. 예상 절약 비용 또는 증가 가능한 매출 계산
        
        검색량과 트렌드 데이터:
        ${parsedData.keywords.map((k) => `${k.keyword}: 검색량 ${getSearchVolumeData(k.keyword)}, 트렌드 ${getTrendData(k.keyword)}`).join("\n")}
        
        요구사항:
        - 실용적이고 구체적인 조언 제공
        - 비용 절약과 성과 개선에 초점
        - 우선순위를 명확히 구분
        - 한국 쿠팡 광고 시장 특성 반영
        
        한국어로 전문적이고 실용적인 분석을 제공해주세요.
      `,
    })

    console.log("✅ AI 분석 완료")

    return {
      success: true,
      data: {
        ...analysisResult,
        summary: {
          totalSpend,
          totalImpressions,
          totalClicks,
          averageCPC,
          averageCTR,
          totalKeywords: parsedData.keywords.length,
        },
      },
    }
  } catch (error) {
    console.error("❌ 분석 오류:", error)
    return {
      success: false,
      error: "광고 보고서 분석 중 오류가 발생했습니다.",
    }
  }
}
