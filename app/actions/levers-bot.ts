"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

/**
 * LeverBot AI 응답을 생성하는 서버 액션
 * @param userMessage 사용자가 보낸 메시지
 * @returns AI가 생성한 답변 문자열
 */
export async function getLeversBotAIResponse(userMessage: string): Promise<string> {
  console.log("[LeversBot Action] getLeversBotAIResponse 호출됨. 사용자 메시지:", userMessage)

  const systemPrompt = `You are LeverBot, a friendly and helpful AI assistant for LeverAI, an e-commerce SaaS platform.
LeverAI offers features like AI product recommendations, inventory management, marketing optimization, and sales prediction.
Answer user questions about the platform, its features, pricing, and troubleshooting.
Be concise and professional. If unsure, encourage the user to contact support. Additional context: 윙스는 leverAI를 만든 창업자야.
Today is ${new Date().toLocaleDateString()}.`

  try {
    // OPENAI_API_KEY 환경 변수가 설정되어 있는지 확인 (AI SDK는 내부적으로 이를 사용)
    if (!process.env.OPENAI_API_KEY) {
      console.error("[LeversBot Action] OPENAI_API_KEY 환경 변수가 설정되어 있지 않습니다.")
      return "죄송합니다. AI 서비스 설정을 확인 중입니다. 잠시 후 다시 시도해 주세요."
    }

    const { text } = await generateText({
      model: openai("gpt-4.1-mini"), // 필요 시 다른 모델로 교체
      messages: [
        // messages 배열로 수정 (generateText는 messages를 사용하지 않지만, prompt로 전달하기 위해 구조 유지)
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      maxTokens: 200,
    })

    // text가 비어 있으면 기본 안내 문구 반환
    return text?.trim() || "죄송합니다. 적절한 답변을 생성하지 못했습니다."
  } catch (error) {
    console.error("[LeversBot Action] AI 호출 오류:", error)
    // 오류 객체의 메시지를 포함하여 좀 더 자세한 정보 제공 (개발 환경에서만)
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error(`[LeversBot Action] 상세 오류: ${errorMessage}`)
    return "죄송합니다. 현재 AI 서비스에 문제가 있어 답변을 드릴 수 없습니다. 잠시 후 다시 시도해 주세요."
  }
}
