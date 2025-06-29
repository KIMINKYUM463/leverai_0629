-- profiles 테이블에 필요한 컬럼들 추가
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS password TEXT,
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE;

-- 기존 사용자들의 기본값 설정
UPDATE profiles 
SET is_admin = FALSE, is_approved = FALSE 
WHERE is_admin IS NULL OR is_approved IS NULL;
