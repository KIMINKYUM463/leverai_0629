import type { ElementMetadata, ImageMetadata, TextMetadata } from "./element-metadata"

// 기존 요소 타입을 확장
export interface EnhancedElement {
  id: string
  type: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation?: number
  zIndex?: number

  // 메타데이터 추가
  metadata?: ElementMetadata

  // 타입별 특화 메타데이터
  textMetadata?: TextMetadata
  imageMetadata?: ImageMetadata

  // 기존 속성들...
  [key: string]: any
}
