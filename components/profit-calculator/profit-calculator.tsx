"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CalendarIcon, PlusCircle, Trash2, TrendingDown, TrendingUp } from "lucide-react"

// 수익 데이터 타입 정의
interface ProfitData {
  id: string
  date: Date
  revenue: number
  adCost: number
  margin: number
  profit: number
}

export function ProfitCalculator() {
  const [activeTab, setActiveTab] = useState("daily")
  const [date, setDate] = useState<Date>(new Date())
  const [revenue, setRevenue] = useState<string>("")
  const [adCost, setAdCost] = useState<string>("")
  const [margin, setMargin] = useState<string>("30")
  const [profitData, setProfitData] = useState<ProfitData[]>([])
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem("profitCalculatorData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData).map((item: any) => ({
          ...item,
          date: new Date(item.date),
        }))
        setProfitData(parsedData)
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error)
      }
    }
  }, [])

  // 데이터 저장
  useEffect(() => {
    if (profitData.length > 0) {
      localStorage.setItem("profitCalculatorData", JSON.stringify(profitData))
    }
  }, [profitData])

  // 순이익 계산
  const calculateProfit = (rev: number, cost: number, marginPercent: number) => {
    const marginAmount = rev * (marginPercent / 100)
    return marginAmount - cost
  }

  // 데이터 추가
  const addProfitData = () => {
    if (!revenue || !adCost) return

    const revenueNum = Number.parseFloat(revenue)
    const adCostNum = Number.parseFloat(adCost)
    const marginNum = Number.parseFloat(margin)

    if (isNaN(revenueNum) || isNaN(adCostNum) || isNaN(marginNum)) return

    const profit = calculateProfit(revenueNum, adCostNum, marginNum)
    const newData: ProfitData = {
      id: Date.now().toString(),
      date: new Date(date),
      revenue: revenueNum,
      adCost: adCostNum,
      margin: marginNum,
      profit,
    }

    setProfitData((prev) => [...prev, newData])
    setRevenue("")
    setAdCost("")
  }

  // 데이터 삭제
  const deleteData = (id: string) => {
    setProfitData((prev) => prev.filter((item) => item.id !== id))
  }

  // 날짜별 데이터 필터링
  const filterDataByPeriod = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    switch (activeTab) {
      case "daily":
        return profitData.filter((item) => {
          const itemDate = new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate())
          return itemDate.getTime() === today.getTime()
        })
      case "weekly": {
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        return profitData.filter((item) => {
          const itemDate = new Date(item.date)
          return itemDate >= weekStart && itemDate <= weekEnd
        })
      }
      case "monthly": {
        return profitData.filter(
          (item) => item.date.getMonth() === today.getMonth() && item.date.getFullYear() === today.getFullYear(),
        )
      }
      default:
        return profitData
    }
  }

  // 합계 계산
  const calculateTotals = (data: ProfitData[]) => {
    return data.reduce(
      (acc, curr) => {
        acc.revenue += curr.revenue
        acc.adCost += curr.adCost
        acc.profit += curr.profit
        return acc
      },
      { revenue: 0, adCost: 0, profit: 0 },
    )
  }

  const filteredData = filterDataByPeriod()
  const totals = calculateTotals(filteredData)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">순이익 계산 시트</h1>
          <p className="text-muted-foreground">매일 광고비 지출과 마진을 통해 순이익을 계산하세요.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>총 매출</CardTitle>
            <CardDescription>선택한 기간의 총 매출액</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.revenue.toLocaleString()}원</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>총 광고비</CardTitle>
            <CardDescription>선택한 기간의 총 광고비 지출</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.adCost.toLocaleString()}원</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>순이익</CardTitle>
            <CardDescription>마진에서 광고비를 제외한 순이익</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`text-2xl font-bold ${totals.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totals.profit.toLocaleString()}원
              </div>
              {totals.profit >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>새 데이터 추가</CardTitle>
            <CardDescription>일일 매출과 광고비를 입력하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">날짜</Label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ko }) : "날짜 선택"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        if (date) {
                          setDate(date)
                          setIsCalendarOpen(false)
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue">매출액 (원)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="0"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adCost">광고비 (원)</Label>
                <Input
                  id="adCost"
                  type="number"
                  placeholder="0"
                  value={adCost}
                  onChange={(e) => setAdCost(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="margin">마진율 (%)</Label>
                <Select value={margin} onValueChange={setMargin}>
                  <SelectTrigger id="margin">
                    <SelectValue placeholder="마진율 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="15">15%</SelectItem>
                    <SelectItem value="20">20%</SelectItem>
                    <SelectItem value="25">25%</SelectItem>
                    <SelectItem value="30">30%</SelectItem>
                    <SelectItem value="35">35%</SelectItem>
                    <SelectItem value="40">40%</SelectItem>
                    <SelectItem value="45">45%</SelectItem>
                    <SelectItem value="50">50%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={addProfitData}>
                <PlusCircle className="mr-2 h-4 w-4" />
                데이터 추가
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>순이익 데이터</CardTitle>
            <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="daily">일별</TabsTrigger>
                <TabsTrigger value="weekly">주별</TabsTrigger>
                <TabsTrigger value="monthly">월별</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {filteredData.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>날짜</TableHead>
                      <TableHead>매출액</TableHead>
                      <TableHead>광고비</TableHead>
                      <TableHead>마진율</TableHead>
                      <TableHead>순이익</TableHead>
                      <TableHead className="w-[80px]">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{format(item.date, "yyyy-MM-dd")}</TableCell>
                        <TableCell>{item.revenue.toLocaleString()}원</TableCell>
                        <TableCell>{item.adCost.toLocaleString()}원</TableCell>
                        <TableCell>{item.margin}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className={item.profit >= 0 ? "text-green-600" : "text-red-600"}>
                              {item.profit.toLocaleString()}원
                            </span>
                            {item.profit >= 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => deleteData(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">데이터가 없습니다.</p>
                  <p className="text-xs text-muted-foreground mt-1">왼쪽 폼에서 데��터를 추가해주세요.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
