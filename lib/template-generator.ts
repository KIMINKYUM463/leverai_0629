export function createPremiumTemplate() {
  const elements = []
  const canvasWidth = 400 // 상세페이지 편집 영역과 동일한 가로 크기

  // 1. 상단 배경 그라데이션 (검은색에서 흰색으로)
  elements.push({
    id: `bg-gradient-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 고유 ID 생성
    type: "shape",
    shapeType: "rectangle",
    name: "상단 배경 그라데이션",
    position: { x: 0, y: 0 },
    size: { width: canvasWidth, height: 280 }, // 높이 조정
    rotation: 0,
    zIndex: 1,
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 0,
    opacity: 1,
    gradientEnabled: true,
    gradientDirection: "to bottom",
    gradientStartColor: "#262626", // 어두운 회색
    gradientEndColor: "#E5E5E5", // 밝은 회색
    // 그룹 관련 속성 제거
    groupId: undefined,
    isGrouped: false,
  })

  // 2. Premium 텍스트
  elements.push({
    id: `text-premium-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: "text",
    textStyle: "body", // 스타일 변경
    styleName: "Premium 텍스트",
    content: "Premium",
    position: { x: 160, y: 30 }, // 위치 조정
    size: { width: 80, height: 20 }, // 크기 조정
    rotation: 0,
    zIndex: 10,
    color: "#FFFFFF",
    backgroundColor: "transparent",
    computedStyle: {
      fontSize: 14, // 크기 조정
      fontFamily: "Inter",
      fontWeight: "500", // 굵기 조정
      textAlign: "center",
      lineHeight: 1.5,
      letterSpacing: 0,
      fontStyle: "normal",
      textDecoration: "none",
    },
    groupId: undefined,
    isGrouped: false,
  })

  // 3. 메인제목 텍스트 (빨간색)
  elements.push({
    id: `text-main-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: "text",
    textStyle: "heading",
    styleName: "메인 제목",
    content: "메인제목",
    position: { x: 125, y: 60 }, // 위치 조정
    size: { width: 150, height: 40 }, // 크기 조정
    rotation: 0,
    zIndex: 10,
    color: "#F87171", // 색상 조정 (더 밝은 빨강)
    backgroundColor: "transparent",
    computedStyle: {
      fontSize: 28, // 크기 조정
      fontFamily: "Inter",
      fontWeight: "bold", // 굵기 조정
      textAlign: "center",
      lineHeight: 1.2,
      letterSpacing: 0,
      fontStyle: "normal",
      textDecoration: "none",
    },
    groupId: undefined,
    isGrouped: false,
  })

  // 4. 메인카피1 텍스트
  elements.push({
    id: `text-copy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: "text",
    textStyle: "body",
    styleName: "메인 카피",
    content: "메인카피1",
    position: { x: 160, y: 110 }, // 위치 조정
    size: { width: 80, height: 20 }, // 크기 조정
    rotation: 0,
    zIndex: 10,
    color: "#FFFFFF",
    backgroundColor: "transparent",
    computedStyle: {
      fontSize: 12, // 크기 조정
      fontFamily: "Inter",
      fontWeight: "400",
      textAlign: "center",
      lineHeight: 1.5,
      letterSpacing: 0,
      fontStyle: "normal",
      textDecoration: "none",
    },
    groupId: undefined,
    isGrouped: false,
  })

  // 5. 상단 체크무늬 패턴을 사각형 이미지 프레임으로 대체
  elements.push({
    id: `image-frame-top-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 고유 ID
    type: "image-frame",
    frameType: "rectangle",
    name: "상단 이미지 영역",
    position: { x: 0, y: 140 }, // 위치 조정
    size: { width: canvasWidth, height: 140 }, // 크기 조정
    rotation: 0,
    zIndex: 5,
    backgroundColor: "#F3F4F6", // 배경색 변경
    borderColor: "transparent", // 테두리 없음
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 0, // 모서리 없음
    opacity: 1,
    imageSrc: null,
    groupId: undefined,
    isGrouped: false,
  })

  // 6. 첫 번째 체크마크와 텍스트들 (흰색 배경)
  elements.push({
    id: `white-bg-hook1-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: "shape",
    shapeType: "rectangle",
    name: "후킹1 배경",
    position: { x: 0, y: 280 },
    size: { width: canvasWidth, height: 70 },
    rotation: 0,
    zIndex: 2,
    backgroundColor: "#FFFFFF",
    borderColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 0,
    opacity: 1,
    gradientEnabled: false,
    groupId: undefined,
    isGrouped: false,
  })

  const firstCheckY = 295 // Y 위치 조정
  const checkPositions1 = [
    { x: 65, text: "후킹1" }, // X 위치 조정
    { x: 185, text: "후킹2" }, // X 위치 조정
    { x: 305, text: "후킹3" }, // X 위치 조정
  ]

  checkPositions1.forEach((item, index) => {
    // 체크마크
    elements.push({
      id: `check1-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 고유 ID
      type: "text",
      textStyle: "heading",
      styleName: `체크마크1 ${index + 1}`,
      content: "✓",
      position: { x: item.x, y: firstCheckY },
      size: { width: 20, height: 20 },
      rotation: 0,
      zIndex: 10,
      color: "#EF4444",
      backgroundColor: "transparent",
      computedStyle: {
        fontSize: 18, // 크기 조정
        fontFamily: "Inter",
        fontWeight: "bold", // 굵기 조정
        textAlign: "center",
        lineHeight: 1,
        letterSpacing: 0,
        fontStyle: "normal",
        textDecoration: "none",
      },
      groupId: undefined,
      isGrouped: false,
    })

    // 후킹 텍스트
    elements.push({
      id: `hook1-text-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 고유 ID
      type: "text",
      textStyle: "body",
      styleName: `후킹1 텍스트 ${index + 1}`,
      content: item.text,
      position: { x: item.x - 20, y: firstCheckY + 25 }, // 위치 조정
      size: { width: 60, height: 20 }, // 크기 조정
      rotation: 0,
      zIndex: 10,
      color: "#374151",
      backgroundColor: "transparent",
      computedStyle: {
        fontSize: 11, // 크기 조정
        fontFamily: "Inter",
        fontWeight: "500", // 굵기 조정
        textAlign: "center",
        lineHeight: 1.5,
        letterSpacing: 0,
        fontStyle: "normal",
        textDecoration: "none",
      },
      groupId: undefined,
      isGrouped: false,
    })
  })

  // 7. 중간 섹션 배경 (밝은 회색)
  elements.push({
    id: `gray-bg-mid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: "shape",
    shapeType: "rectangle",
    name: "중간 배경",
    position: { x: 0, y: 350 },
    size: { width: canvasWidth, height: 480 }, // 높이 조정
    rotation: 0,
    zIndex: 2,
    backgroundColor: "#F3F4F6", // 배경색 변경
    borderColor: "transparent",
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 0,
    opacity: 1,
    gradientEnabled: false,
    groupId: undefined,
    isGrouped: false,
  })

  // 8. 후킹제목2
  elements.push({
    id: `text-hook-title2-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: "text",
    textStyle: "heading",
    styleName: "후킹제목2",
    content: "후킹제목2",
    position: { x: 120, y: 380 }, // 위치 조정
    size: { width: 160, height: 30 }, // 크기 조정
    rotation: 0,
    zIndex: 10,
    color: "#1F2937", // 색상 변경 (더 진한 검정)
    backgroundColor: "transparent",
    computedStyle: {
      fontSize: 22, // 크기 조정
      fontFamily: "Inter",
      fontWeight: "bold", // 굵기 조정
      textAlign: "center",
      lineHeight: 1.3,
      letterSpacing: 0,
      fontStyle: "normal",
      textDecoration: "none",
    },
    groupId: undefined,
    isGrouped: false,
  })

  // 9. 메인제목 (두 번째, 빨간색)
  elements.push({
    id: `text-main2-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: "text",
    textStyle: "heading",
    styleName: "메인제목2",
    content: "메인제목",
    position: { x: 120, y: 415 }, // 위치 조정
    size: { width: 160, height: 30 }, // 크기 조정
    rotation: 0,
    zIndex: 10,
    color: "#EF4444",
    backgroundColor: "transparent",
    computedStyle: {
      fontSize: 18, // 크기 조정
      fontFamily: "Inter",
      fontWeight: "bold", // 굵기 조정
      textAlign: "center",
      lineHeight: 1.2,
      letterSpacing: 0,
      fontStyle: "normal",
      textDecoration: "none",
    },
    groupId: undefined,
    isGrouped: false,
  })

  // 10. 후킹문장
  elements.push({
    id: `text-hook-sentence-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: "text",
    textStyle: "body",
    styleName: "후킹문장",
    content: "후킹문장",
    position: { x: 150, y: 450 }, // 위치 조정
    size: { width: 100, height: 20 }, // 크기 조정
    rotation: 0,
    zIndex: 10,
    color: "#4B5563", // 색상 변경
    backgroundColor: "transparent",
    computedStyle: {
      fontSize: 12, // 크기 조정
      fontFamily: "Inter",
      fontWeight: "400",
      textAlign: "center",
      lineHeight: 1.5,
      letterSpacing: 0,
      fontStyle: "normal",
      textDecoration: "none",
    },
    groupId: undefined,
    isGrouped: false,
  })

  // 11. 태그 버튼들
  const tagY = 485
  const tagTexts = ["#태그1", "#태그2", "#태그3", "#태그4", "#태그5", "#태그6"]
  const tagPositions = [
    { x: 55, y: tagY, width: 55 },
    { x: 120, y: tagY, width: 55 },
    { x: 185, y: tagY, width: 55 },
    { x: 250, y: tagY, width: 55 },
    { x: 315, y: tagY, width: 55 },
    { x: 185, y: tagY + 35, width: 55 }, // 두 번째 줄
  ]

  tagPositions.forEach((pos, index) => {
    if (index < tagTexts.length) {
      elements.push({
        id: `tag-bg-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 고유 ID
        type: "shape",
        shapeType: "rectangle",
        name: `태그 배경 ${index + 1}`,
        position: { x: pos.x, y: pos.y },
        size: { width: pos.width, height: 24 }, // 크기 조정
        rotation: 0,
        zIndex: 8,
        backgroundColor: "#FFFFFF", // 배경색 흰색
        borderColor: "#D1D5DB", // 테두리 색상
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 12, // 둥근 모서리
        opacity: 1,
        gradientEnabled: false,
        groupId: undefined,
        isGrouped: false,
      })

      elements.push({
        id: `tag-text-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 고유 ID
        type: "text",
        textStyle: "body",
        styleName: `태그 텍스트 ${index + 1}`,
        content: tagTexts[index],
        position: { x: pos.x + 5, y: pos.y + 4 }, // 위치 조정
        size: { width: pos.width - 10, height: 16 }, // 크기 조정
        rotation: 0,
        zIndex: 9,
        color: "#4B5563", // 글자색
        backgroundColor: "transparent",
        computedStyle: {
          fontSize: 10, // 크기 조정
          fontFamily: "Inter",
          fontWeight: "500", // 굵기 조정
          textAlign: "center",
          lineHeight: 1.6, // 줄 간격 조정
          letterSpacing: 0,
          fontStyle: "normal",
          textDecoration: "none",
        },
        groupId: undefined,
        isGrouped: false,
      })
    }
  })

  // 12. 큰 원형 이미지 프레임
  elements.push({
    id: `image-frame-circle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // 고유 ID
    type: "image-frame",
    frameType: "circle",
    name: "원형 이미지 영역",
    position: { x: 100, y: 560 }, // 위치 조정
    size: { width: 200, height: 200 },
    rotation: 0,
    zIndex: 5,
    backgroundColor: "#E5E7EB", // 배경색 변경
    borderColor: "transparent", // 테두리 없음
    borderWidth: 0,
    borderStyle: "none",
    borderRadius: 100,
    opacity: 1,
    imageSrc: null,
    groupId: undefined,
    isGrouped: false,
  })

  // 나머지 요소들도 동일하게 고유 ID와 그룹 해제 적용...
  // (계속해서 모든 요소에 고유 ID 적용)

  return elements
}
