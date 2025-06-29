-- profiles 테이블에 password 컬럼 추가
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS password TEXT;

-- password 컬럼에 대한 설명 추가
COMMENT ON COLUMN profiles.password IS '사용자 비밀번호 (평문 저장)';
