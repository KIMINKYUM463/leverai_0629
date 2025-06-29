"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  {
    name: "네이버",
    지출: 450000,
    ROAS: 320,
  },
  {
    name: "구글",
    지출: 380000,
    ROAS: 290,
  },
  {
    name: "페이스북",
    지출: 250000,
    ROAS: 340,
  },
  {
    name: "인스타그램",
    지출: 165000,
    ROAS: 280,
  },
]

export function ChannelPerformance() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          yAxisId="left"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₩${(value / 10000).toFixed(0)}만`}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip />
        <Bar yAxisId="left" dataKey="지출" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="ROAS" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
