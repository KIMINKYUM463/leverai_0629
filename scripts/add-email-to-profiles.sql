-- profiles 테이블에 email 컬럼이 없어서 생기는 오류를 해결하기 위한 마이그레이션
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;

-- 기존 레코드 중 email 값이 NULL 인 경우 id(사용자 uuid) 를 그대로 넣어두거나
-- 필요하다면 다른 전략을 사용해 채워 넣을 수 있습니다.
UPDATE profiles
SET email = id::text
WHERE email IS NULL;
