"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "전자기기", value: 35 },
  { name: "패션/뷰티", value: 30 },
  { name: "홈/리빙", value: 15 },
  { name: "스포츠/레저", value: 20 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function ProductCategoryChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={90}
          innerRadius={40}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "비중"]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        />
        <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
      </PieChart>
    </ResponsiveContainer>
  )
}
