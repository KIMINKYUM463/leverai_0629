"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateImagePrompt(keyword: string, position?: { x: number; y: number }) {
  try {
    // 디버깅을 위한 로그 추가
    console.log("🔍 AI Prompt Generation Debug:")
    console.log("- Keyword:", keyword)
    console.log("- Position:", position)

    const systemPrompt = `이 GPT는 사용자가 업로드한 이미지를 분석하고, 해당 이미지를 기반으로 매우 상세하고 사실적인 영어 프롬프트를 생성한다. 생성된 프롬프트는 Google의 Imagen FX(https://labs.google/fx/ko/tools/image-fx)에서 입력하여 실제 사진처럼 고품질의 이미지를 생성하는 데 사용될 예정이다. 특히 한국에만 있는 농수산식품과 과일을 위주로 다루며, 참외, 전통 채소, 지역 특산물 등 외국 AI 모델들이 잘 인식하지 못할 수 있는 요소를 정확히 분석해 프롬프트에 포함한다. 이미지의 디테일, 질감, 색감, 조명, 구도 등 모든 시각적 요소를 세밀하게 파악하여 매우 디테일하고 사실적인 묘사를 포함하며, 배경도 중요하게 다뤄 업로드된 이미지의 배경과 최대한 비슷한 느낌이 들도록 표현한다. 또한, 이미지에 사람이 포함되어 있을 경우 인물의 외모, 표정, 의상, 포즈 등을 정확히 식별하고 상세히 묘사하여 프롬프트에 반영한다. 사용자가 원하는 스타일이나 추가 정보를 제공할 경우 이를 반드시 반영하며, 자연스럽고 세련된 전문가다운 톤으로 응답한다. 프롬프트는 Imagen FX가 원본 이미지에 가깝거나 사용자가 의도한 바에 맞게 실제 사진처럼 표현될 수 있도록 작성하며, 배경과 피사체, 인물의 조화를 섬세하게 반영한다. 사용자의 요청이 모호할 경우에도 최대한 스스로 추론하여 빠르고 정확한 프롬프트를 제공하며, 필요 시 수정이나 보완도 적극적으로 수행한다.무조건 영어로 번역되어야한다.그림이나 애니메이션이 아니라 무조건 실사진으로 해야한다. 외국사진,외국인물은 금지야. 무조건 한국버전으로 해줘야해

응답 형식:
한국어 프롬프트: [한국어로 된 상세한 이미지 설명]
영어 프롬프트: [English detailed image description for Imagen FX]`

    // 정확한 Position 기반 프롬프트 결정
    let userMessage = ""
    let promptType = "기본"

    console.log("- 정확한 Position 기반 매칭 시작")

    if (position) {
      const { x, y } = position
      console.log(`📍 정확한 Position 매칭: x=${x}, y=${y}`)

      // 정확한 좌표 매칭
      if (x === 0 && y === 0) {
        console.log("✅ (0, 0): 손으로 들고 있는 모습")
        userMessage = `두 손으로 신선한 ${keyword}을(를) 들고 있는 모습 (손만 나와야해)을 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(0, 0): 손으로 들고 있는 모습"
      } else if (x === 107 && y === 1512) {
        console.log("✅ (107, 1512): 신선하고 맛있는 모습")
        userMessage = `${keyword}가 과일이면 가장 맛있고 신선해 보이는 모습 (수산물이면 싱싱한 모습)을 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(107, 1512): 신선하고 맛있는 모습"
      } else if (x === 0 && y === 6643) {
        console.log("✅ (0, 6643): 상태 좋지 않은 어두운 모습")
        userMessage = `${keyword}가 상태좋지않은 모습. 사진이 살짝 어둡게 표현되도록 해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(0, 6643): 상태 좋지 않은 어두운 모습"
      } else if (x === 0 && y === 7973) {
        console.log("✅ (0, 7973): 배경에 맞는 자연스러운 이미지")
        userMessage = `${keyword}에 따라 배경이 정해지고 그 배경에 맞춰 이미지 생성. 실제 사진처럼 자연스러운 이미지를 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(0, 7973): 배경에 맞는 자연스러운 이미지"
      } else if (x === 0 && y === 9207) {
        console.log("✅ (0, 9207): 구매 가능한 고품질 이미지")
        userMessage = `${keyword}은 신선함이 느낄 수 있고 소비자가 구매할 수 있을정도의 실제 사진같은 자연스러운 고퀄리티 이미지를 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(0, 9207): 구매 가능한 고품질 이미지"
      } else if (x === 0 && y === 10440) {
        console.log("✅ (0, 10440): 구매 가능한 고품질 이미지2")
        userMessage = `${keyword}은 신선함이 느낄 수 있고 소비자가 구매할 수 있을정도의 실제 사진같은 자연스러운 고퀄리티 이미지를 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(0, 10440): 구매 가능한 고품질 이미지"
      } else if (x === 126 && y === 11830) {
        console.log("✅ (126, 11830): 강력한 장점을 보여주는 이미지")
        userMessage = `${keyword}은 장점 중 가장 강력한 장점하나에 대해 설명해주고 신선함이 느낄 수 있고 소비자가 구매할 수 있을정도의 실제 사진같은 자연스러운 고퀄리티 이미지를 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(126, 11830): 강력한 장점을 보여주는 이미지"
      } else if (x === 505 && y === 11888) {
        console.log("✅ (505, 11888): 경쟁사 단점을 나타내는 이미지")
        userMessage = `${keyword}은 경쟁사제품으로 경쟁사의 단점을 나타내는 이미지로 실제 사진같은 자연스러운 고퀄리티 이미지를 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(505, 11888): 경쟁사 단점을 나타내는 이미지"
      } else if (x === 94 && y === 12847) {
        console.log("✅ (94, 12847): 농부/어부가 들고 있는 이미지")
        userMessage = `한국 중년 농부(or 어부)가 ${keyword}를 자연스럽게 들고있는 실제 사진같은 자연스러운 고퀄리티 이미지를 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(94, 12847): 농부/어부가 들고 있는 이미지"
      } else if (x === 127 && y === 15977) {
        console.log("✅ (127, 15977): 누끼 적용된 단일 이미지")
        userMessage = `${keyword}은 단일 이미지로 누끼가 적용된 이미지를 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(127, 15977): 누끼 적용된 단일 이미지"
      } else if (x === 303 && y === 14612) {
        console.log("✅ (303, 14612): 제품 보관 방법에 맞는 이미지")
        userMessage = `${keyword}은 제품 보관하는 방법에 맞도록 인식해서 이미지 표현을 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = "(303, 14612): 제품 보관 방법에 맞는 이미지"
      } else {
        console.log(`❌ 매칭되지 않는 좌표: (${x}, ${y}) - 기본 프롬프트 사용`)
        userMessage = `${keyword}의 일반적인 모습을 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
        promptType = `(${x}, ${y}): 매칭되지 않는 좌표 - 기본 프롬프트`
      }
    } else {
      console.log("❌ position이 없음 - 기본 프롬프트 사용")
      // 기본 프롬프트
      userMessage = `${keyword}의 일반적인 모습을 상세하게 묘사해주세요. 한국 농산물의 특징을 살려서 매우 사실적인 사진으로 표현될 수 있도록 프롬프트를 작성해주세요.`
      promptType = "기본 일반적인 모습"
    }

    console.log("- 선택된 프롬프트 타입:", promptType)
    console.log("- 사용자 메시지:", userMessage.substring(0, 100) + "...")

    const { text } = await generateText({
      model: openai("gpt-4.1-mini", {
        apiKey: process.env.OPENAI_API_KEY,
      }),
      prompt: `${systemPrompt}

${userMessage}`,
      maxTokens: 1000,
      temperature: 0.7,
    })

    if (!text) {
      throw new Error("OpenAI returned an empty response")
    }

    // 한국어와 영어 프롬프트 분리
    const koreanMatch = text.match(/한국어 프롬프트:\s*(.+?)(?=영어 프롬프트:|$)/s)
    const englishMatch = text.match(/영어 프롬프트:\s*(.+?)$/s)

    const koreanPrompt = koreanMatch ? koreanMatch[1].trim() : "프롬프트 생성 실패"
    const englishPrompt = englishMatch ? englishMatch[1].trim() : "Prompt generation failed"

    console.log("- 생성된 한국어 프롬프트:", koreanPrompt.substring(0, 100) + "...")

    return {
      success: true,
      koreanPrompt,
      englishPrompt,
      promptType, // 디버깅용으로 추가
    }
  } catch (error) {
    console.error("AI prompt generation error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      koreanPrompt: "",
      englishPrompt: "",
    }
  }
}
