"use client"

import type React from "react" // React 타입 명시적 임포트

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar" // Avatar 임포트 추가
import { Bot, X, Minimize2, Maximize2, SendIcon, User, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { getLeversBotAIResponse } from "@/app/actions/levers-bot" // 새로 만든 서버 액션 임포트
import { useAuth } from "@/components/auth/auth-provider"

// 메시지 타입 정의
type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  isLoading?: boolean
}

export function LeversAssistant() {
  const { user, isLoading: authLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "안녕하세요! LeverBot입니다. 무엇을 도와드릴까요?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (authLoading || !user) {
      return
    }
  }, [authLoading, user])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    // 로딩 메시지 추가
    const loadingMessageId = (Date.now() + 1).toString()
    const loadingMessage: Message = {
      id: loadingMessageId,
      content: "응답을 생성 중입니다...",
      sender: "assistant",
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    const currentInput = inputValue // 비동기 호출 전에 현재 입력값 저장
    setInputValue("")
    setIsLoading(true)

    try {
      // 서버 액션 호출로 AI 응답 받기
      const aiResponse = await getLeversBotAIResponse(currentInput)
      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessageId ? { ...msg, content: aiResponse, isLoading: false } : msg)),
      )
    } catch (error) {
      console.error("Error fetching AI response:", error)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId
            ? { ...msg, content: "죄송합니다. 응답 생성 중 오류가 발생했습니다. 다시 시도해주세요.", isLoading: false }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen((prev) => !prev)
    }
  }

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized((prev) => !prev)
  }

  // 로그인하지 않은 상태에서는 아예 렌더링하지 않음
  if (authLoading || !user) {
    return null
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className={`rounded-full w-14 h-14 shadow-lg flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-700"
          }`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <Bot className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={
              isMinimized
                ? { opacity: 1, y: 0, scale: 0.95, height: "auto" }
                : { opacity: 1, y: 0, scale: 1, height: "auto" }
            }
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-80 md:w-96"
          >
            <Card
              className={`shadow-xl border-emerald-200 overflow-hidden ${isMinimized ? "h-auto" : "h-[450px] flex flex-col"}`}
            >
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 px-4 flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2 bg-white">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                  </Avatar>
                  <CardTitle className="text-lg font-medium">LeverBot</CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-white hover:bg-emerald-700 rounded-full"
                    onClick={toggleMinimize}
                    aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  <CardContent className="p-3 flex-grow overflow-y-auto">
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className="flex items-start max-w-[85%]">
                            {message.sender === "assistant" && (
                              <Avatar className="h-7 w-7 mr-1.5 bg-emerald-100 flex-shrink-0">
                                <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                              </Avatar>
                            )}

                            <div
                              className={`rounded-lg p-2.5 text-sm shadow-sm ${
                                message.sender === "user"
                                  ? "bg-emerald-600 text-white"
                                  : "bg-gray-100 text-gray-800 border border-gray-200"
                              } ${message.isLoading ? "animate-pulse" : ""}`}
                            >
                              {message.content.split("\n").map((line, index) => (
                                <span key={index}>
                                  {line}
                                  {index < message.content.split("\n").length - 1 && <br />}
                                </span>
                              ))}
                              {!message.isLoading && (
                                <div className="mt-1 text-right">
                                  <span
                                    className={`text-xs ${message.sender === "user" ? "text-emerald-200" : "text-gray-500"}`}
                                  >
                                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                  </span>
                                </div>
                              )}
                            </div>

                            {message.sender === "user" && (
                              <Avatar className="h-7 w-7 ml-1.5 bg-emerald-600 flex-shrink-0">
                                <User className="h-3.5 w-3.5 text-white" />
                              </Avatar>
                            )}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </CardContent>

                  <CardFooter className="border-t p-2 bg-white">
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        ref={inputRef}
                        placeholder="메시지를 입력하세요..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        disabled={isLoading}
                        className="flex-1 text-sm focus:ring-emerald-500"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputValue.trim()}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 px-3"
                        aria-label="Send message"
                      >
                        <SendIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
