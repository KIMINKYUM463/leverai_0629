"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  {
    name: "무선이어폰",
    판매량: 4000,
  },
  {
    name: "스마트워치",
    판매량: 3000,
  },
  {
    name: "노트북",
    판매량: 2000,
  },
  {
    name: "스피커",
    판매량: 2780,
  },
  {
    name: "태블릿",
    판매량: 1890,
  },
  {
    name: "키보드",
    판매량: 2390,
  },
  {
    name: "마우스",
    판매량: 3490,
  },
]

export function PopularProductsChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#666" }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          tick={{ fill: "#666" }}
        />
        <Tooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        />
        <Bar
          dataKey="판매량"
          fill="#0ea5e9"
          radius={[4, 4, 0, 0]}
          barSize={30}
          background={{ fill: "#f8f8f8", radius: [4, 4, 0, 0] }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
