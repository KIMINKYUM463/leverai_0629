"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { SendHorizontal, Bot, User, Loader2 } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function AIQuestionTool() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "안녕하세요! 농수산물 판매와 관련된 질문이 있으시면 언제든지 물어보세요.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // 미리 준비된 응답들
  const preparedResponses = [
    "제철 과일은 당도가 높고 영양가가 풍부하며, 가격도 상대적으로 저렴합니다. 현재 제철인 과일로는 딸기, 참외, 수박 등이 있습니다.",
    "유기농 인증을 받기 위해서는 최소 3년 이상 화학비료와 농약을 사용하지 않고 재배해야 합니다. 인증 절차는 국립농산물품질관리원에 신청하시면 됩니다.",
    "농산물 직거래는 중간 유통 과정을 줄여 생산자와 소비자 모두에게 이익이 됩니다. 생산자는 더 높은 수익을, 소비자는 더 신선한 제품을 얻을 수 있습니다.",
    "수산물의 신선도를 유지하기 위해서는 0~4℃의 온도에서 보관하는 것이 중요합니다. 또한 얼음을 충분히 사용하고 공기와의 접촉을 최소화해야 합니다.",
    "농산물 가격은 기상 조건, 수확량, 소비자 수요 등 다양한 요인에 의해 결정됩니다. 특히 이상기후는 가격 변동의 주요 원인이 됩니다.",
  ]

  const handleSendMessage = () => {
    if (!input.trim()) return

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // AI 응답 시뮬레이션 (실제로는 API 호출이 필요)
    setTimeout(() => {
      const randomResponse = preparedResponses[Math.floor(Math.random() * preparedResponses.length)]
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI 실시간 질문기</h2>
        <p className="text-muted-foreground">농수산물 판매와 관련된 질문에 AI가 실시간으로 답변해드립니다.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-8 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle>AI 어시스턴트와 대화하기</CardTitle>
            <CardDescription>농수산물 판매와 관련된 질문을 자유롭게 해보세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4 max-h-[500px] overflow-y-auto p-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className={message.role === "assistant" ? "bg-teal-100" : "bg-blue-100"}>
                      <div className="flex items-center justify-center h-full">
                        {message.role === "assistant" ? (
                          <Bot className="h-5 w-5 text-teal-700" />
                        ) : (
                          <User className="h-5 w-5 text-blue-700" />
                        )}
                      </div>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="bg-teal-100">
                      <div className="flex items-center justify-center h-full">
                        <Bot className="h-5 w-5 text-teal-700" />
                      </div>
                    </Avatar>
                    <div className="rounded-lg p-4 bg-gray-100 text-gray-800 border border-gray-200">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <Textarea
                placeholder="질문을 입력하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle>자주 묻는 질문</CardTitle>
            <CardDescription>많은 사용자들이 궁금해하는 질문들입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "제철 과일은 어떤 것이 있나요?",
                "유기농 인증은 어떻게 받나요?",
                "농산물 직거래의 장점은 무엇인가요?",
                "수산물 신선도 유지 방법은?",
                "농산물 가격 결정 요인은 무엇인가요?",
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  onClick={() => {
                    setInput(question)
                  }}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
