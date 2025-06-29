-- 기존 JSON 템플릿 데이터를 templates 테이블에 삽입

-- 템플릿 1 (완전한 상품 상세페이지)
INSERT INTO templates (name, description, template_data, preview_image, category) VALUES (
  '완전한 상품 상세페이지',
  '모든 섹션이 포함된 완전한 상품 상세페이지 템플릿',
  '{
    "elements": [
      {
        "id": "main-image",
        "type": "image",
        "src": "/fresh-produce.png",
        "x": 50,
        "y": 50,
        "width": 400,
        "height": 300,
        "zIndex": 1
      },
      {
        "id": "product-title",
        "type": "text",
        "content": "신선한 농산물",
        "x": 50,
        "y": 370,
        "width": 400,
        "height": 50,
        "fontSize": 24,
        "fontWeight": "bold",
        "zIndex": 2
      },
      {
        "id": "price-text",
        "type": "text",
        "content": "₩15,000",
        "x": 50,
        "y": 430,
        "width": 200,
        "height": 40,
        "fontSize": 20,
        "color": "#e74c3c",
        "fontWeight": "bold",
        "zIndex": 3
      },
      {
        "id": "description",
        "type": "text",
        "content": "농장에서 직접 재배한 신선한 농산물입니다. 무농약으로 키워 안전하고 건강합니다.",
        "x": 50,
        "y": 480,
        "width": 400,
        "height": 80,
        "fontSize": 14,
        "zIndex": 4
      },
      {
        "id": "premium-badge",
        "type": "text",
        "content": "Premium",
        "x": 380,
        "y": 70,
        "width": 60,
        "height": 25,
        "fontSize": 12,
        "backgroundColor": "#f39c12",
        "color": "white",
        "textAlign": "center",
        "borderRadius": "12px",
        "zIndex": 10
      }
    ]
  }',
  '/template1-preview.png',
  '완성형'
);

-- 템플릿 2 (기본 템플릿)
INSERT INTO templates (name, description, template_data, preview_image, category) VALUES (
  '기본 상품 템플릿',
  '간단한 상품 소개용 기본 템플릿',
  '{
    "elements": [
      {
        "id": "product-image",
        "type": "image",
        "src": "/premium-agricultural-product.png",
        "x": 100,
        "y": 100,
        "width": 300,
        "height": 200,
        "zIndex": 1
      },
      {
        "id": "title",
        "type": "text",
        "content": "상품명을 입력하세요",
        "x": 100,
        "y": 320,
        "width": 300,
        "height": 40,
        "fontSize": 18,
        "fontWeight": "bold",
        "zIndex": 2
      },
      {
        "id": "price",
        "type": "text",
        "content": "가격을 입력하세요",
        "x": 100,
        "y": 370,
        "width": 200,
        "height": 30,
        "fontSize": 16,
        "color": "#e74c3c",
        "zIndex": 3
      }
    ]
  }',
  '/basic-template.png',
  '기본형'
);
