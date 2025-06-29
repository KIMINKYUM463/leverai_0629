"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

const data = [
  { range: "12,200원", value: 2655 },
  { range: "16,600원", value: 214 },
  { range: "19,800원", value: 988 },
  { range: "22,500원", value: 412 },
  { range: "31,500원", value: 2621 },
  { range: "43,300원", value: 80 },
]

export function PriceDistributionChart() {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="range" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
          <YAxis tick={{ fontSize: 10 }} />
          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
