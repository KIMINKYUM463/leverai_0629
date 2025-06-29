// 요소 메타데이터 타입 정의
export interface ElementMetadata {
  // AI 바인딩을 위한 식별자
  aiTag?: string

  // 요소의 역할/용도
  role?:
    | "main-title"
    | "hook-title"
    | "sub-title"
    | "description"
    | "price"
    | "benefit"
    | "review"
    | "cta"
    | "feature"
    | "warning"
    | "guarantee"

  // 콘텐츠 카테고리
  category?: "product-info" | "marketing" | "social-proof" | "pricing" | "features" | "safety" | "ordering"

  // AI 대체 가능 여부
  aiReplaceable?: boolean

  // 우선순위 (AI 처리 순서)
  priority?: number

  // 추가 속성
  attributes?: {
    [key: string]: any
  }
}

// 이미지 메타데이터
export interface ImageMetadata extends ElementMetadata {
  imageType?:
    | "product-main"
    | "product-detail"
    | "lifestyle"
    | "comparison"
    | "infographic"
    | "testimonial"
    | "background"
  altTextTemplate?: string
  generateAI?: boolean
}

// 텍스트 메타데이터
export interface TextMetadata extends ElementMetadata {
  textType?: "headline" | "body" | "caption" | "label" | "quote"
  tone?: "professional" | "friendly" | "urgent" | "trustworthy" | "exciting"
  maxLength?: number
  keywords?: string[]
}
