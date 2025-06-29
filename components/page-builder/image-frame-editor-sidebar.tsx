"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { X, Upload, Trash2, Sparkles, Loader2, Wand2, Copy, RefreshCw } from "lucide-react"
import { generateImagePrompt } from "@/app/actions/ai-prompt-generation"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { useAuth } from "@/components/auth/auth-provider"

interface ImageFrameEditorSidebarProps {
  selectedElement: any
  onUpdateElement: (updates: any) => void
  onClose: () => void
  currentKeyword?: string
}

export function ImageFrameEditorSidebar({
  selectedElement,
  onUpdateElement,
  onClose,
  currentKeyword,
}: ImageFrameEditorSidebarProps) {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF")
  const [borderColor, setBorderColor] = useState("#000000")
  const [borderWidth, setBorderWidth] = useState(2)
  const [borderStyle, setBorderStyle] = useState("solid")
  const [borderRadius, setBorderRadius] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [imageOpacity, setImageOpacity] = useState(1)
  const [imageBrightness, setImageBrightness] = useState(1)
  const [imageFit, setImageFit] = useState("cover")
  const [koreanPrompt, setKoreanPrompt] = useState("")
  const [englishPrompt, setEnglishPrompt] = useState("")
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [copiedKorean, setCopiedKorean] = useState(false)
  const [copiedEnglish, setCopiedEnglish] = useState(false)
  const [remainingGenerations, setRemainingGenerations] = useState<number>(0)
  const [isLoadingGenerations, setIsLoadingGenerations] = useState(true)

  const searchParams = useSearchParams()
  const [dynamicKeyword, setDynamicKeyword] = useState("")
  const { user } = useAuth()

  // 키워드 추출
  useEffect(() => {
    const urlKeyword = searchParams.get("keyword") || searchParams.get("q") || ""
    const aiKeyword = localStorage.getItem("aiGenerationKeyword") || ""
    const lastKeyword = localStorage.getItem("lastSearchKeyword") || ""
    const currentKeywordStorage = localStorage.getItem("currentKeyword") || ""

    const finalKeyword = currentKeyword || aiKeyword || urlKeyword || lastKeyword || currentKeywordStorage || "사과"
    setDynamicKeyword(finalKeyword)

    if (finalKeyword && finalKeyword !== "사과") {
      localStorage.setItem("currentKeyword", finalKeyword)
    }
  }, [searchParams, currentKeyword])

  // 프로필 초기화 함수
  const initializeProfile = async () => {
    try {
      console.log("🔄 프로필 초기화 API 호출...")
      const response = await fetch("/api/profile/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (response.ok) {
        console.log("✅ 프로필 초기화 성공:", result)
        return result.profile
      } else {
        console.error("❌ 프로필 초기화 실패:", result.error)
        return null
      }
    } catch (error) {
      console.error("❌ 프로필 초기화 오류:", error)
      return null
    }
  }

  // AI 생성 횟수 가져오기
  const fetchGenerationCount = async () => {
    if (!user?.id) {
      console.warn("🔒 사용자가 없습니다.")
      setIsLoadingGenerations(false)
      return
    }

    try {
      console.log("🔍 사용자 프로필 조회:", user.id)

      const { data, error } = await supabase
        .from("profiles")
        .select("ai_generation_count")
        .eq("id", user.id)
        .maybeSingle()

      if (error && error.code !== "PGRST116") {
        console.error("❌ 프로필 조회 오류:", error)
        setRemainingGenerations(0)
      } else if (!data) {
        // 프로필이 없으면 서버 API로 초기화 시도
        console.log("ℹ️ 프로필이 존재하지 않아 초기화를 시도합니다.")
        const newProfile = await initializeProfile()

        if (newProfile) {
          console.log("✅ 프로필 초기화 성공:", newProfile)
          setRemainingGenerations(newProfile.ai_generation_count || 120)
        } else {
          console.warn("⚠️ 프로필 초기화 실패. 남은 횟수를 0으로 설정합니다.")
          setRemainingGenerations(0)
        }
      } else {
        console.log("✅ 프로필 조회 성공:", data)
        setRemainingGenerations(data.ai_generation_count ?? 0)
      }
    } catch (e) {
      console.error("❌ 예외:", e)
      setRemainingGenerations(0)
    } finally {
      setIsLoadingGenerations(false)
    }
  }

  useEffect(() => {
    fetchGenerationCount()
  }, [user])

  const finalKeyword = dynamicKeyword || "사과"

  // 테두리 스타일 옵션
  const borderStyleOptions = [
    { value: "solid", label: "실선" },
    { value: "dashed", label: "점선" },
    { value: "dotted", label: "점" },
    { value: "double", label: "이중선" },
    { value: "none", label: "없음" },
  ]

  // 이미지 맞춤 옵션
  const imageFitOptions = [
    { value: "cover", label: "채우기" },
    { value: "contain", label: "맞춤" },
    { value: "fill", label: "늘이기" },
  ]

  // 색상 팔레트
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

  // 선택된 요소 스타일 초기화
  useEffect(() => {
    if (selectedElement) {
      setBackgroundColor(selectedElement.backgroundColor || "#FFFFFF")
      setBorderColor(selectedElement.borderColor || "#000000")
      setBorderWidth(selectedElement.borderWidth || 2)
      setBorderStyle(selectedElement.borderStyle || "solid")
      setBorderRadius(selectedElement.borderRadius || 0)
      setOpacity(selectedElement.opacity || 1)
      setImageOpacity(selectedElement.imageOpacity || 1)
      setImageBrightness(selectedElement.imageBrightness || 1)
      setKoreanPrompt("")
      setEnglishPrompt("")
    }
  }, [selectedElement])

  // 스타일 업데이트
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

  // 테두리 스타일 변경
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

  // 이미지 투명도 변경
  const handleImageOpacityChange = (value: number[]) => {
    const newOpacity = value[0]
    setImageOpacity(newOpacity)
    updateElementStyle({ imageOpacity: newOpacity })
  }

  // 이미지 밝기 변경
  const handleImageBrightnessChange = (value: number[]) => {
    const newBrightness = value[0]
    setImageBrightness(newBrightness)
    updateElementStyle({ imageBrightness: newBrightness })
  }

  // 이미지 맞춤 변경
  const handleImageFitChange = (fit: string) => {
    setImageFit(fit)
    updateElementStyle({ imageFit: fit })
  }

  // 색상 팔레트 클릭
  const handlePaletteColorClick = (color: string, isBackground: boolean) => {
    if (isBackground) {
      handleBackgroundColorChange(color)
    } else {
      handleBorderColorChange(color)
    }
  }

  // 이미지 업로드
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      updateElementStyle({
        imageSrc: imageUrl,
        imageFileName: file.name,
      })
    }
    reader.readAsDataURL(file)

    if (event.target) {
      event.target.value = ""
    }
  }

  // 이미지 제거
  const handleImageRemove = () => {
    updateElementStyle({
      imageSrc: null,
      imageFileName: null,
    })
  }

  // AI 프롬프트 생성
  const handleGeneratePrompt = async () => {
    if (!selectedElement?.position) {
      alert("요소의 위치 정보를 찾을 수 없습니다.")
      return
    }

    setIsGeneratingPrompt(true)
    try {
      const result = await generateImagePrompt(finalKeyword, selectedElement.position)

      if (result.success) {
        setKoreanPrompt(result.koreanPrompt)
        setEnglishPrompt(result.englishPrompt)
      } else {
        alert(`프롬프트 생성 실패: ${result.error}`)
      }
    } catch (error) {
      console.error("프롬프트 생성 오류:", error)
      alert("프롬프트 생성 중 오류가 발생했습니다.")
    } finally {
      setIsGeneratingPrompt(false)
    }
  }

  // 🔥 AI 사진 생성 (핵심 기능!)
  const handleGenerateImage = async () => {
    if (!englishPrompt.trim()) {
      alert("먼저 AI 이미지 프롬프트를 생성해주세요.")
      return
    }

    if (remainingGenerations <= 0) {
      alert("AI 사진 생성 횟수를 모두 사용하셨습니다.")
      return
    }

    if (!user?.id) {
      alert("로그인이 필요합니다.")
      return
    }

    setIsGeneratingImage(true)
    try {
      console.log("🎨 AI 이미지 생성 시작...")

      // 1. 먼저 횟수 차감 API 호출
      const deductResponse = await fetch("/api/ai-generation/deduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const deductResult = await deductResponse.json()

      if (!deductResponse.ok) {
        alert(`횟수 차감 실패: ${deductResult.error}`)
        return
      }

      console.log("✅ 횟수 차감 성공:", deductResult.remainingCount)
      setRemainingGenerations(deductResult.remainingCount)

      // 2️⃣  AI 이미지 생성 (API 호출로 변경)
      const imgRes = await fetch("/api/ai-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: englishPrompt, keyword: finalKeyword }),
      })

      const imgResult = await imgRes.json()

      if (imgResult.success && imgResult.imageUrl) {
        console.log("✅ 이미지 생성 성공!")

        updateElementStyle({
          imageSrc: imgResult.imageUrl,
          imageFileName: imgResult.fileName,
        })

        alert("AI 이미지가 성공적으로 생성되었습니다!")
      } else {
        console.error("❌ 이미지 생성 실패:", imgResult.error)
        alert(`이미지 생성 실패: ${imgResult.error}`)

        // 실패 시 차감했던 횟수 복구
        await fetchGenerationCount()
      }
    } catch (error) {
      console.error("❌ AI 이미지 생성 오류:", error)
      alert("이미지 생성 중 오류가 발생했습니다.")

      // 오류 시에도 횟수 복구
      await fetchGenerationCount()
    } finally {
      setIsGeneratingImage(false)
    }
  }

  // 프롬프트 복사
  const handleCopyKorean = async () => {
    try {
      await navigator.clipboard.writeText(koreanPrompt)
      setCopiedKorean(true)
      setTimeout(() => setCopiedKorean(false), 2000)
    } catch (error) {
      alert("복사에 실패했습니다.")
    }
  }

  const handleCopyEnglish = async () => {
    try {
      await navigator.clipboard.writeText(englishPrompt)
      setCopiedEnglish(true)
      setTimeout(() => setCopiedEnglish(false), 2000)
    } catch (error) {
      alert("복사에 실패했습니다.")
    }
  }

  return (
    <div className="h-full bg-[#2A2A2A] border border-gray-700 rounded-lg shadow-2xl overflow-y-auto">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        aria-label="이미지 파일 업로드"
      />

      <div className="p-4 border-b border-gray-700 bg-[#1E1E1E] rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white">이미지 프레임 편집</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white" onClick={onClose}>
            <X size={14} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 이미지 업로드 섹션 */}
        <div>
          <Label className="text-sm font-medium text-gray-300 mb-2 block">이미지</Label>

          {selectedElement?.imageSrc ? (
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={selectedElement.imageSrc || "/placeholder.svg"}
                  alt={selectedElement.imageFileName || "Frame image"}
                  className="w-full h-32 object-cover rounded border border-gray-600"
                />
                <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={handleImageRemove}>
                  <Trash2 size={14} />
                </Button>
              </div>
              <p className="text-xs text-gray-400">{selectedElement.imageFileName}</p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <div className="text-gray-400 mb-2">
                <Upload size={24} className="mx-auto mb-2" />
                <p className="text-sm">이미지를 업로드하세요</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="text-black">
                파일 선택
              </Button>
            </div>
          )}

          {selectedElement?.imageSrc && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="w-full mt-2 text-black"
            >
              이미지 변경
            </Button>
          )}

          {/* AI 사진 생성 섹션 */}
          <div className="mt-4 space-y-3">
            <Label className="text-sm font-medium text-gray-300">AI 사진 생성</Label>

            {/* 현재 키워드 */}
            <div className="text-xs text-gray-400 bg-gray-800 p-2 rounded">
              현재 키워드: <span className="text-blue-400 font-medium">{finalKeyword}</span>
            </div>

            {/* AI 프롬프트 생성 버튼 */}
            <Button
              onClick={handleGeneratePrompt}
              disabled={isGeneratingPrompt || !selectedElement?.position}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isGeneratingPrompt ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  프롬프트 생성 중...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  AI이미지 프롬프트 생성
                </>
              )}
            </Button>

            {/* 한국어 프롬프트 */}
            {koreanPrompt && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">한국어 프롬프트:</div>
                  <Button
                    onClick={handleCopyKorean}
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs text-black bg-transparent"
                  >
                    {copiedKorean ? (
                      <span className="text-green-500">복사됨!</span>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        복사
                      </>
                    )}
                  </Button>
                </div>
                <div className="text-xs text-gray-300 bg-gray-800 p-2 rounded max-h-20 overflow-y-auto">
                  {koreanPrompt}
                </div>
              </div>
            )}

            {/* 영어 프롬프트 */}
            {englishPrompt && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">영어 프롬프트:</div>
                  <Button
                    onClick={handleCopyEnglish}
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs text-black bg-transparent"
                  >
                    {copiedEnglish ? (
                      <span className="text-green-500">복사됨!</span>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        복사
                      </>
                    )}
                  </Button>
                </div>
                <div className="text-xs text-gray-300 bg-gray-800 p-2 rounded max-h-20 overflow-y-auto">
                  {englishPrompt}
                </div>
              </div>
            )}

            {/* AI 사진 생성 버튼 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">남은 생성 횟수:</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-green-400">
                    {isLoadingGenerations ? "로딩중..." : `${remainingGenerations}회`}
                  </span>
                  <Button
                    onClick={fetchGenerationCount}
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs text-black bg-transparent"
                    disabled={isLoadingGenerations}
                  >
                    <RefreshCw className={`h-3 w-3 ${isLoadingGenerations ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </div>

              {/* 🔥 핵심 버튼: AI 사진 생성 */}
              <Button
                onClick={handleGenerateImage}
                disabled={isGeneratingImage || !englishPrompt || remainingGenerations <= 0 || isLoadingGenerations}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-600"
              >
                {isGeneratingImage ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    사진 생성 중...
                  </>
                ) : remainingGenerations <= 0 ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    생성 횟수 소진됨
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI사진 생성 ({remainingGenerations}회 남음)
                  </>
                )}
              </Button>

              {remainingGenerations <= 10 && remainingGenerations > 0 && (
                <div className="text-xs text-yellow-400 text-center">⚠️ 생성 횟수가 얼마 남지 않았습니다</div>
              )}
              {remainingGenerations === 0 && (
                <p className="text-xs text-red-400 text-center">관리자에게 AI 생성 횟수 충전을 요청하세요.</p>
              )}
            </div>
          </div>
        </div>

        {/* 이미지 설정 */}
        {selectedElement?.imageSrc && (
          <>
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">이미지 맞춤</Label>
              <Select value={imageFit} onValueChange={handleImageFitChange}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {imageFitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">
                이미지 투명도: {Math.round(imageOpacity * 100)}%
              </Label>
              <Slider
                value={[imageOpacity]}
                onValueChange={handleImageOpacityChange}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">
                이미지 밝기: {Math.round(imageBrightness * 100)}%
              </Label>
              <Slider
                value={[imageBrightness]}
                onValueChange={handleImageBrightnessChange}
                min={0}
                max={2}
                step={0.01}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>어둡게 (0%)</span>
                <span>기본 (100%)</span>
                <span>밝게 (200%)</span>
              </div>
            </div>
          </>
        )}

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

        {/* 모서리 둥글기 */}
        {selectedElement?.shapeType === "rectangle-frame" && (
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

        {/* 요소 정보 */}
        <div className="bg-gray-800 p-3 rounded">
          <Label className="text-sm font-medium text-gray-300 mb-2 block">요소 정보</Label>
          <div className="text-xs text-gray-400 space-y-1">
            <div>타입: {selectedElement?.name || selectedElement?.shapeType}</div>
            <div>
              크기: {Math.round(selectedElement?.size?.width || 0)} × {Math.round(selectedElement?.size?.height || 0)}px
            </div>
            <div>
              위치: ({Math.round(selectedElement?.position?.x || 0)}, {Math.round(selectedElement?.position?.y || 0)})
            </div>
            <div>회전: {Math.round(selectedElement?.rotation || 0)}°</div>
            {selectedElement?.imageSrc && <div>이미지: {selectedElement.imageFileName || "업로드됨"}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
