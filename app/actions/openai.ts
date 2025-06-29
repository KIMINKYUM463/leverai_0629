"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import {
  getStorageImages,
  getStorageFolderByKeyword,
  getRandomItemsWithoutDuplication,
} from "@/lib/supabase-image-utils"
import { supabase } from "@/lib/supabase"

// 2. AI 페이지 생성을 위한 서버 액션 함수 정의
export async function generatePageWithAI(baseTemplate: any, keyword: string): Promise<any> {
  console.log("[Server Action] generatePageWithAI 호출 / 키워드:", keyword)

  const systemPrompt = `당신은 10년 차 농수산식품 온라인 판매 기획자입니다. 경쟁사의 상세페이지를 분석하고 소비자들의 구매전환율을 높이는 상세페이지를 제작하는 전문가입니다. 엄청 구체적으로 작성해주세요.
주어진 농수산물 키워드에 대해 다음 형식으로 상세한 마케팅 콘텐츠를 작성해주세요. 중요: '무농약', '인증' 이라는 단어가 나오면 안됩니다.
그리고 글은 AI가 쓴거처럼 쓰지말고 사람이 쓴것처럼 자연스럽게 써줘.

메인카피1 : 고객이 상세페이지의 첫 문장을 보고 구매욕구를 자극하는 강력한 메인 카피 후킹
후킹1 : 해당 상품의 후킹문구를 짧게 써주세요. 한단어만 써줘. (EX. 산지직송, 당도높음, 당일배송출발 등)
후킹2 : 해당 상품의 후킹문구를 짧게 써주세요. 한단어만 써줘. (EX. 산지직송, 당도높음, 당일배송출발 등)
후킹3 : 해당 상품의 후킹문구를 짧게 써주세요. 한단어만 써줘. (EX. 산지직송, 당도높음, 당일배송출발 등)
후킹제목2 : 구매욕구를 상승시킬 수 있는 카피를 설계해주세요. 글자수는 공백포함 15자내로 해줘.
후킹문장 : 후킹제목2를 뒷받침 할 수 있는 근거있는 내용을 한줄로 작성해줘.
#태그1 : 해당 농수산물을 상징하는 태그1개를 넣어줘. 짧게써줘 (예시-> #당도높음 #산지직송  #인기폭발)
#태그2 : 해당 농수산물을 상징하는 태그1개를 넣어줘. 짧게써줘 (예시-> #당도높음 #산지직송  #인기폭발)
#태그3 : 해당 농수산물을 상징하는 태그1개를 넣어줘. 짧게써줘 (예시-> #당도높음 #산지직송  #인기폭발)
#태그4 : 해당 농수산물을 상징하는 태그1개를 넣어줘. 짧게써줘 (예시-> #당도높음 #산지직송  #인기폭발)
#태그5 : 해당 농수산물을 상징하는 태그1개를 넣어줘. 짧게써줘 (예시-> #당도높음 #산지직송  #인기폭발)
#태그6 : 해당 농수산물을 상징하는 태그1개를 넣어줘. 짧게써줘 (예시-> #당도높음 #산지직송  #인기폭발)
리뷰1 : 고객만족 후기를 작성해줘. 후기를 보고 구매를 하고 싶다는 생각이 들도록 고객들의 구매만족도 높은 내용을 반드시 **100자 이상**으로 서술해주세요. 뒷받침 문구는 너무 짧으면 안됩니다.
리뷰2 : 고객만족 후기를 작성해줘. 후기를 보고 구매를 하고 싶다는 생각이 들도록 고객들의 구매만족도 높은 내용을 반드시 **100자 이상**으로 서술해주세요. 뒷받침 문구는 너무 짧으면 안됩니다.
리뷰3 : 고객만족 후기를 작성해줘. 후기를 보고 구매를 하고 싶다는 생각이 들도록 고객들의 구매만족도 높은 내용을 반드시 **100자 이상**으로 서술해주세요. 뒷받침 문구는 너무 짧으면 안됩니다.
위협 관련 카피라이팅 : 타사 농수산물의 리뷰가 좋지않은걸 카피라이팅으로 써줘 (예시-> 싱싱하지 않아서 버린적 있으시죠? 등) 공백포함 42자내로 작성해줘.
해결카피 : 우리 농수산물이 타사 리뷰에 좋지않은 문제를 해결해준다는 카피라이팅을 설계해주세요. (예시 -> 저희는 산지에서 직접 보내드립니다. 등) 공백포함 40자내로 작성해줘.
후킹제목3 : 구매욕구를 상승시킬 수 있는 카피제목을 설계해주세요. 반드시 공백포함 **17자 이하**으로 서술해주세요.
후킹문장3 : 후킹제목3을 뒷받침 할 수 있는 구매욕구를 자극하는 강력한 후킹문장을 설계해주세요.
기사인용 : 해당 농수산물이 좋은쪽으로 기사에 나올법한 내용을 반드시 **100자 이상**으로 서술해주세요. 너무 짧으면 안됩니다
포인트 제목 1 : 구매욕구를 상승시킬 수 있는 카피를 설계해주세요. 반드시 공백포함 **17자 이하**으로 서술해주세요.
포인트1설명 : 포인트1을 뒷받침 할 수 있는 근거있는 내용을 반드시 **100자 이상**으로 서술해주세요. 뒷받침 문구는 너무 짧으면 안됩니다.
포인트 제목 2 : 구매욕구를 상승시킬 수 있는 카피를 설계해주세요. 반드시 공백포함 **17자 이하**으로 서술해주세요.
포인트2설명 : 포인트2을 뒷받침 할 수 있는 근거있는 내용을 반드시 **100자 이상**으로 서술해주세요. 뒷받침 문구는 너무 짧으면 안됩니다.
포인트 제목 3 : 타사와 비교되는 카피를 설계해주세요. 반드시 공백포함 **17자 이하**으로 서술해주세요.
포인트3설명 : 포인트3을 뒷받침 할 수 있는 근거있는 내용을 반드시 **100자 이상**으로 서술해주세요. 뒷받침 문구는 너무 짧으면 안됩니다.
장점설명 : 자사의 장점을 상세하게 서술해주세요.
단점설명 : 타사의 단점을 상세하게 서술해주세요.
농부 경력 : 과일, 농산물이면 30년 경력의 농부로 해주고 수산물이면 30년 경력의 어부라고 해줘
김00 : 해당 상품을 생산하는 한명의 한국 이름으로 3자로 작명해줘. 이름은 매번 달라야해 (예시= 김구한, 김용식)
농부후킹 : 해당 상품의 생산자에 대한 경력사항을 작성해줘. 고객들에게 신뢰를 주고 구매욕구를 상승시킬 수 있는 문구로 작성해주면 좋을 것 같아 (예시 = 30년 이상의 경력을 가진 베테랑입니다. 저희 사과는 고품질,고당도 사과를 합리적인 가격에 드실 수 있도록 최선을 다하겠습니다.....................................)
효능 내용 : "${keyword}의 효능" 이라고 써주세요. 
효능내용 : 해당 상품의 효능에 대한 내용을 반드시 **60자 이상**으로 서술해주세요. 효능내용이 너무 짧으면 안됩니다.
효능1 : 해당 상품의 성분에 대해 써주세요 (EX, 비타민C, 비타민D 등)
효능2 : 해당 상품의 성분에 대해 써주세요 (EX, 비타민C, 비타민D 등)
효능3 : 해당 상품의 성분에 대해 써주세요 (EX, 비타민C, 비타민D 등)
효능4 : 해당 상품의 성분에 대해 써주세요 (EX, 비타민C, 비타민D 등)
옵션1 : 해당 상품의 옵션을 만들어주세요. (예시-> 제품이름 1kg)
옵션2 : 해당 상품의 옵션을 만들어주세요. (예시-> 제품이름 3kg)
옵션3 : 해당 상품의 옵션을 만들어주세요. (예시-> 제품이름 5kg)
주의사항내용 : 해당 농수산물의 주의할 점에 대해 내용을 반드시 **100자 이상**으로 서술해주세요.  너무 짧으면 안됩니다. (예시 -> 수령 후 즉시 냉장고에 두세요. 상온보관해주세요. 후숙 후 드세요 등)
태그태그 : 태그 3개를 넣어줘. (EX, #당도우수  #품질우수   #리얼후기)

응답은 반드시 다음 형식으로만 답변해주세요:
메인카피1: [생성된 카피 내용]
후킹1: [생성된 내용]
후킹2: [생성된 내용]
후킹3: [생성된 내용]
후킹제목2: [생성된 내용]
후킹문장: [생성된 내용]
#태그1: [생성된 내용]
#태그2: [생성된 내용]
#태그3: [생성된 내용]
#태그4: [생성된 내용]
#태그5: [생성된 내용]
#태그6: [생성된 내용]
리뷰1: [생성된 내용]
리뷰2: [생성된 내용]
리뷰3: [생성된 내용]
위협 관련 카피라이팅: [생성된 내용]
해결카피: [생성된 내용]
후킹제목3: [생성된 내용]
후킹문장3: [생성된 내용]
기사인용: [생성된 내용]
포인트 제목 1: [생성된 내용]
포인트1설명: [생성된 내용]
포인트 제목 2: [생성된 내용]
포인트2설명: [생성된 내용]
포인트 제목 3: [생성된 내용]
포인트3설명: [생성된 내용]
장점설명: [생성된 내용]
단점설명: [생성된 내용]
농부 경력: [생성된 내용]
김00: [생성된 내용]
농부후킹: [생성된 내용]
효능 내용: [생성된 내용]
효능내용: [생성된 내용]
효능1: [생성된 내용]
효능2: [생성된 내용]
효능3: [생성된 내용]
효능4: [생성된 내용]
옵션1: [생성된 내용]
옵션2: [생성된 내용]
옵션3: [생성된 내용]
주의사항내용: [생성된 내용]
태그태그: [생성된 내용]`

  const userMessage = `키워드: "${keyword}"`

  /* ---- AI SDK 호출 ---- */
  const { text } = await generateText({
    model: openai("gpt-4.1-mini", {
      apiKey: process.env.OPENAI_API_KEY,
    }),
    prompt: `${systemPrompt}\n\n${userMessage}`,
    maxTokens: 4000,
    temperature: 0.7,
  })

  if (!text) {
    throw new Error("OpenAI returned an empty response")
  }

  console.log("[Server Action] OpenAI 전체 응답:", text)

  // ─── Extract all content fields ──────────────────────────────
  const contentFields = [
    "메인카피1",
    "후킹1",
    "후킹2",
    "후킹3",
    "후킹제목2",
    "후킹문장",
    "#태그1",
    "#태그2",
    "#태그3",
    "#태그4",
    "#태그5",
    "#태그6",
    "리뷰1",
    "리뷰2",
    "리뷰3",
    "위협 관련 카피라이팅",
    "해결카피",
    "후킹제목3",
    "후킹문장3",
    "기사인용",
    "포인트 제목 1",
    "포인트1설명",
    "포인트 제목 2",
    "포인트2설명",
    "포인트 제목 3",
    "포인트3설명",
    "장점설명",
    "단점설명",
    "농부 경력",
    "김00",
    "농부후킹",
    "효능 내용",
    "효능내용",
    "효능1",
    "효능2",
    "효능3",
    "효능4",
    "옵션1",
    "옵션2",
    "옵션3",
    "주의사항내용",
    "태그태그",
  ]

  const extractedContent: { [key: string]: string } = {}

  contentFields.forEach((field) => {
    const regex = new RegExp(`${field}\\s*[:：]\\s*["']?(.+?)["']?(?=\\n|$)`, "i")
    const match = text.match(regex)
    if (match) {
      extractedContent[field] = match[1].trim()
    } else {
      console.warn(`[Server Action] ${field} 추출 실패`)
      extractedContent[field] = `${field} 내용`
    }
  })

  console.log("[Server Action] 추출된 콘텐츠:", extractedContent)

  // ─── Apply all content to the template ─────────────────
  const updatedTemplate = {
    ...baseTemplate,
    elements: baseTemplate.elements.map((el: any) => {
      // 1. 키워드를 "메인제목"에 적용
      if (typeof el.content === "string" && el.content.trim() === "메인제목") {
        console.log("[Server Action] '메인제목' 요소에 키워드 적용:", keyword)
        return { ...el, content: keyword }
      }

      // 2. AI 생성 콘텐츠를 해당 필드에 적용
      const contentKey = el.content?.trim()
      if (contentKey && extractedContent[contentKey]) {
        console.log(`[Server Action] '${contentKey}' 요소에 AI 콘텐츠 적용:`, extractedContent[contentKey])
        return { ...el, content: extractedContent[contentKey] }
      }

      return el
    }),
  }

  // ─── 이미지 자동 삽입 처리 ─────────────────
  console.log("[Server Action] 이미지 자동 삽입 처리 시작")
  console.log(`[Server Action] 입력된 키워드: "${keyword}"`)

  try {
    // storage 폴더 경로 결정 ('사과'일 때만 item1, '신비복숭아'일 때 item2)
    const folderPath = getStorageFolderByKeyword(keyword)

    if (!folderPath) {
      console.log(`[Server Action] 키워드 "${keyword}"는 이미지 처리 대상이 아닙니다. 건너뜀.`)
      return updatedTemplate
    }

    console.log(`[Server Action] 키워드 "${keyword}"에 대한 폴더 경로: image/${folderPath}`)

    // 특정 프레임 ID - 무조건 human.png 사용
    const humanFrameId = "el-image-frame-1750481834786-93-fwq3z"

    // human.png 파일의 URL 생성
    const { data: humanUrlData } = supabase.storage.from("image").getPublicUrl(`${folderPath}/human.png`)

    const humanImageUrl = humanUrlData.publicUrl
    console.log(`[Server Action] human.png URL: ${humanImageUrl}`)

    // storage에서 일반 이미지 목록 가져오기 (human.png 제외)
    const allImageUrls = await getStorageImages("image", folderPath)
    const randomImageUrls = allImageUrls.filter((url) => !url.includes("human.png"))
    console.log(`[Server Action] 발견된 랜덤 이미지 개수: ${randomImageUrls.length}`)

    // 타겟 이미지 프레임 ID들 정의
    const targetImageFrameIds = [
      "el-image-frame-1750481834786-25-ytpoh",
      "el-image-frame-1750481834786-38-iz2fu",
      "el-image-frame-1750481834786-65-94l9m",
      "el-image-frame-1750481834786-69-tze24",
      "el-image-frame-1750481834786-75-56kg6",
      "el-image-frame-1750481834786-80-3gmbu",
      "el-image-frame-1750481834786-89-eczbr",
      "el-image-frame-1750481834786-91-kwbmg",
      "el-image-frame-1750481834786-93-fwq3z",
      "el-image-frame-1750481834786-111-beh6v",
      "el-image-frame-1750481834786-135-z6e9p",
    ]

    console.log(`[Server Action] 타겟 이미지 프레임 개수: ${targetImageFrameIds.length}`)

    // 템플릿에서 실제로 존재하는 이미지 프레임 찾기 (human 프레임 제외)
    const existingRandomFrames = updatedTemplate.elements.filter((el: any) => targetImageFrameIds.includes(el.id))

    console.log(`[Server Action] 템플릿에서 발견된 랜덤 이미지 프레임 개수: ${existingRandomFrames.length}`)

    // 이미지 적용
    let appliedCount = 0

    if (randomImageUrls.length > 0 && existingRandomFrames.length > 0) {
      // 중복 없이 랜덤 이미지들 선택 (일반 프레임 개수만큼)
      const selectedImages = getRandomItemsWithoutDuplication(randomImageUrls, existingRandomFrames.length)
      console.log(`[Server Action] 선택된 랜덤 이미지들:`, selectedImages)

      // 각 프레임에 이미지 적용
      updatedTemplate.elements = updatedTemplate.elements.map((el: any) => {
        // 1. human 프레임에는 무조건 human.png 적용
        if (el.id === humanFrameId) {
          console.log(`[Server Action] 프레임 ${el.id}에 human.png 적용: ${humanImageUrl}`)
          return {
            ...el,
            imageSrc: humanImageUrl,
            hasImage: true,
            imageWidth: el.imageWidth || el.width,
            imageHeight: el.imageHeight || el.height,
          }
        }

        // 2. 일반 프레임에는 랜덤 이미지 적용
        if (targetImageFrameIds.includes(el.id) && appliedCount < selectedImages.length) {
          const imageUrl = selectedImages[appliedCount]
          console.log(`[Server Action] 프레임 ${el.id}에 랜덤 이미지 적용: ${imageUrl}`)

          appliedCount++
          return {
            ...el,
            imageSrc: imageUrl,
            hasImage: true,
            imageWidth: el.imageWidth || el.width,
            imageHeight: el.imageHeight || el.height,
          }
        }

        return el
      })

      console.log(`[Server Action] ✅ human.png 1개 + 랜덤 이미지 ${appliedCount}개가 성공적으로 적용되었습니다!`)
    } else {
      console.warn(`[Server Action] ⚠️ 랜덤 이미지가 없거나 프레임을 찾을 수 없습니다`)
    }
  } catch (error) {
    console.error("[Server Action] ❌ 이미지 자동 삽입 중 오류:", error)
    // 이미지 삽입 실패해도 전체 프로세스는 계속 진행
  }

  return updatedTemplate
}
