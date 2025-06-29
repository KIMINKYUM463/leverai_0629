"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, AlertTriangle, CheckCircle2, Zap } from "lucide-react"
import { FileUpload } from "./file-upload"
import { AnalysisProgress } from "./analysis-progress"
import { AnalysisResults } from "./analysis-results"
import { analyzeAdReport } from "@/app/actions/analyze-ad-report"

export type AnalysisData = {
  summary: {
    totalSpend: number
    totalImpressions: number
    totalClicks: number
    averageCPC: number
    averageCTR: number
    totalKeywords: number
  }
  highCPCKeywords: Array<{
    keyword: string
    cpc: number
    spend: number
    clicks: number
    impressions: number
    ctr: number
    searchVolume: number
    trend: "up" | "down" | "stable"
  }>
  lowImpressionKeywords: Array<{
    keyword: string
    impressions: number
    cpc: number
    spend: number
    clicks: number
    ctr: number
    searchVolume: number
    trend: "up" | "down" | "stable"
  }>
  keywordInsights: Array<{
    keyword: string
    issue: string
    recommendation: string
    priority: "high" | "medium" | "low"
    potentialSavings?: number
    potentialIncrease?: number
  }>
  performanceMetrics: {
    topPerformers: Array<{
      keyword: string
      metric: string
      value: number
      change: number
    }>
    underPerformers: Array<{
      keyword: string
      metric: string
      value: number
      change: number
    }>
  }
}

export function EnhancedAnalyticsTool() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisStep, setAnalysisStep] = useState("")
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile)
    setError(null)
  }

  const handleAnalysis = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setError(null)

    try {
      // 단계별 진행 상황 시뮬레이션
      const steps = [
        { step: "파일 읽기 중...", progress: 20 },
        { step: "데이터 파싱 중...", progress: 40 },
        { step: "AI 분석 중...", progress: 60 },
        { step: "키워드 검색량 조회 중...", progress: 80 },
        { step: "인사이트 생성 중...", progress: 90 },
        { step: "분석 완료!", progress: 100 },
      ]

      for (const { step, progress } of steps) {
        setAnalysisStep(step)
        setAnalysisProgress(progress)
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      // 실제 분석 실행
      const result = await analyzeAdReport(file)

      if (result.success) {
        setAnalysisData(result.data)
      } else {
        setError(result.error || "분석 중 오류가 발생했습니다.")
      }
    } catch (err) {
      setError("분석 중 오류가 발생했습니다.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
      setAnalysisStep("")
    }
  }

  const resetAnalysis = () => {
    setFile(null)
    setAnalysisData(null)
    setError(null)
    setIsAnalyzing(false)
    setAnalysisProgress(0)
    setAnalysisStep("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 광고 분석</h2>
        <p className="text-muted-foreground">쿠팡 광고 보고서를 업로드하여 AI 기반 성과 분석을 받아보세요.</p>
      </div>

      {!analysisData && !isAnalyzing && (
        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileSpreadsheet className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>광고 보고서 업로드</CardTitle>
            <CardDescription>
              쿠팡 파트너스에서 다운로드한 엑셀 파일을 업로드해주세요.
              <br />
              지원 형식: .xlsx, .xls, .csv
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload onFileUpload={handleFileUpload} />

            {file && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-green-800">{file.name}</p>
                    <p className="text-sm text-green-600">파일 크기: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button onClick={handleAnalysis} className="flex-1">
                    <Zap className="mr-2 h-4 w-4" />
                    AI 분석 시작
                  </Button>
                  <Button variant="outline" onClick={resetAnalysis}>
                    다시 선택
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <p className="text-red-800 font-medium">오류 발생</p>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {isAnalyzing && <AnalysisProgress progress={analysisProgress} step={analysisStep} />}

      {analysisData && !isAnalyzing && <AnalysisResults data={analysisData} onReset={resetAnalysis} />}
    </div>
  )
}
