-- template-complete.json 데이터 삽입
INSERT INTO templates (name, description, template_data, preview_image, category) VALUES (
  '완전한 템플릿',
  '완전한 상품 상세페이지 템플릿',
  '{
    "elements": [
      {
        "id": "image-1735050442584",
        "type": "image",
        "src": "/fresh-produce.png",
        "x": 50,
        "y": 50,
        "width": 400,
        "height": 300,
        "zIndex": 1,
        "selected": false
      },
      {
        "id": "text-1735050442585",
        "type": "text",
        "content": "신선한 농산물",
        "x": 50,
        "y": 370,
        "width": 400,
        "height": 50,
        "fontSize": 24,
        "fontWeight": "bold",
        "zIndex": 2,
        "selected": false
      },
      {
        "id": "text-1735050442586",
        "type": "text",
        "content": "₩15,000",
        "x": 50,
        "y": 430,
        "width": 200,
        "height": 40,
        "fontSize": 20,
        "color": "#e74c3c",
        "fontWeight": "bold",
        "zIndex": 3,
        "selected": false
      },
      {
        "id": "text-1735050442587",
        "type": "text",
        "content": "농장에서 직접 재배한 신선한 농산물입니다. 무농약으로 키워 안전하고 건강합니다.",
        "x": 50,
        "y": 480,
        "width": 400,
        "height": 80,
        "fontSize": 14,
        "zIndex": 4,
        "selected": false
      },
      {
        "id": "text-1735050442588",
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
        "zIndex": 10,
        "selected": false
      }
    ]
  }',
  '/template1-preview.png',
  '완성형'
);

-- template2.json 데이터 삽입  
INSERT INTO templates (name, description, template_data, preview_image, category) VALUES (
  '템플릿 2',
  '두 번째 상품 템플릿',
  '{
    "elements": [
      {
        "id": "image-1735050442590",
        "type": "image", 
        "src": "/premium-agricultural-product.png",
        "x": 100,
        "y": 100,
        "width": 300,
        "height": 200,
        "zIndex": 1,
        "selected": false
      },
      {
        "id": "text-1735050442591",
        "type": "text",
        "content": "프리미엄 농산물",
        "x": 100,
        "y": 320,
        "width": 300,
        "height": 40,
        "fontSize": 18,
        "fontWeight": "bold", 
        "zIndex": 2,
        "selected": false
      }
    ]
  }',
  '/template2-preview.png',
  '기본형'
);
