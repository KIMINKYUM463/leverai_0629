-- Storage 기반 샘플 템플릿 데이터 삽입
INSERT INTO templates (name, description, template_file_path, preview_image, category, is_active) VALUES 
(
  '완전한 상품 상세페이지',
  '모든 섹션이 포함된 완전한 상품 상세페이지 템플릿',
  'template-complete.json',
  '/template1-preview.png',
  '완성형',
  true
),
(
  '기본 상품 템플릿',
  '간단한 상품 소개용 기본 템플릿',
  'template-basic.json',
  '/basic-template.png',
  '기본형',
  true
),
(
  'AI 생성 템플릿',
  'AI가 자동 생성한 상품 상세페이지',
  'template-ai-generated.json',
  '/ai-template-preview.png',
  'AI생성',
  true
);
