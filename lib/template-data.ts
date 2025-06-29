// 템플릿 데이터 타입 정의
export interface TemplateData {
  id: number
  name: string
  description: string
  image: string
  category?: string
  tags?: string[]
  isNew?: boolean
}

// 템플릿 목록 데이터를 업데이트하여 새로운 완전한 템플릿을 추가
export const templates: TemplateData[] = [
  {
    id: 1,
    name: "템플릿1",
    description: "상품 상세페이지 템플릿",
    image: "/template1-mobile-preview.png", // 새로운 이미지로 변경
    category: "완성형",
    tags: ["완전한", "상세페이지", "상품"],
    isNew: true,
  },
]

// 템플릿 ID로 템플릿 데이터 찾기
export function getTemplateById(id: number): TemplateData | undefined {
  return templates.find((template) => template.id === id)
}

// 키워드에 맞는 템플릿 필터링 - 모든 키워드에 대해 템플릿1만 반환
export function filterTemplatesByKeyword(keyword: string): TemplateData[] {
  return templates
}

// 카테고리별 템플릿 그룹화
export function groupTemplatesByCategory(): Record<string, TemplateData[]> {
  return templates.reduce(
    (groups, template) => {
      const category = template.category || "기타"
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(template)
      return groups
    },
    {} as Record<string, TemplateData[]>,
  )
}
