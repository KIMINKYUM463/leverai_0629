"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Download, Zap } from "lucide-react"
import { useTemplateManagement } from "@/hooks/use-template-management"
import { Plus, Search, Sparkles } from "lucide-react"
import { useState } from "react"

interface TemplatesPanelProps {
  setElements: (elements: any[] | ((prev: any[]) => any[])) => void
  setSelectedElementId: (id: string | null) => void
}

export function TemplatesPanel({ setElements, setSelectedElementId }: TemplatesPanelProps) {
  const { applyTemplate, quickApplyTemplate, isLoading } = useTemplateManagement(setElements, setSelectedElementId)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // 사용 가능한 템플릿 목록
  const templates = [
    {
      id: "template1",
      name: "기본 상품 소개",
      description: "농산물 상품 소개에 최적화된 기본 템플릿",
      path: "/template1.json",
      preview: "/template1-preview.png",
      category: "상품소개",
      imageFrameCount: 12,
    },
    {
      id: "template2",
      name: "프리미엄 레이아웃",
      description: "고급스러운 디자인의 프리미엄 템플릿",
      path: "/template2.json",
      preview: "/premium-template.png",
      category: "프리미엄",
      imageFrameCount: 8,
    },
    {
      id: "template-complete",
      name: "완성형 템플릿",
      description: "모든 요소가 포함된 완성형 템플릿",
      path: "/template-complete.json",
      preview: "/eco-friendly-template.png",
      category: "완성형",
      imageFrameCount: 15,
    },
  ]

  const handleApplyTemplate = async (templatePath: string, templateId: string) => {
    setSelectedTemplate(templateId)
    console.log("🎨 템플릿 적용 시작:", { templateId, templatePath })
    await applyTemplate(templatePath)
    setSelectedTemplate(null)
  }

  const handleQuickApply = async (templatePath: string, templateId: string) => {
    setSelectedTemplate(templateId)
    console.log("⚡ 빠른 템플릿 적용:", { templateId, templatePath })
    await quickApplyTemplate(templatePath)
    setSelectedTemplate(null)
  }

  // Premium 템플릿 적용 함수
  const handleApplyPremiumTemplate = () => {
    const premiumElements = [
      // 1. 헤더 컨테이너 (부모)
      {
        id: "header-container",
        type: "shape",
        shapeType: "rectangle",
        name: "헤더 컨테이너",
        position: { x: 50, y: 50 },
        size: { width: 760, height: 120 },
        rotation: 0,
        zIndex: 1,
        backgroundColor: "#1f2937",
        borderColor: "transparent",
        borderWidth: 0,
        borderStyle: "solid",
        borderRadius: 12,
        opacity: 1,
        children: ["header-title", "header-subtitle"],
      },

      // 헤더 제목 (자식)
      {
        id: "header-title",
        type: "text",
        textStyle: "heading",
        styleName: "제목",
        content: "농산물 직거래 플랫폼",
        parentId: "header-container",
        relativePosition: { x: 40, y: 25 },
        position: { x: 90, y: 75 },
        size: { width: 400, height: 40 },
        rotation: 0,
        zIndex: 2,
        color: "#ffffff",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 28,
          fontFamily: "Inter",
          fontWeight: "700",
          textAlign: "left",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 헤더 부제목 (자식)
      {
        id: "header-subtitle",
        type: "text",
        textStyle: "body",
        styleName: "부제목",
        content: "신선한 농산물을 농장에서 직접",
        parentId: "header-container",
        relativePosition: { x: 40, y: 70 },
        position: { x: 90, y: 120 },
        size: { width: 300, height: 25 },
        rotation: 0,
        zIndex: 2,
        color: "#d1d5db",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "left",
          lineHeight: 1.5,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 2. 상품 카드 컨테이너 (부모)
      {
        id: "product-card",
        type: "shape",
        shapeType: "rectangle",
        name: "상품 카드",
        position: { x: 50, y: 200 },
        size: { width: 350, height: 400 },
        rotation: 0,
        zIndex: 3,
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 16,
        opacity: 1,
        children: ["product-image", "product-title", "product-price", "product-description"],
      },

      // 상품 이미지 (자식)
      {
        id: "product-image",
        type: "image-frame",
        shapeType: "rectangle-frame",
        name: "상품 이미지",
        parentId: "product-card",
        relativePosition: { x: 20, y: 20 },
        position: { x: 70, y: 220 },
        size: { width: 310, height: 200 },
        rotation: 0,
        zIndex: 4,
        backgroundColor: "#f3f4f6",
        borderColor: "#d1d5db",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 12,
        opacity: 1,
        imageSrc: "/fresh-produce.png",
        imageFileName: "fresh-produce.png",
        imageOpacity: 1,
        imageFit: "cover",
        imageScale: 1,
        imageOffsetX: 0,
        imageOffsetY: 0,
      },

      // 상품 제목 (자식)
      {
        id: "product-title",
        type: "text",
        textStyle: "heading",
        styleName: "상품명",
        content: "유기농 토마토",
        parentId: "product-card",
        relativePosition: { x: 20, y: 240 },
        position: { x: 70, y: 440 },
        size: { width: 200, height: 30 },
        rotation: 0,
        zIndex: 4,
        color: "#111827",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 20,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "left",
          lineHeight: 1.3,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 상품 가격 (자식)
      {
        id: "product-price",
        type: "text",
        textStyle: "price",
        styleName: "가격",
        content: "15,000원/kg",
        parentId: "product-card",
        relativePosition: { x: 20, y: 280 },
        position: { x: 70, y: 480 },
        size: { width: 150, height: 25 },
        rotation: 0,
        zIndex: 4,
        color: "#dc2626",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 18,
          fontFamily: "Inter",
          fontWeight: "700",
          textAlign: "left",
          lineHeight: 1.4,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 상품 설명 (자식)
      {
        id: "product-description",
        type: "text",
        textStyle: "body",
        styleName: "설명",
        content: "농약을 사용하지 않고 자연 그대로 키운 신선한 토마토입니다.",
        parentId: "product-card",
        relativePosition: { x: 20, y: 315 },
        position: { x: 70, y: 515 },
        size: { width: 310, height: 60 },
        rotation: 0,
        zIndex: 4,
        color: "#6b7280",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "left",
          lineHeight: 1.5,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 3. 버튼 그룹 컨테이너 (부모)
      {
        id: "button-group",
        type: "group",
        name: "버튼 그룹",
        position: { x: 460, y: 200 },
        size: { width: 350, height: 200 },
        rotation: 0,
        zIndex: 5,
        children: ["buy-button", "cart-button", "wishlist-button"],
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
      },

      // 구매 버튼 (자식)
      {
        id: "buy-button",
        type: "shape",
        shapeType: "rectangle",
        name: "구매 버튼",
        parentId: "button-group",
        relativePosition: { x: 0, y: 0 },
        position: { x: 460, y: 200 },
        size: { width: 350, height: 50 },
        rotation: 0,
        zIndex: 6,
        backgroundColor: "#059669",
        borderColor: "transparent",
        borderWidth: 0,
        borderStyle: "solid",
        borderRadius: 8,
        opacity: 1,
        children: ["buy-button-text"],
      },

      // 구매 버튼 텍스트 (자식의 자식)
      {
        id: "buy-button-text",
        type: "text",
        textStyle: "button",
        styleName: "버튼 텍스트",
        content: "지금 구매하기",
        parentId: "buy-button",
        relativePosition: { x: 125, y: 15 },
        position: { x: 585, y: 215 },
        size: { width: 100, height: 20 },
        rotation: 0,
        zIndex: 7,
        color: "#ffffff",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 장바구니 버튼 (자식)
      {
        id: "cart-button",
        type: "shape",
        shapeType: "rectangle",
        name: "장바구니 버튼",
        parentId: "button-group",
        relativePosition: { x: 0, y: 70 },
        position: { x: 460, y: 270 },
        size: { width: 170, height: 50 },
        rotation: 0,
        zIndex: 6,
        backgroundColor: "#ffffff",
        borderColor: "#059669",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 8,
        opacity: 1,
        children: ["cart-button-text"],
      },

      // 장바구니 버튼 텍스트 (자식의 자식)
      {
        id: "cart-button-text",
        type: "text",
        textStyle: "button",
        styleName: "버튼 텍스트",
        content: "장바구니",
        parentId: "cart-button",
        relativePosition: { x: 60, y: 15 },
        position: { x: 520, y: 285 },
        size: { width: 50, height: 20 },
        rotation: 0,
        zIndex: 7,
        color: "#059669",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 찜하기 버튼 (자식)
      {
        id: "wishlist-button",
        type: "shape",
        shapeType: "rectangle",
        name: "찜하기 버튼",
        parentId: "button-group",
        relativePosition: { x: 180, y: 70 },
        position: { x: 640, y: 270 },
        size: { width: 170, height: 50 },
        rotation: 0,
        zIndex: 6,
        backgroundColor: "#ffffff",
        borderColor: "#6b7280",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 8,
        opacity: 1,
        children: ["wishlist-button-text"],
      },

      // 찜하기 버튼 텍스트 (자식의 자식)
      {
        id: "wishlist-button-text",
        type: "text",
        textStyle: "button",
        styleName: "버튼 텍스트",
        content: "찜하기",
        parentId: "wishlist-button",
        relativePosition: { x: 70, y: 15 },
        position: { x: 710, y: 285 },
        size: { width: 30, height: 20 },
        rotation: 0,
        zIndex: 7,
        color: "#6b7280",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 4. 정보 섹션 컨테이너 (부모)
      {
        id: "info-section",
        type: "shape",
        shapeType: "rectangle",
        name: "정보 섹션",
        position: { x: 50, y: 650 },
        size: { width: 760, height: 300 },
        rotation: 0,
        zIndex: 8,
        backgroundColor: "#f9fafb",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 12,
        opacity: 1,
        children: ["info-title", "info-content", "farmer-info"],
      },

      // 정보 제목 (자식)
      {
        id: "info-title",
        type: "text",
        textStyle: "heading",
        styleName: "섹션 제목",
        content: "상품 상세 정보",
        parentId: "info-section",
        relativePosition: { x: 30, y: 30 },
        position: { x: 80, y: 680 },
        size: { width: 200, height: 30 },
        rotation: 0,
        zIndex: 9,
        color: "#111827",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 22,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "left",
          lineHeight: 1.3,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 정보 내용 (자식)
      {
        id: "info-content",
        type: "text",
        textStyle: "body",
        styleName: "본문",
        content:
          "이 토마토는 경기도 양평의 친환경 농장에서 재배되었습니다. 화학비료나 농약을 일절 사용하지 않고, 자연 그대로의 방법으로 키워낸 프리미엄 토마토입니다.\n\n• 재배지역: 경기도 양평\n• 재배방법: 무농약 유기농법\n• 수확시기: 매일 아침 신선하게\n• 배송: 수확 당일 포장 발송",
        parentId: "info-section",
        relativePosition: { x: 30, y: 80 },
        position: { x: 80, y: 730 },
        size: { width: 450, height: 180 },
        rotation: 0,
        zIndex: 9,
        color: "#374151",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "left",
          lineHeight: 1.6,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 농부 정보 (자식)
      {
        id: "farmer-info",
        type: "shape",
        shapeType: "rectangle",
        name: "농부 정보",
        parentId: "info-section",
        relativePosition: { x: 520, y: 80 },
        position: { x: 570, y: 730 },
        size: { width: 200, height: 180 },
        rotation: 0,
        zIndex: 9,
        backgroundColor: "#ffffff",
        borderColor: "#d1d5db",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 8,
        opacity: 1,
        children: ["farmer-name", "farmer-experience"],
      },

      // 농부 이름 (자식의 자식)
      {
        id: "farmer-name",
        type: "text",
        textStyle: "heading",
        styleName: "농부명",
        content: "김농부",
        parentId: "farmer-info",
        relativePosition: { x: 20, y: 20 },
        position: { x: 590, y: 750 },
        size: { width: 100, height: 25 },
        rotation: 0,
        zIndex: 10,
        color: "#111827",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 18,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "left",
          lineHeight: 1.3,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 농부 경력 (자식의 자식)
      {
        id: "farmer-experience",
        type: "text",
        textStyle: "body",
        styleName: "경력",
        content: '농업 경력 15년\n유기농 인증 농장 운영\n\n"정성과 사랑으로 키운 농산물을 여러분께 전해드립니다."',
        parentId: "farmer-info",
        relativePosition: { x: 20, y: 55 },
        position: { x: 590, y: 785 },
        size: { width: 160, height: 100 },
        rotation: 0,
        zIndex: 10,
        color: "#6b7280",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "left",
          lineHeight: 1.5,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },
    ]

    if (setElements) {
      setElements(premiumElements)
    }
  }

  // 계층 구조 디자인 템플릿 생성 함수
  const createHierarchicalDesign = () => {
    const hierarchicalElements = [
      // 1. 헤더 컨테이너 (부모)
      {
        id: "header-container",
        type: "shape",
        shapeType: "rectangle",
        name: "헤더 컨테이너",
        position: { x: 50, y: 50 },
        size: { width: 760, height: 120 },
        rotation: 0,
        zIndex: 1,
        backgroundColor: "#1f2937",
        borderColor: "transparent",
        borderWidth: 0,
        borderStyle: "solid",
        borderRadius: 12,
        opacity: 1,
        children: ["header-title", "header-subtitle"],
      },

      // 헤더 제목 (자식)
      {
        id: "header-title",
        type: "text",
        textStyle: "heading",
        styleName: "제목",
        content: "농산물 직거래 플랫폼",
        parentId: "header-container",
        relativePosition: { x: 40, y: 25 },
        position: { x: 90, y: 75 },
        size: { width: 400, height: 40 },
        rotation: 0,
        zIndex: 2,
        color: "#ffffff",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 28,
          fontFamily: "Inter",
          fontWeight: "700",
          textAlign: "left",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 헤더 부제목 (자식)
      {
        id: "header-subtitle",
        type: "text",
        textStyle: "body",
        styleName: "부제목",
        content: "신선한 농산물을 농장에서 직접",
        parentId: "header-container",
        relativePosition: { x: 40, y: 70 },
        position: { x: 90, y: 120 },
        size: { width: 300, height: 25 },
        rotation: 0,
        zIndex: 2,
        color: "#d1d5db",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "left",
          lineHeight: 1.5,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 2. 상품 카드 컨테이너 (부모)
      {
        id: "product-card",
        type: "shape",
        shapeType: "rectangle",
        name: "상품 카드",
        position: { x: 50, y: 200 },
        size: { width: 350, height: 400 },
        rotation: 0,
        zIndex: 3,
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 16,
        opacity: 1,
        children: ["product-image", "product-title", "product-price", "product-description"],
      },

      // 상품 이미지 (자식)
      {
        id: "product-image",
        type: "image-frame",
        shapeType: "rectangle-frame",
        name: "상품 이미지",
        parentId: "product-card",
        relativePosition: { x: 20, y: 20 },
        position: { x: 70, y: 220 },
        size: { width: 310, height: 200 },
        rotation: 0,
        zIndex: 4,
        backgroundColor: "#f3f4f6",
        borderColor: "#d1d5db",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 12,
        opacity: 1,
        imageSrc: "/fresh-produce.png",
        imageFileName: "fresh-produce.png",
        imageOpacity: 1,
        imageFit: "cover",
        imageScale: 1,
        imageOffsetX: 0,
        imageOffsetY: 0,
      },

      // 상품 제목 (자식)
      {
        id: "product-title",
        type: "text",
        textStyle: "heading",
        styleName: "상품명",
        content: "유기농 토마토",
        parentId: "product-card",
        relativePosition: { x: 20, y: 240 },
        position: { x: 70, y: 440 },
        size: { width: 200, height: 30 },
        rotation: 0,
        zIndex: 4,
        color: "#111827",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 20,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "left",
          lineHeight: 1.3,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 상품 가격 (자식)
      {
        id: "product-price",
        type: "text",
        textStyle: "price",
        styleName: "가격",
        content: "15,000원/kg",
        parentId: "product-card",
        relativePosition: { x: 20, y: 280 },
        position: { x: 70, y: 480 },
        size: { width: 150, height: 25 },
        rotation: 0,
        zIndex: 4,
        color: "#dc2626",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 18,
          fontFamily: "Inter",
          fontWeight: "700",
          textAlign: "left",
          lineHeight: 1.4,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 상품 설명 (자식)
      {
        id: "product-description",
        type: "text",
        textStyle: "body",
        styleName: "설명",
        content: "농약을 사용하지 않고 자연 그대로 키운 신선한 토마토입니다.",
        parentId: "product-card",
        relativePosition: { x: 20, y: 315 },
        position: { x: 70, y: 515 },
        size: { width: 310, height: 60 },
        rotation: 0,
        zIndex: 4,
        color: "#6b7280",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "left",
          lineHeight: 1.5,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 3. 버튼 그룹 컨테이너 (부모)
      {
        id: "button-group",
        type: "group",
        name: "버튼 그룹",
        position: { x: 460, y: 200 },
        size: { width: 350, height: 200 },
        rotation: 0,
        zIndex: 5,
        children: ["buy-button", "cart-button", "wishlist-button"],
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
      },

      // 구매 버튼 (자식)
      {
        id: "buy-button",
        type: "shape",
        shapeType: "rectangle",
        name: "구매 버튼",
        parentId: "button-group",
        relativePosition: { x: 0, y: 0 },
        position: { x: 460, y: 200 },
        size: { width: 350, height: 50 },
        rotation: 0,
        zIndex: 6,
        backgroundColor: "#059669",
        borderColor: "transparent",
        borderWidth: 0,
        borderStyle: "solid",
        borderRadius: 8,
        opacity: 1,
        children: ["buy-button-text"],
      },

      // 구매 버튼 텍스트 (자식의 자식)
      {
        id: "buy-button-text",
        type: "text",
        textStyle: "button",
        styleName: "버튼 텍스트",
        content: "지금 구매하기",
        parentId: "buy-button",
        relativePosition: { x: 125, y: 15 },
        position: { x: 585, y: 215 },
        size: { width: 100, height: 20 },
        rotation: 0,
        zIndex: 7,
        color: "#ffffff",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 장바구니 버튼 (자식)
      {
        id: "cart-button",
        type: "shape",
        shapeType: "rectangle",
        name: "장바구니 버튼",
        parentId: "button-group",
        relativePosition: { x: 0, y: 70 },
        position: { x: 460, y: 270 },
        size: { width: 170, height: 50 },
        rotation: 0,
        zIndex: 6,
        backgroundColor: "#ffffff",
        borderColor: "#059669",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 8,
        opacity: 1,
        children: ["cart-button-text"],
      },

      // 장바구니 버튼 텍스트 (자식의 자식)
      {
        id: "cart-button-text",
        type: "text",
        textStyle: "button",
        styleName: "버튼 텍스트",
        content: "장바구니",
        parentId: "cart-button",
        relativePosition: { x: 60, y: 15 },
        position: { x: 520, y: 285 },
        size: { width: 50, height: 20 },
        rotation: 0,
        zIndex: 7,
        color: "#059669",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 찜하기 버튼 (자식)
      {
        id: "wishlist-button",
        type: "shape",
        shapeType: "rectangle",
        name: "찜하기 버튼",
        parentId: "button-group",
        relativePosition: { x: 180, y: 70 },
        position: { x: 640, y: 270 },
        size: { width: 170, height: 50 },
        rotation: 0,
        zIndex: 6,
        backgroundColor: "#ffffff",
        borderColor: "#6b7280",
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 8,
        opacity: 1,
        children: ["wishlist-button-text"],
      },

      // 찜하기 버튼 텍스트 (자식의 자식)
      {
        id: "wishlist-button-text",
        type: "text",
        textStyle: "button",
        styleName: "버튼 텍스트",
        content: "찜하기",
        parentId: "wishlist-button",
        relativePosition: { x: 70, y: 15 },
        position: { x: 710, y: 285 },
        size: { width: 30, height: 20 },
        rotation: 0,
        zIndex: 7,
        color: "#6b7280",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 16,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 4. 정보 섹션 컨테이너 (부모)
      {
        id: "info-section",
        type: "shape",
        shapeType: "rectangle",
        name: "정보 섹션",
        position: { x: 50, y: 650 },
        size: { width: 760, height: 300 },
        rotation: 0,
        zIndex: 8,
        backgroundColor: "#f9fafb",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 12,
        opacity: 1,
        children: ["info-title", "info-content", "farmer-info"],
      },

      // 정보 제목 (자식)
      {
        id: "info-title",
        type: "text",
        textStyle: "heading",
        styleName: "섹션 제목",
        content: "상품 상세 정보",
        parentId: "info-section",
        relativePosition: { x: 30, y: 30 },
        position: { x: 80, y: 680 },
        size: { width: 200, height: 30 },
        rotation: 0,
        zIndex: 9,
        color: "#111827",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 22,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "left",
          lineHeight: 1.3,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 정보 내용 (자식)
      {
        id: "info-content",
        type: "text",
        textStyle: "body",
        styleName: "본문",
        content:
          "이 토마토는 경기도 양평의 친환경 농장에서 재배되었습니다. 화학비료나 농약을 일절 사용하지 않고, 자연 그대로의 방법으로 키워낸 프리미엄 토마토입니다.\n\n• 재배지역: 경기도 양평\n• 재배방법: 무농약 유기농법\n• 수확시기: 매일 아침 신선하게\n• 배송: 수확 당일 포장 발송",
        parentId: "info-section",
        relativePosition: { x: 30, y: 80 },
        position: { x: 80, y: 730 },
        size: { width: 450, height: 180 },
        rotation: 0,
        zIndex: 9,
        color: "#374151",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "left",
          lineHeight: 1.6,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 농부 정보 (자식)
      {
        id: "farmer-info",
        type: "shape",
        shapeType: "rectangle",
        name: "농부 정보",
        parentId: "info-section",
        relativePosition: { x: 520, y: 80 },
        position: { x: 570, y: 730 },
        size: { width: 200, height: 180 },
        rotation: 0,
        zIndex: 9,
        backgroundColor: "#ffffff",
        borderColor: "#d1d5db",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 8,
        opacity: 1,
        children: ["farmer-name", "farmer-experience"],
      },

      // 농부 이름 (자식의 자식)
      {
        id: "farmer-name",
        type: "text",
        textStyle: "heading",
        styleName: "농부명",
        content: "김농부",
        parentId: "farmer-info",
        relativePosition: { x: 20, y: 20 },
        position: { x: 590, y: 750 },
        size: { width: 100, height: 25 },
        rotation: 0,
        zIndex: 10,
        color: "#111827",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 18,
          fontFamily: "Inter",
          fontWeight: "600",
          textAlign: "left",
          lineHeight: 1.3,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },

      // 농부 경력 (자식의 자식)
      {
        id: "farmer-experience",
        type: "text",
        textStyle: "body",
        styleName: "경력",
        content: '농업 경력 15년\n유기농 인증 농장 운영\n\n"정성과 사랑으로 키운 농산물을 여러분께 전해드립니다."',
        parentId: "farmer-info",
        relativePosition: { x: 20, y: 55 },
        position: { x: 590, y: 785 },
        size: { width: 160, height: 100 },
        rotation: 0,
        zIndex: 10,
        color: "#6b7280",
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: "400",
          textAlign: "left",
          lineHeight: 1.5,
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
      },
    ]

    if (setElements) {
      setElements(hierarchicalElements)
    }
  }

  // 검색어로 템플릿 필터링
  const filteredTemplates = searchQuery
    ? templates.filter(
        (template) =>
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (template.tags && template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
      )
    : templates.slice(0, 8) // 검색어가 없으면 처음 8개만 표시

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">템플릿</h3>
        <Badge variant="secondary" className="text-xs">
          {templates.length}개 사용 가능
        </Badge>
      </div>

      <div className="space-y-3">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              {/* 템플릿 미리보기 이미지 */}
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <img
                  src={template.preview || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=120&width=200&text=Template+Preview"
                  }}
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="text-xs bg-white/90">
                    {template.imageFrameCount}개 프레임
                  </Badge>
                </div>
              </div>

              {/* 템플릿 정보 */}
              <div className="p-3 space-y-2">
                <div>
                  <h4 className="font-medium text-sm text-gray-900">{template.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                </div>

                {/* 액션 버튼들 */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 h-8 text-xs"
                    onClick={() => handleApplyTemplate(template.path, template.id)}
                    disabled={isLoading}
                  >
                    {isLoading && selectedTemplate === template.id ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        적용중...
                      </>
                    ) : (
                      <>
                        <Download className="h-3 w-3 mr-1" />
                        적용
                      </>
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={() => handleQuickApply(template.path, template.id)}
                    disabled={isLoading}
                    title="기존 요소를 유지하면서 템플릿 추가"
                  >
                    <Zap className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 템플릿 사용 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="text-xs text-blue-800">
          <p className="font-medium mb-1">💡 템플릿 사용 팁</p>
          <ul className="space-y-1 text-blue-700">
            <li>
              • <strong>적용</strong>: 기존 요소를 모두 교체
            </li>
            <li>
              • <strong>⚡ 버튼</strong>: 기존 요소 유지하면서 추가
            </li>
            <li>• 각 이미지 프레임은 고유한 AI 프롬프트를 가집니다</li>
          </ul>
        </div>
      </div>

      {/* 빠른 템플릿 섹션 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">빠른 템플릿</h3>
        <Button
          onClick={handleApplyPremiumTemplate}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
        >
          <Sparkles size={14} className="mr-2" />🎨 Premium 디자인
        </Button>

        <Button
          onClick={createHierarchicalDesign}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          🏗️ 계층 구조 디자인
        </Button>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-700"></div>

      {/* 검색 */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={14} />
        <input
          type="text"
          placeholder="템플릿 검색..."
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 pl-8 text-sm text-gray-200 placeholder-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 기존 템플릿들 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-300">저장된 템플릿</h3>
        <div className="grid grid-cols-2 gap-3">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <div key={template.id} className="cursor-pointer group">
                <div className="bg-gray-800 rounded overflow-hidden aspect-[3/2] mb-1 group-hover:ring-1 group-hover:ring-gray-500 relative">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  {template.isNew && (
                    <div className="absolute top-1 right-1 bg-teal-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                      NEW
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate">{template.name}</p>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500 text-sm">저장된 템플릿이 없습니다</div>
          )}
        </div>
      </div>

      <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
        <Plus size={14} className="mr-1" /> 새 템플릿 만들기
      </Button>
    </div>
  )
}
