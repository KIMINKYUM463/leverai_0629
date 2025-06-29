-- profiles 테이블에 전화번호 컬럼 추가
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- 전화번호를 필수로 만들기 (기존 사용자는 NULL 허용)
-- ALTER TABLE profiles 
-- ADD CONSTRAINT phone_not_null CHECK (phone IS NOT NULL OR created_at < NOW());
