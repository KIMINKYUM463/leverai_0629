"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface TextEditorSidebarProps {
  selectedElement: any
  onUpdateElement: (updates: any) => void
  onClose: () => void
}

export function TextEditorSidebar({ selectedElement, onUpdateElement, onClose }: TextEditorSidebarProps) {
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState("Inter")
  const [fontWeight, setFontWeight] = useState("400")
  const [textAlign, setTextAlign] = useState("left")
  const [lineHeight, setLineHeight] = useState(1.5)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [textColor, setTextColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("transparent")
  const [fontStyle, setFontStyle] = useState("normal")
  const [textDecoration, setTextDecoration] = useState("none")

  // 그림자 관련 상태 추가
  const [textShadowEnabled, setTextShadowEnabled] = useState(false)
  const [shadowOffsetX, setShadowOffsetX] = useState(2)
  const [shadowOffsetY, setShadowOffsetY] = useState(2)
  const [shadowBlur, setShadowBlur] = useState(4)
  const [shadowColor, setShadowColor] = useState("#000000")
  const [shadowOpacity, setShadowOpacity] = useState(0.5)

  // 폰트 패밀리 옵션
  const fontFamilyOptions = [
    { value: "Inter", label: "Inter" },
    { value: "Arial", label: "Arial" },
    { value: "Helvetica", label: "Helvetica" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Georgia", label: "Georgia" },
    { value: "Verdana", label: "Verdana" },
    { value: "Courier New", label: "Courier New" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
  ]

  // 폰트 굵기 옵션
  const fontWeightOptions = [
    { value: "100", label: "Thin" },
    { value: "200", label: "Extra Light" },
    { value: "300", label: "Light" },
    { value: "400", label: "Regular" },
    { value: "500", label: "Medium" },
    { value: "600", label: "Semi Bold" },
    { value: "700", label: "Bold" },
    { value: "800", label: "Extra Bold" },
    { value: "900", label: "Black" },
  ]

  // 텍스트 정렬 옵션
  const textAlignOptions = [
    { value: "left", label: "왼쪽 정렬" },
    { value: "center", label: "가운데 정렬" },
    { value: "right", label: "오른쪽 정렬" },
    { value: "justify", label: "양쪽 정렬" },
  ]

  // 미리 정의된 색상 레트
  const colorPalette = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
    "#A52A2A",
    "#808080",
    "#008000",
    "#000080",
    "#800000",
    "#F0F8FF",
    "#FAEBD7",
    "#7FFFD4",
    "#F0FFFF",
    "#F5F5DC",
    "#FFE4C4",
    "#FFEBCD",
    "#0000CD",
    "#8A2BE2",
    "#A52A2A",
    "#DEB887",
    "#5F9EA0",
    "#7FFF00",
    "#D2691E",
    "#FF7F50",
    "#6495ED",
  ]

  // 선택된 요소의 현재 스타일을 초기값으로 설정
  useEffect(() => {
    if (selectedElement && selectedElement.computedStyle) {
      const style = selectedElement.computedStyle
      setFontSize(style.fontSize || 16)
      setFontFamily(style.fontFamily || "Inter")
      setFontWeight(style.fontWeight || "400")
      setTextAlign(style.textAlign || "left")
      setLineHeight(style.lineHeight || 1.5)
      setLetterSpacing(style.letterSpacing || 0)
      setFontStyle(style.fontStyle || "normal")
      setTextDecoration(style.textDecoration || "none")
      setTextShadowEnabled(style.textShadowEnabled || false)
      setShadowOffsetX(style.shadowOffsetX || 2)
      setShadowOffsetY(style.shadowOffsetY || 2)
      setShadowBlur(style.shadowBlur || 4)
      setShadowColor(style.shadowColor || "#000000")
      setShadowOpacity(style.shadowOpacity || 0.5)
    }
    if (selectedElement) {
      setTextColor(selectedElement.color || "#000000")
      setBackgroundColor(selectedElement.backgroundColor || "transparent")
    }
  }, [selectedElement])

  // 스타일 업데이트 함수
  const updateTextStyle = (updates: any) => {
    const computedStyle = {
      ...selectedElement.computedStyle,
      ...updates,
    }
    onUpdateElement({ computedStyle })
  }

  // 색상 업데이트 함수
  const updateTextColor = (color: string) => {
    setTextColor(color)
    onUpdateElement({ color })
  }

  // 배경색 업데이트 함수
  const updateBackgroundColor = (color: string) => {
    setBackgroundColor(color)
    onUpdateElement({ backgroundColor: color })
  }

  // 폰트 크기 변경
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0]
    setFontSize(newSize)
    updateTextStyle({ fontSize: newSize })
  }

  // 줄 간격 변경
  const handleLineHeightChange = (value: number[]) => {
    const newLineHeight = value[0]
    setLineHeight(newLineHeight)
    updateTextStyle({ lineHeight: newLineHeight })
  }

  // 자간 변경
  const handleLetterSpacingChange = (value: number[]) => {
    const newSpacing = value[0]
    setLetterSpacing(newSpacing)
    updateTextStyle({ letterSpacing: `${newSpacing}px` })
  }

  // 폰트 패밀리 변경
  const handleFontFamilyChange = (family: string) => {
    setFontFamily(family)
    updateTextStyle({ fontFamily: family })
  }

  // 폰트 굵기 변경
  const handleFontWeightChange = (weight: string) => {
    setFontWeight(weight)
    updateTextStyle({ fontWeight: weight })
  }

  // 텍스트 정렬 변경
  const handleTextAlignChange = (align: string) => {
    setTextAlign(align)
    updateTextStyle({ textAlign: align })
  }

  // 폰트 스타일 변경 (이탤릭)
  const handleFontStyleChange = (style: string) => {
    setFontStyle(style)
    updateTextStyle({ fontStyle: style })
  }

  // 텍스트 장식 변경 (밑줄, 취소선)
  const handleTextDecorationChange = (decoration: string) => {
    setTextDecoration(decoration)
    updateTextStyle({ textDecoration: decoration })
  }

  // 그림자 토글
  const handleTextShadowToggle = (enabled: boolean) => {
    setTextShadowEnabled(enabled)
    updateTextStyle({ textShadowEnabled: enabled })
  }

  // 그림자 오프셋 X 변경
  const handleShadowOffsetXChange = (value: number[]) => {
    const newOffsetX = value[0]
    setShadowOffsetX(newOffsetX)
    updateTextStyle({ shadowOffsetX: newOffsetX })
  }

  // 그림자 오프셋 Y 변경
  const handleShadowOffsetYChange = (value: number[]) => {
    const newOffsetY = value[0]
    setShadowOffsetY(newOffsetY)
    updateTextStyle({ shadowOffsetY: newOffsetY })
  }

  // 그림자 블러 변경
  const handleShadowBlurChange = (value: number[]) => {
    const newBlur = value[0]
    setShadowBlur(newBlur)
    updateTextStyle({ shadowBlur: newBlur })
  }

  // 그림자 색상 변경
  const handleShadowColorChange = (color: string) => {
    setShadowColor(color)
    updateTextStyle({ shadowColor: color })
  }

  // 그림자 투명도 변경
  const handleShadowOpacityChange = (value: number[]) => {
    const newOpacity = value[0]
    setShadowOpacity(newOpacity)
    updateTextStyle({ shadowOpacity: newOpacity })
  }

  return (
    <div className="h-full bg-[#2A2A2A] border border-gray-700 rounded-lg shadow-2xl overflow-y-auto">
      <div className="p-4 border-b border-gray-700 bg-[#1E1E1E] rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white">텍스트 편집</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white" onClick={onClose}>
            <X size={14} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 폰트 크기 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">폰트 크기: {fontSize}px</Label>
          <Slider
            value={[fontSize]}
            onValueChange={handleFontSizeChange}
            min={8}
            max={150}
            step={1}
            className="w-full"
          />
        </div>

        {/* 폰트 패밀리 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">폰트</Label>
          <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {fontFamilyOptions.map((font) => (
                <SelectItem key={font.value} value={font.value} className="text-white hover:bg-gray-700">
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 폰트 굵기 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">굵기</Label>
          <Select value={fontWeight} onValueChange={handleFontWeightChange}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {fontWeightOptions.map((weight) => (
                <SelectItem key={weight.value} value={weight.value} className="text-white hover:bg-gray-700">
                  {weight.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 텍스트 정렬 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">정렬</Label>
          <Select value={textAlign} onValueChange={handleTextAlignChange}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {textAlignOptions.map((align) => (
                <SelectItem key={align.value} value={align.value} className="text-white hover:bg-gray-700">
                  {align.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 줄 간격 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">줄 간격: {lineHeight}</Label>
          <Slider
            value={[lineHeight]}
            onValueChange={handleLineHeightChange}
            min={0.8}
            max={3}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* 자간 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">자간: {letterSpacing}px</Label>
          <Slider
            value={[letterSpacing]}
            onValueChange={handleLetterSpacingChange}
            min={-5}
            max={10}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* 텍스트 색상 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">텍스트 색상</Label>
          <div className="flex gap-2 items-center mb-3">
            <input
              type="color"
              value={textColor}
              onChange={(e) => updateTextColor(e.target.value)}
              className="w-12 h-8 rounded border border-gray-600 bg-transparent cursor-pointer"
            />
            <Input
              value={textColor}
              onChange={(e) => updateTextColor(e.target.value)}
              className="flex-1 bg-gray-800 border-gray-600 text-white"
              placeholder="#000000"
            />
          </div>

          {/* 텍스트 색상 팔레트 */}
          <div className="grid grid-cols-8 gap-1">
            {colorPalette.map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded border-2 ${textColor === color ? "border-blue-500" : "border-gray-600"}`}
                style={{ backgroundColor: color }}
                onClick={() => updateTextColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* 배경색 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">배경색</Label>
          <div className="flex gap-2 items-center mb-3">
            <input
              type="color"
              value={backgroundColor === "transparent" ? "#FFFFFF" : backgroundColor}
              onChange={(e) => updateBackgroundColor(e.target.value)}
              className="w-12 h-8 rounded border border-gray-600 bg-transparent cursor-pointer"
            />
            <Input
              value={backgroundColor}
              onChange={(e) => updateBackgroundColor(e.target.value)}
              className="flex-1 bg-gray-800 border-gray-600 text-white"
              placeholder="transparent"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => updateBackgroundColor("transparent")}
            className="w-full text-black"
          >
            투명하게
          </Button>
        </div>

        {/* 스타일 옵션 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">스타일</Label>
          <div className="flex gap-2">
            <Button
              variant={fontStyle === "italic" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFontStyleChange(fontStyle === "italic" ? "normal" : "italic")}
              className="flex-1"
            >
              기울임
            </Button>
            <Button
              variant={textDecoration === "underline" ? "default" : "outline"}
              size="sm"
              onClick={() => handleTextDecorationChange(textDecoration === "underline" ? "none" : "underline")}
              className="flex-1"
            >
              밑줄
            </Button>
          </div>
        </div>

        {/* 텍스트 그림자 설정 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium text-gray-300">텍스트 그림자</Label>
            <Button
              variant={textShadowEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => handleTextShadowToggle(!textShadowEnabled)}
              className="text-xs"
            >
              {textShadowEnabled ? "ON" : "OFF"}
            </Button>
          </div>

          {textShadowEnabled && (
            <div className="space-y-4">
              {/* 그림자 색상 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">그림자 색상</Label>
                <div className="flex gap-2 items-center mb-2">
                  <input
                    type="color"
                    value={shadowColor}
                    onChange={(e) => handleShadowColorChange(e.target.value)}
                    className="w-12 h-8 rounded border border-gray-600 bg-transparent cursor-pointer"
                  />
                  <Input
                    value={shadowColor}
                    onChange={(e) => handleShadowColorChange(e.target.value)}
                    className="flex-1 bg-gray-800 border-gray-600 text-white"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* 그림자 투명도 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">
                  투명도: {Math.round(shadowOpacity * 100)}%
                </Label>
                <Slider
                  value={[shadowOpacity]}
                  onValueChange={handleShadowOpacityChange}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* 가로 오프셋 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">가로 오프셋: {shadowOffsetX}px</Label>
                <Slider
                  value={[shadowOffsetX]}
                  onValueChange={handleShadowOffsetXChange}
                  min={-20}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* 세로 오프셋 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">세로 오프셋: {shadowOffsetY}px</Label>
                <Slider
                  value={[shadowOffsetY]}
                  onValueChange={handleShadowOffsetYChange}
                  min={-20}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* 블러 정도 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">블러: {shadowBlur}px</Label>
                <Slider
                  value={[shadowBlur]}
                  onValueChange={handleShadowBlurChange}
                  min={0}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* 그림자 미리보기 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">미리보기</Label>
                <div
                  className="w-full p-4 bg-gray-700 rounded text-center text-white"
                  style={{
                    textShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}${Math.round(
                      shadowOpacity * 255,
                    )
                      .toString(16)
                      .padStart(2, "0")}`,
                  }}
                >
                  그림자 효과 미리보기
                </div>
              </div>

              {/* 그림자 프리셋 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">빠른 그림자</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleShadowColorChange("#000000")
                      handleShadowOffsetXChange([2])
                      handleShadowOffsetYChange([2])
                      handleShadowBlurChange([4])
                      handleShadowOpacityChange([0.5])
                    }}
                    className="text-black"
                  >
                    기본
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleShadowColorChange("#FFFFFF")
                      handleShadowOffsetXChange([1])
                      handleShadowOffsetYChange([1])
                      handleShadowBlurChange([2])
                      handleShadowOpacityChange([0.8])
                    }}
                    className="text-black"
                  >
                    화이트
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleShadowColorChange("#000000")
                      handleShadowOffsetXChange([0])
                      handleShadowOffsetYChange([0])
                      handleShadowBlurChange([8])
                      handleShadowOpacityChange([0.6])
                    }}
                    className="text-black"
                  >
                    글로우
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleShadowColorChange("#FF0000")
                      handleShadowOffsetXChange([3])
                      handleShadowOffsetYChange([3])
                      handleShadowBlurChange([6])
                      handleShadowOpacityChange([0.7])
                    }}
                    className="text-black"
                  >
                    강조
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 요소 정보 */}
        <div className="bg-gray-800 p-3 rounded">
          <Label className="text-sm font-medium text-gray-300 mb-2 block">요소 정보</Label>
          <div className="text-xs text-gray-400 space-y-1">
            <div>타입: {selectedElement?.styleName || "텍스트"}</div>
            <div>
              크기: {Math.round(selectedElement?.size?.width || 0)} × {Math.round(selectedElement?.size?.height || 0)}px
            </div>
            <div>
              위치: ({Math.round(selectedElement?.position?.x || 0)}, {Math.round(selectedElement?.position?.y || 0)})
            </div>
            <div>회전: {Math.round(selectedElement?.rotation || 0)}°</div>
          </div>
        </div>

        {/* 빠른 스타일 프리셋 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">빠른 스타일</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextColor("#000000")
                handleFontWeightChange("700")
                handleFontSizeChange([24])
              }}
              className="text-black"
            >
              제목
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextColor("#666666")
                handleFontWeightChange("400")
                handleFontSizeChange([14])
              }}
              className="text-black"
            >
              본문
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextColor("#FF0000")
                handleFontWeightChange("600")
                handleTextDecorationChange("underline")
              }}
              className="text-black"
            >
              강조
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateTextColor("#888888")
                handleFontWeightChange("300")
                handleFontSizeChange([12])
              }}
              className="text-black"
            >
              캡션
            </Button>
          </div>
        </div>

        {/* 상품구성 텍스트 전용 옵션 */}
        {selectedElement?.content === "상품구성" && (
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">상품구성 옵션</Label>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                // 옵션추가 버튼 클릭 시 동작
                console.log("상품구성 텍스트 옵션추가 클릭됨")
                // 여기에 원하는 동작을 추가하세요
                // 예: 모달 열기, 추가 설정 패널 표시 등
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              옵션추가
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
