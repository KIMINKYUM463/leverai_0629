import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const templateId = params.id

    console.log("🔍 API: 템플릿 요청 받음:", templateId)

    // 로컬 JSON 파일에서 템플릿 로드 (실제로는 Supabase에서 가져와야 함)
    let templatePath = ""

    switch (templateId) {
      case "template1":
        templatePath = "/template1.json"
        break
      case "template2":
        templatePath = "/template2.json"
        break
      case "template-complete":
        templatePath = "/template-complete.json"
        break
      default:
        templatePath = "/template1.json"
    }

    // 실제 파일 읽기 (public 폴더에서)
    const fs = require("fs")
    const path = require("path")
    const filePath = path.join(process.cwd(), "public", templatePath.replace("/", ""))

    console.log("📁 파일 경로:", filePath)

    const fileContent = fs.readFileSync(filePath, "utf8")
    const templateData = JSON.parse(fileContent)

    console.log("📄 API: 템플릿 데이터 로드 완료")
    console.log("🔢 요소 개수:", templateData.elements?.length || 0)

    // 이미지 프레임 개수 확인
    const imageFrames = templateData.elements?.filter((el: any) => el.type === "image-frame") || []
    console.log("🖼️ 이미지 프레임 개수:", imageFrames.length)

    // 각 이미지 프레임의 ID 로깅
    imageFrames.forEach((frame: any, index: number) => {
      console.log(`📷 이미지 프레임 ${index + 1} ID:`, frame.id)
    })

    return NextResponse.json(templateData)
  } catch (error) {
    console.error("❌ API 템플릿 로드 오류:", error)
    return NextResponse.json({ error: "Template not found" }, { status: 404 })
  }
}
