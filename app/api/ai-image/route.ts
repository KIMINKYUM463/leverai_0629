import { NextResponse } from "next/server"
import { generateAndSaveImage } from "@/lib/replicate-image-generation"

export async function POST(req: Request) {
  try {
    const { prompt, keyword } = await req.json()
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ success: false, error: "Invalid prompt" }, { status: 400 })
    }

    /* always 200 so the client flow never breaks */
    const result = await generateAndSaveImage(prompt, keyword ?? "")
    return NextResponse.json(result)
  } catch (e) {
    console.error("/api/ai-image fatal:", e)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
