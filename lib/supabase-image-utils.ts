import { supabase } from "./supabase"

/**
 * 안전하게 Supabase Storage list 호출
 */
async function safeList(
  bucket: string,
  prefix?: string,
): Promise<{ files: Awaited<ReturnType<typeof supabase.storage.from>>["data"] | null }> {
  try {
    /* ⚠️ Supabase Storage API 는 에러 시 HTML 을 돌려주기도 해서
       supabase-js 내부에서 JSON.parse 실패 → 예외 발생 */
    const { data } = await supabase.storage
      .from(bucket)
      .list(prefix === "" ? undefined : prefix, { limit: 100, offset: 0 })
    return { files: data }
  } catch (e) {
    console.error("[STORAGE] safeList JSON 파싱 실패 또는 네트워크 에러:", e instanceof Error ? e.message : e)
    return { files: null }
  }
}

/**
 * 지정 폴더의 이미지 URL 목록을 반환한다.
 * – Storage API 가 HTML 에러를 보내 JSON 파싱이 실패하더라도 빈 배열을 돌려
 *   AI 생성 프로세스를 멈추지 않는다.
 */
export async function getStorageImages(bucketName: string, folderPath: string): Promise<string[]> {
  try {
    console.log(`[STORAGE] ${bucketName}/${folderPath}에서 이미지 목록 가져오기 시작`)

    const { files } = await safeList(bucketName, folderPath)

    if (!files || files.length === 0) {
      console.warn(`[STORAGE] ${bucketName}/${folderPath}에 파일이 없습니다`)
      return []
    }

    // 이미지 파일만 필터링 (jpg, jpeg, png, webp)
    const imageFiles = files.filter((file) => {
      const ext = file.name.toLowerCase().split(".").pop()
      return ["jpg", "jpeg", "png", "webp"].includes(ext || "")
    })

    console.log(`[STORAGE] 발견된 이미지 파일 수: ${imageFiles.length}`)

    // 각 이미지의 public URL 생성
    const imageUrls = imageFiles.map((file) => {
      const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(`${folderPath}/${file.name}`)

      return urlData.publicUrl
    })

    console.log("[STORAGE] 생성된 이미지 URL들:", imageUrls)
    return imageUrls
  } catch (error) {
    console.error("[STORAGE] 이미지 가져오기 중 예외 발생:", error)
    return []
  }
}

/**
 * 배열에서 랜덤으로 하나의 요소를 선택하는 함수
 */
export function getRandomItem<T>(array: T[]): T | null {
  if (!array || array.length === 0) return null
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

/**
 * 배열에서 중복 없이 여러 개의 랜덤 요소를 선택하는 함수
 */
export function getRandomItemsWithoutDuplication<T>(array: T[], count: number): T[] {
  if (!array || array.length === 0) return []

  // 요청한 개수가 배열 길이보다 크면 전체 배열을 섞어서 반환
  if (count >= array.length) {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * 키워드에 따라 적절한 storage 폴더 경로를 반환하는 함수
 */
export function getStorageFolderByKeyword(keyword: string): string | null {
  const keywordLower = keyword.toLowerCase().trim()

  console.log(`[STORAGE] 키워드 확인: "${keyword}" (소문자: "${keywordLower}")`)
  console.log(`[STORAGE] 지원되는 키워드: 총 158개 상품`)

  // item1 : 사과
  if (keywordLower === "사과") {
    console.log(`[STORAGE] '사과' 키워드 감지 -> item1 폴더 사용`)
    return "item1"
  }

  // item2 : 신비복숭아
  if (keywordLower === "신비복숭아" || keywordLower === "신비 복숭아") {
    console.log(`[STORAGE] '신비복숭아' 키워드 감지 -> item2 폴더 사용`)
    return "item2"
  }

  // item3 : 문어
  if (keywordLower === "문어") {
    console.log(`[STORAGE] '문어' 키워드 감지 -> item3 폴더 사용`)
    return "item3"
  }

  // item4 : 대극천 복숭아
  if (keywordLower === "대극천 복숭아" || keywordLower === "대극천복숭아") {
    console.log(`[STORAGE] '대극천 복숭아' 키워드 감지 -> item4 폴더 사용`)
    return "item4"
  }

  // item5 : 반말랑이 백도, 백도 복숭아, 백도
  if (
    keywordLower === "반말랑이 백도" ||
    keywordLower === "반말랑이백도" ||
    keywordLower === "백도 복숭아" ||
    keywordLower === "백도복숭아" ||
    keywordLower === "백도"
  ) {
    console.log(`[STORAGE] '반말랑이 백도/백도 복숭아/백도' 키워드 감지 -> item5 폴더 사용`)
    return "item5"
  }

  // item6 : 대석 자두, 하우스 자두
  if (
    keywordLower === "대석 자두" ||
    keywordLower === "대석자두" ||
    keywordLower === "하우스 자두" ||
    keywordLower === "하우스자두" ||
    keywordLower === "자두"
  ) {
    console.log(`[STORAGE] '대석 자두/하우스 자두' 키워드 감지 -> item6 폴더 사용`)
    return "item6"
  }

  // item7 : 순살 아귀포
  if (keywordLower === "순살 아귀포" || keywordLower === "순살아귀포") {
    console.log(`[STORAGE] '순살 아귀포' 키워드 감지 -> item7 폴더 사용`)
    return "item7"
  }

  // item8 : 뼈 아귀포
  if (keywordLower === "뼈 아귀포" || keywordLower === "뼈아귀포") {
    console.log(`[STORAGE] '뼈 아귀포' 키워드 감지 -> item8 폴더 사용`)
    return "item8"
  }

  // item9 : 건멸치
  if (keywordLower === "건멸치") {
    console.log(`[STORAGE] '건멸치' 키워드 감지 -> item9 폴더 사용`)
    return "item9"
  }

  // item10 : 세멸치
  if (keywordLower === "세멸치") {
    console.log(`[STORAGE] '세멸치' 키워드 감지 -> item10 폴더 사용`)
    return "item10"
  }

  // item11 : 생 리치
  if (keywordLower === "생 리치" || keywordLower === "생리치" || keywordLower === "리치") {
    console.log(`[STORAGE] '생 리치' 키워드 감지 -> item11 폴더 사용`)
    return "item11"
  }

  // item12 : 연평도 암꽃게, 연평도 급냉 암꽃게, 절단 암꽃게
  if (
    keywordLower === "연평도 암꽃게" ||
    keywordLower === "연평도암꽃게" ||
    keywordLower === "연평도 급냉 암꽃게" ||
    keywordLower === "연평도급냉암꽃게" ||
    keywordLower === "절단 암꽃게" ||
    keywordLower === "절단암꽃게" ||
    keywordLower === "암꽃게"
  ) {
    console.log(`[STORAGE] '연평도 암꽃게/연평도 급냉 암꽃게/절단 암꽃게' 키워드 감지 -> item12 폴더 사용`)
    return "item12"
  }

  // item13 : 제주 단호박, 제주 미니호박
  if (
    keywordLower === "제주 단호박" ||
    keywordLower === "제주단호박" ||
    keywordLower === "제주 미니호박" ||
    keywordLower === "제주미니호박" || 
    keywordLower === "미니호박" || 
    keywordLower === "미니 호박"
  ) {
    console.log(`[STORAGE] '제주 단호박/제주 미니호박' 키워드 감지 -> item13 폴더 사용`)
    return "item13"
  }

  // item14 : 손질 갑오징어
  if (keywordLower === "손질 갑오징어" || keywordLower === "손질갑오징어") {
    console.log(`[STORAGE] '손질 갑오징어' 키워드 감지 -> item14 폴더 사용`)
    return "item14"
  }

  // item15 : 반건조 박대
  if (keywordLower === "반건조 박대" || keywordLower === "반건조박대") {
    console.log(`[STORAGE] '반건조 박대' 키워드 감지 -> item15 폴더 사용`)
    return "item15"
  }

  // item16 : 아귀 꼬리살
  if (keywordLower === "아귀 꼬리살" || keywordLower === "아귀꼬리살") {
    console.log(`[STORAGE] '아귀 꼬리살' 키워드 감지 -> item16 폴더 사용`)
    return "item16"
  }

  // item17 : 아귀 순살
  if (keywordLower === "아귀 순살" || keywordLower === "아귀순살") {
    console.log(`[STORAGE] '아귀 순살' 키워드 감지 -> item17 폴더 사용`)
    return "item17"
  }

  // item18 : 절단 아귀(급냉)
  if (
    keywordLower === "절단 아귀(급냉)" ||
    keywordLower === "절단아귀급냉" ||
    keywordLower === "절단 아귀" ||
    keywordLower === "절단아귀"
  ) {
    console.log(`[STORAGE] '절단 아귀(급냉)' 키워드 감지 -> item18 폴더 사용`)
    return "item18"
  }

  // item19 : 손질 장어
  if (keywordLower === "손질 장어" || keywordLower === "손질장어") {
    console.log(`[STORAGE] '손질 장어' 키워드 감지 -> item19 폴더 사용`)
    return "item19"
  }

  // item20 : 청매실
  if (keywordLower === "청매실" || keywordLower === "청 매실") {
    console.log(`[STORAGE] '청매실' 키워드 감지 -> item20 폴더 사용`)
    return "item20"
  }

  // item21 : 보라성게알
  if (keywordLower === "보라성게알" || keywordLower === "보라 성게알") {
    console.log(`[STORAGE] '보라성게알' 키워드 감지 -> item21 폴더 사용`)
    return "item21"
  }

  // item22 : 천도 복숭아
  if (keywordLower === "천도 복숭아" || keywordLower === "천도복숭아") {
    console.log(`[STORAGE] '천도 복숭아' 키워드 감지 -> item22 폴더 사용`)
    return "item22"
  }

  // item23 : 활 꽃게
  if (keywordLower === "활 꽃게" || keywordLower === "활꽃게" || keywordLower === "꽃게") {
    console.log(`[STORAGE] '활 꽃게' 키워드 감지 -> item23 폴더 사용`)
    return "item23"
  }

  // item24 : 무우
  if (keywordLower === "무우") {
    console.log(`[STORAGE] '무우' 키워드 감지 -> item24 폴더 사용`)
    return "item24"
  }

  // item25 : 바다장어
  if (keywordLower === "바다장어") {
    console.log(`[STORAGE] '바다장어' 키워드 감지 -> item25 폴더 사용`)
    return "item25"
  }

  // item26 : 애플수박
  if (keywordLower === "애플수박" || keywordLower === "애플 수박") {
    console.log(`[STORAGE] '애플수박' 키워드 감지 -> item26 폴더 사용`)
    return "item26"
  }

  // item27 : 산딸기
  if (keywordLower === "산딸기") {
    console.log(`[STORAGE] '산딸기' 키워드 감지 -> item27 폴더 사용`)
    return "item27"
  }

  // item28 : 통마늘
  if (keywordLower === "통마늘") {
    console.log(`[STORAGE] '통마늘' 키워드 감지 -> item28 폴더 사용`)
    return "item28"
  }

  // item29 : 황도, 황도 복숭아
  if (keywordLower === "황도" || keywordLower === "황도 복숭아" || keywordLower === "황도복숭아") {
    console.log(`[STORAGE] '황도/황도 복숭아' 키워드 감지 -> item29 폴더 사용`)
    return "item29"
  }

  // item30 : 햇 자색양파
  if (keywordLower === "햇 자색양파" || keywordLower === "햇자색양파") {
    console.log(`[STORAGE] '햇 자색양파' 키워드 감지 -> item30 폴더 사용`)
    return "item30"
  }

  // item31 : 노지살구, 살구, 하우스 살구
  if (
    keywordLower === "노지살구" ||
    keywordLower === "살구" ||
    keywordLower === "하우스 살구" ||
    keywordLower === "하우스살구"
  ) {
    console.log(`[STORAGE] '노지살구/살구/하우스 살구' 키워드 감지 -> item31 폴더 사용`)
    return "item31"
  }

  // item32 : 바질
  if (keywordLower === "바질") {
    console.log(`[STORAGE] '바질' 키워드 감지 -> item32 폴더 사용`)
    return "item32"
  }

  // item33 : 체리, 고당도 체리
  if (keywordLower === "체리" || keywordLower === "고당도 체리" || keywordLower === "고당도체리") {
    console.log(`[STORAGE] '체리/고당도 체리' 키워드 감지 -> item33 폴더 사용`)
    return "item33"
  }

  // item34 : 설향멜론
  if (keywordLower === "설향멜론") {
    console.log(`[STORAGE] '설향멜론' 키워드 감지 -> item34 폴더 사용`)
    return "item34"
  }

  // item35 : 골드 하미과
  if (keywordLower === "골드 하미과" || keywordLower === "골드하미과") {
    console.log(`[STORAGE] '골드 하미과' 키워드 감지 -> item35 폴더 사용`)
    return "item35"
  }

  // item36 : 양구멜론
  if (keywordLower === "양구멜론") {
    console.log(`[STORAGE] '양구멜론' 키워드 감지 -> item36 폴더 사용`)
    return "item36"
  }

  // item37 : 감말랭이
  if (keywordLower === "감말랭이") {
    console.log(`[STORAGE] '감말랭이' 키워드 감지 -> item37 폴더 사용`)
    return "item37"
  }

  // item38 : 머스크 멜론
  if (keywordLower === "머스크 멜론" || keywordLower === "머스크멜론") {
    console.log(`[STORAGE] '머스크 멜론' 키워드 감지 -> item38 폴더 사용`)
    return "item38"
  }

  // item39 : 노지 햇 홍감자
  if (keywordLower === "노지 햇 홍감자" || keywordLower === "노지햇홍감자") {
    console.log(`[STORAGE] '노지 햇 홍감자' 키워드 감지 -> item39 폴더 사용`)
    return "item39"
  }

  // item40 : 체리 (중복이지만 별도 처리)
  // item33과 동일하므로 item33에서 처리됨

  // item41 : 블루베리
  if (keywordLower === "블루베리") {
    console.log(`[STORAGE] '블루베리' 키워드 감지 -> item41 폴더 사용`)
    return "item41"
  }

  // item42 : 급냉 국산쭈구미
  if (keywordLower === "급냉 국산쭈구미" || keywordLower === "급냉국산쭈구미") {
    console.log(`[STORAGE] '급냉 국산쭈구미' 키워드 감지 -> item42 폴더 사용`)
    return "item42"
  }

  // item43 : 흑수박
  if (keywordLower === "흑수박") {
    console.log(`[STORAGE] '흑수박' 키워드 감지 -> item43 폴더 사용`)
    return "item43"
  }

  // item44 : 생 라임
  if (keywordLower === "생 라임" || keywordLower === "생라임" || keywordLower === "라임") {
    console.log(`[STORAGE] '생 라임' 키워드 감지 -> item44 폴더 사용`)
    return "item44"
  }

  // item45 : 팬시레몬
  if (keywordLower === "팬시레몬" || keywordLower === "레몬" || keywordLower === "팬시 레몬") {
    console.log(`[STORAGE] '팬시레몬' 키워드 감지 -> item45 폴더 사용`)
    return "item45"
  }

  // item46 : 애플 청포도
  if (keywordLower === "애플 청포도" || keywordLower === "애플청포도") {
    console.log(`[STORAGE] '애플 청포도' 키워드 감지 -> item46 폴더 사용`)
    return "item46"
  }

  // item47 : 신선 복숭아
  if (keywordLower === "신선 복숭아" || keywordLower === "신선복숭아") {
    console.log(`[STORAGE] '신선 복숭아' 키워드 감지 -> item47 폴더 사용`)
    return "item47"
  }

  // item48 : 수박, 하우스 수박, 논산 수박
  if (
    keywordLower === "수박" ||
    keywordLower === "하우스 수박" ||
    keywordLower === "하우스수박" ||
    keywordLower === "논산 수박" ||
    keywordLower === "논산수박"
  ) {
    console.log(`[STORAGE] '수박/하우스 수박/논산 수박' 키워드 감지 -> item48 폴더 사용`)
    return "item48"
  }

  // item49 : 부지깽이
  if (keywordLower === "부지깽이") {
    console.log(`[STORAGE] '부지깽이' 키워드 감지 -> item49 폴더 사용`)
    return "item49"
  }

  // item50 : 얼갈이 배추
  if (keywordLower === "얼갈이 배추" || keywordLower === "얼갈이배추") {
    console.log(`[STORAGE] '얼갈이 배추' 키워드 감지 -> item50 폴더 사용`)
    return "item50"
  }

  // item51 : 건 곤드레나물
  if (keywordLower === "건 곤드레나물" || keywordLower === "건곤드레나물") {
    console.log(`[STORAGE] '건 곤드레나물' 키워드 감지 -> item51 폴더 사용`)
    return "item51"
  }

  // item52 : 시래기
  if (keywordLower === "시래기") {
    console.log(`[STORAGE] '시래기' 키워드 감지 -> item52 폴더 사용`)
    return "item52"
  }

  // item53 : 햇 고사리
  if (keywordLower === "햇 고사리" || keywordLower === "햇고사리") {
    console.log(`[STORAGE] '햇 고사리' 키워드 감지 -> item53 폴더 사용`)
    return "item53"
  }

  // item54 : 제주 은갈치
  if (keywordLower === "제주 은갈치" || keywordLower === "제주은갈치") {
    console.log(`[STORAGE] '제주 은갈치' 키워드 감지 -> item54 폴더 사용`)
    return "item54"
  }

  // item55 : 알배추
  if (keywordLower === "알배추") {
    console.log(`[STORAGE] '알배추' 키워드 감지 -> item55 폴더 사용`)
    return "item55"
  }

  // item56 : 백찰옥수수
  if (keywordLower === "백찰옥수수" || keywordLower === "백 찰옥수수") {
    console.log(`[STORAGE] '백찰옥수수' 키워드 감지 -> item56 폴더 사용`)
    return "item56"
  }

  // item57 : 초당 옥수수
  if (keywordLower === "초당 옥수수" || keywordLower === "초당옥수수") {
    console.log(`[STORAGE] '초당 옥수수' 키워드 감지 -> item57 폴더 사용`)
    return "item57"
  }

  // item58 : 반건조 오징어
  if (keywordLower === "반건조 오징어" || keywordLower === "반건조오징어") {
    console.log(`[STORAGE] '반건조 오징어' 키워드 감지 -> item58 폴더 사용`)
    return "item58"
  }

  // item59 : 하우스 햇감자
  if (keywordLower === "하우스 햇감자" || keywordLower === "하우스햇감자") {
    console.log(`[STORAGE] '하우스 햇감자' 키워드 감지 -> item59 폴더 사용`)
    return "item59"
  }

  // item60 : 세지멜론
  if (keywordLower === "세지멜론") {
    console.log(`[STORAGE] '세지멜론' 키워드 감지 -> item60 폴더 사용`)
    return "item60"
  }

  // item61 : 가야백자 멜론
  if (keywordLower === "가야백자 멜론" || keywordLower === "가야백자멜론") {
    console.log(`[STORAGE] '가야백자 멜론' 키워드 감지 -> item61 폴더 사용`)
    return "item61"
  }

  // item62 : 청양고추
  if (keywordLower === "청양고추") {
    console.log(`[STORAGE] '청양고추' 키워드 감지 -> item62 폴더 사용`)
    return "item62"
  }

  // item63 : 통영 깐멍게
  if (keywordLower === "통영 깐멍게" || keywordLower === "통영깐멍게") {
    console.log(`[STORAGE] '통영 깐멍게' 키워드 감지 -> item63 폴더 사용`)
    return "item63"
  }

  // item64 : 아보카도
  if (keywordLower === "아보카도") {
    console.log(`[STORAGE] '아보카도' 키워드 감지 -> item64 폴더 사용`)
    return "item64"
  }

  // item65 : 제스프리 골드키위
  if (keywordLower === "제스프리 골드키위" || keywordLower === "제스프리골드키위") {
    console.log(`[STORAGE] '제스프리 골드키위' 키워드 감지 -> item65 폴더 사용`)
    return "item65"
  }

  // item66 : 포항초 시금치
  if (keywordLower === "포항초 시금치" || keywordLower === "포항초시금치") {
    console.log(`[STORAGE] '포항초 시금치' 키워드 감지 -> item66 폴더 사용`)
    return "item66"
  }

  // item67 : 레드크림슨포도
  if (keywordLower === "레드크림슨포도") {
    console.log(`[STORAGE] '레드크림슨포도' 키워드 감지 -> item67 폴더 사용`)
    return "item67"
  }

  // item68 : 애플망고
  if (keywordLower === "애플망고") {
    console.log(`[STORAGE] '애플망고' 키워드 감지 -> item68 폴더 사용`)
    return "item68"
  }

  // item69 : 새꼬막
  if (keywordLower === "새꼬막") {
    console.log(`[STORAGE] '새꼬막' 키워드 감지 -> item69 폴더 사용`)
    return "item69"
  }

  // item70 : 자연산 바위굴
  if (keywordLower === "자연산 바위굴" || keywordLower === "자연산바위굴") {
    console.log(`[STORAGE] '자연산 바위굴' 키워드 감지 -> item70 폴더 사용`)
    return "item70"
  }

  // item71 : 반건조 참돔
  if (keywordLower === "반건조 참돔" || keywordLower === "반건조참돔") {
    console.log(`[STORAGE] '반건조 참돔' 키워드 감지 -> item71 폴더 사용`)
    return "item71"
  }

  // item72 : 손질갈치
  if (keywordLower === "손질갈치") {
    console.log(`[STORAGE] '손질갈치' 키워드 감지 -> item72 폴더 사용`)
    return "item72"
  }

  // item73 : 동죽조개
  if (keywordLower === "동죽조개") {
    console.log(`[STORAGE] '동죽조개' 키워드 감지 -> item73 폴더 사용`)
    return "item73"
  }

  // item74 : 다듬이 홍합
  if (keywordLower === "다듬이 홍합" || keywordLower === "다듬이홍합") {
    console.log(`[STORAGE] '다듬이 홍합' 키워드 감지 -> item74 폴더 사용`)
    return "item74"
  }

  // item75 : 병어
  if (keywordLower === "병어") {
    console.log(`[STORAGE] '병어' 키워드 감지 -> item75 폴더 사용`)
    return "item75"
  }

  // item76 : 매생이
  if (keywordLower === "매생이") {
    console.log(`[STORAGE] '매생이' 키워드 감지 -> item76 폴더 사용`)
    return "item76"
  }

  // item77 : 베트남 코코넛
  if (keywordLower === "베트남 코코넛" || keywordLower === "베트남코코넛") {
    console.log(`[STORAGE] '베트남 코코넛' 키워드 감지 -> item77 폴더 사용`)
    return "item77"
  }

  // item78 : 베트남 용과
  if (keywordLower === "베트남 용과" || keywordLower === "베트남용과") {
    console.log(`[STORAGE] '베트남 용과' 키워드 감지 -> item78 폴더 사용`)
    return "item78"
  }

  // item79 : 월동무
  if (keywordLower === "월동무") {
    console.log(`[STORAGE] '월동무' 키워드 감지 -> item79 폴더 사용`)
    return "item79"
  }

  // item80 : 오톰크리스피
  if (keywordLower === "오톰크리스피") {
    console.log(`[STORAGE] '오톰크리스피' 키워드 감지 -> item80 폴더 사용`)
    return "item80"
  }

  // item81 : 오렌지
  if (keywordLower === "오렌지") {
    console.log(`[STORAGE] '오렌지' 키워드 감지 -> item81 폴더 사용`)
    return "item81"
  }

  // item82 : 찰 토마토
  if (keywordLower === "찰 토마토" || keywordLower === "찰토마토") {
    console.log(`[STORAGE] '찰 토마토' 키워드 감지 -> item82 폴더 사용`)
    return "item82"
  }

  // item83 : 마하차녹 무지개망고
  if (keywordLower === "마하차녹 무지개망고" || keywordLower === "마하차녹무지개망고") {
    console.log(`[STORAGE] '마하차녹 무지개망고' 키워드 감지 -> item83 폴더 사용`)
    return "item83"
  }

  // item84 : 대추 방울토마토
  if (keywordLower === "대추 방울토마토" || keywordLower === "대추방울토마토") {
    console.log(`[STORAGE] '대추 방울토마토' 키워드 감지 -> item84 폴더 사용`)
    return "item84"
  }

  // item85 : 블랙 타이거 새우
  if (keywordLower === "블랙 타이거 새우" || keywordLower === "블랙타이거새우") {
    console.log(`[STORAGE] '블랙 타이거 새우' 키워드 감지 -> item85 폴더 사용`)
    return "item85"
  }

  // item86 : 레드자몽
  if (keywordLower === "레드자몽") {
    console.log(`[STORAGE] '레드자몽' 키워드 감지 -> item86 폴더 사용`)
    return "item86"
  }

  // item87 : 제주 비트
  if (keywordLower === "제주 비트" || keywordLower === "제주비트") {
    console.log(`[STORAGE] '제주 비트' 키워드 감지 -> item87 폴더 사용`)
    return "item87"
  }

  // item88 : 당근, 제주 구좌 흙 당근, 강원도 당근, 제주 당근
  if (
    keywordLower === "당근" ||
    keywordLower === "제주 구좌 흙 당근" ||
    keywordLower === "제주구좌흙당근" ||
    keywordLower === "강원도 당근" ||
    keywordLower === "강원도당근" ||
    keywordLower === "제주 당근" ||
    keywordLower === "제주당근"
  ) {
    console.log(`[STORAGE] '당근/제주 구좌 흙 당근/강원도 당근/제주 당근' 키워드 감지 -> item88 폴더 사용`)
    return "item88"
  }

  // item89 : 돌문어
  if (keywordLower === "돌문어") {
    console.log(`[STORAGE] '돌문어' 키워드 감지 -> item89 폴더 사용`)
    return "item89"
  }

  // item90 : 고등어
  if (keywordLower === "고등어") {
    console.log(`[STORAGE] '고등어' 키워드 감지 -> item90 폴더 사용`)
    return "item90"
  }

  // item91 : 꽈리고추
  if (keywordLower === "꽈리고추") {
    console.log(`[STORAGE] '꽈리고추' 키워드 감지 -> item91 폴더 사용`)
    return "item91"
  }

  // item92 : 백오이, 가정용 백오이, 오이
  if (
    keywordLower === "백오이" ||
    keywordLower === "가정용 백오이" ||
    keywordLower === "가정용백오이" ||
    keywordLower === "오이"
  ) {
    console.log(`[STORAGE] '백오이/가정용 백오이/오이' 키워드 감지 -> item92 폴더 사용`)
    return "item92"
  }

  // item93 : 가지
  if (keywordLower === "가지") {
    console.log(`[STORAGE] '가지' 키워드 감지 -> item93 폴더 사용`)
    return "item93"
  }

  // item94 : 전복
  if (keywordLower === "전복") {
    console.log(`[STORAGE] '전복' 키워드 감지 -> item94 폴더 사용`)
    return "item94"
  }

  // item95 : 깐마늘
  if (keywordLower === "깐마늘") {
    console.log(`[STORAGE] '깐마늘' 키워드 감지 -> item95 폴더 사용`)
    return "item95"
  }

  // item96 : 망고스틴
  if (keywordLower === "망고스틴") {
    console.log(`[STORAGE] '망고스틴' 키워드 감지 -> item96 폴더 사용`)
    return "item96"
  }

  // item97 : 태국망고
  if (keywordLower === "태국망고") {
    console.log(`[STORAGE] '태국망고' 키워드 감지 -> item97 폴더 사용`)
    return "item97"
  }

  // item98 : 반건조 성대
  if (keywordLower === "반건조 성대" || keywordLower === "반건조성대") {
    console.log(`[STORAGE] '반건조 성대' 키워드 감지 -> item98 폴더 사용`)
    return "item98"
  }

  // item99 : 반건조 백조기
  if (keywordLower === "반건조 백조기" || keywordLower === "반건조백조기") {
    console.log(`[STORAGE] '반건조 백조기' 키워드 감지 -> item99 폴더 사용`)
    return "item99"
  }

  // item100 : 반건조 참가자미
  if (keywordLower === "반건조 참가자미" || keywordLower === "반건조참가자미") {
    console.log(`[STORAGE] '반건조 참가자미' 키워드 감지 -> item100 폴더 사용`)
    return "item100"
  }

  // item101 : 반건조 손질 고등어
  if (keywordLower === "반건조 손질 고등어" || keywordLower === "반건조손질고등어") {
    console.log(`[STORAGE] '반건조 손질 고등어' 키워드 감지 -> item101 폴더 사용`)
    return "item101"
  }

  // item102 : 황매실
  if (keywordLower === "황매실") {
    console.log(`[STORAGE] '황매실' 키워드 감지 -> item102 폴더 사용`)
    return "item102"
  }

  // item103 : 독도 닭새우
  if (keywordLower === "독도 닭새우" || keywordLower === "독도닭새우") {
    console.log(`[STORAGE] '독도 닭새우' 키워드 감지 -> item103 폴더 사용`)
    return "item103"
  }

  // item104 : 급냉 쭈꾸미
  if (keywordLower === "급냉 쭈꾸미" || keywordLower === "급냉쭈꾸미") {
    console.log(`[STORAGE] '급냉 쭈꾸미' 키워드 감지 -> item104 폴더 사용`)
    return "item104"
  }

  // item105 : 찰옥수수 혼합 3종
  if (keywordLower === "찰옥수수 혼합 3종" || keywordLower === "찰옥수수혼합3종") {
    console.log(`[STORAGE] '찰옥수수 혼합 3종' 키워드 감지 -> item105 폴더 사용`)
    return "item105"
  }

  // item106 : 초당옥수수, 하우스 초당옥수수
  if (keywordLower === "초당옥수수" || keywordLower === "하우스 초당옥수수" || keywordLower === "하우스초당옥수수") {
    console.log(`[STORAGE] '초당옥수수/하우스 초당옥수수' 키워드 감지 -> item106 폴더 사용`)
    return "item106"
  }

  // item107 : 백골뱅이
  if (keywordLower === "백골뱅이") {
    console.log(`[STORAGE] '백골뱅이' 키워드 감지 -> item107 폴더 사용`)
    return "item107"
  }

  // item108 : 무농약 유러피언 채소
  if (keywordLower === "무농약 유러피언 채소" || keywordLower === "무농약유러피언채소") {
    console.log(`[STORAGE] '무농약 유러피언 채소' 키워드 감지 -> item108 폴더 사용`)
    return "item108"
  }

  // item109 : 왕우럭조개
  if (keywordLower === "왕우럭조개") {
    console.log(`[STORAGE] '왕우럭조개' 키워드 감지 -> item109 폴더 사용`)
    return "item109"
  }

  // item110 : 키조개관자
  if (keywordLower === "키조개관자") {
    console.log(`[STORAGE] '키조개관자' 키워드 감지 -> item110 폴더 사용`)
    return "item110"
  }

  // item111 : 낙지 호롱이
  if (keywordLower === "낙지 호롱이" || keywordLower === "낙지호롱이") {
    console.log(`[STORAGE] '낙지 호롱이' 키워드 감지 -> item111 폴더 사용`)
    return "item111"
  }

  // item112 : 남해 건홍합
  if (keywordLower === "남해 건홍합" || keywordLower === "남해건홍합") {
    console.log(`[STORAGE] '남해 건홍합' 키워드 감지 -> item112 폴더 사용`)
    return "item112"
  }

  // item113 : 쫄쫄이오징어
  if (keywordLower === "쫄쫄이오징어" || keywordLower === "쫄쫄이 오징어") {
    console.log(`[STORAGE] '쫄쫄이오징어' 키워드 감지 -> item113 폴더 사용`)
    return "item113"
  }

  // item114 : 영광 굴비
  if (keywordLower === "영광 굴비" || keywordLower === "영광굴비") {
    console.log(`[STORAGE] '영광 굴비' 키워드 감지 -> item114 폴더 사용`)
    return "item114"
  }

  // item115 : 홍게, 구룡포 홍게
  if (keywordLower === "홍게" || keywordLower === "구룡포 홍게" || keywordLower === "구룡포홍게") {
    console.log(`[STORAGE] '홍게/구룡포 홍게' 키워드 감지 -> item115 폴더 사용`)
    return "item115"
  }

  // item116 : 가시오이
  if (keywordLower === "가시오이" || keywordLower === "가시 오이") {
    console.log(`[STORAGE] '가시오이' 키워드 감지 -> item116 폴더 사용`)
    return "item116"
  }

  // item117 : 가정용 쥬키니 호박
  if (keywordLower === "가정용 쥬키니 호박" || keywordLower === "가정용쥬키니호박") {
    console.log(`[STORAGE] '가정용 쥬키니 호박' 키워드 감지 -> item117 폴더 사용`)
    return "item117"
  }

  // item118 : 가정용 애호박
  if (keywordLower === "가정용 애호박" || keywordLower === "가정용애호박") {
    console.log(`[STORAGE] '가정용 애호박' 키워드 감지 -> item118 폴더 사용`)
    return "item118"
  }

  // item119 : 괴산 삶은 대학찰옥수수 냉동
  if (keywordLower === "괴산 삶은 대학찰옥수수 냉동" || keywordLower === "괴산삶은대학찰옥수수냉동") {
    console.log(`[STORAGE] '괴산 삶은 대학찰옥수수 냉동' 키워드 감지 -> item119 폴더 사용`)
    return "item119"
  }

  // item120 : 완도 활전복 선물세트
  if (keywordLower === "완도 활전복 선물세트" || keywordLower === "완도활전복선물세트") {
    console.log(`[STORAGE] '완도 활전복 선물세트' 키워드 감지 -> item120 폴더 사용`)
    return "item120"
  }

  // item121 : 제주 옥돔 선물세트
  if (keywordLower === "제주 옥돔 선물세트" || keywordLower === "제주옥돔선물세트") {
    console.log(`[STORAGE] '제주 옥돔 선물세트' 키워드 감지 -> item121 폴더 사용`)
    return "item121"
  }

  // item122 : 청국장
  if (keywordLower === "청국장") {
    console.log(`[STORAGE] '청국장' 키워드 감지 -> item122 폴더 사용`)
    return "item122"
  }

  // item123 : 현미 쌀과자
  if (keywordLower === "현미 쌀과자" || keywordLower === "현미쌀과자") {
    console.log(`[STORAGE] '현미 쌀과자' 키워드 감지 -> item123 폴더 사용`)
    return "item123"
  }

  // item124 : 수제 누룽지
  if (keywordLower === "수제 누룽지" || keywordLower === "수제누룽지") {
    console.log(`[STORAGE] '수제 누룽지' 키워드 감지 -> item124 폴더 사용`)
    return "item124"
  }

  // item125 : 글루텐프리 면
  if (keywordLower === "글루텐프리 면" || keywordLower === "글루텐프리면") {
    console.log(`[STORAGE] '글루텐프리 면' 키워드 감지 -> item125 폴더 사용`)
    return "item125"
  }

  // item126 : 닭 특수부위
  if (keywordLower === "닭 특수부위" || keywordLower === "닭특수부위") {
    console.log(`[STORAGE] '닭 특수부위' 키워드 감지 -> item126 폴더 사용`)
    return "item126"
  }

  // item127 : 닭내장탕
  if (keywordLower === "닭내장탕") {
    console.log(`[STORAGE] '닭내장탕' 키워드 감지 -> item127 폴더 사용`)
    return "item127"
  }

  // item128 : 백골뱅이탕
  if (keywordLower === "백골뱅이탕") {
    console.log(`[STORAGE] '백골뱅이탕' 키워드 감지 -> item128 폴더 사용`)
    return "item128"
  }

  // item129 : 왕목살
  if (keywordLower === "왕목살") {
    console.log(`[STORAGE] '왕목살' 키워드 감지 -> item129 폴더 사용`)
    return "item129"
  }

  // item130 : 돈삼겹살
  if (keywordLower === "돈삼겹살") {
    console.log(`[STORAGE] '돈삼겹살' 키워드 감지 -> item130 폴더 사용`)
    return "item130"
  }

  // item131 : 호주산 소고기
  if (keywordLower === "호주산 소고기" || keywordLower === "호주산소고기") {
    console.log(`[STORAGE] '호주산 소고기' 키워드 감지 -> item131 폴더 사용`)
    return "item131"
  }

  // item132 : 미국산 소고기
  if (keywordLower === "미국산 소고기" || keywordLower === "미국산소고기") {
    console.log(`[STORAGE] '미국산 소고기' 키워드 감지 -> item132 폴더 사용`)
    return "item132"
  }

  // item133 : LA갈비
  if (keywordLower === "la갈비") {
    console.log(`[STORAGE] 'LA갈비' 키워드 감지 -> item133 폴더 사용`)
    return "item133"
  }

  // item134 : 칼집 약단밤
  if (keywordLower === "칼집 약단밤" || keywordLower === "칼집약단밤") {
    console.log(`[STORAGE] '칼집 약단밤' 키워드 감지 -> item134 폴더 사용`)
    return "item134"
  }

  // item135 : 흙 생강
  if (keywordLower === "흙 생강" || keywordLower === "흙생강" || keywordLower === "생강") {
    console.log(`[STORAGE] '흙 생강' 키워드 감지 -> item135 폴더 사용`)
    return "item135"
  }

  // item136 : 양파
  if (keywordLower === "양파") {
    console.log(`[STORAGE] '양파' 키워드 감지 -> item136 폴더 사용`)
    return "item136"
  }

  // item137 : 콜라비
  if (keywordLower === "콜라비") {
    console.log(`[STORAGE] '콜라비' 키워드 감지 -> item137 폴더 사용`)
    return "item137"
  }

  // item138 : 제주산 옥돔
  if (keywordLower === "제주산 옥돔" || keywordLower === "제주산옥돔") {
    console.log(`[STORAGE] '제주산 옥돔' 키워드 감지 -> item138 폴더 사용`)
    return "item138"
  }

  // item139 : 완도 활전복
  if (keywordLower === "완도 활전복" || keywordLower === "완도활전복") {
    console.log(`[STORAGE] '완도 활전복' 키워드 감지 -> item139 폴더 사용`)
    return "item139"
  }

  // item140 : 스테비아 방울토마토
  if (keywordLower === "스테비아 방울토마토" || keywordLower === "스테비아방울토마토") {
    console.log(`[STORAGE] '스테비아 방울토마토' 키워드 감지 -> item140 폴더 사용`)
    return "item140"
  }

  // item141 : 부사 사과
  if (keywordLower === "부사 사과" || keywordLower === "부사사과") {
    console.log(`[STORAGE] '부사 사과' 키워드 감지 -> item141 폴더 사용`)
    return "item141"
  }

  // item142 : 경북 사과
  if (keywordLower === "경북 사과" || keywordLower === "경북사과") {
    console.log(`[STORAGE] '경북 사과' 키워드 감지 -> item142 폴더 사용`)
    return "item142"
  }

  // item143 : 갓김치
  if (keywordLower === "갓김치") {
    console.log(`[STORAGE] '갓김치' 키워드 감지 -> item143 폴더 사용`)
    return "item143"
  }

  // item144 : 암꽃게장
  if (keywordLower === "암꽃게장") {
    console.log(`[STORAGE] '암꽃게장' 키워드 감지 -> item144 폴더 사용`)
    return "item144"
  }

  // item145 : 전라도 파김치
  if (keywordLower === "전라도 파김치" || keywordLower === "전라도파김치") {
    console.log(`[STORAGE] '전라도 파김치' 키워드 감지 -> item145 폴더 사용`)
    return "item145"
  }

  // item146 : 밥새우
  if (keywordLower === "밥새우") {
    console.log(`[STORAGE] '밥새우' 키워드 감지 -> item146 폴더 사용`)
    return "item146"
  }

  // item147 : 연평도 양념게장
  if (keywordLower === "연평도 양념게장" || keywordLower === "연평도양념게장") {
    console.log(`[STORAGE] '연평도 양념게장' 키워드 감지 -> item147 폴더 사용`)
    return "item147"
  }

  // item148 : 곶감 선물세트
  if (keywordLower === "곶감 선물세트" || keywordLower === "곶감선물세트") {
    console.log(`[STORAGE] '곶감 선물세트' 키워드 감지 -> item148 폴더 사용`)
    return "item148"
  }

  // item149 : 물바지락
  if (keywordLower === "물바지락") {
    console.log(`[STORAGE] '물바지락' 키워드 감지 -> item149 폴더 사용`)
    return "item149"
  }

  // item150 : 키조개
  if (keywordLower === "키조개") {
    console.log(`[STORAGE] '키조개' 키워드 감지 -> item150 폴더 사용`)
    return "item150"
  }

  // item151 : 노랑새조개
  if (keywordLower === "노랑새조개") {
    console.log(`[STORAGE] '노랑새조개' 키워드 감지 -> item151 폴더 사용`)
    return "item151"
  }

  // item152 : 초코새조개
  if (keywordLower === "초코새조개") {
    console.log(`[STORAGE] '초코새조개' 키워드 감지 -> item152 폴더 사용`)
    return "item152"
  }

  // item153 : 참백합
  if (keywordLower === "참백합") {
    console.log(`[STORAGE] '참백합' 키워드 감지 -> item153 폴더 사용`)
    return "item153"
  }

  // item154 : 선동오징어
  if (keywordLower === "선동오징어") {
    console.log(`[STORAGE] '선동오징어' 키워드 감지 -> item154 폴더 사용`)
    return "item154"
  }

  // item155 : 채낚이 오징어
  if (keywordLower === "채낚이 오징어" || keywordLower === "채낚이오징어") {
    console.log(`[STORAGE] '채낚이 오징어' 키워드 감지 -> item155 폴더 사용`)
    return "item155"
  }

  // item156 : 황도 말랑이
  if (keywordLower === "황도 말랑이" || keywordLower === "황도말랑이") {
    console.log(`[STORAGE] '황도 말랑이' 키워드 감지 -> item156 폴더 사용`)
    return "item156"
  }

  // item157 : 백도 말랑이
  if (keywordLower === "백도 말랑이" || keywordLower === "백도말랑이") {
    console.log(`[STORAGE] '백도 말랑이' 키워드 감지 -> item157 폴더 사용`)
    return "item157"
  }

  // item158 : 털복숭아
  if (keywordLower === "털복숭아") {
    console.log(`[STORAGE] '털복숭아' 키워드 감지 -> item158 폴더 사용`)
    return "item158"
  }

  console.log(`[STORAGE] 지원하지 않는 키워드 -> 이미지 처리 안함`)
  return null
}

/**
 * 특정 위치가 human 프레임인지 확인하는 함수
 * human 프레임: 농부/어부가 들고 있는 이미지 위치
 */
export function isHumanFrame(position: { x: number; y: number }): boolean {
  const { x, y } = position

  // 농부/어부가 들고 있는 이미지 위치 (94, 12847)
  if (x === 94 && y === 12847) {
    console.log(`[STORAGE] Human 프레임 감지: (${x}, ${y})`)
    return true
  }

  return false
}

/**
 * Human 전용 이미지 폴더에서 이미지를 가져오는 함수
 */
export async function getHumanImages(): Promise<string[]> {
  try {
    console.log("[STORAGE] Human 이미지 폴더에서 이미지 가져오기 시작")

    // human 폴더에서 이미지 가져오기
    const humanImages = await getStorageImages("images", "human")

    if (humanImages.length === 0) {
      console.warn("[STORAGE] Human 폴더에 이미지가 없습니다")
      return []
    }

    console.log(`[STORAGE] Human 이미지 ${humanImages.length}개 발견`)
    return humanImages
  } catch (error) {
    console.error("[STORAGE] Human 이미지 가져오기 중 오류:", error)
    return []
  }
}

/**
 * 키워드에 맞는 이미지를 가져와서 템플릿의 이미지 프레임에 자동 적용하는 함수
 */
export async function applyKeywordImagesToTemplate(
  keyword: string,
  elements: any[],
): Promise<{ success: boolean; updatedElements?: any[]; message?: string }> {
  try {
    console.log(`[AUTO-APPLY] 키워드 "${keyword}"에 맞는 이미지 자동 적용 시작`)

    const folderPath = getStorageFolderByKeyword(keyword)
    if (!folderPath) {
      console.log(`[AUTO-APPLY] 지원하지 않는 키워드: ${keyword}`)
      return { success: false, message: "지원하지 않는 키워드입니다." }
    }

    // 일반 이미지와 human 이미지 가져오기
    const [generalImages, humanImages] = await Promise.all([getStorageImages("images", folderPath), getHumanImages()])

    if (generalImages.length === 0) {
      console.warn(`[AUTO-APPLY] ${folderPath} 폴더에 이미지가 없습니다`)
      return { success: false, message: "해당 키워드의 이미지가 없습니다." }
    }

    console.log(`[AUTO-APPLY] 일반 이미지 ${generalImages.length}개, Human 이미지 ${humanImages.length}개 발견`)

    // 이미지 프레임 요소들 찾기
    const imageFrameElements = elements.filter((el) => el.type === "imageFrame" || el.type === "image-frame")

    if (imageFrameElements.length === 0) {
      console.log(`[AUTO-APPLY] 이미지 프레임이 없습니다`)
      return { success: false, message: "이미지 프레임이 없습니다." }
    }

    console.log(`[AUTO-APPLY] ${imageFrameElements.length}개의 이미지 프레임 발견`)

    // 요소들을 복사하여 수정
    const updatedElements = [...elements]

    // 각 이미지 프레임에 적절한 이미지 적용
    let appliedCount = 0
    for (const frameElement of imageFrameElements) {
      const elementIndex = updatedElements.findIndex((el) => el.id === frameElement.id)
      if (elementIndex === -1) continue

      let selectedImage: string | null = null

      // Human 프레임인지 확인
      if (isHumanFrame(frameElement.position)) {
        // Human 이미지 사용
        if (humanImages.length > 0) {
          selectedImage = getRandomItem(humanImages)
          console.log(
            `[AUTO-APPLY] Human 프레임 (${frameElement.position.x}, ${frameElement.position.y})에 Human 이미지 적용`,
          )
        }
      } else {
        // 일반 이미지 사용
        selectedImage = getRandomItem(generalImages)
        console.log(
          `[AUTO-APPLY] 일반 프레임 (${frameElement.position.x}, ${frameElement.position.y})에 일반 이미지 적용`,
        )
      }

      if (selectedImage) {
        updatedElements[elementIndex] = {
          ...updatedElements[elementIndex],
          imageSrc: selectedImage,
          hasImage: true,
          imageFileName: `${keyword}_${appliedCount + 1}.jpg`,
        }
        appliedCount++
        console.log(`[AUTO-APPLY] 이미지 적용 완료: ${selectedImage}`)
      }
    }

    console.log(`[AUTO-APPLY] 총 ${appliedCount}개의 이미지 프레임에 이미지 적용 완료`)

    return {
      success: true,
      updatedElements,
      message: `${appliedCount}개의 이미지 프레임에 "${keyword}" 이미지가 적용되었습니다.`,
    }
  } catch (error) {
    console.error("[AUTO-APPLY] 이미지 자동 적용 중 오류:", error)
    return {
      success: false,
      message: "이미지 자동 적용 중 오류가 발생했습니다.",
    }
  }
}

/**
 * 특정 이미지 프레임에 키워드에 맞는 이미지를 적용하는 함수
 */
export async function applySingleKeywordImage(
  keyword: string,
  position: { x: number; y: number },
): Promise<{ success: boolean; imageUrl?: string; message?: string }> {
  try {
    console.log(`[SINGLE-APPLY] 위치 (${position.x}, ${position.y})에 "${keyword}" 이미지 적용 시작`)

    const folderPath = getStorageFolderByKeyword(keyword)
    if (!folderPath) {
      return { success: false, message: "지원하지 않는 키워드입니다." }
    }

    let selectedImage: string | null = null

    // Human 프레임인지 확인
    if (isHumanFrame(position)) {
      const humanImages = await getHumanImages()
      if (humanImages.length > 0) {
        selectedImage = getRandomItem(humanImages)
        console.log(`[SINGLE-APPLY] Human 이미지 선택: ${selectedImage}`)
      }
    } else {
      const generalImages = await getStorageImages("images", folderPath)
      if (generalImages.length > 0) {
        selectedImage = getRandomItem(generalImages)
        console.log(`[SINGLE-APPLY] 일반 이미지 선택: ${selectedImage}`)
      }
    }

    if (!selectedImage) {
      return { success: false, message: "해당 키워드의 이미지가 없습니다." }
    }

    return {
      success: true,
      imageUrl: selectedImage,
      message: "이미지가 성공적으로 적용되었습니다.",
    }
  } catch (error) {
    console.error("[SINGLE-APPLY] 단일 이미지 적용 중 오류:", error)
    return {
      success: false,
      message: "이미지 적용 중 오류가 발생했습니다.",
    }
  }
}
