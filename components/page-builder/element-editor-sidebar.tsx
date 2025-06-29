"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface ElementEditorSidebarProps {
  selectedElement: any
  onUpdateElement: (updates: any) => void
  onClose: () => void
}

export function ElementEditorSidebar({ selectedElement, onUpdateElement, onClose }: ElementEditorSidebarProps) {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [borderColor, setBorderColor] = useState("#000000")
  const [borderWidth, setBorderWidth] = useState(2)
  const [borderStyle, setBorderStyle] = useState("solid")
  const [borderRadius, setBorderRadius] = useState(0)
  const [opacity, setOpacity] = useState(1)

  // 그라데이션 관련 상태
  const [gradientEnabled, setGradientEnabled] = useState(false)
  const [gradientDirection, setGradientDirection] = useState("to right")
  const [gradientStartColor, setGradientStartColor] = useState("#000000")
  const [gradientEndColor, setGradientEndColor] = useState("#ffffff")

  // 테두리 스타일 옵션
  const borderStyleOptions = [
    { value: "solid", label: "실선" },
    { value: "dashed", label: "점선" },
    { value: "dotted", label: "점" },
    { value: "double", label: "이중선" },
    { value: "none", label: "없음" },
  ]

  // 그라데이션 방향 옵션
  const gradientDirectionOptions = [
    { value: "to right", label: "좌→우" },
    { value: "to left", label: "우→좌" },
    { value: "to bottom", label: "상→하" },
    { value: "to top", label: "하→상" },
    { value: "to bottom right", label: "좌상→우하" },
    { value: "to bottom left", label: "우상→좌하" },
    { value: "to top right", label: "좌하→우상" },
    { value: "to top left", label: "우하→좌상" },
  ]

  // 미리 정의된 색상 팔레트
  const colorPalette = [
    "#FFFFFF",
    "#000000",
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
    if (selectedElement) {
      setBackgroundColor(selectedElement.backgroundColor || "#FFFFFF")
      setBorderColor(selectedElement.borderColor || "#000000")
      setBorderWidth(selectedElement.borderWidth || 2)
      setBorderStyle(selectedElement.borderStyle || "solid")
      setBorderRadius(selectedElement.borderRadius || 0)
      setOpacity(selectedElement.opacity || 1)
      setGradientEnabled(selectedElement.gradientEnabled || false)
      setGradientDirection(selectedElement.gradientDirection || "to right")
      setGradientStartColor(selectedElement.gradientStartColor || "#000000")
      setGradientEndColor(selectedElement.gradientEndColor || "#ffffff")
    }
  }, [selectedElement])

  // 스타일 업데이트 함수
  const updateElementStyle = (updates: any) => {
    onUpdateElement(updates)
  }

  // 배경색 변경
  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color)
    updateElementStyle({ backgroundColor: color })
  }

  // 테두리 색상 변경
  const handleBorderColorChange = (color: string) => {
    setBorderColor(color)
    updateElementStyle({ borderColor: color })
  }

  // 테두리 두께 변경
  const handleBorderWidthChange = (value: number[]) => {
    const newWidth = value[0]
    setBorderWidth(newWidth)
    updateElementStyle({ borderWidth: newWidth })
  }

  // 테두��� 스타일 변경
  const handleBorderStyleChange = (style: string) => {
    setBorderStyle(style)
    updateElementStyle({ borderStyle: style })
  }

  // 모서리 둥글기 변경
  const handleBorderRadiusChange = (value: number[]) => {
    const newRadius = value[0]
    setBorderRadius(newRadius)
    updateElementStyle({ borderRadius: newRadius })
  }

  // 투명도 변경
  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0]
    setOpacity(newOpacity)
    updateElementStyle({ opacity: newOpacity })
  }

  // 그라데이션 관련 핸들러들
  const handleGradientToggle = (enabled: boolean) => {
    setGradientEnabled(enabled)
    updateElementStyle({ gradientEnabled: enabled })
  }

  const handleGradientDirectionChange = (direction: string) => {
    setGradientDirection(direction)
    updateElementStyle({ gradientDirection: direction })
  }

  const handleGradientStartColorChange = (color: string) => {
    setGradientStartColor(color)
    updateElementStyle({ gradientStartColor: color })
  }

  const handleGradientEndColorChange = (color: string) => {
    setGradientEndColor(color)
    updateElementStyle({ gradientEndColor: color })
  }

  // 색상 팔레트 클릭 핸들러
  const handlePaletteColorClick = (color: string, isBackground: boolean) => {
    if (isBackground) {
      handleBackgroundColorChange(color)
    } else {
      handleBorderColorChange(color)
    }
  }

  return (
    <div className="h-full bg-[#2A2A2A] border border-gray-700 rounded-lg shadow-2xl overflow-y-auto">
      <div className="p-4 border-b border-gray-700 bg-[#1E1E1E] rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white">요소 편집</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white" onClick={onClose}>
            <X size={14} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 배경색 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">배경색</Label>
          <div className="flex gap-2 items-center mb-3">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              className="w-12 h-8 rounded border border-gray-600 bg-transparent cursor-pointer"
            />
            <Input
              value={backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              className="flex-1 bg-gray-800 border-gray-600 text-white"
              placeholder="#FFFFFF"
            />
          </div>

          {/* 배경색 팔레트 */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            {colorPalette.map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded border-2 ${
                  backgroundColor === color ? "border-blue-500" : "border-gray-600"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handlePaletteColorClick(color, true)}
                title={color}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBackgroundColorChange("transparent")}
            className="w-full text-black"
          >
            투명하게
          </Button>
        </div>

        {/* 그라데이션 설정 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium text-gray-300">그라데이션</Label>
            <Button
              variant={gradientEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => handleGradientToggle(!gradientEnabled)}
              className="text-xs"
            >
              {gradientEnabled ? "ON" : "OFF"}
            </Button>
          </div>

          {gradientEnabled && (
            <div className="space-y-3">
              {/* 그라데이션 방향 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">방향</Label>
                <Select value={gradientDirection} onValueChange={handleGradientDirectionChange}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {gradientDirectionOptions.map((direction) => (
                      <SelectItem
                        key={direction.value}
                        value={direction.value}
                        className="text-white hover:bg-gray-700"
                      >
                        {direction.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 시작 색상 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">시작 색상</Label>
                <div className="flex gap-2 items-center mb-2">
                  <input
                    type="color"
                    value={gradientStartColor}
                    onChange={(e) => handleGradientStartColorChange(e.target.value)}
                    className="w-12 h-8 rounded border border-gray-600 bg-transparent cursor-pointer"
                  />
                  <Input
                    value={gradientStartColor}
                    onChange={(e) => handleGradientStartColorChange(e.target.value)}
                    className="flex-1 bg-gray-800 border-gray-600 text-white"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* 끝 색상 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">끝 색상</Label>
                <div className="flex gap-2 items-center mb-2">
                  <input
                    type="color"
                    value={gradientEndColor}
                    onChange={(e) => handleGradientEndColorChange(e.target.value)}
                    className="w-12 h-8 rounded border border-gray-600 bg-transparent cursor-pointer"
                  />
                  <Input
                    value={gradientEndColor}
                    onChange={(e) => handleGradientEndColorChange(e.target.value)}
                    className="flex-1 bg-gray-800 border-gray-600 text-white"
                    placeholder="#ffffff"
                  />
                </div>
              </div>

              {/* 그라데이션 미리보기 */}
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">미리보기</Label>
                <div
                  className="w-full h-12 rounded border border-gray-600"
                  style={{
                    background: `linear-gradient(${gradientDirection}, ${gradientStartColor}, ${gradientEndColor})`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 테두리 색상 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">테두리 색상</Label>
          <div className="flex gap-2 items-center mb-3">
            <input
              type="color"
              value={borderColor}
              onChange={(e) => handleBorderColorChange(e.target.value)}
              className="w-12 h-8 rounded border border-gray-600 bg-transparent cursor-pointer"
            />
            <Input
              value={borderColor}
              onChange={(e) => handleBorderColorChange(e.target.value)}
              className="flex-1 bg-gray-800 border-gray-600 text-white"
              placeholder="#000000"
            />
          </div>

          {/* 테두리 색상 팔레트 */}
          <div className="grid grid-cols-8 gap-1">
            {colorPalette.map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded border-2 ${borderColor === color ? "border-blue-500" : "border-gray-600"}`}
                style={{ backgroundColor: color }}
                onClick={() => handlePaletteColorClick(color, false)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* 테두리 두께 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">테두리 두께: {borderWidth}px</Label>
          <Slider
            value={[borderWidth]}
            onValueChange={handleBorderWidthChange}
            min={0}
            max={20}
            step={1}
            className="w-full"
          />
        </div>

        {/* 테두리 스타일 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">테두리 스타일</Label>
          <Select value={borderStyle} onValueChange={handleBorderStyleChange}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {borderStyleOptions.map((style) => (
                <SelectItem key={style.value} value={style.value} className="text-white hover:bg-gray-700">
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 모서리 둥글기 (사각형에만 적용) */}
        {selectedElement?.shapeType === "rectangle" && (
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-2 block">모서리 둥글기: {borderRadius}px</Label>
            <Slider
              value={[borderRadius]}
              onValueChange={handleBorderRadiusChange}
              min={0}
              max={50}
              step={1}
              className="w-full"
            />
          </div>
        )}

        {/* 투명도 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">투명도: {Math.round(opacity * 100)}%</Label>
          <Slider
            value={[opacity]}
            onValueChange={handleOpacityChange}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
        </div>

        {/* 변형 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-3 block">변형</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={selectedElement?.flipX ? "default" : "outline"}
              size="sm"
              onClick={() => updateElementStyle({ flipX: !selectedElement?.flipX })}
              className="text-xs"
              title="좌우 반전"
            >
              ↔️ 좌우
            </Button>
            <Button
              variant={selectedElement?.flipY ? "default" : "outline"}
              size="sm"
              onClick={() => updateElementStyle({ flipY: !selectedElement?.flipY })}
              className="text-xs"
              title="상하 반전"
            >
              ↕️ 상하
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateElementStyle({ flipX: false, flipY: false })}
              className="text-xs"
              title="반전 초기화"
            >
              초기화
            </Button>
          </div>

          {/* 현재 변형 상태 표시 */}
          <div className="mt-2 text-xs text-gray-400">
            <div>좌우 반전: {selectedElement?.flipX ? "ON" : "OFF"}</div>
            <div>상하 반전: {selectedElement?.flipY ? "ON" : "OFF"}</div>
          </div>
        </div>

        {/* 요소 정보 */}
        <div className="bg-gray-800 p-3 rounded">
          <Label className="text-sm font-medium text-gray-300 mb-2 block">요소 정보</Label>
          <div className="text-xs text-gray-400 space-y-1">
            <div>타입: {selectedElement?.name || selectedElement?.shapeType}</div>
            <div>
              크기: {Math.round(selectedElement?.size?.width || 0)} × {Math.round(selectedElement?.size?.height || 0)}
              px
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
                handleBackgroundColorChange("#FF0000")
                handleBorderColorChange("#FFFFFF")
                handleBorderWidthChange([2])
              }}
              className="text-black"
            >
              빨강
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleBackgroundColorChange("#0000FF")
                handleBorderColorChange("#FFFFFF")
                handleBorderWidthChange([2])
              }}
              className="text-black"
            >
              파랑
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleBackgroundColorChange("#00FF00")
                handleBorderColorChange("#000000")
                handleBorderWidthChange([2])
              }}
              className="text-black"
            >
              초록
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleBackgroundColorChange("transparent")
                handleBorderColorChange("#000000")
                handleBorderWidthChange([3])
                handleBorderStyleChange("dashed")
              }}
              className="text-black"
            >
              투명
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleGradientToggle(true)
                handleGradientDirectionChange("to right")
                handleGradientStartColorChange("#000000")
                handleGradientEndColorChange("#ffffff")
              }}
              className="text-black"
            >
              흑백 그라데이션
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleGradientToggle(true)
                handleGradientDirectionChange("to bottom")
                handleGradientStartColorChange("#3B82F6")
                handleGradientEndColorChange("#1E40AF")
              }}
              className="text-black"
            >
              파랑 그라데이션
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
