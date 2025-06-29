"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Zap, Brain, Search, BarChart3 } from "lucide-react"

interface AnalysisProgressProps {
  progress: number
  step: string
}

export function AnalysisProgress({ progress, step }: AnalysisProgressProps) {
  const getStepIcon = (currentStep: string) => {
    if (currentStep.includes("파일")) return <Loader2 className="h-5 w-5 animate-spin" />
    if (currentStep.includes("파싱")) return <BarChart3 className="h-5 w-5 animate-pulse" />
    if (currentStep.includes("AI")) return <Brain className="h-5 w-5 animate-bounce" />
    if (currentStep.includes("검색량")) return <Search className="h-5 w-5 animate-pulse" />
    if (currentStep.includes("인사이트")) return <Zap className="h-5 w-5 animate-pulse" />
    return <Loader2 className="h-5 w-5 animate-spin" />
  }

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <Brain className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-blue-900">AI 분석 진행 중</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStepIcon(step)}
              <span className="font-medium text-blue-900">{step}</span>
            </div>
            <span className="text-sm font-medium text-blue-700">{progress}%</span>
          </div>

          <Progress value={progress} className="h-3">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {[
            { icon: BarChart3, label: "데이터 파싱", completed: progress > 40 },
            { icon: Brain, label: "AI 분석", completed: progress > 60 },
            { icon: Search, label: "검색량 조회", completed: progress > 80 },
            { icon: Zap, label: "인사이트 생성", completed: progress > 90 },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                item.completed
                  ? "bg-green-100 text-green-700"
                  : progress > index * 25
                    ? "bg-blue-100 text-blue-700 animate-pulse"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              <item.icon className={`h-6 w-6 mb-2 ${item.completed ? "animate-none" : "animate-pulse"}`} />
              <span className="text-xs font-medium text-center">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-blue-600">
          <p>분석이 완료되면 상세한 인사이트를 제공해드립니다.</p>
          <p className="text-xs mt-1 opacity-75">평균 소요 시간: 1-2분</p>
        </div>
      </CardContent>
    </Card>
  )
}
