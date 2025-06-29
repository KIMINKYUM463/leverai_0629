import type { EnhancedElement, ElementMetadata, TextMetadata, ImageMetadata } from "../types/enhanced-element"

export class MetadataManager {
  // 요소에 메타태그 추가
  static addMetadata(element: any, metadata: ElementMetadata): EnhancedElement {
    return {
      ...element,
      metadata: {
        ...element.metadata,
        ...metadata,
      },
    }
  }

  // 텍스트 요소에 특화 메타데이터 추가
  static addTextMetadata(element: any, textMetadata: TextMetadata): EnhancedElement {
    return {
      ...element,
      metadata: {
        ...element.metadata,
        ...textMetadata,
      },
      textMetadata,
    }
  }

  // 이미지 요소에 특화 메타데이터 추가
  static addImageMetadata(element: any, imageMetadata: ImageMetadata): EnhancedElement {
    return {
      ...element,
      metadata: {
        ...element.metadata,
        ...imageMetadata,
      },
      imageMetadata,
    }
  }

  // AI 태그로 요소 찾기
  static findByAiTag(elements: EnhancedElement[], aiTag: string): EnhancedElement | undefined {
    return elements.find((element) => element.metadata?.aiTag === aiTag)
  }

  // 역할별 요소 찾기
  static findByRole(elements: EnhancedElement[], role: string): EnhancedElement[] {
    return elements.filter((element) => element.metadata?.role === role)
  }

  // 카테고리별 요소 찾기
  static findByCategory(elements: EnhancedElement[], category: string): EnhancedElement[] {
    return elements.filter((element) => element.metadata?.category === category)
  }

  // AI 대체 가능한 요소들만 필터링
  static getAiReplaceableElements(elements: EnhancedElement[]): EnhancedElement[] {
    return elements.filter((element) => element.metadata?.aiReplaceable === true)
  }

  // 우선순위별 정렬
  static sortByPriority(elements: EnhancedElement[]): EnhancedElement[] {
    return elements.sort((a, b) => (a.metadata?.priority || 999) - (b.metadata?.priority || 999))
  }
}
