import type { EnhancedElement } from "../types/enhanced-element"
import { MetadataManager } from "./metadata-manager"

export interface AIContentData {
  mainTitle?: string
  hookTitle?: string
  subTitle?: string
  description?: string
  price?: string
  benefits?: string[]
  features?: string[]
  reviews?: Array<{
    rating: number
    text: string
    author: string
  }>
  images?: Array<{
    type: string
    url: string
    alt: string
  }>
}

export class AITemplateProcessor {
  // AI 데이터로 템플릿 요소들 업데이트
  static processTemplate(elements: EnhancedElement[], aiData: AIContentData): EnhancedElement[] {
    return elements.map((element) => {
      if (!element.metadata?.aiReplaceable) {
        return element
      }

      const updatedElement = { ...element }

      // 역할별 처리
      switch (element.metadata.role) {
        case "main-title":
          if (aiData.mainTitle && element.type === "text") {
            updatedElement.content = aiData.mainTitle
          }
          break

        case "hook-title":
          if (aiData.hookTitle && element.type === "text") {
            updatedElement.content = aiData.hookTitle
          }
          break

        case "description":
          if (aiData.description && element.type === "text") {
            updatedElement.content = aiData.description
          }
          break

        case "price":
          if (aiData.price && element.type === "text") {
            updatedElement.content = aiData.price
          }
          break

        case "benefit":
          if (aiData.benefits && element.type === "text") {
            const index = element.metadata.attributes?.benefitIndex || 0
            if (aiData.benefits[index]) {
              updatedElement.content = aiData.benefits[index]
            }
          }
          break

        case "feature":
          if (aiData.features && element.type === "text") {
            const index = element.metadata.attributes?.featureIndex || 0
            if (aiData.features[index]) {
              updatedElement.content = aiData.features[index]
            }
          }
          break
      }

      // 이미지 처리
      if (element.type === "image" || element.type === "image-frame") {
        const imageType = element.imageMetadata?.imageType
        const matchingImage = aiData.images?.find((img) => img.type === imageType)

        if (matchingImage) {
          updatedElement.imageSrc = matchingImage.url
          updatedElement.imageFileName = matchingImage.alt
        }
      }

      return updatedElement
    })
  }

  // 템플릿에서 AI 대체 가능한 요소들의 구조 분석
  static analyzeTemplate(elements: EnhancedElement[]) {
    const replaceableElements = MetadataManager.getAiReplaceableElements(elements)

    const analysis = {
      totalElements: elements.length,
      replaceableElements: replaceableElements.length,
      roles: {} as Record<string, number>,
      categories: {} as Record<string, number>,
      imageTypes: {} as Record<string, number>,
    }

    replaceableElements.forEach((element) => {
      // 역할별 카운트
      if (element.metadata?.role) {
        analysis.roles[element.metadata.role] = (analysis.roles[element.metadata.role] || 0) + 1
      }

      // 카테고리별 카운트
      if (element.metadata?.category) {
        analysis.categories[element.metadata.category] = (analysis.categories[element.metadata.category] || 0) + 1
      }

      // 이미지 타입별 카운트
      if (element.imageMetadata?.imageType) {
        analysis.imageTypes[element.imageMetadata.imageType] =
          (analysis.imageTypes[element.imageMetadata.imageType] || 0) + 1
      }
    })

    return analysis
  }
}
