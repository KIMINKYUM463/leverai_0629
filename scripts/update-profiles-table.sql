-- profiles 테이블에 마케팅 동의 필드 추가
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS agree_marketing BOOLEAN DEFAULT false;

-- 기존 데이터에 대해 기본값 설정
UPDATE profiles 
SET agree_marketing = false 
WHERE agree_marketing IS NULL;
