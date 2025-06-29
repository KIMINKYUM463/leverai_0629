// 페이지 빌더 설정 상수
export const CANVAS_WIDTH = 860
export const DEFAULT_CANVAS_HEIGHT = 1200
export const MAX_CANVAS_HEIGHT = 50000 // 최대 캔버스 높이 추가
export const MIN_CANVAS_HEIGHT = 500 // 최소 캔버스 높이 추가

// 사이드바 메뉴 아이템
export const SIDEBAR_ITEMS = [
  { id: "templates", icon: "Layout", label: "템플릿" },
  { id: "photos", icon: "ImageIcon", label: "사진" },
  { id: "uploads", icon: "Upload", label: "업로드" },
  { id: "elements", icon: "Grid", label: "요소" },
  { id: "text", icon: "Type", label: "텍스트" },
]

// 키보드 단축키
export const KEYBOARD_SHORTCUTS = {
  COPY: ["c", "Control"],
  PASTE: ["v", "Control"],
  DELETE: ["Delete", "Backspace"],
  UNDO: ["z", "Control"],
  REDO: ["y", "Control"],
  REDO_ALT: ["z", "Control", "Shift"],
  ARROW_UP: ["ArrowUp"],
  ARROW_DOWN: ["ArrowDown"],
  ARROW_LEFT: ["ArrowLeft"],
  ARROW_RIGHT: ["ArrowRight"],
  FINE_MOVE_UP: ["ArrowUp", "Shift"],
  FINE_MOVE_DOWN: ["ArrowDown", "Shift"],
  FINE_MOVE_LEFT: ["ArrowLeft", "Shift"],
  FINE_MOVE_RIGHT: ["ArrowRight", "Shift"],
}

// 이동 거리
export const MOVE_DISTANCE = {
  NORMAL: 10,
  FINE: 1,
}
