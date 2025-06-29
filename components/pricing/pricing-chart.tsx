"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  {
    price: 20000,
    sales: 150,
    revenue: 3000000,
    profit: 750000,
  },
  {
    price: 22000,
    sales: 140,
    revenue: 3080000,
    profit: 980000,
  },
  {
    price: 24000,
    sales: 130,
    revenue: 3120000,
    profit: 1170000,
  },
  {
    price: 25000,
    sales: 120,
    revenue: 3000000,
    profit: 1200000,
  },
  {
    price: 26000,
    sales: 100,
    revenue: 2600000,
    profit: 1100000,
  },
  {
    price: 28000,
    sales: 80,
    revenue: 2240000,
    profit: 1040000,
  },
  {
    price: 30000,
    sales: 60,
    revenue: 1800000,
    profit: 900000,
  },
]

export function PricingChart() {
  const [isMounted, setIsMounted] = useState(false)
  const [activeDataKey, setActiveDataKey] = useState("profit")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-3 py-1 rounded-md text-sm ${
            activeDataKey === "sales" ? "bg-teal-100 text-teal-700" : "bg-gray-100"
          }`}
          onClick={() => setActiveDataKey("sales")}
        >
          판매량
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm ${
            activeDataKey === "revenue" ? "bg-teal-100 text-teal-700" : "bg-gray-100"
          }`}
          onClick={() => setActiveDataKey("revenue")}
        >
          매출
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm ${
            activeDataKey === "profit" ? "bg-teal-100 text-teal-700" : "bg-gray-100"
          }`}
          onClick={() => setActiveDataKey("profit")}
        >
          수익
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="price"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₩${value.toLocaleString()}`}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => (activeDataKey === "sales" ? `${value}개` : `₩${(value / 10000).toFixed(0)}만`)}
          />
          <Tooltip
            formatter={(value) =>
              activeDataKey === "sales"
                ? [`${value}개`, "판매량"]
                : [`₩${value.toLocaleString()}`, activeDataKey === "revenue" ? "매출" : "수익"]
            }
            labelFormatter={(label) => `가격: ₩${label.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey={activeDataKey}
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
