"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PopularProductsChart } from "@/components/charts/popular-products-chart"
import SalesChart from "@/components/charts/sales-chart"
import { ProductCategoryChart } from "@/components/charts/product-category-chart"
import { TopProductsTable } from "@/components/tables/top-products-table"
import { RecentActivities } from "@/components/tables/recent-activities"
import Link from "next/link"
import {
  TrendingUp,
  Users,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Eye,
  Target,
  Clock,
  Package,
  AlertTriangle,
  ArrowUpRight,
  DollarSign,
  Percent,
  Search,
  Calculator,
  PieChart,
  Palette,
  ShoppingBag,
  Zap,
  Activity,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800 -mx-6 px-8 py-12 text-white rounded-b-3xl shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-heading font-bold tracking-tight mb-2">안녕하세요! 👋</h2>
          <p className="text-emerald-100 text-lg mb-6">오늘도 성공적인 이커머스 비즈니스를 위해 LeverAI가 함께합니다</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">실시간 데이터 업데이트 중</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Clock className="w-3 h-3 mr-1" />
              마지막 업데이트: 방금 전
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="opacity-50 cursor-not-allowed">
          <Card className="transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">AI 키워드 분석</p>
                  <p className="text-2xl font-bold text-gray-500">준비중</p>
                  <p className="text-xs text-gray-400 mt-1">서비스 준비중</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center">
                  <Search className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Link href="/page-builder">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">AI 상세페이지</p>
                  <p className="text-2xl font-bold text-emerald-900">자동 생성</p>
                  <p className="text-xs text-emerald-700 mt-1">전문 디자인 템플릿</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Palette className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <div className="opacity-50 cursor-not-allowed">
          <Card className="transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">AI 소싱</p>
                  <p className="text-2xl font-bold text-gray-500">준비중</p>
                  <p className="text-xs text-gray-400 mt-1">서비스 준비중</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="opacity-50 cursor-not-allowed">
          <Card className="transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">AI 마진계산기</p>
                  <p className="text-2xl font-bold text-gray-500">준비중</p>
                  <p className="text-xs text-gray-400 mt-1">서비스 준비중</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-white shadow-sm border p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            비즈니스 개요
          </TabsTrigger>
          <TabsTrigger
            value="ai-tools"
            className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
          >
            <Zap className="w-4 h-4 mr-2" />
            AI 도구 현황
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
          >
            <Target className="w-4 h-4 mr-2" />
            상세 분석
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-8">
          {/* KPI Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">총 매출</CardTitle>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">₩12,847,500</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span className="text-xs font-semibold">+24.5%</span>
                  </div>
                  <span className="text-xs text-gray-500">전월 대비</span>
                </div>
                <Progress value={75} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">총 주문</CardTitle>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">1,847</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span className="text-xs font-semibold">+12.3%</span>
                  </div>
                  <span className="text-xs text-gray-500">전월 대비</span>
                </div>
                <Progress value={60} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-orange-50/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">전환율</CardTitle>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                  <Percent className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">3.24%</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span className="text-xs font-semibold">+0.8%</span>
                  </div>
                  <span className="text-xs text-gray-500">전월 대비</span>
                </div>
                <Progress value={85} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-indigo-50/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">평균 주문가</CardTitle>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">₩69,500</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span className="text-xs font-semibold">+5.2%</span>
                  </div>
                  <span className="text-xs text-gray-500">전월 대비</span>
                </div>
                <Progress value={70} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </div>

          {/* AI Tools Quick Preview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="opacity-50 cursor-not-allowed">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-gray-100">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-heading text-gray-500 flex items-center gap-2">
                        <Search className="h-5 w-5 text-gray-400" />
                        키워드 분석 현황
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-1">오늘 분석된 키워드</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      준비중
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">분석 완료</span>
                      <span className="text-2xl font-bold text-gray-500">247개</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">트렌드 키워드</span>
                      <span className="text-lg font-semibold text-gray-500">+18개</span>
                    </div>
                    <Button disabled className="w-full mt-4 bg-gray-400 text-white cursor-not-allowed">
                      준비중
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="opacity-50 cursor-not-allowed">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-gray-100">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-heading text-gray-500 flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-gray-400" />
                        마진 분석 요약
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-1">수익성 분석 결과</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      준비중
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">평균 마진율</span>
                      <span className="text-2xl font-bold text-gray-500">32.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">고수익 상품</span>
                      <span className="text-lg font-semibold text-gray-500">156개</span>
                    </div>
                    <Button disabled className="w-full mt-4 bg-gray-400 text-white cursor-not-allowed">
                      준비중
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="opacity-50 cursor-not-allowed">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-gray-100">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-heading text-gray-500 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-gray-400" />
                        경쟁사 분석
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-1">시장 포지션 분석</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      준비중
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">시장 순위</span>
                      <span className="text-2xl font-bold text-gray-500">#3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">경쟁 우위</span>
                      <span className="text-lg font-semibold text-gray-500">+12%</span>
                    </div>
                    <Button disabled className="w-full mt-4 bg-gray-400 text-white cursor-not-allowed">
                      준비중
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-heading text-gray-900">매출 추이 분석</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">최근 12개월간 매출 성장 패턴</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    성장세
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart />
              </CardContent>
            </Card>

            <Card className="col-span-3 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-heading text-gray-900">카테고리 분석</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">상품 카테고리별 매출 비중</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Package className="w-3 h-3 mr-1" />
                    4개 카테고리
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ProductCategoryChart />
              </CardContent>
            </Card>
          </div>

          {/* Secondary Charts */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-heading text-gray-900">베스트셀러 상품</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">최근 30일 기준 판매량 TOP 5</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <Eye className="w-3 h-3 mr-1" />
                    실시간
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <TopProductsTable />
              </CardContent>
            </Card>

            <Card className="col-span-3 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-heading text-gray-900">인기 상품 비교</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">상품별 판매 성과 비교</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    분석
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <PopularProductsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-tools" className="space-y-8">
          {/* AI Tools Status Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-50 to-teal-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-teal-900">키워드 분석</CardTitle>
                      <CardDescription className="text-teal-700">실시간 트렌드 분석</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">활성</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-teal-700">오늘 분석</span>
                    <span className="font-semibold text-teal-900">247개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-teal-700">성공률</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Palette className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-emerald-900">상세페이지 생성</CardTitle>
                      <CardDescription className="text-emerald-700">AI 자동 디자인</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">활성</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-emerald-700">생성 완료</span>
                    <span className="font-semibold text-emerald-900">89개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-emerald-700">품질 점수</span>
                    <span className="font-semibold text-green-600">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-green-900">AI 소싱</CardTitle>
                      <CardDescription className="text-green-700">스마트 상품 추천</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">활성</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">추천 상품</span>
                    <span className="font-semibold text-green-900">156개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-green-700">수익성</span>
                    <span className="font-semibold text-green-600">높음</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <Calculator className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-orange-900">마진 계산기</CardTitle>
                      <CardDescription className="text-orange-700">수익성 분석</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">활성</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-orange-700">계산 완료</span>
                    <span className="font-semibold text-orange-900">342건</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-orange-700">평균 마진</span>
                    <span className="font-semibold text-green-600">32.5%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-blue-900">리뷰 분석</CardTitle>
                      <CardDescription className="text-blue-700">고객 피드백 분석</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">활성</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">분석 리뷰</span>
                    <span className="font-semibold text-blue-900">1,247개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">만족도</span>
                    <span className="font-semibold text-green-600">4.6/5</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                      <PieChart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-indigo-900">경쟁사 분석</CardTitle>
                      <CardDescription className="text-indigo-700">시장 포지션 분석</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">활성</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">분석 완료</span>
                    <span className="font-semibold text-indigo-900">28개사</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-indigo-700">시장 순위</span>
                    <span className="font-semibold text-green-600">#3</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Performance Summary */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-gray-900 flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-600" />
                AI 도구 성과
              </CardTitle>
              <CardDescription className="text-gray-600">
                전체 AI 도구의 성과와 효율성을 한눈에 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                  <div className="text-sm text-green-700 font-medium">전체 성공률</div>
                  <div className="text-xs text-green-600 mt-1">전월 대비 +2.1%</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
                  <div className="text-sm text-blue-700 font-medium">총 처리 건수</div>
                  <div className="text-xs text-blue-600 mt-1">오늘 기준</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
                  <div className="text-sm text-purple-700 font-medium">평균 품질 점수</div>
                  <div className="text-xs text-purple-600 mt-1">사용자 평가</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-8">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                고급 분석 대시보드
              </CardTitle>
              <CardDescription className="text-gray-600">
                AI 기반 심층 분석으로 비즈니스 인사이트를 발견하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mb-6">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">고급 분석 준비 중</h3>
                <p className="text-gray-600 max-w-md">
                  AI가 여러분의 데이터를 분석하여 맞춤형 인사이트를 제공할 예정입니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <Users className="h-5 w-5" />
              오늘의 방문자
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">2,847</div>
            <div className="flex items-center gap-2 text-blue-100">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm">어제보다 +18% 증가</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <Package className="h-5 w-5" />
              재고 알림
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">12</div>
            <div className="flex items-center gap-2 text-green-100">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">품절 임박 상품</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-teal-600 to-emerald-700 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <Target className="h-5 w-5" />월 목표 달성률
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">78%</div>
            <div className="flex items-center gap-2 text-purple-100">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">목표까지 22% 남음</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-heading text-gray-900">최근 활동</CardTitle>
              <CardDescription className="text-gray-600 mt-1">실시간 비즈니스 활동 현황</CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Clock className="w-3 h-3 mr-1" />
              실시간
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <RecentActivities />
        </CardContent>
      </Card>
    </div>
  )
}
