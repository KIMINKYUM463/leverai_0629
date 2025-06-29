-- AItemplate.json 데이터를 templates 테이블에 삽입
INSERT INTO templates (name, description, template_data, preview_image, category) VALUES (
  'AI 완전한 상품 상세페이지',
  'AI가 생성한 완전한 상품 상세페이지 템플릿 - 모든 섹션 포함',
  '{
    "canvasSize": {
      "width": 860,
      "height": 18804
    },
    "backgroundColor": "#FFFFFF",
    "elements": [
      {
        "id": "ai-clean-shape-1750258083866-0-l5ucb1xc2",
        "type": "shape",
        "shapeType": "rectangle",
        "name": "상단 배경 그라데이션",
        "position": {
          "x": 0,
          "y": 0
        },
        "size": {
          "width": 860,
          "height": 745
        },
        "rotation": 0,
        "zIndex": 5,
        "backgroundColor": "#000000",
        "borderColor": "transparent",
        "borderWidth": 6,
        "borderStyle": "none",
        "borderRadius": 0,
        "opacity": 0.63,
        "gradientEnabled": true,
        "gradientDirection": "to bottom",
        "gradientStartColor": "#262626",
        "gradientEndColor": "#5c5c5c"
      },
      {
        "id": "ai-clean-text-1750258083866-1-5nbklkhpc",
        "type": "text",
        "textStyle": "body",
        "styleName": "Premium 텍스트",
        "content": "Premium",
        "position": {
          "x": 393,
          "y": 43
        },
        "size": {
          "width": 80,
          "height": 20
        },
        "rotation": 0,
        "zIndex": 50,
        "color": "#FFFFFF",
        "backgroundColor": "transparent"
      }
    ]
  }',
  '/ai-template-preview.png',
  'AI생성'
);
