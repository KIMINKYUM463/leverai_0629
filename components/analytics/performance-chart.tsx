"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import type { AnalysisData } from "./enhanced-analytics-tool"

interface PerformanceChartProps {
  data: AnalysisData
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [chartData, setChartData] = useState<
    Array<{
      date: string
      cpc: number
      ctr: number
      impressions: number
    }>
  >([])

  useEffect(() => {
    // 7일간의 모의 데이터 생성
    const days = ["월", "화", "수", "목", "금", "토", "일"]
    const performanceData = days.map((day, index) => ({
      date: day,
      cpc: data.summary.averageCPC * (0.8 + Math.random() * 0.4),
      ctr: data.summary.averageCTR * (0.7 + Math.random() * 0.6),
      impressions: (data.summary.totalImpressions / 7) * (0.6 + Math.random() * 0.8),
    }))

    setChartData(performanceData)
  }, [data])

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "none",
            }}
          />
          <Line
            type="monotone"
            dataKey="ctr"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="cpc"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
            animationDelay={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
