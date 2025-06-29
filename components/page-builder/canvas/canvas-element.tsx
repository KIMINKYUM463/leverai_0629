import type React from "react"

interface CanvasElementProps {
  element: any // Replace 'any' with a more specific type if possible
}

const CanvasElement: React.FC<CanvasElementProps> = ({ element }) => {
  switch (element.type) {
    case "text":
      return (
        <div
          style={{
            position: "absolute",
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            fontFamily: element.fontFamily,
            fontSize: element.fontSize,
            color: element.color,
            textAlign: element.textAlign,
            fontWeight: element.fontWeight,
            fontStyle: element.fontStyle,
            opacity: element.opacity || 1,
            zIndex: element.zIndex,
          }}
        >
          {element.text}
        </div>
      )
    case "image":
      return (
        <img
          src={element.src || "/placeholder.svg"}
          alt={element.alt}
          style={{
            position: "absolute",
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            objectFit: element.objectFit,
            borderRadius: element.borderRadius,
            filter: `brightness(${element.imageBrightness || 1})`,
            opacity: element.imageOpacity || 1,
            zIndex: element.zIndex,
          }}
        />
      )
    case "imageFrame":
      return (
        <div
          style={{
            position: "absolute",
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            backgroundImage: `url(${element.src})`,
            backgroundSize: element.backgroundSize,
            backgroundPosition: element.backgroundPosition,
            backgroundRepeat: element.backgroundRepeat,
            border: element.border,
            borderRadius: element.borderRadius,
            filter: `brightness(${element.imageBrightness || 1})`,
            opacity: element.imageOpacity || 1,
            zIndex: element.zIndex,
          }}
        />
      )
    case "shape":
      return (
        <div
          style={{
            position: "absolute",
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            backgroundColor: element.backgroundColor,
            borderRadius: element.borderRadius,
            border: element.border,
            opacity: element.opacity || 1,
            zIndex: element.zIndex,
          }}
        />
      )
    default:
      return null
  }
}

export default CanvasElement
