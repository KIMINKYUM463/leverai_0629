"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { SendIcon, User, Bot, ThumbsUp, ThumbsDown } from "lucide-react"

// 메시지 타입 정의
type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  isLoading?: boolean
}

// AI 응답 생성 함수 (실제로는 API 호출로 대체)
const generateAiResponse = async (question: string): Promise<string> => {
  // 실제 구현에서는 API 호출로 대체
  await new Promise((resolve) => setTimeout(resolve, 1000)) // 응답 지연 시뮬레이션

  // 질문에 따른 응답 매핑
  const responses: Record<string, string> = {
    "WingsAI 플랫폼은 어떤 서비스인가요?":
      "WingsAI는 이커머스 비즈니스를 위한 종합 AI 플랫폼입니다. AI 기술을 활용하여 상품 소싱, 가격 설정, 마케팅, 고객 분석 등 다양한 기능을 제공하며, 온라인 판매자들이 효율적으로 비즈니스를 운영할 수 있도록 돕습니다.",

    "회원가입은 어떻게 하나요?":
      "회원가입은 상단 우측의 '회원가입' 버튼을 클릭하여 진행할 수 있습니다. 이메일, 비밀번호, 기본 정보를 입력하면 가입이 완료됩니다. 가입 후 이메일 인증을 통해 계정을 활성화해야 모든 기능을 이용할 수 있습니다.",

    "비밀번호를 잊어버렸어요. 어떻게 해야 하나요?":
      "로그인 페이지에서 '비밀번호 찾기' 링크를 클릭하여 가입 시 사용한 이메일을 입력하세요. 비밀번호 재설정 링크가 이메일로 발송됩니다. 링크를 통해 새 비밀번호를 설정할 수 있습니다.",

    "상품 등록은 어떻게 하나요?":
      "상품 등록은 '상품 관리' 메뉴에서 '새 상품 등록' 버튼을 클릭하여 진행할 수 있습니다. 상품명, 가격, 카테고리, 상세 설명, 이미지 등의 정보를 입력하면 됩니다. AI 상품 최적화 기능을 활용하면 더 효과적인 상품 등록이 가능합니다.",

    "배송 설정은 어디서 할 수 있나요?":
      "배송 설정은 '설정' 메뉴의 '배송 관리'에서 할 수 있습니다. 기본 배송비, 무료 배송 조건, 지역별 추가 배송비, 배송 방법 등을 설정할 수 있으며, 자동 배송 추적 기능도 제공합니다.",

    "결제 수수료는 얼마인가요?":
      "결제 수수료는 선택한 결제 방식과 판매자 등급에 따라 다릅니다. 일반적으로 신용카드 결제는 3.5%, 계좌이체는 1.5%의 수수료가 발생합니다. 프리미엄 판매자의 경우 수수료 할인 혜택이 적용됩니다. 자세한 내용은 '수수료 안내' 페이지에서 확인하실 수 있습니다.",

    "재고 관리 기능이 있나요?":
      "네, WingsAI는 강력한 재고 관리 기능을 제공합니다. 실시간 재고 추적, 자동 재고 알림, 재고 예측, 다채널 재고 동기화 등의 기능을 이용할 수 있습니다. '재고 관리' 메뉴에서 모든 상품의 재고 현황을 한눈에 확인하고 관리할 수 있습니다.",

    "마케팅 도구는 어떤 것이 있나요?":
      "WingsAI는 다양한 AI 마케팅 도구를 제공합니다. 자동 이메일 마케팅, SNS 콘텐츠 생성, 검색엔진 최적화(SEO), 광고 성과 분석, 개인화 추천 엔진 등이 있습니다. 또한 AI가 고객 데이터를 분석하여 최적의 마케팅 전략을 제안해 드립니다.",

    "고객 데이터는 어떻게 분석하나요?":
      "WingsAI의 '고객 인사이트' 기능을 통해 고객 데이터를 심층 분석할 수 있습니다. 구매 패턴, 선호 상품, 방문 빈도, 평균 주문 금액 등의 데이터를 시각화하여 제공하며, AI가 고객 세그먼트를 자동으로 생성하여 타겟 마케팅에 활용할 수 있습니다.",

    "환불 정책은 어떻게 설정하나요?":
      "환불 정책은 '설정' 메뉴의 '정책 관리'에서 설정할 수 있습니다. 환불 가능 기간, 환불 조건, 반품 배송비 부담 주체 등을 상세히 설정할 수 있으며, 법적 요건을 충족하는 정책 템플릿도 제공합니다. 설정한 환불 정책은 상품 페이지와 결제 페이지에 자동으로 표시됩니다.",

    "해외 판매도 가능한가요?":
      "네, WingsAI는 글로벌 이커머스를 완벽하게 지원합니다. 다국어 상품 정보 자동 번역, 국가별 통화 설정, 국제 배송 추적, 관세 및 세금 자동 계산 기능을 제공합니다. '글로벌 설정' 메뉴에서 판매 국가와 관련 설정을 관리할 수 있습니다.",
  }

  // 기본 응답
  let response =
    "죄송합니다. 해당 질문에 대한 정확한 답변을 드리기 어렵습니다. 더 자세한 정보가 필요하시면 고객센터로 문의해주세요."

  // 질문에 특정 키워드가 포함되어 있는지 확인
  if (question.includes("플랫폼") || question.includes("서비스")) {
    response = responses["WingsAI 플랫폼은 어떤 서비스인가요?"]
  } else if (question.includes("회원가입") || question.includes("가입")) {
    response = responses["회원가입은 어떻게 하나요?"]
  } else if (question.includes("비밀번호") || question.includes("로그인")) {
    response = responses["비밀번호를 잊어버렸어요. 어떻게 해야 하나요?"]
  } else if (question.includes("AI") || question.includes("인공지능")) {
    response =
      "WingsAI는 다양한 AI 기능을 제공합니다. AI 상품 소싱, AI 가격 설정, AI 마케팅, AI 고객 분석 등의 기능이 있으며, 각 기능은 메뉴에서 확인하실 수 있습니다."
  } else if (question.includes("결제") || question.includes("수수료")) {
    response = responses["결제 수수료는 얼마인가요?"]
  } else if (question.includes("상품 등록") || question.includes("등록")) {
    response = responses["상품 등록은 어떻게 하나요?"]
  } else if (question.includes("배송") || question.includes("배송비")) {
    response = responses["배송 설정은 어디서 할 수 있나요?"]
  } else if (question.includes("재고") || question.includes("품절")) {
    response = responses["재고 관리 기능이 있나요?"]
  } else if (question.includes("마케팅") || question.includes("광고")) {
    response = responses["마케팅 도구는 어떤 것이 있나요?"]
  } else if (question.includes("고객") || question.includes("분석")) {
    response = responses["고객 데이터는 어떻게 분석하나요?"]
  } else if (question.includes("환불") || question.includes("반품")) {
    response = responses["환불 정책은 어떻게 설정하나요?"]
  } else if (question.includes("해외") || question.includes("글로벌")) {
    response = responses["해외 판매도 가능한가요?"]
  }

  return response
}

export function AiCsAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "안녕하세요! WingsAI CS 어시스턴트입니다. 어떤 도움이 필요하신가요?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 메시지 목록이 업데이트될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "응답을 생성 중입니다...",
      sender: "assistant",
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await generateAiResponse(inputValue)

      setMessages((prev) => prev.map((msg) => (msg.isLoading ? { ...msg, content: response, isLoading: false } : msg)))
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? { ...msg, content: "죄송합니다. 응답 생성 중 오류가 발생했습니다. 다시 시도해주세요.", isLoading: false }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">AI CS 어시스턴트</h1>
          <p className="text-gray-500">궁금한 점을 물어보세요. AI가 즉시 답변해드립니다.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div>
          <Card className="h-[calc(100vh-220px)] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-600" />
                AI CS 어시스턴트와 대화
              </CardTitle>
              <CardDescription>24시간 언제든지 질문하세요. 즉시 답변해드립니다.</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-start max-w-[80%]">
                      {message.sender === "assistant" && (
                        <Avatar className="h-8 w-8 mr-2 bg-blue-100">
                          <Bot className="h-4 w-4 text-blue-700" />
                        </Avatar>
                      )}

                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                        } ${message.isLoading ? "animate-pulse" : ""}`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>

                          {message.sender === "assistant" && !message.isLoading && (
                            <div className="flex items-center ml-2">
                              <button className="text-xs opacity-70 hover:opacity-100 p-1">
                                <ThumbsUp className="h-3 w-3" />
                              </button>
                              <button className="text-xs opacity-70 hover:opacity-100 p-1">
                                <ThumbsDown className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 ml-2 bg-blue-600">
                          <User className="h-4 w-4 text-white" />
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="질문을 입력하세요..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
