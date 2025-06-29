"use client"
import { useState } from "react"
import { CheckCircle, AlertTriangle, XCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InspectionIssue {
  id: string
  type: "overlap" | "overflow" | "spacing" | "size" | "alignment"
  severity: "low" | "medium" | "high"
  elementId: string
  description: string
  suggestion: string
  autoFixable: boolean
}

interface AIInspectionSystemProps {
  inspectionResults: InspectionIssue[]
  onClose: () => void
  onApplyAutoFix: (fixes: any[]) => void
}

export function AIInspectionSystem({ inspectionResults, onClose, onApplyAutoFix }: AIInspectionSystemProps) {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)

  const getIssueIcon = (type: string, severity: string) => {
    if (severity === "high") return <XCircle className="h-4 w-4 text-red-500" />
    if (severity === "medium") return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }

  const getIssueTypeLabel = (type: string) => {
    const labels = {
      overlap: "요소 겹침",
      overflow: "영역 벗어남",
      spacing: "간격 문제",
      size: "크기 문제",
      alignment: "정렬 문제",
    }
    return labels[type as keyof typeof labels] || type
  }

  const handleAutoFixAll = () => {
    const autoFixableIssues = inspectionResults.filter((issue) => issue.autoFixable)
    const fixes = autoFixableIssues.map((issue) => ({
      elementId: issue.elementId,
      type: issue.type,
      action: generateAutoFix(issue),
    }))
    onApplyAutoFix(fixes)
  }

  const generateAutoFix = (issue: InspectionIssue) => {
    switch (issue.type) {
      case "overflow":
        return { type: "resize", width: 350, height: "auto" }
      case "overlap":
        return { type: "reposition", offsetY: 20 }
      case "size":
        return { type: "adjustFontSize", factor: 0.9 }
      case "spacing":
        return { type: "adjustSpacing", margin: 10 }
      default:
        return { type: "none" }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <h2 className="text-lg font-bold">AI 상세페이지 점검 결과</h2>
            </div>
            <Button onClick={onClose} className="text-white hover:bg-white/20 p-1">
              ✕
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">점검 결과 요약</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {inspectionResults.filter((i) => i.severity === "high").length}
                </div>
                <div className="text-sm text-gray-600">심각한 문제</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">
                  {inspectionResults.filter((i) => i.severity === "medium").length}
                </div>
                <div className="text-sm text-gray-600">보통 문제</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {inspectionResults.filter((i) => i.severity === "low").length}
                </div>
                <div className="text-sm text-gray-600">경미한 문제</div>
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="max-h-[300px] overflow-y-auto">
            {inspectionResults.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">완벽합니다!</h3>
                <p className="text-gray-600">상세페이지에 문제가 발견되지 않았습니다.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {inspectionResults.map((issue) => (
                  <div
                    key={issue.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedIssue === issue.id
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getIssueIcon(issue.type, issue.severity)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-800">{getIssueTypeLabel(issue.type)}</span>
                          {issue.autoFixable && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">자동 수정 가능</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{issue.description}</p>
                        {selectedIssue === issue.id && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            <p className="text-gray-700">
                              <strong>제안:</strong> {issue.suggestion}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          {inspectionResults.length > 0 && (
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Button
                onClick={handleAutoFixAll}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
                disabled={!inspectionResults.some((i) => i.autoFixable)}
              >
                <Zap className="h-4 w-4 mr-2" />
                자동 수정 ({inspectionResults.filter((i) => i.autoFixable).length}개)
              </Button>
              <Button onClick={onClose} className="px-6 bg-gray-500 hover:bg-gray-600 text-white">
                닫기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
