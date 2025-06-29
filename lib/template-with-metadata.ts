import { MetadataManager } from "./metadata-manager"

// 기존 템플릿 요소들에 메타태그 적용 예시
export function applyMetadataToTemplate(templateElements: any[]) {
  return templateElements.map((element) => {
    let updatedElement = { ...element }

    // 요소 내용에 따라 메타태그 자동 적용
    if (element.type === "text") {
      // 메인제목 식별
      if (element.content?.includes("메인제목") || element.styleName?.includes("메인")) {
        updatedElement = MetadataManager.addTextMetadata(updatedElement, {
          aiTag: "main-title",
          role: "main-title",
          category: "product-info",
          aiReplaceable: true,
          priority: 1,
          tone: "exciting",
          maxLength: 30,
        })
      }

      // 후킹제목 식별
      else if (element.content?.includes("후킹") || element.content?.includes("hook")) {
        updatedElement = MetadataManager.addTextMetadata(updatedElement, {
          aiTag: "hook-title",
          role: "hook-title",
          category: "marketing",
          aiReplaceable: true,
          priority: 2,
          tone: "urgent",
          maxLength: 50,
        })
      }

      // 가격 식별
      else if (element.content?.includes("원") || element.content?.includes("₩") || element.content?.includes("가격")) {
        updatedElement = MetadataManager.addTextMetadata(updatedElement, {
          aiTag: "price",
          role: "price",
          category: "pricing",
          aiReplaceable: true,
          priority: 3,
          tone: "professional",
        })
      }

      // 리뷰 식별
      else if (element.content?.includes("리뷰") || element.content?.includes("★")) {
        updatedElement = MetadataManager.addTextMetadata(updatedElement, {
          aiTag: `review-${element.id}`,
          role: "review",
          category: "social-proof",
          aiReplaceable: true,
          priority: 5,
          tone: "trustworthy",
        })
      }
    }

    // 이미지 프레임에 메타태그 적용
    else if (element.type === "image-frame" || element.type === "image") {
      // 메인 상품 이미지로 추정되는 경우
      if (element.size?.width > 400 && element.position?.y < 1000) {
        updatedElement = MetadataManager.addImageMetadata(updatedElement, {
          aiTag: "main-product-image",
          role: "main-title",
          category: "product-info",
          imageType: "product-main",
          aiReplaceable: true,
          generateAI: true,
          priority: 1,
          altTextTemplate: "{상품명} 메인 이미지",
        })
      }

      // 상세 이미지로 추정되는 경우
      else {
        updatedElement = MetadataManager.addImageMetadata(updatedElement, {
          aiTag: `detail-image-${element.id}`,
          role: "feature",
          category: "product-info",
          imageType: "product-detail",
          aiReplaceable: true,
          generateAI: false,
          priority: 4,
          altTextTemplate: "{상품명} 상세 이미지",
        })
      }
    }

    return updatedElement
  })
}
