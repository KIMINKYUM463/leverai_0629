"use client"

import { useEffect, useState } from "react"
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ageData = [
  { name: "20대 이하", value: 15 },
  { name: "30대", value: 25 },
  { name: "40대", value: 35 },
  { name: "50대", value: 20 },
  { name: "60대 이상", value: 5 },
]

const genderData = [
  { name: "여성", value: 65 },
  { name: "남성", value: 35 },
]

const regionData = [
  { name: "서울", value: 35 },
  { name: "경기", value: 25 },
  { name: "부산", value: 15 },
  { name: "기타", value: 25 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function AudienceInsights() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">연령대 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">성별 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">지역 분포</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>고객 인사이트 요약</CardTitle>
          <CardDescription>AI가 분석한 고객 특성 및 행동 패턴입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-teal-500 pl-4 py-2">
              <h3 className="font-medium">주요 고객층</h3>
              <p className="text-sm text-gray-600">
                40대 여성, 서울/경기 거주자가 주요 구매층으로, 건강과 품질에 관심이 높습니다.
              </p>
            </div>
            <div className="border-l-4 border-teal-500 pl-4 py-2">
              <h3 className="font-medium">구매 패턴</h3>
              <p className="text-sm text-gray-600">
                주로 주말 오전에 구매가 집중되며, 평균 장바구니 금액은 45,000원입니다.
              </p>
            </div>
            <div className="border-l-4 border-teal-500 pl-4 py-2">
              <h3 className="font-medium">관심 상품</h3>
              <p className="text-sm text-gray-600">
                제철 과일과 유기농 채소에 관심이 높으며, 선물용 프리미엄 상품 구매율이 증가하고 있습니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
