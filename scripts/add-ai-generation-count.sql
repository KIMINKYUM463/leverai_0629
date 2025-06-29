-- profiles 테이블에 ai_generation_count 컬럼 추가
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS ai_generation_count INTEGER DEFAULT 120;

-- 기존 사용자들에게 120회 부여
UPDATE profiles 
SET ai_generation_count = 120 
WHERE ai_generation_count IS NULL;

-- 새 사용자 가입 시 자동으로 프로필 생성하는 트리거 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, ai_generation_count, is_admin, is_approved, created_at, updated_at)
  VALUES (
    new.id,
    new.email,
    120,
    false,
    true,
    now(),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성 (이미 존재하면 삭제 후 재생성)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- RLS 정책 확인 및 생성
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- 새 정책 생성
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 관리자는 모든 프로필 접근 가능
CREATE POLICY "Admins can access all profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- 인덱스 추가 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_profiles_ai_generation_count 
ON profiles(ai_generation_count);

-- 확인
SELECT id, email, ai_generation_count 
FROM profiles 
LIMIT 10;
