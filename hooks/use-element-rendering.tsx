"use client"

import type React from "react"

import { useCallback, createElement } from "react"

/**
 * Centralised element-rendering hook used by the Page-Builder canvas.
 * It receives a full element object and returns a React node ready
 * to be placed on the canvas.
 */
export function useElementRendering() {
  /**
   * =================================================================
   *  Helpers
   * =================================================================
   */
  const getFlipTransform = (el: any) => {
    const scaleX = el.flipX ? -1 : 1
    const scaleY = el.flipY ? -1 : 1
    return `scaleX(${scaleX}) scaleY(${scaleY})`
  }

  /**
   * =================================================================
   *  Root dispatcher  (called from CanvasRenderer)
   * =================================================================
   */
  const renderElement = (
    element: any,
    isEditing: boolean,
    onStartEdit: () => void,
    onUpdateContent: (content: string) => void,
  ) => {
    switch (element.type) {
      case "text":
        return renderText(element, isEditing, onStartEdit, onUpdateContent)

      case "image":
        return (
          <img
            src={element.src || "/placeholder.svg"}
            alt={element.alt}
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: element.objectFit || "cover",
              transform: getFlipTransform(element),
              filter: `brightness(${element.imageBrightness || 1})`,
              opacity: element.imageOpacity || 1,
            }}
          />
        )

      case "shape":
        return renderShape(element)

      default:
        return null
    }
  }

  /**
   * =================================================================
   *  Shape renderer
   * =================================================================
   */
  const renderShape = useCallback((element: any) => {
    if (element.type !== "shape") return null

    const baseStyle = {
      width: "100%",
      height: "100%",
      opacity: element.opacity ?? 1,
      transform: getFlipTransform(element),
    } as React.CSSProperties

    const border =
      element.borderStyle !== "none" ? `${element.borderWidth}px ${element.borderStyle} ${element.borderColor}` : "none"

    const strokeProps = {
      stroke: element.borderColor,
      strokeWidth: element.borderWidth,
    }

    /* ---------- BASIC RECTANGLES / CIRCLES -------------------------------- */
    if (element.shapeType === "rectangle" || element.shapeType === "gradient-rectangle")
      return (
        <div
          style={{
            ...baseStyle,
            borderRadius: element.borderRadius,
            border,
            background: element.gradientEnabled
              ? `linear-gradient(${element.gradientDirection ?? "to right"}, ${
                  element.gradientStartColor ?? "#000"
                }, ${element.gradientEndColor ?? "#fff"})`
              : element.backgroundColor,
          }}
        />
      )

    if (element.shapeType === "circle" || element.shapeType === "gradient-circle")
      return (
        <div
          style={{
            ...baseStyle,
            borderRadius: "50%",
            border,
            background: element.gradientEnabled
              ? `linear-gradient(${element.gradientDirection ?? "to right"}, ${
                  element.gradientStartColor ?? "#000"
                }, ${element.gradientEndColor ?? "#fff"})`
              : element.backgroundColor,
          }}
        />
      )

    /* ---------- SVG-based shapes ------------------------------------------ */
    const svg = (children: React.ReactNode) =>
      createElement(
        "svg",
        { width: "100%", height: "100%", viewBox: "0 0 100 100", preserveAspectRatio: "none" },
        children,
      )

    switch (element.shapeType) {
      case "triangle":
        return createElement(
          "div",
          { style: baseStyle },
          svg(
            createElement("polygon", {
              points: "50,0 0,100 100,100",
              fill: element.backgroundColor,
              ...strokeProps,
            }),
          ),
        )

      case "quarter-circle":
        return createElement(
          "div",
          { style: baseStyle },
          svg(
            createElement("path", {
              d: "M0 0V100H100C100 44.7715 55.2285 0 0 0Z",
              fill: element.backgroundColor,
              ...strokeProps,
            }),
          ),
        )

      /* ----------------- LINES  ------------------------------------------- */
      case "horizontal-line":
        return createElement(
          "div",
          { style: baseStyle },
          svg(
            createElement("line", {
              x1: "0",
              y1: "50",
              x2: "100",
              y2: "50",
              stroke: element.borderColor || "#000000",
              strokeWidth: element.borderWidth || 2,
              strokeLinecap: "round",
            }),
          ),
        )

      case "vertical-line":
        return createElement(
          "div",
          { style: baseStyle },
          svg(
            createElement("line", {
              x1: "50",
              y1: "0",
              x2: "50",
              y2: "100",
              stroke: element.borderColor || "#000000",
              strokeWidth: element.borderWidth || 2,
              strokeLinecap: "round",
            }),
          ),
        )

      case "diagonal-line":
        return createElement(
          "div",
          { style: baseStyle },
          svg(
            createElement("line", {
              x1: "0",
              y1: "0",
              x2: "100",
              y2: "100",
              stroke: element.borderColor || "#000000",
              strokeWidth: element.borderWidth || 2,
              strokeLinecap: "round",
            }),
          ),
        )

      case "dashed-line":
        return createElement(
          "div",
          { style: baseStyle },
          svg(
            createElement("line", {
              x1: "0",
              y1: "50",
              x2: "100",
              y2: "50",
              stroke: element.borderColor || "#000000",
              strokeWidth: element.borderWidth || 2,
              strokeLinecap: "round",
              strokeDasharray: "10 5",
            }),
          ),
        )

      /* ----------------- CUSTOM ICONS  ------------------------------------ */
      case "star-icon":
        return (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ ...baseStyle, border, backgroundColor: "transparent" }}
          >
            <img src="/star-icon.png" alt="Star icon" className="w-full h-full object-contain" />
          </div>
        )

      case "warning-icon":
        return (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ ...baseStyle, border, backgroundColor: "transparent" }}
          >
            <img src="/warning-icon.png" alt="Warning icon" className="w-full h-full object-contain" />
          </div>
        )

      case "threat-warning-icon": // <-- NEW CASE
        return (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ ...baseStyle, border, backgroundColor: "transparent" }}
          >
            <img src="/threat-warning-icon.png" alt="Threat warning icon" className="w-full h-full object-contain" />
          </div>
        )

      /* ----------------- FALLBACK  ---------------------------------------- */
      default:
        return createElement(
          "div",
          {
            style: {
              ...baseStyle,
              border,
              backgroundColor: element.backgroundColor ?? "#f3f4f6",
            },
          },
          createElement("span", { className: "text-xs text-gray-500" }, element.shapeType ?? "shape"),
        )
    }
  }, [])

  /**
   * =================================================================
   *  Text renderer  (unchanged from original)
   * =================================================================
   */
  const renderText = useCallback(
    (el: any, isEditing: boolean, onStartEdit: () => void, onUpdate: (c: string) => void) => {
      const cs = el.computedStyle ?? {}

      const getShadow = () => {
        if (!cs.textShadowEnabled) return "none"
        const opacityHex = Math.round((cs.shadowOpacity ?? 0.5) * 255)
          .toString(16)
          .padStart(2, "0")
        return `${cs.shadowOffsetX ?? 2}px ${cs.shadowOffsetY ?? 2}px ${cs.shadowBlur ?? 4}px ${
          cs.shadowColor ?? "#000"
        }${opacityHex}`
      }

      const style: React.CSSProperties = {
        color: el.color,
        backgroundColor: el.backgroundColor,
        fontSize: cs.fontSize ?? 16,
        fontFamily: cs.fontFamily ?? "Inter",
        fontWeight: cs.fontWeight ?? "400",
        textAlign: cs.textAlign ?? "left",
        lineHeight: cs.lineHeight ?? 1.5,
        letterSpacing: cs.letterSpacing ?? 0,
        fontStyle: cs.fontStyle ?? "normal",
        textDecoration: cs.textDecoration ?? "none",
        textShadow: getShadow(),
        transform: getFlipTransform(el),
        display: "flex",
        alignItems: "center",
        justifyContent: cs.textAlign === "center" ? "center" : cs.textAlign === "right" ? "flex-end" : "flex-start",
        padding: 8,
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
      }

      if (isEditing)
        return createElement("div", {
          className: "w-full h-full",
          contentEditable: true,
          suppressContentEditableWarning: true,
          style: { ...style, outline: "2px solid #3b82f6", cursor: "text" },
          dangerouslySetInnerHTML: { __html: el.content ?? "텍스트를 입력하세요" },
          onInput: (e) => onUpdate((e.currentTarget as HTMLDivElement).innerHTML),
        })

      return createElement(
        "div",
        {
          className: "w-full h-full cursor-pointer",
          style,
          dangerouslySetInnerHTML: { __html: el.content ?? "텍스트를 입력하세요" },
          onDoubleClick: onStartEdit,
        },
        null,
      )
    },
    [],
  )

  /**
   * =================================================================
   *  Image-frame renderer  (for framed placeholders that users can click)
   * =================================================================
   */
  const renderImageFrame = useCallback((element: any) => {
    if (element.type !== "image-frame" && element.type !== "imageFrame") return null

    const isCircleFrame = element.shapeType === "circle-frame"

    return createElement("div", {
      className: "w-full h-full relative overflow-hidden",
      style: {
        backgroundColor: element.backgroundColor ?? "#f3f4f6",
        border: `${element.borderWidth ?? 1}px ${element.borderStyle ?? "solid"} ${element.borderColor ?? "#d1d5db"}`,
        borderRadius: isCircleFrame ? "50%" : `${element.borderRadius ?? 0}px`,
        opacity: element.opacity ?? 1,
        transform: getFlipTransform(element),
      },
      children: element.imageSrc
        ? createElement("img", {
            src: element.imageSrc,
            alt: element.alt ?? "Image frame content",
            crossOrigin: "anonymous",
            className: "w-full h-full",
            style: {
              objectFit: element.objectFit ?? "cover",
              filter: `brightness(${element.imageBrightness || 1})`,
              opacity: element.imageOpacity || 1,
            },
          })
        : createElement(
            "div",
            { className: "w-full h-full flex items-center justify-center text-gray-400" },
            createElement("span", { className: "text-sm", children: "이미지를 추가하세요" }),
          ),
    })
  }, [])

  /* ----------------------------------------------------------------------- */
  return { renderElement, renderShape, renderImageFrame, renderText }
}

/*  Provide both default and named export so either style works. */
export default useElementRendering
