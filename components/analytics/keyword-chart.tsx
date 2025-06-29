"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer } from "recharts"

interface KeywordChartProps {
  searchVolume: number
  trend: "up" | "down" | "stable"
}

export function KeywordChart({ searchVolume, trend }: KeywordChartProps) {
  const [data, setData] = useState<Array<{ value: number }>>([])

  useEffect(() => {
    // 검색량 기반으로 차트 데이터 생성
    const baseValue = Math.log(searchVolume) * 10
    const points = 7
    const chartData = []

    for (let i = 0; i < points; i++) {
      let value = baseValue

      if (trend === "up") {
        value += i * 2 + Math.random() * 5
      } else if (trend === "down") {
        value -= i * 1.5 + Math.random() * 3
      } else {
        value += (Math.random() - 0.5) * 4
      }

      chartData.push({ value: Math.max(0, value) })
    }

    setData(chartData)
  }, [searchVolume, trend])

  const getColor = () => {
    switch (trend) {
      case "up":
        return "#10b981"
      case "down":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="w-20 h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={getColor()}
            strokeWidth={2}
            dot={false}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
