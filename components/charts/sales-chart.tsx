"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  {
    name: "1월",
    딸기: 2400,
    감귤: 1800,
    양파: 1200,
    고구마: 900,
  },
  {
    name: "2월",
    딸기: 3000,
    감귤: 1500,
    양파: 1300,
    고구마: 1000,
  },
  {
    name: "3월",
    딸기: 2800,
    감귤: 1300,
    양파: 1400,
    고구마: 1200,
  },
  {
    name: "4월",
    딸기: 2600,
    감귤: 1200,
    양파: 1500,
    고구마: 1400,
  },
  {
    name: "5월",
    딸기: 2200,
    감귤: 1100,
    양파: 1700,
    고구마: 1600,
  },
  {
    name: "6월",
    딸기: 1800,
    감귤: 1000,
    양파: 1900,
    고구마: 1800,
  },
]

export default function SalesChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        />
        <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />
        <Line
          type="monotone"
          dataKey="딸기"
          stroke="#FF6B6B"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 7, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="감귤"
          stroke="#FFA94D"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 7, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="양파"
          stroke="#4D96FF"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 7, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="고구마"
          stroke="#9775FA"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 7, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
