"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ImageIcon,
  ListOrdered,
  Table,
  BarChart,
  FileImage,
  Layout,
  Heading,
  NotepadTextIcon as Paragraph,
  Tag,
} from "lucide-react"

const tools = [
  {
    name: "제목",
    icon: Heading,
    description: "상품 제목 요소",
    type: "heading",
  },
  {
    name: "이미지",
    icon: ImageIcon,
    description: "상품 이미지 요소",
    type: "image",
  },
  {
    name: "텍스트",
    icon: Paragraph,
    description: "상품 설명 텍스트",
    type: "text",
  },
  {
    name: "목록",
    icon: ListOrdered,
    description: "순서 있는/없는 목록",
    type: "list",
  },
  {
    name: "표",
    icon: Table,
    description: "상품 스펙 테이블",
    type: "table",
  },
  {
    name: "차트",
    icon: BarChart,
    description: "데이터 시각화 차트",
    type: "chart",
  },
  {
    name: "배너",
    icon: FileImage,
    description: "홍보용 배너 이미지",
    type: "banner",
  },
  {
    name: "레이아웃",
    icon: Layout,
    description: "컨텐츠 레이아웃",
    type: "layout",
  },
  {
    name: "태그",
    icon: Tag,
    description: "상품 태그/라벨",
    type: "tag",
  },
]

export function PageBuilderToolbox({ onAddElement }) {
  return (
    <div className="space-y-3">
      <div className="bg-gray-50 p-3 rounded-md mb-3">
        <h3 className="font-medium text-sm mb-2">컴포넌트</h3>
        <p className="text-xs text-gray-500 mb-1">클릭하여 캔버스에 추가하세요</p>
      </div>

      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
        {tools.map((tool) => (
          <Card
            key={tool.name}
            className="p-3 cursor-pointer hover:bg-gray-50 hover:shadow-sm transition-all"
            onClick={() => onAddElement(tool.type, tool.name)}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-teal-50 flex items-center justify-center text-teal-600">
                <tool.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium text-sm">{tool.name}</div>
                <div className="text-xs text-gray-500">{tool.description}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-3 border-t mt-4">
        <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600">
          템플릿 불러오기
        </Button>
      </div>
    </div>
  )
}
