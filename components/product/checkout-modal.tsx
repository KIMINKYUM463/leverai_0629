"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, CreditCard, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  totalPrice: number
  quantity: number
  selectedOption: string
}

export function CheckoutModal({
  isOpen,
  onClose,
  productName,
  totalPrice,
  quantity,
  selectedOption,
}: CheckoutModalProps) {
  const [activeStep, setActiveStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [isProcessing, setIsProcessing] = useState(false)

  // 배송 정보 상태
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    zipCode: "",
    address1: "",
    address2: "",
    message: "",
  })

  // 결제 정보 상태
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardOwner: "",
    installment: "0",
  })

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleInstallmentChange = (value: string) => {
    setPaymentInfo((prev) => ({ ...prev, installment: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 배송 정보 유효성 검사
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.zipCode || !shippingInfo.address1) {
      alert("필수 정보를 모두 입력해주세요.")
      return
    }
    setActiveStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 결제 정보 유효성 검사
    if (!paymentInfo.cardNumber || !paymentInfo.cardExpiry || !paymentInfo.cardCvc || !paymentInfo.cardOwner) {
      alert("카드 정보를 모두 입력해주세요.")
      return
    }

    // 결제 처리 시뮬레이션
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setActiveStep("confirmation")
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
  }

  const formatCardExpiry = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/^(\d{2})(\d{0,2})/, "$1/$2")
      .trim()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {activeStep === "shipping" ? "배송 정보 입력" : activeStep === "payment" ? "결제 정보 입력" : "주문 완료"}
          </DialogTitle>
        </DialogHeader>

        {activeStep === "shipping" && (
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="font-medium mb-2">주문 상품 정보</h3>
              <p className="text-sm text-gray-600">
                {productName} ({selectedOption}) x {quantity}개
              </p>
              <p className="font-medium mt-2">총 결제금액: {totalPrice.toLocaleString()}원</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">
                이름 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={handleShippingInfoChange}
                placeholder="받으실 분의 이름을 입력해주세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                연락처 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleShippingInfoChange}
                placeholder="'-' 없이 숫자만 입력해주세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">
                우편번호 <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingInfoChange}
                  placeholder="우편번호"
                  className="flex-1"
                  required
                />
                <Button type="button" variant="outline">
                  주소 찾기
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1">
                기본주소 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address1"
                name="address1"
                value={shippingInfo.address1}
                onChange={handleShippingInfoChange}
                placeholder="기본주소"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2">상세주소</Label>
              <Input
                id="address2"
                name="address2"
                value={shippingInfo.address2}
                onChange={handleShippingInfoChange}
                placeholder="상세주소"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">배송 메시지</Label>
              <Textarea
                id="message"
                name="message"
                value={shippingInfo.message}
                onChange={handleShippingInfoChange}
                placeholder="배송 시 요청사항을 입력해주세요"
                className="resize-none"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit">다음 단계</Button>
            </div>
          </form>
        )}

        {activeStep === "payment" && (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="font-medium mb-2">결제 금액</h3>
              <p className="font-medium">{totalPrice.toLocaleString()}원</p>
            </div>

            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  카드결제
                </TabsTrigger>
                <TabsTrigger value="other" disabled>
                  다른 결제수단
                </TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">
                    카드번호 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value.slice(0, 19))
                      setPaymentInfo((prev) => ({ ...prev, cardNumber: formatted }))
                    }}
                    placeholder="0000 0000 0000 0000"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">
                      유효기간 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      value={paymentInfo.cardExpiry}
                      onChange={(e) => {
                        const formatted = formatCardExpiry(e.target.value.slice(0, 5))
                        setPaymentInfo((prev) => ({ ...prev, cardExpiry: formatted }))
                      }}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">
                      CVC <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      value={paymentInfo.cardCvc}
                      onChange={handlePaymentInfoChange}
                      placeholder="000"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardOwner">
                    카드 소유자 이름 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cardOwner"
                    name="cardOwner"
                    value={paymentInfo.cardOwner}
                    onChange={handlePaymentInfoChange}
                    placeholder="카드에 표시된 이름을 입력해주세요"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installment">할부 선택</Label>
                  <Select value={paymentInfo.installment} onValueChange={handleInstallmentChange}>
                    <SelectTrigger id="installment">
                      <SelectValue placeholder="할부 개월 수 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">일시불</SelectItem>
                      <SelectItem value="2">2개월</SelectItem>
                      <SelectItem value="3">3개월</SelectItem>
                      <SelectItem value="4">4개월</SelectItem>
                      <SelectItem value="5">5개월</SelectItem>
                      <SelectItem value="6">6개월</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setActiveStep("shipping")}>
                이전 단계
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    결제 처리 중...
                  </>
                ) : (
                  "결제하기"
                )}
              </Button>
            </div>
          </form>
        )}

        {activeStep === "confirmation" && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold">주문이 완료되었습니다!</h3>
            <p className="text-gray-600">
              {shippingInfo.name}님, 주문해주셔서 감사합니다.
              <br />
              상품 준비가 완료되면 배송이 시작됩니다.
            </p>
            <div className="bg-gray-50 p-4 rounded-md text-left">
              <h4 className="font-medium mb-2">주문 정보</h4>
              <p className="text-sm text-gray-600 mb-1">상품: {productName}</p>
              <p className="text-sm text-gray-600 mb-1">옵션: {selectedOption}</p>
              <p className="text-sm text-gray-600 mb-1">수량: {quantity}개</p>
              <p className="text-sm text-gray-600 mb-1">결제금액: {totalPrice.toLocaleString()}원</p>
              <p className="text-sm text-gray-600">
                배송지: {shippingInfo.address1} {shippingInfo.address2}
              </p>
            </div>
            <Button onClick={onClose} className="mt-4">
              확인
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
